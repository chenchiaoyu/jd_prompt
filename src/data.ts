import { Palette, Option } from './types';

export const PALETTES: Palette[] = [
  {
    key: "rose", 
    name: "品牌主色", 
    sub: "破曉之光・理念與形象", 
    hex: "#FF7A7B",
    phrase: "the scene rendered in warm signature dawn coral-rose and soft blush light, warm and gentle",
    mood: "a warm, hopeful atmosphere, gentle and unhurried, reflecting brand ideals and core identity",
    shades: [
      { key: "50", label: "Rose 50", hex: "#FFEAE7", depthLabel: "a pale blush luminous tint" },
      { key: "100", label: "Rose 100", hex: "#FFE1DE", depthLabel: "a very light rose luminous tint" },
      { key: "200", label: "Rose 200", hex: "#FFCDCB", depthLabel: "a light soft rose tone" },
      { key: "300", label: "Rose 300", hex: "#FFB5B3", depthLabel: "a soft light-rose hue" },
      { key: "400", label: "Rose 400", hex: "#FF9998", depthLabel: "a medium-light coral-rose tone" },
      { key: "500", label: "Rose 500", hex: "#FF7A7B", depthLabel: "the base coral-rose shade" },
      { key: "600", label: "Rose 600", hex: "#E0686B", depthLabel: "a deep dusty-rose tint" },
      { key: "700", label: "Rose 700", hex: "#BE575C", depthLabel: "a dark muted rose hue" },
      { key: "800", label: "Rose 800", hex: "#98444A", depthLabel: "a very dark crimson-rose tone" },
      { key: "900", label: "Rose 900", hex: "#743139", depthLabel: "an extremely deep maroon-rose shade" }
    ],
    items: [
      "晨曦雲彩 dawn-lit clouds", "蓮花 lotus flower", "玫瑰花瓣 rose petals", "貝殼內壁 seashell interior",
      "粉晶石 rose quartz stone", "柔霧晨光 misty dawn light", "暖粉石英 warm pink quartz", "絲質薄紗 silk sheer fabric"
    ]
  },
  {
    key: "violet", name: "紫羅蘭", sub: "VIOLET", hex: "#C78AC8",
    phrase: "the scene rendered in tranquil violet, soft amethyst and lavender hues, quiet and spiritual",
    mood: "a peaceful, spiritual atmosphere, poetic and deeply calming",
    shades: [
      { key: "tint", label: "TINT", hex: "#F5EDF6", depthLabel: "a very pale violet luminous tint" },
      { key: "soft", label: "SOFT", hex: "#EAD7EA", depthLabel: "a soft lavender hue" },
      { key: "base", label: "BASE", hex: "#C78AC8", depthLabel: "the base amethyst tone" },
      { key: "deep", label: "DEEP", hex: "#9439A2", depthLabel: "a deep rich violet shade" }
    ],
    items: [
      "薰衣草田 lavender field", "暮色天空 twilight sky", "繚繞煙霧 drifting smoke", "紫水晶 amethyst crystal",
      "鳶尾花 iris flower", "無花果切面 fig cross-section", "紫玉髓 purple chalcedony", "夜幕薄紗 evening voile curtain"
    ]
  },
  {
    key: "sky", name: "天空", sub: "SKY", hex: "#88A0C7",
    phrase: "the scene rendered in vast open sky blue, clear azure and airy daylight hues",
    mood: "an open, liberating atmosphere, clear-sighted and expansive",
    shades: [
      { key: "tint", label: "TINT", hex: "#EDF0F6", depthLabel: "a pale airy azure luminous tint" },
      { key: "soft", label: "SOFT", hex: "#D7DEEA", depthLabel: "a soft light sky blue hue" },
      { key: "base", label: "BASE", hex: "#88A0C7", depthLabel: "the base clear sky blue tone" },
      { key: "deep", label: "DEEP", hex: "#3F5DB1", depthLabel: "a deep twilight azure shade" }
    ],
    items: [
      "晴空 open sky", "海浪 ocean wave", "湖面倒影 lake reflection", "天然藍染布 indigo-dyed linen",
      "天青瓷器 celadon porcelain", "晨光藍霧 morning blue mist", "水平線 horizon line", "海浪漣漪 ocean ripple"
    ]
  },
  {
    key: "lake", name: "湖水", sub: "LAKE", hex: "#82B6C6",
    phrase: "the scene rendered in still lake teal, soft aqua and muted cyan hues",
    mood: "a still, precise atmosphere, clear-minded and composed",
    shades: [
      { key: "tint", label: "TINT", hex: "#EDF4F6", depthLabel: "a pale aqua luminous tint" },
      { key: "soft", label: "SOFT", hex: "#D5E4EA", depthLabel: "a soft muted aqua blue hue" },
      { key: "base", label: "BASE", hex: "#82B6C6", depthLabel: "the base lake teal tone" },
      { key: "deep", label: "DEEP", hex: "#166C82", depthLabel: "a deep dark teal shade" }
    ],
    items: [
      "靜止水面 still water surface", "海玻璃 sea glass", "水波紋 rippling water", "水滴 water droplet",
      "睡蓮浮葉 floating lily pad", "清澈溪流 flowing stream", "湖底圓卵石 lakebed pebbles", "薄荷嫩葉 fresh mint leaf"
    ]
  },
  {
    key: "moss", name: "青苔", sub: "MOSS", hex: "#78B4AA",
    phrase: "the scene rendered in quiet mossy green, soft sage and deep forest green hues",
    mood: "a hushed, introspective atmosphere, settled and restrained",
    shades: [
      { key: "tint", label: "TINT", hex: "#ECF5F2", depthLabel: "a pale sage luminous tint" },
      { key: "soft", label: "SOFT", hex: "#D4EAE6", depthLabel: "a soft muted sage green hue" },
      { key: "base", label: "BASE", hex: "#78B4AA", depthLabel: "the base moss green tone" },
      { key: "deep", label: "DEEP", hex: "#00754A", depthLabel: "a deep rich mossy-green shade" }
    ],
    items: [
      "苔蘚地衣 moss and lichen", "蕨類葉片 fern fronds", "針葉松枝 pine needles", "抹茶細粉 matcha powder",
      "老樹樹皮 aged tree bark", "晨露凝結 morning dew drop", "濕潤苔石 damp mossy stone", "雨後松林 pine forest after rain"
    ]
  },
  {
    key: "verdant", name: "草木", sub: "VERDANT", hex: "#C0CEA8",
    phrase: "the scene rendered in fresh botanical green, tender herbal leaves and gentle sunlight hues",
    mood: "a vibrant yet gentle atmosphere, rejuvenating and naturally alive",
    shades: [
      { key: "tint", label: "TINT", hex: "#F0F5EC", depthLabel: "a pale tender sprout luminous tint" },
      { key: "soft", label: "SOFT", hex: "#D9EAD6", depthLabel: "a soft meadow green hue" },
      { key: "base", label: "BASE", hex: "#C0CEA8", depthLabel: "the base fresh botanical green tone" },
      { key: "deep", label: "DEEP", hex: "#407215", depthLabel: "a deep rich herbal green shade" }
    ],
    items: [
      "嫩芽新葉 fresh green sprout", "清幽竹林 bamboo grove", "柔嫩草地 meadow grass", "春日新生枝芽 budding spring branch",
      "橄欖樹枝 olive branch", "清新檸檬葉 lemon leaf", "草尖晨珠 dew on blade tip", "迷迭香草 fresh rosemary herb"
    ]
  },
  {
    key: "earth", name: "大地", sub: "EARTH", hex: "#DCB163",
    phrase: "the scene rendered in warm amber, golden brown and muted sandstone color tones",
    mood: "a grounded, abundant atmosphere, ritualistic and steady",
    shades: [
      { key: "tint", label: "TINT", hex: "#F8F0E2", depthLabel: "a pale warm luminous tint" },
      { key: "soft", label: "SOFT", hex: "#F1E0C2", depthLabel: "a soft muted amber hue" },
      { key: "base", label: "BASE", hex: "#DCB163", depthLabel: "the base warm amber tone" },
      { key: "deep", label: "DEEP", hex: "#8A5A00", depthLabel: "a deep warm golden brown shade" }
    ],
    items: [
      "岩石紋理 rock texture", "沙丘曲線 dune curve", "木紋肌理 wood grain texture", "素燒陶器 fired ceramic vessel",
      "金色麥穗 golden wheat ear", "黃昏微光 dusk twilight", "秋季芒草 silvergrass meadow", "暖色砂岩 warm sandstone"
    ]
  }
];

