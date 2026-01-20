import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================
// G検定試験仕様問題（9章×20問=180問）
// ============================================

const quizData = {
  chapter1: {
    id: 1, title: "人工知能をめぐる動向", subtitle: "AI・ML・DLの歴史と基本概念", character: "🌌", characterName: "AI史の語り部", quote: "歴史を知る者が未来を創る", color: "#6366f1",
    questions: [
      {id:1,type:"scenario",question:"あなたはAI導入を検討する経営者です。「AIで何でも自動化できる」と期待する社員に説明が必要です。環境を認識し自律的に判断・行動するシステムを何と呼びますか？",options:["エージェント","ロボット","オートマトン","デーモン"],correct:0,explanation:"エージェントは環境認識と自律的判断・行動を行うシステムです。AIエージェントはタスク実行に特化しますが、万能ではありません。",keywords:["エージェント"]},
      {id:2,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「AI研究の出発点は1956年の【A】である。この会議で初めて『人工知能』という用語が使われた。」",options:["チューリング会議","ダートマス会議","MIT会議","スタンフォード会議"],correct:1,explanation:"1956年のダートマス会議でジョン・マッカーシーらが「Artificial Intelligence」を提唱しました。",keywords:["ダートマス会議"]},
      {id:3,type:"scenario",question:"あなたはデータサイエンティストです。従来の機械学習では精度が出ない画像認識に、多層ニューラルネットワークで特徴を自動学習させる手法を提案します。この手法は？",options:["強化学習","教師あり学習","ディープラーニング","クラスタリング"],correct:2,explanation:"ディープラーニングは多層NNでデータから自動的に特徴を学習し、画像認識で高精度を達成します。",keywords:["ディープラーニング"]},
      {id:4,type:"fill_in_blank",question:"以下の文章を読み、【A】【B】に当てはまる組み合わせを選べ。「【A】は言語学的ルールを人手で作成する方式で、【B】は対訳コーパスから統計的に学習する方式である。」",options:["A:ニューラル B:統計的","A:ルールベース B:統計的","A:統計的 B:ルールベース","A:辞書ベース B:ニューラル"],correct:1,explanation:"ルールベース機械翻訳は文法規則を人手で定義、統計的機械翻訳は対訳データから学習します。",keywords:["統計的機械翻訳","ルールベース機械翻訳"]},
      {id:5,type:"scenario",question:"あなたはロボット開発チームのリーダーです。「部屋を片付ける」目標達成のための行動計画を自動生成するシステムが必要です。1971年開発の行動計画システムは？",options:["画像認識システム","STRIPS","音声合成システム","データマイニングツール"],correct:1,explanation:"STRIPSは状態・動作・目標を形式的に記述し、行動計画を自動生成するシステムです。",keywords:["STRIPS"]},
      {id:6,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「探索問題において、状態遷移を木構造で表現したものを【A】と呼ぶ。」",options:["決定木","探索木","構文木","二分木"],correct:1,explanation:"探索木は状態空間を木構造で表現し、目標状態への経路を探索します。",keywords:["探索木"]},
      {id:7,type:"scenario",question:"あなたはアルゴリズム教育の講師です。再帰的な解法を教えるため、3本の杭と複数の円盤を使った古典的パズルを例題にします。このパズルは？",options:["8パズル","ハノイの塔","15パズル","ルービックキューブ"],correct:1,explanation:"ハノイの塔は再帰アルゴリズムの典型例で、n枚の円盤移動には2^n-1回必要です。",keywords:["ハノイの塔"]},
      {id:8,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「最短経路を見つけたい場合、【A】が適している。根から近い順にすべてのノードを探索する。」",options:["深さ優先探索","幅優先探索","最良優先探索","反復深化探索"],correct:1,explanation:"幅優先探索(BFS)は浅いノードから順に探索し、最短経路問題に適しています。",keywords:["幅優先探索"]},
      {id:9,type:"scenario",question:"あなたはメモリ制約の厳しい組み込みシステムでパズル解法AIを実装中です。メモリ効率優先で、行き止まりまで深く探索してからバックトラックする手法は？",options:["幅優先探索","深さ優先探索","A*探索","ダイクストラ法"],correct:1,explanation:"深さ優先探索(DFS)は現在の経路のみをメモリに保持するため、メモリ効率が良いです。",keywords:["深さ優先探索"]},
      {id:10,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「すべての可能な組み合わせを試す力任せの探索手法を【A】と呼ぶ。」",options:["ヒューリスティック探索","ブルートフォース","貪欲法","動的計画法"],correct:1,explanation:"ブルートフォース（総当たり法）は解空間を網羅的に探索します。",keywords:["ブルートフォース"]},
      {id:11,type:"scenario",question:"あなたはAI研究者です。コンピュータに人間の常識を持たせる研究で、1984年開始、100万件以上の事実をDB化しようとしたプロジェクトは？",options:["DENDRALプロジェクト","Cycプロジェクト","東ロボプロジェクト","ワトソンプロジェクト"],correct:1,explanation:"Cycプロジェクトは人間の一般常識をコンピュータに理解させる試みでした。",keywords:["Cycプロジェクト"]},
      {id:12,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「1965年開発の【A】は、質量分析データから有機化合物の分子構造を推論する最初のエキスパートシステムの一つ。」",options:["MYCIN","DENDRAL","ELIZA","SHRDLU"],correct:1,explanation:"DENDRALは専門家の知識をルール化し、化学分析を自動化しました。",keywords:["DENDRAL"]},
      {id:13,type:"scenario",question:"あなたはチャットボット開発の歴史を調査中です。1966年開発、セラピストを模倣しパターンマッチングで応答を生成した対話システムの先駆けは？",options:["ワトソン","Siri","ELIZA","Alexa"],correct:2,explanation:"ELIZAはジョセフ・ワイゼンバウムが開発した初期の対話システムです。",keywords:["イライザ(ELIZA)"]},
      {id:14,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「1970年代開発の【A】は、細菌感染症の診断と抗生物質の処方を支援する医療用エキスパートシステム。」",options:["DENDRAL","MYCIN","Cyc","STRIPS"],correct:1,explanation:"MYCINは確信度係数を導入し、専門医と同等の診断精度を達成しました。",keywords:["マイシン(MYCIN)"]},
      {id:15,type:"scenario",question:"あなたは国立情報学研究所の研究員です。AIが大学入試問題にどこまで対応できるか検証するプロジェクトに参加。東大入試合格を目指したAIは？",options:["ワトソン","AlphaGo","東ロボくん","GPT"],correct:2,explanation:"東ロボくんは大学入試問題への挑戦を通じて、AIの限界と可能性を検証しました。",keywords:["東ロボくん"]},
      {id:16,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「データの次元数が増加すると、学習に必要なデータ量が指数関数的に増加する現象を【A】と呼ぶ。」",options:["過学習","次元の呪い","勾配消失","局所最適解"],correct:1,explanation:"次元の呪いは高次元データの本質的な困難さを示します。",keywords:["次元の呪い"]},
      {id:17,type:"scenario",question:"あなたはメールサービス会社のエンジニアです。迷惑メールを自動検出するシステムを構築します。機械学習の代表的応用例であるこのシステムは？",options:["ファイアウォール","スパムフィルタ","アンチウイルス","プロキシサーバ"],correct:1,explanation:"スパムフィルタはナイーブベイズなどで迷惑メールを自動判定します。",keywords:["スパムフィルタ"]},
      {id:18,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「量・多様性・速度の3Vで特徴づけられる大規模データを【A】と呼ぶ。」",options:["オープンデータ","ビッグデータ","メタデータ","構造化データ"],correct:1,explanation:"ビッグデータは3Vを特徴とし、ディープラーニングの成功を支えました。",keywords:["ビッグデータ"]},
      {id:19,type:"scenario",question:"あなたはECサイトの開発者です。ユーザーの購買・閲覧履歴から好みを分析し、商品を提案するシステムを構築します。このシステムは？",options:["検索エンジン","レコメンデーションエンジン","データマイニングツール","分析ダッシュボード"],correct:1,explanation:"レコメンデーションエンジンは協調フィルタリング等でユーザーに適した推薦を行います。",keywords:["レコメンデーションエンジン"]},
      {id:20,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「人工ニューラルネットワークは【A】の情報処理の仕組みを模倣して設計された。」",options:["中枢神経系","人間の神経回路","大脳皮質","シナプス結合"],correct:1,explanation:"人間の神経回路が人工ニューラルネットワークの着想源です。",keywords:["人間の神経回路"]}
    ]
  },

  chapter2: {
    id: 2, title: "機械学習の概要", subtitle: "教師あり・なし学習と強化学習", character: "📊", characterName: "データの錬金術師", quote: "データから知恵を紡ぎ出す", color: "#10B981",
    questions: [
      {id:1,type:"scenario",question:"あなたはKaggleコンペに参加中です。単一モデルでは精度が頭打ちのため、複数モデルを組み合わせて予測性能を向上させる手法を検討。この手法の総称は？",options:["転移学習","アンサンブル学習","強化学習","半教師あり学習"],correct:1,explanation:"アンサンブル学習はバギング、ブースティング等で複数モデルを組み合わせます。",keywords:["アンサンブル学習"]},
      {id:2,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「SVMで線形分離不可能なデータを扱うため、【A】を使ってデータを高次元空間に暗黙的に写像する。」",options:["活性化関数","カーネル","誤差関数","目的関数"],correct:1,explanation:"カーネル関数は高次元空間での内積を効率的に計算するトリックです。",keywords:["カーネル"]},
      {id:3,type:"scenario",question:"あなたは不動産価格予測システムを開発中です。面積や築年数から価格を予測するため、説明変数と目的変数の関係を直線で表現する最も基本的な手法は？",options:["ロジスティック回帰","線形回帰","多項式回帰","リッジ回帰"],correct:1,explanation:"線形回帰は目的変数と説明変数の線形関係を仮定し、最小二乗法でパラメータを推定します。",keywords:["線形回帰"]},
      {id:4,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「手書き数字認識で0〜9の10種類を予測する問題は【A】である。」",options:["二値分類","多クラス分類","多ラベル分類","回帰問題"],correct:1,explanation:"多クラス分類は3つ以上のクラスから1つを予測する問題です。",keywords:["多クラス分類"]},
      {id:5,type:"scenario",question:"あなたはランダムフォレストの実装を担当中です。各決定木の学習データ作成のため、元データセットから復元抽出でサンプルを生成する手法は？",options:["層化サンプリング","ブートストラップサンプリング","系統サンプリング","クラスタサンプリング"],correct:1,explanation:"ブートストラップサンプリングは復元抽出でサンプルを作成し、バギングの基礎となります。",keywords:["ブートストラップサンプリング"]},
      {id:6,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「複数の時系列変数が互いに影響し合う関係をモデル化するには【A】が適している。」",options:["ARモデル","VARモデル","ARIMAモデル","GARCHモデル"],correct:1,explanation:"VAR（ベクトル自己回帰）モデルは複数時系列変数の相互依存関係を捉えます。",keywords:["ベクトル自己回帰モデル(VARモデル)"]},
      {id:7,type:"scenario",question:"あなたは高次元の遺伝子発現データを可視化する必要があります。データの局所構造を保持しながら2〜3次元に非線形圧縮する手法は？",options:["PCA","t-SNE","LDA","SVD"],correct:1,explanation:"t-SNEは高次元データの局所的な近傍関係を保存しながら低次元に写像します。",keywords:["t-SNE"]},
      {id:8,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「映画のジャンルやキーワードなどアイテム自体の属性に基づいて推薦する手法を【A】と呼ぶ。」",options:["協調フィルタリング","コンテンツベースフィルタリング","ハイブリッドフィルタリング","知識ベースフィルタリング"],correct:1,explanation:"コンテンツベースフィルタリングはアイテムの属性とユーザーの好みの類似性で推薦します。",keywords:["コンテンツベースフィルタリング"]},
      {id:9,type:"scenario",question:"あなたはニュース記事の自動分類システムを開発中です。文書集合から潜在的なトピックを確率的に抽出するモデルは？",options:["TF-IDF","Word2Vec","潜在的ディリクレ配分法(LDA)","BERT"],correct:2,explanation:"LDAは文書がトピックの混合から生成されると仮定する確率的生成モデルです。",keywords:["潜在的ディリクレ配分法(LDA)"]},
      {id:10,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「高次元データ間の距離関係を保持しながら低次元空間に配置する手法を【A】と呼ぶ。」",options:["PCA","t-SNE","多次元尺度構成法(MDS)","UMAP"],correct:2,explanation:"MDSは距離行列から低次元配置を求め、心理学での類似度データ分析等で有効です。",keywords:["多次元尺度構成法(MDS)"]},
      {id:11,type:"scenario",question:"あなたは推薦システムの改善を担当中です。ユーザー×アイテムの評価行列を低ランク行列の積に分解し、欠損値を予測したい。この手法は？",options:["QR分解","LU分解","特異値分解(SVD)","コレスキー分解"],correct:2,explanation:"SVDは行列を3つの行列の積に分解し、推薦システムの欠損値補完に使われます。",keywords:["特異値分解(SVD)"]},
      {id:12,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「LDAやLSAなど、文書集合から潜在的な話題を発見するモデルの総称を【A】と呼ぶ。」",options:["言語モデル","トピックモデル","分類モデル","回帰モデル"],correct:1,explanation:"トピックモデルは文書集合から潜在的なトピック構造を抽出します。",keywords:["トピックモデル"]},
      {id:13,type:"scenario",question:"あなたはWeb広告の最適化を担当中です。複数の広告クリエイティブから最も効果的なものを探索しつつ収益最大化したい。信頼上限を用いた方策は？",options:["ε-greedy方策","UCB方策","ソフトマックス方策","トンプソンサンプリング"],correct:1,explanation:"UCB方策は各選択肢の推定報酬の信頼上限を計算し、最大のものを選択します。",keywords:["UCB方策"]},
      {id:14,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「強化学習において、状態sにいることの価値を表す関数を【A】と呼ぶ。V(s)と表記される。」",options:["行動価値関数","状態価値関数","報酬関数","遷移関数"],correct:1,explanation:"状態価値関数V(s)は状態sから最適方策に従って行動したときの期待累積報酬です。",keywords:["状態価値関数"]},
      {id:15,type:"scenario",question:"あなたはA/Bテストの自動化システムを構築中です。複数選択肢から最適なものを探索する問題で、スロットマシンに例えられるアルゴリズムは？",options:["バンディットアルゴリズム","遺伝的アルゴリズム","焼きなまし法","粒子群最適化"],correct:0,explanation:"バンディットアルゴリズムは多腕バンディット問題を解き、A/Bテストを効率化します。",keywords:["バンディットアルゴリズム"]},
      {id:16,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「強化学習の基礎となる数学的フレームワークで、状態・行動・報酬・遷移確率で定義されるモデルを【A】と呼ぶ。」",options:["隠れマルコフモデル","マルコフ決定過程","ベイジアンネットワーク","条件付き確率場"],correct:1,explanation:"MDP（マルコフ決定過程）は強化学習問題を形式的に定義します。",keywords:["マルコフ決定過程"]},
      {id:17,type:"scenario",question:"あなたはゲームAIを開発中です。エージェントが長期的な報酬を重視するか短期的な報酬を重視するかを制御したい。将来報酬を割り引く係数は？",options:["学習率","割引率","エントロピー係数","温度パラメータ"],correct:1,explanation:"割引率γ（0≤γ≤1）は将来報酬の重要度を制御します。",keywords:["割引率"]},
      {id:18,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「TD学習の一種で、(State, Action, Reward, State', Action')の5つ組でQ値を更新するアルゴリズムを【A】と呼ぶ。」",options:["Q学習","SARSA","Expected SARSA","Double Q学習"],correct:1,explanation:"SARSAはon-policy TD学習で、実際に取った行動に基づいてQ値を更新します。",keywords:["SARSA"]},
      {id:19,type:"scenario",question:"あなたは需要予測モデルの評価を担当中です。外れ値に頑健な評価指標を使いたい。予測値と実測値の差の絶対値の平均は？",options:["MSE","RMSE","MAE","MAPE"],correct:2,explanation:"MAE（平均絶対誤差）は外れ値に対してMSEより頑健です。",keywords:["平均絶対値誤差(MAE)"]},
      {id:20,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「データを訓練用と検証用に一度だけ分割して評価する最も単純な検証方法を【A】と呼ぶ。」",options:["k分割交差検証","ホールドアウト検証","ブートストラップ検証","Leave-one-out検証"],correct:1,explanation:"ホールドアウト検証は実装が簡単ですが、分割の仕方によって結果が変わります。",keywords:["ホールドアウト検証"]}
    ]
  },

  chapter3: {
    id: 3, title: "ニューラルネットワーク基礎", subtitle: "パーセプトロンから最適化まで", character: "🧠", characterName: "神経回路の設計者", quote: "層を重ねて知能を築く", color: "#8B5CF6",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は汎用的な処理を得意とし、複雑な分岐や逐次処理に適している。」",options:["GPU","TPU","CPU","FPGA"],correct:2,explanation:"CPUは複雑な分岐処理や逐次処理に優れています。",keywords:["CPU"]},
      {id:2,type:"scenario",question:"あなたはディープラーニングの学習環境を構築中です。多数のコアで並列計算を行い、行列演算を高速化できるプロセッサは？",options:["CPU","GPU","TPU","NPU"],correct:1,explanation:"GPUは数千のコアで並列計算を実行し、ディープラーニングの学習を高速化します。",keywords:["GPU"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「Googleが機械学習専用に開発した【A】は、テンソル演算に特化したASICである。」",options:["GPU","TPU","CPU","VPU"],correct:1,explanation:"TPU（Tensor Processing Unit）はGoogleが開発した機械学習専用チップです。",keywords:["TPU"]},
      {id:4,type:"scenario",question:"あなたはニューラルネットワークの入門講座を担当中です。入力層と出力層の間にあり、データの特徴を抽出・変換する層は？",options:["入力層","出力層","隠れ層","全結合層"],correct:2,explanation:"隠れ層（中間層）はデータの特徴を階層的に抽出します。",keywords:["隠れ層・入力層・出力層"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「1つ以上の隠れ層を持つフィードフォワードネットワークを【A】と呼ぶ。」",options:["単純パーセプトロン","多層パーセプトロン","畳み込みネットワーク","再帰型ネットワーク"],correct:1,explanation:"多層パーセプトロン（MLP）は隠れ層により非線形な決定境界を学習できます。",keywords:["多層パーセプトロン"]},
      {id:6,type:"scenario",question:"あなたはAIの歴史を解説する記事を執筆中です。隠れ層を持たず、線形分離可能な問題のみ解ける最も単純なNNは？",options:["多層パーセプトロン","単純パーセプトロン","ボルツマンマシン","ホップフィールドネットワーク"],correct:1,explanation:"単純パーセプトロンは入力層と出力層のみで構成され、XOR問題は解けません。",keywords:["単純パーセプトロン"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「ReLUの『死んだニューロン』問題を緩和するため、負の入力に小さな傾きを持たせた活性化関数を【A】と呼ぶ。」",options:["ReLU","Leaky ReLU関数","ELU","SELU"],correct:1,explanation:"Leaky ReLUは負の入力でも小さな勾配を持ち、ニューロンが完全に不活性化することを防ぎます。",keywords:["Leaky ReLU関数"]},
      {id:8,type:"scenario",question:"あなたはRNNの隠れ層に使う活性化関数を選んでいます。出力範囲が-1から1で、シグモイド関数より勾配消失が起きにくい関数は？",options:["ReLU","シグモイド関数","tanh関数","ソフトマックス関数"],correct:2,explanation:"tanh関数は出力が[-1,1]で0中心のため、シグモイドより勾配消失が緩和されます。",keywords:["tanh関数"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「回帰問題で最も一般的な誤差関数は【A】で、予測値と実測値の差の二乗の平均を計算する。」",options:["交差エントロピー","平均二乗誤差関数","Hinge Loss","KLダイバージェンス"],correct:1,explanation:"平均二乗誤差（MSE）は回帰問題の標準的な損失関数です。",keywords:["平均二乗誤差関数"]},
      {id:10,type:"scenario",question:"あなたは特徴選択の研究をしています。不要な特徴の重みを厳密に0にし、スパースなモデルを得たい。非ゼロパラメータ数を最小化する正則化は？",options:["L1正則化","L2正則化","L0正則化","Elastic Net"],correct:2,explanation:"L0正則化は非ゼロパラメータの数を最小化しますが、NP困難です。",keywords:["L0正則化"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「多層ネットワークで出力層の誤差がどの層のパラメータに起因するか不明確になる問題を【A】と呼ぶ。」",options:["勾配消失問題","勾配爆発問題","信用割当問題","過学習問題"],correct:2,explanation:"信用割当問題は深いネットワークで各層の貢献度を評価する困難さを指します。",keywords:["信用割当問題"]},
      {id:12,type:"scenario",question:"あなたは最適化手法の改良を研究中です。Adamの学習率を動的な範囲に制限し、学習の初期と後期で適応的に調整する手法は？",options:["AdaGrad","AdaDelta","AdaBound","AdaMax"],correct:2,explanation:"AdaBoundはAdamの学習率に動的な上限と下限を設け、安定した収束を実現します。",keywords:["AdaBound"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「AdaGradの学習率が単調減少する問題を解決するため、勾配の二乗の指数移動平均を使用する手法を【A】と呼ぶ。」",options:["Adam","RMSprop","AdaDelta","Momentum"],correct:2,explanation:"AdaDeltaは過去の勾配情報を指数的に減衰させ、学習率が過度に小さくなることを防ぎます。",keywords:["AdaDelta"]},
      {id:14,type:"scenario",question:"あなたは最新の最適化手法を調査中です。AMSGradとAdaBoundを組み合わせ、Adamの学習率の最大値に上限を設けた手法は？",options:["AdaBound","AMSBound","RAdam","Lookahead"],correct:1,explanation:"AMSBoundはAMSGradの最大値追跡とAdaBoundの境界制約を組み合わせます。",keywords:["AMSBound"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「データが到着するたびに逐次的にモデルを更新する【A】は、ストリーミングデータへの対応に適している。」",options:["バッチ学習","ミニバッチ学習","オンライン学習","転移学習"],correct:2,explanation:"オンライン学習は1サンプルずつモデルを更新し、リアルタイムで変化するデータに対応できます。",keywords:["オンライン学習"]},
      {id:16,type:"scenario",question:"あなたはニューラルネットワークの学習アルゴリズムを実装中です。誤差関数の勾配を計算し、パラメータを勾配の負の方向に更新する基本的な最適化手法は？",options:["ニュートン法","勾配降下法","焼きなまし法","遺伝的アルゴリズム"],correct:1,explanation:"勾配降下法は誤差関数の勾配方向にパラメータを更新する基本手法です。",keywords:["勾配降下法"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「ニューラルネットワークにおいて、入力と各ニューロンの接続の強さを表すパラメータを【A】と呼ぶ。」",options:["バイアス","重み","活性化値","勾配"],correct:1,explanation:"重み（Weight）はニューロン間の接続強度を表し、学習の主要な対象です。",keywords:["重み"]},
      {id:18,type:"scenario",question:"あなたは活性化関数の重要性を説明中です。入力の線形結合のみを行い、非線形変換を行わない関数を使った場合、層を増やしても表現力が増えない理由を説明します。この関数は？",options:["活性化関数","誤差関数","線形関数","カーネル関数"],correct:2,explanation:"線形関数 f(x)=ax+b を使うと、どれだけ層を重ねても全体は1つの線形変換に帰着します。",keywords:["線形関数"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は各パラメータの過去の勾配の二乗和に基づいて学習率を調整する。頻出特徴の学習率を下げる。」",options:["SGD","Momentum","AdaGrad","Adam"],correct:2,explanation:"AdaGradはスパースなデータに適しており、自然言語処理で効果を発揮します。",keywords:["AdaGrad"]},
      {id:20,type:"scenario",question:"あなたは深層学習で最も広く使われている最適化アルゴリズムを選定中です。MomentumとAdaGradの利点を組み合わせた手法は？",options:["RMSprop","Adam","AdaDelta","Nadam"],correct:1,explanation:"Adam（Adaptive Moment Estimation）は勾配の1次・2次モーメントを推定し、適応的に学習率を調整します。",keywords:["Adam"]}
    ]
  },

  chapter4: {
    id: 4, title: "CNN・RNN構造", subtitle: "画像認識と時系列処理の仕組み", character: "🔬", characterName: "構造の探求者", quote: "構造が機能を生み出す", color: "#F59E0B",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「畳み込み演算で入力画像を走査する小さな重み行列を【A】と呼ぶ。」",options:["フィルタ","ストライド","パディング","プーリング"],correct:0,explanation:"カーネル（フィルタ）は畳み込み層の学習可能なパラメータです。",keywords:["カーネル","フィルタ"]},
      {id:2,type:"scenario",question:"あなたはCNNの動作原理を説明中です。カーネルを入力上でスライドさせながら内積を計算し、特徴マップを生成する演算は？",options:["プーリング操作","畳み込み操作","正規化操作","活性化操作"],correct:1,explanation:"畳み込み操作はカーネルと入力の局所領域の内積を計算します。",keywords:["畳み込み操作"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は畳み込み層で局所的特徴を抽出し、プーリング層で空間的不変性を獲得する。」",options:["RNN","CNN","GAN","Transformer"],correct:1,explanation:"CNN（畳み込みニューラルネットワーク）は画像の局所的なパターンを階層的に学習します。",keywords:["畳み込みニューラルネットワーク(CNN)"]},
      {id:4,type:"scenario",question:"あなたはCNNのデバッグを行っています。畳み込み層の出力を可視化し、どの領域で特定の特徴が活性化しているか確認したい。この出力データは？",options:["カーネル","特徴マップ","潜在変数","埋め込みベクトル"],correct:1,explanation:"特徴マップは畳み込み演算の出力で、特定の特徴が活性化した領域を示します。",keywords:["特徴マップ"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はチャネルをグループに分けて正規化し、バッチサイズに依存しない。物体検出で有効。」",options:["レイヤー正規化","インスタンス正規化","グループ正規化","ウェイト正規化"],correct:2,explanation:"グループ正規化はバッチサイズが小さい場合でも安定した学習が可能です。",keywords:["グループ正規化"]},
      {id:6,type:"scenario",question:"あなたはスタイル変換モデルを開発中です。各サンプル・各チャネルごとに独立して正規化を行い、画像のスタイル情報を保持したい。適切な正規化手法は？",options:["バッチ正規化","レイヤー正規化","インスタンス正規化","グループ正規化"],correct:2,explanation:"インスタンス正規化は各画像のスタイルを正規化し、コンテンツを保持します。",keywords:["インスタンス正規化"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は特徴マップ全体の平均を取り、空間次元を1×1に縮小する。全結合層の代わりに使用される。」",options:["最大値プーリング","平均値プーリング","グローバルアベレージプーリング","ストライドプーリング"],correct:2,explanation:"GAP（Global Average Pooling）は各チャネルを1つの値に集約し、過学習を抑制します。",keywords:["グローバルアベレージプーリング(GAP)"]},
      {id:8,type:"scenario",question:"あなたはプーリング層の設計を検討中です。最大値プーリングより滑らかな特徴を保持したい場合、領域内のすべての値の平均を出力する手法は？",options:["最大値プーリング","平均値プーリング","グローバルアベレージプーリング","アダプティブプーリング"],correct:1,explanation:"平均値プーリングは領域内の全値を考慮するため、より滑らかな特徴表現を得られます。",keywords:["平均値プーリング"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は隠れ層の出力を次の時刻の入力に加える単純な再帰構造で、1990年にElmanにより提案された。」",options:["エルマンネットワーク","ジョルダンネットワーク","LSTM","GRU"],correct:0,explanation:"エルマンネットワークは最も基本的なRNN構造です。",keywords:["エルマンネットワーク"]},
      {id:10,type:"scenario",question:"あなたはRNNの歴史を調査中です。エルマンネットワークの変種で、出力層の値を文脈層を通じて再帰的に入力する構造は？",options:["エルマンネットワーク","ジョルダンネットワーク","双方向RNN","深層RNN"],correct:1,explanation:"ジョルダンネットワークは出力をフィードバックします。",keywords:["ジョルダンネットワーク"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は潜在空間を離散的なコードブックで表現し、高品質な音声や画像の生成に使用される。」",options:["β-VAE","infoVAE","VQ-VAE","CVAE"],correct:2,explanation:"VQ-VAE（Vector Quantized VAE）は離散的な潜在表現を学習します。",keywords:["VQ-VAE"]},
      {id:12,type:"scenario",question:"あなたはVAEの改良を研究中です。潜在空間の情報量を最大化し、より情報豊富な潜在表現を学習するよう改良したモデルは？",options:["β-VAE","infoVAE","VQ-VAE","CVAE"],correct:1,explanation:"infoVAEは相互情報量の最大化を導入します。",keywords:["infoVAE"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はKLダイバージェンス項にβ>1の係数をかけることで、より分離された潜在表現を学習する。」",options:["infoVAE","β-VAE","VQ-VAE","WAE"],correct:1,explanation:"β-VAEは潜在変数の独立性を高め、解釈可能な表現学習に有効です。",keywords:["β-VAE"]},
      {id:14,type:"scenario",question:"あなたはBERTのような大規模モデルを活用したい。大量のラベルなしデータで訓練し、下流タスク用の初期重みを得る学習方法は？",options:["転移学習","事前学習","マルチタスク学習","メタ学習"],correct:1,explanation:"事前学習は自己教師あり学習などでモデルを訓練し、ファインチューニングの初期値として使用します。",keywords:["事前学習"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は複数のオートエンコーダを層状に積み重ね、各層を段階的に事前学習する。深いネットワークの初期化に使用された。」",options:["変分オートエンコーダ","積層オートエンコーダ","スパースオートエンコーダ","デノイジングオートエンコーダ"],correct:1,explanation:"積層オートエンコーダはディープラーニング初期に重要な役割を果たしました。",keywords:["積層オートエンコーダ"]},
      {id:16,type:"scenario",question:"あなたはRNNの計算効率を改善したい。LSTMのゲート機構を簡略化し、更新ゲートとリセットゲートの2つに削減したモデルは？",options:["エルマンネットワーク","ジョルダンネットワーク","LSTM","GRU"],correct:3,explanation:"GRUはLSTMより少ないパラメータで同等の性能を発揮します。",keywords:["GRU"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は忘却ゲート、入力ゲート、出力ゲートを持ち、セル状態を制御することで長期的な依存関係を学習できる。」",options:["GRU","LSTM","エルマンネットワーク","Transformer"],correct:1,explanation:"LSTMは1997年に提案され、勾配消失問題を解決しました。",keywords:["LSTM"]},
      {id:18,type:"scenario",question:"あなたはRNNの学習アルゴリズムを実装中です。時系列を時間方向に展開し、各時刻での誤差を逆伝播させる手法は？",options:["BPTT","RTRL","ESP","Forward-Forward"],correct:0,explanation:"BPTT（Backpropagation Through Time）はRNNを時間方向に展開し、誤差逆伝播を適用します。",keywords:["BPTT"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「LSTMやGRUにおいて、シグモイド関数の出力（0〜1）を使って情報の流れを制御する仕組みを【A】と呼ぶ。」",options:["アテンション機構","ゲート機構","スキップ結合","残差接続"],correct:1,explanation:"ゲート機構はシグモイド出力を乗算することで、情報を選択的に通過させます。",keywords:["ゲート機構"]},
      {id:20,type:"scenario",question:"あなたは固有表現認識タスクに取り組み中です。過去と未来の両方向のコンテキストを利用したいため、順方向と逆方向の2つのRNNを組み合わせます。この構造は？",options:["深層RNN","双方向RNN","階層型RNN","注意機構付きRNN"],correct:1,explanation:"双方向RNN（Bidirectional RNN）は両方向の情報を結合し、文脈をより豊かに捉えます。",keywords:["双方向RNN"]}
    ]
  },

  chapter5: {
    id: 5, title: "データ拡張・画像認識", subtitle: "データ拡張とCNNアーキテクチャ", character: "📸", characterName: "画像の魔術師", quote: "一枚の画像に無限の可能性", color: "#EC4899",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は2つの画像とそのラベルをランダムな比率λで線形補間して混合するデータ拡張手法。」",options:["CutMix","Cutout","Mixup","Random Erasing"],correct:2,explanation:"Mixupは画像とラベルの両方を線形補間し、過学習を抑制します。",keywords:["Mixup"]},
      {id:2,type:"scenario",question:"あなたは画像分類モデルの精度向上に取り組み中です。画像の矩形領域を別の画像のパッチで置換し、ラベルも面積比で混合する手法は？",options:["Mixup","CutMix","Cutout","Random Erasing"],correct:1,explanation:"CutMixはMixupより局所的な特徴学習に有効です。",keywords:["CutMix"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は画像のランダムな矩形領域をゼロでマスクし、オクルージョンへの頑健性を向上させる。」",options:["Mixup","CutMix","Cutout","Random Flip"],correct:2,explanation:"Cutoutは画像の一部を隠すことで、特定の領域に依存しない学習を促進します。",keywords:["Cutout"]},
      {id:4,type:"scenario",question:"あなたはデータ拡張の改良を研究中です。Cutoutと同様に画像の一部を削除しますが、サイズ・位置・アスペクト比がすべてランダムな手法は？",options:["Cutout","Random Erasing","GridMask","Hide-and-Seek"],correct:1,explanation:"Random Erasingはより多様な削除パターンを生成し、頑健性を高めます。",keywords:["Random Erasing"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は画像をランダムに水平・垂直反転させる最も基本的なデータ拡張手法。」",options:["Random Flip","Rotate","Crop","Translate"],correct:0,explanation:"Random Flipは実装が簡単で計算コストも低いですが、効果は大きいです。",keywords:["Random Flip"]},
      {id:6,type:"scenario",question:"あなたはAutoAugmentの計算コストを削減したい。事前定義された拡張手法からランダムにN個選び、同じ強度Mで適用するシンプルな手法は？",options:["AutoAugment","RandAugment","TrivialAugment","GridAugment"],correct:1,explanation:"RandAugmentは2つのハイパーパラメータのみで制御でき、大幅に計算を削減します。",keywords:["RandAugment"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は画像を任意の角度で回転させるデータ拡張手法で、回転不変性の学習に使用される。」",options:["Crop","Rotate","Shear","Scale"],correct:1,explanation:"Rotateは物体の向きが多様なデータセットで効果的です。",keywords:["Rotate"]},
      {id:8,type:"scenario",question:"あなたは位置や大きさの変化に対する頑健性を向上させたい。画像からランダムな位置・サイズの領域を切り取るデータ拡張手法は？",options:["Rotate","Crop","Flip","Blur"],correct:1,explanation:"Cropは物体が画像のどこに位置しても認識できるよう学習を促します。",keywords:["Crop"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は3×3の小さなフィルタを深く積み重ねることで、大きなフィルタと同等の受容野を少ないパラメータで実現した。」",options:["AlexNet","VGG","GoogLeNet","ResNet"],correct:1,explanation:"VGGは「シンプルで深い」設計哲学を示しました。",keywords:["VGG"]},
      {id:10,type:"scenario",question:"あなたは効率的なCNNアーキテクチャを研究中です。1×1、3×3、5×5の畳み込みを並列実行するInceptionモジュールを導入したモデルは？",options:["VGG","GoogLeNet","ResNet","DenseNet"],correct:1,explanation:"GoogLeNet（Inception v1）は複数スケールの特徴を効率的に抽出します。",keywords:["GoogLeNet"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は各層を以降のすべての層と密に接続し、特徴の再利用と勾配の流れを改善する。」",options:["ResNet","DenseNet","VGG","Inception"],correct:1,explanation:"DenseNetは各層の出力を以降のすべての層に連結します。",keywords:["DenseNet"]},
      {id:12,type:"scenario",question:"あなたは精度と効率のバランスが最適なモデルを探しています。NASでベースラインを探索し、深さ・幅・解像度を複合スケーリングで拡大したモデルは？",options:["MobileNet","EfficientNet","ShuffleNet","SqueezeNet"],correct:1,explanation:"EfficientNetは複合スケーリングにより、パラメータ数と精度のトレードオフを最適化しました。",keywords:["EfficientNet"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はDepthwise Separable Convolutionを使用し、計算量を大幅に削減したモバイル端末向けモデル。」",options:["VGG","ResNet","MobileNet","DenseNet"],correct:2,explanation:"MobileNetは深さ方向と点方向の畳み込みを分離し、計算量を約8〜9分の1に削減しました。",keywords:["MobileNet"]},
      {id:14,type:"scenario",question:"あなたはResNetの改良を研究中です。残差ブロックの幅（チャネル数）を増やし、深さを減らすことで学習の高速化と性能向上を実現したモデルは？",options:["ResNeXt","Wide ResNet","DenseNet","SENet"],correct:1,explanation:"Wide ResNetは幅を広げることで、深いネットワークと同等以上の性能を少ない層数で達成しました。",keywords:["Wide ResNet"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はROI Poolingにより特徴マップを共有し、R-CNNの学習を大幅に高速化した物体検出モデル。」",options:["R-CNN","Fast R-CNN","Faster R-CNN","Mask R-CNN"],correct:1,explanation:"Fast R-CNNは画像全体を一度CNNに通し、ROI Poolingで各候補領域の特徴を抽出します。",keywords:["Fast R-CNN"]},
      {id:16,type:"scenario",question:"あなたはリアルタイム物体検出システムを開発中です。Region Proposal NetworkをCNN内に統合し、エンドツーエンド学習を可能にしたモデルは？",options:["Fast R-CNN","Faster R-CNN","Mask R-CNN","YOLO"],correct:1,explanation:"Faster R-CNNはRPNにより候補領域の提案も学習可能にしました。",keywords:["Faster R-CNN"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はFaster R-CNNに並列のマスク予測ブランチを追加し、物体検出とインスタンスセグメンテーションを同時に行う。」",options:["Faster R-CNN","Mask R-CNN","FCN","U-Net"],correct:1,explanation:"Mask R-CNNはROIAlignにより位置ずれを解消し、高品質なマスク予測を実現しました。",keywords:["Mask R-CNN"]},
      {id:18,type:"scenario",question:"あなたはセマンティックセグメンテーションモデルを設計中です。全結合層を1×1畳み込みに置き換え、任意サイズの入力に対応できるようにしたモデルは？",options:["U-Net","FCN","DeepLab","SegNet"],correct:1,explanation:"FCN（Fully Convolutional Network）は全結合層を排除し、ピクセル単位の予測を可能にしました。",keywords:["FCN"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は対称的なエンコーダ・デコーダ構造とスキップ結合により、少ないデータでも高精度なセグメンテーションを実現する。医療画像で広く使われる。」",options:["FCN","U-Net","SegNet","DeepLab"],correct:1,explanation:"U-Netは細胞セグメンテーション用に開発され、医療画像タスクで標準的に使用されています。",keywords:["U-Net"]},
      {id:20,type:"scenario",question:"あなたは様々なサイズの物体を検出したい。トップダウンの経路とスキップ結合で多解像度の特徴をピラミッド状に構築する構造は？",options:["SPP","FPN","PANet","BiFPN"],correct:1,explanation:"FPN（Feature Pyramid Network）は高解像度・低レベル特徴と低解像度・高レベル特徴を組み合わせます。",keywords:["FPN"]}
    ]
  },

  chapter6: {
    id: 6, title: "自然言語処理・音声処理", subtitle: "テキストと音声を理解するAI", character: "💬", characterName: "言葉の翻訳者", quote: "言葉の壁を超えて繋がる", color: "#06B6D4",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は文書を単語の出現頻度のベクトルで表現する手法で、語順情報は失われるがシンプルで効果的。」",options:["TF-IDF","Word2Vec","BoW (Bag-of-Words)","n-gram"],correct:2,explanation:"BoW（Bag-of-Words）は文書を単語の出現回数で表現します。",keywords:["BoW(Bag-of-Words)"]},
      {id:2,type:"scenario",question:"あなたは文書検索システムを構築中です。文書内で頻出かつ他の文書で稀な単語に高い重みを与え、重要度を計算したい。この手法は？",options:["BoW","TF-IDF","BM25","Word2Vec"],correct:1,explanation:"TF-IDFは単語の重要度を計算する古典的手法で、検索エンジンの基礎として広く使われています。",keywords:["TF-IDF"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はn個の連続する単語を1つの単位として扱う。n=2をバイグラム、n=3をトライグラムと呼ぶ。」",options:["BoW","TF-IDF","n-gram","スキップグラム"],correct:2,explanation:"n-gramは単語の連続性を捉えることで、BoWより豊かな表現が可能です。",keywords:["n-gram"]},
      {id:4,type:"scenario",question:"あなたは文脈に応じた単語表現を学習したい。双方向LSTMを使用し、同じ単語でも文脈によって異なる埋め込みを生成するモデルは？",options:["Word2Vec","GloVe","ELMo","fastText"],correct:2,explanation:"ELMoは文脈依存の動的な単語埋め込みを生成し、多義語の表現に特に効果的です。",keywords:["ELMo"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は単語をn-gramに分解して学習し、未知語でもサブワードから埋め込みを構成できる。」",options:["Word2Vec","GloVe","ELMo","fastText"],correct:3,explanation:"fastTextはFacebookが開発し、サブワード情報を活用します。",keywords:["fastText"]},
      {id:6,type:"scenario",question:"あなたはGoogleの最新の大規模言語モデルを調査中です。Pathways技術を活用し、5400億パラメータを持つモデルは？",options:["GPT","BERT","PaLM","LLaMA"],correct:2,explanation:"PaLMは効率的なスケーリングと多様なタスクでの高性能を実現しました。",keywords:["PaLM"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は9つの自然言語理解タスクからなるベンチマークで、BERTなどのモデル評価に広く使用される。」",options:["ImageNet","GLUE","SQuAD","COCO"],correct:1,explanation:"GLUE（General Language Understanding Evaluation）は感情分析、含意認識など多様なタスクでモデルの言語理解能力を総合評価します。",keywords:["GLUE"]},
      {id:8,type:"scenario",question:"あなたは単語をニューラルネットワークに入力するための前処理を実装中です。語彙数の次元を持ち、該当単語の位置のみが1のベクトルは？",options:["分散表現","ワンホットベクトル","埋め込みベクトル","TF-IDFベクトル"],correct:1,explanation:"ワンホットベクトルは最もシンプルな単語表現ですが、次元が語彙数と同じで疎になります。",keywords:["ワンホットベクトル"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「日本語テキストを最小の意味単位に分割し、品詞情報を付与する処理を【A】と呼ぶ。」",options:["構文解析","形態素解析","意味解析","談話解析"],correct:1,explanation:"形態素解析は日本語NLPの前処理として必須です。",keywords:["形態素解析"]},
      {id:10,type:"scenario",question:"あなたは文の構造を解析するシステムを開発中です。単語間の係り受け関係を明らかにし、句構造木や依存関係木を出力する処理は？",options:["形態素解析","構文解析","意味解析","感情分析"],correct:1,explanation:"構文解析は文の文法構造を解析し、機械翻訳や質問応答の基礎となります。",keywords:["構文解析"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はテキストの感情極性（肯定・否定・中立など）を分類するタスクで、レビュー分析やSNS監視で活用される。」",options:["固有表現抽出","感情分析","文書分類","質問応答"],correct:1,explanation:"感情分析（Sentiment Analysis）はマーケティングリサーチや風評監視に広く使用されています。",keywords:["感情分析"]},
      {id:12,type:"scenario",question:"あなたはグローバル展開する企業のため、日本語から英語へのリアルタイム翻訳システムを開発中です。ソース言語からターゲット言語への変換タスクは？",options:["言語モデリング","機械翻訳","テキスト生成","言語検出"],correct:1,explanation:"機械翻訳は統計的手法からニューラル手法（NMT）へと発展し、Transformerで品質が飛躍的に向上しました。",keywords:["機械翻訳"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は質問文に対して文書集合から適切な回答を返すタスクで、抽出型と生成型のアプローチがある。」",options:["情報検索","質問応答","対話システム","文書要約"],correct:1,explanation:"質問応答（QA）はSQuADベンチマークで評価されることが多いです。",keywords:["質問応答"]},
      {id:14,type:"scenario",question:"あなたはニュース記事の要約システムを開発中です。長い文書の要点を短くまとめるタスクで、重要文を選択する方式と新しい文を生成する方式があります。このタスクは？",options:["情報抽出","文書要約","テキスト分類","キーワード抽出"],correct:1,explanation:"文書要約は抽出型（重要文選択）と抽象型（新文生成）に分類されます。",keywords:["文書要約"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は連続的なアナログ音声信号をサンプリングと量子化でデジタルデータに変換する処理。」",options:["D-A変換","A-D変換","FFT","フィルタリング"],correct:1,explanation:"A-D変換（Analog-to-Digital Conversion）は音声処理の第一歩です。",keywords:["A-D変換"]},
      {id:16,type:"scenario",question:"あなたは高品質な音声合成システムを開発中です。DeepMindが開発した自己回帰モデルで、非常に自然な音声を生成できる技術は？",options:["Tacotron","WaveNet","Griffin-Lim","Vocoder"],correct:1,explanation:"WaveNetは音声波形を直接モデル化し、人間と区別がつかないほど自然な音声を生成できます。",keywords:["WaveNet"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】（Text-to-Speech）はテキストを入力として自然な音声を生成する技術で、アクセシビリティやアシスタントで活用される。」",options:["音声認識","音声合成","話者認識","音声強調"],correct:1,explanation:"音声合成は読み上げソフトやスマートスピーカーで広く使用されています。",keywords:["音声合成"]},
      {id:18,type:"scenario",question:"あなたは会議の自動文字起こしシステムを開発中です。音声をテキストに変換する技術で、SiriやAlexaでも使用されているものは？",options:["音声合成","音声認識","話者識別","言語識別"],correct:1,explanation:"音声認識（ASR）はWhisperなどの大規模モデルにより、多言語対応と高精度を実現しています。",keywords:["音声認識"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は言語の意味を区別する最小の音声単位で、日本語には約25個存在する。」",options:["音節","音素","モーラ","音韻"],correct:1,explanation:"音素（Phoneme）は「か」と「が」を区別するような、意味の違いを生む最小の音の単位です。",keywords:["音素"]},
      {id:20,type:"scenario",question:"あなたは従来の音声認識システムを研究中です。観測できない状態の系列を確率的にモデル化し、音声認識で広く使用されたモデルは？",options:["マルコフ連鎖","隠れマルコフモデル","条件付き確率場","ベイジアンネットワーク"],correct:1,explanation:"HMM（隠れマルコフモデル）は音素を隠れ状態、音響特徴を観測としてモデル化しました。",keywords:["隠れマルコフモデル"]}
    ]
  },

  chapter7: {
    id: 7, title: "深層強化学習・生成モデル", subtitle: "自律学習とコンテンツ生成", character: "🎮", characterName: "創造の冒険者", quote: "試行錯誤から最適解へ", color: "#EF4444",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は非同期で複数のエージェントを並列実行し、勾配を集約して学習する深層強化学習手法。」",options:["DQN","A3C","PPO","SAC"],correct:1,explanation:"A3Cは並列化により学習を高速化し、経験の相関も低減します。",keywords:["A3C"]},
      {id:2,type:"scenario",question:"あなたはロボット制御に使う強化学習アルゴリズムを選定中です。方策の更新幅をクリッピングで制限し、安定した学習を実現する手法は？",options:["A3C","TRPO","PPO","SAC"],correct:2,explanation:"PPOはTRPOの複雑な制約を簡単なクリッピングで近似し、実装が容易で安定した学習を実現します。",keywords:["PPO"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はDouble DQN、Prioritized Replay、Dueling Networkなど6つの改良を統合した高性能な深層強化学習アルゴリズム。」",options:["DQN","Double DQN","Dueling DQN","Rainbow"],correct:3,explanation:"Rainbowは各改良の相乗効果により、Atariゲームで人間を大きく超える性能を達成しました。",keywords:["Rainbow"]},
      {id:4,type:"scenario",question:"あなたはDQNの過大評価問題を解決したい。行動選択と価値評価を分離し、別々のネットワークを使用する手法は？",options:["DQN","ダブルDQN","Dueling DQN","NoisyNet"],correct:1,explanation:"ダブルDQNは行動選択にオンラインネットワーク、価値評価にターゲットネットワークを使います。",keywords:["ダブルDQN"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はQ値を状態価値V(s)とアドバンテージA(s,a)に分解し、より効率的な学習を可能にする。」",options:["Double DQN","デュエリングネットワーク","NoisyNet","Rainbow"],correct:1,explanation:"デュエリングネットワークは状態の価値と行動の相対的な優位性を分離して学習します。",keywords:["デュエリングネットワーク"]},
      {id:6,type:"scenario",question:"あなたはシミュレータで学習したロボット制御モデルを実機に適用したい。シミュレーション環境で学習した方策を実世界に転移する技術は？",options:["転移学習","ドメイン適応","sim2real","カリキュラム学習"],correct:2,explanation:"sim2realはシミュレータと実世界のギャップを克服する技術です。",keywords:["sim2real"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はシミュレータの物理パラメータや視覚特性をランダムに変化させ、実環境への汎化を促進する。」",options:["データ拡張","ドメインランダマイゼーション","カリキュラム学習","アンサンブル学習"],correct:1,explanation:"ドメインランダマイゼーションは摩擦係数、質量、照明条件などをランダム化します。",keywords:["ドメインランダマイゼーション"]},
      {id:8,type:"scenario",question:"あなたは報酬がスパースな迷路探索タスクに取り組み中です。ゴールに近づくと追加の報酬を与え、学習を加速させたい。この技術は？",options:["逆強化学習","報酬成形","模倣学習","カリキュラム学習"],correct:1,explanation:"報酬成形（Reward Shaping）は補助的な報酬で学習を誘導します。",keywords:["報酬成形"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は複数のエージェントが協調または競争しながら学習する枠組みで、ゲームAIや交通制御に応用される。」",options:["階層型強化学習","マルチエージェント強化学習(MARL)","分散強化学習","メタ強化学習"],correct:1,explanation:"MARLは複数エージェントの相互作用を扱い、AlphaStarやOpenAI Fiveで成功を収めました。",keywords:["マルチエージェント強化学習(MARL)"]},
      {id:10,type:"scenario",question:"あなたは馬から縞馬への画像変換を行いたい。対応するペアデータがなくても、サイクル一貫性損失で2つのドメイン間の変換を学習できるモデルは？",options:["Pix2Pix","CycleGAN","DCGAN","StyleGAN"],correct:1,explanation:"CycleGANはペアデータなしでドメイン変換を学習します。",keywords:["CycleGAN"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は畳み込み層を使用し、バッチ正規化やLeaky ReLUなどで安定した学習を実現した高品質な画像を生成するGAN。」",options:["GAN","DCGAN","WGAN","StyleGAN"],correct:1,explanation:"DCGANはGANの学習を安定化させる設計指針を示しました。",keywords:["DCGAN"]},
      {id:12,type:"scenario",question:"あなたは複数視点の写真から3Dシーンを再構成したい。ニューラルネットワークで放射輝度場を表現し、新しい視点からの画像を合成できる技術は？",options:["3D CNN","NeRF","Point Cloud","Mesh"],correct:1,explanation:"NeRFは座標を入力として色と密度を出力するMLPで3Dシーンを表現します。",keywords:["NeRF"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は入出力のペア画像から変換を学習する条件付きGANで、スケッチから写真への変換などに使用される。」",options:["CycleGAN","Pix2Pix","DCGAN","BigGAN"],correct:1,explanation:"Pix2Pixは教師あり学習で画像変換を学習します。",keywords:["Pix2Pix"]},
      {id:14,type:"scenario",question:"あなたは医療画像のラベル付けコストを削減したい。少量のラベル付きデータと大量のラベルなしデータを組み合わせて学習する方法は？",options:["教師あり学習","教師なし学習","半教師あり学習","自己教師あり学習"],correct:2,explanation:"半教師あり学習はラベルなしデータの情報も活用し、少ないラベルで高い精度を達成します。",keywords:["半教師あり学習"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は画像を入力として、その内容を説明するテキストを生成するタスクで、CNNとRNN/Transformerを組み合わせて実現される。」",options:["Visual QA","Image Captioning","Image Classification","Object Detection"],correct:1,explanation:"Image Captioningは画像理解と言語生成を組み合わせたマルチモーダルタスクです。",keywords:["Image Captioning"]},
      {id:16,type:"scenario",question:"あなたは画像を見て質問に答えるAIを開発中です。「この画像に何人いますか？」のような質問に画像を見て答えるタスクは？",options:["Image Captioning","Visual Question Answering","Image Retrieval","Scene Understanding"],correct:1,explanation:"VQAは視覚と言語の両方を理解する能力が必要です。",keywords:["Visual Question Answering"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は関連する複数のタスクを同時に学習し、共通の表現を獲得することで各タスクの性能を向上させる。」",options:["転移学習","マルチタスク学習","メタ学習","継続学習"],correct:1,explanation:"マルチタスク学習はタスク間で知識を共有し、正則化効果も得られます。",keywords:["マルチタスク学習"]},
      {id:18,type:"scenario",question:"あなたはブラックボックスモデルの予測を説明したい。予測の周辺を線形モデルで近似し、特徴量の重要度を局所的に説明する手法は？",options:["SHAP","LIME","Grad-CAM","Integrated Gradients"],correct:1,explanation:"LIMEはモデルに依存せず、任意の予測を説明できます。",keywords:["LIME"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はゲーム理論のShapley値に基づき、各特徴量の貢献度を公平に分配するモデル解釈性手法。」",options:["LIME","SHAP","CAM","Attention"],correct:1,explanation:"SHAPは理論的な裏付けがあり、特徴量の貢献度を一貫した方法で計算します。",keywords:["SHAP"]},
      {id:20,type:"scenario",question:"あなたは特徴量の重要度を評価したい。各特徴量の値をランダムにシャッフルし、予測精度の低下を測定する手法は？",options:["SHAP","LIME","Permutation Importance","Feature Ablation"],correct:2,explanation:"Permutation Importanceは特徴量をシャッフルしてモデルの性能低下を測定します。",keywords:["Permutation Importance"]}
    ]
  },

  chapter8: {
    id: 8, title: "AIプロジェクト・数理統計", subtitle: "プロジェクト管理と統計基礎", character: "📈", characterName: "戦略の参謀", quote: "数字で語り、計画で勝つ", color: "#14B8A6",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はCRISP-DMを機械学習向けに拡張し、品質保証の観点を追加したプロセスモデル。」",options:["CRISP-DM","CRISP-ML","MLOps","TDSP"],correct:1,explanation:"CRISP-ML（Q）は機械学習プロジェクトの品質管理を強調します。",keywords:["CRISP-ML"]},
      {id:2,type:"scenario",question:"あなたはAIプロジェクトの技術スタックを選定中です。NumPy、pandas、scikit-learn、TensorFlow、PyTorchなど豊富なライブラリがあり、最も広く使用される言語は？",options:["R","Julia","Python","Scala"],correct:2,explanation:"Pythonはデータサイエンスと機械学習のデファクトスタンダードです。",keywords:["Python"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「AIプロジェクトの成功率を高めるため、データ、技術、ドメイン知識を補完し合う【A】が重要。」",options:["アウトソーシング","他企業や他業種との連携","M&A","ジョイントベンチャー"],correct:1,explanation:"他企業・他業種との連携は、自社にないデータやドメイン知識を補完します。",keywords:["他企業や他業種との連携"]},
      {id:4,type:"scenario",question:"あなたは機械学習の入門講座で統計の基礎を教えています。確率変数がとりうる値とその確率の対応関係を表すものは？",options:["確率密度関数","確率分布","累積分布関数","確率質量関数"],correct:1,explanation:"確率分布は確率変数の振る舞いを記述し、離散型と連続型があります。",keywords:["確率分布"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「ある事象の結果に応じて値が定まる変数を【A】と呼ぶ。離散型と連続型がある。」",options:["説明変数","目的変数","確率変数","潜在変数"],correct:2,explanation:"確率変数は確率的な事象に依存して値が決まります。",keywords:["確率変数"]},
      {id:6,type:"scenario",question:"あなたは連続確率変数の分布を説明中です。各点での確率の「密度」を表し、積分すると1になる関数は？",options:["確率質量関数","確率密度","累積分布関数","尤度関数"],correct:1,explanation:"確率密度関数（PDF）は連続確率変数の分布を記述します。",keywords:["確率密度"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は2つの変数の偏差の積の期待値で、正なら同方向、負なら逆方向に変動する傾向を示す。」",options:["相関係数","共分散","標準偏差","分散"],correct:1,explanation:"共分散は2変数間の線形関係の方向を示します。",keywords:["共分散"]},
      {id:8,type:"scenario",question:"あなたはカテゴリカルデータの代表値を求めています。データセットで最も多く出現する値を示す統計量は？",options:["平均値","中央値","最頻値","最大値"],correct:2,explanation:"最頻値（モード）は名義尺度のデータでも使える唯一の代表値です。",keywords:["最頻値"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は2つの確率変数間で共有される情報量を測定し、変数間の依存関係の強さを表す。」",options:["エントロピー","相互情報量","KLダイバージェンス","交差エントロピー"],correct:1,explanation:"相互情報量は一方の変数を知ることで他方の不確実性がどれだけ減少するかを表します。",keywords:["相互情報量"]},
      {id:10,type:"scenario",question:"あなたはデータの分布を可視化中です。データを階級（ビン）に分け、各階級のデータ数を集計したものは？",options:["ヒストグラム","度数分布","散布図","箱ひげ図"],correct:1,explanation:"度数分布はデータの分布形状を把握する基本的な方法です。",keywords:["度数分布"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「データの大部分から大きく外れた値を【A】と呼ぶ。測定誤差や特異なケースを示すことがある。」",options:["欠損値","異常値","外れ値","ノイズ"],correct:2,explanation:"外れ値は平均や分散に大きな影響を与えます。",keywords:["外れ値"]},
      {id:12,type:"scenario",question:"あなたは2変数の相関から第3の変数の影響を取り除きたい。他の変数の影響を統制した上での相関を測定する係数は？",options:["相関係数","偏相関係数","スピアマン相関","ケンドール相関"],correct:1,explanation:"偏相関係数は疑似相関を排除するのに有効です。",keywords:["偏相関係数"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は機械学習モデルの開発、デプロイ、監視、再学習のライフサイクルを効率化する実践手法。」",options:["DevOps","MLOps","DataOps","AIOps"],correct:1,explanation:"MLOpsはモデルのバージョン管理、自動再学習、A/Bテストなどを体系化します。",keywords:["MLOps"]},
      {id:14,type:"scenario",question:"あなたはAIプロジェクトの初期段階で、アイデアや技術の実現可能性を検証したい。小規模な実験で概念を証明する取り組みは？",options:["MVP","PoC","プロトタイプ","パイロット"],correct:1,explanation:"PoC（Proof of Concept）は本格開発前に技術的な実現可能性を検証します。",keywords:["PoC"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】に従うデータでは、平均±2σ以内に約95%のデータが含まれる。68-95-99.7ルールとして知られる。」",options:["一様分布","正規分布","ポアソン分布","指数分布"],correct:1,explanation:"正規分布（ガウス分布）は自然界や測定誤差で頻繁に現れます。",keywords:["正規分布"]},
      {id:16,type:"scenario",question:"あなたはデータ分析プロジェクトの標準プロセスを導入したい。ビジネス理解から展開までの6フェーズを定義したモデルは？",options:["Waterfall","CRISP-DM","Agile","Scrum"],correct:1,explanation:"CRISP-DM（Cross-Industry Standard Process for Data Mining）は業界標準のプロセスモデルです。",keywords:["CRISP-DM"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はベクトルの方向の類似性を-1〜1で表し、文書や単語の類似度計算でよく使用される。」",options:["ユークリッド距離","マンハッタン距離","コサイン類似度","ジャッカード係数"],correct:2,explanation:"コサイン類似度はベクトルの角度のみを考慮するため、文書の長さに依存しません。",keywords:["コサイン類似度"]},
      {id:18,type:"scenario",question:"あなたは確率分布の「重心」を計算したい。確率変数の各値に確率を重みとして加重平均を取った値は？",options:["最大値","期待値","中央値","分散"],correct:1,explanation:"期待値（Expected Value）は確率分布の平均的な値を表します。",keywords:["期待値"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は分散の正の平方根で、元のデータと同じ単位でばらつきの大きさを表す。」",options:["分散","標準偏差","変動係数","範囲"],correct:1,explanation:"標準偏差は分散を単位を合わせて解釈しやすくしたものです。",keywords:["標準偏差"]},
      {id:20,type:"scenario",question:"あなたはアイスクリームの売上と熱中症の相関を分析中です。因果関係がないのに、気温という共通原因により相関が観測される現象は？",options:["多重共線性","疑似相関","交絡","選択バイアス"],correct:1,explanation:"疑似相関は第三の変数（交絡因子）により見かけ上の相関が生じる現象です。",keywords:["疑似相関"]}
    ]
  },

  chapter9: {
    id: 9, title: "法律・倫理", subtitle: "AI開発の法規制と倫理問題", character: "⚖️", characterName: "正義の番人", quote: "技術に倫理の光を当てる", color: "#6366F1",
    questions: [
      {id:1,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は特定の個人を識別できないよう加工され、復元もできないデータで、一定条件下で本人同意なく利用可能。」",options:["仮名加工情報","匿名加工情報","個人データ","保有個人データ"],correct:1,explanation:"匿名加工情報は再識別が不可能なレベルまで加工されたデータです。",keywords:["個人データ"]},
      {id:2,type:"scenario",question:"あなたは個人情報を他社に提供する必要があります。原則として本人同意が必要ですが、法令に基づく場合等は例外となります。この規定は？",options:["利用目的変更","第三者提供","委託","共同利用"],correct:1,explanation:"第三者提供には厳格な規制がありますが、例外規定も存在します。",keywords:["第三者提供"]},
      {id:3,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「事業者が開示等の権限を有する個人データで、本人からの開示・訂正・削除等の請求に応じる義務があるものを【A】と呼ぶ。」",options:["個人情報","個人データ","保有個人データ","匿名加工情報"],correct:2,explanation:"保有個人データは6ヶ月以上保有する個人データで、本人関与の権利が認められています。",keywords:["保有個人データ"]},
      {id:4,type:"scenario",question:"あなたは個人情報を取得する際のコンプライアンスを確認中です。取得時に本人に通知または公表しなければならないものは？",options:["取得方法","利用目的","保存期間","第三者提供先"],correct:1,explanation:"利用目的の通知・公表は個人情報保護法の基本原則です。",keywords:["利用目的"]},
      {id:5,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「個人データの処理を他社に任せる場合、【A】に該当し、第三者提供の同意は不要だが、委託元は監督義務を負う。」",options:["第三者提供","委託","共同利用","オプトアウト"],correct:1,explanation:"委託先は「第三者」に該当しませんが、委託元は委託先を適切に監督する義務があります。",keywords:["委託"]},
      {id:6,type:"scenario",question:"あなたはAI開発で他社のコードを利用しようとしています。著作権者の許諾なく著作物を複製・配布・公開等する行為は？",options:["著作権侵害","特許侵害","不正競争","名誉毀損"],correct:0,explanation:"著作権侵害は民事上の損害賠償責任に加え、刑事罰の対象にもなります。",keywords:["著作権侵害"]},
      {id:7,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は思想や感情を創作的に表現した著作物に認められる権利で、登録不要で創作と同時に発生する。」",options:["特許権","商標権","著作権","意匠権"],correct:2,explanation:"著作権は自動的に発生し、複製権、公衆送信権、翻案権などの権利の束から構成されます。",keywords:["著作権"]},
      {id:8,type:"scenario",question:"あなたはAI技術の法的保護を検討中です。特許権、著作権、商標権などを総称して何と呼びますか？",options:["無体財産権","知的財産権","産業財産権","独占権"],correct:1,explanation:"知的財産権は人間の知的創造活動の成果を保護します。",keywords:["知的財産権"]},
      {id:9,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は新規性・進歩性のある発明に対して出願・審査を経て付与され、出願から20年間保護される。」",options:["著作権","商標権","特許権","意匠権"],correct:2,explanation:"特許権は技術的なアイデアを保護し、AI関連発明では学習方法やモデル構造が対象となることがあります。",keywords:["特許権"]},
      {id:10,type:"scenario",question:"あなたはAI市場の競争政策を分析中です。不公正な取引方法を判断する際の基準で、自由競争の減殺を指す概念は？",options:["優越的地位の濫用","競争制限","不公正な取引方法","公正競争阻害性"],correct:3,explanation:"公正競争阻害性は独占禁止法における重要な判断基準です。",keywords:["公正競争阻害性"]},
      {id:11,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はカルテル、市場支配的地位の濫用など、自由競争を阻害する行為で、独占禁止法で規制される。」",options:["不正競争","競争制限","排他的取引","優越的地位"],correct:1,explanation:"競争制限行為は市場の効率性と消費者利益を損なう可能性があります。",keywords:["競争制限"]},
      {id:12,type:"scenario",question:"あなたはAIシステムの運用体制を構築中です。システム稼働後の維持管理、バグ修正、アップデート、サポートなどを定める契約は？",options:["開発契約","ライセンス契約","保守契約","SLA"],correct:2,explanation:"保守契約はAIシステムの継続的な運用に不可欠です。",keywords:["保守契約"]},
      {id:13,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】はデータの利用・加工・再配布等の条件を契約で定める権利で、所有権とは異なる。」",options:["著作権譲渡","ライセンス契約","データ利用権","アクセス権"],correct:2,explanation:"データ自体には所有権が認められないため、契約でデータ利用権を設定します。",keywords:["データ利用権"]},
      {id:14,type:"scenario",question:"あなたは店舗にカメラを設置してAI分析を行う計画です。経産省などが策定した、カメラ画像の適切な取扱いについての指針は？",options:["個人情報保護ガイドライン","カメラ画像利活用ガイドブック","映像監視ガイドライン","プライバシーポリシー"],correct:1,explanation:"カメラ画像利活用ガイドブックは、店舗等での画像収集・利用について指針を示しています。",keywords:["カメラ画像利活用ガイドブック"]},
      {id:15,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は事後対応ではなく、設計段階からプライバシー保護を組み込む7原則に基づくアプローチ。」",options:["セキュリティ・バイ・デザイン","プライバシー・バイ・デザイン","倫理・バイ・デザイン","安全・バイ・デザイン"],correct:1,explanation:"プライバシー・バイ・デザインはGDPRでも採用され、国際的に認知されています。",keywords:["プライバシー・バイ・デザイン"]},
      {id:16,type:"scenario",question:"あなたはAIの公平性について議論中です。「公平」とは何かの定義は一意に定まっていますか？それとも文脈によって異なりますか？",options:["定まっている","文脈によって異なる","法律で規定されている","国際標準がある"],correct:1,explanation:"公平性の定義は統計的パリティ、機会の平等など複数存在し、ユースケースに応じて選択が必要です。",keywords:["公平性の定義"]},
      {id:17,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「学習データに含まれる【A】がモデルに反映され、特定の属性に対して不公平な予測を行う原因となる。」",options:["過学習","データの偏り","ノイズ","ラベルエラー"],correct:1,explanation:"データの偏り（バイアス）は、採用AI、融資判定、顔認識など様々な場面で差別的な結果を生む原因となっています。",keywords:["データの偏り"]},
      {id:18,type:"scenario",question:"あなたはAIモデルのセキュリティを担当中です。攻撃者がAPIを悪用してモデルの構造や重みを推測・復元しようとする攻撃は？",options:["データ窃取","モデル窃取","モデル汚染","敵対的攻撃"],correct:1,explanation:"モデル窃取は知的財産の侵害につながります。",keywords:["モデル窃取"]},
      {id:19,type:"fill_in_blank",question:"以下の文章を読み、【A】に当てはまるものを選べ。「【A】は学習データに悪意のあるサンプルを混入し、モデルに誤った学習をさせる攻撃で、データポイズニングとも呼ばれる。」",options:["敵対的攻撃","モデル窃取","モデル汚染","データ窃取"],correct:2,explanation:"モデル汚染は学習段階での攻撃で、バックドアを仕込むことも可能です。",keywords:["モデル汚染"]},
      {id:20,type:"scenario",question:"あなたはディープフェイクの社会的影響を調査中です。政治・社会的影響を与える目的で作成・拡散される虚偽情報は？",options:["誤報","デマ","フェイクニュース","風説"],correct:2,explanation:"フェイクニュースはAI技術（ディープフェイク等）で作成されることも増えています。",keywords:["フェイクニュース"]}
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
function GKenteiQuizApp() {
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
            G検定試験仕様問題マスター
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
export default class QuizOnlyView {
  render() {
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';

    const root = createRoot(container);
    root.render(<GKenteiQuizApp />);

    return container;
  }
}

