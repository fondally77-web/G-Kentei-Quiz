/**
 * 第5章クイズデータ - 生成AI・応用分野
 */
export const chapter5Quiz = [
    {
        id: 'ch5_q1',
        question: 'GAN（敵対的生成ネットワーク）の基本構造は？',
        options: [
            'エンコーダとデコーダ',
            '生成器と識別器',
            'エージェントと環境',
            '入力層と出力層のみ'
        ],
        correctIndex: 1,
        explanation: 'GANは生成器（Generator）と識別器（Discriminator）が競い合いながら学習します。',
        keywords: ['GAN', '生成器', '識別器', '敵対的学習'],
        hint: '「作る側」と「見破る側」が対立する構造です。'
    },
    {
        id: 'ch5_q2',
        question: '拡散モデル（Diffusion Model）の基本原理は？',
        options: [
            'データを圧縮して復元',
            'ノイズを徐々に加え、逆過程でデノイズ',
            '敵対的に学習',
            '強化学習で最適化'
        ],
        correctIndex: 1,
        explanation: '拡散モデルはノイズを徐々に加える過程を学習し、その逆過程でノイズから画像を生成します。',
        keywords: ['拡散モデル', 'Diffusion', 'デノイズ', 'Stable Diffusion'],
        hint: 'ノイズだらけの画像から、少しずつクリアな画像を復元していきます。'
    },
    {
        id: 'ch5_q3',
        question: 'BERT（Bidirectional Encoder Representations from Transformers）の特徴は？',
        options: [
            '単方向のテキスト生成',
            '双方向のコンテキスト理解',
            '画像生成に特化',
            '強化学習ベース'
        ],
        correctIndex: 1,
        explanation: 'BERTは文の前後両方向から文脈を理解する双方向モデルで、自然言語理解タスクに強いです。',
        keywords: ['BERT', '双方向', 'エンコーダ', 'マスク言語モデル'],
        hint: '文の前後両方を見て、単語の意味を理解します。'
    },
    {
        id: 'ch5_q4',
        question: 'GPTシリーズのアーキテクチャの特徴は？',
        options: [
            'エンコーダのみ',
            'デコーダのみ（自己回帰型）',
            'エンコーダ・デコーダ両方',
            'CNNベース'
        ],
        correctIndex: 1,
        explanation: 'GPTは自己回帰型デコーダのみで構成され、次の単語を予測しながらテキストを生成します。',
        keywords: ['GPT', 'デコーダ', '自己回帰', 'テキスト生成'],
        hint: '「次に来る単語を予測する」ことを繰り返して文を生成します。'
    },
    {
        id: 'ch5_q5',
        question: '物体検出（Object Detection）と画像分類の違いは？',
        options: [
            '物体検出は画像全体を1つのクラスに分類',
            '物体検出は物体の位置と種類を両方特定',
            '画像分類は回帰問題',
            '違いはない'
        ],
        correctIndex: 1,
        explanation: '画像分類は画像全体のカテゴリを予測しますが、物体検出は複数の物体の位置（バウンディングボックス）と種類を特定します。',
        keywords: ['物体検出', '画像分類', 'バウンディングボックス'],
        hint: '「何が」あるかだけでなく、「どこに」あるかも特定します。'
    },
    {
        id: 'ch5_q6',
        question: 'YOLOの特徴として正しいものは？',
        options: [
            '非常に高精度だが遅い',
            'リアルタイム物体検出が可能',
            '画像分類専用',
            'テキスト処理に特化'
        ],
        correctIndex: 1,
        explanation: 'YOLO（You Only Look Once）は画像を1回見るだけで検出を行い、リアルタイム処理が可能です。',
        keywords: ['YOLO', 'リアルタイム', '物体検出'],
        hint: '名前が「処理の速さ」を示唆しています。'
    },
    {
        id: 'ch5_q7',
        question: 'セマンティックセグメンテーションとは？',
        options: [
            '各ピクセルにクラスラベルを割り当てる',
            '物体を矩形で囲む',
            '画像全体を分類する',
            'テキストを分割する'
        ],
        correctIndex: 0,
        explanation: 'セマンティックセグメンテーションは画像の各ピクセルがどのクラスに属するかを予測します。',
        keywords: ['セマンティックセグメンテーション', 'ピクセル分類'],
        hint: '画像を「塗り分ける」イメージの処理です。'
    },
    {
        id: 'ch5_q8',
        question: '転移学習（Transfer Learning）の利点は？',
        options: [
            '計算コストが増加する',
            '少ないデータでも高精度を達成しやすい',
            '新しいモデルをゼロから作れる',
            'メモリ使用量が減る'
        ],
        correctIndex: 1,
        explanation: '転移学習は事前学習済みモデルの知識を活用し、少ないデータでも効果的に学習できます。',
        keywords: ['転移学習', '事前学習', 'ファインチューニング'],
        hint: '「すでに学んだ知識」を別の問題に活用します。'
    },
    {
        id: 'ch5_q9',
        question: 'ファインチューニングとは？',
        options: [
            '新しいモデルをゼロから学習',
            '事前学習済みモデルを特定タスクに適応',
            'ハイパーパラメータを調整',
            'データを前処理'
        ],
        correctIndex: 1,
        explanation: 'ファインチューニングは事前学習済みモデルを、新しいタスクのデータで追加学習して適応させます。',
        keywords: ['ファインチューニング', '転移学習', '追加学習'],
        hint: '大きなモデルを「微調整」して特定タスクに使います。'
    },
    {
        id: 'ch5_q10',
        question: 'LLM（大規模言語モデル）の特徴として正しいものは？',
        options: [
            '小規模なデータで学習',
            '大量のテキストデータで事前学習',
            '画像処理に特化',
            'ルールベースで動作'
        ],
        correctIndex: 1,
        explanation: 'LLMはインターネット規模の大量のテキストで事前学習し、様々な言語タスクをこなせます。',
        keywords: ['LLM', '大規模言語モデル', 'GPT', '事前学習'],
        hint: '「大規模」という名前が示す通り、データ量とモデルサイズが特徴です。'
    },
    {
        id: 'ch5_q11',
        question: 'Zero-shot Learningとは？',
        options: [
            '一切学習しない',
            '訓練時に見たことのないクラスも予測できる',
            'ゼロからモデルを作る',
            'すべてのデータを使って学習'
        ],
        correctIndex: 1,
        explanation: 'Zero-shot Learningは、訓練データに含まれていないカテゴリでも、説明文などから推論できる能力です。',
        keywords: ['Zero-shot', 'ゼロショット', '未知クラス'],
        hint: '「見たことがない」ものでも推論できる能力です。'
    },
    {
        id: 'ch5_q12',
        question: 'CLIPの革新的な点は？',
        options: [
            '高速な画像処理',
            '画像とテキストを同じ空間に埋め込む',
            '音声処理に特化',
            '強化学習を使用'
        ],
        correctIndex: 1,
        explanation: 'CLIPは画像とテキストを同じベクトル空間にマッピングし、テキストで画像を検索・分類できます。',
        keywords: ['CLIP', 'マルチモーダル', '画像テキスト'],
        hint: '画像と言葉を「共通の言語」で結びつけます。'
    },
    {
        id: 'ch5_q13',
        question: 'RLHFとは何の略か？',
        options: [
            'Reinforcement Learning from Human Feedback',
            'Recursive Learning with High Frequency',
            'Random Learning with Hidden Features',
            'Regularized Learning for Hybrid Functions'
        ],
        correctIndex: 0,
        explanation: 'RLHFは人間のフィードバックを報酬として強化学習を行い、LLMの出力を人間の好みに合わせる手法です。',
        keywords: ['RLHF', '人間のフィードバック', '強化学習', 'ChatGPT'],
        hint: 'ChatGPTなどで、人間の好みに合った応答を生成するために使われています。'
    },
    {
        id: 'ch5_q14',
        question: '音声認識でよく使われる評価指標は？',
        options: [
            '適合率',
            '単語誤り率（WER）',
            'F1スコア',
            'AUC'
        ],
        correctIndex: 1,
        explanation: 'WER（Word Error Rate）は認識結果と正解の間の単語レベルの誤りの割合を示します。',
        keywords: ['WER', '音声認識', '単語誤り率'],
        hint: '「どれだけ単語を間違えたか」を測る指標です。'
    },
    {
        id: 'ch5_q15',
        question: 'Vision Transformer（ViT）の特徴は？',
        options: [
            'CNNを改良したもの',
            '画像をパッチに分割してTransformerで処理',
            'RNNを画像に適用',
            'GANの一種'
        ],
        correctIndex: 1,
        explanation: 'ViTは画像を小さなパッチに分割し、それをTransformerへの入力として処理します。',
        keywords: ['Vision Transformer', 'ViT', 'パッチ', '画像分類'],
        hint: '画像を「単語」のように扱ってTransformerで処理します。'
    }
];
