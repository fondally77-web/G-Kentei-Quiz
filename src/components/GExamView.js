/**
 * GExamView Component
 * G検定仕様の問題に挑戦モードのビュー
 */
import { gameState } from '../core/state.js';
import { G_EXAM_QUIZ_DATA, G_EXAM_CONFIG, PRACTICE_EXAM_CONFIG } from '../data/quizzes/g_exam_quiz.js';

export class GExamView {
    constructor() {
        this.element = null;
        this.currentQuestionIndex = 0;
        this.quizData = [...G_EXAM_QUIZ_DATA];
        this.answers = [];
        this.showingResult = false;
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'g-exam-view';
        this.element.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
            animation: fadeIn 0.5s ease;
        `;

        this.startTime = Date.now();
        this.startTimer();
        this.renderQuizContent();
        this.addStyles();

        return this.element;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            const timerEl = this.element.querySelector('#timer-display');
            if (timerEl) {
                timerEl.textContent = this.formatTime(this.elapsedTime);
            }
        }, 1000);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    renderQuizContent() {
        if (this.showingResult) {
            this.renderResult();
            return;
        }

        const currentQuestion = this.quizData[this.currentQuestionIndex];
        const progress = `${this.currentQuestionIndex + 1} / ${this.quizData.length}`;

        this.element.innerHTML = `
            <!-- ヘッダー -->
            <div style="
                width: 100%;
                max-width: 900px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            ">
                <button id="btn-back" style="
                    padding: 0.5rem 1rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: var(--color-text-muted);
                    border-radius: var(--border-radius-md);
                    cursor: pointer;
                ">
                    ← 終了
                </button>
                <div style="
                    font-size: 1.2rem;
                    color: #4caf50;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    📝 G検定仕様
                    <span style="
                        padding: 0.25rem 0.75rem;
                        background: rgba(76, 175, 80, 0.2);
                        border-radius: 20px;
                        font-size: 0.85rem;
                    ">模擬試験</span>
                </div>
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                ">
                    <div style="
                        font-size: 1rem;
                        color: var(--color-text-muted);
                        font-family: monospace;
                    ">⏱️ <span id="timer-display">${this.formatTime(this.elapsedTime)}</span></div>
                    <div style="
                        font-size: 0.9rem;
                        color: var(--color-text-muted);
                    ">${progress}</div>
                </div>
            </div>

            <!-- プログレスバー -->
            <div style="
                width: 100%;
                max-width: 900px;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                margin-bottom: 2rem;
                overflow: hidden;
            ">
                <div style="
                    width: ${((this.currentQuestionIndex) / this.quizData.length) * 100}%;
                    height: 100%;
                    background: linear-gradient(90deg, #4caf50, #81c784);
                    transition: width 0.3s ease;
                "></div>
            </div>

            <!-- 問題カード -->
            <div style="
                width: 100%;
                max-width: 900px;
                background: linear-gradient(145deg, rgba(30, 40, 30, 0.95), rgba(20, 30, 20, 0.98));
                border: 2px solid rgba(76, 175, 80, 0.3);
                border-radius: var(--border-radius-lg);
                padding: 2rem;
            ">
                <!-- カテゴリ -->
                <div style="
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                ">
                    <span style="
                        padding: 0.25rem 0.75rem;
                        background: rgba(76, 175, 80, 0.2);
                        border-radius: 20px;
                        font-size: 0.85rem;
                        color: #4caf50;
                    ">${currentQuestion.category}</span>
                    <span style="
                        padding: 0.25rem 0.75rem;
                        background: ${this.getDifficultyColor(currentQuestion.difficulty)}20;
                        border-radius: 20px;
                        font-size: 0.85rem;
                        color: ${this.getDifficultyColor(currentQuestion.difficulty)};
                    ">${this.getDifficultyLabel(currentQuestion.difficulty)}</span>
                </div>

                <!-- 問題文 -->
                <h2 style="
                    font-size: 1.2rem;
                    line-height: 1.9;
                    margin-bottom: 2rem;
                    color: var(--color-text-main);
                    font-weight: normal;
                ">${currentQuestion.question}</h2>

                <!-- 選択肢 -->
                <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                ">
                    ${currentQuestion.options.map(option => `
                        <button class="exam-option" data-option-id="${option.id}" style="
                            padding: 1rem 1.5rem;
                            text-align: left;
                            background: rgba(255, 255, 255, 0.03);
                            border: 1px solid rgba(255, 255, 255, 0.15);
                            border-radius: var(--border-radius-md);
                            color: var(--color-text-main);
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            display: flex;
                            align-items: flex-start;
                            gap: 1rem;
                        ">
                            <span style="
                                min-width: 28px;
                                height: 28px;
                                line-height: 26px;
                                text-align: center;
                                background: rgba(76, 175, 80, 0.2);
                                border: 1px solid rgba(76, 175, 80, 0.4);
                                border-radius: 4px;
                                font-weight: bold;
                                font-size: 0.9rem;
                            ">${option.id.toUpperCase()}</span>
                            <span style="line-height: 1.6;">${option.text}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- ナビゲーションヒント -->
            <div style="
                margin-top: 1.5rem;
                color: var(--color-text-muted);
                font-size: 0.85rem;
            ">
                選択肢をクリックして解答してください
            </div>
        `;

        this.setupEventListeners();
    }

    renderResult() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        const correctCount = this.answers.filter((a, i) => a === this.quizData[i].correctAnswer).length;
        const accuracy = Math.round((correctCount / this.quizData.length) * 100);
        const passed = accuracy >= G_EXAM_CONFIG.passingScore * 100;

        this.element.innerHTML = `
            <div style="
                width: 100%;
                max-width: 700px;
                text-align: center;
                padding: 3rem;
                background: linear-gradient(145deg, rgba(30, 40, 30, 0.95), rgba(20, 30, 20, 0.98));
                border: 2px solid ${passed ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'};
                border-radius: var(--border-radius-lg);
            ">
                <div style="
                    font-size: 4rem;
                    margin-bottom: 1rem;
                ">${passed ? '🎊' : '📖'}</div>
                
                <h2 style="
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    color: ${passed ? '#4caf50' : '#ff9800'};
                ">${passed ? '合格ライン達成！' : '惜しい！もう少し！'}</h2>
                
                <p style="
                    color: var(--color-text-muted);
                    margin-bottom: 1.5rem;
                ">G検定模擬試験結果</p>
                
                <div style="
                    font-size: 4rem;
                    font-weight: bold;
                    color: ${passed ? '#4caf50' : '#ff9800'};
                    margin-bottom: 0.5rem;
                ">${accuracy}%</div>
                
                <p style="
                    color: var(--color-text-muted);
                    margin-bottom: 1rem;
                ">
                    ${correctCount} / ${this.quizData.length} 問正解
                </p>

                <div style="
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: var(--border-radius-md);
                ">
                    <div>
                        <div style="font-size: 0.8rem; color: var(--color-text-muted);">所要時間</div>
                        <div style="font-size: 1.2rem; color: var(--color-secondary);">${this.formatTime(this.elapsedTime)}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.8rem; color: var(--color-text-muted);">合格ライン</div>
                        <div style="font-size: 1.2rem; color: var(--color-secondary);">${G_EXAM_CONFIG.passingScore * 100}%</div>
                    </div>
                </div>
                
                <div style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                ">
                    <button id="btn-retry" style="
                        padding: 1rem 2rem;
                        background: linear-gradient(135deg, #4caf50, #388e3c);
                        border: none;
                        border-radius: var(--border-radius-md);
                        color: white;
                        font-size: 1rem;
                        cursor: pointer;
                    ">もう一度挑戦</button>
                    
                    <button id="btn-back-title" style="
                        padding: 1rem 2rem;
                        background: transparent;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        border-radius: var(--border-radius-md);
                        color: var(--color-text-muted);
                        font-size: 1rem;
                        cursor: pointer;
                    ">タイトルに戻る</button>
                </div>
            </div>
        `;

        this.element.querySelector('#btn-retry').addEventListener('click', () => {
            this.currentQuestionIndex = 0;
            this.answers = [];
            this.showingResult = false;
            this.elapsedTime = 0;
            this.startTime = Date.now();
            this.startTimer();
            this.renderQuizContent();
        });

        this.element.querySelector('#btn-back-title').addEventListener('click', () => {
            gameState.goToTitle();
        });
    }

    setupEventListeners() {
        // 終了ボタン
        const btnBack = this.element.querySelector('#btn-back');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                if (confirm('試験を終了しますか？進捗は保存されません。')) {
                    if (this.timerInterval) {
                        clearInterval(this.timerInterval);
                    }
                    gameState.goToTitle();
                }
            });
        }

        // 選択肢ボタン
        const optionButtons = this.element.querySelectorAll('.exam-option');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const optionId = e.currentTarget.dataset.optionId;
                this.selectAnswer(optionId);
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(76, 175, 80, 0.15)';
                btn.style.borderColor = 'rgba(76, 175, 80, 0.5)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.03)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            });
        });
    }

    selectAnswer(optionId) {
        this.answers.push(optionId);

        if (this.currentQuestionIndex < this.quizData.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuizContent();
        } else {
            this.showingResult = true;
            this.renderQuizContent();
        }
    }

    getDifficultyColor(difficulty) {
        const colors = {
            easy: '#4caf50',
            medium: '#ff9800',
            hard: '#f44336'
        };
        return colors[difficulty] || '#ffffff';
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            easy: '初級',
            medium: '中級',
            hard: '上級'
        };
        return labels[difficulty] || difficulty;
    }

    addStyles() {
        if (!document.querySelector('#g-exam-styles')) {
            const style = document.createElement('style');
            style.id = 'g-exam-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    destroy() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
