/**
 * Chapter Data Model
 * 章のデータ構造を定義
 */

/**
 * @typedef {Object} ChapterConfig
 * @property {number} id - 章番号 (1-9)
 * @property {string} title - 章タイトル
 * @property {string} subtitle - サブタイトル
 * @property {string} themeColor - テーマカラー (CSS color)
 * @property {number} estimatedMinutes - 推定学習時間（分）
 * @property {string} description - 章の説明
 * @property {string[]} syllabus - 対応するシラバス項目
 * @property {number} quizCount - クイズ問題数
 * @property {string[]} keywords - 章で扱うキーワード
 */

/**
 * @typedef {Object} ChapterProgress
 * @property {number} chapterId - 章番号
 * @property {boolean} started - 開始済みか
 * @property {boolean} completed - 完了済みか
 * @property {number} currentSceneIndex - 現在のシーンインデックス
 * @property {number} quizScore - クイズスコア
 * @property {number} minigameScore - ミニゲームスコア
 * @property {number} timeSpentMinutes - 学習時間（分）
 * @property {string[]} unlockedKeywords - 解放されたキーワード
 * @property {Date} [startedAt] - 開始日時
 * @property {Date} [completedAt] - 完了日時
 */

// 全9章の基本設定
export const CHAPTERS_CONFIG = [
    {
        id: 1,
        title: '起源編',
        subtitle: 'AI・ML・DLの誕生',
        themeColor: '#6200ea',
        estimatedMinutes: 20,
        description: '混沌とした情報の海に、一つの意識「人工知能（AI）」が芽生える。',
        syllabus: ['人工知能の定義', '人工知能分野で議論される問題', '探索・推論', '知識表現とエキスパートシステム', '機械学習', 'ディープラーニング'],
        quizCount: 15,
        keywords: []
    },
    {
        id: 2,
        title: '学習の3兄弟',
        subtitle: '機械学習の手法',
        themeColor: '#00bcd4',
        estimatedMinutes: 25,
        description: 'MLのもとで育った三人の弟子「学習の3兄弟」が登場する。',
        syllabus: ['教師あり学習', '教師なし学習', '強化学習', 'モデルの選択・評価'],
        quizCount: 18,
        keywords: []
    },
    {
        id: 3,
        title: '天才と6人の職人',
        subtitle: 'ニューラルネットワーク要素技術',
        themeColor: '#ff5722',
        estimatedMinutes: 30,
        description: 'DLには「多層の心」という特別な力があったが、まだうまく使えなかった。',
        syllabus: ['ニューラルネットワークとディープラーニング', '活性化関数', '誤差関数', '正則化', '誤差逆伝播法', '最適化手法'],
        quizCount: 18,
        keywords: []
    },
    {
        id: 4,
        title: '深層の体を紡ぐ者たち',
        subtitle: 'ディープラーニング層構造',
        themeColor: '#4caf50',
        estimatedMinutes: 30,
        description: 'ImageNetを制覇したDLだが、まだ「体」が未完成だと感じていた。',
        syllabus: ['全結合層', '畳み込み層', '正規化層', 'プーリング層', 'スキップ結合', '回帰結合層', 'Attention', 'オートエンコーダ', 'データ拡張'],
        quizCount: 16,
        keywords: []
    },
    {
        id: 5,
        title: '応用の戦場へ',
        subtitle: 'ディープラーニング応用例',
        themeColor: '#e91e63',
        estimatedMinutes: 35,
        description: '体を完成させたDLは、いよいよ実世界の応用課題に挑む。',
        syllabus: ['画像認識', '自然言語処理', '音声処理', '深層強化学習', 'データ生成', '転移学習・ファインチューニング', 'マルチモーダル', 'モデルの解釈性', 'モデルの軽量化'],
        quizCount: 14,
        keywords: []
    },
    {
        id: 6,
        title: '実世界への架け橋',
        subtitle: 'AIプロジェクト・データ',
        themeColor: '#2196f3',
        estimatedMinutes: 25,
        description: 'DLたちがAI世界と実世界の境界に立つ。',
        syllabus: ['AIプロジェクトの進め方', 'データの収集・加工・分析・学習'],
        quizCount: 12,
        keywords: []
    },
    {
        id: 7,
        title: '数理の賢者たち',
        subtitle: '数理・統計知識',
        themeColor: '#9c27b0',
        estimatedMinutes: 25,
        description: 'DLの力を裏で支える「見えない力」としての数学。',
        syllabus: ['AIに必要な数理・統計知識'],
        quizCount: 15,
        keywords: []
    },
    {
        id: 8,
        title: '法の守護者たち',
        subtitle: '法律と契約',
        themeColor: '#795548',
        estimatedMinutes: 25,
        description: '力を持ったDLが社会で活動するための「ルール」を学ぶ。',
        syllabus: ['個人情報保護法', '著作権法', '特許法', '不正競争防止法', '独占禁止法', 'AI開発委託契約', 'AIサービス提供契約'],
        quizCount: 13,
        keywords: []
    },
    {
        id: 9,
        title: '倫理の番人たち',
        subtitle: 'AI倫理・ガバナンス',
        themeColor: '#607d8b',
        estimatedMinutes: 30,
        description: '力を持った者には、責任が伴う。倫理の番人たちがDLに問いかける。',
        syllabus: ['国内外のガイドライン', 'プライバシー', '公平性', '安全性とセキュリティ', '悪用', '透明性', '民主主義', '環境保護', '労働政策', 'その他の重要な価値', 'AIガバナンス'],
        quizCount: 15,
        keywords: []
    }
];

/**
 * 章IDから設定を取得
 * @param {number} chapterId 
 * @returns {ChapterConfig|undefined}
 */
export function getChapterConfig(chapterId) {
    return CHAPTERS_CONFIG.find(ch => ch.id === chapterId);
}

/**
 * 章の進捗データの初期値を作成
 * @param {number} chapterId 
 * @returns {ChapterProgress}
 */
export function createChapterProgress(chapterId) {
    return {
        chapterId,
        started: false,
        completed: false,
        currentSceneIndex: 0,
        quizScore: 0,
        minigameScore: 0,
        timeSpentMinutes: 0,
        unlockedKeywords: [],
        startedAt: null,
        completedAt: null
    };
}

/**
 * 全章の進捗データを初期化
 * @returns {Object<number, ChapterProgress>}
 */
export function createAllChaptersProgress() {
    const progress = {};
    CHAPTERS_CONFIG.forEach(chapter => {
        progress[chapter.id] = createChapterProgress(chapter.id);
    });
    return progress;
}