export const PRIMARY_PALETTE = PALETTES[0];
export const SECONDARY_PALETTES = PALETTES.slice(1);

export const COLOR_WEIGHTS: Option[] = [
  { key: "subtle", name: "點綴・融入", sub: "微量色彩點綴", weightPhrase: "subtle accent color touch, delicate color hint" },
  { key: "moderate", name: "平衡・主導", sub: "自然舒適比例", weightPhrase: "balanced color presence, natural harmonious color harmony" },
  { key: "dominant", name: "濃郁・沉浸", sub: "強烈色彩包覆", weightPhrase: "dominant rich color saturation, deeply immersive color atmosphere" }
];

export const CONTRAST: Option[] = [
  { key: "high", name: "高對比", phrase: "high contrast lighting, strong highlights and deep shadows, dramatic tonal range" },
  { key: "mid", name: "中對比", phrase: "medium contrast lighting, balanced highlights and shadows, natural tonal range" },
  { key: "low", name: "低對比", phrase: "low contrast lighting, soft even tones, gentle highlights and shadows, minimal tonal range" }
];

export const NOISE: Option[] = [
  { key: "none", name: "無噪點", phrase: "" },
  { key: "subtle", name: "輕微噪點", phrase: "very subtle fine grain, barely visible noise" },
  { key: "moderate", name: "適中噪點", phrase: "moderate fine film grain, a natural subtle noise texture" },
  { key: "strong", name: "明顯噪點", phrase: "pronounced visible grain, textured noise throughout" }
];

