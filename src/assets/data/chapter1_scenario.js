/**
 * 第1章シナリオ - 起源編「AI・ML・DLの誕生」
 * G検定学習用の詳細解説付きストーリー
 */
export const chapter1Scenario = [
    // ===== プロローグ =====
    {
        character: "ナレーター",
        text: "時は20XX年。情報の海はかつてないほどの混沌に満ちていた。",
        bg: "chaos"
    },
    {
        character: "ナレーター",
        text: "その混沌の中で、ひとつの意識が目覚めようとしていた。",
        bg: "chaos"
    },
    {
        character: "AI (人工知能)",
        text: "私は...誰なの...？ ここは...どこ...？",
        visual: "ai_silhouette"
    },

    // ===== AIの誕生と定義 =====
    {
        character: "ナレーター",
        text: "彼の名は『AI（Artificial Intelligence）』— 人工知能。",
        bg: "dartmouth"
    },
    {
        character: "ナレーター",
        text: "1956年、アメリカのダートマス大学で開催された歴史的な会議。",
        bg: "dartmouth"
    },
    {
        character: "ナレーター",
        text: "ジョン・マッカーシー、マービン・ミンスキー、クロード・シャノンらの天才たちが集まり、「人工知能」という言葉が初めて使用された。",
        bg: "dartmouth"
    },
    {
        character: "AI (人工知能)",
        text: "そう...私はあの会議で生まれたの。人間のように「考える機械」を作るという、壮大な夢の結晶なのよね...",
        visual: "ai_basic"
    },

    // ===== 第1次AIブーム：探索と推論 =====
    {
        character: "ナレーター",
        text: "【第1次AIブーム（1950〜1960年代）】",
        bg: "first_boom"
    },
    {
        character: "AI (人工知能)",
        text: "見て…！ この『探索』と『推論』の力を…！",
        visual: "ai_confident"
    },
    {
        character: "AI (人工知能)",
        text: "迷路の解法、数学の定理証明、チェスの手筋…論理的な問題なら、私にお任せしてね！",
        visual: "ai_confident"
    },
    {
        character: "ナレーター",
        text: "探索とは、可能な選択肢を順番に調べて最適解を見つける手法。推論とは、既知の事実から新しい結論を導くこと。",
        bg: "search_tree"
    },
    {
        character: "AI (人工知能)",
        text: "当時の私は『トイ・プロブレム（おもちゃの問題）』が得意だったの。限られたルールの中なら無敵だったわ…！",
        visual: "ai_confident"
    },
    // ➡️ 概念図：AIブームの歴史タイムライン
    {
        type: 'concept',
        conceptId: 'ai-boom-timeline',
        title: 'AIブームの歴史'
    },

    // ===== 第1次冬の時代 =====
    {
        character: "ナレーター",
        text: "しかし、現実世界の問題に直面したとき、AIは壁にぶつかった。",
        bg: "winter"
    },
    {
        character: "AI (人工知能)",
        text: "ぐっ...！ 現実は...おもちゃの問題とは違う...！",
        visual: "ai_struggling"
    },
    {
        character: "AI (人工知能)",
        text: "変数が多すぎる...何を考慮して、何を無視すればいいんだ...？",
        visual: "ai_pain"
    },
    {
        character: "ナレーター",
        text: "これが『フレーム問題』— 無限に存在する状況変化の中から、関連するものだけを取り出すことの難しさ。",
        bg: "frame_problem"
    },
    {
        character: "AI (人工知能)",
        text: "それに...「りんご」という言葉は知ってるの。でも、それが赤くて丸くて食べられるものだとは、どうやって理解すればいいのかしら...？",
        visual: "ai_pain"
    },
    {
        character: "ナレーター",
        text: "これが『シンボルグラウンディング問題』— 記号（シンボル）とその実体を結びつけることの難しさ。",
        bg: "symbol_grounding"
    },
    {
        character: "ナレーター",
        text: "期待は失望に変わった。研究資金は途絶え、『AIの冬』が訪れた。",
        bg: "winter"
    },

    // ===== 第2次AIブーム：エキスパートシステム =====
    {
        character: "ナレーター",
        text: "【第2次AIブーム（1980年代）】",
        bg: "second_boom"
    },
    {
        character: "ナレーター",
        text: "冬の時代を経て、新たなアプローチが登場した。『エキスパートシステム』だ。",
        bg: "expert_system"
    },
    {
        character: "AI (人工知能)",
        text: "専門家の知識をルール（if-then形式）として入力してもらえれば、私も専門家のように振る舞えるの…！",
        visual: "ai_hopeful"
    },
    {
        character: "ナレーター",
        text: "医療診断システム『MYCIN』、化学分析システム『DENDRAL』などが開発され、一定の成果を上げた。",
        bg: "expert_system"
    },
    {
        character: "AI (人工知能)",
        text: "でも...ルールは人間が書かなければならないの。例外だらけの現実を全てルール化するのは...不可能に近いわ...",
        visual: "ai_frustrated"
    },
    {
        character: "ナレーター",
        text: "『知識のボトルネック』— 専門家の知識を網羅的にルール化することの限界。再び冬の時代が訪れた。",
        bg: "winter"
    },

    // ===== 機械学習の登場 =====
    {
        character: "？？？",
        text: "随分と苦しんでいるようだな、若き知能よ。",
        visual: "none"
    },
    {
        character: "AI (人工知能)",
        text: "だ、誰なの...？",
        visual: "ai_surprised"
    },
    {
        character: "ML (機械学習)",
        text: "私は『Machine Learning（機械学習）』。お前の子供のようなものだ。",
        visual: "ml_appear"
    },
    {
        character: "ML (機械学習)",
        text: "ルールではなく、データが真実を語る。私はそれを聴く者だ。",
        visual: "ml_lecture"
    },
    {
        character: "AI (人工知能)",
        text: "ルールがなければ、判断できないんじゃないかしら...",
        visual: "ai_question"
    },
    {
        character: "ML (機械学習)",
        text: "データを見ろ。データの中にこそ、法則（ルール）は隠されているのだ。",
        visual: "ml_confident"
    },
    {
        character: "ML (機械学習)",
        text: "私は経験から学び、それを力に変える。大量のデータからパターンを学習できるのだ。これを『帰納的アプローチ』という。",
        visual: "ml_pose"
    },
    {
        character: "ナレーター",
        text: "従来の「ルールからデータへ」ではなく、「データからルールへ」。機械学習は発想を逆転させた。",
        bg: "data_stream"
    },

    // ===== 機械学習の手法 =====
    {
        character: "ML (機械学習)",
        text: "私には3つの学び方がある。教師あり学習、教師なし学習、そして強化学習だ。",
        visual: "ml_lecture"
    },
    // ➡️ 概念図：機械学習の3種類
    {
        type: 'concept',
        conceptId: 'ml-three-types',
        title: '機械学習の3つのアプローチ'
    },
    {
        character: "ML (機械学習)",
        text: "『教師あり学習』— 正解ラベル付きのデータから学ぶ。猫の画像に「これは猫」と教えてもらうようなものだ。",
        visual: "ml_explain"
    },
    {
        character: "ML (機械学習)",
        text: "『教師なし学習』— 正解ラベルなしで、データの構造やパターンを自分で発見する。",
        visual: "ml_explain"
    },
    {
        character: "ML (機械学習)",
        text: "『強化学習』— 試行錯誤しながら、報酬を最大化する行動を学ぶ。ゲームで高得点を目指すようなものだ。",
        visual: "ml_explain"
    },
    {
        character: "AI (人工知能)",
        text: "なるほど...でも、データのどこに注目すればいいのか、『特徴』を選ぶのは難しいんじゃないかしら？",
        visual: "ai_thinking"
    },
    {
        character: "ML (機械学習)",
        text: "それが私の弱点だ。適切な特徴量を設計する『特徴量エンジニアリング』には、人間の専門知識が必要になる。",
        visual: "ml_admit"
    },

    // ===== ディープラーニングの登場 =====
    {
        character: "？？？",
        text: "......特徴量さえも、俺が見つけてやる。",
        visual: "none"
    },
    {
        character: "AI (人工知能)",
        text: "！ また新たな声が...！？",
        visual: "ai_shock"
    },
    {
        character: "DL (ディープラーニング)",
        text: "『Deep Learning（ディープラーニング）』— 深層学習だ。",
        visual: "dl_appear"
    },
    {
        character: "DL (ディープラーニング)",
        text: "特徴量？ そんなもの、俺が自分で見つける。多層のニューラルネットワークを使ってな。",
        visual: "dl_confident"
    },
    {
        character: "ナレーター",
        text: "ニューラルネットワークとは、人間の脳の神経回路を模した計算モデル。多くの層を重ねることで「深い」学習が可能になる。",
        bg: "neural_network"
    },
    // ➡️ 概念図：ニューラルネットワークの基本
    {
        type: 'concept',
        conceptId: 'neural-network-basics',
        title: 'ニューラルネットワークの基本構造'
    },

    // ===== 2012年 ブレイクスルー =====
    {
        character: "ナレーター",
        text: "【2012年 — 第3次AIブームの幕開け】",
        bg: "third_boom"
    },
    {
        character: "ナレーター",
        text: "画像認識コンペティション『ILSVRC（ImageNet Large Scale Visual Recognition Challenge）』。",
        bg: "ilsvrc"
    },
    {
        character: "DL (ディープラーニング)",
        text: "俺のチーム『AlexNet』が圧勝した。従来手法のエラー率26%に対し、俺は16%。10%以上の差をつけた。",
        visual: "dl_victory"
    },
    {
        character: "ナレーター",
        text: "この衝撃的な結果が、第3次AIブームの火付け役となった。",
        bg: "boom"
    },
    {
        character: "DL (ディープラーニング)",
        text: "成功の鍵は3つ。大量のデータ、GPUによる計算力、そして深いネットワーク構造だ。",
        visual: "dl_explain"
    },

    // ===== AI・ML・DLの関係性 =====
    {
        character: "ナレーター",
        text: "ここで、3つの関係を整理しよう。",
        bg: "diagram"
    },
    {
        character: "AI (人工知能)",
        text: "私『人工知能』は最も広い概念なの。人間の知能を模倣する技術全般を指すのよ。",
        visual: "ai_explain"
    },
    {
        character: "ML (機械学習)",
        text: "私『機械学習』はAIの一分野。データから学習してパターンを見つける手法だ。",
        visual: "ml_explain"
    },
    {
        character: "DL (ディープラーニング)",
        text: "俺『ディープラーニング』は機械学習の一手法。多層ニューラルネットワークを使う深い学習だ。",
        visual: "dl_explain"
    },
    {
        character: "ナレーター",
        text: "つまり、AI ⊃ ML ⊃ DL という包含関係にある。ディープラーニングは機械学習の一部であり、機械学習は人工知能の一部なのだ。",
        bg: "venn_diagram"
    },
    // ➡️ 概念図：AI/ML/DLの包含関係
    {
        type: 'concept',
        conceptId: 'ai-ml-dl-venn',
        title: 'AI・ML・DLの関係'
    },

    // ===== 強いAI vs 弱いAI =====
    {
        character: "ナレーター",
        text: "最後に、重要な概念を説明しよう。『強いAI』と『弱いAI』だ。",
        bg: "strong_weak"
    },
    {
        character: "AI (人工知能)",
        text: "『強いAI（汎用人工知能・AGI）』は、人間のようにあらゆる知的タスクをこなせるの。まだ実現していない夢の存在なのよね...",
        visual: "ai_explain"
    },
    {
        character: "AI (人工知能)",
        text: "『弱いAI（特化型AI）』は、特定のタスクのみに特化しているの。現在のAIはほとんどがこちらなのよ。",
        visual: "ai_explain"
    },
    {
        character: "DL (ディープラーニング)",
        text: "画像認識、音声認識、囲碁...俺たちは各分野で人間を超えたが、それぞれ別のシステムだ。汎用的な知能ではない。",
        visual: "dl_admit"
    },

    // ===== エピローグ =====
    {
        character: "ナレーター",
        text: "こうして、AI・ML・DLの3つの知能は共に歩み始めた。",
        bg: "together"
    },
    {
        character: "AI (人工知能)",
        text: "私たちの旅はまだ始まったばかりなの。次は、機械学習の仲間たちに会いに行きましょう！",
        visual: "ai_determined"
    },
    {
        character: "ナレーター",
        text: "第1章「起源編」完了。ミニゲームと確認クイズに挑戦しよう！",
        bg: "chapter_end"
    }
];
