/**
 * Quiz Data Model
 * クイズのデータ構造を定義
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} id - 問題ID
 * @property {number} chapter - 所属する章
 * @property {string} text - 問題文
 * @property {string[]} choices - 選択肢の配列
 * @property {number} correctIndex - 正解の選択肢インデックス (0-based)
 * @property {string} explanation - 解説
 * @property {string} difficulty - 難易度 ('easy' | 'medium' | 'hard')
 * @property {string[]} keywords - 関連キーワード
 * @property {string} [hint] - ヒント（オプション）
 */

/**
 * @typedef {Object} QuizResult
 * @property {string} questionId - 問題ID
 * @property {number} userAnswer - ユーザーが選択したインデックス
 * @property {boolean} correct - 正解かどうか
 * @property {number} timeSpentMs - 回答にかかった時間（ミリ秒）
 */

/**
 * @typedef {Object} QuizSession
 * @property {string} sessionId - セッションID
 * @property {number} chapterId - 章番号
 * @property {QuizResult[]} results - 各問題の結果
 * @property {number} totalScore - 合計スコア
 * @property {number} correctCount - 正解数
 * @property {number} totalQuestions - 問題数
 * @property {Date} startedAt - 開始日時
 * @property {Date} [completedAt] - 完了日時
 */

/**
 * クイズ問題を作成するファクトリ関数
 * @param {Partial<QuizQuestion>} data 
 * @returns {QuizQuestion}
 */
export function createQuizQuestion(data) {
    return {
        id: data.id || `quiz_${Date.now()}`,
        chapter: data.chapter || 1,
        text: data.text || '',
        choices: data.choices || [],
        correctIndex: data.correctIndex ?? 0,
        explanation: data.explanation || '',
        difficulty: data.difficulty || 'medium',
        keywords: data.keywords || [],
        hint: data.hint || null
    };
}

/**
 * クイズセッションを開始
 * @param {number} chapterId 
 * @returns {QuizSession}
 */
export function createQuizSession(chapterId) {
    return {
        sessionId: `session_${Date.now()}`,
        chapterId,
        results: [],
        totalScore: 0,
        correctCount: 0,
        totalQuestions: 0,
        startedAt: new Date(),
        completedAt: null
    };
}

/**
 * クイズ結果を記録
 * @param {QuizSession} session 
 * @param {QuizResult} result 
 * @returns {QuizSession}
 */
export function addQuizResult(session, result) {
    const updatedResults = [...session.results, result];
    const correctCount = updatedResults.filter(r => r.correct).length;

    return {
        ...session,
        results: updatedResults,
        correctCount,
        totalQuestions: updatedResults.length,
        // スコア計算: 正解1問あたり10ポイント
        totalScore: correctCount * 10
    };
}

/**
 * クイズセッションを完了
 * @param {QuizSession} session 
 * @returns {QuizSession}
 */
export function completeQuizSession(session) {
    return {
        ...session,
        completedAt: new Date()
    };
}

/**
 * 正解率を計算
 * @param {QuizSession} session 
 * @returns {number} 0-100のパーセンテージ
 */
export function calculateAccuracy(session) {
    if (session.totalQuestions === 0) return 0;
    return Math.round((session.correctCount / session.totalQuestions) * 100);
}

/**
 * 問題を難易度でフィルタリング
 * @param {QuizQuestion[]} questions 
 * @param {string} difficulty 
 * @returns {QuizQuestion[]}
 */
export function filterByDifficulty(questions, difficulty) {
    return questions.filter(q => q.difficulty === difficulty);
}

/**
 * 問題をシャッフル
 * @param {QuizQuestion[]} questions 
 * @returns {QuizQuestion[]}
 */
export function shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
