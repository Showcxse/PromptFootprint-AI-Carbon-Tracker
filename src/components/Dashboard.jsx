import React, { useEffect, useState } from "react";
import { Leaf, Cpu, Globe, Zap, Trees} from "lucide-react";
import Dropdown from "./Dropdown.jsx";
import { encodingForModel } from "js-tiktoken";
import { MODEL_CONFIG } from "../utils/modelData.js";
import { doc, updateDoc, increment, onSnapshot} from "firebase/firestore";
import { db } from "../firebase.js";

const Dashboard = () => {


  const [prompt, setPrompt] = useState("");
  const [chosenModel, setChosenModel] = useState("PLACEHOLDER");
  const [isLoading, setIsLoading] = useState(false);

  const [emissionResult, setEmissionResult] = useState("0.00");
  const [gridIntensity, setGridIntensity] = useState("0.00");
  const [regionName, setRegionName] = useState("Select a Model");
  const [milesDriven, setMilesDriven] = useState("0.00");


  const handleAnalyze = async () => {
    if (!prompt.trim() || chosenModel === "PLACEHOLDER") {
    alert("Please enter a real prompt and select a model")
    return;
    } 
    setIsLoading(true);

    try {
      const enc = encodingForModel("gpt-4o");
      const tokens = enc.encode(prompt).length;
      const activeModel = MODEL_CONFIG[chosenModel];

      let currentGridIntensity;

      if (activeModel.fallbackIntensity) {
        currentGridIntensity = activeModel.fallbackIntensity;
      } else {
        const response = await fetch(
          `https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${activeModel.likelyZone}`,
          {
            headers: {
              "auth-token": import.meta.env.VITE_ELECTRICITY_MAPS_API_KEY,
            },
          }
        );

        if (!response.ok) throw new Error("Sum not okay with the api");

        const data = await response.json();
        currentGridIntensity = data.carbonIntensity;
      }


      const totalKwh = tokens * activeModel.energyPerToken;
      const totalEmissions = totalKwh * currentGridIntensity;

      const equivalentMiles = (totalEmissions / 400).toFixed(6);

      setEmissionResult(totalEmissions.toFixed(4));
      setGridIntensity(currentGridIntensity);
      setRegionName(activeModel.likelyZone);
      setMilesDriven(equivalentMiles);

      const globalStatsRef = doc(db, "stats", "global");

      await updateDoc(globalStatsRef, {
        totalTokens: increment(tokens),
        totalEmissions: increment(Number(totalEmissions)),
        totalMilesDriven: increment(Number(equivalentMiles)),
        totalCalculations: increment(1)
      })
    
    } catch (error) {
      console.error("Here's why it didn't work:", error);
    } finally {
      setIsLoading(false);
    }

  }

  const [globalStats, setGlobalStats] = useState({tokens: 0, emissions: 0, miles: 0});

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "stats", "global"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGlobalStats({
          tokens: data.totalTokens,
          emissions: data.totalEmissions,
          miles: data.totalMilesDriven,
        });
      }
    });
    return () => unsub();
  }, []);

  return (
    <>
      
      <main id="analyzer" className="dashboardWrapper relative py-20 px-6 min-h-screen bg-primary-off-white">
          {/*MORE BLOBS SIR */}
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary-green/20 dark:opacity-60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-green/10 rounded-full blur-[75px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[30%] left-[10%] w-80 h-80 bg-primary-green/15 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="mb-8 flex flex-col md:flex-row lg:flex-col md:items-end lg:items-center justify-between items-center gap-4">
          <div>
          <h2 className="text-5xl lg:text-6xl font-black text-primary-dark text-center mb-8 tracking-tight">Emissions <span className="text-primary-green">Analysis</span></h2>
          <p className="text-md text-gray-500 dark:text-slate-300 text-center font-medium">Estimate the carbon footprint of your AI workflows</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary-white/50 backdrop-blur-sm border border-black/5 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Synced: DATE{ /* MAKE THIS FUNCTIONAL */ }</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/*PROMPT INPUT*/}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary-white/60 backdrop-blur-xl border border-primary-white/40 hover:border-primary-green/40 transition-colors p-8 rounded-3xl shadow-sm">
              <h3 className="font-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                <div className="bg-primary-green/20 p-3 rounded-2xl">
                <Cpu aria-label="AI Chip Icon" className="text-primary-green" size={30} />
                </div>
                AI Prompt Analyzer
              </h3>

              <textarea
                aria-label="Enter your AI prompt for carbon analysis"
                className="w-full h-48 p-4 bg-primary-off-white/50 border border-primary-dark/5 rounded-3xl focus:ring-2 focus:ring-primary-green outline-none transition-all placeholder:text-gray-400 resize-none dark:text-primary-dark"
                placeholder="Enter your prompt here to estimate carbon impact..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">

                <Dropdown chosenModel={chosenModel} setChosenModel={setChosenModel} />
                <button disabled={isLoading} onClick={handleAnalyze} className="bg-linear-to-r from-primary-green to-emerald-600 text-primary-white dark:text-primary-dark px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary-green/20 cursor-pointer">
                  {isLoading ? "Analyzing..." : "Analyze Prompt"}
                </button>
              </div>
            </div>
          </div>

          {/* THE LIVE STATS */}

          <div className="space-y-6">
            {isLoading ? (
            <>
            <div className="h-40 w-full bg-linear-to-br from-primary-green/90 to-emerald-600/90 rounded-3xl animate-pulse border border-primary-white/10 shadow-xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-44 bg-primary-white/30 rounded-3xl animate-pulse shadow-lg" />
              <div className="h-44 bg-primary-white/30 rounded-3xl animate-pulse shadow-lg" />
            </div>
            </>
            ) : (
              <>
            <div className="bg-linear-to-br from-primary-green to-emerald-600 text-primary-white dark:text-primary-dark p-8 rounded-3xl shadow-xl overflow-hidden group backdrop-blur-md border border-primary-white/70 hover:border-primary-white dark:hover:border-primary-dark transition-all">
              <div className="relative z-10">
                {/* Istg what these color classes are called compared to what I have them actually do is so confusing*/}
                <p className="text-primary-white dark:text-primary-dark text-sm font-bold uppercase tracking-widest mb-1">
                  Estimated CO<sub>2</sub>
                </p>
                <h2 className="text-4xl font-bold mb-1">
                  {emissionResult} 
                  <span className="text-lg font-medium">grams</span>
                </h2>
                <div className="flex items-center gap-2 text-xs bg-primary-white/20 dark:bg-primary-dark/20 w-fit px-3 py-1 mt-2 rounded-full backdrop-blur-md">
                  <Leaf aria-label="Carbon Impact Indicator" className="text-primary-white dark:text-primary-dark" size={16} />
                  {emissionResult === "0.00" ? `No Impact 🙂` : `Low Impact` }
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-white/80 rounded-3xl blur-3xl group-hover:bg-primary-white/90 transition-all"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-white/30 backdrop-blur-md border border-primary-white/40 hover:border-primary-green/40 transition-colors p-5 rounded-3xl shadow-lg">
                <div className="bg-primary-green/20 p-3 rounded-2xl w-fit mb-2">
                <Globe aria-label="Grid Region Icon" className="text-primary-green" size={32} />
                </div>
                <p className="text-sm text-gray-400 font-bold">Grid Region</p>
                <h3 className="text-sm font-bold text-primary-dark leading-relaxed">
                  {regionName} <br />
                  {chosenModel === "DeepSeek V3" ? `(China)` : `(USA)` }
                </h3>
              </div>
              <div className="bg-primary-white/30 backdrop-blur-md border border-primary-white/40 hover:border-primary-green/40 transition-colors p-5 rounded-3xl shadow-lg">
                {/*CHANGE THE COLOR OF THIS DEPENDING ON HOW INTENSE THE GRID IS */}
                <div className="bg-primary-green/20 p-3 rounded-2xl w-fit mb-2">
                <Zap aria-label="Grid Intensity Icon" className="text-primary-green" size={32} />
                </div>
                <p className="text-sm text-gray-400 font-bold">
                  Grid Intensity
                </p>
                <h3 className="text-sm font-bold text-primary-dark leading-relaxed">
                  {gridIntensity} <br /> g/kWH
                </h3>
              </div>
            </div>
              </>
            )}
          </div>
          {isLoading ? (
            <>
            <div className="h-32 bg-primary-white/30 rounded-3xl animate-pulse shadow-lg md:col-span-3" />
            </>
          ) : (
            <>
            <div className="bg-primary-white/30 backdrop-blur-md border border-primary-white/40 hover:border-primary-green/40 transition-colors p-6 rounded-3xl shadow-lg md:col-span-3">
            <p className="text-sm text-gray-400 font-bold mb-2 uppercase">Environmental Context</p>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-green/20 rounded-2xl">
                <Trees aria-label="Trees Icon" className="text-primary-green" size={28} />
              </div>
              <p className="text-sm text-primary-dark font-medium leading-relaxed">
                This prompt's carbon impact is equivalent to driving {milesDriven} miles in a standard gasoline car
              </p>
            </div>
          </div>
            </>
          )}
        <div className="md:col-span-3 mt-4 relative group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative bg-primary-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-primary-dark/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-lg hover:border-primary-green transition-colors duration-200">
          <div className="absolute -inset-1 bg-linear-to-r from-primary-green/15 to-emerald-600/15 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="flex flex-col items-center md:items-start gap-2 min-w-50">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-green"></span>
              </span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary-dark dark:text-gray-300">Global Impact</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left tracking-wider">Live community tracking</p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full divide-y sm:divide-y-0 sm:divide-x divide-primary-dark/10 dark:divide-white/10">
                    <div className="flex flex-col items-center justify-center py-4 sm:py-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Total Tokens Analyzed</p>
            <h4 className="text-2xl font-bold text-primary-dark dark:text-white">
              {globalStats.tokens.toLocaleString()}
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center py-4 sm:py-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Total CO<sub>2</sub> Tracked</p>
            <h4 className="text-2xl font-bold text-primary-dark dark:text-white">
              {globalStats.emissions.toFixed(2)} g
            </h4>
          </div>

          <div className="flex flex-col items-center justify-center pt-4 sm:pt-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Est. Miles Driven</p>
            <h4 className="text-2xl font-bold text-primary-dark dark:text-white">
              {globalStats.miles.toFixed(2)} mi
            </h4>
          </div>
          </div>
          </div>
        </div>
      </div>
      <div className="relative w-full py-12 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-primary-dark/15"></div>
        </div>
        <div className="relative flex justify-center"> 
          <span className="bg-primary-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-primary-dark/15 text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-sm">
          How it works:
          </span>
        </div>
      </div>
      </main>
    </>
  );
};
export default Dashboard;
