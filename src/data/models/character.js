/**
 * Character Data Model
 * キャラクターのデータ構造を定義
 */

/**
 * @typedef {Object} CharacterQuote
 * @property {string} text - 名言のテキスト
 * @property {string} [context] - 名言の文脈（オプション）
 */

/**
 * @typedef {Object} Character
 * @property {string} id - キャラクターID
 * @property {string} name - キャラクター名
 * @property {string} title - 二つ名
 * @property {string} emoji - キャラクターを表す絵文字
 * @property {number} chapter - 登場する章番号
 * @property {string} role - 物語での役割
 * @property {string} description - キャラクターの説明
 * @property {string[]} skills - 使用する技術/能力
 * @property {CharacterQuote[]} quotes - 名言一覧
 * @property {string} [imageUrl] - キャラクター画像URL（オプション）
 */

/**
 * キャラクターオブジェクトを作成するファクトリ関数
 * @param {Partial<Character>} data 
 * @returns {Character}
 */
export function createCharacter(data) {
    return {
        id: data.id || `char_${Date.now()}`,
        name: data.name || 'Unknown',
        title: data.title || '',
        emoji: data.emoji || '🤖',
        chapter: data.chapter || 1,
        role: data.role || '',
        description: data.description || '',
        skills: data.skills || [],
        quotes: data.quotes || [],
        imageUrl: data.imageUrl || null
    };
}

/**
 * キャラクターの名言をランダムに取得
 * @param {Character} character 
 * @returns {CharacterQuote|null}
 */
export function getRandomQuote(character) {
    if (!character.quotes || character.quotes.length === 0) return null;
    const index = Math.floor(Math.random() * character.quotes.length);
    return character.quotes[index];
}

/**
 * キャラクターをフィルタリング
 * @param {Character[]} characters 
 * @param {Object} filters 
 * @returns {Character[]}
 */
export function filterCharacters(characters, filters = {}) {
    return characters.filter(char => {
        if (filters.chapter !== undefined && char.chapter !== filters.chapter) return false;
        if (filters.role && char.role !== filters.role) return false;
        return true;
    });
}
