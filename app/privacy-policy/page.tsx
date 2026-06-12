import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 md:py-32 transition-colors duration-300">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-sm font-bold text-accent mb-12 uppercase tracking-widest">Last Updated: June 2026</p>
        
        <div className="space-y-6 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            KORK InventReX (“KORK,” “we,” “our,” or “us”) is committed to protecting the privacy and confidentiality of the individuals, businesses, inventors, entrepreneurs, researchers, and intellectual property professionals who interact with our website and services. We recognize that intellectual property projects frequently involve sensitive information, proprietary concepts, technical documentation, and confidential business materials. Accordingly, we strive to handle information responsibly and transparently.
          </p>

          <p>
            When you visit our website, submit an inquiry, schedule a consultation, request services, access our client portal, or otherwise interact with KORK InventReX, we may collect information that you voluntarily provide. Such information may include your name, company name, email address, telephone number, mailing address, invention descriptions, project documents, technical materials, patent-related information, trademark-related information, drawings, photographs, CAD files, and other materials necessary to evaluate or support your project.
          </p>

          <p>
            We may also collect certain technical information automatically through standard website technologies. This information may include IP addresses, browser type, operating system, referring pages, device information, and website usage data. Such information is used to improve website functionality, maintain security, analyze website performance, and enhance the user experience.
          </p>

          <p>
            Information collected by KORK InventReX is used to respond to inquiries, evaluate project requests, coordinate services, communicate with clients, facilitate project management activities, improve operational processes, maintain records, and comply with legal or regulatory obligations. Information may also be used to provide educational resources, service updates, or communications relevant to our relationship with you.
          </p>

          <p>
            KORK InventReX does not sell, rent, or trade personal information to third parties. However, information may be shared with trusted service providers, licensed patent attorneys, registered patent agents, technical consultants, contractors, software providers, payment processors, hosting providers, or other professionals when reasonably necessary to provide requested services. Such disclosures are limited to the information necessary to perform the applicable services and are made in accordance with appropriate confidentiality obligations where applicable.
          </p>

          <p>
            We implement reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, misuse, alteration, disclosure, or destruction. Despite these efforts, no method of electronic transmission or storage can be guaranteed to be completely secure. Users acknowledge that information transmitted through the internet is subject to inherent risks beyond our control.
          </p>

          <p>
            Our website may contain links to third-party websites, services, or resources. KORK InventReX does not control and is not responsible for the privacy practices or content of third-party websites. Users are encouraged to review the privacy policies of any external websites they visit.
          </p>

          <p>
            Individuals may request access to certain personal information maintained by KORK, request correction of inaccurate information, or request deletion of information where legally permissible. Requests may be submitted through our Contact page or by emailing us directly.
          </p>

          <p>
            KORK InventReX reserves the right to update this Privacy Policy from time to time. Any modifications will become effective upon posting the revised version on our website. Continued use of our website or services following publication of updates constitutes acceptance of the revised policy.
          </p>

          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="font-bold text-primary dark:text-white">Questions regarding this Privacy Policy may be directed to:</p>
            <p>KORK InventReX</p>
            <p><a href="mailto:contact@korkinventrex.com" className="text-secondary dark:text-accent hover:underline">contact@korkinventrex.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
