/**
 * Story Engine - 拡張版
 * スライド進行、セーブ/ロード、イベントシステム
 */
import { SCENE_TYPES } from '../data/models/story.js';

export class StoryEngine {
    constructor(dialogueUI) {
        this.ui = dialogueUI;
        this.script = [];
        this.currentIndex = 0;
        this.isFinished = false;
        this.isPaused = false;

        // イベントハンドラー
        this.eventHandlers = {
            onLineShow: [],
            onComplete: [],
            onChoice: [],
            onPanel: [],
            onKeyword: [],
            onConcept: [],
            onInlineQuiz: []  // インラインクイズ用
        };

        // UIコールバック設定
        if (this.ui && this.ui.setCallback) {
            this.ui.setCallback(() => this.next());
        }
    }

    /**
     * スクリプトをロード
     * @param {Array} scriptData 
     * @param {number} startIndex 開始インデックス（リジューム用）
     */
    loadScript(scriptData, startIndex = 0) {
        this.script = scriptData;
        this.currentIndex = startIndex;
        this.isFinished = false;
        this.isPaused = false;
        this.showCurrentLine();
    }

    /**
     * 現在の行を表示
     */
    showCurrentLine() {
        if (this.currentIndex >= this.script.length) {
            this.isFinished = true;
            if (this.ui) this.ui.hide();
            this.emit('onComplete', { totalLines: this.script.length });
            return;
        }

        const line = this.script[this.currentIndex];

        // 行のタイプに応じた処理
        switch (line.type) {
            case SCENE_TYPES.CHOICE:
                this.handleChoice(line);
                break;
            case SCENE_TYPES.PANEL:
                this.handlePanel(line);
                break;
            case SCENE_TYPES.TRANSITION:
                this.handleTransition(line);
                break;
            case SCENE_TYPES.CONCEPT:
                this.handleConcept(line);
                break;
            case SCENE_TYPES.INLINE_QUIZ:
                this.handleInlineQuiz(line);
                break;
            default:
                this.handleDialogue(line);
        }

        // キーワードがあれば通知
        if (line.keywords && line.keywords.length > 0) {
            this.emit('onKeyword', { keywords: line.keywords });
        }

        this.emit('onLineShow', { index: this.currentIndex, line });
    }

    /**
     * 対話行を処理
     * @param {Object} line 
     */
    handleDialogue(line) {
        if (this.ui) {
            // キャラクター名の取得（characterId または character を使用）
            const characterName = line.character || line.characterId || 'SYSTEM';
            this.ui.updateContent(characterName, line.text, line.emotion);
            this.ui.show();
        }
    }

    /**
     * 選択肢を処理
     * @param {Object} line 
     */
    handleChoice(line) {
        this.isPaused = true;
        this.emit('onChoice', {
            prompt: line.prompt,
            options: line.options,
            resume: (optionIndex) => this.selectOption(optionIndex, line.options)
        });
    }

    /**
     * 技術パネルを処理
     * @param {Object} line 
     */
    handlePanel(line) {
        this.isPaused = true;
        this.emit('onPanel', {
            title: line.title,
            content: line.content,
            keywords: line.keywords,
            imageUrl: line.imageUrl,
            resume: () => this.resumeFromPanel()
        });
    }

    /**
     * トランジションを処理
     * @param {Object} line 
     */
    handleTransition(line) {
        // トランジション効果を適用後、自動的に次へ
        setTimeout(() => {
            this.next();
        }, line.duration || 1000);
    }

    /**
     * 概念図を処理
     * @param {Object} line 
     */
    handleConcept(line) {
        this.isPaused = true;
        this.emit('onConcept', {
            conceptId: line.conceptId,
            title: line.title,
            resume: () => this.resumeFromConcept()
        });
    }

    /**
     * インラインクイズを処理
     * @param {Object} line 
     */
    handleInlineQuiz(line) {
        this.isPaused = true;
        this.emit('onInlineQuiz', {
            character: line.character,
            question: line.question,
            options: line.options,
            onCorrect: line.onCorrect,
            onIncorrect: line.onIncorrect,
            resume: (isCorrect, selectedIndex) => this.selectInlineQuizAnswer(isCorrect, selectedIndex, line)
        });
    }

    /**
     * インラインクイズの回答を処理
     * @param {boolean} isCorrect 
     * @param {number} selectedIndex 
     * @param {Object} line 元のクイズ行
     */
    selectInlineQuizAnswer(isCorrect, selectedIndex, line) {
        this.isPaused = false;

        // 正解/不正解に応じたフィードバック行を挿入
        const feedbackLine = isCorrect ? line.onCorrect : line.onIncorrect;
        if (feedbackLine) {
            // 現在位置の次にフィードバック行を一時挿入
            this.script.splice(this.currentIndex + 1, 0, {
                ...feedbackLine,
                _isFeedback: true,
                _isCorrect: isCorrect
            });
        }

        this.next();
    }

    /**
     * 概念図表示後に再開
     */
    resumeFromConcept() {
        this.isPaused = false;
        this.next();
    }

    /**
     * 選択肢を選択
     * @param {number} optionIndex 
     * @param {Array} options 
     */
    selectOption(optionIndex, options) {
        const selectedOption = options[optionIndex];
        this.isPaused = false;

        // 効果を適用
        if (selectedOption.effects) {
            this.emit('onChoice', { effects: selectedOption.effects, selected: optionIndex });
        }

        // 次の行へ（または指定されたシーンへジャンプ）
        if (selectedOption.targetSceneId) {
            this.jumpToScene(selectedOption.targetSceneId);
        } else {
            this.next();
        }
    }

    /**
     * パネル表示後に再開
     */
    resumeFromPanel() {
        this.isPaused = false;
        this.next();
    }

    /**
     * 次の行へ進む
     */
    next() {
        if (this.isFinished || this.isPaused) return;

        this.currentIndex++;
        this.showCurrentLine();
    }

    /**
     * 前の行へ戻る
     */
    previous() {
        if (this.currentIndex <= 0) return;

        this.currentIndex--;
        this.isFinished = false;
        this.showCurrentLine();
    }

    /**
     * 特定のインデックスにジャンプ
     * @param {number} index 
     */
    jumpTo(index) {
        if (index < 0 || index >= this.script.length) return;

        this.currentIndex = index;
        this.isFinished = false;
        this.showCurrentLine();
    }

    /**
     * シーンIDでジャンプ
     * @param {string} sceneId 
     */
    jumpToScene(sceneId) {
        const index = this.script.findIndex(line => line.sceneId === sceneId);
        if (index !== -1) {
            this.jumpTo(index);
        }
    }

    /**
     * 一時停止
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * 再開
     */
    resume() {
        this.isPaused = false;
    }

    /**
     * 現在の進捗を取得（セーブ用）
     * @returns {Object}
     */
    getProgress() {
        return {
            currentIndex: this.currentIndex,
            totalLines: this.script.length,
            isFinished: this.isFinished,
            percentComplete: Math.round((this.currentIndex / this.script.length) * 100)
        };
    }

    /**
     * 進捗を復元（ロード用）
     * @param {number} index 
     */
    restoreProgress(index) {
        if (this.script.length > 0 && index >= 0 && index < this.script.length) {
            this.currentIndex = index;
            this.isFinished = false;
            this.showCurrentLine();
        }
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
            onLineShow: [],
            onComplete: [],
            onChoice: [],
            onPanel: [],
            onKeyword: [],
            onConcept: [],
            onInlineQuiz: []
        };
        this.script = [];
        this.currentIndex = 0;
    }
}
