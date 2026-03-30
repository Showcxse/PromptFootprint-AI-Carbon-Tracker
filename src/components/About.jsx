import React from 'react'
import { assets } from '../assets/assets.js'
import { Microscope, Database, Target } from 'lucide-react'

//Trying a different way of making these to save time

    const AboutGridCard = ({ title, children, icon: Icon, className ="" }) => (
        <div className={`bg-primary-white/60 backdrop-blur-2xl border border-primary-white/40 hover:border-primary-green/40 transition-all p-8 rounded-3xl shadow-sm flex flex-col gridcard ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-green/20 rounded-2xl">
                <Icon className="text-primary-green" size={24} />
                </div>
                <h3 className='text-xl font-bold text-primary-dark leading-relaxed'>{title}</h3>
            </div>
            <div className="text-sm text-gray-600 dark:text-slate-100 leading-relaxed">{children}</div>
        </div>
    );

const About = () => {

  return (
    <>
    <section id='about' className='aboutWrapper relative bg-primary-off-white pb-20 px-6'>
        {/* GREEN BLOBS IN THE BACKGROUND */}
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary-green/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-primary-green/15 rounded-full blur-[90px] pointer-events-none"></div> 
        {/* ACTUAL CONTENT */}
        <div className="max-w-6xl mx-auto">
            {/* HEADER */}
            <div className="mb-12">
                <h2 className="text-4xl font-bold text-primary-dark mb-2">About <span className='text-primary-green'>PromptFootprint</span></h2>
                <div className="w-16 h-1 bg-primary-green rounded-full"></div>
            </div>
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AboutGridCard title="Data Methodology" icon={Microscope} className="md:col-span-2">
                    <p className="mb-4">This tool uses the formula <strong>{"formula"}</strong>  to provide a real-time estimate of carbon emissions based on regional grid data.</p>
                    <div className="bg-primary-green/15 rounded-xl p-4 border border-primary-green/30 font-mono text-xs italic">
                    Est. Emissions = Prompt length ⮕ Token Count ⮕ Regional Intensity
                    </div>
                </AboutGridCard>
                <AboutGridCard title="Data Sources" icon={Database}>
                    <p>Powered by the <a href="https://www.electricitymaps.com/" target="_blank" className='underline hover:text-primary-green transition-colors'><strong>Electricity Maps API</strong></a> for live grid intensity and localized data center information for major AI providers </p>
                </AboutGridCard>
                <AboutGridCard title="Accuracy" icon={Target}>
                    <p>These values are estimates for informational purposes and may not be perfectly accurate due to the complexity of AI infrastructure and regional variations in grid intensity.</p>
                </AboutGridCard>
                <div className="md:col-span-2 bg-linear-to-br from-primary-green to-emerald-600 text-primary-white p-8 rounded-3xl shadow-xl overflow-hidden group backdrop-blur-md border border-primary-white/70 hover:border-primary-white dark:hover:border-primary-dark transition-all flex items-center justify-between">
                    <div className='max-w-[60%]'>
                        <h3 className="text-xl font-bold text-primary-white dark:text-primary-dark mb-2">Sustainable AI</h3>
                        <div className="w-16 h-1 bg-primary-white dark:bg-primary-dark rounded-full mb-2"></div>
                        <p className="text-sm text-primary-off-white dark:text-slate-200">This tool aims to provide transparency and awareness about the environmental impact of AI operations, helping users make informed decisions about their AI usage.</p>
                    </div>
                    <img className='w-40 opacity-80' src={assets.ailazyart} alt="AI Illustration" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-white/80 rounded-3xl blur-3xl group-hover:bg-primary-white/90 transition-all"></div>
                </div>
            </div>
        </div>

    </section>
    </>
  )
}

export default About