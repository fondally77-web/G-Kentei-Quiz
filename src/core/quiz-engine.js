/**
 * Quiz Engine - 拡張版
 * スコア計算、結果保存、解説表示、タイマー機能
 */
import { createQuizSession, addQuizResult, completeQuizSession, calculateAccuracy } from '../data/models/quiz.js';

export class QuizEngine {
    constructor(chapterId = 1) {
        this.chapterId = chapterId;
        this.questions = [];
        this.currentIndex = 0;
        this.session = null;

        // タイマー関連
        this.questionStartTime = null;
        this.totalTimeMs = 0;

        // イベントハンドラー
        this.eventHandlers = {
            onQuestionChange: [],
            onAnswer: [],
            onComplete: [],
            onTimeout: []
        };

        // 設定
        this.config = {
            pointsPerCorrect: 10,
            bonusPointsForSpeed: 5, // 10秒以内の正解にボーナス
            speedThresholdMs: 10000,
            showExplanation: true,
            shuffleQuestions: false,
            shuffleChoices: false,
            timeLimitMs: null // null = 制限なし
        };
    }

    /**
     * 設定を更新
     * @param {Object} config 
     */
    configure(config) {
        this.config = { ...this.config, ...config };
    }

    /**
     * 問題をロード
     * @param {Array} questionsData 
     */
    loadQuestions(questionsData) {
        this.questions = this.config.shuffleQuestions
            ? this.shuffleArray([...questionsData])
            : [...questionsData];

        this.currentIndex = 0;
        this.session = createQuizSession(this.chapterId);
        this.questionStartTime = Date.now();
        this.totalTimeMs = 0;

        this.emit('onQuestionChange', {
            question: this.getCurrentQuestion(),
            index: 0,
            total: this.questions.length
        });
    }

    /**
     * 現在の問題を取得
     * @returns {Object|null}
     */
    getCurrentQuestion() {
        if (this.currentIndex >= this.questions.length) return null;

        const question = { ...this.questions[this.currentIndex] };

        // 選択肢をシャッフル（オプション）- optionsプロパティを使用
        if (this.config.shuffleChoices && question.options) {
            const originalCorrect = question.options[question.correctIndex];
            question.options = this.shuffleArray([...question.options]);
            question.correctIndex = question.options.indexOf(originalCorrect);
        }

        return question;
    }

    /**
     * 回答を提出
     * @param {number} choiceIndex 
     * @returns {Object} 結果情報
     */
    submitAnswer(choiceIndex) {
        if (this.currentIndex >= this.questions.length) return null;

        const question = this.questions[this.currentIndex];
        const timeSpentMs = Date.now() - this.questionStartTime;
        const isCorrect = choiceIndex === question.correctIndex;

        // 結果を記録
        const result = {
            questionId: question.id,
            userAnswer: choiceIndex,
            correct: isCorrect,
            timeSpentMs
        };

        this.session = addQuizResult(this.session, result);
        this.totalTimeMs += timeSpentMs;

        // 回答イベントを発火
        const answerData = {
            isCorrect,
            question,
            userAnswer: choiceIndex,
            correctAnswer: question.correctIndex,
            explanation: this.config.showExplanation ? question.explanation : null,
            timeSpentMs,
            score: this.session.totalScore
        };

        this.emit('onAnswer', answerData);

        return answerData;
    }

    /**
     * 次の問題へ
     * @returns {boolean} 次の問題があるかどうか
     */
    nextQuestion() {
        this.currentIndex++;
        this.questionStartTime = Date.now();

        if (this.isFinished()) {
            this.finishQuiz();
            return false;
        }

        this.emit('onQuestionChange', {
            question: this.getCurrentQuestion(),
            index: this.currentIndex,
            total: this.questions.length
        });

        return true;
    }

    /**
     * クイズ終了判定
     * @returns {boolean}
     */
    isFinished() {
        return this.currentIndex >= this.questions.length;
    }

    /**
     * クイズを終了
     */
    finishQuiz() {
        this.session = completeQuizSession(this.session);

        const results = {
            session: this.session,
            accuracy: calculateAccuracy(this.session),
            totalTimeMs: this.totalTimeMs,
            averageTimeMs: Math.round(this.totalTimeMs / this.questions.length)
        };

        this.emit('onComplete', results);
        return results;
    }

    /**
     * 問題数を取得
     * @returns {number}
     */
    itemCount() {
        return this.questions.length;
    }

    /**
     * 現在のスコアを取得
     * @returns {number}
     */
    getScore() {
        return this.session ? this.session.totalScore : 0;
    }

    /**
     * 正解数を取得
     * @returns {number}
     */
    getCorrectCount() {
        return this.session ? this.session.correctCount : 0;
    }

    /**
     * 進捗率を取得
     * @returns {number} 0-100
     */
    getProgressPercent() {
        if (this.questions.length === 0) return 0;
        return Math.round((this.currentIndex / this.questions.length) * 100);
    }

    /**
     * 結果一覧を取得
     * @returns {Array}
     */
    getResults() {
        return this.session ? this.session.results : [];
    }

    /**
     * 詳細な結果レポートを生成
     * @returns {Object}
     */
    generateReport() {
        if (!this.session) return null;

        const results = this.session.results;
        const questions = this.questions;

        const report = {
            summary: {
                totalQuestions: questions.length,
                correctCount: this.session.correctCount,
                accuracy: calculateAccuracy(this.session),
                totalScore: this.session.totalScore,
                totalTimeMs: this.totalTimeMs,
                averageTimeMs: Math.round(this.totalTimeMs / questions.length)
            },
            details: questions.map((q, i) => {
                const result = results[i];
                return {
                    question: q.question,
                    userAnswer: result ? q.options[result.userAnswer] : null,
                    correctAnswer: q.options[q.correctIndex],
                    isCorrect: result ? result.correct : false,
                    timeSpentMs: result ? result.timeSpentMs : 0,
                    explanation: q.explanation,
                    keywords: q.keywords
                };
            }),
            incorrectKeywords: this.getIncorrectKeywords()
        };

        return report;
    }

    /**
     * 不正解だった問題のキーワードを取得
     * @returns {string[]}
     */
    getIncorrectKeywords() {
        if (!this.session) return [];

        const keywords = new Set();
        this.session.results.forEach((result, i) => {
            if (!result.correct && this.questions[i]) {
                const q = this.questions[i];
                if (q.keywords) {
                    q.keywords.forEach(k => keywords.add(k));
                }
            }
        });

        return Array.from(keywords);
    }

    /**
     * 配列をシャッフル
     * @param {Array} array 
     * @returns {Array}
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * イベントハンドラーを登録
     * @param {string} event 
     * @param {Function} handler 
     */
    on(event, handler) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].push(handler);
        }
    }

    /**
     * イベントハンドラーを解除
     * @param {string} event 
     * @param {Function} handler 
     */
    off(event, handler) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event] = this.eventHandlers[event].filter(h => h !== handler);
        }
    }

    /**
     * イベントを発火
     * @param {string} event 
     * @param {Object} data 
     */
    emit(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => handler(data));
        }
    }

    /**
     * クリーンアップ
     */
    destroy() {
        this.eventHandlers = {
            onQuestionChange: [],
            onAnswer: [],
            onComplete: [],
            onTimeout: []
        };
        this.questions = [];
        this.session = null;
    }
}
