/**
 * DialogueBox Component - 拡張版
 * キャラクター対話、名言表示、タイプライター効果
 */
import { getCharacterDisplay, getCharacter } from '../data/characters.js';

export class DialogueBox {
  constructor(options = {}) {
    this.options = {
      typingSpeed: 30, // ミリ秒/文字
      showContinueIndicator: true,
      enableSkip: true,
      ...options
    };

    this.element = null;
    this.onNext = null;
    this.isTyping = false;
    this.typingTimeout = null;
    this.fullText = '';
    this.currentCharIndex = 0;
  }

  setCallback(onNext) {
    this.onNext = onNext;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'dialogue-box';
    this.element.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 850px;
            min-height: 140px;
            max-height: 30%;
            background: linear-gradient(180deg, rgba(25, 25, 35, 0.97), rgba(15, 15, 25, 0.99));
            border: 2px solid var(--color-primary);
            border-radius: var(--border-radius-lg);
            padding: 1.25rem 1.5rem;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.5),
                0 0 60px rgba(98, 0, 234, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: column;
            z-index: 10;
            cursor: pointer;
            overflow-y: auto;
        `;

    this.element.innerHTML = `
            <!-- キャラクター名 -->
            <div class="dialogue-header" style="
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
            ">
                <!-- キャラクターアイコン -->
                <div id="char-icon-container" style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid var(--color-secondary);
                    flex-shrink: 0;
                    background: rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <img id="char-icon-img" src="" alt="" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: none;
                    " />
                    <span id="char-emoji" style="
                        font-size: 1.8rem;
                        display: block;
                    "></span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                    <span id="char-name" style="
                        font-weight: 700;
                        color: var(--color-secondary);
                        font-size: 1.15rem;
                        text-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
                    "></span>
                    <span id="char-emotion" style="
                        font-size: 0.8rem;
                        color: var(--color-text-muted);
                        font-style: italic;
                    "></span>
                </div>
            </div>
            
            
            <!-- 対話テキスト -->
            <div id="dialogue-text" style="
                font-size: 1.1rem;
                line-height: 1.8;
                flex: 1;
                overflow-y: auto;
                color: var(--color-text-main);
                min-height: 80px;
            "></div>
            
            <!-- 続けるインジケーター -->
            <div class="dialogue-footer" style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 0.75rem;
                gap: 1rem;
            ">
                <span id="skip-hint" style="
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                    opacity: 0;
                    transition: opacity 0.3s;
                ">
                    クリックでスキップ
                </span>
                <span id="continue-indicator" style="
                    font-size: 0.85rem;
                    color: var(--color-text-muted);
                    animation: bounce 1s infinite;
                ">
                    ▼ 続ける
                </span>
            </div>
        `;

    // クリックイベント
    this.element.addEventListener('click', () => this.handleClick());

    // アニメーションスタイル
    this.addAnimationStyles();

    return this.element;
  }

  handleClick() {
    if (this.isTyping && this.options.enableSkip) {
      // タイピング中ならスキップ
      this.skipTyping();
    } else if (this.onNext) {
      this.onNext();
    }
  }

  /**
   * コンテンツを更新
   * @param {string} name キャラクター名
   * @param {string} text 対話テキスト
   * @param {string} emotion 感情/表情（オプション）
   * @param {string} emoji 絵文字（オプション）
   */
  updateContent(name, text, emotion = '', emoji = '') {
    if (!this.element) return;
    
    this.element.scrollTop = 0;

    const nameEl = this.element.querySelector('#char-name');
    const textEl = this.element.querySelector('#dialogue-text');
    const emotionEl = this.element.querySelector('#char-emotion');
    const emojiEl = this.element.querySelector('#char-emoji');
    const iconImg = this.element.querySelector('#char-icon-img');
    const iconContainer = this.element.querySelector('#char-icon-container');
    const skipHint = this.element.querySelector('#skip-hint');
    const continueIndicator = this.element.querySelector('#continue-indicator');

    // キャラクター情報を取得
    const charData = getCharacterDisplay(name);

    // キャラクター名を設定
    if (nameEl) {
      nameEl.textContent = name || '???';
      // キャラクターカラーを名前に適用
      if (charData.color) {
        nameEl.style.color = charData.color;
        nameEl.style.textShadow = `0 0 10px ${charData.color}40`;
      }
    }
    if (emotionEl) emotionEl.textContent = emotion ? `(${emotion})` : '';

    // アイコン表示（画像優先、なければ絵文字）
    if (charData.type === 'image' && iconImg) {
      iconImg.src = charData.value;
      iconImg.alt = charData.name || name;
      iconImg.style.display = 'block';
      if (emojiEl) emojiEl.style.display = 'none';
    } else if (emojiEl) {
      const displayEmoji = emoji || charData.value || this.getCharacterEmoji(name);
      emojiEl.textContent = displayEmoji;
      emojiEl.style.display = 'block';
      if (iconImg) iconImg.style.display = 'none';
    }

    // アイコンコンテナのボーダー色をキャラクターカラーに
    if (iconContainer && charData.color) {
      iconContainer.style.borderColor = charData.color;
    }

    // テキストをタイプライター効果で表示
    this.fullText = text || '';
    this.currentCharIndex = 0;

    if (textEl) {
      textEl.textContent = '';

      if (this.options.typingSpeed > 0) {
        this.isTyping = true;
        if (skipHint) skipHint.style.opacity = '1';
        if (continueIndicator) continueIndicator.style.opacity = '0';
        this.typeNextChar(textEl, skipHint, continueIndicator);
      } else {
        textEl.textContent = this.fullText;
      }
    }
  }

  typeNextChar(textEl, skipHint, continueIndicator) {
    if (this.currentCharIndex >= this.fullText.length) {
      this.finishTyping(skipHint, continueIndicator);
      return;
    }

    textEl.textContent += this.fullText[this.currentCharIndex];
    this.currentCharIndex++;

    this.typingTimeout = setTimeout(
      () => this.typeNextChar(textEl, skipHint, continueIndicator),
      this.options.typingSpeed
    );
  }

  skipTyping() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    const textEl = this.element.querySelector('#dialogue-text');
    const skipHint = this.element.querySelector('#skip-hint');
    const continueIndicator = this.element.querySelector('#continue-indicator');

    if (textEl) {
      textEl.textContent = this.fullText;
    }

    this.finishTyping(skipHint, continueIndicator);
  }

  finishTyping(skipHint, continueIndicator) {
    this.isTyping = false;
    if (skipHint) skipHint.style.opacity = '0';
    if (continueIndicator) continueIndicator.style.opacity = '1';
  }

  /**
   * キャラクター名から絵文字を推測
   * @param {string} name 
   * @returns {string}
   */
  getCharacterEmoji(name) {
    const emojiMap = {
      'AI': '🌌',
      'ML': '🎓',
      'DL': '⚡',
      'SYSTEM': '💻',
      '教師あり学習': '📚',
      '教師なし学習': '🎨',
      '強化学習': '🎮',
      'CNN': '👁️',
      'RNN': '🧠',
      'Transformer': '✨',
      'GAN': '🎨',
      'ニューロン': '🧠',
      '誤差逆伝播法': '🔙',
      '活性化関数': '😊',
      '正則化': '🛡️'
    };
    return emojiMap[name] || '💬';
  }

  addAnimationStyles() {
    if (!document.querySelector('#dialogue-box-styles')) {
      const style = document.createElement('style');
      style.id = 'dialogue-box-styles';
      style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(4px); }
                }
                
                /* スマホ用スタイル */
                @media (max-width: 768px) {
                    .dialogue-box {
                        width: 95% !important;
                        min-height: 120px !important;
                        max-height: 40% !important;
                        padding: 1rem !important;
                        bottom: 5px !important;
                    }
                    
                    .dialogue-box #char-icon-container {
                        width: 40px !important;
                        height: 40px !important;
                    }
                    
                    .dialogue-box #char-name {
                        font-size: 1rem !important;
                    }
                    
                    .dialogue-box #dialogue-text {
                        font-size: 0.95rem !important;
                        line-height: 1.6 !important;
                        min-height: 60px !important;
                    }
                    
                    .dialogue-box #continue-indicator {
                        font-size: 0.75rem !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

  show() {
    if (this.element) {
      this.element.style.display = 'flex';
      this.element.style.animation = 'fadeIn 0.3s ease';
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
    // タイピングをクリア
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.isTyping = false;
  }

  /**
   * タイピング速度を設定
   * @param {string} speed 'slow' | 'normal' | 'fast' | 'instant'
   */
  setTypingSpeed(speed) {
    const speedMap = {
      slow: 50,
      normal: 30,
      fast: 15,
      instant: 0
    };
    this.options.typingSpeed = speedMap[speed] ?? 30;
  }

  destroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
