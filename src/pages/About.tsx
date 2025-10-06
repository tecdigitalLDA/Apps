import { Target, Eye, Users } from 'lucide-react';
import './About.css';

export const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Missão',
      description:
        'Nossa missão é empoderar empresas através da tecnologia, criando soluções digitais inovadoras que transformam desafios em oportunidades de crescimento sustentável.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description:
        'Ser referência em desenvolvimento web e automação no Brasil, reconhecidos pela qualidade técnica, inovação constante e pelo impacto positivo nos negócios de nossos clientes.',
    },
    {
      icon: Users,
      title: 'Valores',
      description:
        'Excelência técnica, transparência nas relações, compromisso com prazos, inovação contínua e foco total no sucesso dos nossos clientes.',
    },
  ];

  const team = [
    {
      name: 'João Silva',
      role: 'Fundador & Desenvolvedor Full Stack',
      bio: 'Com mais de 8 anos de experiência em desenvolvimento web, João é apaixonado por criar soluções elegantes e eficientes. Especialista em React, Node.js e arquitetura de software, lidera projetos desde a concepção até a entrega.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Sobre a tecdital</h1>
          <p className="about-hero-description">
            Somos uma empresa de tecnologia especializada em desenvolvimento web e automação,
            comprometida em transformar ideias em soluções digitais de alta qualidade.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.title} className="value-card">
                <div className="value-icon">
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-story">
        <div className="container">
          <div className="story-content">
            <h2>Nossa História</h2>
            <p>
              A tecdital nasceu da paixão por tecnologia e do desejo de ajudar empresas a
              alcançarem seu máximo potencial no mundo digital. Fundada com o propósito de
              democratizar o acesso a soluções tecnológicas de qualidade, começamos desenvolvendo
              sites e aplicações web para pequenos negócios.
            </p>
            <p>
              Com o tempo, expandimos nossos serviços para incluir automação de processos e
              consultoria estratégica, sempre mantendo nosso compromisso com a excelência técnica
              e o atendimento personalizado. Hoje, atendemos clientes de diversos segmentos,
              desde startups inovadoras até empresas estabelecidas que buscam transformação
              digital.
            </p>
            <p>
              Acreditamos que tecnologia não é apenas sobre código e ferramentas, mas sobre
              pessoas, processos e resultados. Cada projeto é uma oportunidade de criar algo único
              e impactante, sempre focados em entregar valor real para nossos clientes.
            </p>
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <div className="section-title">
            <h2>Nossa Equipe</h2>
            <p>Conheça as pessoas por trás dos projetos</p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
