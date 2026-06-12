import React from 'react';

export default function NDAPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 md:py-32 transition-colors duration-300">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary dark:text-white mb-12 tracking-tight">Confidentiality & NDA Policy</h1>
        
        <div className="space-y-6 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            KORK InventReX understands that many inventors, entrepreneurs, startups, researchers, and businesses wish to discuss innovative concepts before intellectual property protection has been secured. Protecting confidential information is an important component of our operational philosophy.
          </p>

          <p>
            As part of our standard business practices, project information is handled with care and shared only with individuals or professionals reasonably necessary to support requested services. Depending on the nature of the engagement, information may be shared with technical illustrators, project coordinators, patent attorneys, registered patent agents, consultants, or other service providers involved in project execution.
          </p>

          <p>
            Clients who desire additional confidentiality protections may request a Non-Disclosure Agreement (“NDA”) prior to providing detailed invention disclosures or proprietary information. NDA requests may be submitted through our Contact page, consultation request forms, project intake forms, or by contacting us directly.
          </p>

          <p>
            Confidential information may include invention concepts, technical documentation, research data, product designs, business plans, software specifications, drawings, photographs, prototypes, manufacturing information, and other proprietary materials. KORK will take reasonable steps to maintain the confidentiality of such information consistent with applicable agreements and business practices.
          </p>

          <p>
            Confidentiality obligations do not apply to information that becomes publicly available through no fault of KORK, information independently developed without use of confidential materials, information lawfully obtained from another source, or information required to be disclosed by law or court order.
          </p>

          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="font-bold text-primary dark:text-white">Questions regarding confidentiality or NDA requests may be directed to:</p>
            <p>KORK InventReX</p>
            <p><a href="mailto:contact@korkinventrex.com" className="text-secondary dark:text-accent hover:underline">contact@korkinventrex.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
