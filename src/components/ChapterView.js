/**
 * ChapterView Component - 汎用章ビュー
 */
import { DialogueBox } from './DialogueBox.js';
import { StoryEngine } from '../core/story-engine.js';
import { KeywordPanel } from './KeywordPanel.js';
import { QuizView } from './QuizView.js';
import { ConceptDiagram } from './ConceptDiagram.js';
import { gameState } from '../core/state.js';
import { getChapterConfig } from '../data/models/chapter.js';
import { getScenarioByChapter, getQuizByChapter } from '../assets/data/index.js';
import { getCharacterDisplay } from '../data/characters.js';


export class ChapterView {
    constructor(chapterId) {
        this.chapterId = chapterId;
        this.chapterConfig = getChapterConfig(chapterId);
        this.element = null;
        this.dialogueBox = new DialogueBox();
        this.engine = new StoryEngine(this.dialogueBox);
        this.container = null;
        this.minigameStarted = false;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = `chapter-view chapter-${this.chapterId}`;

        const themeColor = this.chapterConfig?.themeColor || '#6200ea';

        this.element.style.cssText = `
            width: 100%;
            min-height: calc(100vh - 180px);
            position: relative;
            background: linear-gradient(180deg, 
                ${this.hexToRgba(themeColor, 0.15)} 0%, 
                rgba(10, 10, 20, 1) 100%
            );
            border-radius: var(--border-radius-lg);
            overflow: visible;
        `;

        // 章タイトルバナー
        const banner = document.createElement('div');
        banner.className = 'chapter-banner';
        banner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding: 1rem 2rem;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), transparent);
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 5;
        `;
        banner.innerHTML = `
            <div>
                <span style="
                    background: ${themeColor};
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.85rem;
                ">第${this.chapterId}章</span>
                <h2 style="
                    margin: 0.5rem 0 0 0;
                    font-size: 1.3rem;
                    color: ${themeColor};
                ">${this.chapterConfig?.title || ''}</h2>
                <p style="
                    margin: 0.25rem 0 0 0;
                    font-size: 0.9rem;
                    color: var(--color-text-muted);
                ">${this.chapterConfig?.subtitle || ''}</p>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button id="skip-quiz-btn" style="
                    background: ${themeColor};
                    border: none;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    font-size: 0.85rem;
                ">クイズへ →</button>
                <button id="back-btn" style="
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: var(--color-text-muted);
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                ">← 戻る</button>
            </div>
        `;
        this.element.appendChild(banner);

        // キャラクター表示エリア（中央上部配置）
        const charArea = document.createElement('div');
        charArea.className = 'character-area';
        charArea.id = 'character-area';
        charArea.style.cssText = `
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            height: 40%;
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            pointer-events: none;
            z-index: 4;
        `;
        charArea.innerHTML = `
            <div id="character-display" style="
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                transition: opacity 0.3s ease, transform 0.3s ease;
            ">
                <img id="character-image" src="" alt="" style="
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
                    display: none;
                " />
                <span id="character-emoji" style="
                    font-size: 10rem;
                    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
                    display: none;
                "></span>
            </div>
        `;
        this.element.appendChild(charArea);

        // ダイアログボックス
        this.element.appendChild(this.dialogueBox.render());

        // イベントハンドラー設定
        this.setupEventHandlers();

        // 戻るボタン
        banner.querySelector('#back-btn').addEventListener('click', () => {
            gameState.goToTitle();
        });

        // クイズスキップボタン
        banner.querySelector('#skip-quiz-btn').addEventListener('click', () => {
            console.log(`ストーリーをスキップしてクイズへ遷移`);
            this.showQuiz();
        });

        // シナリオを自動ロード
        this.autoLoadScenario();

        return this.element;
    }

    /**
     * シナリオを自動ロード
     */
    autoLoadScenario() {
        const scenario = getScenarioByChapter(this.chapterId);
        if (scenario && scenario.length > 0) {
            this.loadScript(scenario);
            console.log(`第${this.chapterId}章シナリオをロード: ${scenario.length}セリフ`);
        } else {
            console.warn(`第${this.chapterId}章のシナリオが見つかりません`);
            // デフォルトメッセージ
            this.dialogueBox.showMessage(`第${this.chapterId}章のシナリオは準備中です。`);
        }
    }

    setupEventHandlers() {
        // 行表示時にキャラクター立ち絵を更新
        this.engine.on('onLineShow', (data) => {
            if (data.line && data.line.character) {
                this.setCharacterDisplay(data.line.character);
            }
            // フィードバック行の場合は特別な演出
            if (data.line && data.line._isFeedback) {
                this.showFeedbackHighlight(data.line._isCorrect);
            }
        });

        // ストーリー完了時
        this.engine.on('onComplete', (data) => {
            console.log('Story completed:', data);
            this.onStoryComplete();
        });

        // キーワード出現時
        this.engine.on('onKeyword', (data) => {
            gameState.unlockKeywords(data.keywords);
        });

        // パネル表示時
        this.engine.on('onPanel', (data) => {
            const panel = new KeywordPanel({
                title: data.title,
                content: data.content,
                keywords: data.keywords,
                imageUrl: data.imageUrl,
                onClose: () => {
                    data.resume();
                }
            });
            panel.show();
        });

        // 選択肢出現時
        this.engine.on('onChoice', (data) => {
            this.showChoiceUI(data);
        });

        // 概念図表示時
        this.engine.on('onConcept', (data) => {
            const diagram = new ConceptDiagram({
                conceptId: data.conceptId,
                onClose: () => {
                    data.resume();
                }
            });
            const rendered = diagram.render();
            if (rendered) {
                diagram.show();
            } else {
                // 概念図が見つからない場合は次へ進む
                data.resume();
            }
        });

        // インラインクイズ出現時
        this.engine.on('onInlineQuiz', (data) => {
            this.showInlineQuizUI(data);
        });
    }

    /**
     * フィードバック時のハイライト演出
     * @param {boolean} isCorrect 
     */
    showFeedbackHighlight(isCorrect) {
        const dialogueEl = this.dialogueBox.element;
        if (!dialogueEl) return;

        const color = isCorrect ? 'var(--color-status-success)' : 'var(--color-status-error, #ff5252)';
        const icon = isCorrect ? '✅' : '💡';

        // 一時的にボーダーハイライト
        dialogueEl.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
        dialogueEl.style.borderColor = color;
        dialogueEl.style.boxShadow = `0 0 20px ${color}40`;

        // フィードバックアイコン
        const iconEl = document.createElement('div');
        iconEl.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            animation: bounceIn 0.5s ease;
            z-index: 100;
        `;
        iconEl.textContent = icon;
        dialogueEl.appendChild(iconEl);

        // 2秒後に元に戻す
        setTimeout(() => {
            dialogueEl.style.borderColor = '';
            dialogueEl.style.boxShadow = '';
            iconEl.remove();
        }, 2000);
    }

    /**
     * インラインクイズUIを表示
     * @param {Object} data 
     */
    showInlineQuizUI(data) {
        const themeColor = this.chapterConfig?.themeColor || '#6200ea';

        const overlay = document.createElement('div');
        overlay.className = 'inline-quiz-overlay';
        overlay.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 650px;
            background: linear-gradient(145deg, rgba(25, 25, 45, 0.98), rgba(15, 15, 35, 0.99));
            border: 2px solid ${themeColor};
            border-radius: var(--border-radius-lg);
            padding: 1.5rem;
            z-index: 15;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;

        overlay.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <span style="
                    background: ${themeColor};
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.8rem;
                ">クイズ</span>
                <span style="color: var(--color-text-muted); font-size: 0.9rem;">
                    ${data.character || 'キャラクター'}からの質問
                </span>
            </div>
            <p style="
                margin: 0 0 1.25rem 0;
                font-size: 1.15rem;
                color: var(--color-text-main);
                line-height: 1.6;
            ">${data.question}</p>
            <div class="quiz-options" style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${data.options.map((opt, i) => `
                    <button class="quiz-option" data-index="${i}" data-correct="${opt.correct}" style="
                        text-align: left;
                        padding: 1rem 1.25rem;
                        background: rgba(40, 40, 70, 0.8);
                        border: 2px solid rgba(255, 255, 255, 0.1);
                        color: var(--color-text-main);
                        border-radius: var(--border-radius-md);
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-size: 1rem;
                    ">${opt.text}</button>
                `).join('')}
            </div>
        `;

        this.dialogueBox.hide();
        this.element.appendChild(overlay);

        // 選択肢ボタンのイベント
        const buttons = overlay.querySelectorAll('.quiz-option');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.borderColor = themeColor;
                btn.style.background = `${themeColor}20`;
                btn.style.transform = 'translateX(5px)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                btn.style.background = 'rgba(40, 40, 70, 0.8)';
                btn.style.transform = 'translateX(0)';
            });
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index, 10);
                const isCorrect = btn.dataset.correct === 'true';

                // 全ボタンを無効化
                buttons.forEach(b => {
                    b.style.pointerEvents = 'none';
                });

                // 正解/不正解の視覚フィードバック
                if (isCorrect) {
                    btn.style.borderColor = 'var(--color-status-success)';
                    btn.style.background = 'rgba(76, 175, 80, 0.3)';
                    btn.innerHTML = `✅ ${btn.textContent}`;
                } else {
                    btn.style.borderColor = 'var(--color-status-error, #ff5252)';
                    btn.style.background = 'rgba(244, 67, 54, 0.3)';
                    btn.innerHTML = `❌ ${btn.textContent}`;
                    // 正解もハイライト
                    buttons.forEach(b => {
                        if (b.dataset.correct === 'true') {
                            b.style.borderColor = 'var(--color-status-success)';
                            b.style.background = 'rgba(76, 175, 80, 0.2)';
                        }
                    });
                }

                // 少し待ってから次へ進む
                setTimeout(() => {
                    overlay.remove();
                    data.resume(isCorrect, index);
                }, 800);
            });
        });
    }

    /**
     * スクリプトをロード
     * @param {Array} scriptData 
     */
    loadScript(scriptData) {
        this.engine.loadScript(scriptData);
    }

    /**
     * キャラクター表示を更新
     * @param {string} characterName キャラクター名
     */
    setCharacterDisplay(characterName) {
        const charImg = this.element.querySelector('#character-image');
        const charEmoji = this.element.querySelector('#character-emoji');
        const display = this.element.querySelector('#character-display');

        if (!display) return;

        // キャラクターデータを取得
        const charData = getCharacterDisplay(characterName);

        // フェードアウト
        display.style.opacity = '0';
        display.style.transform = 'translateY(10px)';

        setTimeout(() => {
            if (charData.type === 'image' && charImg) {
                // 画像を表示
                charImg.src = charData.value;
                charImg.alt = charData.name || characterName;
                charImg.style.display = 'block';
                if (charEmoji) charEmoji.style.display = 'none';
            } else if (charEmoji) {
                // 絵文字を表示
                charEmoji.textContent = charData.value || '💬';
                charEmoji.style.display = 'block';
                if (charImg) charImg.style.display = 'none';
            }

            // フェードイン
            display.style.opacity = '1';
            display.style.transform = 'translateY(0)';
        }, 150);
    }


    /**
     * 選択肢UIを表示
     * @param {Object} data 
     */
    showChoiceUI(data) {
        const overlay = document.createElement('div');
        overlay.className = 'choice-overlay';
        overlay.style.cssText = `
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 600px;
            background: rgba(20, 20, 35, 0.98);
            border: 2px solid var(--color-secondary);
            border-radius: var(--border-radius-lg);
            padding: 1.5rem;
            z-index: 15;
        `;

        overlay.innerHTML = `
            <p style="
                margin: 0 0 1rem 0;
                font-size: 1.1rem;
                color: var(--color-text-main);
            ">${data.prompt}</p>
            <div class="choice-buttons" style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${data.options.map((opt, i) => `
                    <button class="choice-option" data-index="${i}" style="
                        text-align: left;
                        padding: 1rem;
                        background: rgba(40, 40, 60, 0.8);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        color: var(--color-text-main);
                        border-radius: var(--border-radius-md);
                        cursor: pointer;
                        transition: all var(--transition-fast);
                    ">${opt.text}</button>
                `).join('')}
            </div>
        `;

        this.dialogueBox.hide();
        this.element.appendChild(overlay);

        // 選択肢ボタンのイベント
        const buttons = overlay.querySelectorAll('.choice-option');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.borderColor = 'var(--color-secondary)';
                btn.style.background = 'rgba(0, 229, 255, 0.15)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                btn.style.background = 'rgba(40, 40, 60, 0.8)';
            });
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index, 10);
                overlay.remove();
                data.resume(index);
            });
        });
    }

    /**
     * ストーリー完了時の処理
     */
    onStoryComplete() {
        console.log(`第${this.chapterId}章ストーリー完了 - クイズへ遷移`);
        this.showQuiz();
    }

    /**
     * クイズを表示
     */
    showQuiz() {
        const container = this.createOverlayContainer();
        container.innerHTML = '';

        const quizData = getQuizByChapter(this.chapterId);
        if (!quizData || quizData.length === 0) {
            console.warn(`第${this.chapterId}章のクイズデータがありません`);
            this.showClearScreen();
            return;
        }

        // クイズラッパー（戻るボタン付き）
        const quizWrapper = document.createElement('div');
        quizWrapper.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            width: 100%;
        `;

        // 戻るボタン
        const backBtn = document.createElement('button');
        backBtn.textContent = '← ストーリーに戻る';
        backBtn.style.cssText = `
            padding: 0.5rem 1rem;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: var(--color-text-muted);
            border-radius: var(--border-radius-sm);
            cursor: pointer;
            font-size: 0.85rem;
            align-self: flex-start;
            margin-left: 1rem;
            transition: all 0.2s ease;
        `;
        backBtn.addEventListener('mouseenter', () => {
            backBtn.style.borderColor = 'var(--color-secondary)';
            backBtn.style.color = 'var(--color-secondary)';
        });
        backBtn.addEventListener('mouseleave', () => {
            backBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            backBtn.style.color = 'var(--color-text-muted)';
        });
        backBtn.addEventListener('click', () => {
            this.hideQuizOverlay();
        });
        quizWrapper.appendChild(backBtn);

        const quizView = new QuizView({
            chapterId: this.chapterId,
            quizData: quizData,
            onComplete: (score, report) => {
                console.log('クイズ完了:', { score, report });
                this.showClearScreen(report?.summary || { accuracy: 0, totalScore: score });
            }
        });

        const quizElement = quizView.render();
        quizWrapper.appendChild(quizElement);
        container.appendChild(quizWrapper);

        this.currentQuizView = quizView;
    }

    /**
     * クイズオーバーレイを非表示にしてストーリーに戻る
     */
    hideQuizOverlay() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        if (this.currentQuizView) {
            this.currentQuizView.destroy();
            this.currentQuizView = null;
        }
        // ダイアログボックスを再表示
        this.dialogueBox.show();
    }

    /**
     * クリア画面を表示
     * @param {Object} results - クイズ結果
     */
    showClearScreen(results = null) {
        const container = this.createOverlayContainer();
        const themeColor = this.chapterConfig?.themeColor || '#6200ea';

        const accuracy = results?.accuracy || 0;
        const scoreText = results ? `正解率: ${accuracy}%` : '';

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
                <h2 style="color: ${themeColor}; margin-bottom: 0.5rem;">
                    第${this.chapterId}章 クリア！
                </h2>
                <p style="color: var(--color-status-success); font-size: 1.2rem;">
                    「${this.chapterConfig?.title || ''}」完了
                </p>
                ${scoreText ? `<p style="color: var(--color-secondary); font-size: 1.5rem; margin: 1rem 0;">${scoreText}</p>` : ''}
                
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                    <button id="continue-btn" style="
                        padding: 0.75rem 2rem;
                        background: ${themeColor};
                        color: white;
                        border: none;
                        border-radius: var(--border-radius-md);
                        cursor: pointer;
                        font-size: 1rem;
                    ">次の章へ進む</button>
                    <button id="title-btn" style="
                        padding: 0.75rem 2rem;
                        background: transparent;
                        color: var(--color-text-main);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        border-radius: var(--border-radius-md);
                        cursor: pointer;
                        font-size: 1rem;
                    ">タイトルへ戻る</button>
                </div>
            </div>
        `;

        // 章完了を記録
        gameState.completeChapter(this.chapterId);

        // ボタンイベント
        container.querySelector('#continue-btn').addEventListener('click', () => {
            this.removeOverlay();
            if (this.chapterId < 9) {
                gameState.update({ currentChapter: this.chapterId + 1, currentView: 'chapter' });
            } else {
                // 全章クリア
                gameState.goToTitle();
            }
        });

        container.querySelector('#title-btn').addEventListener('click', () => {
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

    /**
     * オーバーレイコンテナを作成
     * @returns {HTMLElement}
     */
    createOverlayContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'assignment-overlay';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                z-index: 100;
                background: rgba(0, 0, 0, 0.9);
                overflow-y: auto;
                padding: 2rem 1rem 4rem 1rem;
            `;
            document.body.appendChild(this.container);
        }
        return this.container;
    }

    hexToRgba(hex, alpha) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
        }
        return `rgba(98, 0, 234, ${alpha})`;
    }

    destroy() {
        this.engine.destroy();
        this.dialogueBox.destroy();
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

// 各章のビュークラス（ファクトリパターン）
export class Chapter1View extends ChapterView {
    constructor() { super(1); }
}

export class Chapter2View extends ChapterView {
    constructor() { super(2); }
}

export class Chapter3View extends ChapterView {
    constructor() { super(3); }
}

export class Chapter4View extends ChapterView {
    constructor() { super(4); }
}

export class Chapter5View extends ChapterView {
    constructor() { super(5); }
}

export class Chapter6View extends ChapterView {
    constructor() { super(6); }
}

export class Chapter7View extends ChapterView {
    constructor() { super(7); }
}

export class Chapter8View extends ChapterView {
    constructor() { super(8); }
}

export class Chapter9View extends ChapterView {
    constructor() { super(9); }
}
