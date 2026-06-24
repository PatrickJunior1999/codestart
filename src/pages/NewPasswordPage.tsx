import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function NewPasswordPage() {
  const navigate = useNavigate();
  const { updatePassword, isSupabaseReady } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkRecoverySession() {
      if (!supabase) return;

      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setHasRecoverySession(Boolean(data.session));
    }

    void checkRecoverySession();

    if (!supabase) {
      return () => {
        isMounted = false;
      };
    }

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasRecoverySession(true);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isSupabaseReady) {
      setError('Supabase não configurado. A troca de senha depende do Supabase Auth.');
      return;
    }

    if (password.length < 8) {
      setError('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('A confirmação de senha não confere.');
      return;
    }

    try {
      setIsSubmitting(true);
      await updatePassword(password);
      setSuccess('Senha atualizada com sucesso. Você já pode entrar com a nova senha.');
      setTimeout(() => navigate('/login', { replace: true }), 1800);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível atualizar a senha.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <h1>Definir nova senha</h1>
        <p className="muted">
          Crie uma nova senha para recuperar o acesso ao CodeStart.
        </p>

        {!hasRecoverySession && (
          <div className="alert alert-warning">
            Abra esta página pelo link recebido no e-mail de recuperação. Se o link expirou, solicite uma nova recuperação de senha.
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Nova senha
            <input
              type="password"
              placeholder="mínimo de 8 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <label>
            Confirmar nova senha
            <input
              type="password"
              placeholder="repita a nova senha"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <Button type="submit" disabled={!isSupabaseReady || isSubmitting}>
            {isSubmitting ? 'Salvando senha...' : 'Salvar nova senha'}
          </Button>
        </form>

        <p className="auth-footer">
          <Link to="/login">Voltar para login</Link>
          <br />
          <Link to="/recuperar-senha">Solicitar novo link</Link>
        </p>
      </Card>
    </main>
  );
}
