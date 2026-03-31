import React, { useState } from 'react';
import LegalModal from './LegalModal';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';


const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
    <footer className='footerWrapper relative bg-linear-to-t from-primary-white to-primary-off-white backdrop-blur-md border-t border-primary-dark text-md text-gray-700 dark:text-slate-200 text-center overflow-hidden'>
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary-green/20 dark:opacity-50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-emerald-400/10 dark:opacity-50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto flex justify-between items-center sm:flex-row gap-4 flex-wrap p-6">
        
        <div className='items-center gap-2 sm:px-3 py-1 text-left flex-1'>
          <div>
            <h3 className='text-2xl mb-2 leading-tight tracking-tigher'>Prompt<span className='text-transparent bg-clip-text bg-linear-to-r from-primary-green to bg-emerald-700'>Footprint</span> </h3>
            <p>See the carbon cost before you send</p>
          </div>
        </div>
        {/*REMEMBER TO GO BACK AND MAKE SURE THESE HOES ACTUALLY WORK */}
        <div className='gap-8 items-center flex-col'>
            <ul>
              <li className='mb-4 text-left text-md hover:text-primary-green transition-colors duration-300'>
                <a href="#home">Home</a>
              </li>
              <li className='mb-4 text-left text-md hover:text-primary-green transition-colors duration-300'>
              <a href="#analyzer">Prompt Analyzer</a>
              </li>
              <li className='mb-4 text-left text-md hover:text-primary-green transition-colors duration-300'>
                <a href="#about">About</a>
              </li>
            </ul>
        </div>
      </div>
      <div className="relative w-full py-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-primary-dark/15"></div>
        </div>
        <div className="relative flex justify-center"> 
          <span className="bg-primary-whte/80 backdrop-blur-md px-6 py-2 rounded-full border border-primary-dark/15 text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-slate-200 shadow-sm">
          <ul className='flex items-center gap-8'>
          <li>
            <a href="https://www.linkedin.com/in/casey-abbott-0148553a2" target='_blank' rel="noopener noreferrer">
              <svg 
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              version="1.1"  
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='w-6 h-6 hover:text-primary-green transition-colors duration-300'>
                <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://github.com/Showcxse/llm-carbon-tracker" target="_blank" rel="noopener noreferrer">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 hover:text-primary-green transition-colors duration-300">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </li>
        </ul>
          </span>
        </div>
      </div>
    {/* LEGAL SHIT (BOOOOOOO) IM DOING THIS LAST */}
    <div className="flex flex-col items-center justify-center py-4 text-sm text-gray-700 dark:text-slate-200">
      <p>&copy; 2026 Showcxse
        <br />
        Powered by the Electricity Maps API
      </p>
      <div>
        <ul className='flex gap-4'>
          <li>
            <button
            onClick={() => setIsTermsOpen(true)}
            className="cursor-pointer hover:text-primary-green transition-colors focus:outline-none">
            Terms & Conditions
            </button>
            </li>
          <li>
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="cursor-pointer hover:text-primary-green transition-colors focus:outline-none">
            Privacy Policy
            </button>
          </li>
        </ul>
      </div>
    </div>
    </footer>
    <LegalModal
      isOpen={isTermsOpen}
      closeModal={() => setIsTermsOpen(false)}
      title="Terms & Conditions"
    >
      <Terms />
    </LegalModal>
    <LegalModal
      isOpen={isPrivacyOpen}
      closeModal={() => setIsPrivacyOpen(false)}
      title="Privacy Policy"
    >
      <PrivacyPolicy />
    </LegalModal>
    </>
  )
}

export default Footer