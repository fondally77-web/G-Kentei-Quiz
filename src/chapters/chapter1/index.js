/**
 * Chapter 1 View - 起源編
 * AI・ML・DLの誕生
 */
import { ChapterView } from '../../components/ChapterView.js';
import { chapter1Scenario } from '../../assets/data/chapter1_scenario.js';
import { chapter1Quiz } from '../../assets/data/chapter1_quiz.js';
import { TimelineGame } from './minigame.js';
import { QuizView } from '../../components/QuizView.js';
import { gameState } from '../../core/state.js';

export class Chapter1View extends ChapterView {
    constructor() {
        super(1);
        this.minigameStarted = false;
        this.minigameScore = 0;
        this.quizReport = null;
    }

    async render() {
        const element = await super.render();

        // 第1章のスクリプトをロード
        this.loadScript(chapter1Scenario);

        return element;
    }

    /**
     * ストーリー完了時の処理
     * ミニゲームを開始
     */
    onStoryComplete() {
        if (this.minigameStarted) return;
        this.minigameStarted = true;
        this.startMiniGame();
    }

    /**
     * ミニゲーム開始
     */
    startMiniGame() {
        this.dialogueBox.hide();

        const container = this.createOverlayContainer();
        container.innerHTML = ''; // クリア

        const game = new TimelineGame((score) => {
            console.log(`MiniGame finished with score: ${score}`);
            this.minigameScore = score;
            container.innerHTML = ''; // ゲームをクリア
            this.startQuiz();
        });

        container.appendChild(game.render());
    }

    /**
     * クイズ開始
     */
    startQuiz() {
        const container = this.createOverlayContainer();
        container.innerHTML = ''; // クリア

        const quiz = new QuizView({
            chapterId: 1,
            quizData: chapter1Quiz,
            onComplete: (score, report) => {
                this.onChapterComplete(score, report);
            }
        });

        container.appendChild(quiz.render());
    }

    /**
     * 章クリア処理
     * @param {number} quizScore 
     * @param {Object} report 
     */
    onChapterComplete(score, report) {
        // デバッグログ
        console.log('Chapter1View onChapterComplete received:', { score, report });

        // reportからスコアと正解率を取得
        const quizScore = report?.summary?.totalScore ?? score ?? 0;
        const accuracy = report?.summary?.accuracy ?? 0;
        this.quizReport = report;

        console.log('Calculated values:', { quizScore, accuracy });

        // 進捗を保存
        gameState.completeChapter(1, quizScore, this.minigameScore);

        // キーワードを解放
        if (report && report.incorrectKeywords) {
            // 不正解のキーワードも含めて全キーワードを解放（学習として）
            const allKeywords = [];
            chapter1Quiz.forEach(q => {
                if (q.keywords) allKeywords.push(...q.keywords);
            });
            gameState.unlockKeywords([...new Set(allKeywords)]);
        }

        // クリア画面表示
        this.showClearScreen(quizScore, accuracy);
    }

    /**
     * クリア画面表示
     * @param {number} score 
     * @param {number} accuracy - 正解率
     */
    showClearScreen(score, accuracy = 0) {
        const container = this.createOverlayContainer();
        container.innerHTML = `
            <div style="
                text-align: center;
                padding: 2rem;
                background: linear-gradient(145deg, rgba(30, 30, 50, 0.98), rgba(20, 20, 40, 0.99));
                border-radius: var(--border-radius-lg);
                border: 2px solid var(--color-status-success);
                max-width: 500px;
                max-height: 85vh;
                overflow-y: auto;
                animation: slideUp 0.5s ease;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="
                    margin: 0 0 1rem 0;
                    background: linear-gradient(135deg, var(--color-status-success), var(--color-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 2rem;
                ">第1章 クリア！</h2>
                <p style="color: var(--color-text-main); font-size: 1.1rem; margin-bottom: 2rem;">
                    起源編「AI・ML・DLの誕生」を完了しました！
                </p>
                
                <div style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                ">
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        padding: 1rem;
                        border-radius: var(--border-radius-md);
                    ">
                        <div style="font-size: 1.5rem; color: var(--color-primary-light);">
                            ${accuracy}%
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                            正解率
                        </div>
                    </div>
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        padding: 1rem;
                        border-radius: var(--border-radius-md);
                    ">
                        <div style="font-size: 1.5rem; color: var(--color-secondary);">
                            ${this.minigameScore}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                            ミニゲームスコア
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button id="btn-next-chapter" style="
                        padding: 1rem 2rem;
                        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                    ">
                        第2章へ進む →
                    </button>
                    <button id="btn-back-title" style="
                        padding: 1rem 2rem;
                        background: transparent;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: var(--color-text-muted);
                    ">
                        タイトルへ
                    </button>
                </div>
            </div>
        `;

        // イベントリスナー
        container.querySelector('#btn-next-chapter').addEventListener('click', () => {
            this.removeOverlay();
            gameState.startChapter(2);
        });

        container.querySelector('#btn-back-title').addEventListener('click', () => {
            this.removeOverlay();
            gameState.goToTitle();
        });
    }

    /**
     * オーバーレイを削除
     */
    removeOverlay() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }

    destroy() {
        super.destroy();
    }
}
