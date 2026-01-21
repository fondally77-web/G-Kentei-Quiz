/**
 * キャラクターデータ定義
 * ストーリーに登場するキャラクターの情報
 */

// キャラクター画像のインポート
// 主要キャラクター
import aiImage from '../assets/images/characters/AI.jpg';
import mlImage from '../assets/images/characters/ML.jpg';
import dlImage from '../assets/images/characters/DL.jpg';

// 学習の三兄弟（第2章）
import supervisedImage from '../assets/images/characters/教師あり学習.jpg';
import unsupervisedImage from '../assets/images/characters/教師なし学習.jpg';
import reinforcementImage from '../assets/images/characters/強化学習.jpg';

// ニューラルネットワーク要素（第3章）
import neuronImage from '../assets/images/characters/ニューロン.jpg';
import activationImage from '../assets/images/characters/活性化関数.jpg';
import lossImage from '../assets/images/characters/誤差関数.jpg';
import backpropImage from '../assets/images/characters/誤差逆伝播法.jpg';
import optimizerImage from '../assets/images/characters/最適化手法.jpg';
import regularizationImage from '../assets/images/characters/正則化.jpg';

// アーキテクチャ（第4-5章）
import cnnImage from '../assets/images/characters/CNN.jpg';
import rnnImage from '../assets/images/characters/RNN.jpg';
import transformerImage from '../assets/images/characters/TRANSFORMER.jpg';
import ganImage from '../assets/images/characters/GAN.jpg';
import diffusionImage from '../assets/images/characters/DIFFUSION.jpg';
import nerfImage from '../assets/images/characters/NeRF.jpg';

// データ/プロジェクト（第6章）
import dataScientistImage from '../assets/images/characters/Data Scientist.jpg';
import crispDmImage from '../assets/images/characters/CRISP-DM.jpg';
import mlopsImage from '../assets/images/characters/MLOps.jpg';
import dataLeakageImage from '../assets/images/characters/Data Leakage.jpg';
import metricsImage from '../assets/images/characters/メトリクス.jpg';

// 数理・統計（第7章）
import statsImage from '../assets/images/characters/スタッツ.jpg';
import probabilityImage from '../assets/images/characters/プロバビリタス.jpg';
import correlationImage from '../assets/images/characters/コレラティオ.jpg';

// 法律（第8章）
import confidentialityImage from '../assets/images/characters/守秘の聖騎士.jpg';
import contractImage from '../assets/images/characters/約束の封印師.jpg';
import fairTradeImage from '../assets/images/characters/公正の裁定者.jpg';
import copyrightImage from '../assets/images/characters/創造の三女神.jpg';

// 倫理（第9章）
import ethicsImage from '../assets/images/characters/エシカ.jpg';
import fairnessImage from '../assets/images/characters/フェアネス.jpg';
import securityImage from '../assets/images/characters/セキュリタス.jpg';
import transparencyImage from '../assets/images/characters/ルーチェ.jpg';
import governanceImage from '../assets/images/characters/ガヴァナー.jpg';

/**
 * キャラクター定義
 */
