import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2, Sliders, Palette, Camera, ArrowRight } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuideModal({ isOpen, onClose }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FDFBF7] border border-stone-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-stone-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF7A7B]/15 text-[#FF7A7B] flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                品牌影像提示詞・使用說明書
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                打造純淨、一致、具備心靈留白美學的高質感 AI 影像提示詞
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors -mt-1 -mr-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Core Principles */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: '#FF7A7B' }} />
            三大核心美學心法
          </h3>
          <div className="grid sm:grid-cols-3 gap-3.5 text-xs sm:text-[13px] text-stone-600 leading-relaxed">
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <span className="font-bold text-stone-800 block mb-1">❶ 聚焦單一主題</span>
              一張圖只說一件事，避免混雜多個主體，畫面更顯純粹安定。
            </div>
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <span className="font-bold text-stone-800 block mb-1">❷ 品牌光影統一</span>
              嚴選品牌專屬色系與深淺層次，確保每張生成的影像色調高度一致。
            </div>
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <span className="font-bold text-stone-800 block mb-1">❸ 留白呼吸感</span>
              維持自然負空間，給予觀者寧靜而深邃的心靈停留空間。
            </div>
          </div>
        </div>

        {/* 5-Step Workflow */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-500" />
            5 步驟完整 Prompt 設定指南
          </h3>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">Step 1：選擇品牌色彩</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  挑選品牌主色（破曉之光）或各大輔助色，奠定視覺色彩基礎。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">Step 2：選擇色彩層次</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  設定明暗與飽和度基調（TINT、SOFT、BASE、DEEP），精準控制畫面深淺層次。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">Step 3：對應主題物件</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  點選系統推薦與色彩高度契合的精選自然與心靈物件，或在下方欄位自由輸入您想表達的主體。
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">Step 4：風格與構圖</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  包含畫面比例、攝影流派（極簡光影、侘寂靜物等）、光影對比度、留白比例、拍攝視野、底片濾鏡與噪點顆粒感。
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">Step 5：細節微調</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  勾選排除元素、輸入進階自訂風格關鍵字、設定 Midjourney 參數，並一鍵複製完整 Prompt。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            開始使用
          </button>
        </div>
      </div>
    </div>
  );
}
