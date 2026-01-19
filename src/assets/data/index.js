/**
 * 全章のシナリオとクイズデータをエクスポート
 */

// シナリオデータ
export { chapter1Scenario } from './chapter1_scenario.js';
export { chapter2Scenario } from './chapter2_scenario.js';
export { chapter3Scenario } from './chapter3_scenario.js';
export { chapter4Scenario } from './chapter4_scenario.js';
export { chapter5Scenario } from './chapter5_scenario.js';
export { chapter6Scenario } from './chapter6_scenario.js';
export { chapter7Scenario } from './chapter7_scenario.js';
export { chapter8Scenario } from './chapter8_scenario.js';
export { chapter9Scenario } from './chapter9_scenario.js';

// クイズデータ
export { chapter1Quiz } from './chapter1_quiz.js';
export { chapter2Quiz } from './chapter2_quiz.js';
export { chapter3Quiz } from './chapter3_quiz.js';
export { chapter4Quiz } from './chapter4_quiz.js';
export { chapter5Quiz } from './chapter5_quiz.js';
export { chapter6Quiz } from './chapter6_quiz.js';
export { chapter7Quiz } from './chapter7_quiz.js';
export { chapter8Quiz } from './chapter8_quiz.js';
export { chapter9Quiz } from './chapter9_quiz.js';

/**
 * 章別にデータを取得するヘルパー関数
 */
import { chapter1Scenario } from './chapter1_scenario.js';
import { chapter2Scenario } from './chapter2_scenario.js';
import { chapter3Scenario } from './chapter3_scenario.js';
import { chapter4Scenario } from './chapter4_scenario.js';
import { chapter5Scenario } from './chapter5_scenario.js';
import { chapter6Scenario } from './chapter6_scenario.js';
import { chapter7Scenario } from './chapter7_scenario.js';
import { chapter8Scenario } from './chapter8_scenario.js';
import { chapter9Scenario } from './chapter9_scenario.js';

import { chapter1Quiz } from './chapter1_quiz.js';
import { chapter2Quiz } from './chapter2_quiz.js';
import { chapter3Quiz } from './chapter3_quiz.js';
import { chapter4Quiz } from './chapter4_quiz.js';
import { chapter5Quiz } from './chapter5_quiz.js';
import { chapter6Quiz } from './chapter6_quiz.js';
import { chapter7Quiz } from './chapter7_quiz.js';
import { chapter8Quiz } from './chapter8_quiz.js';
import { chapter9Quiz } from './chapter9_quiz.js';

const scenarios = {
    1: chapter1Scenario,
    2: chapter2Scenario,
    3: chapter3Scenario,
    4: chapter4Scenario,
    5: chapter5Scenario,
    6: chapter6Scenario,
    7: chapter7Scenario,
    8: chapter8Scenario,
    9: chapter9Scenario
};

const quizzes = {
    1: chapter1Quiz,
    2: chapter2Quiz,
    3: chapter3Quiz,
    4: chapter4Quiz,
    5: chapter5Quiz,
    6: chapter6Quiz,
    7: chapter7Quiz,
    8: chapter8Quiz,
    9: chapter9Quiz
};

/**
 * 章番号からシナリオデータを取得
 * @param {number} chapterId 
 * @returns {Array}
 */
export function getScenarioByChapter(chapterId) {
    return scenarios[chapterId] || [];
}

/**
 * 章番号からクイズデータを取得
 * @param {number} chapterId 
 * @returns {Array}
 */
export function getQuizByChapter(chapterId) {
    return quizzes[chapterId] || [];
}

/**
 * 全シナリオのセリフ数を取得
 * @returns {Object}
 */
export function getScenarioStats() {
    const stats = {};
    for (const [id, scenario] of Object.entries(scenarios)) {
        stats[id] = scenario.length;
    }
    stats.total = Object.values(stats).reduce((a, b) => a + b, 0);
    return stats;
}

/**
 * 全クイズの問題数を取得
 * @returns {Object}
 */
export function getQuizStats() {
    const stats = {};
    for (const [id, quiz] of Object.entries(quizzes)) {
        stats[id] = quiz.length;
    }
    stats.total = Object.values(stats).reduce((a, b) => a + b, 0);
    return stats;
}
