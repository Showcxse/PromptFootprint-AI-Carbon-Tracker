import React from "react";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

const Dropdown = ({ chosenModel, setChosenModel }) => {
  const models = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "claude-4-6-opus", name: "Claude 4.6 Opus", provider: "Anthropic" },
    { id: "gemini-3-pro", name: "Gemini 3 Pro", provider: "Google" },
    { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek" },
    { id: "grok-4-1", name: "Grok 4.1", provider: "XAI" },
    { id: "llama-4", name: "Llama 4", provider: "Meta" },
  ];

  return (
    <div className="relative inline-block w-full sm:w-72 z-50">
      <Listbox value={chosenModel} onChange={setChosenModel}>
        {({ open }) => (
          <>  
            <ListboxButton
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.click(); //idk why i need this i thought the library handles it already
              }
              }}
            className="w-full bg-primary-white/40 dark:bg-zinc-800/40 backdrop-blur-md border border-primary-white/40 dark:border-white/10 rounded-full px-6 py-2.5 flex items-center justify-between text-sm font-semibold text-primary-dark dark:text-white transition-all hover:bg-primary-white/60 focus:ring-2 focus:ring-primary-green/30 outline-none cursor-pointer">
              <span className="truncate">
                {chosenModel === "PLACEHOLDER" ? "Select AI Model" : chosenModel}
              </span>
              <ChevronDown
                className={`text-primary-green transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                size={18}
              />
            </ListboxButton>

            <Transition
              show={open}
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <ListboxOptions 
                anchor="bottom start"
                className="w-(--button-width) mt-2 bg-primary-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-primary-white/40 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
              >
                {models.map((model) => (
                  <ListboxOption
                    key={model.id}
                    value={model.name}
                    className={({ focus, selected }) =>
                      `group relative w-full text-left px-6 py-3 text-sm font-medium transition-colors cursor-pointer outline-none border-b border-primary-dark/5 dark:border-white/5 last:border-none
                      ${focus ? "bg-primary-green/10 text-primary-dark dark:text-white" : "text-primary-dark dark:text-gray-300"}
                      ${selected ? "text-primary-green font-bold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex justify-between items-center">
                          <span>{model.name}</span>
                          {selected && <Check size={14} className="text-primary-green" />}
                        </div>
                        <span className="block text-[10px] text-gray-500 uppercase tracking-tighter">
                          {model.provider}
                        </span>
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Dropdown;