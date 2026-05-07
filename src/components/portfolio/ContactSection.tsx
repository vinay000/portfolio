import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, Send, Phone, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 max-w-5xl mx-auto space-y-16">

      {/* Glow Effects */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-red-400 tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          communication.node
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Let’s Build Something Majestic
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-xl font-light leading-relaxed">
          Have an ambitious project, venture proposal, or technical problem that requires senior-level systems thinking? Let’s connect.
        </p>
      </div>

      {/* Split Layout Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Info Column (Left) */}
        <div className="lg:col-span-5 rounded-2xl p-6 md:p-8 bg-neutral-950/40 border border-neutral-900 glass-panel flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-100 font-display">Direct Channels</h3>

            <div className="space-y-4 font-mono text-xs text-neutral-400">
              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-950 border border-neutral-900/80 flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-neutral-500 uppercase tracking-wider text-[11px]">Direct Mail</div>
                  <div className="text-slate-100 text-sm md:text-base">vinsyadav5@gmail.com</div>
                </div>
              </div>

              {/* <div className="space-y-1.5 p-3 rounded-lg bg-neutral-950 border border-neutral-900/80 flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-neutral-500 uppercase tracking-wider text-[11px]">Mobile Node</div>
                  <div className="text-slate-100 text-sm md:text-base">+91 8837682541</div>
                </div>
              </div> */}

              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-950 border border-neutral-900/80 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-neutral-500 uppercase tracking-wider text-[11px]">Location</div>
                  <div className="text-slate-100 text-sm md:text-base">Bengaluru, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900 text-xs md:text-sm text-neutral-500 leading-relaxed">
            Response rate availability is currently high. Typical response turnaround: &lt; 12 hours.
          </div>
        </div>

        {/* Form Column (Right) */}
        <div className="lg:col-span-7 rounded-2xl p-6 md:p-8 bg-neutral-950/40 border border-neutral-900 glass-panel">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                      Identity / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-900 focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 text-base text-slate-100 placeholder-neutral-700 outline-none transition-all font-light"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. satoshi@bitcoin.org"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-900 focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 text-base text-slate-100 placeholder-neutral-700 outline-none transition-all font-light"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                    Transmission / Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project proposal, timeline, or scope details..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-900 focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 text-base text-slate-100 placeholder-neutral-700 outline-none transition-all font-light resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 transition-all font-display clickable"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                      Broadcasting...
                    </span>
                  ) : (
                    <>
                      Transmit Proposal
                      <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-prompt"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-100 font-display">Transmission Successful</h3>
                  <p className="text-sm text-neutral-400 max-w-sm font-light">
                    Your message has been packaged and routed. Vinay will review and reply shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
};
