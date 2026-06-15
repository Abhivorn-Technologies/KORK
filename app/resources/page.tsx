'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  ArrowRight,
  HelpCircle as QuestionIcon,
  ChevronRight,
  ChevronDown,
  Info,
  Shield,
  FileSearch,
  PenTool,
  FileText,
  Lock,
  Briefcase
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

const learningTopics = [
  { 
    title: 'What Is a Patent?', 
    content: (
      <>
        <p>A patent is a legal right granted by the United States Patent and Trademark Office (USPTO) that allows an inventor to exclude others from making, using, selling, offering for sale, or importing an invention for a limited period of time.</p>
        <p className="mt-2">Patents do not automatically give the inventor the right to sell a product. Instead, they provide the right to prevent others from using the protected invention without permission.</p>
        <p className="mt-2">Patents are commonly used to protect products, machines, systems, manufacturing processes, software-related inventions, and technological innovations.</p>
      </>
    )
  },
  { 
    title: 'Utility Patent vs. Design Patent', 
    content: (
      <>
        <p><strong>A Utility Patent</strong> protects how an invention works, functions, or is used.</p>
        <p className="mt-1">Examples include:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>Mechanical devices</li>
          <li>Medical equipment</li>
          <li>Manufacturing systems</li>
          <li>Software-related innovations</li>
          <li>Electronic systems</li>
        </ul>
        <p><strong>A Design Patent</strong> protects how a product looks rather than how it functions.</p>
        <p className="mt-1">Examples include:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>Consumer product appearance</li>
          <li>Product shapes</li>
          <li>Decorative features</li>
          <li>Packaging designs</li>
        </ul>
        <p>Many products may qualify for both utility and design patent protection.</p>
      </>
    )
  },
  { 
    title: 'What Is a Plant Patent?', 
    content: (
      <>
        <p>A Plant Patent protects new and distinct plant varieties that have been asexually reproduced.</p>
        <p className="mt-2">Plant patents may apply to:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>New plant varieties</li>
          <li>Hybrid plants</li>
          <li>Certain agricultural innovations</li>
          <li>Ornamental plants</li>
        </ul>
        <p>Plant patents require specialized documentation and illustrations to support the application process.</p>
      </>
    )
  },
  { 
    title: 'Patent Drawings Explained', 
    content: (
      <>
        <p>Patent drawings are visual illustrations that help explain an invention.</p>
        <p className="mt-2">Drawings often show:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>Components</li>
          <li>Relationships between parts</li>
          <li>Manufacturing configurations</li>
          <li>Product structures</li>
          <li>System workflows</li>
        </ul>
        <p>Many patent applications require drawings, and properly prepared illustrations can improve clarity and support the examination process.</p>
      </>
    )
  },
  { 
    title: 'Patent Filing Process Overview', 
    content: (
      <>
        <p>The patent process generally includes:</p>
        <ul className="space-y-1 mt-2 mb-2">
          <li><strong>Step 1:</strong> Document the invention</li>
          <li><strong>Step 2:</strong> Conduct a patent search</li>
          <li><strong>Step 3:</strong> Evaluate patentability</li>
          <li><strong>Step 4:</strong> Prepare patent drawings</li>
          <li><strong>Step 5:</strong> Develop the application</li>
          <li><strong>Step 6:</strong> File with the USPTO</li>
          <li><strong>Step 7:</strong> Respond to Office Actions</li>
          <li><strong>Step 8:</strong> Receive patent issuance</li>
        </ul>
        <p>Each project may vary depending on complexity and filing strategy.</p>
      </>
    )
  },
  { 
    title: 'Understanding Patent Claims', 
    content: (
      <>
        <p>Patent claims define the legal boundaries of an invention.</p>
        <p className="mt-2">Claims determine:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>What is protected</li>
          <li>What competitors cannot legally copy</li>
          <li>The scope of patent rights</li>
        </ul>
        <p>Patent claims are often considered the most important section of a patent application because they establish the extent of protection.</p>
      </>
    )
  },
  { 
    title: 'What Is Prior Art?', 
    content: (
      <>
        <p>Prior art refers to publicly available information that existed before a patent application was filed.</p>
        <p className="mt-2">Examples include:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>Existing patents</li>
          <li>Published patent applications</li>
          <li>Technical papers</li>
          <li>Academic research</li>
          <li>Public product disclosures</li>
          <li>Websites and publications</li>
        </ul>
        <p>Prior art is used by patent examiners when evaluating patent applications.</p>
      </>
    )
  },
  { 
    title: 'What Is an Office Action?', 
    content: (
      <>
        <p>An Office Action is an official communication issued by the USPTO during patent examination.</p>
        <p className="mt-2">Office Actions may:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>Request clarification</li>
          <li>Raise objections</li>
          <li>Cite prior art references</li>
          <li>Request amendments</li>
          <li>Require drawing revisions</li>
        </ul>
        <p>Most patent applications receive at least one Office Action before a final decision is reached.</p>
      </>
    )
  },
  { 
    title: 'Trademark vs. Patent Protection', 
    content: (
      <>
        <p><strong>Patents protect inventions.</strong></p>
        <p><strong>Trademarks protect brand identity.</strong></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="font-semibold text-primary dark:text-white">Patents may protect:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Products</li>
              <li>Processes</li>
              <li>Technologies</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-primary dark:text-white">Trademarks may protect:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Business names</li>
              <li>Logos</li>
              <li>Slogans</li>
              <li>Brand identifiers</li>
            </ul>
          </div>
        </div>
        <p className="mt-4">Many businesses pursue both patent and trademark protection.</p>
      </>
    )
  },
  { 
    title: 'What Is Trade Dress?', 
    content: (
      <>
        <p>Trade dress protects the visual appearance of a product or packaging when consumers associate that appearance with a specific source.</p>
        <p className="mt-2">Examples include:</p>
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          <li>Product packaging</li>
          <li>Store layouts</li>
          <li>Product configurations</li>
          <li>Distinctive visual presentations</li>
        </ul>
        <p>Trade dress protection often requires evidence that consumers recognize the appearance as identifying a particular brand.</p>
      </>
    )
  }
];

