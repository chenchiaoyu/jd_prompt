import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import { AppState } from './types';
import { PALETTES, PRIMARY_PALETTE, SECONDARY_PALETTES, CONTRAST, SHOTS, RATIOS, FILMS, GENRES, NOISE, EXCLUDE_OPTIONS, FORMATS, DEFAULT_SUFFIX, STORAGE_KEY } from './data';
import { buildPrompt, cn } from './utils';
import { Chip, InfoPop } from './components';
import { GuideModal } from './components/GuideModal';
import { GenreModal } from './components/GenreModal';

const DEFAULT_STATE: AppState = {
  projectName: "品牌專用",
  color: "rose",
  shade: "base",
  subject: "",
  genre: "minimalist",
  film: "none",
  contrast: "low",
  whitespace: 75,
  shot: "vast",
  ratio: "4:5",
  noise: "moderate",
  exclude: [],
  format: "general",
  suffix: DEFAULT_SUFFIX,
  stylize: 150,
  chaos: 0,
  sref: "",
  srefWeight: 100,
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.projectName === "通用專案" || parsed.projectName === "悦心靈" || !parsed.projectName) {
          parsed.projectName = "品牌專用";
        }
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      // Ignore
    }
    return DEFAULT_STATE;
  });

  const [toast, setToast] = useState(false);
  const [openInfo, setOpenInfo] = useState<Record<string, boolean>>({});
  const [mobileTab, setMobileTab] = useState<'settings' | 'preview'>('settings');
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showGenreModal, setShowGenreModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore
    }
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const toggleInfo = (key: string) => {
    setOpenInfo(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = useCallback(() => {
    const text = buildPrompt(state);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setToast(true);
        setTimeout(() => setToast(false), 1400);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setToast(true);
      setTimeout(() => setToast(false), 1400);
    }
  }, [state]);

  const handleReset = () => {
    if (window.confirm("確定要重置所有設定嗎？這會清空目前已選擇的所有調整，無法復原。")) {
      setState(DEFAULT_STATE);
    }
  };

  const currentColorGroup = PALETTES.find(p => p.key === state.color) || PALETTES[0];
  const currentShade = currentColorGroup.shades.find(s => s.key === state.shade) || currentColorGroup.shades[1];
  const currentRatio = RATIOS.find(r => r.key === state.ratio) || RATIOS[0];
  const isGeneral = state.format === "general";

  return (
    <div className="min-h-screen bg-[#FDF9F6] text-stone-800 font-sans selection:bg-rose-100 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        
        {/* Header */}
        <header className="mb-6 md:mb-10 pb-5 md:pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="logo_final-03.svg" 
              alt="悅心靈 Logo" 
              className="w-10 h-10 object-contain drop-shadow-xs" 
            />
            <h1 className="text-[clamp(22px,3vw,32px)] font-bold tracking-tight leading-tight" style={{ color: '#FF7A7B' }}>
              悅心靈・品牌影像生成提示詞
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold bg-[#FF7A7B]/10 text-[#FF7A7B] hover:bg-[#FF7A7B]/20 border border-[#FF7A7B]/30 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" style={{ color: '#FF7A7B' }} />
              <span>網頁使用說明</span>
            </button>
          </div>
        </header>

        {/* Mobile Tabs */}
        <div className="md:hidden flex bg-stone-200/60 p-1.5 rounded-2xl mb-6 shadow-inner">
          <button
            onClick={() => setMobileTab('settings')}
            className={cn(
              "flex-1 py-3 text-[14px] font-bold rounded-xl transition-all duration-200",
              mobileTab === 'settings' ? "bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] text-stone-800" : "text-stone-500"
            )}
          >
            設定參數
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={cn(
              "flex-1 py-3 text-[14px] font-bold rounded-xl transition-all duration-200",
              mobileTab === 'preview' ? "bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] text-stone-800" : "text-stone-500"
            )}
          >
            預覽與輸出
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] md:gap-8 items-start">
          
          {/* LEFT: CONTROLS */}
          <div className={cn("flex-col gap-5 md:gap-6 min-w-0", mobileTab === 'settings' ? "flex" : "hidden md:flex")}>
            
            {/* 1. Color + Subject */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h2 className="text-lg md:text-xl font-bold">色彩與題材</h2>
                <span className="font-mono text-[11.5px] text-stone-400">01 / 03</span>
              </div>

              {/* STEP 1: 選擇品牌色彩 */}
              <div className="flex items-center justify-between gap-2 mt-4 md:mt-5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-widest uppercase text-stone-500 font-bold">
                    STEP 1・選擇品牌色彩（主色與輔助色）
                  </span>
                  <InfoPop 
                    id="info-primary-color" 
                    isOpen={openInfo["primary-color"] || false} 
                    onToggle={() => toggleInfo("primary-color")}
                    text={<>
                      <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A7B] border border-black/10"></span>
                        品牌色彩說明
                      </div>
                      <p className="text-stone-600 leading-relaxed mb-2">
                        <b>品牌主色（破曉之光）</b>用在闡述品牌理念、理想、品牌故事、品牌形象部分。
                      </p>
                      <p className="text-stone-600 leading-relaxed">
                        <b>品牌輔助色</b>用在服務內容分類項目（如 IET大天使療癒、薩滿、易經東方玄學等）。
                      </p>
                    </>}
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#FF7A7B] bg-[#FF7A7B]/10 px-2.5 py-0.5 rounded-full border border-[#FF7A7B]/30">
                  單一選擇
                </span>
              </div>

              {/* 品牌主色卡片 */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => updateState({ color: PRIMARY_PALETTE.key, shade: "base" })}
                  className={cn(
                    "w-full appearance-none border rounded-2xl p-4 sm:p-4.5 text-left transition-all duration-200 active:scale-[0.99] flex items-center justify-between gap-3 relative overflow-hidden cursor-pointer",
                    state.color === PRIMARY_PALETTE.key
                      ? "bg-[#FF7A7B]/10 border-[#FF7A7B] text-stone-900 shadow-[0_4px_16px_-4px_rgba(255,122,123,0.3)] ring-1 ring-[#FF7A7B]/40"
                      : "bg-stone-50/70 hover:bg-white border-stone-200/80 hover:border-[#FF7A7B]/50 text-stone-700 shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <span 
                        className="w-9 h-9 rounded-full border border-black/10 shadow-xs block ring-2 ring-white"
                        style={{ backgroundColor: PRIMARY_PALETTE.hex }}
                      />
                      {state.color === PRIMARY_PALETTE.key && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF7A7B] border-2 border-white flex items-center justify-center shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-white" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px] sm:text-[16px] text-stone-900">
                          {PRIMARY_PALETTE.name}
                        </span>
                        <span className="text-[11px] font-medium text-stone-500 bg-white/90 px-2 py-0.5 rounded-md border border-stone-200/60">
                          破曉之光 #FF7A7B
                        </span>
                      </div>
                      <p className="text-[12px] text-stone-500 mt-0.5">
                        用在闡述品牌理念、理想、品牌故事、品牌形象部分
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* 品牌輔助色網格 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {SECONDARY_PALETTES.map(p => (
                  <Chip
                    key={p.key}
                    active={state.color === p.key}
                    title={p.name}
                    sub={p.sub}
                    swatchHex={p.hex}
                    onClick={() => updateState({ color: p.key, shade: "base" })}
                  />
                ))}
              </div>

              {/* STEP 2: 選顏色的層次 */}
              <div className="flex items-center gap-2 mt-6 mb-3">
                <span className="text-[11px] tracking-widest uppercase text-stone-400 font-bold">STEP 2・選顏色的層次</span>
                <InfoPop 
                  id="info-shade" 
                  isOpen={openInfo["shade"] || false} 
                  onToggle={() => toggleInfo("shade")}
                  text={<>同一個顏色可能有多種深淺層次（如 50~900 或 TINT~DEEP），決定畫面的飽和度與明暗。</>}
                />
              </div>
              <div className={cn("grid gap-2.5", currentColorGroup.shades.length > 4 ? "grid-cols-2 sm:grid-cols-5" : "grid-cols-2 sm:grid-cols-4")}>
                {currentColorGroup.shades.map(s => (
                  <Chip
                    key={s.key}
                    active={state.shade === s.key}
                    title={`${s.label}`}
                    sub={s.hex}
                    swatchHex={s.hex}
                    onClick={() => updateState({ shade: s.key })}
                  />
                ))}
              </div>

              {/* STEP 3: 對應主題物件 */}
              <div className="flex items-center justify-between gap-2 mt-6 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-widest uppercase text-stone-400 font-bold">
                    STEP 3・對應主題物件
                  </span>
                  <InfoPop 
                    id="info-subject" 
                    isOpen={openInfo["subject"] || false} 
                    onToggle={() => toggleInfo("subject")}
                    text={<>系統會依你選的顏色推薦精選物件，點選可快速帶入；若清單中沒有想要的畫面，也可以直接在下方欄位自己輸入。</>}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => updateState({ subject: "" })}
                  className="appearance-none border border-[#FF7A7B]/40 bg-[#FF7A7B]/10 text-[#FF7A7B] text-[11.5px] font-bold cursor-pointer py-1 px-3 rounded-full hover:bg-[#FF7A7B] hover:text-white transition-all active:scale-95"
                >
                  清除
                </button>
              </div>

              {/* 推薦物件網格 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                {currentColorGroup.items.map(item => {
                  const [zh, ...enParts] = item.split(" ");
                  const en = enParts.join(" ");
                  const isActive = state.subject.trim() === zh;
                  return (
                    <Chip
                      key={item}
                      active={isActive}
                      title={zh}
                      sub={en}
                      onClick={() => updateState({ subject: isActive ? "" : zh })}
                    />
                  );
                })}
              </div>

              {/* 自訂題材輸入框 */}
              <textarea 
                rows={2} 
                value={state.subject}
                onChange={e => updateState({ subject: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-[14px] text-stone-800 resize-y placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A7B]/40 focus:border-[#FF7A7B] transition-shadow"
                placeholder="點選上方物件擇一加入，或直接輸入自己的題材：地平線上的第一道光、掌心捧著的植物…"
              />

              {/* 風格參考圖片 (選填) */}
              <div className="mt-8 border-t border-stone-100 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] tracking-widest uppercase text-stone-400 font-bold">補充設定・風格參考圖片 (選填)</span>
                  <InfoPop 
                    id="info-sref" 
                    isOpen={openInfo["sref"] || false} 
                    onToggle={() => toggleInfo("sref")}
                    text={<>輸入圖片檔名或網址。一般 AI 會在指令註記請參考該圖；Midjourney 則會作為 --sref 參數套用。留空則不套用。</>}
                  />
                  <button 
                    type="button" 
                    onClick={() => updateState({ sref: "" })}
                    className="ml-auto appearance-none border border-[#FF7A7B]/40 bg-[#FF7A7B]/10 text-[#FF7A7B] text-[11.5px] font-bold cursor-pointer py-1.5 px-3.5 rounded-full hover:bg-[#FF7A7B] hover:text-white transition-all active:scale-95"
                  >
                    清除輸入
                  </button>
                </div>
                <input 
                  type="text" 
                  value={state.sref}
                  onChange={e => updateState({ sref: e.target.value })}
                  placeholder="輸入圖片檔名或網址，例如: brand-mood.jpg"
                  className="w-full bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-[14px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#FF7A7B]/40 focus:border-[#FF7A7B] transition-shadow mb-3"
                />
              </div>
            </section>

            {/* 2. Style & Composition (Merged with Ratio & Film) */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold">風格與構圖</h2>
                </div>
                <span className="font-mono text-[11.5px] text-stone-400">02 / 03</span>
              </div>
              <p className="text-[13px] text-stone-500 mb-5 mt-1 leading-relaxed">
                結合畫面比例、攝影流派敘事、光影對比度、構圖景別與底片濾鏡效果。
              </p>

              {/* A. Ratio (Moved to Top) */}
              <div className="mb-6">
                <div className="text-[11px] tracking-widest uppercase text-stone-500 font-bold mb-2.5">畫面比例 (Ratio)</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {RATIOS.map(r => (
                    <Chip
                      key={r.key}
                      active={state.ratio === r.key}
                      title={r.name}
                      sub={r.use}
                      onClick={() => updateState({ ratio: r.key })}
                    />
                  ))}
                </div>
                
                {state.ratio === 'custom' && (
                  <div className="mt-4 flex items-center gap-3 bg-stone-50 border border-stone-200/80 rounded-2xl p-4 transition-all">
                    <span className="text-[13px] font-bold text-stone-600 whitespace-nowrap">自訂比例</span>
                    <input
                      type="text"
                      value={state.customRatio || ""}
                      onChange={e => updateState({ customRatio: e.target.value })}
                      placeholder="例如：21:9"
                      className="flex-1 bg-transparent border-none text-[14px] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-0 p-0 font-mono"
                    />
                  </div>
                )}
              </div>

              {/* B. Genre */}
              <div className="mb-6 border-t border-stone-100 pt-5">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] tracking-widest uppercase text-stone-500 font-bold">攝影流派 (Genre)</span>
                    <button
                      type="button"
                      onClick={() => setShowGenreModal(true)}
                      className="w-5 h-5 rounded-full bg-stone-100 border border-stone-200 text-stone-500 hover:border-[#FF7A7B] hover:text-[#FF7A7B] flex items-center justify-center transition-all text-[11px] font-bold shadow-xs active:scale-95 cursor-pointer"
                      title="查看各攝影流派名詞詳細解析與 Google 搜尋"
                    >
                      i
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {GENRES.map((g, idx) => (
                    <Chip
                      key={g.key}
                      active={state.genre === g.key}
                      title={g.name}
                      sub={g.sub}
                      className={idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
                      onClick={() => updateState({ genre: g.key })}
                    />
                  ))}
                </div>
              </div>

              {/* C. Contrast */}
              <div className="mb-6 border-t border-stone-100 pt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[11px] tracking-widest uppercase text-stone-500 font-bold">光影對比度 (Contrast)</span>
                  <InfoPop 
                    id="info-contrast" 
                    isOpen={openInfo["contrast"] || false} 
                    onToggle={() => toggleInfo("contrast")}
                    text={<>控制畫面中亮部與暗部的落差與張力（如柔和溫潤、自然過渡、強烈對比），影響整張影像的沈浸感與情緒氛圍。</>}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CONTRAST.map(c => (
                    <Chip
                      key={c.key}
                      active={state.contrast === c.key}
                      title={c.name}
                      align="center"
                      onClick={() => updateState({ contrast: c.key })}
                    />
                  ))}
                </div>
              </div>

              {/* D. Composition & Shot */}
              <div className="mb-6 border-t border-stone-100 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] tracking-widest uppercase text-stone-500 font-bold">構圖與景別 (Composition & Shot)</span>
                  <InfoPop 
                    id="info-composition" 
                    isOpen={openInfo["composition"] || false} 
                    onToggle={() => toggleInfo("composition")}
                    text={<>設定畫面的空間結構與鏡頭視野，透過留白比例控制呼吸感，並結合景別選擇營造視覺焦點。</>}
                  />
                </div>
                
                {/* Sub-card 1: Whitespace */}
                <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-4 mb-3">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[12px] font-bold text-stone-700 tracking-wide uppercase">留白比例 (Whitespace)</span>
                    <span className="font-mono text-[12px] font-semibold text-[#FF7A7B] bg-[#FF7A7B]/10 px-2 py-0.5 rounded-lg border border-[#FF7A7B]/30">{state.whitespace}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" step="5" 
                    value={state.whitespace}
                    onChange={e => updateState({ whitespace: parseInt(e.target.value, 10) })}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FF7A7B]"
                  />
                  <div className="flex justify-between text-[11.5px] text-stone-400 mt-1.5 font-medium">
                    <span>畫面滿版</span>
                    <span>大量留白</span>
                  </div>
                </div>

                {/* Sub-card 2: Shot Size */}
                <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[12px] font-bold text-stone-700 tracking-wide uppercase">景別選擇 (Shot Size)</span>
                    <InfoPop 
                      id="info-shot" 
                      isOpen={openInfo["shot"] || false} 
                      onToggle={() => toggleInfo("shot")}
                      text={<>決定鏡頭與拍攝主體的距離與構圖視野（如特寫、中景、遠景、全景），引導觀者的視覺焦點與空間感。</>}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SHOTS.map(s => (
                      <Chip
                        key={s.key}
                        active={state.shot === s.key}
                        title={s.name}
                        align="center"
                        onClick={() => updateState({ shot: s.key })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* E. Film Filter */}
              <div className="mb-6 border-t border-stone-100 pt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[11px] tracking-widest uppercase text-stone-500 font-bold">底片濾鏡 (Film Filter)</span>
                  <InfoPop 
                    id="info-film" 
                    isOpen={openInfo["film"] || false} 
                    onToggle={() => toggleInfo("film")}
                    text={<>模擬經典底片色調與化學顯影質感（如 Fuji Pro 400H、Kodak Portra 400、Cinestill 800T 等），賦予數位影像溫潤且帶有故事感的人文情懷。</>}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {FILMS.map(f => (
                    <Chip
                      key={f.key}
                      active={state.film === f.key}
                      title={f.name}
                      sub={f.sub}
                      onClick={() => updateState({ film: f.key })}
                    />
                  ))}
                </div>
              </div>

              {/* F. Noise / Grain */}
              <div className="border-t border-stone-100 pt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[11px] tracking-widest uppercase text-stone-500 font-bold">噪點顆粒感 (Noise & Grain)</span>
                  <InfoPop 
                    id="info-noise" 
                    isOpen={openInfo["noise"] || false} 
                    onToggle={() => toggleInfo("noise")}
                    text={<>模擬傳統底片銀鹽顆粒或高感光噪點（如細緻微粒、經典底片噪點），為畫面增加真實的膠卷觸感與藝術復古質感。</>}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {NOISE.map(n => (
                    <Chip
                      key={n.key}
                      active={state.noise === n.key}
                      title={n.name}
                      align="center"
                      onClick={() => updateState({ noise: n.key })}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Technical */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h2 className="text-lg md:text-xl font-bold">細節微調</h2>
                <span className="font-mono text-[11.5px] text-stone-400">03 / 03</span>
              </div>
              
              <div className="flex items-center gap-2 mt-5 mb-3">
                <span className="text-[11px] tracking-widest uppercase text-stone-400 font-bold">排除元素 (可複選)</span>
                <InfoPop 
                  id="info-exclude" 
                  isOpen={openInfo["exclude"] || false} 
                  onToggle={() => toggleInfo("exclude")}
                  text={<>勾選後畫面中會盡量不出現該元素。適合內容需要純粹自然物件時使用。</>}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {EXCLUDE_OPTIONS.map(e => {
                  const isActive = state.exclude.includes(e.key);
                  return (
                    <Chip
                      key={e.key}
                      active={isActive}
                      isMulti={true}
                      title={e.name}
                      sub={e.sub}
                      onClick={() => {
                        updateState({
                          exclude: isActive
                            ? state.exclude.filter(k => k !== e.key)
                            : [...state.exclude, e.key]
                        });
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] tracking-widest uppercase text-stone-400 font-bold">進階設定・輸入自訂風格關鍵字</span>
                <InfoPop 
                  id="info-suffix" 
                  isOpen={openInfo["suffix"] || false} 
                  onToggle={() => toggleInfo("suffix")}
                  text={<>在此輸入您想要額外追加的 AI 提示詞英文關鍵字（例如相機鏡頭、特殊光影、渲染風格等），系統會自動加在整段 Prompt 的結尾處。</>}
                />
              </div>
              <textarea 
                rows={2} 
                value={state.suffix}
                onChange={e => updateState({ suffix: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-[14px] text-stone-800 resize-y focus:outline-none focus:ring-2 focus:ring-rose-300 transition-shadow mb-5"
              />

              <div className={`transition-opacity duration-200 ${isGeneral ? 'opacity-40 pointer-events-none hidden' : ''}`}>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <label className="text-[14px] font-semibold flex items-center gap-2" style={{ color: '#FF7A7B' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      Midjourney 專屬參數
                    </label>
                  </div>
                  <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60 mb-2">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <label className="text-[14px] font-semibold">參考強度 (--sw)</label>
                      <span className="font-mono text-[13px] text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">{state.srefWeight}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="1000" step="10" 
                      value={state.srefWeight}
                      disabled={isGeneral}
                      onChange={e => updateState({ srefWeight: parseInt(e.target.value, 10) })}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FF7A7B]"
                    />
                    <div className="flex justify-between text-[11.5px] text-stone-400 mt-2 mb-6 font-medium">
                      <span>極低 (0)</span>
                      <span>預設 (100)</span>
                      <span>極高 (1000)</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 mb-3 mt-5">
                      <label className="text-[14px] font-semibold">Stylize (--s)</label>
                      <span className="font-mono text-[13px] text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">{state.stylize}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="1000" step="10" 
                      value={state.stylize}
                      disabled={isGeneral}
                      onChange={e => updateState({ stylize: parseInt(e.target.value, 10) })}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FF7A7B]"
                    />
                    <p className="text-[12px] leading-relaxed text-stone-400 mt-2 mb-5">
                      數值越低越貼近文字描述；越高則 AI 美感詮釋越多。建議維持中低值（100–250）。
                    </p>

                    <div className="flex items-center justify-between gap-3 mb-3 mt-5">
                      <label className="text-[14px] font-semibold">Chaos (--chaos)</label>
                      <span className="font-mono text-[13px] text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">{state.chaos}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" step="5" 
                      value={state.chaos}
                      disabled={isGeneral}
                      onChange={e => updateState({ chaos: parseInt(e.target.value, 10) })}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FF7A7B]"
                    />
                    <div className="flex justify-between text-[11.5px] text-stone-400 mt-2 font-medium">
                      <span>穩定一致</span>
                      <span>高度隨機</span>
                    </div>
                  </div>
                </div>
            </section>

            {/* Quick jump to preview for Mobile */}
            <button 
              onClick={() => {
                setMobileTab('preview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="md:hidden w-full py-4 bg-[#FF7A7B] text-white font-bold rounded-2xl mt-2 mb-6 shadow-md shadow-[0_4px_16px_-4px_rgba(255,122,123,0.4)] active:scale-[0.98] transition-transform cursor-pointer"
            >
              設定完成，檢視並複製提示詞 →
            </button>
          </div>

          {/* RIGHT: CANVAS (PREVIEW) */}
          <div className={cn("flex-col gap-5 md:gap-6", mobileTab === 'preview' ? "flex" : "hidden md:flex")}>
            
            <div 
              className="rounded-[2rem] overflow-hidden border border-stone-200/80 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] flex items-center justify-center bg-stone-100 max-w-full md:max-w-none mx-auto w-full md:w-auto transition-all duration-300"
              style={{
                aspectRatio: state.ratio === 'custom' && state.customRatio 
                  ? state.customRatio.replace(':', '/')
                  : (currentRatio.ar || '1/1'),
                maxWidth: '420px', // Prevent stretching too wide on mobile and desktop
                background: `linear-gradient(to bottom, #F6F1ED, color-mix(in srgb, ${currentShade.hex} 45%, white))`
              }}
            >
              <div className="w-full h-full min-h-[160px] flex items-end justify-start p-4 md:p-5 font-mono text-[12px] text-stone-800/40 font-medium">
                {state.ratio === 'custom' ? state.customRatio || '1:1' : currentRatio.name}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 bg-white border border-stone-200/80 rounded-[2rem] p-5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-black/10 flex-none shadow-sm" style={{ backgroundColor: currentShade.hex }}></span>
                <div className="flex flex-col gap-0.5">
                  <b className="text-[13.5px] font-semibold">{currentColorGroup.name} {currentShade.label}</b>
                  <span className="font-mono text-[11px] text-stone-400">{currentShade.hex}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-[2rem] p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)] relative">
              <h2 className="text-[16px] mb-4 flex items-center justify-between font-bold">
                提示詞
              </h2>
              
              <div className="text-[11px] tracking-widest uppercase text-stone-400 font-bold mb-3">輸出格式</div>
              <div className="grid grid-cols-2 gap-2.5 mb-2">
                {FORMATS.map(f => (
                  <Chip
                    key={f.key}
                    active={state.format === f.key}
                    title={f.name}
                    sub={f.sub}
                    onClick={() => updateState({ format: f.key as 'midjourney' | 'general' })}
                  />
                ))}
              </div>
              <p className="text-[12px] leading-relaxed text-stone-400 mb-5 min-h-[1.5rem]">
                {isGeneral && "一般 AI 格式為完整英文描述句，Stylize、Chaos 等參數不會套用。"}
              </p>

              <div className="font-mono text-[13.5px] leading-relaxed bg-stone-50 border border-stone-200/80 rounded-2xl p-5 whitespace-pre-wrap break-words text-stone-700 max-h-[350px] overflow-y-auto selection:bg-[#FF7A7B]/20">
                {buildPrompt(state)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mt-5">
                <button 
                  onClick={handleCopy}
                  className="appearance-none border text-white rounded-2xl px-6 py-3.5 text-[14px] font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
                  style={{ backgroundColor: '#FF7A7B', borderColor: '#FF7A7B' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  複製 Prompt
                </button>
                <button 
                  onClick={handleReset}
                  className="appearance-none border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-white text-stone-600 rounded-2xl px-5 py-3.5 text-[13px] font-semibold cursor-pointer transition-colors active:scale-[0.98] text-center"
                >
                  重置設定
                </button>
              </div>

              <details className="mt-5 group border-t border-stone-100 pt-5">
                <summary className="cursor-pointer text-[13px] text-stone-500 font-semibold py-1 list-none flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-stone-100 group-open:bg-stone-200 transition-colors">
                    <svg className="w-3.5 h-3.5 text-stone-500 transform group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  中文對照 / 目前選擇
                </summary>
                <ul className="list-none m-0 mt-3 p-0 flex flex-col gap-2 text-[13px] text-stone-500 pl-7 border-l-2 border-stone-100/80">
                  <li><b className="text-stone-700 font-semibold">專案　</b> {state.projectName}</li>
                  <li><b className="text-stone-700 font-semibold">輸出　</b> {state.format}</li>
                  <li><b className="text-stone-700 font-semibold">色彩　</b> {currentColorGroup.name}・{currentShade.label}</li>
                  <li><b className="text-stone-700 font-semibold">強制混入</b> {currentShade.hex}</li>
                  <li><b className="text-stone-700 font-semibold">對比度</b> {CONTRAST.find(c => c.key === state.contrast)?.name}</li>
                  <li><b className="text-stone-700 font-semibold">留白　</b> {state.whitespace}%</li>
                  <li><b className="text-stone-700 font-semibold">比例　</b> {state.ratio === "custom" ? state.customRatio || "1:1" : currentRatio.name}</li>
                  <li><b className="text-stone-700 font-semibold">流派　</b> {GENRES.find(g => g.key === state.genre)?.name}</li>
                  <li><b className="text-stone-700 font-semibold">濾鏡　</b> {FILMS.find(f => f.key === state.film)?.name}</li>
                  <li><b className="text-stone-700 font-semibold">噪點　</b> {NOISE.find(n => n.key === state.noise)?.name}</li>
                  <li><b className="text-stone-700 font-semibold">排除　</b> {state.exclude.length ? state.exclude.map(k => EXCLUDE_OPTIONS.find(e => e.key === k)?.name).join('、') : '無'}</li>
                  {!isGeneral && <li><b className="text-stone-700 font-semibold">S/C參數</b> S:{state.stylize} / C:{state.chaos}</li>}
                </ul>
              </details>
            </div>

            {/* Quick jump back to settings for Mobile */}
            <button 
              onClick={() => {
                setMobileTab('settings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="md:hidden w-full py-4 bg-white border border-stone-200 text-stone-600 font-bold rounded-2xl mb-4 shadow-sm active:scale-[0.98] transition-transform"
            >
              ← 返回調整參數
            </button>
          </div>

        </div>
        
        <footer className="mt-12 mb-8">
        </footer>
      </div>

      {/* Toast */}
      <div className={cn(
        "fixed left-1/2 bottom-8 -translate-x-1/2 bg-stone-800 text-white text-[13.5px] font-semibold px-5 py-3 rounded-full z-20 transition-all duration-300 pointer-events-none shadow-xl flex items-center gap-2",
        toast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      )}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FF7A7B' }}><path d="M20 6L9 17l-5-5"/></svg>
        已複製 Copied
      </div>

      {/* Modals */}
      <GuideModal 
        isOpen={showGuideModal} 
        onClose={() => setShowGuideModal(false)} 
      />
      <GenreModal 
        isOpen={showGenreModal} 
        onClose={() => setShowGenreModal(false)} 
        selectedGenreKey={state.genre}
        onSelectGenre={(key) => updateState({ genre: key })}
      />
    </div>
  );
}
