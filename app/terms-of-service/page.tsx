import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 md:py-32 transition-colors duration-300">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary dark:text-white mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-sm font-bold text-accent mb-12 uppercase tracking-widest">Last Updated: June 2026</p>
        
        <div className="space-y-6 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            Welcome to KORK InventReX. By accessing our website, using our services, submitting information, or engaging with our platform, you agree to be bound by these Terms of Service. If you do not agree with these Terms, you should discontinue use of the website and services.
          </p>

          <p>
            KORK InventReX operates as an intellectual property support platform that coordinates various intellectual property-related services, including inventor support, patent search coordination, patent illustration services, trademark support, patent filing coordination, office action support coordination, and intellectual property project management. Our mission is to simplify the intellectual property process through structured workflows, technology-enabled project management, and coordination with qualified professionals.
          </p>

          <p>
            KORK InventReX is not a law firm and does not provide legal advice. Nothing contained on this website or within our communications should be interpreted as legal advice, legal representation, or legal opinion. Legal services, legal representation, patent prosecution, trademark prosecution, and legal analysis are provided exclusively by licensed patent attorneys and registered patent agents operating independently or through separate professional engagements.
          </p>

          <p>
            The use of our website, submission of information, participation in consultations, or engagement of services does not create an attorney-client relationship between any user and KORK InventReX. Any attorney-client relationship must be established directly with the licensed attorney or patent professional involved in the representation.
          </p>

          <p>
            Users are responsible for providing accurate, complete, and truthful information. KORK InventReX relies on information supplied by clients when evaluating projects and coordinating services. Delays, inaccuracies, or omissions in information provided by users may affect service delivery and project outcomes.
          </p>

          <p>
            Unless otherwise agreed in writing, clients retain ownership of their inventions, confidential information, intellectual property, and project-specific materials. KORK InventReX retains ownership of its website content, branding, workflows, templates, software systems, educational materials, methodologies, and proprietary business processes.
          </p>

          <p>
            KORK InventReX does not guarantee patent approval, trademark registration, intellectual property protection, business success, funding, revenue generation, commercialization outcomes, licensing opportunities, investor interest, or any specific legal or business result. Intellectual property matters involve numerous factors beyond our control, including decisions made by governmental agencies and third-party professionals.
          </p>

          <p>
            To the fullest extent permitted by law, KORK InventReX shall not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from use of the website or services. Users agree that their sole remedy for any claim shall be limited to the amount paid directly to KORK InventReX for the applicable services giving rise to the claim.
          </p>

          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Wyoming, without regard to conflict of law principles.
          </p>

          <p>
            KORK InventReX reserves the right to modify these Terms at any time. Updated Terms become effective immediately upon publication on the website.
          </p>

          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="font-bold text-primary dark:text-white">Questions regarding these Terms may be directed to:</p>
            <p>KORK InventReX</p>
            <p><a href="mailto:contact@korkinventrex.com" className="text-secondary dark:text-accent hover:underline">contact@korkinventrex.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
