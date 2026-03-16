export const MODEL_CONFIG = {
  "GPT-4o": {
    provider: "OpenAI",
    likelyZone: "US-MIDA-PJM",
    //likelyZone: Not all of them is public information so these are my best guesses
    energyPerToken: 0.000002,
    //energyPerToken: I'm not smart enough to get definitive values, so I'm using approximations
  },

  "Claude 4.6 Opus": {
    provider: "Anthropic",
    likelyZone: "US-NW-BPAT",
    energyPerToken: 0.000002,
  },

  "Gemini 3 Pro": {
    provider: "Google",
    likelyZone: "US-MIDW-MISO",
    energyPerToken: 0.0000015,
  },

  "DeepSeek V3": {
    provider: "DeepSeek",
    likelyZone: "CN-NORTH",
    energyPerToken: 0.0000005,
  },

  "Grok 4.1": {
    provider: "xAI",
    likelyZone: "US-TEN-TVA",
    energyPerToken: 0.0000025,
  },

  "Llama 4": {
    provider: "Meta",
    likelyZone: "US-TEX-ERCO",
    energyPerToken: 0.0000015,
  },
};
