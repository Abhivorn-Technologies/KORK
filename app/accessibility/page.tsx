import React from 'react';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 md:py-32 transition-colors duration-300">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary dark:text-white mb-12 tracking-tight">Accessibility Statement</h1>
        
        <div className="space-y-6 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            KORK InventReX is committed to providing a website experience that is accessible, inclusive, and usable for all visitors, including individuals with disabilities. We believe that access to information, educational resources, and intellectual property services should be available to as broad an audience as possible.
          </p>

          <p>
            We strive to design and maintain our website using accessibility principles that support readability, usability, and compatibility across various devices and technologies. Our efforts include maintaining clear navigation structures, descriptive headings, readable content, responsive layouts, and ongoing improvements to user experience.
          </p>

          <p>
            Accessibility is an ongoing process, and we continually evaluate opportunities to enhance website functionality and accessibility. While we strive to provide an accessible experience for all users, certain areas of the website may evolve over time as technologies and standards continue to develop.
          </p>

          <p>
            If you experience difficulty accessing content, encounter accessibility barriers, or have suggestions for improvement, we encourage you to contact us. Feedback helps us continue improving the accessibility and usability of our platform.
          </p>

          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="font-bold text-primary dark:text-white">Questions regarding accessibility may be directed to:</p>
            <p>KORK InventReX</p>
            <p><a href="mailto:contact@korkinventrex.com" className="text-secondary dark:text-accent hover:underline">contact@korkinventrex.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
