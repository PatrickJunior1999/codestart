import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type CheckStatus = 'ok' | 'warning' | 'error';

type SystemCheck = {
  label: string;
  value: string;
  status: CheckStatus;
  detail: string;
};

function statusLabel(status: CheckStatus): string {
  if (status === 'ok') return 'OK';
  if (status === 'warning') return 'Atenção';
  return 'Erro';
}

function maskKey(value?: string): string {
  if (!value) return 'não configurada';
  if (value.length <= 16) return 'configurada';
  return `${value.slice(0, 10)}...${value.slice(-6)}`;
}

function getEnvValue(key: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  return value?.trim() || undefined;
}

async function countRows(table: string, onlyActive = false): Promise<number> {
  if (!supabase) return 0;

  let query = supabase.from(table).select('id', { count: 'exact', head: true });

  if (onlyActive) {
    query = query.eq('is_active', true);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error(`${table}: ${error.message}`);
  }

  return count ?? 0;
}

export function SystemStatusPage() {
  const { profile, isDemoMode, isSupabaseReady } = useAuth();
  const [checks, setChecks] = useState<SystemCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasAdminAccess = isDemoMode || profile?.role === 'admin';

  const env = useMemo(() => {
    const supabaseUrl = getEnvValue('VITE_SUPABASE_URL');
    const anonKey = getEnvValue('VITE_SUPABASE_ANON_KEY');
    const certificateBaseUrl = getEnvValue('VITE_APP_CERTIFICATE_BASE_URL');

    return {
      supabaseUrl,
      anonKey,
      certificateBaseUrl,
      appOrigin: typeof window !== 'undefined' ? window.location.origin : '',
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadStatus() {
      if (!hasAdminAccess) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      const nextChecks: SystemCheck[] = [];

      nextChecks.push({
        label: 'Supabase URL',
        value: env.supabaseUrl ? env.supabaseUrl.replace(/\/$/, '') : 'não configurada',
        status: env.supabaseUrl?.startsWith('https://') ? 'ok' : 'error',
        detail: 'Deve apontar para a URL base do projeto Supabase, sem /rest/v1 no final.',
      });

      nextChecks.push({
        label: 'Supabase public key',
        value: maskKey(env.anonKey),
        status: env.anonKey && env.anonKey.length > 30 ? 'ok' : 'error',
        detail: 'Use apenas a chave pública/anon/publishable. Nunca coloque a secret key no frontend.',
      });

      const expectedCertificateBase = `${env.appOrigin}/validar`;
      const certificateBaseMatches = Boolean(env.certificateBaseUrl && env.certificateBaseUrl.replace(/\/$/, '') === expectedCertificateBase);
      nextChecks.push({
        label: 'Base de validação do certificado',
        value: env.certificateBaseUrl ?? 'não configurada',
        status: certificateBaseMatches ? 'ok' : 'warning',
        detail: `Em produção, deve ser ajustada para ${expectedCertificateBase} para o QR Code apontar para o domínio correto.`,
      });

      nextChecks.push({
        label: 'Cliente Supabase',
        value: isSupabaseReady ? 'configurado' : 'não configurado',
        status: isSupabaseReady ? 'ok' : 'error',
        detail: 'Confirma se o frontend conseguiu inicializar o cliente do Supabase com as variáveis de ambiente.',
      });

      if (!supabase || isDemoMode) {
        nextChecks.push({
          label: 'Modo de execução',
          value: isDemoMode ? 'modo demonstração' : 'sem conexão real',
          status: isDemoMode ? 'warning' : 'error',
          detail: 'Para produção, o sistema precisa estar conectado ao Supabase real.',
        });

        if (isMounted) {
          setChecks(nextChecks);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        nextChecks.push({
          label: 'Sessão autenticada',
          value: sessionData.session?.user.email ?? 'sem sessão',
          status: sessionError || !sessionData.session ? 'warning' : 'ok',
          detail: sessionError?.message ?? 'Confirma se o usuário atual está autenticado corretamente.',
        });

        const [modules, lessons, activities, quizzes, finalQuestions] = await Promise.all([
          countRows('modules', true),
          countRows('lessons'),
          countRows('activities'),
          countRows('quiz_questions'),
          countRows('final_assessment_questions', true),
        ]);

        nextChecks.push({
          label: 'Módulos ativos',
          value: String(modules),
          status: modules >= 8 ? 'ok' : 'warning',
          detail: 'O curso CodeStart deve ter 8 módulos ativos.',
        });

        nextChecks.push({
          label: 'Conteúdos de estudo',
          value: `${lessons} lições`,
          status: lessons >= 8 ? 'ok' : 'warning',
          detail: 'Confirma se os conteúdos pedagógicos foram populados pelas migrations.',
        });

        nextChecks.push({
          label: 'Atividades práticas',
          value: `${activities} atividades`,
          status: activities >= 8 ? 'ok' : 'warning',
          detail: 'Confirma se existem atividades de fixação e práticas para os módulos.',
        });

        nextChecks.push({
          label: 'Quizzes dos módulos',
          value: `${quizzes} questões`,
          status: quizzes >= 40 ? 'ok' : 'warning',
          detail: 'O curso deve ter pelo menos 40 questões de quiz dos módulos.',
        });

        nextChecks.push({
          label: 'Avaliação final',
          value: `${finalQuestions} questões`,
          status: finalQuestions >= 10 ? 'ok' : 'warning',
          detail: 'A avaliação final deve ter pelo menos 10 questões ativas.',
        });

        const { data: adminReport, error: adminError } = await supabase.rpc('get_admin_dashboard_report');
        nextChecks.push({
          label: 'Função do painel administrativo',
          value: adminError ? 'indisponível' : 'disponível',
          status: adminError ? 'error' : 'ok',
          detail: adminError?.message ?? `Relatório carregado com ${Number(adminReport?.total_students ?? 0)} aluno(s).`,
        });

        const { error: validationError } = await supabase.rpc('validate_certificate', {
          p_certificate_code: 'CS-DIAGNOSTICO-INEXISTENTE',
        });
        nextChecks.push({
          label: 'Validação pública de certificado',
          value: validationError ? 'indisponível' : 'disponível',
          status: validationError ? 'error' : 'ok',
          detail: validationError?.message ?? 'A função de validação respondeu corretamente.',
        });

        if (isMounted) setChecks(nextChecks);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro inesperado no diagnóstico.';
        if (isMounted) {
          setError(message);
          setChecks(nextChecks);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadStatus();

    return () => {
      isMounted = false;
    };
  }, [env, hasAdminAccess, isDemoMode, isSupabaseReady]);

  if (!hasAdminAccess) {
    return (
      <Card>
        <span className="eyebrow">Acesso restrito</span>
        <h1>Status do sistema</h1>
        <p className="muted">Esta tela é reservada para administradores do projeto.</p>
        <Link className="btn btn-primary" to="/dashboard">Voltar aos módulos</Link>
      </Card>
    );
  }

  const okCount = checks.filter((check) => check.status === 'ok').length;
  const warningCount = checks.filter((check) => check.status === 'warning').length;
  const errorCount = checks.filter((check) => check.status === 'error').length;

  return (
    <div className="system-status-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Publicação</span>
          <h1>Status do sistema</h1>
          <p>Verifique ambiente, Supabase, migrations e funções críticas antes de publicar o CodeStart.</p>
        </div>
        <div className="button-row">
          <Link className="btn btn-secondary" to="/admin">Voltar ao admin</Link>
          <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Recarregar testes</button>
        </div>
      </section>

      <LogicSpeechBubble message="Antes de publicar, confirme se as variáveis de ambiente, os dados do curso e as funções de certificado estão respondendo corretamente. Isso evita problemas no cadastro, no QR Code e na validação pública." />

      <section className="status-summary-grid">
        <Card>
          <span className="admin-metric-label">OK</span>
          <strong className="admin-metric-value status-ok-text">{okCount}</strong>
        </Card>
        <Card>
          <span className="admin-metric-label">Atenção</span>
          <strong className="admin-metric-value status-warning-text">{warningCount}</strong>
        </Card>
        <Card>
          <span className="admin-metric-label">Erros</span>
          <strong className="admin-metric-value status-error-text">{errorCount}</strong>
        </Card>
      </section>

      {error && <div className="alert alert-warning">Diagnóstico parcial: {error}</div>}

      {isLoading ? (
        <Card>
          <p className="muted">Executando diagnóstico...</p>
        </Card>
      ) : (
        <section className="status-check-grid">
          {checks.map((check) => (
            <Card key={check.label} className={`status-check-card status-check-${check.status}`}>
              <div className="status-check-header">
                <span className="eyebrow">{statusLabel(check.status)}</span>
                <strong>{check.label}</strong>
              </div>
              <p className="status-check-value">{check.value}</p>
              <p className="muted">{check.detail}</p>
            </Card>
          ))}
        </section>
      )}

      <Card className="deployment-next-steps">
        <h2>Checklist rápido para produção</h2>
        <ul className="feature-checklist">
          <li>Configurar variáveis de ambiente na Vercel ou Netlify.</li>
          <li>Atualizar <code>VITE_APP_CERTIFICATE_BASE_URL</code> com o domínio publicado.</li>
          <li>Adicionar o domínio em Authentication → URL Configuration no Supabase.</li>
          <li>Testar cadastro, login, emissão de certificado e QR Code em produção.</li>
          <li>Garantir que nenhuma secret key foi enviada para o GitHub.</li>
        </ul>
      </Card>
    </div>
  );
}
