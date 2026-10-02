import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with meticulous attention to layout, typography, intuitive UI/UX design, and seamless responsive digital experiences.',
  },
  {
    number: '02',
    title: 'Web App Development (e-commerce, CRM etc)',
    description:
      'Full-stack web application engineering including custom e-commerce platforms, scalable CRM solutions, interactive user dashboards, and robust APIs built for speed and scalability.',
  },
  {
    number: '03',
    title: 'SEO Optimization',
    description:
      'Comprehensive technical and on-page search engine optimization, web vitals performance tuning, and structured metadata strategies to drive high organic search rankings and visibility.',
  },
  {
    number: '04',
    title: 'AI Chatbots & Customer Assistants',
    description:
      'Custom-trained AI chatbots, knowledge base assistants, and conversational agents embedded into web applications for 24/7 instant customer support, smart lead qualification, and automated booking.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.1}
              y={30}
              className="group border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
                {/* Number */}
                <div className="font-black text-[#0C0C0C] leading-none text-[clamp(3rem,10vw,140px)] min-w-[120px] sm:min-w-[160px] md:min-w-[200px] select-none tracking-tight">
                  {item.number}
                </div>

                {/* Name & Description */}
                <div className="flex flex-col gap-2 sm:gap-3 flex-1 pt-1 md:pt-4">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-light text-[#0C0C0C] opacity-60 leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
