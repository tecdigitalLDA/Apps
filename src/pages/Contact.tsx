import { useState, type FormEvent } from 'react';
import { Mail, Linkedin, Github, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const { error: submitError } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    setLoading(false);

    if (submitError) {
      setError('Erro ao enviar mensagem. Por favor, tente novamente.');
      return;
    }

    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@tecdital.com',
      href: 'mailto:contato@tecdital.com',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/tecdital',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/tecdital',
    },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Entre em Contato</h1>
          <p className="contact-hero-description">
            Tem um projeto em mente? Vamos conversar sobre como podemos ajudar o seu negócio a
            crescer com tecnologia.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrapper">
              <h2>Envie sua Mensagem</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows={6}
                  />
                </div>

                {error && <div className="form-error">{error}</div>}

                {success && (
                  <div className="form-success">
                    <CheckCircle size={20} />
                    <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            </div>

            <div className="contact-info-wrapper">
              <h2>Informações de Contato</h2>
              <p className="contact-info-description">
                Você também pode entrar em contato diretamente através dos canais abaixo:
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info) => (
                  <a key={info.label} href={info.href} className="contact-info-item">
                    <div className="contact-info-icon">
                      <info.icon size={24} />
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">{info.label}</span>
                      <span className="contact-info-value">{info.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="contact-social">
                <h3>Redes Sociais</h3>
                <div className="contact-social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
