'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, UploadCloud, File, X, Lock } from 'lucide-react';
import { saveEnquiry } from '@/lib/firebase';
import { useToast } from '@/components/common/Toast';

type Path = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null;
type Step = 'initial' | 'questions' | 'recommendation' | 'form' | 'success';

export default function AssessmentWizard() {
  const { success, error: toastError } = useToast();
  
  const [step, setStep] = useState<Step>('initial');
  const [path, setPath] = useState<Path>(null);
  
  // Path A - F answers
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // Final Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    // Specialized fields based on path will also be stored here or in answers
    description: '',
    brandName: '',
    patentAppNumber: '',
    targetFilingDate: '',
    deadline: '',
    ndaRequired: false
  });

  const [files, setFiles] = useState<{ name: string; size: string; raw: File }[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInitialSelection = (selection: string) => {
    switch(selection) {
      case 'I Have a New Invention': setPath('A'); break;
      case 'I Need Patent Drawings': setPath('B'); break;
      case 'I Want to File a Patent': setPath('C'); break;
      case 'I Received an Office Action': setPath('D'); break;
      case 'I Need Trademark Protection': setPath('E'); break;
      case 'I’m Not Sure Where to Start': setPath('F'); break;
    }
    setAnswers({});
    if (selection === 'I’m Not Sure Where to Start') {
      setStep('recommendation'); // Goes straight to display message -> form
    } else {
      setStep('questions');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleAnswerChange = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiAnswerChange = (key: string, value: string) => {
    setAnswers(prev => {
      const current = prev[key] || [];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v: string) => v !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
        raw: f
      }));
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const generateSubmitMessage = () => {
    let msg = `[Form: Path ${path}] `;
    msg += Object.entries(answers).map(([k, v]) => `[${k}: ${Array.isArray(v) ? v.join(', ') : v}]`).join(' ');
    
    if (formData.brandName) msg += ` [Brand: ${formData.brandName}]`;
    if (formData.patentAppNumber) msg += ` [App Num: ${formData.patentAppNumber}]`;
    if (formData.targetFilingDate) msg += ` [Target Date: ${formData.targetFilingDate}]`;
    if (formData.deadline) msg += ` [Deadline: ${formData.deadline}]`;
    
    msg += ` [NDA Required: ${formData.ndaRequired}] `;
    if (formData.description) msg += `\nDescription: ${formData.description}`;
    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toastError('Validation Error', 'Please complete Name and Email.');
      return;
    }
    setLoading(true);

    try {
      const fileNames = files.map(f => f.name).join(', ');
      let fullMessage = generateSubmitMessage();
      if (fileNames) fullMessage += `\n[Attached Files: ${fileNames}]`;

      await saveEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: fullMessage
      });

      // Set tailored success message based on path
      let msg = "Thank you. Your request has been received.";
      if (path === 'A') msg = "Thank you. Your invention information has been received and is under review. Our team will reach you shortly!";
      if (path === 'B') msg = "Thank you. Your drawing request has been received and our team will evaluate the provided materials and reach out to you shortly!";
      if (path === 'C') msg = "Thank you. Your filing request has been received and our team will review the information provided and reach back to you shortly!";
      if (path === 'D') msg = "Thank you. Your Office Action materials have been received for review.";
      if (path === 'E') msg = "Thank you. Your trademark request has been received and is being evaluated.";
      if (path === 'F') msg = "Thank you. Your consultation request has been received and we will contact you shortly.";

      setSuccessMessage(msg);
      setStep('success');
      
      // reset form
      setFormData({
        name: '', email: '', phone: '', company: '', description: '', 
        brandName: '', patentAppNumber: '', targetFilingDate: '', deadline: '', ndaRequired: false
      });
      setFiles([]);
    } catch (err) {
      console.error(err);
      toastError('Submission Failed', 'An error occurred while transmitting your request.');
    } finally {
      setLoading(false);
    }
  };

  const renderInitial = () => (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white">
          How Can We Help You Today?
        </h2>
        <p className="text-slate-500 dark:text-slate-400">What best describes your current situation?</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {[
          'I Have a New Invention',
          'I Need Patent Drawings',
          'I Want to File a Patent',
          'I Received an Office Action',
          'I Need Trademark Protection',
          'I’m Not Sure Where to Start'
        ].map(opt => (
          <button
            suppressHydrationWarning
            key={opt}
            onClick={() => handleInitialSelection(opt)}
            className="p-4 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 transition-all text-left flex justify-between items-center group"
          >
            {opt}
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowRight size={14} className="text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPathAQuestions = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">What type of innovation are you seeking to protect?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['type'] || ''}
          onChange={(e) => handleAnswerChange('type', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Product</option>
          <option>Process / Method</option>
          <option>Software</option>
          <option>Plant Variety</option>
          <option>Brand / Logo</option>
          <option>Not Sure</option>
        </select>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">Have you publicly disclosed your invention?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['disclosed'] || ''}
          onChange={(e) => handleAnswerChange('disclosed', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Yes</option>
          <option>No</option>
          <option>Not Sure</option>
        </select>
      </div>
      <button 
        disabled={!answers['type'] || !answers['disclosed']}
        onClick={() => setStep('recommendation')}
        className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );

  const renderPathBQuestions = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">What type of drawings do you need?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['drawingType'] || ''}
          onChange={(e) => handleAnswerChange('drawingType', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Utility Patent Drawings</option>
          <option>Design Patent Drawings</option>
          <option>Plant Patent Illustrations</option>
          <option>Trademark Illustrations</option>
          <option>Trade Dress Illustrations</option>
        </select>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">What materials do you currently have available?</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Written Description', 'Invention Disclosure', 'Hand Sketches', 'Photographs', 'CAD Files', 'Existing Patent Drawings', 'Prototype Images', 'None Yet'].map(opt => (
            <label key={opt} className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-pointer">
              <input 
                type="checkbox" 
                checked={(answers['materials'] || []).includes(opt)}
                onChange={() => handleMultiAnswerChange('materials', opt)}
                className="rounded border-slate-300 text-accent focus:ring-accent"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>
      <button 
        disabled={!answers['drawingType']}
        onClick={() => setStep('recommendation')}
        className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );

  const renderPathCQuestions = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">Which filing are you considering?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['filingType'] || ''}
          onChange={(e) => handleAnswerChange('filingType', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Provisional Patent Application</option>
          <option>Utility Patent Application</option>
          <option>Design Patent Application</option>
          <option>Plant Patent Application</option>
          <option>PCT / International Application</option>
          <option>Not Sure</option>
        </select>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">Do you already have patent drawings?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['hasDrawings'] || ''}
          onChange={(e) => handleAnswerChange('hasDrawings', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <button 
        disabled={!answers['filingType'] || !answers['hasDrawings']}
        onClick={() => setStep('recommendation')}
        className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );

  const renderPathDQuestions = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">Which office issued the Office Action?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['office'] || ''}
          onChange={(e) => handleAnswerChange('office', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>USPTO</option>
          <option>PCT / International Application</option>
          <option>Other / Unsure</option>
        </select>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">Do you require drawing revisions?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['drawingRevisions'] || ''}
          onChange={(e) => handleAnswerChange('drawingRevisions', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Yes</option>
          <option>No</option>
          <option>Not Sure</option>
        </select>
      </div>
      <button 
        disabled={!answers['office'] || !answers['drawingRevisions']}
        onClick={() => setStep('recommendation')}
        className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );

  const renderPathEQuestions = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-primary dark:text-white">What are you seeking to protect?</h3>
        <select 
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm"
          value={answers['trademarkTarget'] || ''}
          onChange={(e) => handleAnswerChange('trademarkTarget', e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          <option>Company Name</option>
          <option>Product Name</option>
          <option>Logo</option>
          <option>Slogan</option>
          <option>Packaging</option>
          <option>Not Sure</option>
        </select>
      </div>
      <button 
        disabled={!answers['trademarkTarget']}
        onClick={() => setStep('recommendation')}
        className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );

  const renderQuestions = () => {
    switch(path) {
      case 'A': return renderPathAQuestions();
      case 'B': return renderPathBQuestions();
      case 'C': return renderPathCQuestions();
      case 'D': return renderPathDQuestions();
      case 'E': return renderPathEQuestions();
      default: return null;
    }
  };

  const getRecommendation = () => {
    switch(path) {
      case 'A': return {
        title: 'Inventor Services',
        services: ['Patent Search Coordination', 'Patentability Assessment Coordination', 'Prior Art Research Coordination', 'Invention Documentation Support', 'Patent Readiness Assessment', 'Utility Patent Planning', 'Design Patent Planning', 'Plant Patent Planning', 'Trademark Planning', 'Trade Dress Planning']
      };
      case 'B': return {
        title: 'Patent Illustration Services',
        services: ['Utility Patent Drawings', 'Design Patent Drawings', 'Plant Patent Illustrations', 'Trademark Illustrations', 'Trade Dress Illustrations', 'Figure Development', 'Drawing Revisions', 'Filing-Ready Drawing Packages']
      };
      case 'C': return {
        title: 'Patent Filing & Office Action Support',
        services: ['Provisional Patent Applications', 'Utility Patent Applications', 'Design Patent Applications', 'Plant Patent Applications', 'PCT Filing Coordination', 'Office Action Support', 'Drawing Revisions', 'Amendment Coordination', 'Portfolio Management']
      };
      case 'D': return {
        title: 'Office Action Support',
        services: ['Office Action Review Coordination', 'Drawing Revisions', 'Amendment Support Coordination', 'Submission Management', 'Filing Support Coordination', 'Patent Portfolio Support']
      };
      case 'E': return {
        title: 'Trademark & Brand Protection',
        services: ['Trademark Search Coordination', 'Trademark Filing Coordination', 'Logo Protection Support', 'Brand Protection Planning', 'Trademark Monitoring Support']
      };
      case 'F': return {
        title: 'Consultation Services',
        message: 'Many inventors and entrepreneurs begin without knowing which intellectual property protections may apply to their innovation. Our team can help evaluate your project and identify potential pathways.',
        services: []
      };
      default: return { title: '', services: [] };
    }
  };

  const renderRecommendation = () => {
    const rec = getRecommendation();
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Recommended Service</span>
          <h2 className="text-2xl font-bold text-primary dark:text-white">{rec.title}</h2>
        </div>
        
        {rec.message && (
          <p className="text-center text-slate-600 dark:text-slate-400">{rec.message}</p>
        )}

        {rec.services.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Services Available</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rec.services.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button 
          onClick={() => setStep('form')}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold hover:opacity-95 shadow-lg"
        >
          Continue to Intake
        </button>
      </div>
    );
  };

  const renderFormFields = () => {
    return (
      <>
        {/* Common Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" className="input-field" />
          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address *" className="input-field" />
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="input-field" />
          <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company (Optional)" className="input-field" />
        </div>

        {/* Path Specific Fields */}
        {path === 'A' && (
          <div className="space-y-4">
            <select name="innovationCategory" onChange={(e) => handleAnswerChange('innovationCategory', e.target.value)} className="input-field">
              <option value="" disabled selected>Innovation Category</option>
              <option>Physical Product</option>
              <option>Mechanical System</option>
              <option>Medical Device</option>
              <option>Software</option>
              <option>Consumer Product</option>
              <option>Agricultural Innovation</option>
              <option>Other</option>
            </select>
            <select name="developmentStage" onChange={(e) => handleAnswerChange('developmentStage', e.target.value)} className="input-field">
              <option value="" disabled selected>Current Development Stage</option>
              <option>Idea Stage</option>
              <option>Prototype Stage</option>
              <option>Testing Stage</option>
              <option>Market Ready</option>
            </select>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Protection Interests</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Utility Patent', 'Design Patent', 'Plant Patent', 'Trademark', 'Trade Dress', 'Not Sure'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" onChange={() => handleMultiAnswerChange('protectionInterests', opt)} className="rounded border-slate-300 text-accent" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief Project Description" rows={3} className="input-field resize-none" />
          </div>
        )}

        {path === 'B' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select name="numberOfFigures" onChange={(e) => handleAnswerChange('numberOfFigures', e.target.value)} className="input-field">
                <option value="" disabled selected>Number of Figures</option>
                <option>1–5</option><option>6–10</option><option>11–20</option><option>20+</option><option>Not Sure</option>
              </select>
              <input type="date" name="targetFilingDate" value={formData.targetFilingDate} onChange={handleInputChange} className="input-field" />
            </div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Additional Instructions" rows={3} className="input-field resize-none" />
          </div>
        )}

        {path === 'C' && (
          <div className="space-y-4">
            <select name="filingStage" onChange={(e) => handleAnswerChange('filingStage', e.target.value)} className="input-field">
              <option value="" disabled selected>Current Filing Stage</option>
              <option>Idea</option><option>Prototype</option><option>Patent Search Complete</option><option>Drawings Complete</option><option>Ready To File</option>
            </select>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Existing Materials</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Search Report', 'Patent Drawings', 'Draft Specification', 'Prior Filing Documents', 'None'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" onChange={() => handleMultiAnswerChange('existingMaterials', opt)} className="rounded border-slate-300 text-accent" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief Description" rows={3} className="input-field resize-none" />
          </div>
        )}

        {path === 'D' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="patentAppNumber" value={formData.patentAppNumber} onChange={handleInputChange} placeholder="Patent Application Number (Optional)" className="input-field" />
              <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} className="input-field" />
            </div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Additional Notes" rows={3} className="input-field resize-none" />
          </div>
        )}

        {path === 'E' && (
          <div className="space-y-4">
            <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange} placeholder="Brand Name" className="input-field" />
            <select name="trademarkStatus" onChange={(e) => handleAnswerChange('trademarkStatus', e.target.value)} className="input-field">
              <option value="" disabled selected>Current Status</option>
              <option>Already In Use</option><option>Planned Future Use</option><option>Not Sure</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Goods / Services Description" rows={3} className="input-field resize-none" />
          </div>
        )}

        {path === 'F' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select name="industry" onChange={(e) => handleAnswerChange('industry', e.target.value)} className="input-field">
                <option value="" disabled selected>Industry</option>
                <option>Technology</option><option>Manufacturing</option><option>Medical</option><option>Consumer Goods</option><option>Other</option>
              </select>
              <select name="preferredContact" onChange={(e) => handleAnswerChange('preferredContact', e.target.value)} className="input-field">
                <option value="" disabled selected>Preferred Contact Method</option>
                <option>Phone</option><option>Email</option><option>Video Meeting</option>
              </select>
            </div>
            <select name="projectType" onChange={(e) => handleAnswerChange('projectType', e.target.value)} className="input-field">
              <option value="" disabled selected>What best describes your project?</option>
              <option>New Invention</option><option>Brand Protection</option><option>Patent Dispute</option><option>Not Sure</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief Description" rows={3} className="input-field resize-none" />
          </div>
        )}

        {/* Universal File Upload */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Upload Supporting Files</label>
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer relative">
            <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
            <UploadCloud size={24} className="mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Drag & drop or click to upload</p>
            <p className="text-xs text-slate-500 mt-1">Accepted: PDF, DOCX, JPG, PNG, CAD, ZIP</p>
          </div>
          {files.length > 0 && (
            <div className="space-y-2 mt-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <File size={14} className="text-accent" />
                    <span className="font-bold truncate max-w-[200px] text-slate-700 dark:text-slate-300">{file.name}</span>
                  </div>
                  <button
            suppressHydrationWarning type="button" onClick={() => removeFile(idx)} className="text-slate-400 hover:text-rose-500"><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NDA Request */}
        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <input type="checkbox" id="nda" name="ndaRequired" checked={formData.ndaRequired} onChange={handleCheckboxChange} className="mt-1" />
          <label htmlFor="nda" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
            <strong>NDA Request:</strong> I would like NDA information before discussing confidential details.
          </label>
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-850 p-6 md:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none">
      <AnimatePresence mode="wait">
        {step === 'initial' && (
          <motion.div key="initial" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
            {renderInitial()}
          </motion.div>
        )}
        
        {step === 'questions' && (
          <motion.div key="questions" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {renderQuestions()}
          </motion.div>
        )}

        {step === 'recommendation' && (
          <motion.div key="recommendation" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {renderRecommendation()}
          </motion.div>
        )}

        {step === 'form' && (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary dark:text-white">Project Intake Form</h2>
              <p className="text-sm text-slate-500 mt-2">Please provide your details below.</p>
            </div>
            
            {renderFormFields()}

            <button
            suppressHydrationWarning 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-bold hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            <style jsx>{`
              .input-field {
                width: 100%;
                padding: 1rem 1.25rem;
                border-radius: 0.75rem;
                border: 1px solid var(--tw-prose-td-borders, #e2e8f0);
                font-size: 0.875rem;
                background-color: var(--tw-prose-body, #f8fafc);
                color: inherit;
                transition: all 0.2s ease-in-out;
              }
              .input-field:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
              }
              .dark .input-field {
                border-color: #1e293b;
                background-color: #020617;
              }
            `}</style>
          </motion.form>
        )}

        {step === 'success' && (
          <motion.div key="success" className="text-center space-y-4 py-10">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Request Received</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">{successMessage}</p>
            <button
            suppressHydrationWarning onClick={() => { setStep('initial'); setPath(null); }} className="mt-4 text-accent font-bold text-sm">
              Submit another request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
