import React from 'react';
import { X, Globe, Camera, Check, ExternalLink, Sparkles } from 'lucide-react';
import { GENRES } from '../data';
import { Option } from '../types';

interface GenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGenreKey: string;
  onSelectGenre: (key: string) => void;
}

export function GenreModal({ isOpen, onClose, selectedGenreKey, onSelectGenre }: GenreModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FDFBF7] border border-stone-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-stone-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                攝影流派名詞解析與風格參考
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                探索各流派的光影語彙、意境精神，點擊「地球」圖標可前往 Google 搜尋該名詞詳細解說
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors -mt-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Genres List */}
        <div className="space-y-4">
          {GENRES.map((g: Option) => {
            const isSelected = selectedGenreKey === g.key;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(g.searchTerm || (g.name + " 攝影風格"))}`;

            return (
              <div 
                key={g.key}
                className={`bg-white border rounded-2xl p-5 transition-all ${
                  isSelected 
                    ? "border-rose-300 ring-2 ring-rose-200/60 shadow-[0_4px_16px_-4px_rgba(244,63,94,0.15)]" 
                    : "border-stone-200/80 hover:border-stone-300 shadow-sm"
                }`}
              >
                {/* Title row */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base sm:text-lg font-bold text-stone-900">
                      {g.name}
                    </span>
                    {g.sub && (
                      <span className="text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full font-medium border border-rose-200/60">
                        {g.sub}
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> 目前選用
                      </span>
                    )}
                  </div>

                  {/* Search Link with Globe Icon */}
                  <div className="flex items-center gap-2">
                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 transition-colors border border-stone-200/60"
                      title={`在 Google 搜尋「${g.searchTerm || g.name}」的名詞與攝影解析`}
                    >
                      <Globe className="w-3.5 h-3.5 text-stone-500" />
                      <span>搜尋名詞解釋</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectGenre(g.key);
                      }}
                      className={`text-xs px-3.5 py-1 rounded-full font-semibold transition-all ${
                        isSelected 
                          ? "bg-rose-500 text-white cursor-default" 
                          : "bg-stone-800 text-white hover:bg-stone-700 active:scale-95"
                      }`}
                    >
                      {isSelected ? "使用中" : "套用此流派"}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed mb-3">
                  {g.description}
                </p>

                {/* Visual Traits / Tags */}
                {g.visualTraits && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                      視覺特徵：
                    </span>
                    {g.visualTraits.map(trait => (
                      <span key={trait} className="text-[11.5px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        {trait}
                      </span>
                    ))}
                  </div>
                )}

                {/* Suitable for */}
                {g.suitableFor && (
                  <div className="text-[12px] text-stone-500 mb-2.5">
                    <span className="font-semibold text-stone-700">適合情境：</span>
                    {g.suitableFor}
                  </div>
                )}

                {/* Prompt phrase */}
                {g.phrase && (
                  <div className="bg-stone-50/80 border border-stone-200/60 rounded-xl p-2.5 text-[11.5px] font-mono text-stone-500 flex items-start gap-2">
                    <span className="text-stone-400 font-bold select-none shrink-0">PROMPT:</span>
                    <span className="leading-snug break-all">{g.phrase}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
