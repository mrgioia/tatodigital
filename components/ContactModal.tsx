'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Check, AlertCircle, Loader2, ChevronDown, User, Mail, Building2, Phone, Briefcase, MessageSquare } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalProvider';
import { useLanguage } from '@/lib/language-context';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  service_interest: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  service_interest: '',
  message: '',
};

const SERVICE_OPTIONS_PT = [
  { value: '', label: 'Selecione um interesse (opcional)' },
  { value: 'Sistemas sob medida', label: 'Sistemas sob medida' },
  { value: 'Dashboards e BI', label: 'Dashboards e BI' },
  { value: 'Automação com IA', label: 'Automação com IA' },
  { value: 'Plataformas SaaS', label: 'Plataformas SaaS' },
  { value: 'Gestão financeira / performance', label: 'Gestão financeira / performance' },
  { value: 'Estruturação de processos digitais', label: 'Estruturação de processos digitais' },
  { value: 'Ainda não sei', label: 'Ainda não sei' },
];

const SERVICE_OPTIONS_EN = [
  { value: '', label: 'Select an interest (optional)' },
  { value: 'Custom systems', label: 'Custom systems' },
  { value: 'Dashboards & BI', label: 'Dashboards & BI' },
  { value: 'AI Automation', label: 'AI Automation' },
  { value: 'SaaS Platforms', label: 'SaaS Platforms' },
  { value: 'Financial management / performance', label: 'Financial management / performance' },
  { value: 'Digital process structuring', label: 'Digital process structuring' },
  { value: 'Not sure yet', label: 'Not sure yet' },
];

function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  return utm;
}

