# 悅心靈・品牌影像風格提示詞工具 (Prompt Studio)

針對品牌「**悅心靈**」量身打造的引導式 AI 影像風格與提示詞生成工具。透過嚴謹的品牌色系、光影層次、構圖留白與攝影美學規範，協助團隊與創作者快速生成風格高度一致、純淨且富含心靈呼吸感的高質感提示詞。

---

## 🌐 線上 Demo 體驗

* **[點擊此處立即體驗線上網頁工具](https://chenchiaoyu.github.io/jd_prompt/)**

---

## ✨ 核心功能特色

### 1. 品牌色系與層次控制（Color & Depth）
* **主品牌色**：晨曦玫瑰 (`#FF7A7B` 及專屬色階)。
* **五大輔助色系**：
  * 靜謐紫羅蘭 (Violet)
  * 澄澈天空 (Sky)
  * 沉靜青苔 (Moss)
  * 生機草木 (Verdant)
  * 大地暖杏 (Earth)
* **四階明暗深淺 (Shades)**：`TINT`（極淺柔光）、`SOFT`（柔和淡雅）、`BASE`（經典主色）、`DEEP`（深邃濃郁）。
* **色彩影響程度 (Color Weight)**：
  * **點綴・融入 (Subtle)**：微量色彩點綴，優雅融入畫面。
  * **平衡・主導 (Moderate)**：自然舒適比例，色調和諧平衡。
  * **濃郁・包圍 (Dominant)**：強烈色彩包覆，營造沉浸氛圍。

### 2. 主題物件智慧推薦（Subjects）
* 依據所選色彩自動推薦專屬心靈物件（如：晨霧露珠、白玫瑰、陶器、晨光地平線等）。
* 支援點選快速帶入、自訂文字題材輸入與一鍵清除。

### 3. 風格、視野與構圖美學（Style & Composition）
* **多元畫面比例 (Ratio)**：支援 1:1、4:5、16:9、9:16、3:2、2:3、3:4 及自訂比例，直角矩形視覺化縮圖。
* **五大攝影流派 (Genre)**：極簡留白、靜物特寫、光影寫真、詩意自然、寫實紀實，並附有 **攝影流派詳細解析彈窗** 與 Google 搜尋參考。
* **光影對比度 (Contrast)**：高對比、中對比、低對比。
* **留白比例滑桿 (Whitespace)**：0% 至 100% 動態微調負空間與呼吸感，自動轉譯為精確的構圖術語。
* **拍攝視野 (Shot Size)**：特寫 (Close-up)、中景 (Medium)、遠景 (Wide)、全景 (Extreme Wide)。
* **經典底片濾鏡 (Film Filter)**：支援 Fuji Pro 400H、Kodak Portra 400、Cinestill 800T、Ilford HP5 Plus 等膠卷質感。
* **噪點顆粒感 (Noise & Grain)**：微弱、適中、明顯等膠卷銀鹽質感。

### 4. 進階設定與雙格式輸出（Engine & Prompt）
* **排除元素 (Negative Exclude)**：可複選排除人物、文字、符號、圖形、人造物。
* **自訂後綴 (Suffix)**：預設精簡留白自然光語句，可自由擴充鏡頭或光影關鍵字。
* **雙模式支援**：
  * **AI Universal**：適用 DALL·E 3、Midjourney、Stable Diffusion、Gemini / Imagen 等主流 AI 繪圖模型。
  * **Midjourney 專屬**：支援版本切換 (`--v 6.1`、`--v 6.0`、`--v 5.2`)、美學權重 (`--s`)、混亂度 (`--chaos`) 與構圖權重 (`--iw`)。
* **即時視覺畫布**：模擬色溫漸層與畫幅比例，支援一鍵複製 Prompt、重置設定與中文選項對照清單。
* **內建使用手冊 (Guide Modal)**：一鍵查閱品牌視覺規範與操作建議。

---

## 🛠️ 技術架構 (Tech Stack)

* **核心框架**：[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **建置工具**：[Vite 6](https://vitejs.dev/)
* **樣式管理**：[Tailwind CSS v4](https://tailwindcss.com/)
* **圖示庫**：[Lucide React](https://lucide.dev/)
* **動畫與過渡**：Tailwind transitions & Motion

---

## 💻 本機開發與建置 (Local Development)

### 1. 安裝相依套件
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```

### 3. 編譯正式發布版本
```bash
npm run build
```

### 4. 預覽正式版本
```bash
npm run preview
```

---

## 🚀 部署指南 (GitHub Pages)

本專案已配置 GitHub Actions 自動化部署工作流程 (`.github/workflows/main.yml`)：
* 每次推送程式碼至 `main` 分支時，GitHub Actions 會自動執行 `npm ci` 與 `npm run build`。
* 自動透過 `peaceiris/actions-gh-pages` 將編譯產物 (`dist/`) 發布至 `gh-pages` 分支。
* `vite.config.ts` 已設定 `base: './'`，確保在 GitHub Pages 子路徑環境下各項靜態資源均能正確讀取。