export const CHARACTERS = {
    // ===== 主要キャラクター =====
    'AI (人工知能)': {
        id: 'ai',
        name: 'AI',
        fullName: '人工知能',
        description: '1956年ダートマス会議で生まれた主人公',
        image: aiImage,
        color: '#6200ea',
        emoji: '🌌'
    },
    'ML (機械学習)': {
        id: 'ml',
        name: 'ML',
        fullName: '機械学習',
        description: 'データから学ぶ賢者、DLの師匠',
        image: mlImage,
        color: '#00bcd4',
        emoji: '🎓'
    },
    'DL (ディープラーニング)': {
        id: 'dl',
        name: 'DL',
        fullName: 'ディープラーニング',
        description: '深淵を見る者、最強の弟子',
        image: dlImage,
        color: '#9c27b0',
        emoji: '⚡'
    },

    // ===== 学習の三兄弟（第2章）=====
    '教師あり学習': {
        id: 'supervised',
        name: '教師あり学習',
        fullName: 'Supervised Learning',
        description: '几帳面で責任感の強い真面目な長男',
        image: supervisedImage,
        color: '#4caf50',
        emoji: '📚'
    },
    '教師なし学習': {
        id: 'unsupervised',
        name: '教師なし学習',
        fullName: 'Unsupervised Learning',
        description: '自由奔放な次男、「正解? そんなの自分で見つけるさ!」',
        image: unsupervisedImage,
        color: '#2196f3',
        emoji: '🎨'
    },
    '強化学習': {
        id: 'reinforcement',
        name: '強化学習',
        fullName: 'Reinforcement Learning',
        description: '失敗を恐れない三男、「失敗は報酬への道標」',
        image: reinforcementImage,
        color: '#ff9800',
        emoji: '🎮'
    },

    // ===== ニューラルネットワーク要素（第3章）=====
    'ニューロン': {
        id: 'neuron',
        name: 'ニューロン',
        fullName: 'Neuron',
        description: 'ニューラルネットワークの基本単位',
        image: neuronImage,
        color: '#e91e63',
        emoji: '🧠'
    },
    '活性化関数': {
        id: 'activation',
        name: '活性化関数',
        fullName: 'Activation Function',
        description: '「0か1かではない。グラデーションこそ知性の証」',
        image: activationImage,
        color: '#ff5722',
        emoji: '😊'
    },
    '誤差関数': {
        id: 'loss',
        name: '誤差関数',
        fullName: 'Loss Function',
        description: '「厳しさは愛の裏返し」目標との距離を測る',
        image: lossImage,
        color: '#f44336',
        emoji: '🎯'
    },
    '誤差逆伝播法': {
        id: 'backprop',
        name: '誤差逆伝播法',
        fullName: 'Backpropagation',
        description: '「過去を达ることで未来が開ける」',
        image: backpropImage,
        color: '#9c27b0',
        emoji: '⏪'
    },
    '最適化手法': {
        id: 'optimizer',
        name: '最適化手法',
        fullName: 'Optimizer',
        description: '「一歩ずつ、でも確実に最善の道を」',
        image: optimizerImage,
        color: '#673ab7',
        emoji: '🧭'
    },
    '正則化': {
        id: 'regularization',
        name: '正則化',
        fullName: 'Regularization',
        description: '過学習を防ぐ守護者',
        image: regularizationImage,
        color: '#3f51b5',
        emoji: '🛡️'
    },

    // ===== アーキテクチャ（第4-5章）=====
    'CNN': {
        id: 'cnn',
        name: 'CNN',
        fullName: '畳み込みニューラルネットワーク',
        description: '「俺の目はピクセルの向こうの真実を見抜く」',
        image: cnnImage,
        color: '#009688',
        emoji: '👁️'
    },
    '畳み込み層': {
        id: 'conv',
        name: '畳み込み層',
        fullName: 'Convolutional Layer',
        description: 'フィルタで局所特徴を抽出',
        image: cnnImage,
        color: '#009688',
        emoji: '👁️'
    },
    'RNN': {
        id: 'rnn',
        name: 'RNN',
        fullName: '回帰型ニューラルネットワーク',
        description: '「覆えていたいのに...記憶が薄れていく」',
        image: rnnImage,
        color: '#795548',
        emoji: '🔄'
    },
    '回帰結合層': {
        id: 'recurrent',
        name: '回帰結合層',
        fullName: 'Recurrent Layer',
        description: '過去を記憶する者',
        image: rnnImage,
        color: '#795548',
        emoji: '🔄'
    },
    'Transformer': {
        id: 'transformer',
        name: 'Transformer',
        fullName: 'Transformer',
        description: '「必要なのはAttentionだけだ」革命児',
        image: transformerImage,
        color: '#607d8b',
        emoji: '✨'
    },
    'Attention': {
        id: 'attention',
        name: 'Attention',
        fullName: 'Attention Mechanism',
        description: '集中力の化身',
        image: transformerImage,
        color: '#607d8b',
        emoji: '✨'
    },
    'GAN': {
        id: 'gan',
        name: 'GAN',
        fullName: '敵対的生成ネットワーク',
        description: '創造の芸術家',
        image: ganImage,
        color: '#e91e63',
        emoji: '🎨'
    },
    '生成AI': {
        id: 'generative',
        name: '生成AI',
        fullName: 'Generative AI',
        description: '新しいデータを創り出す',
        image: ganImage,
        color: '#e91e63',
        emoji: '🎨'
    },
    '拡散モデル': {
        id: 'diffusion',
        name: '拡散モデル',
        fullName: 'Diffusion Model',
        description: 'ノイズから画像を生成',
        image: diffusionImage,
        color: '#9c27b0',
        emoji: '🌫️'
    },
    'NeRF': {
        id: 'nerf',
        name: 'NeRF',
        fullName: 'Neural Radiance Fields',
        description: '3Dシーンの新規視点生成',
        image: nerfImage,
        color: '#00bcd4',
        emoji: '🌐'
    },

    // ===== データ/プロジェクト（第6章）=====
    'データサイエンティスト': {
        id: 'datascientist',
        name: 'データサイエンティスト',
        fullName: 'Data Scientist',
        description: 'データを分析しモデルを構築',
        image: dataScientistImage,
        color: '#2196f3',
        emoji: '👨‍🔬'
    },
    'CRISP-DM': {
        id: 'crispdm',
        name: 'CRISP-DM',
        fullName: 'CRISP-DM',
        description: 'プロジェクトのフレームワーク',
        image: crispDmImage,
        color: '#4caf50',
        emoji: '📋'
    },
    'プロジェクトマネージャー': {
        id: 'pm',
        name: 'プロジェクトマネージャー',
        fullName: 'Project Manager',
        description: 'AIプロジェクトを成功に導く',
        image: crispDmImage,
        color: '#4caf50',
        emoji: '📋'
    },
    'MLOps': {
        id: 'mlops',
        name: 'MLOps',
        fullName: 'MLOps',
        description: '機械学習の運用基盤',
        image: mlopsImage,
        color: '#ff9800',
        emoji: '⚙️'
    },
    'MLOpsエンジニア': {
        id: 'mlopseng',
        name: 'MLOpsエンジニア',
        fullName: 'MLOps Engineer',
        description: 'ML運用基盤を構築',
        image: mlopsImage,
        color: '#ff9800',
        emoji: '⚙️'
    },
    'データリーケージ': {
        id: 'dataleakage',
        name: 'データリーケージ',
        fullName: 'Data Leakage',
        description: '未来の情報が訓練に混入',
        image: dataLeakageImage,
        color: '#f44336',
        emoji: '💧'
    },
    'メトリクス': {
        id: 'metrics',
        name: 'メトリクス',
        fullName: 'Evaluation Metrics',
        description: '評価指標の専門家',
        image: metricsImage,
        color: '#9c27b0',
        emoji: '📊'
    },

    // ===== 数理・統計（第7章）=====
    'スタッツ': {
        id: 'stats',
        name: 'スタッツ',
        fullName: 'Statistics',
        description: '統計学の賢者',
        image: statsImage,
        color: '#3f51b5',
        emoji: '📈'
    },
    '確率の賢者': {
        id: 'probability',
        name: 'プロバビリタス',
        fullName: 'Probability',
        description: '確率・統計の賢者',
        image: probabilityImage,
        color: '#673ab7',
        emoji: '🎲'
    },
    'コレラティオ': {
        id: 'correlation',
        name: 'コレラティオ',
        fullName: 'Correlation',
        description: '相関関係の専門家',
        image: correlationImage,
        color: '#009688',
        emoji: '🔗'
    },
    '線形代数の賢者': {
        id: 'linear',
        name: '線形代数の賢者',
        fullName: 'Linear Algebra',
        description: 'ベクトルと行列を操る',
        image: statsImage,
        color: '#3f51b5',
        emoji: '📐'
    },
    '微積分の賢者': {
        id: 'calculus',
        name: '微積分の賢者',
        fullName: 'Calculus',
        description: '変化を捉える力',
        image: probabilityImage,
        color: '#673ab7',
        emoji: '∫'
    },
    '情報理論の賢者': {
        id: 'information',
        name: '情報理論の賢者',
        fullName: 'Information Theory',
        description: '情報の量と質を測る',
        image: correlationImage,
        color: '#009688',
        emoji: '📡'
    },

    // ===== 法律（第8章）=====
    '守秘の聖騎士': {
        id: 'confidentiality',
        name: '守秘の聖騎士',
        fullName: 'Confidentiality',
        description: '営業秘密を守る聖騎士',
        image: confidentialityImage,
        color: '#795548',
        emoji: '🛡️'
    },
    '個人情報保護法の番人': {
        id: 'privacy',
        name: '個人情報保護法の番人',
        fullName: 'Privacy Law',
        description: 'プライバシーを守る',
        image: confidentialityImage,
        color: '#795548',
        emoji: '🔒'
    },
    '約束の封印師': {
        id: 'contract',
        name: '約束の封印師',
        fullName: 'Contract',
        description: '契約を封印する者',
        image: contractImage,
        color: '#607d8b',
        emoji: '📜'
    },
    '契約の番人': {
        id: 'contractguard',
        name: '契約の番人',
        fullName: 'Contract Guardian',
        description: '権利義務を明確にする',
        image: contractImage,
        color: '#607d8b',
        emoji: '📜'
    },
    '公正の裁定者': {
        id: 'fairtrade',
        name: '公正の裁定者',
        fullName: 'Fair Trade',
        description: '公正取引を守る裁定者',
        image: fairTradeImage,
        color: '#4caf50',
        emoji: '⚖️'
    },
    '創造の三女神': {
        id: 'copyright',
        name: '創造の三女神',
        fullName: 'Copyright',
        description: '著作権を守る三女神',
        image: copyrightImage,
        color: '#e91e63',
        emoji: '©️'
    },
    '著作権法の番人': {
        id: 'copyrightguard',
        name: '著作権法の番人',
        fullName: 'Copyright Guardian',
        description: '創作物の権利を守る',
        image: copyrightImage,
        color: '#e91e63',
        emoji: '©️'
    },
    '特許法の番人': {
        id: 'patent',
        name: '特許法の番人',
        fullName: 'Patent Guardian',
        description: '発明を保護する',
        image: fairTradeImage,
        color: '#4caf50',
        emoji: '🔬'
    },
    '不正競争防止法の番人': {
        id: 'unfaircomp',
        name: '不正競争防止法の番人',
        fullName: 'Unfair Competition Law',
        description: '営業秘密とデータを守る',
        image: confidentialityImage,
        color: '#795548',
        emoji: '🛡️'
    },

    // ===== 倫理（第9章）=====
    'エシカ': {
        id: 'ethics',
        name: 'エシカ',
        fullName: 'Ethics',
        description: 'AI倫理の番人',
        image: ethicsImage,
        color: '#9c27b0',
        emoji: '⚖️'
    },
    '倫理の番人': {
        id: 'ethicsguard',
        name: '倫理の番人',
        fullName: 'Ethics Guardian',
        description: 'AIの倫理を問う',
        image: ethicsImage,
        color: '#9c27b0',
        emoji: '⚖️'
    },
    'フェアネス': {
        id: 'fairness',
        name: 'フェアネス',
        fullName: 'Fairness',
        description: '公平性の番人',
        image: fairnessImage,
        color: '#4caf50',
        emoji: '⚖️'
    },
    '公平性の番人': {
        id: 'fairnessguard',
        name: '公平性の番人',
        fullName: 'Fairness Guardian',
        description: 'AIが差別をしないよう監視',
        image: fairnessImage,
        color: '#4caf50',
        emoji: '⚖️'
    },
    'セキュリタス': {
        id: 'security',
        name: 'セキュリタス',
        fullName: 'Security',
        description: '安全性・セキュリティの番人',
        image: securityImage,
        color: '#f44336',
        emoji: '🔐'
    },
    '安全性の番人': {
        id: 'securityguard',
        name: '安全性の番人',
        fullName: 'Security Guardian',
        description: 'AIが害を及ぼさないよう監視',
        image: securityImage,
        color: '#f44336',
        emoji: '🔐'
    },
    'ルーチェ': {
        id: 'transparency',
        name: 'ルーチェ',
        fullName: 'Transparency',
        description: '透明性の番人',
        image: transparencyImage,
        color: '#00bcd4',
        emoji: '💡'
    },
    '透明性の番人': {
        id: 'transparencyguard',
        name: '透明性の番人',
        fullName: 'Transparency Guardian',
        description: 'AIの判断理由を明らかに',
        image: transparencyImage,
        color: '#00bcd4',
        emoji: '💡'
    },
    'ガヴァナー': {
        id: 'governance',
        name: 'ガヴァナー',
        fullName: 'Governance',
        description: 'AIガバナンスの番人',
        image: governanceImage,
        color: '#607d8b',
        emoji: '🏛️'
    },
    'ガバナンスの番人': {
        id: 'governanceguard',
        name: 'ガバナンスの番人',
        fullName: 'Governance Guardian',
        description: 'AIを適切に管理するルール',
        image: governanceImage,
        color: '#607d8b',
        emoji: '🏛️'
    },

    // ===== その他 =====
    'ナレーター': {
        id: 'narrator',
        name: 'ナレーター',
        fullName: 'Narrator',
        description: '物語の語り手',
        image: null,
        color: '#78909c',
        emoji: '📖'
    },
    '？？？': {
        id: 'unknown',
        name: '？？？',
        fullName: 'Unknown',
        description: '謎の存在',
        image: null,
        color: '#37474f',
        emoji: '❓'
    }
};

