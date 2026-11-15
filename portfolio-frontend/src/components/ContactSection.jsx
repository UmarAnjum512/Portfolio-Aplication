import { useState } from 'react';
import { submitContact } from '../services/api';
import toast from 'react-hot-toast';
import { profile } from '../data/profile';
import { MailIcon, PhoneIcon, WhatsappIcon, MapPinIcon, LinkedinIcon, GithubIcon } from './Icons';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Thank you! Your message has been sent successfully. ✨');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    { Icon: MailIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { Icon: PhoneIcon, label: 'Phone', value: profile.phone, href: `tel:+${profile.whatsapp}` },
    { Icon: WhatsappIcon, label: 'WhatsApp', value: 'Chat on WhatsApp', href: `https://wa.me/${profile.whatsapp}` },
    { Icon: LinkedinIcon, label: 'LinkedIn', value: 'Connect with me', href: profile.linkedin },
    { Icon: GithubIcon, label: 'GitHub', value: 'UmarAnjum512', href: profile.github },
  ];

  return (
    <section className="pro-section" id="contact">
      <div className="site-container">
        <p className="section-label shiny-sec reveal">Let&apos;s talk</p>
        <h2 className="section-heading reveal">Get In Touch</h2>

        <div className="contact-pro-grid">
          <div className="contact-pro-info reveal">
            <p className="contact-lead">
              Have a project in mind, a role to fill, or a question about full-stack development?
              Send me a message and I&apos;ll get back to you as soon as possible.
            </p>

            <ul className="contact-channels">
              {channels.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span className="icon-chip"><Icon size={18} /></span>
                    <span className="channel-text">
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <div className="channel-static">
                  <span className="icon-chip"><MapPinIcon size={18} /></span>
                  <span className="channel-text">
                    <span>Location</span>
                    <strong>{profile.location}</strong>
                  </span>
                </div>
              </li>
            </ul>

            <p className="availability-note">
              <span className="status-dot" /> Open to full-time, part-time &amp; freelance work
            </p>
          </div>

          <form className="dark-form contact-form-card reveal" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="c-name">Name</label>
            <input id="c-name" type="text" name="name" className="dark-input" placeholder="Your name" value={form.name} onChange={handleChange} required />

            <label className="form-label" htmlFor="c-email">Email</label>
            <input id="c-email" type="email" name="email" className="dark-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />

            <label className="form-label" htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" className="dark-textarea" placeholder="Tell me about your project..." rows="6" value={form.message} onChange={handleChange} required></textarea>

            <button type="submit" className="dark-submit-btn" disabled={loading}>
              {loading ? 'Sending message...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
