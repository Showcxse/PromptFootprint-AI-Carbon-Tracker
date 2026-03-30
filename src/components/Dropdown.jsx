import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ chosenModel, setChosenModel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const models = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "claude-4-6-opus", name: "Claude 4.6 Opus", provider: "Anthropic" },
    { id: "gemini-3-pro", name: "Gemini 3 Pro", provider: "Google" },
    { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek" },
    { id: "grok-4-1", name: "Grok 4.1", provider: "XAI" },
    { id: "llama-4", name: "Llama 4", provider: "Meta" },
  ];

  return (
    <div className="relative inline-block w-full sm:w-72">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full bg-primary-white/40 backdrop-blur-md border border-primary-white/40 rounded-full px-6 py-2.5 flex items-center justify-between text-sm font-semibold text-primary-dark transition-all hover:bg-primary-white/60 focus:ring-2 focus:ring-primary-green/30 cursor-pointer"
      >
        <span>
          {chosenModel === "PLACEHOLDER" ? "Select AI Model" : chosenModel}
        </span>
        <ChevronDown
          className={`text-primary-green transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {isOpen && (
        <div 
          role="listbox"
          className="absolute bottom-full mb-2 left-0 w-full z-50 bg-primary-white/90 backdrop-blur-2xl border border-primary-white/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          {models.map((model) => (
            <button
              key={model.id}
              role="option"
              aria-selected={chosenModel === model.name}
              onClick={() => {
                setChosenModel(model.name);
                setIsOpen(false);
              }}
              className="w-full text-left px-6 py-3 text-sm font-medium text-primary-dark hover:bg-primary-green/10 transition-colors border-b border-primary-dark/5 last:border-none"
            >
              {model.name}
              <span className="block text-[10px] text-gray-400 uppercase">
                {model.provider}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