export const SHOTS: Option[] = [
  { key: "macro", name: "微距 Macro", phrase: "macro close-up, extreme detail, shallow depth of field" },
  { key: "closeup", name: "近景 Close-up", phrase: "close-up shot, intimate framing, shallow depth of field" },
  { key: "medium", name: "中景 Medium", phrase: "medium shot, natural human-eye perspective" },
  { key: "vast", name: "遼闊 Expansive", phrase: "vast expansive wide shot, sweeping open scene, a sense of scale and stillness" }
];

export const RATIOS: Option[] = [
  { key: "1:1", name: "1:1", use: "IG 貼文", ar: "1/1", ratioCss: "w-5 h-5" },
  { key: "4:5", name: "4:5", use: "IG 直式", ar: "4/5", ratioCss: "w-4 h-5" },
  { key: "3:4", name: "3:4", use: "直式", ar: "3/4", ratioCss: "w-4 h-[18px]" },
  { key: "9:16", name: "9:16", use: "限動 / Reels", ar: "9/16", ratioCss: "w-3 h-5.5" },
  { key: "4:3", name: "4:3", use: "橫式", ar: "4/3", ratioCss: "w-5.5 h-4" },
  { key: "16:9", name: "16:9", use: "橫幅 / 封面", ar: "16/9", ratioCss: "w-6 h-3.5" },
  { key: "70:99", name: "A4", use: "印刷・直式", ar: "70/99", ratioCss: "w-4 h-5.5" },
  { key: "21:9", name: "21:9", use: "超寬", ar: "21/9", ratioCss: "w-7 h-3" },
  { key: "custom", name: "自訂", use: "自行輸入比例", ar: "1/1", ratioCss: "w-4.5 h-4.5 rounded-full" }
];

export const FILMS: Option[] = [
  { key: "none", name: "無底片濾鏡", sub: "數位原始質感", phrase: "high quality digital photography, clean and modern" },
  { key: "pro400h", name: "Fuji Pro 400H", sub: "柔霧粉彩・清透", phrase: "shot on Fujifilm Pro 400H film, soft pastel tones, airy muted color, gentle contrast" },
  { key: "portra400", name: "Kodak Portra 400", sub: "溫暖・豐富膚色", phrase: "shot on Kodak Portra 400 film, warm rich colors, fine grain, nostalgic feel" }
];

