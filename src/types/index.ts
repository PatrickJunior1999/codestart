export type ProgressStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  school?: string | null;
  class_group?: string | null;
  role: UserRole;
  lgpd_consent: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order_index: number;
  estimated_minutes: number;
  xp_reward: number;
  status?: ProgressStatus;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  logic_message?: string | null;
  order_index: number;
}

export interface Level {
  id: number;
  title: string;
  minXp: number;
}

export interface Activity {
  id: string;
  module_id: string;
  activity_type: 'ordering' | 'matching' | 'block_programming' | 'visual_code' | 'final_project' | 'predict_output' | 'fill_blank';
  title: string;
  statement: string;
  activity_data: Record<string, unknown>;
  success_feedback: string;
  error_feedback: string;
  order_index: number;
}

export interface QuizQuestion {
  id: string;
  module_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  order_index: number;
}

export interface QuizAnswerPayload {
  question_id: string;
  selected_option: 'A' | 'B' | 'C' | 'D';
}

export interface QuizAttemptResult {
  score: number;
  total_questions: number;
  correct_answers: number;
  passed: boolean;
  module_completed?: boolean;
  completion_message?: string;
}

export interface ModuleCompletionState {
  total_activities: number;
  completed_activities: number;
  activity_completed: boolean;
  best_quiz_score: number;
  quiz_passed: boolean;
  module_completed: boolean;
}

export interface FinalAssessmentQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  order_index: number;
}

export interface FinalAssessmentResult {
  score: number;
  total_questions: number;
  correct_answers: number;
  passed: boolean;
}

export interface CertificationStatus {
  total_modules: number;
  completed_modules: number;
  has_final_project: boolean;
  best_final_score: number;
  final_assessment_passed: boolean;
  has_certificate: boolean;
  certificate_code?: string | null;
  issued_at?: string | null;
  workload_hours?: number | null;
  can_issue_certificate: boolean;
}

export interface CertificateIssueResult {
  certificate_code: string;
  course_name: string;
  workload_hours: number;
  issued_at: string;
  validation_hash: string;
}

export interface CertificateValidationResult {
  is_valid: boolean;
  student_name: string | null;
  course_name: string | null;
  workload_hours: number | null;
  issued_at: string | null;
  certificate_code: string | null;
  status: string | null;
}

export interface StudentModuleReportItem {
  module_id: string;
  title: string;
  order_index: number;
  xp_reward: number;
  status: ProgressStatus | 'not_started';
  completed_activities: number;
  total_activities: number;
  best_quiz_score: number | null;
  quiz_attempts: number;
  xp_earned: number;
  completed_at: string | null;
}

export interface StudentProgressReport {
  student_name: string;
  student_email: string;
  total_modules: number;
  completed_modules: number;
  total_xp: number;
  modules: StudentModuleReportItem[];
  final_project: {
    project_title: string;
    status: string;
    submitted_at: string | null;
    updated_at: string | null;
  } | null;
  final_assessment: {
    score: number;
    correct_answers: number;
    total_questions: number;
    completed_at: string;
  } | null;
  certificate: {
    certificate_code: string;
    issued_at: string;
    status: string;
  } | null;
}

export interface AdminStudentSummary {
  student_id: string;
  full_name: string;
  email: string;
  school: string | null;
  class_group: string | null;
  completed_modules: number;
  total_xp: number;
  progress_percent: number;
  has_final_project: boolean;
  best_final_score: number;
  has_certificate: boolean;
  created_at: string;
}

export interface AdminDashboardReport {
  total_students: number;
  total_modules: number;
  students_completed_course: number;
  certificates_issued: number;
  average_progress_percent: number;
  students: AdminStudentSummary[];
}
