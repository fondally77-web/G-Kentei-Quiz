/**
 * Global State Management
 * 拡張版: 全9章対応、進捗管理、セーブ/ロード機能
 */
import { createAllChaptersProgress, CHAPTERS_CONFIG } from '../data/models/chapter.js';

const STORAGE_KEY = 'ai_world_adventure_save';

export class GameState {
    constructor() {
        // Initial state
        this.state = {
            // ナビゲーション状態
            currentView: 'title', // 'title' | 'chapter' | 'chapterSelect'
            currentChapter: 0, // 0: Title, 1-9: Chapters
            currentScene: 'intro',

            // 進捗データ（全9章）
            progress: createAllChaptersProgress(),

            // プレイヤープロフィール
            playerProfile: {
                name: 'Guest',
                level: 1,
                exp: 0,
                totalPlayTimeMinutes: 0
            },

            // クイズ履歴
            quizHistory: [],

            // 解放済みキーワード
            unlockedKeywords: [],

            // 設定
            settings: {
                textSpeed: 'normal', // 'slow' | 'normal' | 'fast' | 'instant'
                bgmVolume: 0.5,
                seVolume: 0.5,
                autoSave: true
            },

            // メタ情報
            meta: {
                version: '1.0.0',
                createdAt: null,
                lastPlayedAt: null
            }
        };

        this.listeners = [];

        // 起動時にセーブデータを読み込み
        this.loadFromStorage();
    }

    /**
     * 現在の状態を取得
     */
    get() {
        return this.state;
    }

    /**
     * 状態を更新してリスナーに通知
     * @param {Object} partialState 
     */
    update(partialState) {
        this.state = this.deepMerge(this.state, partialState);
        this.notify();

        // 自動セーブ
        if (this.state.settings.autoSave) {
            this.saveToStorage();
        }
    }

