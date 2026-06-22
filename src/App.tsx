import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { ModulePage } from './pages/ModulePage';
import { QuizPage } from './pages/QuizPage';
import { ActivityPage } from './pages/ActivityPage';
import { FinalProjectPage } from './pages/FinalProjectPage';
import { CertificatePage } from './pages/CertificatePage';
import { FinalAssessmentPage } from './pages/FinalAssessmentPage';
import { ValidateCertificatePage } from './pages/ValidateCertificatePage';
import { ProgressReportPage } from './pages/ProgressReportPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutCoursePage } from './pages/AboutCoursePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { SystemStatusPage } from './pages/SystemStatusPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/recuperar-senha" element={<ResetPasswordPage />} />
      <Route path="/sobre" element={<AboutCoursePage />} />
      <Route path="/privacidade" element={<PrivacyPolicyPage />} />
      <Route path="/termos" element={<TermsOfUsePage />} />
      <Route path="/validar/:codigo" element={<ValidateCertificatePage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/modulo/:moduleId" element={<ModulePage />} />
          <Route path="/modulo/:moduleId/atividade" element={<ActivityPage />} />
          <Route path="/modulo/:moduleId/quiz" element={<QuizPage />} />
          <Route path="/projeto-final" element={<FinalProjectPage />} />
          <Route path="/avaliacao-final" element={<FinalAssessmentPage />} />
          <Route path="/certificado" element={<CertificatePage />} />
          <Route path="/meu-progresso" element={<ProgressReportPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/status" element={<SystemStatusPage />} />
          <Route path="/painel-professor" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>

      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
