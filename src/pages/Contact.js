import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Globe, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [status,  setStatus]  = useState('idle'); // idle | success | error
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900">Contact</h1>
          <p className="text-slate-500 mt-1">Get in touch with the SUNRIZE team.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="font-semibold text-slate-900 text-lg mb-6">Send a Message</h2>

            {status === 'success' && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 mb-6">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Message sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input
                  type="text" name="subject" value={form.subject} onChange={handleChange} required
                  placeholder="What's this about?"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us more…"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
              >
                {loading ? 'Sending…' : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-slate-700">team@sunrize.app</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Built for</p>
                    <p className="text-sm font-medium text-slate-700">NASA Space Apps Challenge 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Links</h3>
              <div className="space-y-2">
                {[
                  { icon: Github,   label: 'GitHub',   href: 'https://github.com' },
                  { icon: Linkedin, label: 'LinkedIn',  href: 'https://linkedin.com' },
                  { icon: Globe,    label: 'Website',   href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600 hover:text-slate-900"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Mission</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                "Will It Rain On My Parade?" — Strategic Weather Intelligence for long-term outdoor planning using NASA Earth observation data.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