export default function ContactModal() {
  const { isOpen, config, closeModal } = useContactModal();
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const isPt = language === 'pt';
  const serviceOptions = isPt ? SERVICE_OPTIONS_PT : SERVICE_OPTIONS_EN;

  const labels = isPt
    ? {
        title_fale: 'Fale com a TATO',
        title_estruturar: 'Vamos estruturar sua operação',
        name: 'Nome completo',
        email: 'Email profissional',
        phone: 'Telefone (opcional)',
        company: 'Empresa',
        role: 'Cargo (opcional)',
        service: 'Área de interesse',
        message: 'Mensagem',
        messagePlaceholder: 'Conte-nos sobre seu projeto ou necessidade...',
        submit: 'Enviar mensagem',
        submitting: 'Enviando...',
        success_fale: 'Mensagem enviada. A TATO Digital recebeu seu contato e retornará em breve.',
        success_estruturar: 'Recebemos seu interesse. Vamos analisar o contexto da sua operação e retornar com os próximos passos.',
        errorGeneric: 'Algo deu errado. Tente novamente.',
        close: 'Fechar',
        required: 'Obrigatório',
        invalidEmail: 'Email inválido',
        newMessage: 'Enviar outra mensagem',
      }
    : {
        title_fale: 'Talk to TATO',
        title_estruturar: "Let's structure your operation",
        name: 'Full name',
        email: 'Professional email',
        phone: 'Phone (optional)',
        company: 'Company',
        role: 'Role (optional)',
        service: 'Area of interest',
        message: 'Message',
        messagePlaceholder: 'Tell us about your project or need...',
        submit: 'Send message',
        submitting: 'Sending...',
        success_fale: 'Message sent. TATO Digital received your contact and will get back to you soon.',
        success_estruturar: "We've received your interest. We'll analyze your operational context and follow up with the next steps.",
        errorGeneric: 'Something went wrong. Please try again.',
        close: 'Close',
        required: 'Required',
        invalidEmail: 'Invalid email',
        newMessage: 'Send another message',
      };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setFormState('idle');
      setErrors({});
      setServerError('');
    }
  }, [isOpen]);

  // Focus first input when opened
  useEffect(() => {
    if (isOpen && formState === 'idle') {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, formState]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = labels.required;
    if (!formData.email.trim()) newErrors.email = labels.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = labels.invalidEmail;
    if (!formData.company.trim()) newErrors.company = labels.required;
    if (!formData.message.trim()) newErrors.message = labels.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, labels]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!config) return;

    setFormState('loading');
    setServerError('');

    try {
      const utmParams = getUTMParams();

      const payload = {
        ...formData,
        lead_intent: config.intent,
        lead_source: config.source,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
        language: typeof navigator !== 'undefined' ? navigator.language : 'pt-BR',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        ...utmParams,
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setFormState('idle');
        } else {
          setServerError(data.message || labels.errorGeneric);
          setFormState('error');
        }
        return;
      }

      setFormState('success');
    } catch {
      setServerError(labels.errorGeneric);
      setFormState('error');
    }
  };

  const title = config?.intent === 'estruturar_operacao' ? labels.title_estruturar : labels.title_fale;
  const successMessage = config?.intent === 'estruturar_operacao' ? labels.success_estruturar : labels.success_fale;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#001618]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,51,255,0.15),0_0_120px_rgba(108,207,246,0.05)]"
          >
            {/* Neon top border accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-frozen-lake to-transparent opacity-80" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-grey hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label={labels.close}
            >
              <X size={18} />
            </button>

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-frozen-lake" />
                  <span className="text-[10px] font-mono font-black text-frozen-lake uppercase tracking-[0.4em]">
                    {config?.intent === 'estruturar_operacao' ? (isPt ? 'Estruturação' : 'Structuring') : 'Contact'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase italic tracking-tight">
                  {title}
                </h2>
              </div>

              {/* Form State: Default */}
              {(formState === 'idle' || formState === 'loading') && (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      ref={firstInputRef}
                      icon={<User size={16} />}
                      label={labels.name}
                      value={formData.name}
                      onChange={(v) => handleChange('name', v)}
                      error={errors.name}
                      required
                      id="contact-name"
                    />
                    <FormInput
                      icon={<Mail size={16} />}
                      label={labels.email}
                      type="email"
                      value={formData.email}
                      onChange={(v) => handleChange('email', v)}
                      error={errors.email}
                      required
                      id="contact-email"
                    />
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      icon={<Phone size={16} />}
                      label={labels.phone}
                      type="tel"
                      value={formData.phone}
                      onChange={(v) => handleChange('phone', v)}
                      id="contact-phone"
                    />
                    <FormInput
                      icon={<Building2 size={16} />}
                      label={labels.company}
                      value={formData.company}
                      onChange={(v) => handleChange('company', v)}
                      error={errors.company}
                      required
                      id="contact-company"
                    />
                  </div>

                  {/* Role & Service Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      icon={<Briefcase size={16} />}
                      label={labels.role}
                      value={formData.role}
                      onChange={(v) => handleChange('role', v)}
                      id="contact-role"
                    />
                    <FormSelect
                      icon={<ChevronDown size={16} />}
                      label={labels.service}
                      value={formData.service_interest}
                      onChange={(v) => handleChange('service_interest', v)}
                      options={serviceOptions}
                      id="contact-service"
                    />
                  </div>

                  {/* Message */}
                  <FormTextarea
                    icon={<MessageSquare size={16} />}
                    label={labels.message}
                    value={formData.message}
                    onChange={(v) => handleChange('message', v)}
                    error={errors.message}
                    placeholder={labels.messagePlaceholder}
                    required
                    id="contact-message"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="group w-full relative px-8 py-4 bg-tato-blue text-white font-display font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-frozen-lake hover:text-ink-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(0,51,255,0.3)]"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {labels.submitting}
                      </>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        {labels.submit}
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </button>
                </form>
              )}

              {/* Form State: Success */}
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-8"
                >
                  <div className="relative mx-auto w-20 h-20">
                    <div className="absolute inset-0 bg-frozen-lake/20 blur-2xl rounded-full animate-pulse" />
                    <div className="relative w-full h-full rounded-full bg-frozen-lake/10 border border-frozen-lake/30 flex items-center justify-center">
                      <Check size={32} className="text-frozen-lake" />
                    </div>
                  </div>
                  <p className="text-lg text-porcelain/90 font-medium leading-relaxed max-w-md mx-auto">
                    {successMessage}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={closeModal}
                      className="px-8 py-3 bg-white/5 border border-white/10 text-porcelain font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                    >
                      {labels.close}
                    </button>
                    <button
                      onClick={() => {
                        setFormData(initialFormData);
                        setFormState('idle');
                        setErrors({});
                      }}
                      className="px-8 py-3 bg-tato-blue/20 border border-tato-blue/30 text-frozen-lake font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-tato-blue/30 transition-all"
                    >
                      {labels.newMessage}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Form State: Error */}
              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-8"
                >
                  <div className="relative mx-auto w-20 h-20">
                    <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                    <div className="relative w-full h-full rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                      <AlertCircle size={32} className="text-red-400" />
                    </div>
                  </div>
                  <p className="text-lg text-porcelain/90 font-medium leading-relaxed max-w-md mx-auto">
                    {serverError || labels.errorGeneric}
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="px-8 py-3 bg-white/5 border border-white/10 text-porcelain font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                  >
                    {isPt ? 'Tentar novamente' : 'Try again'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Form Sub-Components ────────────────────────────────────────────

interface FormInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  id: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ icon, label, value, onChange, error, type = 'text', required, id }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-[11px] font-display font-bold text-grey uppercase tracking-[0.15em]">
        {icon}
        {label}
        {required && <span className="text-frozen-lake">*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-porcelain text-sm font-medium placeholder:text-grey/50 focus:outline-none focus:ring-1 transition-all duration-300 ${
          error
            ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
            : 'border-white/10 focus:ring-frozen-lake/30 focus:border-frozen-lake/30 hover:border-white/20'
        }`}
      />
      {error && (
        <p className="text-[10px] text-red-400 font-medium flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  )
);
FormInput.displayName = 'FormInput';

interface FormSelectProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id: string;
}

function FormSelect({ icon, label, value, onChange, options, id }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-[11px] font-display font-bold text-grey uppercase tracking-[0.15em]">
        {icon}
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-porcelain text-sm font-medium focus:outline-none focus:ring-1 focus:ring-frozen-lake/30 focus:border-frozen-lake/30 hover:border-white/20 transition-all duration-300 appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23757780' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#001618] text-porcelain">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormTextareaProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  id: string;
}

function FormTextarea({ icon, label, value, onChange, error, placeholder, required, id }: FormTextareaProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-[11px] font-display font-bold text-grey uppercase tracking-[0.15em]">
        {icon}
        {label}
        {required && <span className="text-frozen-lake">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-porcelain text-sm font-medium placeholder:text-grey/50 focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
          error
            ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
            : 'border-white/10 focus:ring-frozen-lake/30 focus:border-frozen-lake/30 hover:border-white/20'
        }`}
      />
      {error && (
        <p className="text-[10px] text-red-400 font-medium flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}
