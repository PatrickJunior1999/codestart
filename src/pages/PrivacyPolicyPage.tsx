import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export function PrivacyPolicyPage() {
  return (
    <main className="landing public-info-page">
      <nav className="landing-nav">
        <Link className="brand" to="/">
          <span className="brand-mark">CS</span>
          <span>CodeStart</span>
        </Link>
        <div className="nav-actions">
          <Link className="btn btn-secondary" to="/login">Entrar</Link>
          <Link className="btn btn-primary" to="/cadastro">Criar conta</Link>
        </div>
      </nav>

      <section className="public-hero compact">
        <span className="eyebrow">Privacidade e LGPD</span>
        <h1>Política de Privacidade</h1>
        <p>
          Esta página explica, de forma simples, quais dados são usados no CodeStart e por que eles
          são necessários para cadastro, progresso, avaliação e emissão de certificado.
        </p>
      </section>

      <section className="legal-stack">
        <Card>
          <h2>1. Dados coletados</h2>
          <p>O CodeStart pode coletar nome completo, e-mail, escola, turma, consentimento LGPD, progresso no curso, respostas de atividades, notas, projeto final e dados do certificado emitido.</p>
        </Card>
        <Card>
          <h2>2. Finalidade do uso</h2>
          <p>Os dados são usados para autenticar o aluno, salvar progresso, permitir continuidade em outro dispositivo, corrigir atividades, emitir certificado e validar publicamente a autenticidade do certificado.</p>
        </Card>
        <Card>
          <h2>3. Validação pública do certificado</h2>
          <p>A página pública de validação exibe apenas informações necessárias para confirmar a autenticidade do certificado, como nome do aluno, curso, carga horária, data de emissão, código e status.</p>
        </Card>
        <Card>
          <h2>4. Acesso administrativo</h2>
          <p>A área administrativa é restrita à equipe responsável pelo projeto. Ela permite acompanhar indicadores de participação, conclusão e certificação, sem permitir que alunos comuns acessem dados de outros participantes.</p>
        </Card>
        <Card>
          <h2>5. Segurança</h2>
          <p>O sistema usa autenticação do Supabase e políticas de segurança no banco de dados. Gabaritos e dados administrativos não devem ser expostos diretamente no frontend.</p>
        </Card>
        <Card>
          <h2>6. Solicitações</h2>
          <p>Em uma aplicação real, o participante deve poder solicitar correção, exclusão ou revisão dos dados conforme as regras institucionais aplicáveis ao projeto.</p>
        </Card>
      </section>
    </main>
  );
}
