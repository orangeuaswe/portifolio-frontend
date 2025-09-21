import React, { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

// Pass apiBase if you want; otherwise it tries REACT_APP_API_BASE or defaults to ''
const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) ||
  (typeof process !== 'undefined' && process.env?.REACT_APP_API_BASE) ||
  '';

export default function ContactSection({ id = "contact", apiBase = API_BASE }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // honeypot (leave blank)
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(s => ({ ...s, [name]: value }));
    setErrors(s => ({ ...s, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = 'Please enter a valid email.';
    if (!formData.subject.trim()) next.subject = 'Please add a subject.';
    if (formData.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    // honeypot check (bots sometimes fill this)
    if (formData.company.trim() !== '') next.message = 'Form failed spam check.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', company: '' });
    } catch (err) {
      console.error('Contact submit failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} data-observe="true" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="gradient-text">Collaborate</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to create something amazing together? I’m always excited to discuss new opportunities and ideas!
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative">
            {/* Success / error banners (aria-live so screen readers announce) */}
            <div aria-live="polite" className="mb-6">
              {submitStatus === 'success' && (
                <div className="p-6 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-400 rounded-full mr-3 animate-pulse" />
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-green-200 text-sm mt-2">
                    Thanks for reaching out. I’ll respond soon.
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-6 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-red-400 rounded-full mr-3" />
                    <span className="font-medium">Something went wrong.</span>
                  </div>
                  <p className="text-red-200 text-sm mt-2">
                    Please try again later or email me directly at <span className="text-white/90">anirudhdeveram@gmail.com</span>.
                  </p>
                </div>
              )}
            </div>

            <form className="space-y-8" onSubmit={onSubmit} noValidate>
              {/* Honeypot field (hidden) */}
              <label className="hidden" htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                value={formData.company}
                onChange={onChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/90 font-medium mb-2">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={onChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    required
                    className="form-input w-full px-6 py-4 bg-white/5 border border-white/25 rounded-xl text-white/95 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="e.g. Anirudh Deveram"
                  />
                  {errors.name && <p id="name-error" className="mt-2 text-sm text-red-300">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/90 font-medium mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={onChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                    className="form-input w-full px-6 py-4 bg-white/5 border border-white/25 rounded-xl text-white/95 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p id="email-error" className="mt-2 text-sm text-red-300">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white/90 font-medium mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  autoComplete="off"
                  value={formData.subject}
                  onChange={onChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  required
                  className="form-input w-full px-6 py-4 bg-white/5 border border-white/25 rounded-xl text-white/95 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Project collaboration, internship, etc."
                />
                {errors.subject && <p id="subject-error" className="mt-2 text-sm text-red-300">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-white/90 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  rows={6}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                  className="form-input w-full px-6 py-4 bg-white/5 border border-white/25 rounded-xl text-white/95 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                  placeholder="Tell me about your project, opportunity, or how we can work together..."
                />
                {errors.message && <p id="message-error" className="mt-2 text-sm text-red-300">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary group relative w-full text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Mail className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                      Send Message
                      <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
