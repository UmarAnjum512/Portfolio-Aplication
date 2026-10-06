import { useState } from 'react';
import { submitContact } from '../services/api';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <section className="contact-section" id="contact">
      <div className="site-container">
        <p className="section-label shiny-sec">Let's talk</p>
        <h2 className="section-heading">Contact</h2>

        <div className="contact-grid">
          {/* Left Column */}
          <div className="contact-info-col">
            <p>
              Have a question, a project in mind, or want to discuss full-stack architecture?
              Feel free to reach out directly through this form or connect on LinkedIn and GitHub.
            </p>

            <div className="contact-meta-item">
              <span>Location:</span>
              <strong>Karachi, Pakistan</strong>
            </div>

            <div className="contact-meta-item">
              <span>Availability:</span>
              <strong style={{ color: 'var(--green-dot)' }}>Open to Full-Time &amp; Part-Time</strong>
            </div>

            <div className="contact-meta-item">
              <span>Specialization:</span>
              <strong>ASP.NET Core • PHP Laravel • React</strong>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <form className="dark-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                className="dark-input"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                className="dark-input"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                className="dark-textarea"
                placeholder="Write your message here..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className="dark-submit-btn"
                disabled={loading}
              >
                {loading ? 'Sending message...' : 'Submit Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
