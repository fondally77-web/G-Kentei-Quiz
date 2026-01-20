import { useState, useEffect, useRef } from 'react';

// ============================================
// G検定クイズデータ（9章×20問=180問）
// ============================================

const quizData = {
  chapter1: {
    id: 1,
    title: "人工知能をめぐる動向",
    subtitle: "AI History & Foundations",
    character: "🤖",
    characterName: "AIヒストリアン",
    quote: "歴史を知る者は未来を制す！",
    color: "#3B82F6",
    questions: [
      { id: 1, question: "自律的に環境を認識し、判断・行動するソフトウェアやシステムを何と呼ぶか？", options: ["エージェント", "ロボット", "オートマトン", "デーモン"], correct: 0, explanation: "エージェントは、環境を認識し、自律的に判断・行動するソフトウェアやシステムです。AIエージェントは特に、AIを活用して複雑なタスクを実行します。", keywords: ["エージェント"] },
      { id: 2, question: "「人工知能」という用語が初めて使われた1956年の会議は何か？", options: ["チューリング会議", "ダートマス会議", "MIT会議", "スタンフォード会議"], correct: 1, explanation: "1956年のダートマス会議で「Artificial Intelligence（人工知能）」という用語が初めて使われ、AI研究が正式に始まりました。", keywords: ["人工知能", "ダートマス会議"] },
      { id: 3, question: "多層のニューラルネットワークを用いた機械学習手法を何と呼ぶか？", options: ["強化学習", "教師あり学習", "ディープラーニング", "クラスタリング"], correct: 2, explanation: "ディープラーニング（深層学習）は、多層のニューラルネットワークを使用して、データから自動的に特徴を学習する手法です。", keywords: ["ディープラーニング"] },
      { id: 4, question: "統計的手法を用いて、大量のコーパスから翻訳パターンを学習する機械翻訳手法は？", options: ["ルールベース機械翻訳", "統計的機械翻訳", "ニューラル機械翻訳", "辞書ベース翻訳"], correct: 1, explanation: "統計的機械翻訳は、対訳コーパスから統計的に翻訳パターンを学習します。ルールベース機械翻訳は言語学的ルールを人手で作成する方式です。", keywords: ["統計的機械翻訳", "ルールベース機械翻訳"] },
      { id: 5, question: "STRIPSは何を目的としたシステムか？", options: ["画像認識", "行動計画（プランニング）", "音声合成", "データマイニング"], correct: 1, explanation: "STRIPS（Stanford Research Institute Problem Solver）は、1971年に開発されたロボットの行動計画システムで、状態・動作・目標を形式的に記述します。", keywords: ["STRIPS"] },
      { id: 6, question: "探索問題において、可能な状態の遷移を木構造で表したものを何と呼ぶか？", options: ["決定木", "探索木", "構文木", "二分木"], correct: 1, explanation: "探索木は、ある状態から可能なすべての状態遷移を木構造で表現したものです。幅優先探索や深さ優先探索で探索されます。", keywords: ["探索木"] },
      { id: 7, question: "3本の杭と複数の円盤を使い、ある杭から別の杭へ円盤を移動させるパズルは？", options: ["8パズル", "ハノイの塔", "15パズル", "ルービックキューブ"], correct: 1, explanation: "ハノイの塔は、探索アルゴリズムの典型的な例題として知られるパズルで、再帰的な解法が有名です。", keywords: ["ハノイの塔"] },
      { id: 8, question: "探索木において、浅いノードから順に探索する手法は？", options: ["深さ優先探索", "幅優先探索", "最良優先探索", "反復深化探索"], correct: 1, explanation: "幅優先探索（BFS）は、根から近い順にすべてのノードを探索します。最短経路を見つけるのに適しています。", keywords: ["幅優先探索"] },
      { id: 9, question: "探索木において、できる限り深く探索してから戻る手法は？", options: ["幅優先探索", "深さ優先探索", "A*探索", "ダイクストラ法"], correct: 1, explanation: "深さ優先探索（DFS）は、行き止まりに達するまで深く探索し、その後バックトラックします。メモリ効率が良いです。", keywords: ["深さ優先探索"] },
      { id: 10, question: "すべての可能な組み合わせを試す力任せの探索手法は？", options: ["ヒューリスティック探索", "ブルートフォース", "貪欲法", "動的計画法"], correct: 1, explanation: "ブルートフォース（総当たり法）は、解の候補をすべて列挙して正解を見つける方法です。計算量は大きいですが、必ず解を見つけられます。", keywords: ["ブルートフォース"] },
      { id: 11, question: "一般常識をコンピュータに蓄積しようとした大規模プロジェクトは？", options: ["DENDRALプロジェクト", "Cycプロジェクト", "東ロボプロジェクト", "ワトソンプロジェクト"], correct: 1, explanation: "Cycプロジェクトは1984年から開始され、人間の一般常識（約100万件以上の事実）をデータベース化しようとしました。", keywords: ["Cycプロジェクト"] },
      { id: 12, question: "有機化合物の分子構造を推論するために開発されたエキスパートシステムは？", options: ["MYCIN", "DENDRAL", "ELIZA", "SHRDLU"], correct: 1, explanation: "DENDRALは1965年に開発された最初のエキスパートシステムの一つで、質量分析データから有機化合物の構造を推論しました。", keywords: ["DENDRAL"] },
      { id: 13, question: "1966年に開発された、セラピストを模倣した対話システムは？", options: ["ワトソン", "Siri", "ELIZA", "Alexa"], correct: 2, explanation: "ELIZA（イライザ）は、ジョセフ・ワイゼンバウムによって開発された初期の対話システムで、パターンマッチングで応答を生成しました。", keywords: ["イライザ(ELIZA)"] },
      { id: 14, question: "感染症の診断と抗生物質の処方を支援するために開発されたエキスパートシステムは？", options: ["DENDRAL", "MYCIN", "Cyc", "STRIPS"], correct: 1, explanation: "MYCIN（マイシン）は1970年代に開発された医療診断用エキスパートシステムで、細菌感染症の診断と治療を支援しました。", keywords: ["マイシン(MYCIN)"] },
      { id: 15, question: "東京大学入試合格を目指したAIプロジェクトは？", options: ["ワトソン", "AlphaGo", "東ロボくん", "GPT"], correct: 2, explanation: "東ロボくんは、国立情報学研究所が推進した「ロボットは東大に入れるか」プロジェクトで、大学入試問題に挑戦しました。", keywords: ["東ロボくん"] },
      { id: 16, question: "データの次元数が増加すると、学習に必要なデータ量が指数関数的に増加する現象は？", options: ["過学習", "次元の呪い", "勾配消失", "局所最適解"], correct: 1, explanation: "次元の呪いは、高次元空間ではデータがスパースになり、有意な学習のために必要なデータ量が爆発的に増加する現象です。", keywords: ["次元の呪い"] },
      { id: 17, question: "迷惑メールを自動的に検出・分類するシステムは？", options: ["ファイアウォール", "スパムフィルタ", "アンチウイルス", "プロキシサーバ"], correct: 1, explanation: "スパムフィルタは、機械学習の代表的な応用例で、メールの特徴からスパムかどうかを自動判定します。ナイーブベイズなどが使われます。", keywords: ["スパムフィルタ"] },
      { id: 18, question: "Volume、Variety、Velocityの3Vで特徴づけられる大量のデータを何と呼ぶか？", options: ["オープンデータ", "ビッグデータ", "メタデータ", "構造化データ"], correct: 1, explanation: "ビッグデータは、量（Volume）、多様性（Variety）、速度（Velocity）の3Vを特徴とする大規模データで、機械学習の発展を支えています。", keywords: ["ビッグデータ"] },
      { id: 19, question: "ユーザーの好みに基づいて商品やコンテンツを推薦するシステムは？", options: ["検索エンジン", "レコメンデーションエンジン", "データマイニングツール", "分析ダッシュボード"], correct: 1, explanation: "レコメンデーションエンジンは、協調フィルタリングやコンテンツベースフィルタリングを用いて、ユーザーに適した推薦を行います。", keywords: ["レコメンデーションエンジン"] },
      { id: 20, question: "人間の脳における情報処理の仕組みは、ニューラルネットワークの着想の元となった。この脳の情報処理ネットワークを何と呼ぶか？", options: ["中枢神経系", "人間の神経回路", "大脳皮質", "シナプス結合"], correct: 1, explanation: "人間の神経回路（ニューロンとシナプスのネットワーク）の仕組みが、人工ニューラルネットワークの設計の着想源となりました。", keywords: ["人間の神経回路", "統計的自然言語処理"] }
    ]
  },
  chapter2: {
    id: 2,
    title: "機械学習の概要",
    subtitle: "Machine Learning Fundamentals",
    character: "📊",
    characterName: "MLマスター",
    quote: "データから学び、未来を予測せよ！",
    color: "#10B981",
    questions: [
      { id: 1, question: "複数の学習器を組み合わせて、より高い予測性能を得る手法の総称は？", options: ["転移学習", "アンサンブル学習", "強化学習", "半教師あり学習"], correct: 1, explanation: "アンサンブル学習は、バギング、ブースティング、スタッキングなどの手法で複数のモデルを組み合わせ、性能を向上させます。", keywords: ["アンサンブル学習"] },
      { id: 2, question: "SVMにおいて、データを高次元空間に写像するための関数は？", options: ["活性化関数", "カーネル", "誤差関数", "目的関数"], correct: 1, explanation: "カーネル関数は、データを高次元空間に暗黙的に写像し、線形分離不可能な問題を線形分離可能にします。RBFカーネルなどがあります。", keywords: ["カーネル"] },
      { id: 3, question: "説明変数と目的変数の関係を直線で表現する最も基本的な回帰手法は？", options: ["ロジスティック回帰", "線形回帰", "多項式回帰", "リッジ回帰"], correct: 1, explanation: "線形回帰は、目的変数と説明変数の間に線形関係を仮定し、最小二乗法などでパラメータを推定する基本的な回帰手法です。", keywords: ["線形回帰"] },
      { id: 4, question: "3クラス以上のカテゴリを予測する分類問題を何と呼ぶか？", options: ["二値分類", "多クラス分類", "多ラベル分類", "回帰問題"], correct: 1, explanation: "多クラス分類は、3つ以上のクラスから1つを予測する問題です。One-vs-Rest や One-vs-One などの手法で対応します。", keywords: ["多クラス分類"] },
      { id: 5, question: "データセットから重複を許してランダムにサンプリングする手法は？", options: ["層化サンプリング", "ブートストラップサンプリング", "系統サンプリング", "クラスタサンプリング"], correct: 1, explanation: "ブートストラップサンプリングは、元のデータセットから復元抽出でサンプルを作成し、バギングなどで使用されます。", keywords: ["ブートストラップサンプリング"] },
      { id: 6, question: "複数の時系列変数間の相互依存関係をモデル化する手法は？", options: ["ARモデル", "VARモデル", "ARIMAモデル", "GARCHモデル"], correct: 1, explanation: "VAR（Vector Autoregression）モデルは、複数の時系列変数が互いに影響し合う関係をモデル化します。", keywords: ["ベクトル自己回帰モデル(VARモデル)"] },
      { id: 7, question: "高次元データを2〜3次元に非線形に圧縮し、可視化するための手法は？", options: ["PCA", "t-SNE", "LDA", "SVD"], correct: 1, explanation: "t-SNE（t-distributed Stochastic Neighbor Embedding）は、高次元データの局所構造を保持しながら低次元に写像する可視化手法です。", keywords: ["t-SNE"] },
      { id: 8, question: "アイテム自体の特徴に基づいて推薦を行う手法は？", options: ["協調フィルタリング", "コンテンツベースフィルタリング", "ハイブリッドフィルタリング", "知識ベースフィルタリング"], correct: 1, explanation: "コンテンツベースフィルタリングは、アイテムの属性（ジャンル、キーワードなど）とユーザーの好みの類似性に基づいて推薦します。", keywords: ["コンテンツベースフィルタリング"] },
      { id: 9, question: "文書集合からトピックを抽出するための確率的生成モデルは？", options: ["TF-IDF", "Word2Vec", "潜在的ディリクレ配分法(LDA)", "BERT"], correct: 2, explanation: "LDA（Latent Dirichlet Allocation）は、文書がトピックの混合から生成されると仮定し、トピックを推定するモデルです。", keywords: ["潜在的ディリクレ配分法(LDA)"] },
      { id: 10, question: "データ間の距離関係を保持しながら低次元空間に配置する手法は？", options: ["PCA", "t-SNE", "多次元尺度構成法(MDS)", "UMAP"], correct: 2, explanation: "MDS（Multi-Dimensional Scaling）は、高次元データ間の距離行列を入力とし、距離関係を保持する低次元配置を求めます。", keywords: ["多次元尺度構成法(MDS)"] },
      { id: 11, question: "行列をより小さな行列の積に分解する手法で、推薦システムやデータ圧縮に使われるのは？", options: ["QR分解", "LU分解", "特異値分解(SVD)", "コレスキー分解"], correct: 2, explanation: "SVD（Singular Value Decomposition）は、行列を3つの行列の積に分解し、次元削減や協調フィルタリングで使用されます。", keywords: ["特異値分解(SVD)"] },
      { id: 12, question: "文書集合から潜在的な話題を発見するモデルの総称は？", options: ["言語モデル", "トピックモデル", "分類モデル", "回帰モデル"], correct: 1, explanation: "トピックモデルは、LDAやLSAなど、文書集合から潜在的なトピック（話題）を抽出するモデルの総称です。", keywords: ["トピックモデル"] },
      { id: 13, question: "バンディット問題において、探索と活用のバランスを取る方策で、信頼上限を用いるものは？", options: ["ε-greedy方策", "UCB方策", "ソフトマックス方策", "トンプソンサンプリング"], correct: 1, explanation: "UCB（Upper Confidence Bound）方策は、各アームの推定報酬の信頼上限を計算し、最大のものを選択します。", keywords: ["UCB方策"] },
      { id: 14, question: "強化学習において、ある状態にいることの価値を表す関数は？", options: ["行動価値関数", "状態価値関数", "報酬関数", "遷移関数"], correct: 1, explanation: "状態価値関数V(s)は、状態sから最適な方策に従って行動したときに得られる期待累積報酬を表します。", keywords: ["状態価値関数"] },
      { id: 15, question: "複数の選択肢から最適なものを探索する問題で、スロットマシンに例えられるのは？", options: ["バンディットアルゴリズム", "遺伝的アルゴリズム", "焼きなまし法", "粒子群最適化"], correct: 0, explanation: "バンディットアルゴリズムは、多腕バンディット問題を解くアルゴリズムで、A/Bテストや広告配信などに応用されます。", keywords: ["バンディットアルゴリズム"] },
      { id: 16, question: "環境との相互作用を状態、行動、報酬、遷移確率で定式化したモデルは？", options: ["隠れマルコフモデル", "マルコフ決定過程", "ベイジアンネットワーク", "条件付き確率場"], correct: 1, explanation: "MDP（Markov Decision Process）は、強化学習の基礎となる数学的フレームワークで、状態、行動、報酬、遷移確率で定義されます。", keywords: ["マルコフ決定過程"] },
      { id: 17, question: "強化学習において、将来の報酬を現在価値に割り引く係数は？", options: ["学習率", "割引率", "エントロピー係数", "温度パラメータ"], correct: 1, explanation: "割引率γ（0≤γ≤1）は、将来の報酬の重要度を制御します。γが小さいと近視眼的、大きいと長期的な視点で行動します。", keywords: ["割引率"] },
      { id: 18, question: "TD学習の一種で、現在の方策に従って次の行動を選択し、Q値を更新するアルゴリズムは？", options: ["Q学習", "SARSA", "Expected SARSA", "Double Q学習"], correct: 1, explanation: "SARSAはon-policy TD学習で、(State, Action, Reward, State', Action')の5つ組を使ってQ値を更新します。", keywords: ["SARSA"] },
      { id: 19, question: "予測値と実測値の差の絶対値の平均を取る評価指標は？", options: ["MSE", "RMSE", "MAE", "MAPE"], correct: 2, explanation: "MAE（Mean Absolute Error）は、予測誤差の絶対値の平均で、外れ値に対してMSEより頑健です。", keywords: ["平均絶対値誤差(MAE)"] },
      { id: 20, question: "データを訓練用と検証用に一度だけ分割して評価する方法は？", options: ["k分割交差検証", "ホールドアウト検証", "ブートストラップ検証", "Leave-one-out検証"], correct: 1, explanation: "ホールドアウト検証は、データを訓練セットとテストセットに一度だけ分割する最も単純な検証方法です。", keywords: ["ホールドアウト検証"] }
    ]
  },
  chapter3: {
    id: 3,
    title: "ニューラルネットワーク基礎",
    subtitle: "Neural Network Fundamentals",
    character: "🧠",
    characterName: "ニューロマスター",
    quote: "層を重ねて、知性を積み上げよ！",
    color: "#8B5CF6",
    questions: [
      { id: 1, question: "汎用的な処理を得意とし、逐次処理に適したプロセッサは？", options: ["GPU", "TPU", "CPU", "FPGA"], correct: 2, explanation: "CPU（Central Processing Unit）は汎用的な処理に優れ、複雑な分岐や逐次処理に適しています。", keywords: ["CPU"] },
      { id: 2, question: "元々はグラフィックス処理用に開発され、並列計算に優れたプロセッサは？", options: ["CPU", "GPU", "TPU", "NPU"], correct: 1, explanation: "GPU（Graphics Processing Unit）は多数のコアで並列計算を行い、ディープラーニングの学習に適しています。", keywords: ["GPU"] },
      { id: 3, question: "Googleが機械学習専用に開発した特化型プロセッサは？", options: ["GPU", "TPU", "CPU", "VPU"], correct: 1, explanation: "TPU（Tensor Processing Unit）は、テンソル演算に特化したGoogleの専用ASICで、学習・推論を高速に行います。", keywords: ["TPU"] },
      { id: 4, question: "ニューラルネットワークにおいて、入力と出力の間にある層を何と呼ぶか？", options: ["入力層", "出力層", "隠れ層", "全結合層"], correct: 2, explanation: "隠れ層（中間層）は入力層と出力層の間にあり、データの特徴を抽出・変換します。深いネットワークほど隠れ層が多くなります。", keywords: ["隠れ層・入力層・出力層"] },
      { id: 5, question: "隠れ層を複数持つニューラルネットワークを何と呼ぶか？", options: ["単純パーセプトロン", "多層パーセプトロン", "畳み込みネットワーク", "再帰型ネットワーク"], correct: 1, explanation: "多層パーセプトロン（MLP）は、1つ以上の隠れ層を持つフィードフォワードネットワークで、非線形問題を学習できます。", keywords: ["多層パーセプトロン"] },
      { id: 6, question: "隠れ層を持たず、線形分離可能な問題のみ解ける最も単純なニューラルネットワークは？", options: ["多層パーセプトロン", "単純パーセプトロン", "ボルツマンマシン", "ホップフィールドネットワーク"], correct: 1, explanation: "単純パーセプトロンは、入力層と出力層のみで構成され、XOR問題など線形分離不可能な問題は解けません。", keywords: ["単純パーセプトロン"] },
      { id: 7, question: "ReLUの問題点である「死んだニューロン」を緩和するため、負の入力に小さな傾きを持たせた活性化関数は？", options: ["ReLU", "Leaky ReLU関数", "ELU", "SELU"], correct: 1, explanation: "Leaky ReLUは、負の入力に対して小さな傾き（通常0.01）を持ち、勾配が完全にゼロになることを防ぎます。", keywords: ["Leaky ReLU関数"] },
      { id: 8, question: "出力範囲が-1から1で、シグモイド関数より勾配が大きい活性化関数は？", options: ["ReLU", "シグモイド関数", "tanh関数", "ソフトマックス関数"], correct: 2, explanation: "tanh関数（ハイパボリックタンジェント）は出力範囲が[-1,1]で、シグモイド関数より勾配消失が起きにくいです。", keywords: ["tanh関数"] },
      { id: 9, question: "多クラス分類の出力層で使用され、出力の総和が1になる活性化関数は？", options: ["ReLU", "シグモイド関数", "tanh関数", "ソフトマックス関数"], correct: 3, explanation: "ソフトマックス関数は、各クラスの確率を出力し、全クラスの確率の総和が1になります。", keywords: ["ソフトマックス関数"] },
      { id: 10, question: "負の入力を0に、正の入力をそのまま出力する、現在最も広く使われる活性化関数は？", options: ["シグモイド関数", "tanh関数", "ReLU関数", "恒等関数"], correct: 2, explanation: "ReLU（Rectified Linear Unit）は計算が単純で、勾配消失問題を緩和し、スパースな活性化を実現します。", keywords: ["ReLU関数"] },
      { id: 11, question: "ニューラルネットワークにおいて、損失関数の勾配を出力層から入力層に向けて計算するアルゴリズムは？", options: ["順伝播", "誤差逆伝播法", "勾配降下法", "確率的最適化"], correct: 1, explanation: "誤差逆伝播法（バックプロパゲーション）は、連鎖律を用いて効率的に各パラメータの勾配を計算します。", keywords: ["誤差逆伝播法"] },
      { id: 12, question: "パラメータ更新の大きさを制御するハイパーパラメータは？", options: ["バッチサイズ", "学習率", "エポック数", "モメンタム"], correct: 1, explanation: "学習率は、勾配降下法における更新ステップの大きさを決定し、大きすぎると発散、小さすぎると収束が遅くなります。", keywords: ["学習率"] },
      { id: 13, question: "訓練データ全体を1回学習することを何と呼ぶか？", options: ["イテレーション", "エポック", "バッチ", "ステップ"], correct: 1, explanation: "エポックは、訓練データセット全体を1回完全に学習することを指します。通常、複数エポックの学習が必要です。", keywords: ["エポック"] },
      { id: 14, question: "1回のパラメータ更新に使用するサンプル数は？", options: ["エポック数", "バッチサイズ", "学習率", "層の数"], correct: 1, explanation: "バッチサイズは、1回の勾配計算に使用するサンプル数で、メモリ使用量と学習の安定性に影響します。", keywords: ["バッチサイズ"] },
      { id: 15, question: "勾配の移動平均を利用して、パラメータ更新を安定させる手法は？", options: ["SGD", "モメンタム", "AdaGrad", "Dropout"], correct: 1, explanation: "モメンタムは、過去の勾配の移動平均を利用して、振動を抑え、収束を加速させる最適化手法です。", keywords: ["モメンタム"] },
      { id: 16, question: "AdaGradの学習率減衰問題を改善し、勾配の二乗の移動平均を使用する最適化手法は？", options: ["SGD", "Adam", "RMSprop", "AdaDelta"], correct: 2, explanation: "RMSpropは、AdaGradの急激な学習率低下を防ぐため、勾配の二乗の指数移動平均を使用します。", keywords: ["RMSprop"] },
      { id: 17, question: "モメンタムとRMSpropを組み合わせた、広く使われている最適化アルゴリズムは？", options: ["SGD", "AdaGrad", "Adam", "NAdam"], correct: 2, explanation: "Adam（Adaptive Moment Estimation）は、勾配の一次・二次モーメントの移動平均を使い、多くの問題で良好な性能を示します。", keywords: ["Adam"] },
      { id: 18, question: "学習中に各パラメータ別の学習率を、過去の勾配に基づいて調整する手法は？", options: ["SGD", "AdaGrad", "モメンタム", "バッチ正規化"], correct: 1, explanation: "AdaGradは、頻繁に更新されるパラメータの学習率を小さく、まれに更新されるパラメータの学習率を大きくします。", keywords: ["AdaGrad"] },
      { id: 19, question: "勾配を損失の等高線に対して垂直方向に更新する最も基本的な最適化手法は？", options: ["勾配降下法", "ニュートン法", "遺伝的アルゴリズム", "焼きなまし法"], correct: 0, explanation: "勾配降下法は、損失関数の勾配（微分）の逆方向にパラメータを更新し、損失を最小化する基本的な最適化手法です。", keywords: ["勾配降下法"] },
      { id: 20, question: "各ミニバッチでランダムにサンプルを選んで勾配を計算する手法は？", options: ["バッチ勾配降下法", "確率的勾配降下法(SGD)", "ミニバッチ勾配降下法", "オンライン学習"], correct: 1, explanation: "SGD（Stochastic Gradient Descent）は、1つまたは少数のサンプルで勾配を計算し、計算効率と収束速度を向上させます。", keywords: ["確率的勾配降下法(SGD)"] }
    ]
  },
  chapter4: {
    id: 4,
    title: "ディープラーニング発展",
    subtitle: "Advanced Deep Learning",
    character: "🚀",
    characterName: "ディープマスター",
    quote: "深く学び、高く飛べ！",
    color: "#F59E0B",
    questions: [
      { id: 1, question: "画像認識タスクにおいて、局所的な特徴を抽出するために使用される層は？", options: ["全結合層", "畳み込み層", "プーリング層", "正規化層"], correct: 1, explanation: "畳み込み層は、フィルタを画像上でスライドさせ、エッジや模様などの局所的な特徴を抽出します。", keywords: ["畳み込み層"] },
      { id: 2, question: "CNNにおいて、特徴マップのサイズを縮小し、位置の変化に対する頑健性を高める層は？", options: ["畳み込み層", "全結合層", "プーリング層", "ドロップアウト層"], correct: 2, explanation: "プーリング層は、特徴マップを縮小し、計算量を削減するとともに、位置ずれに対する頑健性を向上させます。", keywords: ["プーリング層"] },
      { id: 3, question: "2012年のImageNet競技会で優勝し、ディープラーニングブームの火付け役となったCNNは？", options: ["VGGNet", "AlexNet", "GoogLeNet", "ResNet"], correct: 1, explanation: "AlexNetは、2012年のILSVRCで圧倒的な性能を示し、ディープラーニングの実用性を世界に示しました。", keywords: ["AlexNet"] },
      { id: 4, question: "非常に深いネットワークでも学習可能にするスキップ接続を導入したアーキテクチャは？", options: ["VGGNet", "AlexNet", "GoogLeNet", "ResNet"], correct: 3, explanation: "ResNet（Residual Network）は、スキップ接続（残差接続）により、100層以上の深いネットワークの学習を可能にしました。", keywords: ["ResNet"] },
      { id: 5, question: "異なるサイズのフィルタを並列に適用するInceptionモジュールを導入したネットワークは？", options: ["VGGNet", "AlexNet", "GoogLeNet", "ResNet"], correct: 2, explanation: "GoogLeNet（Inception）は、1×1、3×3、5×5の畳み込みを並列に適用し、多様なスケールの特徴を効率的に抽出します。", keywords: ["GoogLeNet"] },
      { id: 6, question: "3×3の小さなフィルタを多層に重ねることで深いネットワークを実現したアーキテクチャは？", options: ["VGGNet", "AlexNet", "GoogLeNet", "ResNet"], correct: 0, explanation: "VGGNetは、3×3の小さな畳み込みフィルタを多数重ねることで、シンプルながら高い性能を実現しました。", keywords: ["VGGNet"] },
      { id: 7, question: "画像のセグメンテーションに使用される、エンコーダ・デコーダ構造を持つネットワークは？", options: ["AlexNet", "ResNet", "U-Net", "YOLO"], correct: 2, explanation: "U-Netは、収縮パスと拡張パスを持つU字型の構造で、医療画像セグメンテーションなどで広く使用されています。", keywords: ["U-Net"] },
      { id: 8, question: "物体検出において、画像を一度だけ見て検出を行う高速なアルゴリズムは？", options: ["R-CNN", "Fast R-CNN", "YOLO", "Faster R-CNN"], correct: 2, explanation: "YOLO（You Only Look Once）は、画像全体を一度のニューラルネットワーク処理で物体検出を行い、リアルタイム処理を実現します。", keywords: ["YOLO"] },
      { id: 9, question: "物体検出において、候補領域の生成にニューラルネットワークを使用するアーキテクチャは？", options: ["R-CNN", "Fast R-CNN", "Faster R-CNN", "YOLO"], correct: 2, explanation: "Faster R-CNNは、Region Proposal Network（RPN）を導入し、候補領域生成を高速化しました。", keywords: ["Faster R-CNN"] },
      { id: 10, question: "時系列データの処理に適した、過去の情報を保持できるニューラルネットワークは？", options: ["CNN", "RNN", "GAN", "Autoencoder"], correct: 1, explanation: "RNN（Recurrent Neural Network）は、隠れ状態を通じて過去の情報を保持し、時系列データや自然言語処理に使用されます。", keywords: ["RNN"] },
      { id: 11, question: "RNNの勾配消失問題を解決するために開発された、ゲート機構を持つユニットは？", options: ["GRU", "LSTM", "Transformer", "Attention"], correct: 1, explanation: "LSTM（Long Short-Term Memory）は、入力・忘却・出力ゲートにより、長期依存関係を学習できます。", keywords: ["LSTM"] },
      { id: 12, question: "LSTMを簡略化し、パラメータ数を削減したゲート付きRNNユニットは？", options: ["Simple RNN", "LSTM", "GRU", "Bidirectional RNN"], correct: 2, explanation: "GRU（Gated Recurrent Unit）は、更新ゲートとリセットゲートの2つのゲートで、LSTMと同等の性能を少ないパラメータで実現します。", keywords: ["GRU"] },
      { id: 13, question: "入力系列の各要素に重要度の重みを付けて処理する機構は？", options: ["プーリング", "正規化", "アテンション機構", "ドロップアウト"], correct: 2, explanation: "アテンション機構は、入力の各部分に対する重要度を動的に計算し、重要な情報に焦点を当てることができます。", keywords: ["アテンション機構"] },
      { id: 14, question: "RNNを使わず、Self-Attentionのみで系列を処理するアーキテクチャは？", options: ["LSTM", "GRU", "Transformer", "Seq2Seq"], correct: 2, explanation: "Transformerは、Self-Attentionにより並列処理が可能で、BERTやGPTなど多くの言語モデルの基盤となっています。", keywords: ["Transformer"] },
      { id: 15, question: "Transformerで使用される、同一系列内の要素間の関係を学習する機構は？", options: ["Cross-Attention", "Self-Attention", "Multi-Head Attention", "Scaled Attention"], correct: 1, explanation: "Self-Attention（自己注意）は、同じ系列内の各要素が他のすべての要素との関係を学習します。", keywords: ["Self-Attention"] },
      { id: 16, question: "生成器と識別器が競い合いながら学習する生成モデルは？", options: ["VAE", "GAN", "Autoencoder", "RBM"], correct: 1, explanation: "GAN（Generative Adversarial Network）は、生成器が本物らしいデータを生成し、識別器が本物と偽物を見分ける敵対的学習を行います。", keywords: ["GAN"] },
      { id: 17, question: "入力を低次元の潜在表現に圧縮し、そこから復元するネットワークは？", options: ["GAN", "オートエンコーダ", "RNN", "CNN"], correct: 1, explanation: "オートエンコーダは、エンコーダで圧縮、デコーダで復元を行い、次元削減や特徴学習に使用されます。", keywords: ["オートエンコーダ"] },
      { id: 18, question: "潜在空間を確率分布としてモデル化し、新しいサンプルを生成できるオートエンコーダは？", options: ["スパースオートエンコーダ", "デノイジングオートエンコーダ", "VAE", "コントラクティブオートエンコーダ"], correct: 2, explanation: "VAE（Variational Autoencoder）は、潜在空間を確率分布として扱い、多様なサンプルを生成できます。", keywords: ["VAE"] },
      { id: 19, question: "学習済みモデルを別のタスクに適用する手法は？", options: ["アンサンブル学習", "転移学習", "強化学習", "能動学習"], correct: 1, explanation: "転移学習は、大規模データで学習した知識を、データが少ない別のタスクに転用し、効率的に学習します。", keywords: ["転移学習"] },
      { id: 20, question: "転移学習において、事前学習済みモデルを特定のタスク向けに追加学習することを何と呼ぶか？", options: ["プレトレーニング", "ファインチューニング", "蒸留", "プルーニング"], correct: 1, explanation: "ファインチューニングは、事前学習モデルの重みを初期値として、対象タスクのデータで追加学習を行います。", keywords: ["ファインチューニング"] }
    ]
  },
  chapter5: {
    id: 5,
    title: "自然言語処理と画像処理",
    subtitle: "NLP & Computer Vision",
    character: "💬",
    characterName: "言語＆視覚マスター",
    quote: "言葉と画像を操り、世界を理解せよ！",
    color: "#EC4899",
    questions: [
      { id: 1, question: "テキストを単語やサブワードなどの単位に分割する処理は？", options: ["ステミング", "トークナイズ", "正規化", "エンコーディング"], correct: 1, explanation: "トークナイズ（トークン化）は、テキストを処理可能な最小単位（トークン）に分割する前処理です。", keywords: ["トークナイズ"] },
      { id: 2, question: "単語の活用形を原形に戻す処理で、辞書に基づいて行うものは？", options: ["ステミング", "レンマ化", "正規化", "形態素解析"], correct: 1, explanation: "レンマ化（見出し語化）は、辞書を用いて単語を原形（レンマ）に変換します。例：\"running\" → \"run\"", keywords: ["レンマ化"] },
      { id: 3, question: "単語を固定次元のベクトルに変換する表現方法の総称は？", options: ["One-hot表現", "単語埋め込み", "TF-IDF", "Bag of Words"], correct: 1, explanation: "単語埋め込み（Word Embedding）は、意味的に類似した単語が近いベクトルになるように学習された密なベクトル表現です。", keywords: ["単語埋め込み"] },
      { id: 4, question: "周囲の単語から中心の単語を予測する学習方式は？", options: ["CBOW", "Skip-gram", "FastText", "GloVe"], correct: 0, explanation: "CBOW（Continuous Bag of Words）は、文脈（周囲の単語）から中心の単語を予測するWord2Vecの学習方式です。", keywords: ["CBOW"] },
      { id: 5, question: "中心の単語から周囲の単語を予測する学習方式は？", options: ["CBOW", "Skip-gram", "FastText", "ELMo"], correct: 1, explanation: "Skip-gramは、中心の単語から周囲の単語を予測するWord2Vecの学習方式で、低頻度語に強いです。", keywords: ["Skip-gram"] },
      { id: 6, question: "大規模コーパスで事前学習し、様々なタスクで高い性能を示す双方向Transformerモデルは？", options: ["GPT", "BERT", "ELMo", "Word2Vec"], correct: 1, explanation: "BERT（Bidirectional Encoder Representations from Transformers）は、マスク言語モデルと次文予測で事前学習します。", keywords: ["BERT"] },
      { id: 7, question: "左から右への言語モデルで学習し、テキスト生成に優れた大規模言語モデルは？", options: ["BERT", "GPT", "T5", "XLNet"], correct: 1, explanation: "GPT（Generative Pre-trained Transformer）は、自己回帰的に次の単語を予測する言語モデルで、文章生成に優れています。", keywords: ["GPT"] },
      { id: 8, question: "質問文と文書から回答を抽出するNLPタスクは？", options: ["機械翻訳", "質問応答", "感情分析", "要約"], correct: 1, explanation: "質問応答（Question Answering）は、質問に対する回答を文書から抽出または生成するタスクです。", keywords: ["質問応答"] },
      { id: 9, question: "文書の主要な内容を短くまとめるNLPタスクは？", options: ["機械翻訳", "質問応答", "感情分析", "要約"], correct: 3, explanation: "要約（Summarization）は、文書の重要な情報を保持しながら短くまとめるタスクで、抽出型と生成型があります。", keywords: ["要約"] },
      { id: 10, question: "テキストから人名・地名・組織名などの固有名詞を抽出するタスクは？", options: ["品詞タグ付け", "固有表現抽出", "構文解析", "共参照解析"], correct: 1, explanation: "固有表現抽出（NER: Named Entity Recognition）は、テキストから固有名詞とその種類を特定します。", keywords: ["固有表現抽出"] },
      { id: 11, question: "画像から物体のカテゴリを判定するタスクは？", options: ["画像分類", "物体検出", "セマンティックセグメンテーション", "インスタンスセグメンテーション"], correct: 0, explanation: "画像分類は、画像全体を1つまたは複数のカテゴリに分類するタスクです。", keywords: ["画像分類"] },
      { id: 12, question: "画像内の物体の位置をバウンディングボックスで特定するタスクは？", options: ["画像分類", "物体検出", "セマンティックセグメンテーション", "姿勢推定"], correct: 1, explanation: "物体検出は、画像内の物体の位置（バウンディングボックス）とカテゴリを同時に予測します。", keywords: ["物体検出"] },
      { id: 13, question: "画像の各ピクセルにカテゴリラベルを割り当てるタスクは？", options: ["画像分類", "物体検出", "セマンティックセグメンテーション", "インスタンスセグメンテーション"], correct: 2, explanation: "セマンティックセグメンテーションは、画像の各ピクセルをカテゴリに分類しますが、同一カテゴリの個体は区別しません。", keywords: ["セマンティックセグメンテーション"] },
      { id: 14, question: "セマンティックセグメンテーションに加えて、同一カテゴリの個体を区別するタスクは？", options: ["パノプティックセグメンテーション", "物体検出", "セマンティックセグメンテーション", "インスタンスセグメンテーション"], correct: 3, explanation: "インスタンスセグメンテーションは、各ピクセルのカテゴリに加えて、同一カテゴリの異なるインスタンスを区別します。", keywords: ["インスタンスセグメンテーション"] },
      { id: 15, question: "画像の内容を自然言語で説明するタスクは？", options: ["画像分類", "物体検出", "画像キャプショニング", "視覚的質問応答"], correct: 2, explanation: "画像キャプショニングは、画像の内容を説明する自然言語文を生成するタスクです。", keywords: ["画像キャプショニング"] },
      { id: 16, question: "画像に関する質問に自然言語で回答するタスクは？", options: ["画像キャプショニング", "視覚的質問応答(VQA)", "画像検索", "画像生成"], correct: 1, explanation: "VQA（Visual Question Answering）は、画像と質問を入力として、適切な回答を生成するマルチモーダルタスクです。", keywords: ["視覚的質問応答(VQA)"] },
      { id: 17, question: "テキストの説明から画像を生成するモデルの代表例は？", options: ["BERT", "GPT", "Stable Diffusion", "ResNet"], correct: 2, explanation: "Stable Diffusionは、テキストプロンプトから高品質な画像を生成する拡散モデルベースの生成AIです。", keywords: ["Stable Diffusion"] },
      { id: 18, question: "ノイズを徐々に除去しながら画像を生成する生成モデルは？", options: ["GAN", "VAE", "拡散モデル", "オートエンコーダ"], correct: 2, explanation: "拡散モデル（Diffusion Model）は、ノイズから始めて徐々にノイズを除去し、高品質な画像を生成します。", keywords: ["拡散モデル"] },
      { id: 19, question: "人間の顔の画像から年齢、性別、表情などを認識するタスクは？", options: ["物体検出", "顔認識", "姿勢推定", "行動認識"], correct: 1, explanation: "顔認識は、顔の検出、特徴抽出、属性認識（年齢・性別・表情など）、個人識別などを含む技術です。", keywords: ["顔認識"] },
      { id: 20, question: "動画から人物の動作や行動を認識するタスクは？", options: ["姿勢推定", "物体追跡", "行動認識", "シーン認識"], correct: 2, explanation: "行動認識（Action Recognition）は、動画から人物の動作や行動（歩く、走る、手を振るなど）を識別します。", keywords: ["行動認識"] }
    ]
  },
  chapter6: {
    id: 6,
    title: "深層学習の応用技術",
    subtitle: "Applied Deep Learning",
    character: "⚡",
    characterName: "応用技術マスター",
    quote: "技術を磨き、限界を超えろ！",
    color: "#06B6D4",
    questions: [
      { id: 1, question: "学習時にランダムにユニットを無効化し、過学習を防ぐ正則化手法は？", options: ["L1正則化", "L2正則化", "ドロップアウト", "バッチ正規化"], correct: 2, explanation: "ドロップアウトは、学習時にランダムにニューロンを無効化し、アンサンブル効果で過学習を防ぎます。", keywords: ["ドロップアウト"] },
      { id: 2, question: "各ミニバッチで入力を正規化し、学習を安定させる手法は？", options: ["L1正則化", "L2正則化", "ドロップアウト", "バッチ正規化"], correct: 3, explanation: "バッチ正規化は、各層の入力を正規化し、内部共変量シフトを軽減して学習を高速化・安定化します。", keywords: ["バッチ正規化"] },
      { id: 3, question: "訓練データを回転、反転、拡大縮小などで増やし、汎化性能を向上させる手法は？", options: ["転移学習", "データ拡張", "アンサンブル学習", "正則化"], correct: 1, explanation: "データ拡張（Data Augmentation）は、既存のデータに変換を加えて訓練データを増やし、過学習を防ぎます。", keywords: ["データ拡張"] },
      { id: 4, question: "学習を早期に停止して過学習を防ぐ手法は？", options: ["ドロップアウト", "L2正則化", "早期終了", "勾配クリッピング"], correct: 2, explanation: "早期終了（Early Stopping）は、検証損失が改善しなくなった時点で学習を停止し、過学習を防ぎます。", keywords: ["早期終了"] },
      { id: 5, question: "モデルの重みに罰則項を加え、複雑さを制限する手法の総称は？", options: ["正則化", "最適化", "正規化", "標準化"], correct: 0, explanation: "正則化は、L1（Lasso）やL2（Ridge）などの罰則項を損失関数に加え、モデルの複雑さを制限します。", keywords: ["正則化"] },
      { id: 6, question: "複雑な大規模モデルの知識を、小型モデルに転移する手法は？", options: ["転移学習", "ファインチューニング", "知識蒸留", "プルーニング"], correct: 2, explanation: "知識蒸留（Knowledge Distillation）は、教師モデルの出力分布を模倣するように生徒モデルを学習させます。", keywords: ["知識蒸留"] },
      { id: 7, question: "ニューラルネットワークの不要な接続や重みを削除して軽量化する手法は？", options: ["量子化", "枝刈り", "蒸留", "正則化"], correct: 1, explanation: "枝刈り（プルーニング）は、重要度の低い重みや接続を削除し、モデルサイズと計算量を削減します。", keywords: ["枝刈り"] },
      { id: 8, question: "重みを低ビット（例：8ビット整数）で表現し、計算を高速化する手法は？", options: ["枝刈り", "量子化", "蒸留", "スパース化"], correct: 1, explanation: "量子化は、32ビット浮動小数点を8ビット整数などに変換し、モデルサイズ削減と推論高速化を実現します。", keywords: ["量子化"] },
      { id: 9, question: "クラウドではなく、端末側でAI処理を行うことを何と呼ぶか？", options: ["クラウドAI", "エッジAI", "分散AI", "フェデレーテッドAI"], correct: 1, explanation: "エッジAIは、スマートフォンやIoTデバイスなど端末側でAI推論を行い、低遅延とプライバシー保護を実現します。", keywords: ["エッジAI"] },
      { id: 10, question: "入力データの微小な摂動で、モデルを誤分類させる攻撃は？", options: ["データポイズニング", "敵対的攻撃", "モデル窃取", "メンバーシップ推論"], correct: 1, explanation: "敵対的攻撃は、人間には知覚できない微小なノイズを加え、モデルに誤った予測をさせる攻撃です。", keywords: ["敵対的攻撃"] },
      { id: 11, question: "モデルの予測根拠を人間が理解できるように説明する技術の総称は？", options: ["説明可能AI(XAI)", "フェアネスAI", "信頼できるAI", "責任あるAI"], correct: 0, explanation: "XAI（説明可能AI）は、モデルの判断根拠を可視化・説明し、ブラックボックス問題を解決しようとする技術です。", keywords: ["説明可能AI(XAI)"] },
      { id: 12, question: "画像分類において、予測に寄与した領域をヒートマップで可視化する手法は？", options: ["LIME", "SHAP", "Grad-CAM", "Attention可視化"], correct: 2, explanation: "Grad-CAMは、勾配情報を使って、CNNの予測に重要な画像領域をヒートマップで可視化します。", keywords: ["Grad-CAM"] },
      { id: 13, question: "入力特徴の貢献度を、ゲーム理論に基づいて計算する説明手法は？", options: ["LIME", "SHAP", "Grad-CAM", "積分勾配"], correct: 1, explanation: "SHAP（SHapley Additive exPlanations）は、シャプレイ値を用いて各特徴量の貢献度を公平に算出します。", keywords: ["SHAP"] },
      { id: 14, question: "任意のモデルを、解釈可能な局所モデルで近似して説明する手法は？", options: ["LIME", "SHAP", "Grad-CAM", "Saliency Map"], correct: 0, explanation: "LIME（Local Interpretable Model-agnostic Explanations）は、予測の近傍で線形モデルを学習し、局所的な説明を提供します。", keywords: ["LIME"] },
      { id: 15, question: "学習データを各端末に分散させたまま、モデルを協調学習する手法は？", options: ["分散学習", "連合学習", "転移学習", "マルチタスク学習"], correct: 1, explanation: "連合学習（Federated Learning）は、データを端末に保持したまま、モデル更新のみを集約してプライバシーを保護します。", keywords: ["連合学習"] },
      { id: 16, question: "複数のGPUで学習データを分割し、並列に学習を行う手法は？", options: ["モデル並列", "データ並列", "パイプライン並列", "テンソル並列"], correct: 1, explanation: "データ並列は、各GPUに異なるミニバッチを割り当て、勾配を集約することで学習を高速化します。", keywords: ["データ並列"] },
      { id: 17, question: "大規模モデルを複数のGPUに分割して配置する並列化手法は？", options: ["モデル並列", "データ並列", "同期並列", "非同期並列"], correct: 0, explanation: "モデル並列は、1つのGPUに収まらない大規模モデルを、複数のGPUに分割して配置します。", keywords: ["モデル並列"] },
      { id: 18, question: "ニューラルネットワークのハイパーパラメータを自動的に探索する技術は？", options: ["グリッドサーチ", "ランダムサーチ", "AutoML", "転移学習"], correct: 2, explanation: "AutoML（Automated Machine Learning）は、アーキテクチャやハイパーパラメータの探索を自動化します。", keywords: ["AutoML"] },
      { id: 19, question: "ニューラルネットワークの構造自体を自動的に探索する手法は？", options: ["ハイパーパラメータ最適化", "ニューラルアーキテクチャ探索(NAS)", "グリッドサーチ", "ベイズ最適化"], correct: 1, explanation: "NAS（Neural Architecture Search）は、層の数、種類、接続などのネットワーク構造を自動的に探索します。", keywords: ["ニューラルアーキテクチャ探索(NAS)"] },
      { id: 20, question: "人間のフィードバック（報酬）を用いてAIモデルを調整する手法は？", options: ["教師あり学習", "教師なし学習", "RLHF", "自己教師あり学習"], correct: 2, explanation: "RLHF（Reinforcement Learning from Human Feedback）は、人間の評価を報酬として強化学習を行い、モデルを改善します。", keywords: ["RLHF"] }
    ]
  },
  chapter7: {
    id: 7,
    title: "AI数学的基礎",
    subtitle: "Mathematical Foundations",
    character: "📐",
    characterName: "マスマティシャン",
    quote: "数式を制する者は、AIを制す！",
    color: "#6366F1",
    questions: [
      { id: 1, question: "データの要素を順序付けて並べた数学的な構造は？", options: ["スカラー", "ベクトル", "行列", "テンソル"], correct: 1, explanation: "ベクトルは、数値を順序付けて並べた1次元配列で、方向と大きさを持つ量を表現します。", keywords: ["ベクトル"] },
      { id: 2, question: "数値を行と列で2次元に配置した数学的構造は？", options: ["スカラー", "ベクトル", "行列", "テンソル"], correct: 2, explanation: "行列は、数値を行と列に配置した2次元配列で、線形変換やデータセットの表現に使用されます。", keywords: ["行列"] },
      { id: 3, question: "ベクトルや行列を多次元に一般化した数学的構造は？", options: ["スカラー", "ベクトル", "行列", "テンソル"], correct: 3, explanation: "テンソルは、スカラー（0階）、ベクトル（1階）、行列（2階）を含む多次元配列の一般化です。", keywords: ["テンソル"] },
      { id: 4, question: "2つのベクトルの各要素の積の和として定義される演算は？", options: ["外積", "内積", "アダマール積", "クロス積"], correct: 1, explanation: "内積（ドット積）は、ベクトル間の類似度を測る基本的な演算で、コサイン類似度の計算に使用されます。", keywords: ["内積"] },
      { id: 5, question: "行列の行と列を入れ替える操作は？", options: ["逆行列", "転置", "固有値分解", "特異値分解"], correct: 1, explanation: "転置は、行列の行と列を入れ替える操作で、A^T と表記されます。(A^T)^T = A が成り立ちます。", keywords: ["転置"] },
      { id: 6, question: "ある行列と掛けると単位行列になる行列は？", options: ["転置行列", "逆行列", "対角行列", "正則行列"], correct: 1, explanation: "逆行列A^(-1)は、AA^(-1) = A^(-1)A = I（単位行列）を満たす行列で、正則行列にのみ存在します。", keywords: ["逆行列"] },
      { id: 7, question: "行列の特性を表す、行列式がゼロでない性質を何と呼ぶか？", options: ["正定値性", "正則性", "対称性", "直交性"], correct: 1, explanation: "正則（非特異）行列は、行列式がゼロでなく、逆行列が存在する行列です。", keywords: ["正則行列"] },
      { id: 8, question: "Ax = λx を満たすスカラーλを何と呼ぶか？", options: ["特異値", "固有値", "行列式", "トレース"], correct: 1, explanation: "固有値は、行列Aによる変換で方向が変わらないベクトル（固有ベクトル）のスケーリング係数です。", keywords: ["固有値"] },
      { id: 9, question: "関数の入力に対する出力の変化率を表すものは？", options: ["積分", "微分", "極限", "級数"], correct: 1, explanation: "微分は、関数の瞬間的な変化率（傾き）を表し、ニューラルネットワークの最適化で重要です。", keywords: ["微分"] },
      { id: 10, question: "多変数関数の各変数に対する偏微分を並べたベクトルは？", options: ["ヤコビアン", "ヘッシアン", "勾配", "発散"], correct: 2, explanation: "勾配（グラディエント）は、関数の最も急な増加方向を示し、勾配降下法で使用されます。", keywords: ["勾配"] },
      { id: 11, question: "合成関数の微分を計算するための規則は？", options: ["積の法則", "商の法則", "連鎖律", "べき乗則"], correct: 2, explanation: "連鎖律（Chain Rule）は、誤差逆伝播法の基礎となる規則で、合成関数の微分を計算します。", keywords: ["連鎖律"] },
      { id: 12, question: "事象の起こりやすさを0から1の値で表すものは？", options: ["期待値", "分散", "確率", "尤度"], correct: 2, explanation: "確率は、事象の起こりやすさを0（絶対に起こらない）から1（必ず起こる）の値で表します。", keywords: ["確率"] },
      { id: 13, question: "確率変数の取りうる値の加重平均は？", options: ["分散", "期待値", "標準偏差", "中央値"], correct: 1, explanation: "期待値は、確率変数の各値にその確率を掛けて足し合わせたもので、平均的な値を表します。", keywords: ["期待値"] },
      { id: 14, question: "データが平均からどれだけ散らばっているかを表す指標は？", options: ["期待値", "分散", "共分散", "相関係数"], correct: 1, explanation: "分散は、データの散らばり具合を表す指標で、各データと平均との差の2乗の平均です。", keywords: ["分散"] },
      { id: 15, question: "P(A|B)をP(B|A)、P(A)、P(B)で表す定理は？", options: ["大数の法則", "中心極限定理", "ベイズの定理", "全確率の定理"], correct: 2, explanation: "ベイズの定理は、事後確率を計算する公式で、ナイーブベイズ分類器などの基礎となります。", keywords: ["ベイズの定理"] },
      { id: 16, question: "2つの確率分布の違いを測る非対称な尺度は？", options: ["ユークリッド距離", "KLダイバージェンス", "コサイン類似度", "マハラノビス距離"], correct: 1, explanation: "KLダイバージェンス（カルバック・ライブラー情報量）は、2つの確率分布の差異を測る非対称な尺度です。", keywords: ["KLダイバージェンス"] },
      { id: 17, question: "確率分布の不確実性を測る指標は？", options: ["分散", "エントロピー", "尤度", "対数損失"], correct: 1, explanation: "エントロピーは、確率分布の不確実性（情報量）を測る指標で、交差エントロピー損失の基礎となります。", keywords: ["エントロピー"] },
      { id: 18, question: "観測データが得られる確率を、パラメータの関数として見たものは？", options: ["確率", "尤度", "事後確率", "事前確率"], correct: 1, explanation: "尤度は、パラメータを固定したときに観測データが得られる確率で、最尤推定で最大化されます。", keywords: ["尤度"] },
      { id: 19, question: "正規分布の形状を決める2つのパラメータは？", options: ["最小値と最大値", "中央値と最頻値", "平均と分散", "歪度と尖度"], correct: 2, explanation: "正規分布（ガウス分布）は、平均μと分散σ²の2つのパラメータで形状が決まる連続確率分布です。", keywords: ["正規分布"] },
      { id: 20, question: "2つの確率変数が互いに影響しない関係を何と呼ぶか？", options: ["相関", "独立", "従属", "共変"], correct: 1, explanation: "独立は、一方の値が他方の値に影響しない関係で、P(A∩B) = P(A)P(B) が成り立ちます。", keywords: ["独立"] }
    ]
  },
  chapter8: {
    id: 8,
    title: "AI開発と運用",
    subtitle: "AI Development & Operations",
    character: "🛠",
    characterName: "DevOpsマスター",
    quote: "開発と運用を極め、AIを社会実装せよ！",
    color: "#84CC16",
    questions: [
      { id: 1, question: "機械学習モデルの開発・デプロイ・運用を自動化・効率化する実践手法は？", options: ["DevOps", "MLOps", "DataOps", "AIOps"], correct: 1, explanation: "MLOps（Machine Learning Operations）は、MLモデルのライフサイクル全体を管理する実践手法です。", keywords: ["MLOps"] },
      { id: 2, question: "学習済みモデルを本番環境に配置して、実際のサービスで利用可能にすることを何と呼ぶか？", options: ["学習", "推論", "デプロイ", "チューニング"], correct: 2, explanation: "デプロイ（展開）は、学習済みモデルを本番環境に配置し、実際のサービスで利用可能にするプロセスです。", keywords: ["デプロイ"] },
      { id: 3, question: "本番環境でモデルの入出力や性能を継続的に監視することを何と呼ぶか？", options: ["テスト", "モニタリング", "デバッグ", "プロファイリング"], correct: 1, explanation: "モニタリングは、本番環境でのモデル性能、入出力データ、システムリソースを継続的に監視します。", keywords: ["モニタリング"] },
      { id: 4, question: "時間の経過とともに、データの統計的性質が変化する現象は？", options: ["過学習", "データドリフト", "概念ドリフト", "モデル劣化"], correct: 1, explanation: "データドリフトは、本番データの分布が学習データと異なってくる現象で、モデル性能低下の原因となります。", keywords: ["データドリフト"] },
      { id: 5, question: "入力と出力の関係性（タスクの性質）自体が変化する現象は？", options: ["データドリフト", "概念ドリフト", "共変量シフト", "ラベルシフト"], correct: 1, explanation: "概念ドリフトは、予測対象の関係性自体が変化する現象で、データドリフトより対処が難しいです。", keywords: ["概念ドリフト"] },
      { id: 6, question: "学習データの前処理、モデル学習、評価の一連の流れを自動化したものは？", options: ["ETL", "機械学習パイプライン", "CI/CD", "データウェアハウス"], correct: 1, explanation: "機械学習パイプラインは、データ処理から学習・評価・デプロイまでの一連のワークフローを自動化します。", keywords: ["機械学習パイプライン"] },
      { id: 7, question: "実験の再現性を確保するために、データ、コード、モデル、パラメータを管理することは？", options: ["バージョン管理", "構成管理", "実験管理", "リリース管理"], correct: 2, explanation: "実験管理は、機械学習実験の再現性のために、すべての要素（データ、コード、パラメータ、結果）を追跡します。", keywords: ["実験管理"] },
      { id: 8, question: "AIシステム開発の各段階をクロスファンクショナルなチームで進める開発プロセスは？", options: ["ウォーターフォール", "アジャイル", "CRISP-DM", "スクラム"], correct: 2, explanation: "CRISP-DM（Cross-Industry Standard Process for Data Mining）は、データマイニング・ML開発の標準的なプロセスモデルです。", keywords: ["CRISP-DM"] },
      { id: 9, question: "モデルの学習に使用するデータの品質、量、偏りなどを評価することを何と呼ぶか？", options: ["モデル評価", "データ品質評価", "A/Bテスト", "クロスバリデーション"], correct: 1, explanation: "データ品質評価は、欠損値、外れ値、重複、バイアスなど、学習データの品質を多角的に評価します。", keywords: ["データ品質評価"] },
      { id: 10, question: "個人を特定できる情報を加工し、特定できないようにする処理は？", options: ["暗号化", "匿名化", "正規化", "標準化"], correct: 1, explanation: "匿名化は、個人情報を加工して個人を特定できないようにする処理で、k-匿名化などの手法があります。", keywords: ["匿名化"] },
      { id: 11, question: "機械学習で使用するデータを収集・整理・保管するための基盤は？", options: ["データレイク", "データウェアハウス", "データマート", "データベース"], correct: 0, explanation: "データレイクは、構造化・非構造化を問わず、大量の生データをそのまま保管するストレージ基盤です。", keywords: ["データレイク"] },
      { id: 12, question: "教師あり学習に必要なラベル（正解データ）を付与する作業は？", options: ["データクレンジング", "アノテーション", "特徴抽出", "データ拡張"], correct: 1, explanation: "アノテーション（ラベリング）は、画像にタグを付けたり、テキストにカテゴリを割り当てたりする作業です。", keywords: ["アノテーション"] },
      { id: 13, question: "大量のアノテーション作業を、インターネット経由で不特定多数に依頼する手法は？", options: ["アウトソーシング", "クラウドソーシング", "オフショアリング", "インソーシング"], correct: 1, explanation: "クラウドソーシングは、Amazon Mechanical Turkなどのプラットフォームで、大量のラベリング作業を分散して行います。", keywords: ["クラウドソーシング"] },
      { id: 14, question: "誤ったラベルや一貫性のないラベルがモデル性能に与える影響を何と呼ぶか？", options: ["データバイアス", "ラベルノイズ", "サンプリングバイアス", "測定誤差"], correct: 1, explanation: "ラベルノイズは、アノテーションの誤りや曖昧さによる不正確なラベルで、モデル性能を低下させます。", keywords: ["ラベルノイズ"] },
      { id: 15, question: "AIモデルの倫理的な側面（公平性、透明性など）を評価・監査することは？", options: ["技術監査", "AI監査", "セキュリティ監査", "コンプライアンス監査"], correct: 1, explanation: "AI監査は、AIシステムの公平性、説明可能性、プライバシー、セキュリティなどを評価する取り組みです。", keywords: ["AI監査"] },
      { id: 16, question: "本番トラフィックの一部を新モデルに振り分けて効果を測定する手法は？", options: ["A/Bテスト", "シャドウテスト", "カナリアリリース", "ブルーグリーンデプロイ"], correct: 0, explanation: "A/Bテストは、ユーザーをランダムに分割し、新旧モデルの効果を統計的に比較します。", keywords: ["A/Bテスト"] },
      { id: 17, question: "新モデルを本番トラフィックに影響を与えずに評価するため、並行して推論を実行する手法は？", options: ["A/Bテスト", "シャドウテスト", "カナリアリリース", "ステージング"], correct: 1, explanation: "シャドウテスト（シャドウモード）は、本番データで新モデルを実行するが、結果はユーザーに返さない手法です。", keywords: ["シャドウテスト"] },
      { id: 18, question: "AI開発プロジェクトにおいて、データサイエンティストとMLエンジニアの役割の違いは主に何か？", options: ["給与水準", "研究と実装", "データ収集と分析", "モデル開発と運用"], correct: 3, explanation: "データサイエンティストは主にモデル開発・分析、MLエンジニアは本番システムへの実装・運用に重点を置きます。", keywords: ["データサイエンティスト", "MLエンジニア"] },
      { id: 19, question: "コードの変更を自動的にテスト・統合し、デプロイまで自動化する手法は？", options: ["DevOps", "CI/CD", "MLOps", "GitOps"], correct: 1, explanation: "CI/CD（継続的インテグレーション/継続的デリバリー）は、コード変更の自動テスト・デプロイを実現します。", keywords: ["CI/CD"] },
      { id: 20, question: "学習済みモデルのバージョン、メタデータ、血統を管理するシステムは？", options: ["Git", "DVC", "モデルレジストリ", "データカタログ"], correct: 2, explanation: "モデルレジストリは、学習済みモデルのバージョン管理、メタデータ、系統追跡を一元管理するシステムです。", keywords: ["モデルレジストリ"] }
    ]
  },
  chapter9: {
    id: 9,
    title: "AI法規制と倫理",
    subtitle: "AI Ethics & Regulations",
    character: "⚖",
    characterName: "エシックスガーディアン",
    quote: "AIに正義と倫理の光を！",
    color: "#EF4444",
    questions: [
      { id: 1, question: "EUが2024年に成立させた、AIシステムをリスクベースで規制する法律は？", options: ["GDPR", "AI規制法", "DSA", "DMA"], correct: 1, explanation: "EU AI規制法（AI Act）は、AIシステムをリスクレベルで分類し、高リスクAIに厳格な要件を課す世界初の包括的AI規制です。", keywords: ["EU AI規制法"] },
      { id: 2, question: "日本の個人情報保護法において、本人を識別できる情報は？", options: ["匿名加工情報", "個人情報", "仮名加工情報", "統計情報"], correct: 1, explanation: "個人情報は、生存する個人に関する情報で、氏名、生年月日などにより特定の個人を識別できるものです。", keywords: ["個人情報"] },
      { id: 3, question: "個人情報を加工し、特定の個人を識別できないようにした情報は？", options: ["個人情報", "仮名加工情報", "匿名加工情報", "統計情報"], correct: 2, explanation: "匿名加工情報は、特定の個人を識別できないよう加工した情報で、本人同意なく第三者提供が可能です。", keywords: ["匿名加工情報"] },
      { id: 4, question: "GDPR（EU一般データ保護規則）において、データ主体が持つ「忘れられる権利」とは？", options: ["アクセス権", "消去権", "訂正権", "異議申立権"], correct: 1, explanation: "消去権（忘れられる権利）は、一定の条件下で自己の個人データの消去を要求できる権利です。", keywords: ["消去権"] },
      { id: 5, question: "AIの判断が特定の集団に対して不公平な結果をもたらす問題は？", options: ["プライバシー侵害", "アルゴリズミックバイアス", "セキュリティリスク", "著作権侵害"], correct: 1, explanation: "アルゴリズミックバイアスは、学習データや設計の偏りにより、AIが特定の集団に不公平な判断を下す問題です。", keywords: ["アルゴリズミックバイアス"] },
      { id: 6, question: "他人の著作物を無断で複製・改変・公開する行為は？", options: ["著作権侵害", "特許侵害", "不正競争", "名誉毀損"], correct: 0, explanation: "著作権侵害は、著作権者の許諾なく著作物を複製・配布・公開等する行為で、民事・刑事上の責任が生じます。", keywords: ["著作権侵害"] },
      { id: 7, question: "思想や感情を創作的に表現した、文芸・学術・美術・音楽の範囲に属するものに認められる権利は？", options: ["特許権", "商標権", "著作権", "意匠権"], correct: 2, explanation: "著作権は、著作物の創作と同時に発生し、登録不要で保護されます。複製権、公衆送信権などの権利の束です。", keywords: ["著作権"] },
      { id: 8, question: "特許権・著作権・商標権などを総称して何と呼ぶか？", options: ["無体財産権", "知的財産権", "産業財産権", "独占権"], correct: 1, explanation: "知的財産権は、人間の知的創造活動により生み出されたものに対する権利の総称で、特許、著作権、商標などを含みます。", keywords: ["知的財産権"] },
      { id: 9, question: "発明を一定期間独占的に実施できる権利は？", options: ["著作権", "商標権", "特許権", "意匠権"], correct: 2, explanation: "特許権は、新規性・進歩性のある発明に対して出願・審査を経て付与され、出願から20年間保護されます。", keywords: ["特許権"] },
      { id: 10, question: "独占禁止法において、市場における公正な競争を妨げる行為の性質を何と呼ぶか？", options: ["優越的地位の濫用", "競争制限", "不公正な取引方法", "公正競争阻害性"], correct: 3, explanation: "公正競争阻害性は、不公正な取引方法を判断する際の基準で、自由競争の減殺、競争手段の不公正さなどを指します。", keywords: ["公正競争阻害性"] },
      { id: 11, question: "市場における自由な競争を制限する行為や状態を何と呼ぶか？", options: ["不正競争", "競争制限", "排他的取引", "優越的地位"], correct: 1, explanation: "競争制限は、カルテル、市場支配的地位の濫用など、自由競争を阻害する行為で、独占禁止法で規制されます。", keywords: ["競争制限"] },
      { id: 12, question: "AIシステム導入後のメンテナンス・更新・サポートに関する契約は？", options: ["開発契約", "ライセンス契約", "保守契約", "SLA"], correct: 2, explanation: "保守契約は、システム稼働後の維持管理、バグ修正、アップデート、サポートなどを定める契約です。", keywords: ["保守契約"] },
      { id: 13, question: "データを利用する権利の設定に関する契約上の取り決めは？", options: ["著作権譲渡", "ライセンス契約", "データ利用権", "アクセス権"], correct: 2, explanation: "データ利用権は、所有権とは異なり、データの利用・加工・再配布等の条件を契約で定める権利です。", keywords: ["データ利用権"] },
      { id: 14, question: "カメラで撮影した画像の利活用に関する、経産省などが策定したガイドラインは？", options: ["個人情報保護ガイドライン", "カメラ画像利活用ガイドブック", "映像監視ガイドライン", "プライバシーポリシー"], correct: 1, explanation: "カメラ画像利活用ガイドブックは、店舗等でのカメラ画像の適切な取扱いについて、事業者向けに指針を示しています。", keywords: ["カメラ画像利活用ガイドブック"] },
      { id: 15, question: "プライバシー保護をシステム設計の初期段階から組み込む考え方は？", options: ["セキュリティ・バイ・デザイン", "プライバシー・バイ・デザイン", "倫理・バイ・デザイン", "安全・バイ・デザイン"], correct: 1, explanation: "プライバシー・バイ・デザインは、事後対応ではなく、設計段階からプライバシー保護を組み込む7原則に基づくアプローチです。", keywords: ["プライバシー・バイ・デザイン"] },
      { id: 16, question: "AIの公平性において、どのような状態を「公平」とみなすかの定義は一意に定まっているか？", options: ["定まっている", "文脈によって異なる", "法律で規定されている", "国際標準がある"], correct: 1, explanation: "公平性の定義は、統計的パリティ、機会の平等、結果の平等など複数あり、文脈に応じて適切なものを選択する必要があります。", keywords: ["公平性の定義"] },
      { id: 17, question: "学習データに含まれる偏りがモデルに反映される問題は？", options: ["過学習", "データの偏り", "ノイズ", "ラベルエラー"], correct: 1, explanation: "データの偏り（バイアス）は、特定の属性のデータが過少・過多である場合に、モデルの予測に不公平が生じる原因となります。", keywords: ["データの偏り"] },
      { id: 18, question: "攻撃者が学習済みモデルの情報を不正に取得しようとする攻撃は？", options: ["データ窃取", "モデル窃取", "モデル汚染", "敵対的攻撃"], correct: 1, explanation: "モデル窃取は、APIを悪用してモデルの構造や重みを推測・復元しようとする攻撃で、知的財産の侵害につながります。", keywords: ["モデル窃取"] },
      { id: 19, question: "学習データに悪意のあるデータを混入させ、モデルの挙動を変える攻撃は？", options: ["敵対的攻撃", "モデル窃取", "モデル汚染", "データ窃取"], correct: 2, explanation: "モデル汚染（データポイズニング）は、学習データに悪意のあるサンプルを混入し、モデルに誤った学習をさせる攻撃です。", keywords: ["モデル汚染"] },
      { id: 20, question: "虚偽の情報を意図的に作成・拡散する行為や、その情報自体を何と呼ぶか？", options: ["誤報", "デマ", "フェイクニュース", "風説"], correct: 2, explanation: "フェイクニュースは、政治・社会的影響を与える目的で作成・拡散される虚偽情報で、AI技術（ディープフェイク等）で作成されることもあります。", keywords: ["フェイクニュース"] }
    ]
  }
};

