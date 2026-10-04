import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Mail, Send, Phone, MapPin, Copy } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Design',
    message: '',
  });

  const email = 'gilbert@webdev.studio';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', service: 'Web Design', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-[var(--modal-bg)] border-2 border-[var(--modal-border)] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl text-[var(--text-primary)] z-10 my-8 transition-colors duration-300"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-[var(--modal-input-bg)] hover:opacity-80 text-[var(--text-primary)] transition-colors cursor-pointer border border-[var(--border-subtle)]"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
                  <Check size={32} />
                </div>
                <h3 className="hero-heading font-black uppercase text-3xl mb-3">
                  Message Sent!
                </h3>
                <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-sm">
                  Thanks for reaching out! Gilbert will review your project requirements and respond within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl leading-tight">
                    Let&apos;s Build Together
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mt-1">
                    Have a vision for a website, web app, or AI project? Let&apos;s talk.
                  </p>
                </div>

                {/* Quick copy info */}
                <div className="flex items-center justify-between bg-[var(--modal-input-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 mb-6 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-[var(--text-primary)]" />
                    <span className="font-mono text-[var(--text-primary)] select-all font-medium">{email}</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--modal-input-bg)] hover:opacity-80 text-xs text-[var(--text-primary)] border border-[var(--border-subtle)] transition cursor-pointer"
                  >
                    {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[var(--modal-input-bg)] border border-[var(--modal-input-border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-primary)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[var(--modal-input-bg)] border border-[var(--modal-input-border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-primary)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[var(--modal-input-bg)] border border-[var(--modal-input-border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-primary)] transition cursor-pointer"
                    >
                      <option value="Web Design">01 - Web Design</option>
                      <option value="Web App Development (e-commerce, CRM etc)">02 - Web App Development (e-commerce, CRM etc)</option>
                      <option value="SEO Optimization">03 - SEO Optimization</option>
                      <option value="AI Chatbots & Customer Assistants">04 - AI Chatbots & Customer Assistants</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] mb-1.5">
                      Project Details & Timeline
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell me about your product, desired vibe, key deliverables, and timeframe..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[var(--modal-input-bg)] border border-[var(--modal-input-border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-primary)] transition resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full relative inline-flex items-center justify-center gap-2 rounded-full text-white font-medium uppercase tracking-widest cursor-pointer px-8 py-3.5 text-sm transition-all"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                        outline: '2px solid #FFFFFF',
                        outlineOffset: '-3px',
                      }}
                    >
                      <Send size={16} /> Send Inquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
