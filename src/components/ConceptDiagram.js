/**
 * ConceptDiagram Component
 * SVGベースの概念図・インフォグラフィック表示コンポーネント
 */
import { getConcept } from '../data/concepts.js';

export class ConceptDiagram {
    constructor(options = {}) {
        this.options = {
            conceptId: null,
            onClose: null,
            autoAnimate: true,
            animationDelay: 600,
            ...options
        };

        this.element = null;
        this.overlayElement = null;
        this.currentStep = 0;
        this.conceptData = null;
        this.animationTimer = null;
    }

    render() {
        this.conceptData = getConcept(this.options.conceptId);

        if (!this.conceptData) {
            console.warn(`Concept not found: ${this.options.conceptId}`);
            return null;
        }

        // オーバーレイ
        this.overlayElement = document.createElement('div');
        this.overlayElement.className = 'concept-diagram-overlay';
        this.overlayElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        // パネル本体
        this.element = document.createElement('div');
        this.element.className = 'concept-diagram-panel';
        this.element.style.cssText = `
            background: linear-gradient(180deg, rgba(25, 25, 40, 0.98), rgba(15, 15, 30, 0.99));
            border: 2px solid var(--color-secondary, #00e5ff);
            border-radius: 16px;
            padding: 1.5rem 2rem 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 
                0 25px 80px rgba(0, 0, 0, 0.6),
                0 0 60px rgba(0, 229, 255, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
            animation: slideUp 0.4s ease;
        `;

        this.element.innerHTML = this.renderContent();
        this.overlayElement.appendChild(this.element);

        // イベントリスナー
        this.setupEventListeners();

        // アニメーションスタイル追加
        this.addAnimationStyles();

        // 自動アニメーション開始
        if (this.options.autoAnimate && this.conceptData.steps) {
            this.startAnimation();
        }

        return this.overlayElement;
    }

    renderContent() {
        const { title, description, svg, steps } = this.conceptData;

        let html = `
            <!-- ヘッダー -->
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            ">
                <div>
                    <h2 style="
                        margin: 0;
                        font-size: 1.4rem;
                        color: var(--color-secondary, #00e5ff);
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    ">
                        <span style="font-size: 1.5rem;">📊</span>
                        ${title}
                    </h2>
                    <p style="
                        margin: 0.5rem 0 0;
                        font-size: 0.9rem;
                        color: var(--color-text-muted, #b0b0c0);
                        line-height: 1.5;
                    ">${description}</p>
                </div>
                <button class="diagram-close-btn" style="
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: rgba(255, 255, 255, 0.6);
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                ">×</button>
            </div>

            <!-- SVG図解 -->
            <div class="diagram-svg-container" style="
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 200px;
            ">
                ${svg}
            </div>
        `;

        // ステップ説明
        if (steps && steps.length > 0) {
            html += `
                <div class="diagram-steps" style="
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                ">
                    <div style="
                        font-size: 0.85rem;
                        color: var(--color-text-muted, #b0b0c0);
                        margin-bottom: 0.75rem;
                    ">📌 ポイント解説</div>
                    <div class="step-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
                        ${steps.map((s, i) => `
                            <div class="step-item" data-step="${s.step}" style="
                                display: flex;
                                align-items: center;
                                gap: 0.75rem;
                                padding: 0.5rem 0.75rem;
                                background: rgba(255, 255, 255, 0.03);
                                border-radius: 6px;
                                border-left: 3px solid ${s.highlight};
                                opacity: 0.4;
                                transform: translateX(-5px);
                                transition: all 0.3s ease;
                            ">
                                <span style="
                                    min-width: 24px;
                                    height: 24px;
                                    background: ${s.highlight};
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 0.75rem;
                                    font-weight: bold;
                                    color: white;
                                ">${i + 1}</span>
                                <span style="
                                    font-size: 0.9rem;
                                    color: var(--color-text-main, #e0e0e0);
                                ">${s.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 続けるボタン
        html += `
            <div style="text-align: center;">
                <button class="diagram-continue-btn" style="
                    padding: 0.75rem 2.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    background: linear-gradient(135deg, var(--color-primary, #6200ea), var(--color-primary-light, #7c4dff));
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 15px rgba(98, 0, 234, 0.3);
                ">
                    理解した！続ける →
                </button>
            </div>
        `;

        return html;
    }

    setupEventListeners() {
        // 閉じるボタン
        const closeBtn = this.element.querySelector('.diagram-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.borderColor = '#ff5252';
                closeBtn.style.color = '#ff5252';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                closeBtn.style.color = 'rgba(255, 255, 255, 0.6)';
            });
        }

        // 続けるボタン
        const continueBtn = this.element.querySelector('.diagram-continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.close());
            continueBtn.addEventListener('mouseenter', () => {
                continueBtn.style.transform = 'translateY(-2px)';
                continueBtn.style.boxShadow = '0 6px 20px rgba(98, 0, 234, 0.4)';
            });
            continueBtn.addEventListener('mouseleave', () => {
                continueBtn.style.transform = 'translateY(0)';
                continueBtn.style.boxShadow = '0 4px 15px rgba(98, 0, 234, 0.3)';
            });
        }

        // ESCキーで閉じる
        this.keyHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.keyHandler);

