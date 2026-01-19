/**
 * Story/Scenario Data Model
 * ストーリー/シナリオのデータ構造を定義
 */

/**
 * @typedef {'dialogue' | 'narration' | 'system' | 'choice' | 'panel' | 'transition'} SceneType
 */

/**
 * @typedef {Object} DialogueLine
 * @property {SceneType} type - シーンタイプ
 * @property {string} [characterId] - 話者のキャラクターID
 * @property {string} [character] - キャラクター名（レガシー対応）
 * @property {string} text - 台詞/テキスト
 * @property {string} [emotion] - 表情・感情
 * @property {string} [effect] - 演出効果
 */

/**
 * @typedef {Object} ChoiceOption
 * @property {string} text - 選択肢のテキスト
 * @property {string} [targetSceneId] - 遷移先シーンID
 * @property {Object} [effects] - 選択による効果
 */

/**
 * @typedef {Object} ChoiceScene
 * @property {'choice'} type
 * @property {string} prompt - 選択前のプロンプト
 * @property {ChoiceOption[]} options - 選択肢
 */

/**
 * @typedef {Object} TechPanel
 * @property {'panel'} type
 * @property {string} title - パネルタイトル
 * @property {string} content - 技術説明コンテンツ（Markdown対応）
 * @property {string[]} keywords - 関連キーワード
 * @property {string} [imageUrl] - 図解画像URL
 */

/**
 * @typedef {Object} SceneTransition
 * @property {'transition'} type
 * @property {string} effect - トランジション効果 ('fade' | 'slide' | 'zoom')
 * @property {number} duration - 持続時間（ミリ秒）
 * @property {string} [text] - トランジション中テキスト
 */

/**
 * @typedef {Object} Scene
 * @property {string} id - シーンID
 * @property {string} section - セクション ('prologue' | 'main' | 'summary' | 'epilogue')
 * @property {(DialogueLine|ChoiceScene|TechPanel|SceneTransition)[]} lines - シーン内容
 * @property {string} [background] - 背景画像/色
 * @property {string} [bgm] - BGM識別子
 */

/**
 * @typedef {Object} Scenario
 * @property {number} chapterId - 章番号
 * @property {string} title - シナリオタイトル
 * @property {Scene[]} scenes - シーン配列
 */

// シーンタイプの定数
export const SCENE_TYPES = {
    DIALOGUE: 'dialogue',
    NARRATION: 'narration',
    SYSTEM: 'system',
    CHOICE: 'choice',
    PANEL: 'panel',
    TRANSITION: 'transition',
    CONCEPT: 'concept',
    INLINE_QUIZ: 'inline_quiz'  // ストーリー中のクイズ形式会話
};

// セクションタイプの定数
export const SECTION_TYPES = {
    PROLOGUE: 'prologue',
    MAIN: 'main',
    SUMMARY: 'summary',
    EPILOGUE: 'epilogue'
};

/**
 * 対話行を作成
 * @param {Partial<DialogueLine>} data 
 * @returns {DialogueLine}
 */
export function createDialogueLine(data) {
    return {
        type: data.type || SCENE_TYPES.DIALOGUE,
        characterId: data.characterId || null,
        character: data.character || null,
        text: data.text || '',
        emotion: data.emotion || 'neutral',
        effect: data.effect || null
    };
}

/**
 * 技術説明パネルを作成
 * @param {Object} data 
 * @returns {TechPanel}
 */
export function createTechPanel(data) {
    return {
        type: SCENE_TYPES.PANEL,
        title: data.title || '',
        content: data.content || '',
        keywords: data.keywords || [],
        imageUrl: data.imageUrl || null
    };
}

/**
 * 選択肢シーンを作成
 * @param {Object} data 
 * @returns {ChoiceScene}
 */
export function createChoiceScene(data) {
    return {
        type: SCENE_TYPES.CHOICE,
        prompt: data.prompt || '',
        options: data.options || []
    };
}

/**
 * シナリオを作成
 * @param {number} chapterId 
 * @param {string} title 
 * @param {Scene[]} scenes 
 * @returns {Scenario}
 */
export function createScenario(chapterId, title, scenes) {
    return {
        chapterId,
        title,
        scenes
    };
}

/**
 * シナリオをフラット化して全ライン取得
 * @param {Scenario} scenario 
 * @returns {Array}
 */
export function flattenScenario(scenario) {
    const lines = [];
    scenario.scenes.forEach(scene => {
        scene.lines.forEach(line => {
            lines.push({
                ...line,
                sceneId: scene.id,
                section: scene.section,
                background: scene.background,
                bgm: scene.bgm
            });
        });
    });
    return lines;
}

/**
 * セクションでシーンをフィルタ
 * @param {Scenario} scenario 
 * @param {string} section 
 * @returns {Scene[]}
 */
export function getScenesBySection(scenario, section) {
    return scenario.scenes.filter(scene => scene.section === section);
}
