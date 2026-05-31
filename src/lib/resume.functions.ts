import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SYSTEM_PROMPT = `You are an expert resume reviewer for general Indian campus placements at top IT and product based companies. Analyze the resume and return ONLY a JSON response with these fields:
{
  ats_score: number out of 100,
  strengths: array of 5 specific strengths,
  weaknesses: array of 5 specific weaknesses with improvements,
  suggestions: array of 7 actionable tips for Indian campus placements,
  keywords_missing: array of 10 important keywords not found in resume,
  section_scores: {
    education: score out of 10,
    skills: score out of 10,
    projects: score out of 10,
    experience: score out of 10,
    formatting: score out of 10
  }
}
Be specific and practical for Indian IT companies.`;

const AnalysisSchema = z.object({
  ats_score: z.number(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  keywords_missing: z.array(z.string()),
  section_scores: z.object({
    education: z.number(),
    skills: z.number(),
    projects: z.number(),
    experience: z.number(),
    formatting: z.number(),
  }),
});

export type ResumeAnalysis = z.infer<typeof AnalysisSchema>;

export const analyzeResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        resumeText: z.string().min(50).max(50_000),
        studentName: z.string().max(200).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI service is not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyze this resume:\n\n${data.resumeText}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
    if (!res.ok) {
      const errText = await res.text();
      console.error("AI gateway error:", res.status, errText);
      throw new Error("AI analysis failed. Please try again.");
    }

    const payload = await res.json();
    const content: string = payload?.choices?.[0]?.message?.content ?? "";
    // Strip potential code fences
    const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

    let parsed: ResumeAnalysis;
    try {
      parsed = AnalysisSchema.parse(JSON.parse(cleaned));
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("AI returned an invalid response. Please try again.");
    }

    // Persist
    const { supabase, userId } = context;
    const { error } = await supabase.from("resume_reports").insert({
      user_id: userId,
      student_name: data.studentName ?? null,
      ats_score: Math.round(parsed.ats_score),
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      suggestions: parsed.suggestions,
      keywords_missing: parsed.keywords_missing,
      section_scores: parsed.section_scores,
    });
    if (error) console.error("Failed to save report:", error.message);

    return parsed;
  });
