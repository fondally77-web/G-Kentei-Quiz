/**
 * TitleScreen Component - 拡張版
 * セーブデータ対応、章選択へのナビゲーション
 */
import { gameState } from '../core/state.js';
import { CHAPTERS_CONFIG } from '../data/models/chapter.js';

export class TitleScreen {
    constructor() {
        this.element = null;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'title-screen';
        this.element.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            text-align: center;
            animation: fadeIn 1s ease;
            padding: 2rem;
        `;

        const hasSaveData = gameState.hasSaveData();
        const progress = gameState.getTotalProgressPercent();
        const nextChapter = gameState.getNextAvailableChapter();
        const state = gameState.get();

        this.element.innerHTML = `
            <!-- タイトルロゴ -->
            <div class="title-logo" style="margin-bottom: 2rem;">
                <div style="
                    font-size: 5rem;
                    margin-bottom: 1rem;
                    filter: drop-shadow(0 10px 30px rgba(98, 0, 234, 0.5));
                    animation: float 3s ease-in-out infinite;
                ">🌌</div>
                <h1 style="
                    font-size: 3rem;
                    margin: 0 0 0.5rem 0;
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary-light), var(--color-secondary));
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 3s ease infinite;
                ">
                    AI世界冒険譚
                </h1>
                <p style="
                    font-size: 1.1rem;
                    color: var(--color-text-muted);
                    margin: 0;
                    letter-spacing: 0.1em;
                ">
                    〜G検定学習ゲーミフィケーション教材〜
                </p>
            </div>

            <!-- サブタイトル -->
            <div style="
                max-width: 500px;
                margin-bottom: 3rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.03);
                border-radius: var(--border-radius-lg);
                border: 1px solid rgba(255, 255, 255, 0.05);
            ">
                <p style="
                    font-size: 1rem;
                    color: var(--color-text-main);
                    line-height: 1.8;
                    margin: 0;
                ">
                    すべての技術には、解決したかった「問題」がある。<br>
                    キャラクターたちと共に、AIの歴史と技術を学ぼう。
                </p>
            </div>

            ${hasSaveData ? `
                <!-- セーブデータ情報 -->
                <div style="
                    background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(98, 0, 234, 0.1));
                    border: 1px solid rgba(0, 229, 255, 0.3);
                    border-radius: var(--border-radius-md);
                    padding: 1rem 2rem;
                    margin-bottom: 2rem;
                ">
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 1.5rem;
                    ">
                        <div style="text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--color-text-muted);">進捗</div>
                            <div style="font-size: 1.5rem; color: var(--color-secondary);">${progress}%</div>
                        </div>
                        <div style="width: 1px; height: 40px; background: rgba(255,255,255,0.1);"></div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--color-text-muted);">レベル</div>
                            <div style="font-size: 1.5rem; color: var(--color-primary-light);">Lv.${state.playerProfile.level}</div>
                        </div>
                        <div style="width: 1px; height: 40px; background: rgba(255,255,255,0.1);"></div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--color-text-muted);">次の章</div>
                            <div style="font-size: 1.5rem; color: var(--color-status-success);">第${nextChapter}章</div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <!-- メニューボタン -->
            <div class="menu-buttons" style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 300px;">
                ${hasSaveData ? `
                    <button id="btn-continue" style="
                        padding: 1rem 2rem;
                        font-size: 1.2rem;
                        background: linear-gradient(135deg, var(--color-status-success), #00a844);
                        border: none;
                        box-shadow: 0 4px 20px rgba(0, 200, 83, 0.3);
                    ">
                        ▶ 続きから
                    </button>
                ` : ''}
                
                <button id="btn-start" style="
                    padding: 1rem 2rem;
                    font-size: ${hasSaveData ? '1rem' : '1.2rem'};
                    background: ${hasSaveData ? 'rgba(98, 0, 234, 0.3)' : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'};
                    border: ${hasSaveData ? '1px solid var(--color-primary)' : 'none'};
                    box-shadow: ${hasSaveData ? 'none' : '0 4px 20px rgba(98, 0, 234, 0.3)'};
                ">
                    ${hasSaveData ? '🔄 最初から' : '🚀 冒険を始める'}
                </button>
                
                <button id="btn-chapter-select" style="
                    padding: 0.75rem 1.5rem;
                    font-size: 0.95rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: var(--color-text-muted);
                ">
                    📚 章を選ぶ
                </button>
                
                <div style="
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                ">
                    <span style="
                        font-size: 0.85rem;
                        color: var(--color-text-muted);
                        text-align: center;
                        margin-bottom: 0.5rem;
                    ">クイズモード</span>
                    
                    <button id="btn-quiz-only" style="
                        padding: 0.75rem 1.5rem;
                        font-size: 0.95rem;
                        background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2));
                        border: 1px solid rgba(255, 193, 7, 0.5);
                        color: #ffc107;
                    ">
                        ❓ クイズのみ挑戦
                    </button>
                    
                    <button id="btn-g-exam" style="
                        padding: 0.75rem 1.5rem;
                        font-size: 0.95rem;
                        background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(56, 142, 60, 0.2));
                        border: 1px solid rgba(76, 175, 80, 0.5);
                        color: #4caf50;
                    ">
                        📝 G検定仕様の問題に挑戦
                    </button>
                </div>
            </div>

            <!-- 章プレビュー -->
            <div class="chapter-preview" style="
                margin-top: 3rem;
                width: 100%;
                max-width: 800px;
            ">
                <h3 style="
                    font-size: 1rem;
                    color: var(--color-text-muted);
                    margin-bottom: 1rem;
                    text-align: center;
                ">全9章の冒険</h3>
                <div style="
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                ">
                    ${CHAPTERS_CONFIG.map(ch => {
            const chProgress = state.progress[ch.id];
            const isCompleted = chProgress?.completed;
            const isStarted = chProgress?.started;
            return `
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: ${isCompleted
                    ? `linear-gradient(135deg, ${ch.themeColor}60, ${ch.themeColor}30)`
                    : 'rgba(255, 255, 255, 0.05)'};
                                border: 2px solid ${isCompleted ? ch.themeColor : (isStarted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)')};
                                border-radius: var(--border-radius-md);
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                            ">
                                <span style="
                                    font-size: 0.8rem;
                                    color: ${isCompleted ? ch.themeColor : 'var(--color-text-muted)'};
                                ">${ch.id}</span>
                                ${isCompleted ? `
                                    <span style="
                                        position: absolute;
                                        top: -6px;
                                        right: -6px;
                                        font-size: 0.9rem;
                                    ">✓</span>
                                ` : ''}
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;

        // スタイルを追加
        this.addStyles();

        // イベントリスナー
        this.setupEventListeners();

        return this.element;
    }

    setupEventListeners() {
        // 続きからボタン
        const btnContinue = this.element.querySelector('#btn-continue');
        if (btnContinue) {
            btnContinue.addEventListener('click', () => {
                const nextChapter = gameState.getNextAvailableChapter();
                gameState.startChapter(nextChapter);
            });
        }

        // 最初からボタン
        const btnStart = this.element.querySelector('#btn-start');
        if (btnStart) {
            btnStart.addEventListener('click', () => {
                console.log('btn-start clicked, hasSaveData:', gameState.hasSaveData());
                if (gameState.hasSaveData()) {
                    // カスタム確認モーダルを表示
                    this.showResetConfirmModal();
                } else {
                    gameState.startNewGame();
                }
            });
        }

        // 章選択ボタン
        const btnChapterSelect = this.element.querySelector('#btn-chapter-select');
        if (btnChapterSelect) {
            btnChapterSelect.addEventListener('click', () => {
                gameState.goToChapterSelect();
            });
        }

        // クイズのみ挑戦ボタン
        const btnQuizOnly = this.element.querySelector('#btn-quiz-only');
        if (btnQuizOnly) {
            btnQuizOnly.addEventListener('click', () => {
                // クイズのみモードに遷移
                gameState.goToQuizOnlyMode();
            });
        }

        // G検定仕様の問題に挑戦ボタン
        const btnGExam = this.element.querySelector('#btn-g-exam');
        if (btnGExam) {
            btnGExam.addEventListener('click', () => {
                // G検定仕様モードに遷移
                gameState.goToGExamMode();
            });
        }
    }

    /**
     * セーブデータリセット確認モーダルを表示
     */
    showResetConfirmModal() {
        // 既存のモーダルがあれば削除
        const existingModal = document.querySelector('.reset-confirm-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'reset-confirm-modal';
        modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    `;

        modal.innerHTML = `
      <div style="
        background: linear-gradient(145deg, rgba(30, 30, 50, 0.98), rgba(20, 20, 40, 0.99));
        border-radius: var(--border-radius-lg);
        border: 2px solid var(--color-danger, #ff5252);
        padding: 2rem;
        max-width: 400px;
        text-align: center;
        animation: slideUp 0.3s ease;
      ">
        <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
        <h3 style="
          color: var(--color-danger, #ff5252);
          margin: 0 0 1rem 0;
          font-size: 1.3rem;
        ">データをリセットしますか？</h3>
        <p style="
          color: var(--color-text-muted);
          margin: 0 0 1.5rem 0;
          font-size: 0.95rem;
          line-height: 1.6;
        ">
          すべての進捗とセーブデータが削除され、<br>
          最初からゲームを始めます。
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="modal-cancel" style="
            padding: 0.75rem 1.5rem;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: var(--color-text-muted);
            border-radius: var(--border-radius-md);
            cursor: pointer;
            font-size: 1rem;
          ">キャンセル</button>
          <button id="modal-confirm" style="
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, var(--color-danger, #ff5252), #d32f2f);
            border: none;
            color: white;
            border-radius: var(--border-radius-md);
            cursor: pointer;
            font-size: 1rem;
          ">リセットして開始</button>
        </div>
      </div>
    `;

        document.body.appendChild(modal);

        // イベントリスナー
        modal.querySelector('#modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#modal-confirm').addEventListener('click', () => {
            modal.remove();
            gameState.resetProgress();
            gameState.startNewGame();
        });

        // 背景クリックでキャンセル
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    addStyles() {
        if (!document.querySelector('#title-screen-styles')) {
            const style = document.createElement('style');
            style.id = 'title-screen-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
