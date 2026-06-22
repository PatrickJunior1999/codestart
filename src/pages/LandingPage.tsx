import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export function LandingPage() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <div className="brand">
          <span className="brand-mark">CS</span>
          <span>CodeStart</span>
        </div>
        <div className="nav-actions">
          <Link className="btn btn-ghost" to="/sobre">Sobre o curso</Link>
          <Link className="btn btn-secondary" to="/login">Entrar</Link>
          <Link className="btn btn-primary" to="/cadastro">Criar conta</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Objeto Digital de Aprendizagem</span>
          <h1>Aprenda lógica de programação de um jeito divertido.</h1>
          <p>
            Uma jornada interativa para dar os primeiros passos em programação, com missões,
            XP, desafios em blocos, código visual e certificado final verificável.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/cadastro">Começar jornada</Link>
            <Link className="btn btn-secondary" to="/login">Já tenho conta</Link>
            <Link className="btn btn-ghost" to="/sobre">Conhecer metodologia</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="logic-hero">🐱</div>
          <div className="floating-block block-one">se / então</div>
          <div className="floating-block block-two">repetir</div>
          <div className="floating-block block-three">circulo()</div>
        </div>
      </section>

      <section className="benefits-grid">
        <Card><h3>Para iniciantes</h3><p>Conteúdo progressivo para quem nunca programou.</p></Card>
        <Card><h3>Atividades práticas</h3><p>Exercícios de lógica, blocos e código visual.</p></Card>
        <Card><h3>Progresso salvo</h3><p>O aluno continua de onde parou após login.</p></Card>
        <Card><h3>Certificado final</h3><p>Emissão com código único e validação pública.</p></Card>
      </section>
          <footer className="public-footer">
        <Link to="/sobre">Sobre o curso</Link>
        <Link to="/privacidade">Privacidade</Link>
        <Link to="/termos">Termos de uso</Link>
      </footer>
    </main>
  );
}
