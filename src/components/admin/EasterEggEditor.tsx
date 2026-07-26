"use client";

import { useState, useEffect } from "react";
import { HomeConfig, DEFAULT_EASTER_EGG_QUOTES } from "@/lib/projects";

interface EasterEggEditorProps {
  config: HomeConfig;
  onUpdate: (updatedConfig: HomeConfig) => void;
}

export default function EasterEggEditor({ config, onUpdate }: EasterEggEditorProps) {
  const [mode, setMode] = useState<"list" | "bulk">("list");
  const quotes = config.easterEggQuotes && config.easterEggQuotes.length > 0 
    ? config.easterEggQuotes 
    : DEFAULT_EASTER_EGG_QUOTES;

  const [bulkText, setBulkText] = useState(quotes.join("\n"));

  useEffect(() => {
    setBulkText(quotes.join("\n"));
  }, [quotes]);

  const handleQuoteChange = (index: number, value: string) => {
    const updated = [...quotes];
    updated[index] = value;
    onUpdate({ ...config, easterEggQuotes: updated });
  };

  const handleAddQuote = () => {
    const updated = [...quotes, "New funny quote..."];
    onUpdate({ ...config, easterEggQuotes: updated });
  };

  const handleRemoveQuote = (index: number) => {
    const updated = quotes.filter((_, i) => i !== index);
    onUpdate({ ...config, easterEggQuotes: updated });
  };

  const handleMoveQuote = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const updated = [...quotes];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      onUpdate({ ...config, easterEggQuotes: updated });
    } else if (direction === "down" && index < quotes.length - 1) {
      const updated = [...quotes];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      onUpdate({ ...config, easterEggQuotes: updated });
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm("Restore all 100 default easter egg messages? This will replace current quotes.")) {
      onUpdate({ ...config, easterEggQuotes: DEFAULT_EASTER_EGG_QUOTES });
    }
  };

  const handleBulkSave = () => {
    const lines = bulkText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    onUpdate({ ...config, easterEggQuotes: lines });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            Easter Egg Messages
            <span className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full border border-white/10 font-normal">
              {quotes.length} Messages
            </span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Messages displayed sequentially when users click your name in the Navbar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRestoreDefaults}
            className="text-xs text-white/60 hover:text-white px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Restore 100 Defaults
          </button>
          
          <button
            onClick={handleAddQuote}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Quote
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
        <button
          onClick={() => setMode("list")}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === "list" ? "bg-white/15 text-white border border-white/15" : "text-white/50 hover:text-white"
          }`}
        >
          Item List ({quotes.length})
        </button>
        <button
          onClick={() => setMode("bulk")}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === "bulk" ? "bg-white/15 text-white border border-white/15" : "text-white/50 hover:text-white"
          }`}
        >
          Bulk Line-by-Line Editor
        </button>
      </div>

      {/* List Mode */}
      {mode === "list" && (
        <div className="flex flex-col gap-3">
          {quotes.map((quote, index) => (
            <div key={index} className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-3 group hover:border-white/20 transition-all">
              <span className="text-xs font-mono text-white/40 min-w-[36px]">
                #{index + 1}
              </span>

              <input
                type="text"
                value={quote}
                onChange={(e) => handleQuoteChange(index, e.target.value)}
                placeholder="Enter quote message..."
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMoveQuote(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveQuote(index, "down")}
                  disabled={index === quotes.length - 1}
                  className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleRemoveQuote(index)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1"
                  title="Delete Quote"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {quotes.length === 0 && (
            <div className="text-center py-10 text-white/40 bg-white/5 rounded-xl border border-white/10 border-dashed">
              No easter egg quotes configured. Click 'Add Quote' or 'Restore 100 Defaults'.
            </div>
          )}
        </div>
      )}

      {/* Bulk Textarea Mode */}
      {mode === "bulk" && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-white/60">
            Paste or edit messages below (one message per line). Blank lines will be filtered out.
          </p>
          <textarea
            rows={20}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-sm font-mono text-white/90 focus:outline-none focus:border-white/30 resize-y"
            placeholder="Type one quote per line..."
          />
          <div className="flex justify-end">
            <button
              onClick={handleBulkSave}
              className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Apply Bulk Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