    /**
     * 深いマージを行う
     * @param {Object} target 
     * @param {Object} source 
     * @returns {Object}
     */
    deepMerge(target, source) {
        const result = { ...target };

        for (const key in source) {
            if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }

    /**
     * 状態変更を購読
     * @param {Function} callback 
     * @returns {Function} 購読解除関数
     */
    subscribe(callback) {
        this.listeners.push(callback);
        callback(this.state);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    /**
     * リスナーに通知
     */
    notify() {
        this.listeners.forEach(cb => cb(this.state));
    }

    // ===== Actions =====

    /**
     * 新規ゲーム開始
     */
    startNewGame() {
        this.update({
            currentView: 'chapter',
            currentChapter: 1,
            currentScene: 'prologue',
            meta: {
                ...this.state.meta,
                createdAt: new Date().toISOString(),
                lastPlayedAt: new Date().toISOString()
            }
        });
    }

    /**
     * 章を開始
     * @param {number} chapterId 
     */
    startChapter(chapterId) {
        if (chapterId < 1 || chapterId > 9) {
            console.warn(`Invalid chapter ID: ${chapterId}`);
            return;
        }

        const progress = { ...this.state.progress };
        if (progress[chapterId]) {
            progress[chapterId] = {
                ...progress[chapterId],
                started: true,
                startedAt: progress[chapterId].startedAt || new Date().toISOString()
            };
        }

        this.update({
            currentView: 'chapter',
            currentChapter: chapterId,
            currentScene: 'prologue',
            progress,
            meta: {
                ...this.state.meta,
                lastPlayedAt: new Date().toISOString()
            }
        });
    }

    /**
     * 章をクリア
     * @param {number} chapterId 
     * @param {number} quizScore 
     * @param {number} minigameScore 
     */
    completeChapter(chapterId, quizScore = 0, minigameScore = 0) {
        const progress = { ...this.state.progress };
        if (progress[chapterId]) {
            progress[chapterId] = {
                ...progress[chapterId],
                completed: true,
                quizScore,
                minigameScore,
                completedAt: new Date().toISOString()
            };
        }

        // 経験値を加算（章クリアボーナス + スコア）
        const expGained = 100 + quizScore + minigameScore;
        const newExp = this.state.playerProfile.exp + expGained;
        const newLevel = Math.floor(newExp / 500) + 1;

        this.update({
            progress,
            playerProfile: {
                ...this.state.playerProfile,
                exp: newExp,
                level: newLevel
            }
        });
    }

    /**
     * シーンを更新
     * @param {string} scene 
     */
    setScene(scene) {
        this.update({ currentScene: scene });
    }

    /**
     * タイトルに戻る
     */
    goToTitle() {
        this.update({
            currentView: 'title',
            currentChapter: 0,
            currentScene: 'intro'
        });
    }

    /**
     * 章選択画面へ
     */
    goToChapterSelect() {
        this.update({
            currentView: 'chapterSelect',
            currentChapter: 0
        });
    }

    /**
     * クイズのみモードへ
     */
    goToQuizOnlyMode() {
        this.update({
            currentView: 'quizOnly',
            currentChapter: 0,
            currentScene: 'quiz'
        });
    }

    /**
     * G検定仕様モードへ
     */
    goToGExamMode() {
        this.update({
            currentView: 'gExam',
            currentChapter: 0,
            currentScene: 'exam'
        });
    }

    /**
     * キーワードを解放
     * @param {string[]} keywords 
     */
    unlockKeywords(keywords) {
        const current = new Set(this.state.unlockedKeywords);
        keywords.forEach(k => current.add(k));
        this.update({
            unlockedKeywords: Array.from(current)
        });
    }

    /**
     * クイズ結果を保存
     * @param {Object} quizSession 
     */
    saveQuizResult(quizSession) {
        this.update({
            quizHistory: [...this.state.quizHistory, quizSession]
        });
    }

    /**
     * 設定を更新
     * @param {Object} settings 
     */
    updateSettings(settings) {
        this.update({
            settings: { ...this.state.settings, ...settings }
        });
    }

    // ===== Persistence =====

    /**
     * ローカルストレージに保存
     */
    saveToStorage() {
        try {
            const saveData = {
                ...this.state,
                meta: {
                    ...this.state.meta,
                    lastPlayedAt: new Date().toISOString()
                }
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
            console.log('Game saved successfully');
        } catch (e) {
            console.error('Failed to save game:', e);
        }
    }

    /**
     * ローカルストレージから読み込み
     * 注意: リロード時は常にタイトル画面から開始する
     */
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // マイグレーション: 古いデータ形式への対応
                this.state = this.deepMerge(this.state, parsed);

                // リロード時は常にタイトル画面から開始
                // 進捗データは保持するが、表示画面はタイトルに戻す
                this.state.currentView = 'title';
                this.state.currentChapter = 0;
                this.state.currentScene = 'intro';

                console.log('Game loaded successfully - starting from title');
            }
        } catch (e) {
            console.error('Failed to load game:', e);
        }
    }

    /**
     * セーブデータを削除して初期化
     */
    resetProgress() {
        localStorage.removeItem(STORAGE_KEY);
        this.state = {
            ...this.state,
            currentView: 'title',
            currentChapter: 0,
            currentScene: 'intro',
            progress: createAllChaptersProgress(),
            playerProfile: {
                name: 'Guest',
                level: 1,
                exp: 0,
                totalPlayTimeMinutes: 0
            },
            quizHistory: [],
            unlockedKeywords: [],
            meta: {
                version: '1.0.0',
                createdAt: null,
                lastPlayedAt: null
            }
        };
        this.notify();
    }

    // ===== Getters =====

    /**
     * 章の進捗を取得
     * @param {number} chapterId 
     * @returns {Object|null}
     */
    getChapterProgress(chapterId) {
        return this.state.progress[chapterId] || null;
    }

    /**
     * 全体の進捗率を取得
     * @returns {number} 0-100
     */
    getTotalProgressPercent() {
        const total = CHAPTERS_CONFIG.length;
        const completed = Object.values(this.state.progress).filter(p => p.completed).length;
        return Math.round((completed / total) * 100);
    }

    /**
     * 次に解放されている章を取得
     * @returns {number}
     */
    getNextAvailableChapter() {
        for (let i = 1; i <= 9; i++) {
            const progress = this.state.progress[i];
            if (!progress.completed) {
                return i;
            }
        }
        return 9; // 全章クリア済み
    }

    /**
     * セーブデータが存在するか
     * @returns {boolean}
     */
    hasSaveData() {
        return localStorage.getItem(STORAGE_KEY) !== null;
    }
}

export const gameState = new GameState();