const faqCategories = [
  { id: 'general', title: 'General Questions', icon: Info },
  { id: 'basics', title: 'Invention & Patent Basics', icon: BookOpen },
  { id: 'search', title: 'Patent Search Services', icon: FileSearch },
  { id: 'drawings', title: 'Patent Drawing Services', icon: PenTool },
  { id: 'filing', title: 'Patent Filing & Office Actions', icon: FileText },
  { id: 'trademark', title: 'Trademark & Trade Dress', icon: Shield },
  { id: 'security', title: 'Confidentiality & Security', icon: Lock },
  { id: 'portal', title: 'Client Portal & Business Questions', icon: Briefcase },
];

const faqsByTab: Record<string, { q: string; a: string | React.ReactNode }[]> = {
  general: [
    {
      q: 'What does KORK InventRex do?',
      a: 'KORK InventRex is an intellectual property services platform that helps inventors, entrepreneurs, startups, businesses, and innovation teams navigate the process of protecting and managing intellectual property. Our services include patent illustration services, patent search coordination, inventor support, patent filing coordination through licensed patent attorneys and registered patent agents, trademark support, office action support coordination, and intellectual property project management.'
    },
    {
      q: 'How is KORK different from a patent law firm?',
      a: 'KORK InventRex is not a law firm. We provide inventor support, project management, patent illustrations, intellectual property workflow coordination, and access to trusted patent professionals. Legal advice, patent prosecution, trademark prosecution, and legal representation are provided by licensed patent attorneys and registered patent agents.'
    },
    {
      q: 'How do I get started?',
      a: 'You can begin by completing the project assessment through our Contact page, scheduling a consultation, or submitting information about your invention, product, design, or brand. Once we understand your goals, we can recommend appropriate services and next steps.'
    },
    {
      q: 'Do I need to become a client before speaking with someone?',
      a: 'No. Prospective clients may schedule consultations to discuss project requirements and learn more about available services before engaging with KORK.'
    },
    {
      q: 'Can I schedule a consultation?',
      a: 'Yes. Consultations may be requested through our Contact page. During the consultation, we can discuss your invention, intellectual property goals, and available service options.'
    },
    {
      q: 'Do you work with businesses and startups?',
      a: 'Yes. KORK supports startups, entrepreneurs, small businesses, established companies, universities, research institutions, and innovation teams seeking intellectual property support.'
    },
    {
      q: 'Do you work with independent inventors?',
      a: 'Yes. Many of our clients are independent inventors seeking guidance through the patent process for the first time.'
    },
    {
      q: 'Do you support international clients?',
      a: 'Yes. KORK supports inventors and businesses located both within and outside the United States. International filing coordination may be available through our network of patent professionals.'
    }
  ],
  basics: [
    {
      q: 'I have an idea. What should I do first?',
      a: 'The first step is to document your invention. Write down what it does, how it works, what problem it solves, and how it differs from existing solutions. Sketches, photographs, CAD files, prototypes, and written descriptions can help organize your ideas before exploring intellectual property protection.'
    },
    {
      q: 'How do I know if my idea is patentable?',
      a: 'Patentability depends on several factors, including whether the invention is new, useful, and non-obvious compared to existing technology. A patent search and patentability assessment can help determine whether pursuing patent protection may be worthwhile.'
    },
    {
      q: 'Can I discuss my invention before filing a patent?',
      a: 'Yes, but inventors should be cautious about public disclosures. Publicly sharing details of an invention before filing may affect patent rights in certain jurisdictions. Maintaining confidentiality is generally recommended until a protection strategy is established.'
    },
    {
      q: 'Should I keep my invention confidential?',
      a: 'In many situations, yes. Maintaining confidentiality before filing a patent application can help preserve intellectual property rights and prevent unnecessary public disclosure of your invention.'
    },
    {
      q: 'Do I need an NDA?',
      a: 'Not always. Many inventors choose to use a Non-Disclosure Agreement (NDA) when discussing sensitive invention details with third parties. KORK offers NDA-supported workflows upon request.'
    },
    {
      q: 'Can I share sketches and photos?',
      a: 'Yes. Most projects begin with sketches, photographs, prototypes, CAD files, technical drawings, or written descriptions. These materials help us better understand the invention and project requirements.'
    },
    {
      q: 'What information should I prepare before starting?',
      a: 'Helpful information includes a description of the invention, sketches or photographs, technical specifications, development history, known competitors, and any prior patent or trademark activity related to the project.'
    },
    {
      q: 'What is a patent?',
      a: 'A patent is a form of intellectual property protection granted by a government. A patent provides the owner with the right to exclude others from making, using, selling, offering to sell, or importing the patented invention for a limited period of time.'
    },
    {
      q: 'What types of patents exist?',
      a: 'In the United States, the three primary patent categories are Utility Patents, Design Patents, and Plant Patents. Each protects a different type of innovation.'
    },
    {
      q: 'What is a utility patent?',
      a: 'A utility patent protects the functional aspects of an invention, including how it works, how it is used, how it is manufactured, or how it performs a specific task. Most patent applications filed in the United States are utility patents.'
    },
    {
      q: 'What is a design patent?',
      a: 'A design patent protects the ornamental appearance of a product rather than its functional features. It focuses on how a product looks rather than how it works.'
    },
    {
      q: 'What is a plant patent?',
      a: 'A plant patent protects certain new and distinct plant varieties that have been asexually reproduced. Plant patents are commonly used for new flowers, fruits, ornamental plants, and agricultural innovations.'
    },
    {
      q: 'How long does a patent last?',
      a: 'Patent terms vary depending on the type of patent. Utility patents generally last 20 years from the earliest effective filing date, subject to maintenance requirements. Design patents and plant patents have different protection periods.'
    },
    {
      q: 'What rights does a patent provide?',
      a: 'A patent provides the right to exclude others from making, using, selling, offering to sell, or importing the claimed invention. It does not automatically grant the right to practice the invention.'
    },
    {
      q: 'Can I file a patent myself?',
      a: 'Yes. Inventors may file patent applications on their own behalf. However, many inventors choose to work with patent professionals due to the technical and legal complexity of the patent process.'
    },
    {
      q: 'Do I need a patent attorney?',
      a: 'Not always, but many inventors find professional guidance valuable when preparing and prosecuting patent applications. Patent attorneys can provide legal advice and representation before the USPTO.'
    },
    {
      q: 'What is a patent agent?',
      a: 'A patent agent is a professional registered to practice before the United States Patent and Trademark Office (USPTO) in patent matters. Patent agents can prepare and prosecute patent applications but are not attorneys unless separately licensed as lawyers.'
    }
  ],
  search: [
    {
      q: 'What is a patent search?',
      a: 'A patent search is a review of existing patents, published patent applications, technical publications, products, and other publicly available information to identify inventions that may be similar to yours. Patent searches help inventors better understand the competitive landscape before investing in patent protection.'
    },
    {
      q: 'Why should I conduct a patent search?',
      a: 'A patent search can help identify existing technologies, evaluate whether an invention may be unique, reduce unnecessary filing expenses, and provide valuable information for developing a patent strategy. While a search cannot guarantee patentability, it can provide important insights before moving forward.'
    },
    {
      q: 'What is prior art?',
      a: 'Prior art refers to publicly available information that existed before a patent application was filed. Prior art may include patents, patent applications, journal articles, websites, product manuals, research papers, videos, public demonstrations, and other disclosures relevant to an invention.'
    },
    {
      q: 'Can a patent search guarantee approval?',
      a: 'No. Patent searches cannot guarantee that a patent application will be approved. Patent examiners may identify references that were not found during a search, and patentability ultimately depends on the examination process and applicable patent laws.'
    },
    {
      q: 'What is a patentability search?',
      a: 'A patentability search focuses on determining whether an invention may meet the requirements for patent protection. The search identifies potentially relevant prior art that could affect novelty or non-obviousness.'
    },
    {
      q: 'What is a landscape search?',
      a: 'A landscape search provides a broader view of activity within a technology area. It is commonly used by businesses, researchers, and inventors to identify competitors, innovation trends, filing activity, and opportunities within a market.'
    }
  ],
  drawings: [
    {
      q: 'Why are patent drawings important?',
      a: 'Patent drawings help explain the invention and provide visual support for the written patent application. Clear illustrations often improve understanding of the invention and may be required for many patent filings.'
    },
    {
      q: 'Do all patent applications require drawings?',
      a: 'Not all patent applications require drawings, but many utility, design, and plant patent applications benefit from or require illustrations. The need for drawings depends on the nature of the invention and applicable filing requirements.'
    },
    {
      q: 'What file formats do you accept?',
      a: 'We can typically work from sketches, photographs, PDFs, CAD files, engineering drawings, technical diagrams, prototypes, and other supporting materials.'
    },
    {
      q: 'Can you work from sketches?',
      a: 'Yes. Many projects begin with hand-drawn sketches or concept drawings. These materials can often be used as the foundation for professionally prepared patent illustrations.'
    },
    {
      q: 'Can you work from CAD files?',
      a: 'Yes. CAD files are often valuable because they provide detailed dimensions, component relationships, and technical information that can improve illustration accuracy.'
    },
    {
      q: 'Can you revise existing patent drawings?',
      a: 'Yes. Existing patent drawings may be revised, updated, corrected, or reformatted based on project requirements or examiner requests.'
    },
    {
      q: 'Are your drawings USPTO-compliant?',
      a: 'Patent illustrations are prepared to support USPTO filing requirements and commonly accepted patent drawing standards. Final filing requirements should always be reviewed by the filing professional handling the application.'
    },
    {
      q: 'Can you prepare drawings for international filings?',
      a: 'Yes. Patent illustrations may be prepared to support both U.S. and international filing requirements depending on project needs.'
    }
  ],
  filing: [
    {
      q: 'What is a provisional patent application?',
      a: 'A provisional patent application establishes an early filing date and allows inventors to use the term "Patent Pending." It does not become an issued patent and generally expires after twelve months unless followed by a non-provisional application.'
    },
    {
      q: 'What is a non-provisional patent application?',
      a: 'A non-provisional patent application is the formal application examined by the USPTO. It contains claims, specifications, drawings when required, and supporting documentation necessary for patent examination.'
    },
    {
      q: 'What is the difference between provisional and non-provisional applications?',
      a: 'A provisional application secures an early filing date and provides temporary protection. A non-provisional application begins the formal examination process and may ultimately lead to patent issuance.'
    },
    {
      q: 'What is a PCT application?',
      a: 'A Patent Cooperation Treaty (PCT) application allows inventors to seek patent protection internationally through a coordinated filing process. It does not grant a worldwide patent but can simplify international filing procedures.'
    },
    {
      q: 'Can KORK file my patent?',
      a: 'Patent filing services are coordinated through licensed patent attorneys and registered patent agents. KORK manages project workflows, documentation support, illustration services, and communication throughout the process.'
    },
    {
      q: 'Who actually files the patent application?',
      a: 'Patent applications may be filed by inventors themselves, registered patent agents, or licensed patent attorneys. When professional representation is required, KORK coordinates with qualified patent professionals.'
    },
    {
      q: 'What happens after filing?',
      a: 'After filing, the USPTO reviews the application. The application is assigned to an examiner who evaluates patentability. The examination process may include Office Actions, amendments, interviews, and additional correspondence before a final decision is reached.'
    },
    {
      q: 'How long does the filing process take?',
      a: 'Timelines vary depending on technology area, application type, examiner workload, and filing strategy. Patent examination often takes months or years before a final outcome is reached.'
    },
    {
      q: 'What is an Office Action?',
      a: 'An Office Action is an official communication from the USPTO examiner explaining objections, rejections, requirements, or requests for clarification during patent examination.'
    },
    {
      q: 'Why did my application receive an Office Action?',
      a: 'Most patent applications receive at least one Office Action. Receiving an Office Action does not necessarily mean the invention is unpatentable. It is often a routine part of the examination process.'
    },
    {
      q: 'Does receiving an Office Action mean my patent was rejected?',
      a: 'No. Many patents are eventually allowed after one or more Office Actions and responses. Office Actions are part of the normal examination process.'
    },
    {
      q: 'What happens after an Office Action?',
      a: 'The application is reviewed, a response strategy is developed, amendments may be prepared, and a formal response is submitted within the required deadline.'
    },
    {
      q: 'Can patent drawings need revisions during examination?',
      a: 'Yes. Patent examiners occasionally request updated figures, corrected references, formatting changes, or additional illustrations during examination.'
    },
    {
      q: 'How are Office Action responses prepared?',
      a: 'Responses are generally prepared by licensed patent attorneys or registered patent agents who evaluate the examiner’s comments and develop an appropriate response strategy.'
    }
  ],
  trademark: [
    {
      q: 'What is a trademark?',
      a: 'A trademark is a word, phrase, symbol, logo, design, or combination that identifies the source of goods or services and distinguishes one business from another.'
    },
    {
      q: 'What can be trademarked?',
      a: 'Business names, product names, logos, slogans, packaging elements, and other brand identifiers may qualify for trademark protection if they meet applicable requirements.'
    },
    {
      q: 'What is the difference between a patent and a trademark?',
      a: 'Patents protect inventions and innovations. Trademarks protect brands and identifiers used in commerce.'
    },
    {
      q: 'Do I need a trademark for my business?',
      a: 'Many businesses benefit from trademark protection because it helps establish brand ownership, reduce confusion in the marketplace, and strengthen long-term business value.'
    },
    {
      q: 'What is a trademark search?',
      a: 'A trademark search reviews existing trademarks and related uses to evaluate potential conflicts before filing a trademark application.'
    },
    {
      q: 'Can logos be trademarked?',
      a: 'Yes. Logos are among the most common forms of trademark protection and can often be registered if they meet legal requirements.'
    },
    {
      q: 'What is trade dress?',
      a: 'Trade dress protects the distinctive visual appearance of a product, packaging, store layout, or presentation that consumers associate with a particular source.'
    },
    {
      q: 'How is trade dress different from a trademark?',
      a: 'Traditional trademarks protect names, logos, and identifiers. Trade dress protects the overall visual appearance and commercial impression associated with a product or brand.'
    },
    {
      q: 'Can product packaging be protected?',
      a: 'Yes. Distinctive packaging may qualify for trade dress protection when consumers recognize it as identifying a specific source.'
    },
    {
      q: 'What types of trade dress illustrations are required?',
      a: 'Trade dress projects often require detailed illustrations showing packaging configurations, product appearance, visual features, and overall commercial presentation.'
    }
  ],
  security: [
    {
      q: 'Is my invention confidential?',
      a: 'Yes. KORK InventRex understands that inventors and businesses often share sensitive intellectual property information. Information provided through our intake process, project communications, and client portal is handled with confidentiality and care. Clients may also request NDA-supported workflows before sharing detailed invention information.'
    },
    {
      q: 'How is my information protected?',
      a: 'KORK utilizes secure workflows, controlled access procedures, secure document management practices, and client-specific project access controls to help protect confidential information. Access to project materials is limited to individuals directly involved in supporting the project.'
    },
    {
      q: 'Can I request an NDA?',
      a: 'Yes. Non-Disclosure Agreements (NDAs) may be requested before discussing detailed invention concepts, technical information, business strategies, or proprietary materials. NDA availability may depend on the specific project and engagement requirements.'
    },
    {
      q: 'Who has access to my files?',
      a: 'Access is limited to authorized individuals involved in your project. Depending on the services selected, this may include project managers, illustrators, patent professionals, or approved support personnel who require access to perform their assigned responsibilities.'
    },
    {
      q: 'How are documents stored?',
      a: 'Project documents are maintained within secure systems and organized according to project requirements. Clients may also have access to files through the KORK Client Portal, where project-related materials, communications, and deliverables can be managed in a centralized location.'
    },
    {
      q: 'Will KORK share my invention with third parties?',
      a: 'No. KORK does not share confidential project information with unrelated third parties without authorization. If a project requires coordination with a patent attorney, patent agent, or other approved professional, information is shared only as necessary to support the project.'
    },
    {
      q: 'Can I submit information before deciding to move forward?',
      a: 'Yes. Initial information may be submitted through the intake process to help determine project requirements. Inventors who have confidentiality concerns may request NDA-supported workflows before sharing detailed technical information.'
    },
    {
      q: 'What should I avoid sharing publicly?',
      a: 'Inventors should generally avoid publicly disclosing detailed invention information before establishing an intellectual property strategy. Public disclosures may affect patent rights in certain jurisdictions. If you are unsure, consult a qualified patent professional before making public announcements.'
    },
    {
      q: 'Does KORK sell or distribute client information?',
      a: 'No. KORK does not sell client information, invention disclosures, project documentation, or intellectual property materials. Information is used solely to support project-related activities and client services.'
    },
    {
      q: 'How long is information retained?',
      a: 'Project records may be retained for administrative, operational, legal, or project management purposes. Retention periods may vary depending on project requirements and applicable obligations.'
    }
  ],
  portal: [
    {
      q: 'How do I access the client portal?',
      a: 'Clients receive portal access as part of project onboarding. Login credentials and instructions are provided once portal access has been established.'
    },
    {
      q: 'What can I do in the portal?',
      a: 'The KORK Client Portal provides centralized access to project information, communications, files, deliverables, status updates, timelines, and support requests.'
    },
    {
      q: 'Can I upload files?',
      a: 'Yes. Clients can securely upload invention disclosures, sketches, photographs, CAD files, Office Actions, technical documents, and other project-related materials through the portal.'
    },
    {
      q: 'Can I track project progress?',
      a: 'Yes. Active projects include milestone tracking, status updates, timeline visibility, and project activity records so clients can monitor progress throughout the engagement.'
    },
    {
      q: 'Can I communicate with the team through the portal?',
      a: 'Yes. The portal includes secure communication tools that allow clients to exchange messages, respond to requests, ask questions, and receive project updates.'
    },
    {
      q: 'Can I download deliverables from the portal?',
      a: 'Yes. Completed project deliverables, approved drawings, reports, and other authorized files can be accessed and downloaded through the portal.'
    },
    {
      q: 'Can multiple people access the same project?',
      a: 'Depending on the project, access permissions may be configured for multiple authorized users, allowing team members, business partners, or approved stakeholders to participate in project activities.'
    },
    {
      q: 'What if I need technical support?',
      a: 'Support requests can be submitted through the portal or by contacting KORK directly. Our team will assist with access issues, file uploads, project questions, and general support needs.'
    },
    {
      q: 'Should I file a patent before launching my product?',
      a: 'Many inventors and businesses consider intellectual property protection before publicly launching a product. Filing strategies vary depending on business goals, timing, budget, and competitive considerations. A consultation with a patent professional can help determine an appropriate approach.'
    },
    {
      q: 'When should a startup think about intellectual property?',
      a: 'Startups should begin evaluating intellectual property as early as possible. Protecting inventions, brands, proprietary technologies, and other assets can become an important part of long-term business growth and valuation.'
    },
    {
      q: 'What intellectual property assets should startups protect?',
      a: (
        <>
          <p>Depending on the business, protection may include:</p>
          <ul className="list-disc pl-5 mt-2 mb-2 space-y-1">
            <li>Utility patents</li>
            <li>Design patents</li>
            <li>Plant patents</li>
            <li>Trademarks</li>
            <li>Trade dress</li>
            <li>Copyrights</li>
            <li>Proprietary business information</li>
            <li>Trade secrets</li>
          </ul>
          <p>The appropriate strategy depends on the company’s products, services, technology, and growth plans.</p>
        </>
      )
    },
    {
      q: 'Can I file both a patent and a trademark?',
      a: 'Yes. Patents and trademarks protect different types of intellectual property. Many businesses pursue both forms of protection to safeguard inventions as well as brand identity.'
    },
    {
      q: 'How can intellectual property increase company value?',
      a: 'Intellectual property can become a valuable business asset by creating competitive advantages, strengthening market position, supporting licensing opportunities, attracting investors, and increasing overall company valuation.'
    },
    {
      q: 'Do investors care about patents and trademarks?',
      a: 'In many cases, yes. Investors often evaluate intellectual property portfolios as part of their due diligence process. Strong intellectual property assets may demonstrate innovation, market differentiation, and long-term growth potential.'
    },
    {
      q: 'Can KORK support growing companies with multiple inventions?',
      a: 'Yes. KORK supports inventors, startups, and businesses managing multiple intellectual property projects. Services may include project coordination, illustration support, filing coordination, Office Action support, and portfolio management workflows.'
    },
    {
      q: 'Do I need intellectual property protection if I am still developing my product?',
      a: 'Many innovators begin exploring intellectual property options during product development. Early planning can help identify protection opportunities and reduce the risk of unintended public disclosure.'
    },
    {
      q: 'Can KORK help coordinate ongoing intellectual property management?',
      a: 'Yes. Beyond initial filings, KORK supports project tracking, Office Action coordination, illustration updates, portfolio monitoring, and ongoing intellectual property management workflows.'
    },
    {
      q: 'What is the best way to get started?',
      a: 'The easiest way to begin is by completing the Project Assessment through the Contact page. Based on your responses, KORK can recommend relevant services, next steps, and appropriate intellectual property pathways for your project.'
    }
  ]
};