// ============================================
// APIキー設定モーダル
// ============================================
function ApiKeyModal({ isOpen, onClose, apiKey, setApiKey }) {
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTempKey(apiKey);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    setApiKey(tempKey);
    try {
      localStorage.setItem('anthropic-api-key', tempKey);
    } catch (e) {
      console.log('Failed to save API key');
    }
    onClose();
  };

  const handleClear = () => {
    setTempKey('');
    setApiKey('');
    try {
      localStorage.removeItem('anthropic-api-key');
    } catch (e) {
      console.log('Failed to remove API key');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-3xl w-full max-w-md p-6 border border-slate-600 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">🔑 API設定</h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Anthropic APIキー</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-500 pr-12"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showKey ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 text-sm">
            <p className="text-slate-300 mb-2">💡 APIキーの取得方法</p>
            <ol className="text-slate-400 space-y-1 list-decimal list-inside">
              <li><a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Anthropic Console</a> にアクセス</li>
              <li>アカウントを作成またはログイン</li>
              <li>API Keys からキーを発行</li>
            </ol>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm">
            <p className="text-amber-400">⚠️ 注意</p>
            <p className="text-slate-400 mt-1">APIキーはブラウザに保存されます。共有PCでの使用にはご注意ください。AI質問機能を使用するとAPI使用料が発生します。</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClear}
              className="flex-1 py-3 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              クリア
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AI質問モーダルコンポーネント
// ============================================
function AiChatModal({ isOpen, onClose, chapter, currentQuestion, apiKey, onOpenApiSettings }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setInput('');
    }
  }, [isOpen, currentQuestion?.id]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'APIキーが設定されていません。設定画面からAPIキーを入力してください。'
      }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const systemPrompt = `あなたは「${chapter.characterName}」です。G検定の学習をサポートしています。

キャラクター設定：
- 名言：「${chapter.quote}」
- 担当分野：${chapter.title}（${chapter.subtitle}）

現在、学習者は以下の問題に取り組んでいます：
【問題】${currentQuestion.question}
【選択肢】${currentQuestion.options.map((o, i) => `${['A','B','C','D'][i]}. ${o}`).join(' / ')}
【正解】${['A','B','C','D'][currentQuestion.correct]}. ${currentQuestion.options[currentQuestion.correct]}
【解説】${currentQuestion.explanation}
【関連キーワード】${currentQuestion.keywords.join(', ')}

以下のルールで回答してください：
1. キャラクターになりきって、親しみやすく教える
2. この問題に関連した内容を中心に説明する
3. G検定に出題される重要ポイントを押さえる
4. 具体例を交えて分かりやすく説明する
5. 回答は簡潔に（300文字程度を目安）
6. 直接答えを教えるのではなく、理解を助けるヒントを与える`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.content[0].text;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      let errorMessage = 'エラーが発生しました。';
      if (error.message.includes('401') || error.message.includes('invalid')) {
        errorMessage = 'APIキーが無効です。設定画面から正しいAPIキーを入力してください。';
      } else if (error.message.includes('429')) {
        errorMessage = 'API使用量の上限に達しました。しばらく待ってからお試しください。';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'ネットワークエラーが発生しました。インターネット接続を確認してください。';
      }
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-3xl w-full max-w-lg h-[80vh] max-h-[600px] flex flex-col border border-slate-600 shadow-2xl overflow-hidden">
        <div className="flex-shrink-0 p-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/90">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{chapter.character}</span>
            <div>
              <div className="font-bold" style={{ color: chapter.color }}>{chapter.characterName}</div>
              <div className="text-xs text-slate-400">に質問する</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenApiSettings}
              className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors text-white text-sm"
              title="API設定"
            >
              ⚙️
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors text-white">✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {!apiKey && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
              <p className="text-amber-400 mb-2">⚠️ APIキーが未設定です</p>
              <button
                onClick={onOpenApiSettings}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg font-bold text-sm transition-colors"
              >
                APIキーを設定する
              </button>
            </div>
          )}

          {messages.length === 0 && apiKey && (
            <div className="text-center text-slate-500 py-4">
              <p className="mb-4 text-sm">この問題について質問できます</p>
              <div className="space-y-2">
                {['この問題のポイントを教えて', 'なぜこれが正解なの？', '関連する概念を説明して', '覚え方のコツはある？'].map((suggestion, idx) => (
                  <button key={idx} onClick={() => setInput(suggestion)} className="block w-full text-left p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-sm text-slate-300 border border-slate-600 transition-colors">
                    💬 {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-purple-600 rounded-br-sm' : 'bg-slate-700 rounded-bl-sm'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold" style={{ color: chapter.color }}>
                    <span>{chapter.character}</span>
                    {chapter.characterName}
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap text-white">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-sm">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex-shrink-0 p-4 border-t border-slate-700 bg-slate-800/90">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={apiKey ? "質問を入力..." : "APIキーを設定してください"}
              disabled={!apiKey}
              className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-400 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || !apiKey}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all text-white ${input.trim() && !isLoading && apiKey ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// メインアプリケーション
// ============================================
export default function GKenteiQuizApp() {
  const [mode, setMode] = useState('home');
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [chapterScores, setChapterScores] = useState({});
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [apiKey, setApiKey] = useState('');

  // localStorageからの読み込み
  useEffect(() => {
    try {
      const savedScores = localStorage.getItem('gkentei-scores-v3');
      if (savedScores) setChapterScores(JSON.parse(savedScores));
      const savedWrong = localStorage.getItem('gkentei-wrong-v3');
      if (savedWrong) setWrongQuestions(JSON.parse(savedWrong));
      const savedApiKey = localStorage.getItem('anthropic-api-key');
      if (savedApiKey) setApiKey(savedApiKey);
    } catch (e) {
      console.log('Storage not available');
    }
  }, []);

  // 進捗の保存
  const saveProgress = (scores, wrong) => {
    try {
      localStorage.setItem('gkentei-scores-v3', JSON.stringify(scores));
      localStorage.setItem('gkentei-wrong-v3', JSON.stringify(wrong));
    } catch (e) {
      console.log('Failed to save progress');
    }
  };

  // 章の開始
  const startChapter = (chapterId) => {
    const chapter = Object.values(quizData).find(c => c.id === chapterId);
    setCurrentChapter(chapter);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setIsReviewMode(false);
    setMode('quiz');
  };

  // ランダム出題
  const startRandomQuiz = () => {
    const allQuestions = [];
    Object.values(quizData).forEach(chapter => {
      chapter.questions.forEach(q => {
        allQuestions.push({ ...q, chapterId: chapter.id, chapterTitle: chapter.title });
      });
    });
    const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    setRandomQuestions(shuffled);
    setCurrentChapter({ 
      id: 'random',
      title: 'ランダム出題', 
      subtitle: '全章から20問', 
      character: '🎲', 
      characterName: 'ランダムマスター',
      quote: '運と実力を試せ！',
      color: '#6366F1' 
    });
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setIsReviewMode(false);
    setMode('random');
  };

  // 復習モードの開始
  const startReview = () => {
    if (wrongQuestions.length === 0) return;
    setIsReviewMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setMode('review');
  };

  // 弱点分析データの取得
  const getWeakAnalysis = () => {
    const chapterWrongCount = {};
    wrongQuestions.forEach(wq => {
      chapterWrongCount[wq.chapterId] = (chapterWrongCount[wq.chapterId] || 0) + 1;
    });
    
    return Object.entries(chapterWrongCount)
      .map(([chapterId, count]) => ({
        chapter: quizData[`chapter${chapterId}`],
        count
      }))
      .sort((a, b) => b.count - a.count);
  };

  // 回答選択
  const selectAnswer = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  // 回答確定
  const confirmAnswer = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    
    let currentQuestion;
    if (mode === 'random') {
      currentQuestion = randomQuestions[currentQuestionIndex];
    } else if (isReviewMode && mode === 'review') {
      currentQuestion = wrongQuestions[currentQuestionIndex];
    } else {
      currentQuestion = currentChapter.questions[currentQuestionIndex];
    }
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    setAnswers([...answers, { questionId: currentQuestion.id, selected: selectedAnswer, correct: isCorrect }]);
    
    // 間違えた問題を記録（復習モード以外）
    if (!isCorrect && mode !== 'review') {
      const chapterId = currentQuestion.chapterId || currentChapter?.id;
      const newWrong = [...wrongQuestions];
      const exists = newWrong.find(w => w.chapterId === chapterId && w.questionId === currentQuestion.id);
      if (!exists && chapterId !== 'random') {
        newWrong.push({ 
          ...currentQuestion, 
          chapterId, 
          chapterTitle: currentQuestion.chapterTitle || currentChapter?.title 
        });
        setWrongQuestions(newWrong);
        saveProgress(chapterScores, newWrong);
      }
    }
  };

  // 次の問題へ
  const nextQuestion = () => {
    let questions;
    if (mode === 'random') {
      questions = randomQuestions;
    } else if (isReviewMode && mode === 'review') {
      questions = wrongQuestions;
    } else {
      questions = currentChapter.questions;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  // クイズ終了
  const finishQuiz = () => {
    if (mode === 'review') {
      const stillWrong = wrongQuestions.filter((q, idx) => {
        const answer = answers[idx];
        return answer && !answer.correct;
      });
      setWrongQuestions(stillWrong);
      saveProgress(chapterScores, stillWrong);
    } else if (mode === 'quiz') {
      const correctCount = answers.filter(a => a.correct).length;
      const score = Math.round((correctCount / currentChapter.questions.length) * 100);
      const newScores = { ...chapterScores, [currentChapter.id]: score };
      setChapterScores(newScores);
      const newWrong = currentChapter.questions.filter((q, idx) => {
        const answer = answers[idx];
        return answer && !answer.correct;
      }).map(q => ({ ...q, chapterId: currentChapter.id, chapterTitle: currentChapter.title }));
      const updatedWrong = [...wrongQuestions.filter(w => w.chapterId !== currentChapter.id), ...newWrong];
      setWrongQuestions(updatedWrong);
      saveProgress(newScores, updatedWrong);
    }
    setMode('results');
  };

  // 全体の進捗計算
  const calculateOverallProgress = () => {
    const totalChapters = Object.keys(quizData).length;
    const completedChapters = Object.keys(chapterScores).length;
    const averageScore = completedChapters > 0
      ? Math.round(Object.values(chapterScores).reduce((a, b) => a + b, 0) / completedChapters)
      : 0;
    return { completedChapters, totalChapters, averageScore };
  };

  // ============================================
  // ホーム画面
  // ============================================
  const renderHome = () => {
    const progress = calculateOverallProgress();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            G検定クイズマスター
          </h1>
          <p className="text-slate-400 text-sm md:text-base">全180問でディープラーニングをマスターしよう！</p>
        </header>

        {/* API設定ボタン */}
        <div className="max-w-2xl mx-auto mb-4 flex justify-end">
          <button
            onClick={() => setIsApiModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              apiKey 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
            }`}
          >
            {apiKey ? '✓ API設定済み' : '⚙️ API設定'}
          </button>
        </div>

        {/* 進捗バー */}
        <div className="max-w-2xl mx-auto mb-8 bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">学習進捗</span>
            <span className="text-sm font-bold text-yellow-400">{progress.completedChapters}/{progress.totalChapters}章 完了</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${(progress.completedChapters / progress.totalChapters) * 100}%` }} />
          </div>
          {progress.averageScore > 0 && (
            <p className="text-center mt-2 text-sm text-slate-400">
              平均スコア: <span className="text-white font-bold">{progress.averageScore}%</span>
            </p>
          )}
        </div>

        {/* メニューボタン */}
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4 mb-8">
          <button onClick={() => setMode('chapter')}
            className="bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 p-6 rounded-2xl text-left transition-all hover:scale-105">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-bold text-lg">章別学習</div>
            <div className="text-sm text-slate-300">9章 × 20問</div>
          </button>
          <button onClick={startRandomQuiz}
            className="bg-gradient-to-br from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 p-6 rounded-2xl text-left transition-all hover:scale-105">
            <div className="text-3xl mb-2">🎲</div>
            <div className="font-bold text-lg">ランダム</div>
            <div className="text-sm text-slate-300">全章から20問</div>
          </button>
          <button onClick={startReview} disabled={wrongQuestions.length === 0}
            className={`p-6 rounded-2xl text-left transition-all ${wrongQuestions.length > 0 ? 'bg-gradient-to-br from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 hover:scale-105' : 'bg-slate-700 opacity-50 cursor-not-allowed'}`}>
            <div className="text-3xl mb-2">🔄</div>
            <div className="font-bold text-lg">復習モード</div>
            <div className="text-sm text-slate-300">{wrongQuestions.length > 0 ? `${wrongQuestions.length}問` : '間違いなし'}</div>
          </button>
          <button onClick={() => setMode('analysis')}
            className="bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 p-6 rounded-2xl text-left transition-all hover:scale-105">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-bold text-lg">弱点分析</div>
            <div className="text-sm text-slate-300">苦手分野を確認</div>
          </button>
        </div>

        {/* 弱点診断 */}
        {Object.keys(chapterScores).length > 0 && (
          <div className="max-w-2xl mx-auto bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
            <h3 className="font-bold mb-4 flex items-center gap-2"><span>📊</span> 章別スコア</h3>
            <div className="space-y-2">
              {Object.values(quizData).map(chapter => {
                const score = chapterScores[chapter.id];
                return (
                  <div key={chapter.id} className="flex items-center gap-3">
                    <span className="text-sm w-32 truncate">{chapter.title}</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : score ? 'bg-red-500' : 'bg-slate-600'}`}
                        style={{ width: `${score || 0}%` }} />
                    </div>
                    <span className={`text-sm w-12 text-right font-bold ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : score ? 'text-red-400' : 'text-slate-500'}`}>
                      {score !== undefined ? `${score}%` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* APIキー設定モーダル */}
        <ApiKeyModal
          isOpen={isApiModalOpen}
          onClose={() => setIsApiModalOpen(false)}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />
      </div>
    );
  };

  // ============================================
  // 章選択画面
  // ============================================
  const renderChapterSelect = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <button onClick={() => setMode('home')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <span>←</span> ホームに戻る
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">章を選択</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(quizData).map(chapter => {
          const score = chapterScores[chapter.id];
          return (
            <button key={chapter.id} onClick={() => startChapter(chapter.id)}
              className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 rounded-2xl p-5 text-left transition-all hover:scale-102"
              style={{ borderLeftColor: chapter.color, borderLeftWidth: '4px' }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{chapter.character}</span>
                {score !== undefined && (
                  <span className={`text-sm font-bold px-2 py-1 rounded-full ${score >= 80 ? 'bg-green-500/20 text-green-400' : score >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {score}%
                  </span>
                )}
              </div>
              <div className="font-bold text-lg mb-1">第{chapter.id}章: {chapter.title}</div>
              <div className="text-sm text-slate-400 mb-2">{chapter.subtitle}</div>
              <div className="text-xs text-slate-500 italic">「{chapter.quote}」</div>
              <div className="text-xs text-slate-500 mt-2">20問</div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ============================================
  // 弱点分析画面
  // ============================================
  const renderAnalysis = () => {
    const weakAnalysis = getWeakAnalysis();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setMode('home')}
            className="text-slate-400 hover:text-white mb-6 flex items-center gap-2"
          >
            ← ホームに戻る
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6 text-center">📊 弱点分析</h2>
          
          {weakAnalysis.length === 0 ? (
            <div className="bg-slate-800/80 rounded-2xl p-8 text-center border border-slate-700">
              <div className="text-5xl mb-4">🎯</div>
              <p className="text-slate-300 text-lg mb-2">まだ間違えた問題がありません</p>
              <p className="text-slate-500 text-sm">問題を解いて弱点を発見しましょう！</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 mb-6">
                <p className="text-center text-slate-400">
                  間違えた問題: <span className="text-white font-bold text-xl">{wrongQuestions.length}問</span>
                </p>
              </div>
              
              {weakAnalysis.map(({ chapter, count }) => (
                <div key={chapter.id} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: chapter.color + '30' }}
                    >
                      {chapter.character}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">{chapter.title}</div>
                      <div className="text-slate-500 text-sm">{chapter.subtitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-400">{count}</div>
                      <div className="text-slate-500 text-xs">要復習</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${Math.min((count / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={startReview}
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-2xl font-bold mt-6 transition-all hover:scale-105"
              >
                🔄 復習モードを開始
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // クイズ画面
  // ============================================
  const renderQuiz = () => {
    // モードに応じて問題セットを選択
    let questions;
    if (mode === 'random') {
      questions = randomQuestions;
    } else if (isReviewMode && mode === 'review') {
      questions = wrongQuestions;
    } else {
      questions = currentChapter?.questions;
    }
    
    if (!questions || questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    // チャプター情報の取得（ランダム/復習モードでは問題ごとに異なる可能性あり）
    let chapter;
    if (mode === 'random' || mode === 'review') {
      chapter = currentQuestion.chapterId 
        ? Object.values(quizData).find(c => c.id === currentQuestion.chapterId)
        : currentChapter;
    } else {
      chapter = currentChapter;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
        {/* AI質問モーダル */}
        <AiChatModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          chapter={chapter || currentChapter}
          currentQuestion={currentQuestion}
          apiKey={apiKey}
          onOpenApiSettings={() => {
            setIsAiModalOpen(false);
            setIsApiModalOpen(true);
          }}
        />

        {/* APIキー設定モーダル */}
        <ApiKeyModal
          isOpen={isApiModalOpen}
          onClose={() => setIsApiModalOpen(false)}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />

        {/* ヘッダー */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMode('home')} className="text-slate-400 hover:text-white transition-colors">✕ 終了</button>
            <span className="text-sm text-slate-400">
              {mode === 'review' ? '復習モード' : mode === 'random' ? 'ランダム出題' : `第${chapter?.id}章: ${chapter?.title}`}
            </span>
            <span className="font-bold">{currentQuestionIndex + 1} / {questions.length}</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* 問題カード */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/80 rounded-3xl p-6 md:p-8 border border-slate-700 mb-6">
            {/* キャラクターとAI質問ボタン */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{chapter?.character || currentChapter?.character}</span>
                <div>
                  <div className="font-bold" style={{ color: chapter?.color || currentChapter?.color }}>{chapter?.characterName || currentChapter?.characterName}</div>
                  <div className="text-xs text-slate-400">{chapter?.subtitle || currentChapter?.subtitle}</div>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 ${
                  apiKey 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              >
                🤖 質問する
              </button>
            </div>

            {/* 問題文 */}
            <div className="text-lg md:text-xl font-medium mb-8 leading-relaxed">
              Q{currentQuestionIndex + 1}. {currentQuestion.question}
            </div>

            {/* 選択肢 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let buttonClass = 'bg-slate-700/50 hover:bg-slate-600/50 border-slate-600';
                if (showExplanation) {
                  if (idx === currentQuestion.correct) {
                    buttonClass = 'bg-green-500/20 border-green-500 text-green-300';
                  } else if (idx === selectedAnswer && idx !== currentQuestion.correct) {
                    buttonClass = 'bg-red-500/20 border-red-500 text-red-300';
                  }
                } else if (idx === selectedAnswer) {
                  buttonClass = 'bg-purple-500/30 border-purple-500';
                }
                return (
                  <button key={idx} onClick={() => selectAnswer(idx)} disabled={showExplanation}
                    className={`w-full p-4 rounded-xl text-left border-2 transition-all ${buttonClass}`}>
                    <span className="font-bold mr-3 text-slate-400">{['A', 'B', 'C', 'D'][idx]}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 解説 */}
          {showExplanation && (
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 mb-6">
              <div className={`font-bold text-lg mb-3 ${selectedAnswer === currentQuestion.correct ? 'text-green-400' : 'text-red-400'}`}>
                {selectedAnswer === currentQuestion.correct ? '✓ 正解！' : '✗ 不正解'}
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">{currentQuestion.explanation}</p>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.keywords.map((kw, idx) => (
                  <span key={idx} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">#{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex justify-center gap-4">
            {!showExplanation ? (
              <button onClick={confirmAnswer} disabled={selectedAnswer === null}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${selectedAnswer !== null ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
                回答する
              </button>
            ) : (
              <button onClick={nextQuestion}
                className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:scale-105 transition-all">
                {currentQuestionIndex < questions.length - 1 ? '次の問題 →' : '結果を見る'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // 結果画面
  // ============================================
  const renderResults = () => {
    const correctCount = answers.filter(a => a.correct).length;
    const totalCount = answers.length;
    const score = Math.round((correctCount / totalCount) * 100);
    let message = '', emoji = '';
    if (score >= 90) { message = '素晴らしい！完璧に近い成績です！'; emoji = '🏆'; }
    else if (score >= 80) { message = '合格ラインクリア！この調子で！'; emoji = '🎉'; }
    else if (score >= 70) { message = 'もう少し！復習で弱点克服を！'; emoji = '💪'; }
    else { message = '基礎固めが必要です。復習しましょう！'; emoji = '📚'; }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700 text-center">
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-2xl font-bold mb-2">
              {mode === 'review' ? '復習完了！' : mode === 'random' ? 'ランダム出題完了！' : `第${currentChapter?.id}章 完了！`}
            </h2>
            <div className="my-8">
              <div className={`text-7xl font-black ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{score}%</div>
              <div className="text-slate-400 mt-2">{correctCount} / {totalCount} 問正解</div>
            </div>
            <p className="text-slate-300 mb-8">{message}</p>
            <div className="space-y-3">
              <button onClick={() => setMode('home')} className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all">
                ホームに戻る
              </button>
              {mode === 'quiz' && (
                <button onClick={() => startChapter(currentChapter.id)} className="w-full py-4 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 transition-all">
                  もう一度挑戦
                </button>
              )}
              {wrongQuestions.length > 0 && mode !== 'review' && (
                <button onClick={() => setMode('analysis')} className="w-full py-4 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 transition-all">
                  📊 弱点分析を見る
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 画面切り替え
  switch (mode) {
    case 'home': return renderHome();
    case 'chapter': return renderChapterSelect();
    case 'analysis': return renderAnalysis();
    case 'quiz':
    case 'random':
    case 'review': return renderQuiz();
    case 'results': return renderResults();
    default: return renderHome();
  }
}
