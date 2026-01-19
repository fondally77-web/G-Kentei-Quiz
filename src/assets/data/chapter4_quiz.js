/**
 * 第4章クイズデータ - ディープラーニング層構造
 */
export const chapter4Quiz = [
    {
        id: 'ch4_q1',
        question: '畳み込み層（Convolutional Layer）の特徴は？',
        options: [
            'すべてのニューロンが全結合',
            '局所的な領域からパターンを抽出',
            '時系列データを処理',
            '確率分布を出力'
        ],
        correctIndex: 1,
        explanation: '畳み込み層はフィルタを使って画像の局所的なパターン（エッジ、テクスチャなど）を抽出します。',
        keywords: ['畳み込み層', 'CNN', 'フィルタ', '局所パターン'],
        hint: '画像全体ではなく、小さな窓でスキャンして特徴を見つけます。'
    },
    {
        id: 'ch4_q2',
        question: 'プーリング層の主な役割は？',
        options: [
            '特徴を強調する',
            '空間解像度を下げて特徴を要約する',
            '活性化関数を適用する',
            '重みを学習する'
        ],
        correctIndex: 1,
        explanation: 'プーリング層は特徴マップのサイズを縮小し、位置ずれへの頑健性を高めます。',
        keywords: ['プーリング', 'ダウンサンプリング', '次元削減'],
        hint: '情報を圧縮しつつ、重要な特徴を保持する層です。'
    },
    {
        id: 'ch4_q3',
        question: 'Max Poolingとはどのような処理か？',
        options: [
            '領域内の平均値を取る',
            '領域内の最大値を取る',
            '領域内の最小値を取る',
            '領域内を合計する'
        ],
        correctIndex: 1,
        explanation: 'Max Poolingは各領域内の最大値を選択し、最も顕著な特徴を保持します。',
        keywords: ['Max Pooling', '最大値', 'プーリング'],
        hint: '複数の値から「一番大きい」ものを選ぶ操作です。'
    },
    {
        id: 'ch4_q4',
        question: 'バッチ正規化（Batch Normalization）の効果として正しいものは？',
        options: [
            'データ量を増やす',
            '学習を安定・高速化する',
            'パラメータ数を減らす',
            '推論速度を遅くする'
        ],
        correctIndex: 1,
        explanation: 'バッチ正規化は各層の入力を正規化し、学習を安定させ、高速化します。',
        keywords: ['バッチ正規化', 'Batch Normalization', '正規化'],
        hint: '各層の入力のばらつきを抑えることで、学習がスムーズになります。'
    },
    {
        id: 'ch4_q5',
        question: 'ResNet（残差ネットワーク）の革新的なアイデアは？',
        options: [
            '層の数を減らす',
            'スキップ結合で入力をショートカット',
            'プーリングを廃止',
            '活性化関数を変更'
        ],
        correctIndex: 1,
        explanation: 'ResNetはスキップ結合（残差結合）を導入し、100層以上の深いネットワークの学習を可能にしました。',
        keywords: ['ResNet', 'スキップ結合', '残差学習'],
        hint: '層を「飛び越える」接続を追加したことがポイントです。'
    },
    {
        id: 'ch4_q6',
        question: 'RNN（回帰型ニューラルネットワーク）が得意とするデータは？',
        options: [
            '表形式データ',
            '時系列・系列データ',
            '画像データ',
            'グラフ構造データ'
        ],
        correctIndex: 1,
        explanation: 'RNNは前の時刻の情報を次に伝えるため、テキストや音声などの系列データに適しています。',
        keywords: ['RNN', '時系列', '系列データ'],
        hint: '「順番」や「流れ」が重要なデータに向いています。'
    },
    {
        id: 'ch4_q7',
        question: 'LSTMがRNNを改良した点は？',
        options: [
            '計算を単純化した',
            '長期記憶を保持できるようにした',
            '層の数を増やした',
            'データを圧縮した'
        ],
        correctIndex: 1,
        explanation: 'LSTMはゲート機構とセル状態を導入し、長期依存関係を学習できるようにしました。',
        keywords: ['LSTM', '長期記憶', 'ゲート機構'],
        hint: 'RNNでは忘れてしまう「長い前の情報」を保持できます。'
    },
    {
        id: 'ch4_q8',
        question: 'GRUとLSTMの違いとして正しいものは？',
        options: [
            'GRUの方が層が深い',
            'GRUの方がゲート数が少なくシンプル',
            'GRUの方が精度が高い',
            'GRUは画像に特化'
        ],
        correctIndex: 1,
        explanation: 'GRUはLSTMより少ないゲート（2つ）で構成され、計算効率が良いです。',
        keywords: ['GRU', 'LSTM', 'ゲート'],
        hint: 'より軽量なLSTMの代替として開発されました。'
    },
    {
        id: 'ch4_q9',
        question: 'Attention機構の基本的な考え方は？',
        options: [
            'すべての入力を等しく扱う',
            '重要な部分に重点的に注目する',
            'ランダムに入力を選択する',
            '入力を順番に処理する'
        ],
        correctIndex: 1,
        explanation: 'Attentionは入力の各部分への「注目度」を計算し、重要な部分に重みをつけます。',
        keywords: ['Attention', '注意機構', '重み付け'],
        hint: '人間が文書を読む時に重要な部分に集中するのと似ています。'
    },
    {
        id: 'ch4_q10',
        question: 'Transformerが革命的だった理由は？',
        options: [
            'RNNを使用した',
            'Attentionのみで系列処理を実現した',
            'CNNを改良した',
            '損失関数を変更した'
        ],
        correctIndex: 1,
        explanation: 'Transformerは「Attention Is All You Need」として、RNNを使わず完全に並列化可能な構造を実現しました。',
        keywords: ['Transformer', 'Self-Attention', '並列処理'],
        hint: '逐次処理が必要だった従来手法を、並列処理可能にしました。'
    },
    {
        id: 'ch4_q11',
        question: 'Self-Attention（自己注意機構）とは？',
        options: [
            '外部データベースを参照する',
            '入力系列内の各要素間の関係を計算する',
            '出力を入力にフィードバックする',
            '重みを自動的に初期化する'
        ],
        correctIndex: 1,
        explanation: 'Self-Attentionは、同じ系列内の各要素が他の要素にどれだけ注目すべきかを計算します。',
        keywords: ['Self-Attention', '自己注意', 'Transformer'],
        hint: '文中の各単語が、他の単語とどう関連しているかを捉えます。'
    },
    {
        id: 'ch4_q12',
        question: 'オートエンコーダ（Autoencoder）の基本構造は？',
        options: [
            '入力層と出力層のみ',
            'エンコーダとデコーダ',
            '生成器と識別器',
            'エージェントと環境'
        ],
        correctIndex: 1,
        explanation: 'オートエンコーダはエンコーダで圧縮、デコーダで復元する構造で、次元削減やノイズ除去に使われます。',
        keywords: ['オートエンコーダ', 'エンコーダ', 'デコーダ'],
        hint: '「圧縮」と「展開」の2つの部分で構成されます。'
    },
    {
        id: 'ch4_q13',
        question: 'VAE（変分オートエンコーダ）の特徴は？',
        options: [
            '確定的な潜在表現を学習',
            '潜在空間を確率分布として扱う',
            '識別器と競争させる',
            '強化学習を使用する'
        ],
        correctIndex: 1,
        explanation: 'VAEは潜在空間を確率分布として扱い、生成モデルとして新しいデータを生成できます。',
        keywords: ['VAE', '変分オートエンコーダ', '潜在空間', '確率分布'],
        hint: '潜在表現に「ばらつき」を持たせることで、生成が可能になります。'
    },
    {
        id: 'ch4_q14',
        question: 'データ拡張（Data Augmentation）の目的は？',
        options: [
            'データを圧縮する',
            '訓練データの多様性を増やす',
            'テストデータを生成する',
            'ラベルを修正する'
        ],
        correctIndex: 1,
        explanation: 'データ拡張は回転・反転などで訓練データのバリエーションを増やし、汎化性能を向上させます。',
        keywords: ['データ拡張', 'Augmentation', '汎化'],
        hint: '元のデータに変換を加えて、擬似的にデータを増やします。'
    },
    {
        id: 'ch4_q15',
        question: 'ストライドとは？',
        options: [
            'フィルタのサイズ',
            'フィルタを移動させる幅',
            '出力のチャンネル数',
            'パディングの幅'
        ],
        correctIndex: 1,
        explanation: 'ストライドはフィルタを適用する際の移動幅で、大きいほど出力サイズが小さくなります。',
        keywords: ['ストライド', 'CNN', 'フィルタ'],
        hint: 'フィルタが一度に「何ピクセル動くか」を指定します。'
    },
    {
        id: 'ch4_q16',
        question: 'パディングの役割として正しいものは？',
        options: [
            '出力サイズを調整する',
            '学習を高速化する',
            '過学習を防ぐ',
            '勾配を安定させる'
        ],
        correctIndex: 0,
        explanation: 'パディングは入力画像の周囲に値（通常0）を追加し、出力サイズを制御したり端の情報を保持したりします。',
        keywords: ['パディング', 'ゼロパディング', 'CNN'],
        hint: '画像の「縁」に余白を追加する操作です。'
    }
];
