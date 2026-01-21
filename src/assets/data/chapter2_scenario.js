/**
 * 第2章シナリオ - 学習の3兄弟「機械学習の手法」
 * G検定学習用 - インタラクティブ形式
 */
export const chapter2Scenario = [
    // ===== プロローグ =====
    {
        character: "ナレーター",
        text: "第1章でML（機械学習）と出会ったAI。今度はMLの教え子たち「学習の3兄弟」に出会うことになる。",
        bg: "training_ground"
    },
    {
        character: "ML (機械学習)",
        text: "AI、お前に紹介したい者たちがいる。私の3人の弟子だ。",
        visual: "ml_guide"
    },
    {
        character: "AI (人工知能)",
        text: "3人の弟子...？どんな力を持っているのかしら？",
        visual: "ai_curious"
    },
    {
        character: "ML (機械学習)",
        text: "それぞれ学び方が違う。まずは長男の『教師あり学習』から紹介しよう。",
        visual: "ml_guide"
    },

    // ===== 教師あり学習の紹介 =====
    {
        character: "教師あり学習",
        text: "はじめまして。俺は『教師あり学習（Supervised Learning）』。正解を教えてもらいながら学ぶのが得意だ。",
        visual: "supervised_appear"
    },
    {
        character: "AI (人工知能)",
        text: "正解を教えてもらう...？具体的にはどういうことなの？",
        visual: "ai_question"
    },
    {
        character: "教師あり学習",
        text: "例えば、猫の画像を見せて『これは猫だ』と教えてもらう。犬の画像なら『これは犬だ』というふうにな。",
        visual: "supervised_explain"
    },
    {
        character: "教師あり学習",
        text: "そうやって正解ラベル付きのデータをたくさん見て学習するから、新しい画像も分類できるようになるんだ。",
        visual: "supervised_explain"
    },

    // ===== インラインクイズ1: 教師あり学習の理解確認 =====
    {
        type: 'inline_quiz',
        character: "教師あり学習",
        question: "じゃあ、ちょっと確認だ。俺が得意なのは次のうちどっちだ？",
        options: [
            { text: "正解ラベル付きのデータから学ぶ", correct: true },
            { text: "正解なしで自分でパターンを見つける", correct: false }
        ],
        onCorrect: {
            character: "教師あり学習",
            text: "正解！その通りだ。俺は『先生』のように正解を教えてもらって学ぶから『教師あり』なんだ。"
        },
        onIncorrect: {
            character: "教師あり学習",
            text: "惜しい！それは次に紹介する弟の得意分野だな。俺は正解ラベル付きのデータから学ぶから『教師あり』なんだ。"
        }
    },

    // ===== 教師あり学習の仕事 =====
    {
        character: "教師あり学習",
        text: "正解がないと不安なんだ...でも、それが俺の強さでもある。俺には2つの主な仕事がある。『分類』と『回帰』だ。",
        visual: "supervised_pose"
    },
    {
        character: "AI (人工知能)",
        text: "分類と回帰...？どう違うのかしら？",
        visual: "ai_question"
    },
    {
        character: "教師あり学習",
        text: "『分類』は、データをカテゴリに分けることだ。例えば、メールが『スパム』か『普通』かを判定するとかな。",
        visual: "supervised_explain"
    },
    {
        character: "教師あり学習",
        text: "『回帰』は、連続的な数値を予測することだ。例えば、この家は『いくら』で売れるかを予測する。",
        visual: "supervised_explain"
    },

    // ===== インラインクイズ2: 分類と回帰 =====
    {
        type: 'inline_quiz',
        character: "教師あり学習",
        question: "じゃあ問題だ！『明日の気温が何度になるか予測する』のは、分類と回帰どっちだ？",
        options: [
            { text: "分類", correct: false },
            { text: "回帰", correct: true }
        ],
        onCorrect: {
            character: "教師あり学習",
            text: "大正解！気温は連続的な数値だから『回帰』だな。よく分かってる。"
        },
        onIncorrect: {
            character: "教師あり学習",
            text: "残念！気温は『25度』『26度』みたいに連続的な数値だから『回帰』だ。分類は『晴れ/曇り/雨』みたいなカテゴリ分けだな。"
        }
    },

    // ===== 教師なし学習の紹介 =====
    {
        character: "ML (機械学習)",
        text: "次は、次男の『教師なし学習』だ。",
        visual: "ml_guide"
    },
    {
        character: "教師なし学習",
        text: "正解？ そんなの、自分で見つけるさ！ 俺は『教師なし学習（Unsupervised Learning）』。データから自由にパターンを見つけられるぜ。",
        visual: "unsupervised_appear"
    },
    {
        character: "AI (人工知能)",
        text: "正解がないのに、どうやって学ぶのかしら？",
        visual: "ai_question"
    },
    {
        character: "教師なし学習",
        text: "データそのものをじっくり観察するのさ。似たものをグループ化したり、データの本質的な特徴を見抜いたりする。",
        visual: "unsupervised_explain"
    },
    {
        character: "教師なし学習",
        text: "例えば、顧客データを見て『この人たちは似た買い物傾向があるな』ってグループ分けできる。これを『クラスタリング』って言うんだ。",
        visual: "unsupervised_explain"
    },

    // ===== インラインクイズ3: クラスタリングの用途 =====
    {
        type: 'inline_quiz',
        character: "教師なし学習",
        question: "お店が顧客を似た傾向でグループ分けしたい場合、俺と姉さん（教師あり学習）、どっちが向いてると思う？",
        options: [
            { text: "教師あり学習", correct: false },
            { text: "教師なし学習", correct: true }
        ],
        onCorrect: {
            character: "教師なし学習",
            text: "そうだ！正解のグループが事前にわからない場合は、俺の出番だ。データから自然なグループを見つけ出すのが得意だからな！"
        },
        onIncorrect: {
            character: "教師なし学習",
            text: "惜しいな。事前に『この人はAグループ』みたいな正解ラベルがあれば姉さんの仕事だけど、グループ自体を発見したい場合は俺の仕事だ！"
        }
    },

    // ===== 強化学習の紹介 =====
    {
        character: "ML (機械学習)",
        text: "最後は三男の『強化学習』だ。一番やんちゃだが、大きな可能性を秘めている。",
        visual: "ml_guide"
    },
    {
        character: "強化学習",
        text: "オレが『強化学習（Reinforcement Learning）』だ！失敗は報酬への道標。何度でも挑戦する！",
        visual: "reinforcement_appear"
    },
    {
        character: "AI (人工知能)",
        text: "試行錯誤...？ゲームのプレイヤーみたいね。",
        visual: "ai_interested"
    },
    {
        character: "強化学習",
        text: "まさにそうだ！オレは『エージェント』として行動する。良い行動をすれば『報酬』がもらえて、ダメな行動をすれば『罰』を受ける。",
        visual: "reinforcement_explain"
    },
    {
        character: "強化学習",
        text: "その経験を積み重ねて、どうすれば最高の報酬が得られるかを学んでいくんだ！",
        visual: "reinforcement_explain"
    },

    // ===== インラインクイズ4: 強化学習の例 =====
    {
        type: 'inline_quiz',
        character: "強化学習",
        question: "オレが活躍した有名な例といえば...次のうちどれだと思う？",
        options: [
            { text: "スパムメールの検出", correct: false },
            { text: "囲碁AI『AlphaGo』", correct: true },
            { text: "顧客のグループ分け", correct: false }
        ],
        onCorrect: {
            character: "強化学習",
            text: "正解だ！AlphaGoは強化学習を使って、何百万回もの対局から学習し、世界チャンピオンを倒したんだ！オレたちの力を見せつけてやったぜ！"
        },
        onIncorrect: {
            character: "強化学習",
            text: "惜しいな！スパム検出は姉さん（教師あり学習）、グループ分けは兄さん（教師なし学習）の仕事だ。オレが輝いたのは囲碁AI『AlphaGo』だ！試行錯誤で最強の一手を学んだんだぜ！"
        }
    },

    // ===== 過学習の話 =====
    {
        character: "ML (機械学習)",
        text: "3人の弟子を紹介したが、AIよ、機械学習には大きな落とし穴がある。",
        visual: "ml_serious"
    },
    {
        character: "AI (人工知能)",
        text: "落とし穴...？",
        visual: "ai_worry"
    },
    {
        character: "ML (機械学習)",
        text: "『過学習（Overfitting）』だ。これは、訓練データに特化しすぎて、新しいデータに対応できなくなる現象だ。",
        visual: "ml_explain"
    },
    {
        character: "教師あり学習",
        text: "例えるなら、テストの過去問を丸暗記したけど、応用問題が全然解けない...みたいな状態だな。",
        visual: "supervised_explain"
    },
    {
        character: "AI (人工知能)",
        text: "なるほど...訓練データは完璧に覚えたけど、本当の実力がついていない状態なのね。",
        visual: "ai_understand"
    },

    // ===== インラインクイズ5: 過学習 =====
    {
        type: 'inline_quiz',
        character: "ML (機械学習)",
        question: "モデルが訓練データでは正解率99%だが、新しいデータでは正解率60%だった。これはどんな状態だ？",
        options: [
            { text: "過学習（Overfitting）している", correct: true },
            { text: "まだ学習が足りない", correct: false }
        ],
        onCorrect: {
            character: "ML (機械学習)",
            text: "その通りだ！訓練データへの適合度は高いが、未知のデータへの汎化性能が低い。典型的な過学習だ。"
        },
        onIncorrect: {
            character: "ML (機械学習)",
            text: "いや、訓練データで99%取れているなら学習自体は十分だ。問題は新しいデータで60%しか取れないこと。これは訓練データに過度に適合した『過学習』の状態だ。"
        }
    },
    // ➡️ 概念図：過学習の可視化
    {
        type: 'concept',
        conceptId: 'overfitting-visualization',
        title: '過学習（Overfitting）の可視化'
    },

    // ===== バイアスとバリアンス =====
    {
        character: "ML (機械学習)",
        text: "過学習を理解するには、『バイアス』と『バリアンス』のトレードオフを知る必要がある。",
        visual: "ml_lecture"
    },
    {
        character: "教師あり学習",
        text: "『バイアス』はモデルが単純すぎて真の関係を捕らえられない誤差。シンプルすぎる問題だな。",
        visual: "supervised_explain"
    },
    {
        character: "教師なし学習",
        text: "『バリアンス』はモデルがデータのノイズにまで適合しすぎる誤差。複雑すぎる問題だな。",
        visual: "unsupervised_explain"
    },
    {
        character: "強化学習",
        text: "バイアスを下げようとするとバリアンスが上がり、バリアンスを下げようとするとバイアスが上がる。ちょうどいいバランスを見つけるのが大事なんだ！",
        visual: "reinforcement_explain"
    },
    // ➡️ 概念図：バイアス・バリアンストレードオフ
    {
        type: 'concept',
        conceptId: 'bias-variance-tradeoff',
        title: 'バイアスとバリアンスのトレードオフ'
    },

    // ===== エピローグ =====
    {
        character: "AI (人工知能)",
        text: "なるほど...機械学習には3つの主な手法があって、それぞれ学び方が違うのね。",
        visual: "ai_understand"
    },
    {
        character: "ML (機械学習)",
        text: "その通りだ。問題に応じて適切な手法を選び、過学習に気をつけながら学習させることが重要なのだ。",
        visual: "ml_nod"
    },
    {
        character: "教師あり学習",
        text: "俺たち3兄弟は、それぞれ得意分野が違うけど、協力すれば様々な問題を解決できるぜ！",
        visual: "supervised_smile"
    },
    {
        character: "強化学習",
        text: "次は、DL（ディープラーニング）の「体」を構成する要素技術を学ぶ番だな！",
        visual: "reinforcement_excited"
    },
    {
        character: "ナレーター",
        text: "第2章「学習の3兄弟」完了。確認クイズに挑戦しよう！",
        bg: "chapter_end"
    }
];
