/**
 * G検定仕様クイズデータ
 * G検定仕様の問題に挑戦モード用
 */

export const G_EXAM_QUIZ_DATA = [
    {
        id: 'ge001',
        question: 'G検定（ジェネラリスト検定）の主な目的として正しいものはどれか。',
        options: [
            { id: 'a', text: 'AIのプログラミング能力を測定する' },
            { id: 'b', text: 'ディープラーニングの理論と適用能力を持つ人材を育成する' },
            { id: 'c', text: 'データサイエンティストの資格を認定する' },
            { id: 'd', text: 'AIシステムの運用管理者を認定する' }
        ],
        correctAnswer: 'b',
        explanation: 'G検定は、ディープラーニングの基礎知識を有し、適切な活用方針を決定して事業活用する能力を持つ人材を育成することを目的としています。',
        difficulty: 'medium',
        category: 'G検定概要',
        examType: 'G検定'
    },
    {
        id: 'ge002',
        question: '次のうち、教師なし学習のアルゴリズムとして最も適切なものはどれか。',
        options: [
            { id: 'a', text: '決定木' },
            { id: 'b', text: 'サポートベクターマシン' },
            { id: 'c', text: 'k-means法' },
            { id: 'd', text: 'ランダムフォレスト' }
        ],
        correctAnswer: 'c',
        explanation: 'k-means法はクラスタリングの代表的なアルゴリズムで、ラベルなしデータをグループ化する教師なし学習手法です。',
        difficulty: 'medium',
        category: '機械学習',
        examType: 'G検定'
    },
    {
        id: 'ge003',
        question: '畳み込みニューラルネットワーク（CNN）の特徴として正しいものはどれか。',
        options: [
            { id: 'a', text: '時系列データの処理に特化している' },
            { id: 'b', text: '画像の局所的な特徴を効率的に抽出できる' },
            { id: 'c', text: '自然言語処理に最も適している' },
            { id: 'd', text: '強化学習のみで使用される' }
        ],
        correctAnswer: 'b',
        explanation: 'CNNは畳み込み層を使用して画像の局所的なパターン（エッジ、テクスチャなど）を効率的に検出し、画像認識タスクで高い性能を発揮します。',
        difficulty: 'medium',
        category: '深層学習',
        examType: 'G検定'
    },
    {
        id: 'ge004',
        question: 'AIの倫理的問題として、アルゴリズムの学習データに含まれる偏りが結果に反映されることを何というか。',
        options: [
            { id: 'a', text: 'オーバーフィッティング' },
            { id: 'b', text: 'アンダーフィッティング' },
            { id: 'c', text: 'バイアス' },
            { id: 'd', text: 'バリアンス' }
        ],
        correctAnswer: 'c',
        explanation: 'バイアス（偏見）は、学習データの偏りがモデルの予測結果に反映される問題です。例えば、採用AIが過去の男性優位の採用データから学習し、女性を不利に評価するケースがあります。',
        difficulty: 'hard',
        category: 'AI倫理',
        examType: 'G検定'
    },
    {
        id: 'ge005',
        question: 'Transformerアーキテクチャで導入された重要な機構として正しいものはどれか。',
        options: [
            { id: 'a', text: '畳み込み層' },
            { id: 'b', text: 'プーリング層' },
            { id: 'c', text: 'Self-Attention機構' },
            { id: 'd', text: '再帰構造' }
        ],
        correctAnswer: 'c',
        explanation: 'Transformerの核心技術はSelf-Attention機構で、入力系列の各要素間の関係性を直接モデル化することで、長距離依存関係を効率的に学習できます。',
        difficulty: 'hard',
        category: '深層学習',
        examType: 'G検定'
    },
    {
        id: 'ge006',
        question: '日本におけるAI利活用の法規制に関して、2022年に施行された法律はどれか。',
        options: [
            { id: 'a', text: '個人情報保護法の改正' },
            { id: 'b', text: 'AI規制法' },
            { id: 'c', text: '電子計算機使用詐欺罪' },
            { id: 'd', text: 'AI基本法' }
        ],
        correctAnswer: 'a',
        explanation: '2022年4月に改正個人情報保護法が施行され、個人データの取り扱いに関するルールが強化されました。AIにおける個人データの利用にも影響を与えています。',
        difficulty: 'hard',
        category: 'AI法規制',
        examType: 'G検定'
    }
];

/**
 * G検定の試験形式設定
 */
export const G_EXAM_CONFIG = {
    timeLimit: 120, // 分
    totalQuestions: 200, // 本番は約200問
    passingScore: 0.6, // 60%以上で合格
    categories: [
        { id: 'ai_definition', name: '人工知能とは', weight: 0.1 },
        { id: 'ml_basics', name: '機械学習の基礎', weight: 0.2 },
        { id: 'dl_basics', name: '深層学習の基礎', weight: 0.25 },
        { id: 'dl_applications', name: '深層学習の応用', weight: 0.2 },
        { id: 'ai_society', name: 'AIと社会', weight: 0.15 },
        { id: 'math_basics', name: '数理・統計基礎', weight: 0.1 }
    ]
};

/**
 * 模試モード設定
 */
export const PRACTICE_EXAM_CONFIG = {
    shortExam: {
        name: 'ショート模試',
        questions: 30,
        timeLimit: 20,
        description: '約20分で解ける短縮版模試'
    },
    fullExam: {
        name: 'フル模試',
        questions: 100,
        timeLimit: 60,
        description: 'G検定本番の半分程度の問題数'
    }
};
