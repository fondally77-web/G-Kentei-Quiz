/**
 * Layout Component - 拡張版
 * レスポンシブ対応、ナビゲーション強化
 */
import { gameState } from '../core/state.js';

export class Layout {
  constructor() {
    this.element = null;
  }

  render() {
    if (this.element) return this.element;

    const container = document.createElement('div');
    container.className = 'app-layout';
    container.style.cssText = `
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            width: 100%;
        `;

    container.innerHTML = `
            <header class="app-header" style="
                background: linear-gradient(180deg, rgba(30, 30, 45, 0.98), rgba(20, 20, 35, 0.95));
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                position: sticky;
                top: 0;
                z-index: var(--z-header);
                backdrop-filter: blur(10px);
            ">
                <div class="container" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 64px;
                    padding: 0 var(--spacing-md);
                ">
                    <div class="brand" style="display: flex; align-items: center; cursor: pointer;" id="brand-logo">
                        <span style="font-size: 1.75rem; margin-right: 0.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🌌</span>
                        <h1 style="
                            font-size: 1.25rem;
                            font-weight: 700;
                            margin: 0;
                            background: linear-gradient(135deg, var(--color-secondary), var(--color-primary-light));
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                        ">
                            AI世界冒険譚
                        </h1>
                    </div>
                    
                    <nav class="header-nav" style="display: flex; align-items: center; gap: 1rem;">
                        <!-- 進捗バッジ -->
                        <div id="progress-badge" class="nav-badge" style="
                            background: rgba(255, 255, 255, 0.08);
                            padding: 0.4rem 0.8rem;
                            border-radius: 1rem;
                            font-size: 0.85rem;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                        ">
                            <span style="color: var(--color-text-muted);">📊</span>
                            <span id="progress-text" style="color: var(--color-secondary);">0%</span>
                        </div>
                        
                        <!-- レベルバッジ -->
                        <div id="level-badge" class="nav-badge" style="
                            background: linear-gradient(135deg, rgba(98, 0, 234, 0.3), rgba(0, 229, 255, 0.2));
                            padding: 0.4rem 0.8rem;
                            border-radius: 1rem;
                            font-size: 0.85rem;
                            border: 1px solid rgba(98, 0, 234, 0.5);
                        ">
                            <span style="color: var(--color-primary-light);">Lv.<span id="player-level">1</span></span>
                        </div>
                        
                        <!-- メニューボタン -->
                        <button id="menu-btn" style="
                            background: transparent;
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: var(--color-text-main);
                            padding: 0.4rem 0.6rem;
                            border-radius: var(--border-radius-sm);
                            font-size: 1.2rem;
                            cursor: pointer;
                            transition: all var(--transition-fast);
                        " aria-label="メニュー">
                            ☰
                        </button>
                    </nav>
                </div>
            </header>
            
            <main class="app-main" style="
                flex: 1;
                position: relative;
                background: linear-gradient(180deg, var(--color-bg-main), #0a0a15);
                width: 100%;
            ">
                <div class="main-container" style="
                    display: block;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: var(--spacing-lg) var(--spacing-md);
                    padding-bottom: calc(var(--spacing-lg) + 2rem);
                ">
                    <div id="router-view" class="content-area" style="display: block; width: 100%; min-height: 600px;"></div>
                </div>
            </main>
            
            <footer class="app-footer" style="
                padding: var(--spacing-md) 0;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                background: rgba(0, 0, 0, 0.3);
            ">
                <div class="container">
                    <small style="color: var(--color-text-muted);">
                        G検定学習ゲーミフィケーション教材 "AI世界冒険譚" &copy; 2026
                    </small>
                </div>
            </footer>
            
            <!-- ドロップダウンメニュー -->
            <div id="dropdown-menu" class="dropdown-menu hidden" style="
                position: fixed;
                top: 64px;
                right: 1rem;
                background: rgba(30, 30, 45, 0.98);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--border-radius-md);
                padding: 0.5rem;
                min-width: 180px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                z-index: calc(var(--z-header) + 1);
                backdrop-filter: blur(10px);
            ">
                <button class="menu-item" data-action="chapterSelect" style="
                    width: 100%;
                    text-align: left;
                    background: transparent;
                    border: none;
                    color: var(--color-text-main);
                    padding: 0.75rem 1rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    transition: background var(--transition-fast);
                ">📚 章選択</button>
                <button class="menu-item" data-action="settings" style="
                    width: 100%;
                    text-align: left;
                    background: transparent;
                    border: none;
                    color: var(--color-text-main);
                    padding: 0.75rem 1rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    transition: background var(--transition-fast);
                ">⚙️ 設定</button>
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 0.5rem 0;">
                <button class="menu-item" data-action="title" style="
                    width: 100%;
                    text-align: left;
                    background: transparent;
                    border: none;
                    color: var(--color-text-main);
                    padding: 0.75rem 1rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    transition: background var(--transition-fast);
                ">🏠 タイトルへ</button>
            </div>
        `;

    this.element = container;
    this.setupEventListeners();
    this.subscribeToState();

    return container;
  }

  setupEventListeners() {
    // ロゴクリックでタイトルへ
    const logo = this.element.querySelector('#brand-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        gameState.goToTitle();
      });
    }

    // メニューボタン
    const menuBtn = this.element.querySelector('#menu-btn');
    const dropdownMenu = this.element.querySelector('#dropdown-menu');

    if (menuBtn && dropdownMenu) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
      });

      // メニュー外クリックで閉じる
      document.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
      });

      // メニュー項目
      const menuItems = dropdownMenu.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
          item.style.background = 'transparent';
        });
        item.addEventListener('click', () => {
          const action = item.dataset.action;
          this.handleMenuAction(action);
          dropdownMenu.classList.add('hidden');
        });
      });
    }
  }

  handleMenuAction(action) {
    switch (action) {
      case 'title':
        gameState.goToTitle();
        break;
      case 'chapterSelect':
        gameState.goToChapterSelect();
        break;
      case 'settings':
        // 設定モーダルを表示（後で実装）
        console.log('Settings not implemented yet');
        break;
    }
  }

  subscribeToState() {
    gameState.subscribe((state) => {
      this.updateProgress(state);
      this.updateLevel(state);
    });
  }

  updateProgress(state) {
    const progressText = this.element.querySelector('#progress-text');
    if (progressText) {
      const percent = gameState.getTotalProgressPercent();
      progressText.textContent = `${percent}%`;
    }
  }

  updateLevel(state) {
    const levelText = this.element.querySelector('#player-level');
    if (levelText && state.playerProfile) {
      levelText.textContent = state.playerProfile.level;
    }
  }

  destroy() {
    // Cleanup if needed
  }
}
