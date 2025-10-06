import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { PortfolioProject } from '../types';
import './Portfolio.css';

export const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order');

      if (data) setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="portfolio-page">
        <section className="portfolio-hero">
          <div className="container">
            <h1>Nosso Portfólio</h1>
          </div>
        </section>
        <div className="container section">
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Carregando projetos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="container">
          <h1>Nosso Portfólio</h1>
          <p className="portfolio-hero-description">
            Conheça alguns dos projetos que desenvolvemos com excelência e dedicação. Cada solução
            foi criada sob medida para atender às necessidades específicas de nossos clientes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum projeto disponível no momento.</p>
              <Link to="/contato" className="btn btn-primary">
                Seja Nosso Primeiro Cliente
              </Link>
            </div>
          ) : (
            <div className="portfolio-grid">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="portfolio-card-link"
                >
                  <div className="portfolio-card-full">
                    <div className="portfolio-card-image">
                      <img src={project.image_url} alt={project.name} />
                    </div>
                    <div className="portfolio-card-content">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="portfolio-card-technologies">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-badge-portfolio">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
