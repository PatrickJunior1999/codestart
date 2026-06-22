import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

export function ResetPasswordPage() {
  const { sendPasswordReset, isSupabaseReady } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isSupabaseReady) {
      setError('Supabase não configurado. A recuperação de senha depende do Supabase Auth.');
      return;
    }

    if (!email) {
      setError('Informe seu e-mail.');
      return;
    }

    try {
      setIsSubmitting(true);
      await sendPasswordReset(email);
      setSuccess('Se o e-mail estiver cadastrado, você receberá um link de recuperação.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível enviar o e-mail de recuperação.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <h1>Recuperar senha</h1>
        <p className="muted">Informe seu e-mail para receber um link de recuperação.</p>
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
          <Button type="submit" disabled={!isSupabaseReady || isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar recuperação'}
          </Button>
        </form>
        <p className="auth-footer"><Link to="/login">Voltar para login</Link></p>
      </Card>
    </main>
  );
}
