import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { PortfolioProject } from '../types';
import './PortfolioDetail.css';

export const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      setLoading(true);
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (data) setProject(data);
      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="portfolio-detail-page">
        <div className="container section">
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Carregando projeto...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="portfolio-detail-page">
        <div className="container section">
          <div className="empty-state">
            <h2>Projeto não encontrado</h2>
            <Link to="/portfolio" className="btn btn-primary">
              <ArrowLeft size={18} />
              Voltar ao Portfólio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-detail-page">
      <section className="portfolio-detail-hero">
        <div className="container">
          <Link to="/portfolio" className="back-link">
            <ArrowLeft size={18} />
            Voltar ao Portfólio
          </Link>
          <h1>{project.name}</h1>
          <p className="project-subtitle">{project.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="project-image-large">
            <img src={project.image_url} alt={project.name} />
          </div>

          <div className="project-content">
            <div className="project-section">
              <h2>O Desafio</h2>
              <p>{project.challenge}</p>
            </div>

            <div className="project-section">
              <h2>A Solução</h2>
              <p>{project.solution}</p>
            </div>

            <div className="project-section">
              <h2>Tecnologias Utilizadas</h2>
              <div className="technologies-grid">
                {project.technologies.map((tech) => (
                  <div key={tech} className="tech-card">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {project.project_url && (
              <div className="project-actions">
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={18} />
                  Visitar Projeto
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