        // オーバーレイクリックで閉じる
        this.overlayElement.addEventListener('click', (e) => {
            if (e.target === this.overlayElement) {
                this.close();
            }
        });
    }

    /**
     * アニメーションを開始
     */
    startAnimation() {
        const steps = this.conceptData.steps;
        if (!steps || steps.length === 0) return;

        this.currentStep = 0;
        this.animateNextStep();
    }

    animateNextStep() {
        const steps = this.conceptData.steps;
        if (this.currentStep >= steps.length) {
            // 全ステップ完了
            return;
        }

        const step = steps[this.currentStep];

        // SVG要素をハイライト
        const svgLayers = this.element.querySelectorAll(`.concept-layer[data-step="${step.step}"]`);
        svgLayers.forEach(layer => {
            layer.style.transition = 'all 0.5s ease';
            layer.style.opacity = '1';
            layer.style.transform = 'scale(1)';
        });

        // ステップ説明をハイライト
        const stepItem = this.element.querySelector(`.step-item[data-step="${step.step}"]`);
        if (stepItem) {
            stepItem.style.opacity = '1';
            stepItem.style.transform = 'translateX(0)';
            stepItem.style.background = 'rgba(255, 255, 255, 0.08)';
        }

        this.currentStep++;

        // 次のステップへ
        this.animationTimer = setTimeout(() => {
            this.animateNextStep();
        }, this.options.animationDelay);
    }

    addAnimationStyles() {
        if (!document.querySelector('#concept-diagram-styles')) {
            const style = document.createElement('style');
            style.id = 'concept-diagram-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .concept-layer {
                    opacity: 0.3;
                    transition: all 0.5s ease;
                }
                .diagram-svg-container svg {
                    width: 100%;
                    height: auto;
                    max-height: 280px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    close() {
        // アニメーションタイマーをクリア
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
        }

        // 閉じるアニメーション
        this.overlayElement.style.animation = 'fadeIn 0.2s ease reverse forwards';
        this.element.style.animation = 'slideUp 0.2s ease reverse forwards';

        setTimeout(() => {
            if (this.options.onClose) {
                this.options.onClose();
            }
            this.destroy();
        }, 200);
    }

    show() {
        document.body.appendChild(this.overlayElement);
    }

    destroy() {
        document.removeEventListener('keydown', this.keyHandler);
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
        }
        if (this.overlayElement && this.overlayElement.parentNode) {
            this.overlayElement.remove();
        }
        this.element = null;
        this.overlayElement = null;
    }
}
