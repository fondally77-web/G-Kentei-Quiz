/**
 * KeywordPanel Component
 * 技術説明パネル
 */
export class KeywordPanel {
    constructor(options = {}) {
        this.options = {
            title: '',
            content: '',
            keywords: [],
            imageUrl: null,
            onClose: null,
            onKeywordClick: null,
            ...options
        };
        this.element = null;
        this.overlayElement = null;
    }

    render() {
        // オーバーレイ
        this.overlayElement = document.createElement('div');
        this.overlayElement.className = 'keyword-panel-overlay';
        this.overlayElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            z-index: var(--z-overlay);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        // パネル本体
        this.element = document.createElement('div');
        this.element.className = 'keyword-panel';
        this.element.style.cssText = `
            background: linear-gradient(180deg, rgba(30, 30, 45, 0.98), rgba(20, 20, 35, 0.99));
            border: 1px solid var(--color-secondary);
            border-radius: var(--border-radius-lg);
            padding: 2rem;
            max-width: 700px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 229, 255, 0.1);
            animation: slideUp 0.3s ease;
            position: relative;
        `;

        this.element.innerHTML = this.renderContent();
        this.overlayElement.appendChild(this.element);

        // イベントリスナー
        this.setupEventListeners();

        // アニメーションスタイルを追加
        this.addAnimationStyles();

        return this.overlayElement;
    }

    renderContent() {
        const { title, content, keywords, imageUrl } = this.options;

        let html = `
            <!-- 閉じるボタン -->
            <button class="panel-close-btn" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: transparent;
                border: 1px solid var(--color-text-muted);
                color: var(--color-text-muted);
                width: 32px;
                height: 32px;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all var(--transition-fast);
            ">×</button>

            <!-- タイトル -->
            <h2 style="
                margin: 0 0 1.5rem 0;
                font-size: 1.5rem;
                color: var(--color-secondary);
                display: flex;
                align-items: center;
                gap: 0.75rem;
            ">
                <span style="font-size: 1.8rem;">📚</span>
                ${title}
            </h2>
        `;

        // 画像
        if (imageUrl) {
            html += `
                <div class="panel-image" style="
                    margin-bottom: 1.5rem;
                    text-align: center;
                ">
                    <img src="${imageUrl}" alt="${title}" style="
                        max-width: 100%;
                        max-height: 200px;
                        border-radius: var(--border-radius-md);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    " />
                </div>
            `;
        }

        // コンテンツ
        html += `
            <div class="panel-content" style="
                font-size: 1rem;
                line-height: 1.8;
                color: var(--color-text-main);
                margin-bottom: 1.5rem;
            ">
                ${this.renderMarkdown(content)}
            </div>
        `;

        // キーワードタグ
        if (keywords && keywords.length > 0) {
            html += `
                <div class="panel-keywords" style="
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 1rem;
                    margin-top: 1rem;
                ">
                    <div style="
                        font-size: 0.85rem;
                        color: var(--color-text-muted);
                        margin-bottom: 0.75rem;
                    ">
                        📌 関連キーワード
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${keywords.map(keyword => `
                            <span class="keyword-tag" data-keyword="${keyword}" style="
                                background: linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(98, 0, 234, 0.15));
                                color: var(--color-secondary);
                                padding: 0.4rem 0.8rem;
                                border-radius: 1rem;
                                font-size: 0.85rem;
                                border: 1px solid rgba(0, 229, 255, 0.3);
                                cursor: pointer;
                                transition: all var(--transition-fast);
                            ">
                                ${keyword}
                            </span>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 続けるボタン
        html += `
            <div style="text-align: center; margin-top: 1.5rem;">
                <button class="panel-continue-btn" style="
                    padding: 0.75rem 2rem;
                    font-size: 1rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                ">
                    理解した！続ける →
                </button>
            </div>
        `;

        return html;
    }

    /**
     * 簡易Markdownレンダリング
     * @param {string} text 
     * @returns {string}
     */
    renderMarkdown(text) {
        if (!text) return '';

        return text
            // 見出し
            .replace(/^### (.+)$/gm, '<h4 style="color: var(--color-primary-light); margin: 1rem 0 0.5rem;">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 style="color: var(--color-secondary); margin: 1.5rem 0 0.75rem;">$1</h3>')
            // 太字
            .replace(/\*\*(.+?)\*\*/g, '<strong style="color: var(--color-secondary);">$1</strong>')
            // イタリック
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // コード
            .replace(/`(.+?)`/g, '<code style="background: rgba(0,0,0,0.3); padding: 0.1rem 0.4rem; border-radius: 4px; font-family: var(--font-family-mono);">$1</code>')
            // 改行
            .replace(/\n/g, '<br>');
    }

    setupEventListeners() {
        // 閉じるボタン
        const closeBtn = this.element.querySelector('.panel-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.borderColor = 'var(--color-status-error)';
                closeBtn.style.color = 'var(--color-status-error)';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.borderColor = 'var(--color-text-muted)';
                closeBtn.style.color = 'var(--color-text-muted)';
            });
        }

        // 続けるボタン
        const continueBtn = this.element.querySelector('.panel-continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.close());
        }

        // キーワードタグ
        const keywordTags = this.element.querySelectorAll('.keyword-tag');
        keywordTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const keyword = tag.dataset.keyword;
                if (this.options.onKeywordClick) {
                    this.options.onKeywordClick(keyword);
                }
            });
            tag.addEventListener('mouseenter', () => {
                tag.style.background = 'rgba(0, 229, 255, 0.3)';
                tag.style.transform = 'scale(1.05)';
            });
            tag.addEventListener('mouseleave', () => {
                tag.style.background = 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(98, 0, 234, 0.15))';
                tag.style.transform = 'scale(1)';
            });
        });

        // オーバーレイクリックで閉じる
        this.overlayElement.addEventListener('click', (e) => {
            if (e.target === this.overlayElement) {
                this.close();
            }
        });

        // ESCキーで閉じる
        this.keyHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.keyHandler);
    }

    addAnimationStyles() {
        if (!document.querySelector('#keyword-panel-styles')) {
            const style = document.createElement('style');
            style.id = 'keyword-panel-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    close() {
        // 閉じるアニメーション
        this.overlayElement.style.animation = 'fadeIn 0.2s ease reverse';
        this.element.style.animation = 'slideUp 0.2s ease reverse';

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
        if (this.overlayElement && this.overlayElement.parentNode) {
            this.overlayElement.remove();
        }
        this.element = null;
        this.overlayElement = null;
    }
}
