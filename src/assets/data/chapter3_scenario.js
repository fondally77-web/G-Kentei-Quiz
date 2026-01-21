/**
 * 第3章シナリオ - 天才と6人の職人「ニューラルネットワーク要素技術」
 * G検定学習用の詳細解説付きストーリー
 */
export const chapter3Scenario = [
    // ===== プロローグ =====
    {
        character: "ナレーター",
        text: "機械学習の仲間たちに出会ったAIとDL。今度はDLの力の源「ニューラルネットワーク」の職人たちに会う。",
        bg: "neural_workshop"
    },
    {
        character: "DL (ディープラーニング)",
        text: "俺の力は、多くの職人たちの技術によって支えられている。彼らを紹介しよう。",
        visual: "dl_guide"
    },

    // ===== ニューロンとパーセプトロン =====
    {
        character: "ニューロン",
        text: "私は『ニューロン（形式ニューロン）』。脳の神経細胞を模した基本単位です。",
        visual: "neuron_appear"
    },
    {
        character: "ナレーター",
        text: "ニューロンは、複数の入力を受け取り、重み付け和を計算し、活性化関数を通して出力する。",
        bg: "neuron_diagram"
    },
    {
        character: "ニューロン",
        text: "私の正式名称は『パーセプトロン』。1957年にフランク・ローゼンブラットが考案しました。",
        visual: "neuron_explain"
    },
    {
        character: "ナレーター",
        text: "【パーセプトロン】\n出力 = f(Σ(重み × 入力) + バイアス)\nここでfは活性化関数。",
        bg: "perceptron"
    },
    {
        character: "DL (ディープラーニング)",
        text: "パーセプトロンを多層に重ねたものが『多層パーセプトロン（MLP）』。これがニューラルネットワークの基本形だ。",
        visual: "dl_explain"
    },

    // ===== 活性化関数 =====
    {
        character: "活性化関数",
        text: "私は『活性化関数』。ニューロンの出力を決める「スイッチ」のような存在です。",
        visual: "activation_appear"
    },
    {
        character: "ナレーター",
        text: "活性化関数がないと、何層重ねても線形変換の組み合わせ（＝単なる線形変換）になってしまう。非線形性を導入するのが活性化関数の役割。",
        bg: "activation_importance"
    },
    {
        character: "活性化関数",
        text: "0か1かではない。グラデーションこそが、知性の証。私には様々な種類があります。代表的なものを紹介しましょう。",
        visual: "activation_explain"
    },
    {
        character: "ナレーター",
        text: "【シグモイド関数】0〜1の値を出力。確率として解釈しやすいが、勾配消失問題を起こしやすい。",
        bg: "sigmoid"
    },
    {
        character: "ナレーター",
        text: "【tanh関数】-1〜1の値を出力。シグモイドより出力が原点中心で学習が安定。",
        bg: "tanh"
    },
    {
        character: "ナレーター",
        text: "【ReLU関数】入力が正なら入力をそのまま出力、負なら0。計算が高速で勾配消失しにくい。現在最もよく使われる。",
        bg: "relu"
    },
    {
        character: "ナレーター",
        text: "【ソフトマックス関数】複数の出力を確率分布に変換。出力の合計が1になる。多クラス分類の出力層で使用。",
        bg: "softmax"
    },
    // ➡️ 概念図：活性化関数の比較
    {
        type: 'concept',
        conceptId: 'activation-functions',
        title: '活性化関数の比較'
    },

    // ===== 誤差関数（損失関数） =====
    {
        character: "誤差関数",
        text: "私は『誤差関数（損失関数）』。モデルの予測と正解との「ずれ」を数値化する職人です。",
        visual: "loss_appear"
    },
    {
        character: "AI (人工知能)",
        text: "ずれを数値化する...？",
        visual: "ai_question"
    },
    {
        character: "誤差関数",
        text: "厳しさは、愛の裏返し。正確な距離が、成長を生む。学習とは、この誤差を最小化する過程です。",
        visual: "loss_explain"
    },
    {
        character: "ナレーター",
        text: "【二乗誤差】回帰問題で使用。(予測値 - 正解値)² の平均。",
        bg: "mse"
    },
    {
        character: "ナレーター",
        text: "【交差エントロピー誤差】分類問題で使用。正解ラベルと予測確率の情報理論的な差を測る。",
        bg: "cross_entropy"
    },

    // ===== 誤差逆伝播法 =====
    {
        character: "誤差逆伝播法",
        text: "私は『誤差逆伝播法（バックプロパゲーション）』。過去を达ることで、未来が開ける。",
        visual: "backprop_appear"
    },
    {
        character: "誤差逆伝播法",
        text: "出力層で計算された誤差を、入力層に向かって逆方向に伝播させ、各重みの更新量を効率的に計算します。",
        visual: "backprop_explain"
    },
    {
        character: "ナレーター",
        text: "【誤差逆伝播法の原理】連鎖律（チェーンルール）を使って、誤差関数の各重みに対する勾配を計算する。",
        bg: "backprop_chain"
    },
    {
        character: "DL (ディープラーニング)",
        text: "この手法のおかげで、俺は多層のネットワークでも効率的に学習できるようになった。",
        visual: "dl_grateful"
    },
    // ➡️ 概念図：誤差逆伝播の仕組み
    {
        type: 'concept',
        conceptId: 'backpropagation-flow',
        title: '誤差逆伝播法の仕組み'
    },

    // ===== 勾配消失問題 =====
    {
        character: "ナレーター",
        text: "しかし、深いネットワークには難題があった。",
        bg: "dark"
    },
    {
        character: "DL (ディープラーニング)",
        text: "層を深くすると、入力層に近い層まで勾配が届かなくなる...『勾配消失問題』だ。",
        visual: "dl_struggle"
    },
    {
        character: "ナレーター",
        text: "【勾配消失問題】シグモイド関数などでは、勾配が0〜0.25の範囲。何層も重なると、勾配が掛け算されてほぼ0になってしまう。",
        bg: "vanishing_gradient"
    },
    {
        character: "活性化関数",
        text: "だから、ReLUが重要なのです。ReLUの勾配は入力が正なら常に1。勾配が減衰しにくいのです。",
        visual: "activation_explain"
    },

    // ===== 最適化手法 =====
    {
        character: "最適化手法",
        text: "私は『最適化手法』。一歩ずつ。でも、確実に最善の道を。誤差を最小化するための重み更新を決める職人です。",
        visual: "optimizer_appear"
    },
    {
        character: "ナレーター",
        text: "【勾配降下法（GD）】誤差関数の勾配の逆方向に重みを更新する基本手法。",
        bg: "gradient_descent"
    },
    {
        character: "ナレーター",
        text: "【確率的勾配降下法（SGD）】全データではなく、ランダムに選んだ一部のデータで勾配を計算。計算効率が良い。",
        bg: "sgd"
    },
    {
        character: "ナレーター",
        text: "【ミニバッチ勾配降下法】SGDとGDの中間。一定数のデータ（ミニバッチ）で勾配を計算。実用上最も使われる。",
        bg: "minibatch"
    },
    {
        character: "最適化手法",
        text: "さらに高度な手法もあります。Momentum、RMSprop、Adamなど。特にAdamが現在最も人気です。",
        visual: "optimizer_explain"
    },
    {
        character: "ナレーター",
        text: "【Adam】MomentumとRMSpropを組み合わせた手法。学習率を自動調整し、多くの問題で安定して動作する。",
        bg: "adam"
    },
    // ➡️ 概念図：勾配降下法の仕組み
    {
        type: 'concept',
        conceptId: 'gradient-descent-visualization',
        title: '勾配降下法の仕組み'
    },

    // ===== 正則化 =====
    {
        character: "正則化",
        text: "私は『正則化』。過学習を防ぐための技術です。",
        visual: "regularization_appear"
    },
    {
        character: "AI (人工知能)",
        text: "過学習...第2章で学んだわね。訓練データに特化しすぎる問題なの。",
        visual: "ai_remember"
    },
    {
        character: "ナレーター",
        text: "【L1正則化（Lasso）】重みの絶対値の和をペナルティとして加える。一部の重みが0になりやすい（スパース化）。",
        bg: "l1"
    },
    {
        character: "ナレーター",
        text: "【L2正則化（Ridge）】重みの二乗和をペナルティとして加える。重みが大きくなりすぎることを防ぐ。",
        bg: "l2"
    },
    {
        character: "ナレーター",
        text: "【ドロップアウト】訓練時にランダムにニューロンを無効化する。ネットワークが特定のニューロンに依存しすぎることを防ぐ。",
        bg: "dropout"
    },
    {
        character: "ナレーター",
        text: "【早期終了（Early Stopping）】検証データの誤差が上がり始めたら訓練を止める。過学習が進行する前に学習を終了。",
        bg: "early_stopping"
    },

    // ===== ハイパーパラメータ =====
    {
        character: "DL (ディープラーニング)",
        text: "これらの技術には、人間が設定する『ハイパーパラメータ』がある。学習率、バッチサイズ、層の数などだ。",
        visual: "dl_explain"
    },
    {
        character: "ナレーター",
        text: "【ハイパーパラメータ】モデルが学習するパラメータ（重み）とは別に、人間が事前に設定する値。適切な設定が性能を左右する。",
        bg: "hyperparameters"
    },

    // ===== エピローグ =====
    {
        character: "AI (人工知能)",
        text: "なるほど...DLの力は、たくさんの職人たちの技術の結晶なのね。",
        visual: "ai_impressed"
    },
    {
        character: "DL (ディープラーニング)",
        text: "そうだ。活性化関数、誤差関数、最適化手法、正則化...全てが組み合わさって俺は強くなれる。",
        visual: "dl_proud"
    },
    {
        character: "誤差逆伝播法",
        text: "次は、DLの「体」を構成する層構造について学びましょう。CNN、RNN、Attentionなどの技術が待っています。",
        visual: "backprop_guide"
    },
    {
        character: "ナレーター",
        text: "第3章「天才と6人の職人」完了。ミニゲームと確認クイズに挑戦しよう！",
        bg: "chapter_end"
    }
];
