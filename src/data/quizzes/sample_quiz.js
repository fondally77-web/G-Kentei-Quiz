/**
 * サンプルクイズデータ
 * クイズのみ挑戦モード用
 */

export const SAMPLE_QUIZ_DATA = [
    {
        id: 'sq001',
        question: '人工知能（AI）の研究が本格的に始まったのは何年頃ですか？',
        options: [
            { id: 'a', text: '1936年' },
            { id: 'b', text: '1956年' },
            { id: 'c', text: '1976年' },
            { id: 'd', text: '1996年' }
        ],
        correctAnswer: 'b',
        explanation: '1956年のダートマス会議で「人工知能」という言葉が初めて使われ、AI研究が正式に始まりました。',
        difficulty: 'easy',
        category: 'AI歴史'
    },
    {
        id: 'sq002',
        question: '機械学習、深層学習、人工知能の関係として正しいものはどれですか？',
        options: [
            { id: 'a', text: '機械学習 ⊃ 深層学習 ⊃ 人工知能' },
            { id: 'b', text: '深層学習 ⊃ 機械学習 ⊃ 人工知能' },
            { id: 'c', text: '人工知能 ⊃ 機械学習 ⊃ 深層学習' },
            { id: 'd', text: '人工知能 ⊃ 深層学習 ⊃ 機械学習' }
        ],
        correctAnswer: 'c',
        explanation: '人工知能が最も広い概念で、その中に機械学習があり、さらにその中に深層学習があります。',
        difficulty: 'easy',
        category: 'AI基礎'
    },
    {
        id: 'sq003',
        question: '教師あり学習の例として最も適切なものはどれですか？',
        options: [
            { id: 'a', text: '顧客をグループに分類する' },
            { id: 'b', text: 'ゲームの最適な戦略を見つける' },
            { id: 'c', text: 'スパムメールを判別する' },
            { id: 'd', text: '異常なデータを検出する' }
        ],
        correctAnswer: 'c',
        explanation: '教師あり学習はラベル付きデータを使って学習します。スパムか否かというラベルを使ってメールを分類する問題が典型例です。',
        difficulty: 'medium',
        category: '機械学習'
    },
    {
        id: 'sq004',
        question: 'ディープラーニングで使われる「層」とは何を指しますか？',
        options: [
            { id: 'a', text: 'データを保存するメモリの階層' },
            { id: 'b', text: 'ニューラルネットワークのニューロン層' },
            { id: 'c', text: 'プログラムの実行順序' },
            { id: 'd', text: 'コンピュータのハードウェア構成' }
        ],
        correctAnswer: 'b',
        explanation: 'ディープラーニングでは、入力層、隠れ層（複数）、出力層というニューロンの層構造を持つニューラルネットワークを使います。',
        difficulty: 'medium',
        category: '深層学習'
    },
    {
        id: 'sq005',
        question: '過学習（オーバーフィッティング）とは何ですか？',
        options: [
            { id: 'a', text: '学習に時間がかかりすぎること' },
            { id: 'b', text: 'モデルが訓練データに特化しすぎて汎化性能が低下すること' },
            { id: 'c', text: 'モデルが全く学習できないこと' },
            { id: 'd', text: 'データが多すぎて処理できないこと' }
        ],
        correctAnswer: 'b',
        explanation: '過学習は、モデルが訓練データを「暗記」してしまい、未知のデータに対する予測精度が下がる問題です。',
        difficulty: 'medium',
        category: '機械学習'
    }
];

/**
 * クイズカテゴリ一覧
 */
export const QUIZ_CATEGORIES = [
    { id: 'history', name: 'AI歴史', icon: '📜' },
    { id: 'basics', name: 'AI基礎', icon: '🌱' },
    { id: 'ml', name: '機械学習', icon: '🎓' },
    { id: 'dl', name: '深層学習', icon: '⚡' }
];

/**
 * 難易度設定
 */
export const DIFFICULTY_LEVELS = [
    { id: 'easy', name: '初級', color: '#4caf50' },
    { id: 'medium', name: '中級', color: '#ff9800' },
    { id: 'hard', name: '上級', color: '#f44336' }
];