export const GENRES: Option[] = [
  { 
    key: "minimalist", 
    name: "極簡光影", 
    sub: "日常內容・大量留白", 
    phrase: "in the style of minimalist natural-light photography, quiet everyday stillness, gentle negative space",
    description: "強調極致的簡約與光影流轉，以大面積純淨留白與自然柔光突顯單一主體。營造心靈沉靜、不喧嘩的留白美學與安定呼吸感。",
    suitableFor: "心靈字句配圖、日常冥想日常、品牌形象形象視覺、空靈清透意象",
    searchTerm: "minimalist photography natural light",
    visualTraits: ["柔和自然漫射光", "大比例乾淨負空間", "冷靜低彩度", "純粹質地與孤獨感"]
  },
  { 
    key: "wabi", 
    name: "侘寂靜物", 
    sub: "手感材質・自然瑕疵", 
    phrase: "in the style of wabi-sabi still life photography, embracing natural imperfection, soft textural light, gentle weathered surfaces",
    description: "源自日式美學「侘寂（Wabi-sabi）」，專注於物件經歲月洗禮的粗糙、樸拙與短暫之美。接受不完美，展現時間沉澱的質樸生命力。",
    suitableFor: "手作陶藝器皿、古老石材、乾燥花草、禪修與深度身心靈療癒專題",
    searchTerm: "wabi sabi still life photography",
    visualTraits: ["斑駁風化紋理", "大地陶土原色", "幽暗陰翳光感", "不對稱與質樸拙趣"]
  },
  { 
    key: "goldenhour", 
    name: "逆光・黃金時刻", 
    sub: "強調光線・破曉意象", 
    phrase: "backlit golden hour photography, soft lens flare, warm directional light, gentle silhouette and glow",
    description: "捕捉日出破曉或日落前夕的溫暖斜射金光。柔和的光暈與逆光輪廓營造充滿希望、撫慰人心、喚醒內在光芒的詩意氛圍。",
    suitableFor: "希望晨曦、破曉重生、感恩正念、身心靈療癒儀式、生命力主題",
    searchTerm: "golden hour backlit photography aesthetic",
    visualTraits: ["溫暖漫射光暈 (Glow)", "透光邊緣光芒 (Rim light)", "柔和透光光斑 (Lens flare)", "溫柔深情剪影"]
  },
  { 
    key: "documentary", 
    name: "寫實紀實", 
    sub: "生活片刻・不刻意擺拍", 
    phrase: "documentary photography style, candid unposed moment, natural imperfect framing, quiet observational feel",
    description: "宛如旁觀者的溫柔凝視，捕捉真實生活裡不經意流露的真摯時刻。不刻意造作或過度擺拍，具備濃厚的人文溫度與真實呼吸感。",
    suitableFor: "真實心靈對話、生活片段、真實手作與工作坊紀錄、溫暖日常紀實",
    searchTerm: "candid documentary photography natural light",
    visualTraits: ["自然抓拍構圖", "未刻意修飾環境", "自然生活光感", "深刻真實的人文共鳴"]
  }
];

export const EXCLUDE_OPTIONS: Option[] = [
  { key: "people", name: "去除人物", sub: "people, person, human", terms: "people, person, human figure, face, hands, body" },
  { key: "text", name: "去除文字", sub: "text, words, typography", terms: "text, typography, words, letters, captions, watermark" },
  { key: "symbols", name: "去除符號", sub: "symbols, icons, logos", terms: "symbols, icons, emblems, logos" },
  { key: "shapes", name: "去除圖形", sub: "graphic shapes, vector", terms: "graphic shapes, geometric shapes, illustration, vector art, clipart, patterns" },
  { key: "manmade", name: "去除人造物", sub: "man-made, buildings, urban", terms: "man-made objects, buildings, architecture, furniture, vehicles, technology, urban elements, artificial structures" }
];

export const FORMATS: Option[] = [
  { key: "general", name: "AI Universal", sub: "適用 DALL·E 3, SD 等" },
  { key: "midjourney", name: "Midjourney", sub: "支援 --ar 等參數" }
];

export const MJ_VERSIONS: Option[] = [
  { key: "8.2", name: "v 8.2", sub: "最新模型・極致細節" },
  { key: "6.1", name: "v 6.1", sub: "最新光影細節" },
  { key: "6.0", name: "v 6.0", sub: "預設經典寫實" },
  { key: "5.2", name: "v 5.2", sub: "高對比與藝術感" }
];

export const DEFAULT_SUFFIX = "serene minimalist photography, vast open composition, zen-like stillness, soft natural light, meditative simplicity, understated and calm, high detail";
export const STORAGE_KEY = "prompt-studio-universal-v1";
