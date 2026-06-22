import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>Página não encontrada</h1>
      <p>O caminho solicitado não existe no CodeStart.</p>
      <Link className="btn btn-primary" to="/">Voltar para o início</Link>
    </main>
  );
}
