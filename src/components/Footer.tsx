import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/portfolio', label: 'Portfólio' },
    { path: '/sobre', label: 'Sobre Nós' },
    { path: '/contato', label: 'Contato' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/tecdital', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/tecdital', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contato@tecdital.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <span className="logo-text">tec</span>
              <span className="logo-accent">dital</span>
            </Link>
            <p className="footer-description">
              Especialistas em criar sites modernos e automatizar processos para o seu negócio.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Navegação</h4>
            <div className="footer-links">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Redes Sociais</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} tecdital. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
