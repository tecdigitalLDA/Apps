import { Code, Zap, Puzzle, Database, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

export const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Criação de Sites Institucionais e Landing Pages',
      description:
        'Desenvolvemos sites institucionais e landing pages de alto impacto, focados em conversão e experiência do usuário. Cada projeto é cuidadosamente planejado para refletir a identidade da sua marca e alcançar seus objetivos de negócio.',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js'],
      features: [
        'Design responsivo e moderno',
        'Otimização para SEO',
        'Performance excepcional',
        'Integração com Analytics',
      ],
    },
    {
      icon: Database,
      title: 'Desenvolvimento de Aplicações Web Sob Medida',
      description:
        'Criamos aplicações web completas e escaláveis, desde dashboards administrativos até plataformas complexas. Utilizamos as tecnologias mais modernas para garantir segurança, performance e uma experiência fluida.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'TypeScript'],
      features: [
        'Arquitetura escalável',
        'Autenticação segura',
        'APIs RESTful',
        'Banco de dados robusto',
      ],
    },
    {
      icon: Zap,
      title: 'Automação de Processos e Backoffice',
      description:
        'Automatizamos tarefas repetitivas e processos manuais, liberando sua equipe para focar no que realmente importa. Desenvolvemos soluções personalizadas que integram suas ferramentas e sistemas existentes.',
      technologies: ['Python', 'JavaScript', 'APIs', 'Webhooks', 'Zapier'],
      features: [
        'Redução de trabalho manual',
        'Integração entre sistemas',
        'Notificações automáticas',
        'Relatórios personalizados',
      ],
    },
    {
      icon: Puzzle,
      title: 'Integração de Sistemas e APIs',
      description:
        'Conectamos diferentes plataformas e sistemas para criar um fluxo de trabalho integrado. Desenvolvemos e consumimos APIs para garantir que seus dados fluam perfeitamente entre todas as suas ferramentas.',
      technologies: ['REST APIs', 'GraphQL', 'OAuth', 'Webhooks', 'Middleware'],
      features: [
        'Sincronização de dados',
        'Integração com terceiros',
        'Documentação completa',
        'Segurança de ponta a ponta',
      ],
    },
    {
      icon: Lightbulb,
      title: 'Consultoria Estratégica em Tecnologia',
      description:
        'Oferecemos consultoria especializada para identificar oportunidades de melhoria, definir arquitetura de software e traçar o melhor caminho tecnológico para o seu negócio crescer de forma sustentável.',
      technologies: ['Arquitetura de Software', 'Cloud', 'DevOps', 'Metodologias Ágeis'],
      features: [
        'Análise de necessidades',
        'Planejamento estratégico',
        'Otimização de processos',
        'Mentoria técnica',
      ],
    },
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Nossos Serviços</h1>
          <p className="services-hero-description">
            Oferecemos soluções completas em tecnologia, desde a concepção até a entrega, sempre
            focados em qualidade, performance e resultados tangíveis para o seu negócio.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className="service-detail-card">
                <div className="service-detail-header">
                  <div className="service-detail-icon">
                    <service.icon size={36} />
                  </div>
                  <h2>{service.title}</h2>
                </div>
                <p className="service-detail-description">{service.description}</p>
                <div className="service-detail-content">
                  <div className="service-detail-section">
                    <h4>Tecnologias</h4>
                    <div className="tech-tags">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="service-detail-section">
                    <h4>O que está incluído</h4>
                    <ul className="features-list">
                      {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="services-cta-section">
            <div className="services-cta-card">
              <h2>Pronto para transformar seu negócio?</h2>
              <p>
                Entre em contato conosco para discutir como podemos ajudar a impulsionar seu
                projeto com as melhores soluções em tecnologia.
              </p>
              <Link to="/contato" className="btn btn-primary">
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
