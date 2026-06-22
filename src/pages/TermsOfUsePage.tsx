import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export function TermsOfUsePage() {
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
        <span className="eyebrow">Termos de uso</span>
        <h1>Regras de participação</h1>
        <p>
          O CodeStart é um curso online educacional. Para manter a experiência organizada, o aluno
          deve usar o ambiente de forma responsável e concluir as etapas previstas na trilha.
        </p>
      </section>

      <section className="legal-stack">
        <Card>
          <h2>1. Uso educacional</h2>
          <p>O sistema foi desenvolvido para fins de aprendizagem, demonstração e projeto de extensão. O acesso deve ser usado para estudo dos conteúdos e realização das atividades propostas.</p>
        </Card>
        <Card>
          <h2>2. Conta do aluno</h2>
          <p>O aluno deve informar dados corretos, especialmente o nome completo, pois ele será usado no certificado. O compartilhamento de senha não é recomendado.</p>
        </Card>
        <Card>
          <h2>3. Certificação</h2>
          <p>O certificado é liberado apenas após a conclusão dos módulos, entrega do projeto final e aprovação na avaliação final com nota mínima de 70%.</p>
        </Card>
        <Card>
          <h2>4. Projeto final</h2>
          <p>O projeto final deve ser criado pelo próprio aluno usando os comandos permitidos no editor visual. A proposta é demonstrar aplicação prática dos conceitos estudados.</p>
        </Card>
        <Card>
          <h2>5. Área administrativa</h2>
          <p>A área administrativa é exclusiva da equipe responsável pelo projeto. Ela não faz parte da experiência comum do aluno e serve para acompanhamento dos resultados.</p>
        </Card>
      </section>
    </main>
  );
}
