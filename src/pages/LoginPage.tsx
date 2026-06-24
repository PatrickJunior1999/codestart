import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginDemo, signInWithEmail, isSupabaseReady } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirmationMessage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('email_confirmed') === '1'
      ? 'E-mail confirmado com sucesso. Agora você já pode entrar no CodeStart.'
      : null;
  }, [location.search]);

  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';

  function handleDemoLogin() {
    loginDemo();
    navigate('/dashboard');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

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
      await signInWithEmail(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível entrar.';
      setError(message);
    } finally {
      setIsSubmitting(false);
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

        {confirmationMessage && <div className="alert alert-success">{confirmationMessage}</div>}
        {error && <div className="alert alert-error">{error}</div>}

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
