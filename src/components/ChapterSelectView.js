/**
 * ChapterSelectView Component
 * 章選択画面
 */
import { gameState } from '../core/state.js';
import { CHAPTERS_CONFIG } from '../data/models/chapter.js';
import { ProgressBar } from './ProgressBar.js';

export class ChapterSelectView {
    constructor() {
        this.element = null;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'chapter-select-view';
        this.element.style.cssText = `
            padding: 2rem 0;
            animation: fadeIn 0.5s ease;
        `;

        const state = gameState.get();
        const totalProgress = gameState.getTotalProgressPercent();

        this.element.innerHTML = `
            <!-- ヘッダー -->
            <div class="select-header" style="
                text-align: center;
                margin-bottom: 2rem;
            ">
                <button id="back-to-title" style="
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: var(--color-text-muted);
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                ">← タイトルへ</button>
                
                <h1 style="
                    font-size: 2rem;
                    margin: 0 0 0.5rem 0;
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary-light));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                ">📚 章を選択</h1>
                <p style="
                    color: var(--color-text-muted);
                    margin: 0;
                ">全${CHAPTERS_CONFIG.length}章 ・ 総進捗 ${totalProgress}%</p>
            </div>

            <!-- 全体進捗バー -->
            <div id="total-progress" style="
                max-width: 600px;
                margin: 0 auto 2rem auto;
            "></div>

            <!-- 章カード一覧 -->
            <div class="chapter-grid" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.5rem;
                max-width: 1000px;
                margin: 0 auto;
            ">
                ${CHAPTERS_CONFIG.map(chapter => this.renderChapterCard(chapter, state)).join('')}
            </div>
        `;

        // 全体進捗バー
        const progressContainer = this.element.querySelector('#total-progress');
        const progressBar = new ProgressBar({
            value: totalProgress,
            max: 100,
            label: '全体進捗',
            color: 'var(--color-secondary)',
            size: 'medium'
        });
        progressContainer.appendChild(progressBar.render());

        // イベントリスナー
        this.setupEventListeners();

        return this.element;
    }

    renderChapterCard(chapter, state) {
        const progress = state.progress[chapter.id] || {};
        const isCompleted = progress.completed;
        const isStarted = progress.started;
        const isLocked = false; // 全章選択可能に変更

        return `
            <div class="chapter-card" data-chapter="${chapter.id}" style="
                background: linear-gradient(145deg, 
                    rgba(30, 30, 45, 0.95), 
                    rgba(20, 20, 35, 0.98)
                );
                border: 2px solid ${isCompleted ? chapter.themeColor : (isStarted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)')};
                border-radius: var(--border-radius-lg);
                padding: 1.5rem;
                cursor: ${isLocked ? 'not-allowed' : 'pointer'};
                opacity: ${isLocked ? '0.5' : '1'};
                transition: all var(--transition-fast);
                position: relative;
                overflow: hidden;
            ">
                <!-- 完了バッジ -->
                ${isCompleted ? `
                    <div style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: ${chapter.themeColor};
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 1rem;
                        font-size: 0.8rem;
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                    ">
                        <span>✓</span> クリア
                    </div>
                ` : ''}
                
                <!-- ロックアイコン -->
                ${isLocked ? `
                    <div style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        font-size: 1.5rem;
                    ">🔒</div>
                ` : ''}

                <!-- 章番号 -->
                <div style="
                    display: inline-block;
                    background: ${chapter.themeColor}30;
                    color: ${chapter.themeColor};
                    padding: 0.25rem 0.6rem;
                    border-radius: 0.5rem;
                    font-size: 0.85rem;
                    margin-bottom: 0.75rem;
                ">
                    第${chapter.id}章
                </div>

                <!-- タイトル -->
                <h3 style="
                    margin: 0 0 0.25rem 0;
                    font-size: 1.25rem;
                    color: ${chapter.themeColor};
                ">${chapter.title}</h3>
                <p style="
                    margin: 0 0 1rem 0;
                    font-size: 0.9rem;
                    color: var(--color-text-muted);
                ">${chapter.subtitle}</p>

                <!-- 説明 -->
                <p style="
                    margin: 0 0 1rem 0;
                    font-size: 0.9rem;
                    color: var(--color-text-main);
                    line-height: 1.6;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                ">${chapter.description}</p>

                <!-- メタ情報 -->
                <div style="
                    display: flex;
                    gap: 1rem;
                    color: var(--color-text-muted);
                    font-size: 0.85rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 1rem;
                ">
                    <span>⏱ ${chapter.estimatedMinutes}分</span>
                    <span>📝 ${chapter.quizCount}問</span>
                </div>

                ${isCompleted && progress.quizScore ? `
                    <div style="
                        margin-top: 0.75rem;
                        padding: 0.5rem;
                        background: rgba(0, 200, 83, 0.1);
                        border-radius: var(--border-radius-sm);
                        font-size: 0.85rem;
                        color: var(--color-status-success);
                    ">
                        🏆 スコア: ${progress.quizScore}点
                    </div>
                ` : ''}
            </div>
        `;
    }

    setupEventListeners() {
        // タイトルへ戻る
        const backBtn = this.element.querySelector('#back-to-title');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                gameState.goToTitle();
            });
        }

        // 章カードのクリック
        const chapterCards = this.element.querySelectorAll('.chapter-card');
        chapterCards.forEach(card => {
            const chapterId = parseInt(card.dataset.chapter, 10);
            const state = gameState.get();
            const isLocked = false; // 全章選択可能に変更

            if (!isLocked) {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-4px)';
                    card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'none';
                });
                card.addEventListener('click', () => {
                    gameState.startChapter(chapterId);
                });
            }
        });
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
