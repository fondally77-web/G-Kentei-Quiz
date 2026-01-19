/**
 * TimelineGame - AI年表並べ替えミニゲーム
 * 修正版: レイアウト改善、判定ロジック修正
 */
export class TimelineGame {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.element = null;
        this.listContainer = null;
        this.events = [
            { id: 1, year: 1956, text: "ダートマス会議 (AIの誕生)" },
            { id: 2, year: 1966, text: "ELIZA (初期のチャットボット)" },
            { id: 3, year: 1997, text: "DeepBlueがチェス王者に勝利" },
            { id: 4, year: 2012, text: "AlexNetがImageNetで優勝 (DLの衝撃)" },
            { id: 5, year: 2022, text: "ChatGPT公開 (生成AIブーム)" }
        ];
        this.shuffledEvents = [];
        this.attempts = 0;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'minigame-timeline';
        this.element.style.cssText = `
            background: linear-gradient(145deg, rgba(25, 25, 40, 0.98), rgba(15, 15, 30, 0.99));
            border: 2px solid var(--color-secondary);
            border-radius: var(--border-radius-lg);
            padding: 2rem;
            max-width: 900px;
            width: 95%;
            margin: 0 auto;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 229, 255, 0.1);
        `;

        this.element.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 0.75rem;">📅</div>
                <h2 style="
                    margin: 0 0 0.75rem 0;
                    font-size: 2rem;
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary-light));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                ">ミニゲーム: AI年表並べ替え</h2>
                <p style="
                    margin: 0;
                    color: var(--color-text-muted);
                    font-size: 1.1rem;
                ">以下の出来事を<strong style="color: var(--color-secondary);">古い順（上から下）</strong>に並べ替えよう！</p>
            </div>
            
            <div id="event-list" style="
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            "></div>
            
            <div style="text-align: center;">
                <button id="btn-check" style="
                    padding: 1rem 2.5rem;
                    font-size: 1.2rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                ">🎯 判定する</button>
            </div>
            
            <div id="result-area" style="
                margin-top: 1.5rem;
                text-align: center;
                min-height: 80px;
            "></div>
        `;

        // イベントをシャッフル
        this.shuffledEvents = [...this.events].sort(() => Math.random() - 0.5);

        // リストコンテナを取得
        this.listContainer = this.element.querySelector('#event-list');
        this.renderList();

        // 判定ボタンのイベント
        const checkBtn = this.element.querySelector('#btn-check');
        checkBtn.addEventListener('click', () => {
            this.checkOrder();
        });

        return this.element;
    }

    renderList() {
        this.listContainer.innerHTML = '';

        this.shuffledEvents.forEach((ev, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.dataset.id = ev.id;
            item.dataset.index = index;
            item.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(40, 40, 60, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--border-radius-md);
                padding: 1rem 1.25rem;
                transition: all 0.2s ease;
            `;

            item.innerHTML = `
                <div style="flex: 1;">
                    <span style="
                        display: inline-block;
                        background: rgba(0, 229, 255, 0.2);
                        color: var(--color-secondary);
                        padding: 0.3rem 0.75rem;
                        border-radius: 0.25rem;
                        font-size: 1rem;
                        margin-right: 0.75rem;
                    ">???年</span>
                    <span style="color: var(--color-text-main); font-size: 1.1rem;">${ev.text}</span>
                </div>
                <div class="controls" style="display: flex; gap: 0.75rem; margin-left: 1rem;">
                    <button class="btn-up" data-index="${index}" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: var(--color-text-main);
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.2rem;
                        transition: all 0.2s;
                    ">↑</button>
                    <button class="btn-down" data-index="${index}" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: var(--color-text-main);
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.2rem;
                        transition: all 0.2s;
                    ">↓</button>
                </div>
            `;

            // ホバー効果
            item.addEventListener('mouseenter', () => {
                item.style.borderColor = 'var(--color-secondary)';
                item.style.background = 'rgba(0, 229, 255, 0.1)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                item.style.background = 'rgba(40, 40, 60, 0.8)';
            });

            // 上下移動ボタンのイベント
            const btnUp = item.querySelector('.btn-up');
            const btnDown = item.querySelector('.btn-down');

            btnUp.addEventListener('click', (e) => {
                e.stopPropagation();
                this.moveItem(index, -1);
            });

            btnDown.addEventListener('click', (e) => {
                e.stopPropagation();
                this.moveItem(index, 1);
            });

            // ボタンのホバー効果
            [btnUp, btnDown].forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    btn.style.background = 'var(--color-primary)';
                    btn.style.borderColor = 'var(--color-primary)';
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.background = 'rgba(255, 255, 255, 0.1)';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                });
            });

            this.listContainer.appendChild(item);
        });
    }

    moveItem(index, direction) {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= this.shuffledEvents.length) return;

        // スワップ
        const temp = this.shuffledEvents[index];
        this.shuffledEvents[index] = this.shuffledEvents[newIndex];
        this.shuffledEvents[newIndex] = temp;

        // 再レンダリング
        this.renderList();
    }

    checkOrder() {
        this.attempts++;

        // 現在の順序
        const currentOrder = this.shuffledEvents.map(e => e.id);

        // 正解の順序（年代順）
        const correctOrder = [...this.events]
            .sort((a, b) => a.year - b.year)
            .map(e => e.id);

        // 比較
        let correctCount = 0;
        for (let i = 0; i < currentOrder.length; i++) {
            if (currentOrder[i] === correctOrder[i]) {
                correctCount++;
            }
        }

        const isAllCorrect = correctCount === correctOrder.length;
        const resultArea = this.element.querySelector('#result-area');

        if (isAllCorrect) {
            // 正解！スコア計算（試行回数でボーナス調整）
            const baseScore = 100;
            const penalty = Math.max(0, (this.attempts - 1) * 10);
            const score = Math.max(50, baseScore - penalty);

            resultArea.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, rgba(0, 200, 83, 0.2), rgba(0, 200, 83, 0.1));
                    border: 1px solid var(--color-status-success);
                    border-radius: var(--border-radius-md);
                    padding: 1rem;
                    animation: slideUp 0.3s ease;
                ">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
                    <div style="font-size: 1.2rem; color: var(--color-status-success); font-weight: 700;">
                        正解！歴史の流れを理解しているな。
                    </div>
                    <div style="font-size: 0.9rem; color: var(--color-text-muted); margin-top: 0.5rem;">
                        スコア: ${score}点 (${this.attempts}回目の挑戦)
                    </div>
                    <button id="btn-continue" style="
                        margin-top: 1rem;
                        padding: 0.6rem 1.5rem;
                        background: linear-gradient(135deg, var(--color-status-success), #00a844);
                    ">次へ進む →</button>
                </div>
            `;

            // 正解の年を表示
            this.showCorrectYears();

            // 次へボタン
            resultArea.querySelector('#btn-continue').addEventListener('click', () => {
                if (this.onComplete) this.onComplete(score);
            });
        } else {
            resultArea.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, rgba(255, 61, 0, 0.2), rgba(255, 61, 0, 0.1));
                    border: 1px solid var(--color-status-error);
                    border-radius: var(--border-radius-md);
                    padding: 1rem;
                    animation: shake 0.3s ease;
                ">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🤔</div>
                    <div style="font-size: 1rem; color: var(--color-status-error);">
                        まだ順序が違うようだ...
                    </div>
                    <div style="font-size: 0.9rem; color: var(--color-text-muted); margin-top: 0.5rem;">
                        正解数: ${correctCount} / ${correctOrder.length}
                    </div>
                </div>
            `;

            // シェイクアニメーション
            this.addShakeAnimation();
        }
    }

    showCorrectYears() {
        const items = this.listContainer.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            const ev = this.shuffledEvents[index];
            const yearSpan = item.querySelector('span');
            yearSpan.textContent = `${ev.year}年`;
            yearSpan.style.background = 'rgba(0, 200, 83, 0.3)';
            yearSpan.style.color = 'var(--color-status-success)';
        });
    }

    addShakeAnimation() {
        if (!document.querySelector('#timeline-game-styles')) {
            const style = document.createElement('style');
            style.id = 'timeline-game-styles';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
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
