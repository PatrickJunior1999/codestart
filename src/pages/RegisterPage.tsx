import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { loginDemo, signUpWithEmail, isSupabaseReady } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleDemoRegister() {
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

    if (fullName.trim().split(' ').length < 2) {
      setError('Informe o nome completo, pois ele será usado no certificado.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('A confirmação de senha não confere.');
      return;
    }

    if (!lgpdConsent) {
      setError('É necessário aceitar o uso dos dados para cadastro, progresso e emissão de certificado.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await signUpWithEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        school: school.trim() || undefined,
        classGroup: classGroup.trim() || undefined,
        lgpdConsent,
      });

      if (result.needsEmailConfirmation) {
        setSuccess('Conta criada. Verifique seu e-mail para confirmar o cadastro antes de entrar.');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível criar a conta.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <h1>Criar conta</h1>
        <p className="muted">
          {isSupabaseReady
            ? 'Crie sua conta para salvar progresso, XP e certificado.'
            : 'Supabase ainda não configurado. O modo demonstração continua disponível.'}
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Nome completo
            <input
              type="text"
              placeholder="Nome para o certificado"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
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
              placeholder="mínimo de 8 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <label>
            Confirmar senha
            <input
              type="password"
              placeholder="repita a senha"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <label>
            Escola
            <input
              type="text"
              placeholder="nome da instituição"
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <label>
            Turma
            <input
              type="text"
              placeholder="ex.: 1º Ano B"
              value={classGroup}
              onChange={(event) => setClassGroup(event.target.value)}
              disabled={!isSupabaseReady || isSubmitting}
            />
          </label>
          <label className="checkbox-line">
            <input
              type="checkbox"
              checked={lgpdConsent}
              onChange={(event) => setLgpdConsent(event.target.checked)}
              disabled={!isSupabaseReady || isSubmitting}
            />
            Concordo com o uso dos dados para cadastro, progresso e emissão de certificado. Li a <Link to="/privacidade">Política de Privacidade</Link> e os <Link to="/termos">Termos de Uso</Link>.
          </label>
          <Button type="submit" disabled={!isSupabaseReady || isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar minha conta'}
          </Button>
        </form>

        <Button type="button" variant="secondary" onClick={handleDemoRegister}>Criar conta demo</Button>
        <p className="auth-footer">Já tem conta? <Link to="/login">Entrar</Link></p>
      </Card>
    </main>
  );
}
