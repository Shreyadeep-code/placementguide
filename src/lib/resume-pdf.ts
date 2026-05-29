import { jsPDF } from "jspdf";
import type { ResumeAnalysis } from "@/lib/resume.functions";

const BLUE: [number, number, number] = [30, 58, 95]; // #1e3a5f
const GREEN: [number, number, number] = [22, 163, 74];
const RED: [number, number, number] = [220, 38, 38];
const GRAY: [number, number, number] = [100, 116, 139];
const TEXT: [number, number, number] = [30, 41, 59];

export function generateResumePdf(opts: {
  studentName: string;
  analysis: ResumeAnalysis;
}) {
  const { studentName, analysis } = opts;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 60) {
      doc.addPage();
      y = margin;
    }
  };

  const divider = () => {
    doc.setDrawColor(220, 224, 232);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageW - margin, y);
    y += 16;
  };

  const heading = (text: string, color: [number, number, number] = BLUE, size = 14) => {
    ensureSpace(size + 12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.text(text, margin, y);
    y += size + 6;
  };

  const bullets = (items: string[], marker: (i: number) => string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...TEXT);
    items.forEach((item, i) => {
      const prefix = marker(i);
      const lines = doc.splitTextToSize(item, contentW - 18);
      ensureSpace(lines.length * 14 + 4);
      doc.text(prefix, margin, y);
      doc.text(lines, margin + 18, y);
      y += lines.length * 14 + 2;
    });
    y += 6;
  };

  // ---------- HEADER ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...BLUE);
  doc.text("PlaceAI", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  doc.text(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), pageW - margin, y, { align: "right" });
  y += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...TEXT);
  doc.text("Resume Analysis Report", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  doc.text(`Student: ${studentName || "Student"}`, margin, y);
  y += 16;
  divider();

  // ---------- ATS SCORE ----------
  const score = Math.max(0, Math.min(100, Math.round(analysis.ats_score)));
  const interpretation =
    score <= 40 ? "Needs Major Improvement" : score <= 70 ? "Average - Keep Improving" : "Good - Ready for Placements";
  const interpColor: [number, number, number] = score <= 40 ? RED : score <= 70 ? [234, 88, 12] : GREEN;

  ensureSpace(90);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  doc.text("ATS SCORE", pageW / 2, y, { align: "center" });
  y += 22;
  doc.setFontSize(44);
  doc.setTextColor(...BLUE);
  doc.text(`${score}/100`, pageW / 2, y, { align: "center" });
  y += 24;
  doc.setFontSize(13);
  doc.setTextColor(...interpColor);
  doc.text(interpretation, pageW / 2, y, { align: "center" });
  y += 20;
  divider();

  // ---------- SECTION SCORES TABLE ----------
  heading("Section Scores");
  const rows: [string, number][] = [
    ["Education", analysis.section_scores.education],
    ["Skills", analysis.section_scores.skills],
    ["Projects", analysis.section_scores.projects],
    ["Experience", analysis.section_scores.experience],
    ["Formatting", analysis.section_scores.formatting],
  ];
  const rowH = 24;
  ensureSpace(rowH * (rows.length + 1) + 10);
  // header row
  doc.setFillColor(...BLUE);
  doc.rect(margin, y, contentW, rowH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("Section", margin + 12, y + 16);
  doc.text("Score", pageW - margin - 12, y + 16, { align: "right" });
  y += rowH;
  rows.forEach((r, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, y, contentW, rowH, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXT);
    doc.text(r[0], margin + 12, y + 16);
    doc.setFont("helvetica", "bold");
    doc.text(`${r[1]}/10`, pageW - margin - 12, y + 16, { align: "right" });
    y += rowH;
  });
  y += 14;

  // ---------- STRENGTHS ----------
  heading("Your Strengths", GREEN);
  bullets(analysis.strengths, () => "•");

  // ---------- WEAKNESSES ----------
  heading("Areas to Improve", RED);
  bullets(analysis.weaknesses, () => "•");

  // ---------- SUGGESTIONS ----------
  heading("Action Plan", BLUE);
  bullets(analysis.suggestions, (i) => `${i + 1}.`);

  // ---------- KEYWORDS ----------
  heading("Keywords to Add", BLUE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...TEXT);
  const kwText = analysis.keywords_missing.join(", ");
  const kwLines = doc.splitTextToSize(kwText, contentW);
  ensureSpace(kwLines.length * 14 + 24);
  doc.text(kwLines, margin, y);
  y += kwLines.length * 14 + 8;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  const tip = "Tip: Add these keywords naturally in your Skills and Projects sections.";
  const tipLines = doc.splitTextToSize(tip, contentW);
  ensureSpace(tipLines.length * 13);
  doc.text(tipLines, margin, y);
  y += tipLines.length * 13;

  // ---------- FOOTER on every page ----------
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setDrawColor(220, 224, 232);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 44, pageW - margin, pageH - 44);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text("Generated by PlaceAI - placeai.netlify.app", margin, pageH - 28);
    doc.text("Your AI Placement Partner", margin, pageH - 16);
    doc.text(`Page ${p} of ${total}`, pageW - margin, pageH - 16, { align: "right" });
  }

  const safe = (studentName || "student").replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  doc.save(`placeai_resume_report_${safe}.pdf`);
}
