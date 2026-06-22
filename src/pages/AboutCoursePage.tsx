import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';

export function AboutCoursePage() {
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

      <section className="public-hero">
        <span className="eyebrow">Sobre o curso</span>
        <h1>CodeStart: Explorando o Mundo da Programação</h1>
        <p>
          Um curso online autoinstrucional, gamificado e interativo, criado para introduzir
          lógica de programação, pensamento computacional, algoritmos, blocos e código visual
          para estudantes iniciantes.
        </p>
      </section>

      <section className="public-grid public-grid-2">
        <Card>
          <span className="eyebrow">Proposta pedagógica</span>
          <h2>Aprendizagem por missões</h2>
          <p>
            O curso foi estruturado como uma trilha de missões progressivas. Cada módulo apresenta
            conceitos em pequenas etapas, exemplos contextualizados, atividades de fixação, prática
            final e quiz. Essa organização reduz a sobrecarga cognitiva e ajuda o aluno a avançar
            gradualmente.
          </p>
        </Card>

        <Card>
          <span className="eyebrow">Público-alvo</span>
          <h2>Estudantes iniciantes</h2>
          <p>
            O CodeStart foi pensado para alunos do Ensino Fundamental II e Ensino Médio que ainda não
            tiveram contato formal com programação. A linguagem é acessível, mas o percurso evolui
            até desafios mais estruturados de pseudocódigo e desenho por comandos.
          </p>
        </Card>
      </section>

      <LogicSpeechBubble message="Minha missão é acompanhar o aluno durante a trilha, oferecendo orientações, feedbacks e desafios práticos para transformar conceitos abstratos em experiências visuais." />

      <section className="public-grid public-grid-4">
        <Card>
          <h3>8 módulos</h3>
          <p>Fundamentos, pensamento computacional, algoritmos, condicionais, repetição, blocos, pseudocódigo e código visual.</p>
        </Card>
        <Card>
          <h3>4 horas</h3>
          <p>Carga horária planejada para uma experiência introdutória, objetiva e aplicável em contexto extensionista.</p>
        </Card>
        <Card>
          <h3>Atividades práticas</h3>
          <p>Exercícios de ordenação, associação, blocos animados, pseudocódigo e desenho programado.</p>
        </Card>
        <Card>
          <h3>Certificado validável</h3>
          <p>Ao concluir os critérios, o aluno emite certificado com código único e página pública de validação.</p>
        </Card>
      </section>

      <section className="public-section-card">
        <span className="eyebrow">Como funciona</span>
        <h2>Fluxo de aprendizagem</h2>
        <div className="process-steps">
          <div><strong>1</strong><span>Cadastro e acesso ao Centro de Missões</span></div>
          <div><strong>2</strong><span>Estudo em etapas com exemplos e fixação</span></div>
          <div><strong>3</strong><span>Atividade prática e quiz por módulo</span></div>
          <div><strong>4</strong><span>Projeto final com cena programada</span></div>
          <div><strong>5</strong><span>Avaliação final e emissão de certificado</span></div>
        </div>
      </section>

      <section className="public-section-card">
        <span className="eyebrow">Critérios de certificação</span>
        <h2>O certificado não é liberado automaticamente</h2>
        <ul className="feature-checklist">
          <li>Concluir os 8 módulos da trilha;</li>
          <li>Realizar as atividades práticas obrigatórias;</li>
          <li>Ser aprovado nos quizzes dos módulos;</li>
          <li>Entregar o projeto final com os critérios mínimos;</li>
          <li>Obter pelo menos 70% na avaliação final.</li>
        </ul>
      </section>

      <section className="public-actions-card">
        <div>
          <span className="eyebrow">Começar agora</span>
          <h2>Pronto para iniciar a jornada?</h2>
          <p>Crie sua conta, avance pelas missões e acompanhe seu progresso até o certificado final.</p>
        </div>
        <div className="button-row">
          <Link className="btn btn-primary" to="/cadastro">Criar conta</Link>
          <Link className="btn btn-secondary" to="/login">Entrar</Link>
        </div>
      </section>
    </main>
  );
}