export default function ResourcesHubPage() {
  const [activeFaqTab, setActiveFaqTab] = useState('general');
  const [activeFaqQuestions, setActiveFaqQuestions] = useState<number | null>(null);
  
  // Mobile tab selector state
  const [isMobileTabMenuOpen, setIsMobileTabMenuOpen] = useState(false);

  // Helper to change tab
  const handleTabChange = (tabId: string) => {
    setActiveFaqTab(tabId);
    setActiveFaqQuestions(null);
    setIsMobileTabMenuOpen(false);
  };

  const activeTabData = faqCategories.find(t => t.id === activeFaqTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="absolute top-0 right-0 p-32 opacity-20 transform translate-x-1/3 -translate-y-1/3">
          <BookOpen size={400} className="text-blue-500 blur-3xl" />
        </div>

        <div className="container-custom relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-[10px] font-bold uppercase tracking-wider">
            KORK Knowledge Hub
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Knowledge. Guidance. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Intellectual Property Insights.</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Explore educational resources designed to help inventors, entrepreneurs, startups, researchers, and businesses better understand patents, trademarks, intellectual property protection, and the innovation process.
            <br/><br/>
            Whether you are protecting your first invention or expanding an existing portfolio, our resource center provides practical information to help you make informed decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start Your Project
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1: Patent Learning Center */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Understand Intellectual Property Before You Invest
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Intellectual property protection can be complex, especially for first-time inventors. Our Patent Learning Center provides educational content designed to help innovators understand patent types, filing processes, drawings, trademarks, and intellectual property strategies before beginning a project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningTopics.map((topic, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3 hover:border-blue-500/30 dark:hover:border-blue-500/30 shadow-sm transition-all flex flex-col h-full"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-accent/10 flex items-center justify-center text-secondary dark:text-accent mb-1">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white">{topic.title}</h3>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal flex-1">
                  {topic.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FAQ CENTER */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="container-custom space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-secondary dark:text-accent text-[10px] font-bold uppercase tracking-wider mb-1">
              FAQ CENTER
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Find answers to common questions about patents, trademarks, intellectual property protection, patent drawings, filing services, confidentiality, and project management.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10">
            
            {/* Desktop Tabs Sidebar */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 space-y-1.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Categories</h3>
                {faqCategories.map((tab) => (
                <button
                  key={tab.id}
                  suppressHydrationWarning
                  onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all duration-200 group",
                      activeFaqTab === tab.id
                        ? "bg-white dark:bg-slate-800 text-secondary dark:text-accent shadow-sm border border-slate-200 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-primary dark:hover:text-white border border-transparent"
                    )}
                  >
                    <tab.icon size={16} className={cn(
                      "transition-colors",
                      activeFaqTab === tab.id ? "text-accent" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                    )} />
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Tabs Dropdown */}
            <div className="lg:hidden relative z-20">
              <button 
                onClick={() => setIsMobileTabMenuOpen(!isMobileTabMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-left font-bold text-primary dark:text-white"
              >
                <div className="flex items-center gap-3">
                  {activeTabData && <activeTabData.icon size={16} className="text-accent" />}
                  <span>{activeTabData?.title}</span>
                </div>
                <ChevronDown size={18} className={cn("transition-transform duration-300", isMobileTabMenuOpen ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {isMobileTabMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-30"
                  >
                    {faqCategories.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-sm text-left font-bold transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0",
                          activeFaqTab === tab.id
                            ? "bg-slate-50 dark:bg-slate-700/50 text-secondary dark:text-accent"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                        )}
                      >
                        <tab.icon size={16} className={activeFaqTab === tab.id ? "text-accent" : "text-slate-400"} />
                        {tab.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ Content Area */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFaqTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary dark:text-white uppercase">
                      {activeTabData?.title}
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-secondary to-accent mt-3 rounded-full"></div>
                  </div>

                  <div className="space-y-3">
                    {faqsByTab[activeFaqTab]?.map((faq, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50"
                      >
                        <button suppressHydrationWarning                           onClick={() => setActiveFaqQuestions(activeFaqQuestions === idx ? null : idx)}
                          className="w-full text-left px-5 py-4 font-bold text-sm md:text-base text-slate-900 dark:text-white flex items-center justify-between gap-3 group"
                        >
                          <span className="flex gap-3">
                            <QuestionIcon size={18} className="text-accent shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span>{faq.q}</span>
                          </span>
                          <span className={cn(
                            "shrink-0 h-6 w-6 text-sm rounded-full flex items-center justify-center border transition-all duration-300",
                            activeFaqQuestions === idx 
                              ? "bg-secondary text-white border-secondary rotate-45" 
                              : "border-slate-200 dark:border-slate-700 text-slate-400 group-hover:border-secondary group-hover:text-secondary dark:group-hover:text-accent dark:group-hover:border-accent"
                          )}>
                            +
                          </span>
                        </button>
                        
                        <AnimatePresence>
                          {activeFaqQuestions === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-1 pl-[2.6rem] text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4: Why We Invest In Education */}
      <section className="py-12 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            {/* Left Side: Title & Key statement */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-secondary dark:text-accent text-[10px] font-bold uppercase tracking-wider">
                Our Philosophy
              </div>
              <h2 className="text-2xl font-extrabold text-primary dark:text-white tracking-tight">
                Why We Invest In Education
              </h2>
              <p className="text-base md:text-lg font-bold text-primary dark:text-white leading-relaxed">
                "We believe informed inventors make better intellectual property decisions."
              </p>
            </div>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px h-24 bg-slate-200 dark:bg-slate-800"></div>

            {/* Right Side: Details */}
            <div className="flex-1 space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-center md:text-left">
              <p>
                Our goal is not only to provide services but also to help innovators understand the intellectual property process, evaluate opportunities, and confidently navigate the journey from concept to protection.
              </p>
              <p>
                By providing educational resources, practical guides, and frequently asked questions, we aim to simplify intellectual property and make professional support more accessible to inventors, startups, researchers, and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 bg-blue-950 overflow-hidden text-white border-t border-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#1e40af_0%,transparent_60%)] opacity-40" />
        
        <motion.div 
          variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="container-custom relative z-10"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex-1 space-y-4 text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Ready To Move From Learning To Protection?
              </h2>
              <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
                Whether you need patent illustrations, filing support, trademark assistance, or guidance through the intellectual property process, KORK InventRex is ready to help.
              </p>
            </div>
            
            <div className="flex-shrink-0 flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact?type=meeting"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
