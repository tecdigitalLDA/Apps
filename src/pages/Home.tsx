import { Link } from 'react-router-dom';
import { Code, Zap, Lightbulb, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PortfolioProject } from '../types';
import './Home.css';

export const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('featured', true)
        .order('display_order')
        .limit(3);

      if (data) setFeaturedProjects(data);
    };

    fetchFeaturedProjects();
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Criação de Sites',
      description: 'Sites institucionais, landing pages e aplicações web modernas e responsivas, otimizadas para conversão.',
    },
    {
      icon: Zap,
      title: 'Automação Inteligente',
      description: 'Automatização de processos repetitivos e integração de sistemas para aumentar a eficiência do seu negócio.',
    },
    {
      icon: Lightbulb,
      title: 'Consultoria',
      description: 'Consultoria estratégica em tecnologia para identificar oportunidades e implementar soluções sob medida.',
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Construímos a Presença Digital que o seu Negócio Precisa
            </h1>
            <p className="hero-description">
              A tecdital é especialista em criar sites modernos, aplicações web inovadoras e automatizar processos
              para transformar a forma como o seu negócio opera no ambiente digital.
            </p>
            <div className="hero-actions">
              <Link to="/contato" className="btn btn-primary">
                Peça um Orçamento
                <ArrowRight size={20} />
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                Ver Nosso Trabalho
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="section-title">
            <h2>Nossos Serviços</h2>
            <p>Soluções completas em tecnologia para impulsionar o seu negócio</p>
          </div>
          <div className="grid grid-3">
            {services.map((service) => (
              <div key={service.title} className="card service-card">
                <div className="service-icon">
                  <service.icon size={32} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/servicos" className="btn btn-secondary">
              Ver Todos os Serviços
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="section portfolio-section">
          <div className="container">
            <div className="section-title">
              <h2>Portfólio em Destaque</h2>
              <p>Alguns dos nossos melhores projetos recentes</p>
            </div>
            <div className="grid grid-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="card portfolio-card"
                >
                  <div className="portfolio-image">
                    <img src={project.image_url} alt={project.name} />
                  </div>
                  <div className="portfolio-info">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="portfolio-tech">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="portfolio-cta">
              <Link to="/portfolio" className="btn btn-primary">
                Ver Todos os Projetos
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
