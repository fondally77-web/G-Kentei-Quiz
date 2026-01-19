/**
 * QuizOnlyView Component
 * クイズのみ挑戦モードのビュー
 */
import { gameState } from '../core/state.js';
import { SAMPLE_QUIZ_DATA, QUIZ_CATEGORIES, DIFFICULTY_LEVELS } from '../data/quizzes/sample_quiz.js';

export class QuizOnlyView {
    constructor() {
        this.element = null;
        this.currentQuestionIndex = 0;
        this.quizData = [...SAMPLE_QUIZ_DATA];
        this.answers = [];
        this.showingResult = false;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'quiz-only-view';
        this.element.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
            animation: fadeIn 0.5s ease;
        `;

        this.renderQuizContent();
        this.addStyles();

        return this.element;
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
                max-width: 800px;
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
                    ← タイトルに戻る
                </button>
                <div style="
                    font-size: 1.2rem;
                    color: var(--color-secondary);
                    font-weight: bold;
                ">
                    ❓ クイズのみ挑戦
                </div>
                <div style="
                    font-size: 0.9rem;
                    color: var(--color-text-muted);
                ">
                    ${progress}
                </div>
            </div>

            <!-- プログレスバー -->
            <div style="
                width: 100%;
                max-width: 800px;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                margin-bottom: 2rem;
                overflow: hidden;
            ">
                <div style="
                    width: ${((this.currentQuestionIndex) / this.quizData.length) * 100}%;
                    height: 100%;
                    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
                    transition: width 0.3s ease;
                "></div>
            </div>

            <!-- 問題カード -->
            <div style="
                width: 100%;
                max-width: 800px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--border-radius-lg);
                padding: 2rem;
            ">
                <!-- カテゴリと難易度 -->
                <div style="
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                ">
                    <span style="
                        padding: 0.25rem 0.75rem;
                        background: rgba(98, 0, 234, 0.2);
                        border-radius: 20px;
                        font-size: 0.85rem;
                        color: var(--color-primary-light);
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
                    font-size: 1.3rem;
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    color: var(--color-text-main);
                ">${currentQuestion.question}</h2>

                <!-- 選択肢 -->
                <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                ">
                    ${currentQuestion.options.map(option => `
                        <button class="quiz-option" data-option-id="${option.id}" style="
                            padding: 1rem 1.5rem;
                            text-align: left;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            border-radius: var(--border-radius-md);
                            color: var(--color-text-main);
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        ">
                            <span style="
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                line-height: 28px;
                                text-align: center;
                                background: rgba(98, 0, 234, 0.3);
                                border-radius: 50%;
                                margin-right: 1rem;
                                font-weight: bold;
                            ">${option.id.toUpperCase()}</span>
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    renderResult() {
        const correctCount = this.answers.filter((a, i) => a === this.quizData[i].correctAnswer).length;
        const accuracy = Math.round((correctCount / this.quizData.length) * 100);

        this.element.innerHTML = `
            <div style="
                width: 100%;
                max-width: 600px;
                text-align: center;
                padding: 3rem;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--border-radius-lg);
            ">
                <div style="
                    font-size: 4rem;
                    margin-bottom: 1rem;
                ">${accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '📚'}</div>
                
                <h2 style="
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    color: var(--color-secondary);
                ">クイズ完了！</h2>
                
                <div style="
                    font-size: 3rem;
                    font-weight: bold;
                    color: ${accuracy >= 80 ? '#4caf50' : accuracy >= 60 ? '#ff9800' : '#f44336'};
                    margin-bottom: 1rem;
                ">${accuracy}%</div>
                
                <p style="
                    color: var(--color-text-muted);
                    margin-bottom: 2rem;
                ">
                    ${correctCount} / ${this.quizData.length} 問正解
                </p>
                
                <div style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                ">
                    <button id="btn-retry" style="
                        padding: 1rem 2rem;
                        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
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
            this.renderQuizContent();
        });

        this.element.querySelector('#btn-back-title').addEventListener('click', () => {
            gameState.goToTitle();
        });
    }

    setupEventListeners() {
        // タイトルに戻るボタン
        const btnBack = this.element.querySelector('#btn-back');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                gameState.goToTitle();
            });
        }

        // 選択肢ボタン
        const optionButtons = this.element.querySelectorAll('.quiz-option');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const optionId = e.currentTarget.dataset.optionId;
                this.selectAnswer(optionId);
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(98, 0, 234, 0.2)';
                btn.style.borderColor = 'var(--color-primary)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.05)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
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
        const level = DIFFICULTY_LEVELS.find(d => d.id === difficulty);
        return level ? level.color : '#ffffff';
    }

    getDifficultyLabel(difficulty) {
        const level = DIFFICULTY_LEVELS.find(d => d.id === difficulty);
        return level ? level.name : difficulty;
    }

    addStyles() {
        if (!document.querySelector('#quiz-only-styles')) {
            const style = document.createElement('style');
            style.id = 'quiz-only-styles';
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
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
