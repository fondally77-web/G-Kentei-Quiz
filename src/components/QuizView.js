/**
 * QuizView Component - 拡張版
 * 選択肢表示、正誤フィードバック、解説表示
 */
import { QuizEngine } from '../core/quiz-engine.js';

export class QuizView {
    constructor(options = {}) {
        const { chapterId = 1, quizData = [], onComplete } = options;
        this.engine = new QuizEngine(chapterId);
        this.engine.loadQuestions(quizData);
        this.onComplete = onComplete;
        this.element = null;
        this.isShowingFeedback = false;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'quiz-view';
        this.element.style.cssText = `
            background: linear-gradient(145deg, rgba(25, 25, 40, 0.98), rgba(15, 15, 30, 0.99));
            padding: 1.5rem;
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--color-secondary);
            max-width: 700px;
            margin: 1rem auto 3rem auto;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 229, 255, 0.1);
        `;

        this.showQuestion();
        return this.element;
    }

    showQuestion() {
        const q = this.engine.getCurrentQuestion();
        if (!q) {
            this.showResults();
            return;
        }

        const progress = this.engine.getProgressPercent();
        const current = this.engine.currentIndex + 1;
        const total = this.engine.itemCount();

        this.element.innerHTML = `
            <!-- 進捗ヘッダー -->
            <div class="quiz-header" style="margin-bottom: 1.5rem;">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                ">
                    <span style="color: var(--color-text-muted); font-size: 0.9rem;">
                        問題 ${current} / ${total}
                    </span>
                    <span style="color: var(--color-secondary); font-size: 0.9rem;">
                        スコア: ${this.engine.getScore()}
                    </span>
                </div>
                <div style="
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                ">
                    <div style="
                        width: ${progress}%;
                        height: 100%;
                        background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
                        transition: width 0.3s ease;
                    "></div>
                </div>
            </div>

            <!-- 問題文 -->
            <div class="quiz-question" style="margin-bottom: 2rem;">
                <h3 style="
                    color: var(--color-text-main);
                    font-size: 1.15rem;
                    line-height: 1.7;
                    margin: 0;
                ">
                    <span style="color: var(--color-secondary); margin-right: 0.5rem;">Q${current}.</span>
                    ${q.question}
                </h3>
                ${q.hint ? `
                    <div class="hint-container" style="margin-top: 1rem;">
                        <button class="hint-toggle-btn" style="
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0.5rem 1rem;
                            background: rgba(255, 214, 0, 0.1);
                            border: 1px solid rgba(255, 214, 0, 0.3);
                            border-radius: var(--border-radius-sm);
                            color: var(--color-status-warning);
                            font-size: 0.9rem;
                            cursor: pointer;
                            transition: all var(--transition-fast);
                        ">
                            💡 ヒントを見る
                        </button>
                        <div class="hint-content" style="
                            display: none;
                            margin-top: 0.5rem;
                            padding: 0.75rem;
                            background: rgba(255, 214, 0, 0.1);
                            border-left: 3px solid var(--color-status-warning);
                            border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
                            font-size: 0.9rem;
                            color: var(--color-status-warning);
                            animation: slideUp 0.3s ease;
                        ">
                            💡 ヒント: ${q.hint}
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- 選択肢 -->
            <div class="quiz-choices" style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${q.options.map((choice, index) => `
                    <button class="choice-btn" data-index="${index}" style="
                        text-align: left;
                        padding: 1rem 1.25rem;
                        background: rgba(40, 40, 60, 0.8);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: var(--border-radius-md);
                        color: var(--color-text-main);
                        font-size: 1rem;
                        line-height: 1.5;
                        cursor: pointer;
                        transition: all var(--transition-fast);
                        display: flex;
                        align-items: flex-start;
                        gap: 0.75rem;
                    ">
                        <span style="
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            min-width: 28px;
                            height: 28px;
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 50%;
                            font-size: 0.9rem;
                            color: var(--color-secondary);
                        ">${String.fromCharCode(65 + index)}</span>
                        <span>${choice}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // ヒントボタンのイベントリスナー
        const hintToggleBtn = this.element.querySelector('.hint-toggle-btn');
        if (hintToggleBtn) {
            hintToggleBtn.addEventListener('click', () => {
                const hintContent = this.element.querySelector('.hint-content');
                if (hintContent) {
                    const isHidden = hintContent.style.display === 'none';
                    hintContent.style.display = isHidden ? 'block' : 'none';
                    hintToggleBtn.innerHTML = isHidden ? '💡 ヒントを隠す' : '💡 ヒントを見る';
                }
            });

            // ホバーエフェクト
            hintToggleBtn.addEventListener('mouseenter', () => {
                hintToggleBtn.style.background = 'rgba(255, 214, 0, 0.2)';
            });
            hintToggleBtn.addEventListener('mouseleave', () => {
                hintToggleBtn.style.background = 'rgba(255, 214, 0, 0.1)';
            });
        }

        // 選択肢のイベントリスナー
        const choiceButtons = this.element.querySelectorAll('.choice-btn');
        choiceButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (!this.isShowingFeedback) {
                    btn.style.borderColor = 'var(--color-secondary)';
                    btn.style.background = 'rgba(0, 229, 255, 0.1)';
                    btn.style.transform = 'translateX(4px)';
                }
            });
            btn.addEventListener('mouseleave', () => {
                if (!this.isShowingFeedback) {
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    btn.style.background = 'rgba(40, 40, 60, 0.8)';
                    btn.style.transform = 'translateX(0)';
                }
            });
            btn.addEventListener('click', () => {
                if (!this.isShowingFeedback) {
                    const index = parseInt(btn.dataset.index, 10);
                    this.handleAnswer(index, choiceButtons);
                }
            });
        });
    }

    handleAnswer(index, choiceButtons) {
        this.isShowingFeedback = true;
        const result = this.engine.submitAnswer(index);

        // 全ボタンを無効化してフィードバック表示
        choiceButtons.forEach((btn, i) => {
            btn.style.cursor = 'default';
            btn.style.transform = 'none';

            if (i === result.correctAnswer) {
                // 正解のボタン
                btn.style.borderColor = 'var(--color-status-success)';
                btn.style.background = 'rgba(0, 200, 83, 0.2)';
                btn.querySelector('span:first-child').style.background = 'var(--color-status-success)';
                btn.querySelector('span:first-child').style.color = 'white';
            } else if (i === index && !result.isCorrect) {
                // 間違った選択
                btn.style.borderColor = 'var(--color-status-error)';
                btn.style.background = 'rgba(255, 61, 0, 0.2)';
                btn.querySelector('span:first-child').style.background = 'var(--color-status-error)';
                btn.querySelector('span:first-child').style.color = 'white';
            } else {
                btn.style.opacity = '0.5';
            }
        });

        // フィードバックパネルを表示
        this.showFeedback(result);
    }

    showFeedback(result) {
        const feedbackPanel = document.createElement('div');
        feedbackPanel.className = 'feedback-panel';
        feedbackPanel.style.cssText = `
            margin-top: 1.5rem;
            padding: 1.25rem;
            border-radius: var(--border-radius-md);
            animation: slideUp 0.3s ease;
            ${result.isCorrect
                ? 'background: linear-gradient(135deg, rgba(0, 200, 83, 0.15), rgba(0, 200, 83, 0.05)); border: 1px solid rgba(0, 200, 83, 0.3);'
                : 'background: linear-gradient(135deg, rgba(255, 61, 0, 0.15), rgba(255, 61, 0, 0.05)); border: 1px solid rgba(255, 61, 0, 0.3);'
            }
        `;

        feedbackPanel.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
            ">
                <span style="font-size: 1.5rem;">${result.isCorrect ? '🎉' : '😢'}</span>
                <span style="
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: ${result.isCorrect ? 'var(--color-status-success)' : 'var(--color-status-error)'};
                ">
                    ${result.isCorrect ? '正解！' : '不正解...'}
                </span>
            </div>
            ${result.explanation ? `
                <p style="
                    margin: 0;
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: var(--color-text-main);
                ">
                    📖 ${result.explanation}
                </p>
            ` : ''}
            <div style="text-align: right; margin-top: 1rem;">
                <button class="next-btn" style="
                    padding: 0.6rem 1.5rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                ">
                    ${this.engine.isFinished() ? '結果を見る' : '次の問題へ'} →
                </button>
            </div>
        `;

        this.element.appendChild(feedbackPanel);

        // 次へボタン
        feedbackPanel.querySelector('.next-btn').addEventListener('click', () => {
            this.isShowingFeedback = false;
            if (this.engine.isFinished()) {
                this.showResults();
            } else {
                this.engine.nextQuestion();
                this.showQuestion();
            }
        });

        // アニメーションスタイル
        if (!document.querySelector('#quiz-view-styles')) {
            const style = document.createElement('style');
            style.id = 'quiz-view-styles';
            style.textContent = `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showResults() {
        const report = this.engine.generateReport();
        const accuracy = report.summary.accuracy;

        let grade, gradeColor, gradeEmoji;
        if (accuracy >= 90) {
            grade = 'S'; gradeColor = '#ffd700'; gradeEmoji = '👑';
        } else if (accuracy >= 80) {
            grade = 'A'; gradeColor = '#00c853'; gradeEmoji = '🌟';
        } else if (accuracy >= 70) {
            grade = 'B'; gradeColor = '#2196f3'; gradeEmoji = '✨';
        } else if (accuracy >= 60) {
            grade = 'C'; gradeColor = '#ff9800'; gradeEmoji = '💪';
        } else {
            grade = 'D'; gradeColor = '#f44336'; gradeEmoji = '📚';
        }

        this.element.innerHTML = `
            <div style="text-align: center;">
                <!-- グレード表示 -->
                <div style="
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    animation: bounce 0.5s ease;
                ">
                    ${gradeEmoji}
                </div>
                <h2 style="
                    margin: 0 0 0.5rem 0;
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary-light));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                ">
                    クイズ完了！
                </h2>
                
                <div style="
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, ${gradeColor}40, ${gradeColor}20);
                    border: 3px solid ${gradeColor};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 1.5rem auto;
                ">
                    <span style="
                        font-size: 3rem;
                        font-weight: 900;
                        color: ${gradeColor};
                        text-shadow: 0 0 20px ${gradeColor}80;
                    ">${grade}</span>
                </div>

                <!-- スコア詳細 -->
                <div style="
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin: 2rem 0;
                    text-align: center;
                ">
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        padding: 1rem;
                        border-radius: var(--border-radius-md);
                    ">
                        <div style="font-size: 2rem; color: var(--color-primary-light);">
                            ${report.summary.totalScore}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                            スコア
                        </div>
                    </div>
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        padding: 1rem;
                        border-radius: var(--border-radius-md);
                    ">
                        <div style="font-size: 2rem; color: var(--color-status-success);">
                            ${report.summary.correctCount}/${report.summary.totalQuestions}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                            正解数
                        </div>
                    </div>
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        padding: 1rem;
                        border-radius: var(--border-radius-md);
                    ">
                        <div style="font-size: 2rem; color: var(--color-secondary);">
                            ${accuracy}%
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                            正解率
                        </div>
                    </div>
                </div>

                ${report.incorrectKeywords.length > 0 ? `
                    <div style="
                        background: rgba(255, 214, 0, 0.1);
                        border: 1px solid rgba(255, 214, 0, 0.3);
                        border-radius: var(--border-radius-md);
                        padding: 1rem;
                        margin-bottom: 1.5rem;
                        text-align: left;
                    ">
                        <div style="color: var(--color-status-warning); font-size: 0.9rem; margin-bottom: 0.5rem;">
                            📝 復習が必要なキーワード
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${report.incorrectKeywords.map(k => `
                                <span style="
                                    background: rgba(255, 214, 0, 0.2);
                                    color: var(--color-status-warning);
                                    padding: 0.25rem 0.6rem;
                                    border-radius: 1rem;
                                    font-size: 0.85rem;
                                ">${k}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <button id="btn-close-quiz" style="
                    padding: 1rem 2.5rem;
                    font-size: 1.1rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                ">
                    続ける
                </button>
            </div>
        `;

        this.element.querySelector('#btn-close-quiz').addEventListener('click', () => {
            if (this.onComplete) {
                console.log('QuizView onComplete called with:', {
                    score: report.summary.totalScore,
                    accuracy: report.summary.accuracy,
                    correctCount: report.summary.correctCount,
                    totalQuestions: report.summary.totalQuestions,
                    fullReport: report
                });
                this.onComplete(report.summary.totalScore, report);
            }
        });
    }

    destroy() {
        this.engine.destroy();
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
