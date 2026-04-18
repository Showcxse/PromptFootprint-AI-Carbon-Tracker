import React, { useEffect, useState } from "react";
import { Leaf, Cpu, Globe, Zap, Trees } from "lucide-react";
import Dropdown from "./Dropdown.jsx";
import { encodingForModel } from "js-tiktoken";
import { MODEL_CONFIG } from "../utils/modelData.js";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

const OUTPUT_PRESETS = [
  { label: "Short Answer", tokens: 50 },
  { label: "Paragraph", tokens: 250 },
  { label: "Multiple Paragraphs", tokens: 600 },
  { label: "Full Essay", tokens: 900 },
  { label: "Code Blocks", tokens: 1500 },
];

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [chosenModel, setChosenModel] = useState("PLACEHOLDER");
  const [expectedOutput, setExpectedOutput] = useState(250);
  const [isLoading, setIsLoading] = useState(false);
  
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const [emissionResult, setEmissionResult] = useState("0.00");
  const [inputEmissions, setInputEmissions] = useState("0.00");
  const [outputEmissions, setOutputEmissions] = useState("0.00");

  const [gridIntensity, setGridIntensity] = useState("0.00");
  const [regionName, setRegionName] = useState("Select a Model");
  const [milesDriven, setMilesDriven] = useState("0.00");

  const [globalStats, setGlobalStats] = useState({ tokens: 0, emissions: 0, miles: 0 });

  const handleAnalyze = async () => {
    if (!prompt.trim() || chosenModel === "PLACEHOLDER") {
      alert("Please enter a real prompt and select a model");
      return;
    }
    
    setIsLoading(true);
    setHasAnalyzed(false); // Hide results while recalculating

    try {
      const enc = encodingForModel("gpt-4o");
      const inputTokens = enc.encode(prompt).length;
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

      const inputKwh = inputTokens * activeModel.energyPerToken;
      const outputKwh = expectedOutput * (activeModel.energyPerToken * 2);
      const totalKwh = inputKwh + outputKwh;

      const totalEmissionsCalculated = totalKwh * currentGridIntensity;
      const inputEmissionsCalculated = inputKwh * currentGridIntensity;
      const outputEmissionsCalculated = outputKwh * currentGridIntensity;

      const equivalentMiles = (totalEmissionsCalculated / 400).toFixed(6);

      setEmissionResult(totalEmissionsCalculated.toFixed(4));
      setInputEmissions(inputEmissionsCalculated.toFixed(4));
      setOutputEmissions(outputEmissionsCalculated.toFixed(4));
      setGridIntensity(currentGridIntensity);
      setRegionName(activeModel.likelyZone);
      setMilesDriven(equivalentMiles);

      const globalStatsRef = doc(db, "stats", "global");

      await updateDoc(globalStatsRef, {
        totalTokens: increment(inputTokens + expectedOutput),
        totalEmissions: increment(Number(totalEmissionsCalculated)),
        totalMilesDriven: increment(Number(equivalentMiles)),
        totalCalculations: increment(1),
      });
      
      // Trigger the results panel animation
      setHasAnalyzed(true);

    } catch (error) {
      console.error("Here's why it didn't work:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary-green/20 dark:opacity-60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-green/10 rounded-full blur-[75px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[30%] left-[10%] w-80 h-80 bg-primary-green/15 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="mb-8 flex flex-col md:flex-row lg:flex-col md:items-end lg:items-center justify-between items-center gap-4">
          <div>
            <h2 className="text-5xl lg:text-6xl font-black text-primary-dark text-center mb-8 tracking-tight">
              Emissions <span className="text-primary-green">Analysis</span>
            </h2>
            <p className="text-md text-gray-500 dark:text-slate-300 text-center font-medium">
              Estimate the carbon footprint of your AI workflows
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary-white/50 backdrop-blur-sm border border-black/5 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Last Synced: {new Date().toLocaleString()}
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* PROMPT ANALYZER */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="bg-primary-white/60 backdrop-blur-xl border border-primary-white/40 hover:border-primary-green/40 transition-colors p-8 rounded-3xl shadow-sm flex-1 flex flex-col">
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

              {/* ESTIMATED OUTPUT FUNCTIONALITY KIND OF */}
              <div className="mt-6 mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Expected Response Length</p>
                <div className="flex flex-wrap gap-2">
                  {OUTPUT_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setExpectedOutput(preset.tokens)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        expectedOutput === preset.tokens
                          ? "bg-primary-green text-white shadow-md border border-primary-green scale-105"
                          : "bg-primary-white/50 text-gray-500 border border-primary-dark/10 hover:border-primary-green/50 hover:bg-primary-white dark:hover:bg-primary-off-white cursor-pointer"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-wrap gap-4 items-center justify-between">
                <Dropdown chosenModel={chosenModel} setChosenModel={setChosenModel} />
                <button
                  disabled={isLoading}
                  onClick={handleAnalyze}
                  className="bg-linear-to-r from-primary-green to-emerald-600 text-primary-white dark:text-primary-dark px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary-green/20 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Analyzing..." : "Analyze Prompt"}
                </button>
              </div>
            </div>
          </div>

          {/* BETTER RESULTS PANEL */}
          <div className="flex flex-col h-full space-y-6">
            {isLoading ? (
              // Loading state
              <div className="h-full w-full bg-linear-to-br from-primary-green/90 to-emerald-600/90 rounded-3xl animate-pulse border border-primary-white/10 shadow-xl" />
            ) : !hasAnalyzed ? (
              // Blank Slate State
              <div className="bg-primary-white/30 backdrop-blur-md border-2 border-primary-dark/5 border-dashed rounded-3xl flex-1 flex flex-col items-center justify-center text-center p-8 transition-all hover:border-primary-green/30">
                <div className="bg-primary-white/50 dark:bg-primary-white/80 p-4 rounded-full mb-4 shadow-sm">
                    <Leaf className="text-primary-green" size={40} />
                </div>
                <h3 className="text-lg font-bold text-primary-dark mb-2">Awaiting Prompt</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Enter a prompt and select an AI model to see a detailed breakdown of its estimated carbon footprint.
                </p>
              </div>
            ) : (
              // Results
              <div className="bg-linear-to-br from-primary-green to-emerald-600 text-primary-white dark:text-primary-dark p-8 rounded-3xl shadow-xl overflow-hidden group backdrop-blur-md border border-primary-white/70 hover:border-primary-white transition-all flex-1 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Total */}
                <div className="relative z-10">
                  <p className="text-primary-white/80 dark:text-primary-dark text-xs font-bold uppercase tracking-widest mb-2">
                    Total Estimated CO<sub>2</sub>
                  </p>
                  <h2 className="text-5xl font-black mb-6 tracking-tight">
                    {emissionResult}
                    <span className="text-xl font-medium ml-1">grams</span>
                  </h2>
                  
                  <div className="flex gap-6 text-sm font-medium bg-black/10 p-4 rounded-2xl w-fit backdrop-blur-sm border border-white/10 shadow-inner">
                    <div className="flex flex-col">
                      <span className="text-primary-white/70 dark:text-primary-dark uppercase tracking-wider text-[10px] mb-1">Input (Reading)</span>
                      <span className="font-bold text-lg">{inputEmissions}g</span>
                    </div>
                    <div className="w-px bg-white/20 my-1"></div>
                    <div className="flex flex-col">
                      <span className="text-primary-white/70 dark:text-primary-dark uppercase tracking-wider text-[10px] mb-1">Output (Generating)</span>
                      <span className="font-bold text-lg">{outputEmissions}g</span>
                    </div>
                  </div>
                </div>

                {/* Context */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                  <div>
                    <p className="bg-primary-white/20 rounded-full p-1 text-primary-white/70 dark:text-primary-dark text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Globe size={16}/> Grid Region
                    </p>
                    <p className="font-bold leading-tight text-sm mx-1">
                        {regionName} <br/>
                        <span className="text-xs font-medium opacity-75">{chosenModel === "DeepSeek V3" ? `(China)` : `(USA)`}</span>
                    </p>
                  </div>
                  <div>
                    <p className="bg-primary-white/20 rounded-full p-1 text-primary-white/70 dark:text-primary-dark text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Zap size={16}/> Grid Intensity
                    </p>
                    <p className="font-bold leading-tight text-sm mx-1">
                        {gridIntensity} <br/>
                        <span className="text-xs font-medium opacity-75">g/kWh</span>
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-white/20 rounded-full blur-3xl group-hover:bg-primary-white/30 transition-all duration-500"></div>
              </div>
            )}
          </div>

          {/* Miles driven to compare it to something */}
          {hasAnalyzed && !isLoading && (
            <div className="bg-primary-white/30 backdrop-blur-md border border-primary-white/40 hover:border-primary-green/40 transition-colors p-6 rounded-3xl shadow-lg md:col-span-3 animate-in fade-in duration-700">
              <p className="text-sm text-gray-400 font-bold mb-2 uppercase">Environmental Context</p>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-green/20 rounded-2xl">
                  <Trees aria-label="Trees Icon" className="text-primary-green" size={28} />
                </div>
                <p className="text-sm text-primary-dark font-medium leading-relaxed">
                  This prompt's carbon impact is equivalent to driving <span className="font-bold">{milesDriven}</span> miles in a standard gasoline car.
                </p>
              </div>
            </div>
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