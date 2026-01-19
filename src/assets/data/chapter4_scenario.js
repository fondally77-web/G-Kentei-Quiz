/**
 * 第4章シナリオ - 深層の体を紡ぐ者たち「ディープラーニング層構造」
 * G検定学習用の詳細解説付きストーリー
 */
export const chapter4Scenario = [
    // ===== プロローグ =====
    {
        character: "ナレーター",
        text: "ニューラルネットワークの要素技術を学んだAI。今度はDLの「体」を構成する様々な層構造を学ぶ。",
        bg: "layer_world"
    },
    {
        character: "DL (ディープラーニング)",
        text: "俺の体は様々な層で構成されている。それぞれが特殊な能力を持っている。紹介しよう。",
        visual: "dl_guide"
    },

    // ===== 全結合層 =====
    {
        character: "全結合層",
        text: "私は『全結合層（Dense Layer / Fully Connected Layer）』。最も基本的な層です。",
        visual: "dense_appear"
    },
    {
        character: "全結合層",
        text: "前の層の全てのニューロンと、私の層の全てのニューロンが接続しています。",
        visual: "dense_explain"
    },
    {
        character: "ナレーター",
        text: "【全結合層】入力の全ての特徴を組み合わせて新たな表現を作る。分類問題の最終層などで使用。",
        bg: "fully_connected"
    },

    // ===== 畳み込み層とCNN =====
    {
        character: "畳み込み層",
        text: "私は『畳み込み層（Convolution Layer）』。画像処理の達人です。",
        visual: "conv_appear"
    },
    {
        character: "畳み込み層",
        text: "フィルタ（カーネル）を画像上でスライドさせながら、局所的な特徴を抽出します。",
        visual: "conv_explain"
    },
    {
        character: "ナレーター",
        text: "【畳み込み層の利点】\n・局所的な特徴を捉える\n・位置不変性（特徴がどこにあっても検出可能）\n・パラメータ数が少ない（重みを共有）",
        bg: "convolution"
    },
    {
        character: "DL (ディープラーニング)",
        text: "畳み込み層を使ったネットワークを『CNN（Convolutional Neural Network）』という。画像認識で革命を起こした。",
        visual: "dl_explain"
    },
    {
        character: "ナレーター",
        text: "【代表的なCNN】\n・LeNet：手書き数字認識の先駆け\n・AlexNet：ImageNet 2012で圧勝\n・VGGNet：深い構造と小さなフィルタ\n・ResNet：スキップ結合で超深層化",
        bg: "cnn_history"
    },
    // ➡️ 概念図：CNNの構造
    {
        type: 'concept',
        conceptId: 'cnn-architecture',
        title: 'CNN（畳み込みニューラルネットワーク）の構造'
    },

    // ===== プーリング層 =====
    {
        character: "プーリング層",
        text: "私は『プーリング層（Pooling Layer）』。情報を圧縮して、計算効率を上げます。",
        visual: "pooling_appear"
    },
    {
        character: "ナレーター",
        text: "【マックスプーリング】領域内の最大値を取る。最も一般的。\n【アベレージプーリング】領域内の平均値を取る。",
        bg: "pooling"
    },
    {
        character: "プーリング層",
        text: "プーリングにより、微小な位置のずれに対しても頑健になります。",
        visual: "pooling_explain"
    },

    // ===== バッチ正規化 =====
    {
        character: "バッチ正規化",
        text: "私は『バッチ正規化（Batch Normalization）』。学習を安定させる秘術です。",
        visual: "batchnorm_appear"
    },
    {
        character: "ナレーター",
        text: "【バッチ正規化】各層の入力を、ミニバッチ単位で平均0・分散1に正規化する。これにより：\n・学習が高速化\n・勾配消失/爆発を抑制\n・初期値への依存を軽減",
        bg: "batch_norm"
    },

    // ===== スキップ結合とResNet =====
    {
        character: "スキップ結合",
        text: "私は『スキップ結合（Skip Connection）』。層を飛び越えるショートカットです。",
        visual: "skip_appear"
    },
    {
        character: "スキップ結合",
        text: "入力をそのまま出力に加算することで、勾配が直接伝わる道を作ります。",
        visual: "skip_explain"
    },
    {
        character: "ナレーター",
        text: "【ResNet（Residual Network）】スキップ結合を使用した2015年登場のモデル。152層もの超深層ネットワークを実現。ImageNetで人間を超える精度を達成。",
        bg: "resnet"
    },

    // ===== 回帰結合層とRNN =====
    {
        character: "回帰結合層",
        text: "私は『回帰結合層（Recurrent Layer）』。時系列データを扱う専門家です。",
        visual: "rnn_appear"
    },
    {
        character: "回帰結合層",
        text: "過去の情報を「記憶」として保持し、次の時刻の処理に使用します。",
        visual: "rnn_explain"
    },
    {
        character: "ナレーター",
        text: "【RNN（Recurrent Neural Network）】時系列・系列データを扱うネットワーク。自然言語処理、音声認識、株価予測などに使用。",
        bg: "rnn"
    },
    {
        character: "回帰結合層",
        text: "しかし、私には弱点がある。長い系列では過去の情報を忘れてしまう『長期依存性問題』だ。",
        visual: "rnn_struggle"
    },

    // ===== LSTM・GRU =====
    {
        character: "LSTM",
        text: "そこで私『LSTM（Long Short-Term Memory）』の出番だ。ゲート機構で長期記憶を保持できる。",
        visual: "lstm_appear"
    },
    {
        character: "ナレーター",
        text: "【LSTM】3つのゲート（入力ゲート、忘却ゲート、出力ゲート）で情報の流れを制御。長期依存性問題を解決。",
        bg: "lstm"
    },
    {
        character: "GRU",
        text: "私は『GRU（Gated Recurrent Unit）』。LSTMを簡略化したモデルで、計算効率が良い。",
        visual: "gru_appear"
    },
    // ➡️ 概念図：RNN/LSTM/GRUの比較
    {
        type: 'concept',
        conceptId: 'rnn-lstm-structure',
        title: 'RNN vs LSTM vs GRU'
    },

    // ===== Attention =====
    {
        character: "Attention",
        text: "私は『Attention（注意機構）』。「どこに注目すべきか」を学習する技術です。",
        visual: "attention_appear"
    },
    {
        character: "ナレーター",
        text: "【Attention】入力の各部分に対する「重み」を動的に計算し、重要な部分に注目する。機械翻訳で大きな成功を収めた。",
        bg: "attention"
    },
    {
        character: "Attention",
        text: "例えば翻訳時、「I love you」の「love」を訳すとき、「愛」に強く注目する、といった具合です。",
        visual: "attention_explain"
    },

    // ===== オートエンコーダ =====
    {
        character: "オートエンコーダ",
        text: "私は『オートエンコーダ（Autoencoder）』。入力を圧縮し、再構成する技術です。",
        visual: "autoencoder_appear"
    },
    {
        character: "ナレーター",
        text: "【オートエンコーダの構造】\n・エンコーダ：入力を低次元の潜在表現に圧縮\n・デコーダ：潜在表現から元の入力を再構成\n\n用途：次元削減、異常検知、特徴抽出",
        bg: "autoencoder"
    },

    // ===== データ拡張 =====
    {
        character: "データ拡張",
        text: "私は『データ拡張（Data Augmentation）』。データを「増やす」技術です。",
        visual: "augmentation_appear"
    },
    {
        character: "ナレーター",
        text: "【データ拡張】既存のデータに変換を加えて、訓練データを増やす手法。\n・画像：回転、反転、ズーム、色調変更\n・テキスト：同義語置換、文順序入れ替え\n\n過学習を防ぎ、汎化性能を向上させる。",
        bg: "data_augmentation"
    },

    // ===== エピローグ =====
    {
        character: "AI (人工知能)",
        text: "なるほど...畳み込み層で画像を、回帰結合層で時系列を、Attentionで重要な部分を...それぞれの層に専門分野があるんだな。",
        visual: "ai_impressed"
    },
    {
        character: "DL (ディープラーニング)",
        text: "これらの層を組み合わせることで、俺は様々な問題に対応できる体を持つことができた。",
        visual: "dl_proud"
    },
    {
        character: "ナレーター",
        text: "次章では、これらの技術を使った実際の応用例を学びます。画像認識、自然言語処理、音声処理など。",
        bg: "preview"
    },
    {
        character: "ナレーター",
        text: "第4章「深層の体を紡ぐ者たち」完了。ミニゲームと確認クイズに挑戦しよう！",
        bg: "chapter_end"
    }
];