/**
 * キャラクター名からデータを取得
 * @param {string} characterName 
 * @returns {Object|null}
 */
export function getCharacter(characterName) {
    return CHARACTERS[characterName] || null;
}

/**
 * キャラクターIDからデータを取得
 * @param {string} characterId 
 * @returns {Object|null}
 */
export function getCharacterById(characterId) {
    return Object.values(CHARACTERS).find(c => c.id === characterId) || null;
}

/**
 * キャラクターの表示情報を取得（画像またはemoji）
 * @param {string} characterName 
 * @returns {Object}
 */
export function getCharacterDisplay(characterName) {
    const char = getCharacter(characterName);
    if (!char) {
        return { type: 'emoji', value: '💬', color: '#78909c', name: characterName };
    }

    if (char.image) {
        return { type: 'image', value: char.image, color: char.color, name: char.name };
    }

    return { type: 'emoji', value: char.emoji, color: char.color, name: char.name };
}

/**
 * 章ごとのキャラクター一覧を取得
 * @param {number} chapterId 
 * @returns {Array}
 */
export function getChapterCharacters(chapterId) {
    const chapterCharacterIds = {
        1: ['ai', 'ml', 'dl'],
        2: ['ai', 'ml', 'supervised', 'unsupervised', 'reinforcement'],
        3: ['ai', 'dl', 'neuron', 'activation', 'loss', 'backprop', 'optimizer', 'regularization'],
        4: ['ai', 'dl', 'cnn', 'rnn', 'transformer', 'attention'],
        5: ['ai', 'dl', 'gan', 'diffusion', 'nerf'],
        6: ['ai', 'dl', 'datascientist', 'crispdm', 'mlops', 'dataleakage', 'metrics'],
        7: ['ai', 'dl', 'stats', 'probability', 'correlation'],
        8: ['ai', 'dl', 'confidentiality', 'contract', 'fairtrade', 'copyright'],
        9: ['ai', 'dl', 'ethics', 'fairness', 'security', 'transparency', 'governance']
    };

    const ids = chapterCharacterIds[chapterId] || [];
    return ids.map(id => getCharacterById(id)).filter(c => c !== null);
}
