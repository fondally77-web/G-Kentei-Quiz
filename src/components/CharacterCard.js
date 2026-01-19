/**
 * CharacterCard Component
 * キャラクター情報カード
 */
export class CharacterCard {
    constructor(character, options = {}) {
        this.character = character;
        this.options = {
            showQuotes: true,
            showSkills: true,
            compact: false,
            interactive: true,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `character-card ${this.options.compact ? 'compact' : ''}`;

        const themeColor = this.getChapterColor(this.character.chapter);

        this.element.style.cssText = `
            background: linear-gradient(145deg, rgba(30, 30, 40, 0.95), rgba(20, 20, 30, 0.98));
            border: 2px solid ${themeColor};
            border-radius: var(--border-radius-lg);
            padding: ${this.options.compact ? '1rem' : '1.5rem'};
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            transition: transform var(--transition-fast), box-shadow var(--transition-fast);
            ${this.options.interactive ? 'cursor: pointer;' : ''}
        `;

        if (this.options.interactive) {
            this.element.addEventListener('mouseenter', () => {
                this.element.style.transform = 'translateY(-4px)';
                this.element.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${themeColor}40`;
            });
            this.element.addEventListener('mouseleave', () => {
                this.element.style.transform = 'translateY(0)';
                this.element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            });
        }

        this.element.innerHTML = this.renderContent(themeColor);
        return this.element;
    }

    renderContent(themeColor) {
        const { character } = this;

        let html = `
            <div class="character-header" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div class="character-emoji" style="
                    font-size: ${this.options.compact ? '2.5rem' : '3.5rem'};
                    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
                ">
                    ${character.emoji || '🤖'}
                </div>
                <div class="character-info" style="flex: 1;">
                    <h3 style="
                        margin: 0 0 0.25rem 0;
                        font-size: ${this.options.compact ? '1.1rem' : '1.3rem'};
                        color: ${themeColor};
                    ">
                        ${character.name}
                    </h3>
                    <p style="
                        margin: 0;
                        font-size: 0.9rem;
                        color: var(--color-text-muted);
                        font-style: italic;
                    ">
                        ― ${character.title || ''}
                    </p>
                </div>
            </div>
        `;

        // 説明
        if (character.description && !this.options.compact) {
            html += `
                <p style="
                    font-size: 0.95rem;
                    color: var(--color-text-main);
                    line-height: 1.6;
                    margin-bottom: 1rem;
                ">
                    ${character.description}
                </p>
            `;
        }

        // 名言
        if (this.options.showQuotes && character.quotes && character.quotes.length > 0 && !this.options.compact) {
            const quote = character.quotes[0];
            html += `
                <blockquote style="
                    margin: 1rem 0;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.3);
                    border-left: 3px solid ${themeColor};
                    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
                    font-style: italic;
                    color: var(--color-secondary);
                ">
                    "${quote.text || quote}"
                </blockquote>
            `;
        }

        // スキル/技術
        if (this.options.showSkills && character.skills && character.skills.length > 0 && !this.options.compact) {
            html += `
                <div class="character-skills" style="margin-top: 1rem;">
                    <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">
                        技・能力
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${character.skills.map(skill => `
                            <span style="
                                background: rgba(${this.hexToRgb(themeColor)}, 0.2);
                                color: ${themeColor};
                                padding: 0.25rem 0.75rem;
                                border-radius: 1rem;
                                font-size: 0.85rem;
                                border: 1px solid ${themeColor}40;
                            ">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 章情報バッジ
        html += `
            <div style="
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: ${themeColor}30;
                color: ${themeColor};
                padding: 0.2rem 0.6rem;
                border-radius: 1rem;
                font-size: 0.75rem;
            ">
                第${character.chapter}章
            </div>
        `;

        return html;
    }

    getChapterColor(chapter) {
        const colors = {
            1: '#6200ea',
            2: '#00bcd4',
            3: '#ff5722',
            4: '#4caf50',
            5: '#e91e63',
            6: '#2196f3',
            7: '#9c27b0',
            8: '#795548',
            9: '#607d8b'
        };
        return colors[chapter] || '#6200ea';
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : '98, 0, 234';
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
