import React from 'react';
import { Mail, Calendar } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section 
      id="contact" 
      className="relative flex flex-col items-start pt-20 pb-16 w-full text-left"
    >
      
      {/* Header */}
      <div className="space-y-3 mb-12">
        <h2 className="text-3xl sm:text-4.5xl font-bold tracking-tight text-[#0A2540] dark:text-white font-display select-none">
          Let’s Build Together
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
          Have an interesting project, app venture, or engineering problem that needs professional implementation? Let’s connect and make it happen.
        </p>
      </div>

      {/* Contact Card Layout */}
      <div className="w-full">
        <div className="group p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Column 1: Connection Tag (Left) */}
          <div className="md:col-span-3 space-y-1">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#2B6A65] flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-4 h-4 text-white" />
              </span>
              <h3 className="text-lg font-bold text-[#0A2540] dark:text-white font-display leading-tight select-none">
                Inquiries
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block pl-13 select-none">
              Open for Opportunities
            </span>
          </div>

          {/* Column 2: CTA details (Center) */}
          <div className="md:col-span-5 text-left pl-4 md:pl-0">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Send an email outlining your project timeline and scope. You will receive a direct response in less than 12 hours.
            </p>
          </div>

          {/* Column 3: Button and Email (Right) */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3.5 pl-4 md:pl-0 select-none">
            <a
              href="mailto:vinsyadav5@gmail.com"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-[#11385c] dark:hover:bg-slate-100 transition-all font-display shadow-sm w-full md:w-auto text-center justify-center"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              Start a Conversation
            </a>
            <a 
              href="mailto:vinsyadav5@gmail.com" 
              className="text-base sm:text-lg font-bold text-[#0A2540] dark:text-teal-400 hover:text-[#2B6A65] dark:hover:text-white transition-colors"
            >
              vinsyadav5@gmail.com
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
