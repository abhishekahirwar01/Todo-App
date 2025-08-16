import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="container center">
        <h1>Plan more. Stress less.</h1>
        <p>Fast, secure, and simple TODOs with your own dashboard.</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/register">
            Get Started
          </Link>
          <Link className="btn" to="/login">
            Login
          </Link>
        </div>
        <div className="feature-grid">
          <div className="card center">
            <h3>📅 Full CRUD</h3>
            <p>Create, edit, delete, toggle tasks with ease.</p>
          </div>
          <div className="card center">
            <h3>🔒 Secure</h3>
            <p>JWT-based auth keeps your data safe.</p>
          </div>
          <div className="card center">
            <h3>⚡ Fast</h3>
            <p>MERN stack for speed & reliability.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
