/**
 * ProgressBar Component
 * 学習進捗バー
 */
export class ProgressBar {
    constructor(options = {}) {
        this.options = {
            value: 0,
            max: 100,
            label: '',
            showPercent: true,
            size: 'medium', // 'small' | 'medium' | 'large'
            color: 'var(--color-primary)',
            animated: true,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `progress-bar progress-bar--${this.options.size}`;

        const height = this.getSizeHeight();
        const percent = this.getPercent();

        this.element.style.cssText = `
            width: 100%;
        `;

        this.element.innerHTML = `
            ${this.options.label ? `
                <div class="progress-label" style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: ${this.options.size === 'small' ? '0.8rem' : '0.9rem'};
                    color: var(--color-text-muted);
                ">
                    <span>${this.options.label}</span>
                    ${this.options.showPercent ? `<span class="progress-percent">${percent}%</span>` : ''}
                </div>
            ` : ''}
            <div class="progress-track" style="
                width: 100%;
                height: ${height};
                background: rgba(255, 255, 255, 0.1);
                border-radius: ${height};
                overflow: hidden;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
            ">
                <div class="progress-fill" style="
                    width: ${percent}%;
                    height: 100%;
                    background: linear-gradient(90deg, ${this.options.color}, ${this.lightenColor(this.options.color)});
                    border-radius: ${height};
                    transition: width 0.5s ease;
                    ${this.options.animated ? `
                        background-size: 200% 100%;
                        animation: shimmer 2s infinite linear;
                    ` : ''}
                    box-shadow: 0 0 10px ${this.options.color}40;
                "></div>
            </div>
        `;

        // シマーアニメーションのスタイルを追加
        if (this.options.animated && !document.querySelector('#progress-bar-styles')) {
            const style = document.createElement('style');
            style.id = 'progress-bar-styles';
            style.textContent = `
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `;
            document.head.appendChild(style);
        }

        return this.element;
    }

    getSizeHeight() {
        switch (this.options.size) {
            case 'small': return '4px';
            case 'large': return '16px';
            default: return '8px';
        }
    }

    getPercent() {
        return Math.min(100, Math.max(0, Math.round((this.options.value / this.options.max) * 100)));
    }

    /**
     * 値を更新
     * @param {number} value 
     */
    setValue(value) {
        this.options.value = value;

        if (this.element) {
            const percent = this.getPercent();
            const fill = this.element.querySelector('.progress-fill');
            const percentLabel = this.element.querySelector('.progress-percent');

            if (fill) {
                fill.style.width = `${percent}%`;
            }
            if (percentLabel) {
                percentLabel.textContent = `${percent}%`;
            }
        }
    }

    /**
     * 色を明るくする
     * @param {string} color 
     * @returns {string}
     */
    lightenColor(color) {
        // CSS変数の場合はそのまま返す
        if (color.startsWith('var(')) {
            return color;
        }

        // HEX色を明るくする簡易処理
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            const num = parseInt(hex, 16);
            const amt = 40;
            const R = Math.min(255, (num >> 16) + amt);
            const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
            const B = Math.min(255, (num & 0x0000FF) + amt);
            return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
        }

        return color;
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

/**
 * ChapterProgressBar - 章の進捗表示用
 */
export class ChapterProgressBar extends ProgressBar {
    constructor(chapterId, progress, options = {}) {
        const chapterColors = {
            1: '#6200ea', 2: '#00bcd4', 3: '#ff5722',
            4: '#4caf50', 5: '#e91e63', 6: '#2196f3',
            7: '#9c27b0', 8: '#795548', 9: '#607d8b'
        };

        super({
            value: progress.currentSceneIndex || 0,
            max: 100, // 実際の値は外部から設定
            label: `第${chapterId}章`,
            color: chapterColors[chapterId] || '#6200ea',
            ...options
        });

        this.chapterId = chapterId;
        this.progress = progress;
    }
}
