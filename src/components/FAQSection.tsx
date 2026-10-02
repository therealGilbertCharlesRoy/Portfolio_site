import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Plus, ArrowRight } from 'lucide-react';

interface FAQItem {
  number: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    number: '01',
    category: 'Process',
    question: 'What does your end-to-end development process look like?',
    answer:
      'Every project moves through 4 structured phases: 1) Discovery & Architecture where we define user journeys, database schemas, and technical specs; 2) UI/UX Prototyping in Figma with interactive previews; 3) Full-Stack Engineering using React, TypeScript, and modern APIs with clean modular code; and 4) QA & Launch with speed optimization, cross-device testing, SEO verification, and live deployment.',
  },
  {
    number: '02',
    category: 'Timeline',
    question: 'How long does a typical project take to design and launch?',
    answer:
      'High-conversion marketing websites typically take 2–3 weeks from kickoff to launch. Bespoke web applications, custom e-commerce platforms, and CRM dashboards usually take 4–8 weeks depending on database complexity, third-party integrations, and custom logic. You will always receive a clear, milestone-driven roadmap before we write the first line of code.',
  },
  {
    number: '03',
    category: 'Tech Stack',
    question: 'What technologies and frameworks do you build with?',
    answer:
      'I specialize in modern, high-performance tech stacks: React, Next.js, TypeScript, and Tailwind CSS for the frontend, paired with Node.js, PostgreSQL/Supabase, or Firebase for scalable backends. For e-commerce, I integrate Stripe or headless Shopify, and for AI capabilities, I build with Google Gemini and OpenAI APIs.',
  },
  {
    number: '04',
    category: 'SEO & Speed',
    question: 'Will my website be mobile-responsive and optimized for Google search?',
    answer:
      'Yes, 100%. Every build is crafted mobile-first, ensuring fluid performance across smartphones, tablets, and high-resolution desktops. On the SEO front, I implement semantic HTML5, dynamic OpenGraph meta tags, JSON-LD structured schemas, automatic XML sitemaps, and asset compression to target 95+ Google Lighthouse and Core Web Vitals scores.',
  },
  {
    number: '05',
    category: 'Collaboration',
    question: 'How do we collaborate and track progress during the sprint?',
    answer:
      'You get complete transparency throughout the entire build. We communicate seamlessly via Slack, Discord, or email, hold brief weekly video check-ins, and you receive access to a private staging URL where you can interact with live progress as new features are deployed.',
  },
  {
    number: '06',
    category: 'AI Solutions',
    question: 'Can you integrate AI chatbots or custom automations into my existing site?',
    answer:
      'Absolutely. Whether you need a customer support chatbot trained on your private knowledge base, automated lead qualification pipelines, or AI workflow integrations connecting your web app directly to your CRM, I engineer solutions that plug cleanly into your existing architecture.',
  },
  {
    number: '07',
    category: 'Maintenance',
    question: 'What happens after launch? Do you offer ongoing support?',
    answer:
      'Every project comes with a 30-day post-launch warranty for bug fixes, performance monitoring, and fine-tuning. For ongoing needs, I offer monthly support retainers covering routine maintenance, security updates, database backups, and continuous feature development.',
  },
];

interface FAQSectionProps {
  onContactClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#FFFFFF] text-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-6 pb-28 sm:pb-36 md:pb-44 relative z-0 border-t border-[rgba(12,12,12,0.1)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 md:mb-24">
          <FadeIn delay={0} y={30}>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#0C0C0C]/50 mb-3">
                Development Process & FAQs
              </span>
              <h2 className="text-[#0C0C0C] font-black uppercase text-[clamp(2.75rem,11vw,140px)] leading-none tracking-tight">
                FAQ
              </h2>
            </div>
          </FadeIn>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeIn
                key={item.number}
                delay={index * 0.05}
                y={20}
                className="border-b border-[rgba(12,12,12,0.15)] transition-colors duration-200"
              >
                <div className="w-full">
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-8 md:py-9 flex items-start justify-between text-left gap-4 sm:gap-6 group cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-4 sm:gap-8 md:gap-12 flex-1">
                      {/* Item Number */}
                      <span className="font-mono text-sm sm:text-base font-semibold text-[#0C0C0C]/40 group-hover:text-[#0C0C0C] pt-1 transition-colors">
                        {item.number}
                      </span>

                      {/* Question & Category */}
                      <div className="flex flex-col gap-1.5 flex-1 pr-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#0C0C0C]/45 font-medium">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-[#0C0C0C] group-hover:text-black transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[rgba(12,12,12,0.2)] flex items-center justify-center flex-shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? 'bg-[#0C0C0C] text-white rotate-45 border-transparent' : 'bg-transparent text-[#0C0C0C] group-hover:border-[#0C0C0C]'
                      }`}
                    >
                      <Plus size={18} />
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`content-${item.number}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 sm:pl-16 md:pl-20 pr-4 pb-8 text-[#0C0C0C]/75 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        {onContactClick && (
          <FadeIn delay={0.2} y={30} className="mt-14 sm:mt-18 md:mt-24">
            <div className="bg-[#0C0C0C] text-[#D7E2EA] rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex flex-col gap-2 text-center md:text-left">
                <h4 className="font-bold text-xl sm:text-2xl text-white">
                  Have a specific question about your project?
                </h4>
                <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-xl">
                  Every business has unique requirements. Reach out directly to discuss architecture, timelines, or custom features.
                </p>
              </div>
              <button
                onClick={onContactClick}
                className="flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-white text-[#0C0C0C] font-semibold text-sm uppercase tracking-wider hover:bg-[#D7E2EA] transition-all cursor-pointer whitespace-nowrap group shrink-0"
              >
                <span>Ask a Question</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
