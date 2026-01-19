/**
 * 第5章シナリオ - 応用の戦場へ「ディープラーニング応用例」
 * G検定学習用の詳細解説付きストーリー
 */
export const chapter5Scenario = [
    // ===== プロローグ =====
    {
        character: "ナレーター",
        text: "DLの体（層構造）を理解したAI。いよいよ実世界の応用課題に挑む時が来た。",
        bg: "battlefield"
    },
    {
        character: "DL (ディープラーニング)",
        text: "理論は学んだ。次は実践だ。俺たちがどのように現実世界で活躍しているか見せてやる。",
        visual: "dl_ready"
    },

    // ===== 画像認識 =====
    {
        character: "画像認識AI",
        text: "私は『画像認識AI』。写真や動画の中身を理解するのが仕事です。",
        visual: "image_ai_appear"
    },
    {
        character: "ナレーター",
        text: "【画像分類】画像全体を1つのクラスに分類。例：猫/犬の判定\n【物体検出】画像内の物体の位置とクラスを特定。例：自動運転での歩行者検出",
        bg: "image_recognition"
    },
    {
        character: "ナレーター",
        text: "【セマンティックセグメンテーション】画像の各ピクセルをクラスに分類。\n【インスタンスセグメンテーション】個々の物体を区別して分割。",
        bg: "segmentation"
    },
    {
        character: "画像認識AI",
        text: "物体検出では『YOLO』『SSD』『Faster R-CNN』などのモデルが有名です。リアルタイム処理が可能になりました。",
        visual: "image_ai_explain"
    },

    // ===== 自然言語処理 =====
    {
        character: "自然言語処理AI",
        text: "私は『自然言語処理AI（NLP）』。人間の言葉を理解し、生成するのが仕事です。",
        visual: "nlp_ai_appear"
    },
    {
        character: "ナレーター",
        text: "【自然言語処理のタスク】\n・機械翻訳：言語間の翻訳\n・感情分析：テキストの感情を判定\n・質問応答：質問に対して回答を生成\n・文章要約：長文を短くまとめる\n・固有表現抽出：人名・地名などを抽出",
        bg: "nlp_tasks"
    },
    {
        character: "自然言語処理AI",
        text: "言葉を数値に変換する『単語埋め込み（Word Embedding）』が革命を起こしました。Word2VecやfastTextが有名です。",
        visual: "nlp_ai_explain"
    },
    {
        character: "ナレーター",
        text: "【単語埋め込み】単語を密なベクトル（数百次元の数値列）で表現。意味的に似た単語は近いベクトルになる。「王様 - 男 + 女 = 女王」のような計算も可能。",
        bg: "word_embedding"
    },

    // ===== 音声処理 =====
    {
        character: "音声処理AI",
        text: "私は『音声処理AI』。音声を理解し、生成するのが仕事です。",
        visual: "speech_ai_appear"
    },
    {
        character: "ナレーター",
        text: "【音声認識（STT）】音声をテキストに変換。スマートスピーカー、議事録作成などに使用。\n【音声合成（TTS）】テキストを音声に変換。読み上げソフト、仮想アシスタントに使用。",
        bg: "speech"
    },

    // ===== 生成モデル =====
    {
        character: "生成AI",
        text: "私は『生成AI』。新しいデータを作り出すクリエイターです。",
        visual: "generative_ai_appear"
    },
    {
        character: "ナレーター",
        text: "【GAN（敵対的生成ネットワーク）】生成器と識別器の2つのネットワークが競争しながら学習。リアルな画像生成が可能。",
        bg: "gan"
    },
    {
        character: "ナレーター",
        text: "【VAE（変分オートエンコーダ）】潜在空間を確率分布としてモデル化。滑らかな補間や新規データ生成が可能。",
        bg: "vae"
    },
    {
        character: "生成AI",
        text: "画像生成、音楽生成、テキスト生成...創造的なタスクでも人間を驚かせています。",
        visual: "generative_ai_proud"
    },
    // ➡️ 概念図：GANの仕組み
    {
        type: 'concept',
        conceptId: 'gan-architecture',
        title: 'GAN（敵対的生成ネットワーク）の仕組み'
    },

    // ===== 強化学習の応用 =====
    {
        character: "深層強化学習AI",
        text: "私は『深層強化学習AI』。複雑な環境で最適な行動を学ぶのが仕事です。",
        visual: "drl_ai_appear"
    },
    {
        character: "ナレーター",
        text: "【深層強化学習の応用】\n・ゲームAI：AlphaGo、Atariゲーム\n・ロボット制御：自律移動、マニピュレーション\n・自動運転：経路計画、意思決定",
        bg: "drl_applications"
    },

    // ===== 転移学習 =====
    {
        character: "転移学習",
        text: "私は『転移学習（Transfer Learning）』。学んだ知識を別のタスクに活かす技術です。",
        visual: "transfer_appear"
    },
    {
        character: "ナレーター",
        text: "【転移学習】事前に大量のデータで学習したモデル（事前学習モデル）を、別のタスクに応用する手法。少量のデータでも高い性能を発揮可能。",
        bg: "transfer_learning"
    },
    {
        character: "転移学習",
        text: "ImageNetで学習したCNNは、様々な画像認識タスクに転用できます。BERTやGPTも転移学習の代表例です。",
        visual: "transfer_explain"
    },

    // ===== ファインチューニング =====
    {
        character: "ナレーター",
        text: "【ファインチューニング】事前学習モデルの重みを、新しいタスクのデータで微調整する手法。最終層だけを変更する場合と、全体を微調整する場合がある。",
        bg: "finetuning"
    },
    // ➡️ 概念図：転移学習フロー
    {
        type: 'concept',
        conceptId: 'transfer-learning-flow',
        title: '転移学習とファインチューニング'
    },

    // ===== マルチモーダル =====
    {
        character: "マルチモーダルAI",
        text: "私は『マルチモーダルAI』。複数の種類のデータを扱えます。",
        visual: "multimodal_appear"
    },
    {
        character: "ナレーター",
        text: "【マルチモーダル】画像、テキスト、音声など異なる種類（モダリティ）のデータを統合して処理。画像キャプション生成、VQA（視覚質問応答）などに使用。",
        bg: "multimodal"
    },

    // ===== モデルの解釈性 =====
    {
        character: "解釈可能AI",
        text: "私は『解釈可能AI』。なぜその判断をしたかを説明できる必要があります。",
        visual: "xai_appear"
    },
    {
        character: "ナレーター",
        text: "【XAI（説明可能AI）】ブラックボックスとなりがちなDLの判断理由を可視化・解釈可能にする技術。Grad-CAM、LIME、SHAPなどの手法がある。",
        bg: "explainability"
    },

    // ===== モデルの軽量化 =====
    {
        character: "軽量化AI",
        text: "私は『軽量化AI』。小さなデバイスでも動作できるようになりました。",
        visual: "lightweight_appear"
    },
    {
        character: "ナレーター",
        text: "【モデル軽量化技術】\n・蒸留（Distillation）：大きなモデルの知識を小さなモデルに転移\n・量子化：重みを低精度（8ビット等）で表現\n・枝刈り（Pruning）：重要度の低い接続を削除",
        bg: "compression"
    },

    // ===== エピローグ =====
    {
        character: "AI (人工知能)",
        text: "画像、言語、音声、ゲーム...DLは本当に様々な分野で活躍しているんだな。",
        visual: "ai_amazed"
    },
    {
        character: "DL (ディープラーニング)",
        text: "そうだ。しかし、応用するためにはデータとプロジェクトの進め方も重要だ。次章ではそれを学ぶ。",
        visual: "dl_guide"
    },
    {
        character: "ナレーター",
        text: "第5章「応用の戦場へ」完了。ミニゲームと確認クイズに挑戦しよう！",
        bg: "chapter_end"
    }
];
