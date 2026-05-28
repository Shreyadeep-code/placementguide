CREATE TABLE public.resume_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  student_name TEXT,
  ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
  strengths TEXT[],
  weaknesses TEXT[],
  suggestions TEXT[],
  keywords_missing TEXT[]
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.resume_reports TO authenticated;
GRANT ALL ON public.resume_reports TO service_role;

ALTER TABLE public.resume_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resume reports"
ON public.resume_reports FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own resume reports"
ON public.resume_reports FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resume reports"
ON public.resume_reports FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resume reports"
ON public.resume_reports FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_resume_reports_user_id ON public.resume_reports(user_id);