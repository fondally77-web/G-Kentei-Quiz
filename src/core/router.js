/**
 * Router - 全9章対応ルーティング
 */
import { gameState } from './state.js';

export class Router {
    constructor(routeConfig) {
        this.routes = routeConfig;
        this.currentView = null;
        this.currentRouteKey = null;
        this.viewContainer = document.querySelector('#router-view');

        // 状態変更を監視してルーティング
        gameState.subscribe((state) => {
            this.handleRoute(state);
        });
    }

    /**
     * 状態に基づいてルーティング
     * @param {Object} state 
     */
    async handleRoute(state) {
        let routeKey;

        // ビュー状態に基づいてルートキーを決定
        switch (state.currentView) {
            case 'title':
                routeKey = 'title';
                break;
            case 'chapterSelect':
                routeKey = 'chapterSelect';
                break;
            case 'quizOnly':
                routeKey = 'quizOnly';
                break;
            case 'gExam':
                routeKey = 'gExam';
                break;
            case 'chapter':
                routeKey = `chapter${state.currentChapter}`;
                break;
            default:
                routeKey = 'title';
        }

        // ルートが存在しない場合のフォールバック
        if (!this.routes[routeKey]) {
            console.warn(`Route not found for: ${routeKey}`);

            // 章ルートが未定義の場合、汎用ChapterViewを使用
            if (routeKey.startsWith('chapter') && this.routes['chapterGeneric']) {
                routeKey = 'chapterGeneric';
            } else {
                routeKey = 'title';
            }
        }

        // 同じルートへの遷移はスキップ（重複レンダリング防止）
        if (this.currentRouteKey === routeKey) {
            return;
        }
        this.currentRouteKey = routeKey;

        // 前のビューをクリーンアップ
        if (this.currentView && this.currentView.destroy) {
            this.currentView.destroy();
        }

        this.viewContainer.innerHTML = '';

        // 新しいビューをロードしてレンダリング
        const ViewClass = this.routes[routeKey];

        try {
            // 章番号を渡す必要がある場合
            if (routeKey === 'chapterGeneric') {
                this.currentView = new ViewClass(state.currentChapter);
            } else {
                this.currentView = new ViewClass();
            }

            const element = await this.currentView.render();

            if (element) {
                this.viewContainer.appendChild(element);
            }
        } catch (error) {
            console.error(`Failed to render route: ${routeKey}`, error);
            this.showError(error);
        }
    }

    /**
     * エラー表示
     * @param {Error} error 
     */
    showError(error) {
        this.viewContainer.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--color-status-error);">
                <h2>エラーが発生しました</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()">リロード</button>
            </div>
        `;
    }

    /**
     * 手動でルートを変更
     * @param {string} routeKey 
     */
    navigate(routeKey) {
        if (routeKey === 'title') {
            gameState.goToTitle();
        } else if (routeKey === 'chapterSelect') {
            gameState.goToChapterSelect();
        } else if (routeKey.startsWith('chapter')) {
            const chapterId = parseInt(routeKey.replace('chapter', ''), 10);
            if (!isNaN(chapterId)) {
                gameState.startChapter(chapterId);
            }
        }
    }

    /**
     * ルートを動的に追加
     * @param {string} key 
     * @param {Function} ViewClass 
     */
    addRoute(key, ViewClass) {
        this.routes[key] = ViewClass;
    }

    /**
     * 現在のビューを取得
     * @returns {Object|null}
     */
    getCurrentView() {
        return this.currentView;
    }
}
