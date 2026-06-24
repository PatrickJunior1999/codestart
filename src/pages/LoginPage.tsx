import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { loginDemo, signInWithEmail, resendConfirmationEmail, isSupabaseReady } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';

  useEffect(() => {
    if (searchParams.get('confirmed') === '1') {
      setSuccess('E-mail confirmado com sucesso. Agora você já pode entrar no CodeStart.');
    }

    const errorDescription = searchParams.get('error_description');
    if (errorDescription) {
      setError(decodeURIComponent(errorDescription));
    }
  }, [searchParams]);

  function handleDemoLogin() {
    loginDemo();
    navigate('/dashboard');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isSupabaseReady) {
      setError('Supabase não configurado. Use o modo demonstração ou configure o arquivo .env.');
      return;
    }

    if (!email || !password) {
      setError('Informe e-mail e senha.');
      return;
    }

    try {
      setIsSubmitting(true);
      await signInWithEmail(email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível entrar.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendConfirmation() {
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError('Informe o e-mail no campo acima para reenviar a confirmação.');
      return;
    }

    try {
      setIsResending(true);
      await resendConfirmationEmail(email.trim());
      setSuccess('Enviamos um novo link de confirmação. Verifique sua caixa de entrada e o spam.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível reenviar a confirmação.';
      setError(message);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <h1>Entrar no CodeStart</h1>
        <p className="muted">
          {isSupabaseReady
            ? 'Entre com sua conta para continuar o curso de qualquer aparelho.'
            : 'Supabase ainda não configurado. O modo demonstração continua disponível.'}
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <Button type="submit" disabled={!isSupabaseReady || isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <button
          type="button"
          className="text-link-button"
          onClick={handleResendConfirmation}
          disabled={!isSupabaseReady || isResending}
        >
          {isResending ? 'Reenviando confirmação...' : 'Reenviar e-mail de confirmação'}
        </button>

        <Button type="button" variant="secondary" onClick={handleDemoLogin}>Entrar em modo demonstração</Button>

        <p className="auth-footer">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
          <br />
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
        </p>
      </Card>
    </main>
  );
}
