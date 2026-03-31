import { useState, useEffect } from 'react'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import { assets } from './assets/assets.js'

//TO ALL RECRUITERS WHO SEE THIS, I CAN MAKE A 'PROFESSIONAL AND SERIOUS' ERROR PAGE, I JUST DID THIS BECAUSE I THOUGHT IT WAS FUNNY
function ErrorFallback({ error, resetErrorBoundary }) {

  useEffect(() => {
    const errorAudio = new Audio(assets.errorsound);
    errorAudio.play().catch((err) => {
      console.warn("Failed to play error sound:", err);
    });
  }, []);

  return (
  <div role='alert' className='flex flex-col items-center justify-center py-20 bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-200'>
    <p className='text-xl font-bold text-red-600 mb-4'>Sowwy something went wong with our services</p>
    <img src={assets.errorimage} alt="visualized error" className='w-48 mb-6' />
    <pre className='text-xs text-red-400 bg-black/5 p-4 rounded-lg mb-6'>
      {error.message}
    </pre>
    <button 
    onClick={resetErrorBoundary}
    className='px-8 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors'
    >Twy Again
    </button>
  </div>

  )
}

function App() {
  const [dashboardKey, setDashboardKey] = useState(0);
  return (
    <>
    <div className="App relative w-full overflow-hidden">
    <Navbar />
    <Hero />
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      setDashboardKey((prevKey) => prevKey + 1);
    }}
    >
    <Dashboard key={dashboardKey} />
    </ErrorBoundary>
    <About />
    <Footer />  
    </div>
    </>
  )
}

export default App
