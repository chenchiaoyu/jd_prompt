# GitHub Pages 部署指南與排錯手冊

本手冊總結了在 GitHub Pages 上自動部署靜態網頁 Demo 時常見的問題、錯誤原因、解決方案以及完整的標準操作步驟。

---

## 一、 此次遇到的困擾與錯誤總結

在將專案推送到 GitHub 並進行自動化部署時，主要遇到了以下兩個關鍵錯誤：

### 1. Node.js 版本過時警告 / 錯誤
* **錯誤現象**：GitHub Actions 執行時跳出警告：
  > `Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24...`
* **根本原因**：GitHub Actions 運行環境全面淘汰了舊版的 Node 20，而舊版本的部署 Action (`peaceiris/actions-gh-pages@v3`) 依賴於 Node 20。
* **克服方式**：將工作流程設定檔 (`.github/workflows/main.yml`) 中的部署動作升級為支援新版 Node 的 **`peaceiris/actions-gh-pages@v4`**。

### 2. Git 退出碼 128 (Exit Code 128) 權限不足錯誤
* **錯誤現象**：執行部署步驟時中斷並報錯：
  > `Action failed with "The process '/usr/bin/git' failed with exit code 128"`
* **根本原因**：GitHub 預設的安全性設定限制了 GITHUB_TOKEN 的寫入權限，導致部署 Action 無法在儲存庫中建立和推送 `gh-pages` 分支。
* **克服方式**：
  1. 在 `.github/workflows/main.yml` 中明確宣告寫入權限 (`permissions: contents: write`)。
  2. 在 GitHub 專案的 **Settings ➔ Actions ➔ General ➔ Workflow permissions** 中勾選 **Read and write permissions**。

---

## 二、 GitHub Pages 自動化部署完整操作步驟

未來如需在任何新專案或更新中實現 GitHub Pages 自動部署，請遵循以下完整步驟：

### 步驟 1：確保專案基礎設定正確
1. **Vite 設定 (`vite.config.ts`)**：
   必須加入 `base: './'`，確保靜態網頁打包後的資源路徑為相對路徑，否則部署到 GitHub Pages 子路徑時會出現 404 資源載入失敗。
   ```typescript
   export default defineConfig({
     base: './',
     plugins: [react()],
   });
   ```
2. **依賴鎖定檔 (`package-lock.json` 或 `bun.lock`)**：
   確保鎖定檔已追蹤並提交至 Git，以供 GitHub Actions 快速且正確地安裝相依套件。

### 步驟 2：設定 GitHub Actions 工作流程
在專案根目錄建立 `.github/workflows/main.yml`，並配置以下完整內容（包含 `permissions: contents: write` 與 `@v4`）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 步驟 3：GitHub 存放庫 (Repository) 權限設定
將程式碼推送到 GitHub 後，前往您的 GitHub 專案頁面進行以下設定：

1. **賦予 Actions 寫入權限**：
   * 進入 **Settings** ➔ **Actions** ➔ **General**。
   * 捲動至 **Workflow permissions** 區段。
   * 選擇 **Read and write permissions**。
   * 點擊 **Save** 儲存。

2. **確認 Pages 部署來源**：
   * 進入 **Settings** ➔ **Pages**。
   * 在 **Build and deployment** 的 **Source** 下拉選單中，確認選擇的是 **GitHub Actions**。

---

## 三、 該注意的地方與最佳實務

1. **分支名稱對應**：
   確保 `main.yml` 中的 `branches: [ main, master ]` 符合您的預設分支名稱（通常為 `main`）。
2. **建置輸出資料夾**：
   確認 `publish_dir` 指向您專案打包輸出的資料夾（Vite 預設為 `./dist`）。
3. **每次推送自動生效**：
   只要完成上述設定，之後每次透過 `git push` 更新程式碼，GitHub Actions 都會自動執行打包並即時更新您的線上 Demo 網頁。
