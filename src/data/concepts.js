/**
 * 概念図・インフォグラフィックデータ定義
 * ストーリー中に表示される視覚的な概念図
 */

/**
 * 概念図データ
 */
export const CONCEPTS = {
    // AI・ML・DLの包含関係（ベン図）
    'ai-ml-dl-venn': {
        id: 'ai-ml-dl-venn',
        title: 'AI・ML・DLの関係',
        description: '人工知能（AI）、機械学習（ML）、ディープラーニング（DL）の包含関係を示します。',
        type: 'venn',
        svg: `
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6200ea;stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:#6200ea;stop-opacity:0.1" />
                    </linearGradient>
                    <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00bcd4;stop-opacity:0.4" />
                        <stop offset="100%" style="stop-color:#00bcd4;stop-opacity:0.2" />
                    </linearGradient>
                    <linearGradient id="dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#9c27b0;stop-opacity:0.5" />
                        <stop offset="100%" style="stop-color:#9c27b0;stop-opacity:0.3" />
                    </linearGradient>
                </defs>
                
                <!-- AI (最外円) -->
                <ellipse class="concept-layer" data-step="1" cx="200" cy="150" rx="180" ry="130" 
                    fill="url(#aiGrad)" stroke="#6200ea" stroke-width="3"/>
                <text x="200" y="40" text-anchor="middle" fill="#6200ea" font-size="16" font-weight="bold">
                    AI（人工知能）
                </text>
                
                <!-- ML (中間円) -->
                <ellipse class="concept-layer" data-step="2" cx="200" cy="165" rx="130" ry="95" 
                    fill="url(#mlGrad)" stroke="#00bcd4" stroke-width="3"/>
                <text x="200" y="90" text-anchor="middle" fill="#00bcd4" font-size="14" font-weight="bold">
                    ML（機械学習）
                </text>
                
                <!-- DL (最内円) -->
                <ellipse class="concept-layer" data-step="3" cx="200" cy="180" rx="80" ry="60" 
                    fill="url(#dlGrad)" stroke="#9c27b0" stroke-width="3"/>
                <text x="200" y="185" text-anchor="middle" fill="#9c27b0" font-size="14" font-weight="bold">
                    DL
                </text>
                <text x="200" y="205" text-anchor="middle" fill="#9c27b0" font-size="11">
                    （ディープラーニング）
                </text>
                
                <!-- 説明ラベル -->
                <text x="50" y="280" fill="#78909c" font-size="11">AI ⊃ ML ⊃ DL の包含関係</text>
            </svg>
        `,
        steps: [
            { step: 1, label: 'AI：人間の知能を模倣する技術全般', highlight: '#6200ea' },
            { step: 2, label: 'ML：データから学習してパターンを発見', highlight: '#00bcd4' },
            { step: 3, label: 'DL：多層ニューラルネットワークによる深い学習', highlight: '#9c27b0' }
        ]
    },

    // AIブーム年表（タイムライン）
    'ai-boom-timeline': {
        id: 'ai-boom-timeline',
        title: 'AIブームの歴史',
        description: '第1次〜第3次AIブームと「冬の時代」の変遷を示します。',
        type: 'timeline',
        svg: `
            <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">
                <!-- メインタイムライン -->
                <line x1="50" y1="140" x2="450" y2="140" stroke="#4a4a6a" stroke-width="3"/>
                
                <!-- 第1次AIブーム -->
                <g class="concept-layer" data-step="1">
                    <circle cx="90" cy="140" r="12" fill="#4caf50" stroke="#fff" stroke-width="2"/>
                    <text x="90" y="110" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">第1次</text>
                    <text x="90" y="170" text-anchor="middle" fill="#78909c" font-size="10">1950〜60年代</text>
                    <text x="90" y="185" text-anchor="middle" fill="#aaa" font-size="9">探索・推論</text>
                </g>
                
                <!-- 第1次冬 -->
                <g class="concept-layer" data-step="2">
                    <rect x="130" y="130" width="50" height="20" fill="#37474f" rx="3"/>
                    <text x="155" y="145" text-anchor="middle" fill="#90a4ae" font-size="9">冬❄️</text>
                </g>
                
                <!-- 第2次AIブーム -->
                <g class="concept-layer" data-step="3">
                    <circle cx="230" cy="140" r="12" fill="#2196f3" stroke="#fff" stroke-width="2"/>
                    <text x="230" y="110" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">第2次</text>
                    <text x="230" y="170" text-anchor="middle" fill="#78909c" font-size="10">1980年代</text>
                    <text x="230" y="185" text-anchor="middle" fill="#aaa" font-size="9">エキスパートシステム</text>
                </g>
                
                <!-- 第2次冬 -->
                <g class="concept-layer" data-step="4">
                    <rect x="270" y="130" width="50" height="20" fill="#37474f" rx="3"/>
                    <text x="295" y="145" text-anchor="middle" fill="#90a4ae" font-size="9">冬❄️</text>
                </g>
                
                <!-- 第3次AIブーム -->
                <g class="concept-layer" data-step="5">
                    <circle cx="380" cy="140" r="16" fill="#ff5722" stroke="#fff" stroke-width="2"/>
                    <text x="380" y="95" text-anchor="middle" fill="#ff5722" font-size="12" font-weight="bold">第3次</text>
                    <text x="380" y="175" text-anchor="middle" fill="#78909c" font-size="10">2012年〜</text>
                    <text x="380" y="190" text-anchor="middle" fill="#aaa" font-size="9">ディープラーニング</text>
                    <text x="380" y="145" text-anchor="middle" fill="#fff" font-size="10">🔥</text>
                </g>
                
                <!-- 凡例 -->
                <text x="250" y="250" text-anchor="middle" fill="#78909c" font-size="11">
                    2012年のImageNetでDLが革命を起こし、現在に至る
                </text>
            </svg>
        `,
        steps: [
            { step: 1, label: '第1次ブーム：探索と推論の時代', highlight: '#4caf50' },
            { step: 2, label: '第1次冬：現実世界の問題に対処できず', highlight: '#37474f' },
            { step: 3, label: '第2次ブーム：エキスパートシステムの台頭', highlight: '#2196f3' },
            { step: 4, label: '第2次冬：知識のボトルネック問題', highlight: '#37474f' },
            { step: 5, label: '第3次ブーム：ディープラーニング革命', highlight: '#ff5722' }
        ]
    },

    // ニューラルネットワーク構造
    'neural-network-basics': {
        id: 'neural-network-basics',
        title: 'ニューラルネットワークの基本構造',
        description: '入力層・隠れ層・出力層から成るニューラルネットワークの基本構造を示します。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4a4a6a"/>
                    </marker>
                </defs>
                
                <!-- 接続線 -->
                <g class="concept-layer" data-step="4" opacity="0.6">
                    <!-- 入力→隠れ1 -->
                    <line x1="80" y1="80" x2="165" y2="60" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="80" x2="165" y2="120" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="80" x2="165" y2="180" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="150" x2="165" y2="60" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="150" x2="165" y2="120" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="150" x2="165" y2="180" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="220" x2="165" y2="60" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="220" x2="165" y2="120" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="80" y1="220" x2="165" y2="180" stroke="#4a4a6a" stroke-width="1"/>
                    
                    <!-- 隠れ1→隠れ2 -->
                    <line x1="205" y1="60" x2="275" y2="90" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="205" y1="60" x2="275" y2="150" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="205" y1="120" x2="275" y2="90" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="205" y1="120" x2="275" y2="150" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="205" y1="180" x2="275" y2="90" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="205" y1="180" x2="275" y2="150" stroke="#4a4a6a" stroke-width="1"/>
                    
                    <!-- 隠れ2→出力 -->
                    <line x1="315" y1="90" x2="380" y2="120" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="315" y1="150" x2="380" y2="120" stroke="#4a4a6a" stroke-width="1"/>
                </g>
                
                <!-- 入力層 -->
                <g class="concept-layer" data-step="1">
                    <circle cx="60" cy="80" r="20" fill="#4caf50" stroke="#fff" stroke-width="2"/>
                    <circle cx="60" cy="150" r="20" fill="#4caf50" stroke="#fff" stroke-width="2"/>
                    <circle cx="60" cy="220" r="20" fill="#4caf50" stroke="#fff" stroke-width="2"/>
                    <text x="60" y="265" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">入力層</text>
                </g>
                
                <!-- 隠れ層1 -->
                <g class="concept-layer" data-step="2">
                    <circle cx="185" cy="60" r="20" fill="#2196f3" stroke="#fff" stroke-width="2"/>
                    <circle cx="185" cy="120" r="20" fill="#2196f3" stroke="#fff" stroke-width="2"/>
                    <circle cx="185" cy="180" r="20" fill="#2196f3" stroke="#fff" stroke-width="2"/>
                    <text x="185" y="265" text-anchor="middle" fill="#2196f3" font-size="11" font-weight="bold">隠れ層</text>
                </g>
                
                <!-- 隠れ層2 -->
                <g class="concept-layer" data-step="3">
                    <circle cx="295" cy="90" r="20" fill="#9c27b0" stroke="#fff" stroke-width="2"/>
                    <circle cx="295" cy="150" r="20" fill="#9c27b0" stroke="#fff" stroke-width="2"/>
                    <text x="295" y="265" text-anchor="middle" fill="#9c27b0" font-size="11" font-weight="bold">隠れ層</text>
                </g>
                
                <!-- 出力層 -->
                <g class="concept-layer" data-step="5">
                    <circle cx="400" cy="120" r="20" fill="#ff5722" stroke="#fff" stroke-width="2"/>
                    <text x="400" y="265" text-anchor="middle" fill="#ff5722" font-size="11" font-weight="bold">出力層</text>
                </g>
                
                <!-- 説明 -->
                <text x="225" y="290" text-anchor="middle" fill="#78909c" font-size="10">
                    層が深いほど複雑な特徴を学習できる = ディープラーニング
                </text>
            </svg>
        `,
        steps: [
            { step: 1, label: '入力層：データを受け取る', highlight: '#4caf50' },
            { step: 2, label: '隠れ層1：特徴を抽出', highlight: '#2196f3' },
            { step: 3, label: '隠れ層2：より抽象的な特徴を学習', highlight: '#9c27b0' },
            { step: 4, label: '各ノードは全て接続（全結合層）', highlight: '#4a4a6a' },
            { step: 5, label: '出力層：予測結果を出力', highlight: '#ff5722' }
        ]
    },

    // 機械学習の3種類
    'ml-three-types': {
        id: 'ml-three-types',
        title: '機械学習の3つのアプローチ',
        description: '教師あり学習・教師なし学習・強化学習の違いを示します。',
        type: 'comparison',
        svg: `
            <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
                <!-- 教師あり学習 -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="40" width="130" height="180" rx="10" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="2"/>
                    <text x="85" y="70" text-anchor="middle" fill="#4caf50" font-size="13" font-weight="bold">教師あり学習</text>
                    <text x="85" y="95" text-anchor="middle" fill="#aaa" font-size="10">Supervised</text>
                    
                    <!-- アイコン -->
                    <text x="85" y="135" text-anchor="middle" font-size="28">📚</text>
                    
                    <text x="85" y="170" text-anchor="middle" fill="#ccc" font-size="9">正解ラベル付き</text>
                    <text x="85" y="185" text-anchor="middle" fill="#ccc" font-size="9">データで学習</text>
                    <text x="85" y="205" text-anchor="middle" fill="#78909c" font-size="8">例: 画像分類</text>
                </g>
                
                <!-- 教師なし学習 -->
                <g class="concept-layer" data-step="2">
                    <rect x="170" y="40" width="130" height="180" rx="10" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="2"/>
                    <text x="235" y="70" text-anchor="middle" fill="#2196f3" font-size="13" font-weight="bold">教師なし学習</text>
                    <text x="235" y="95" text-anchor="middle" fill="#aaa" font-size="10">Unsupervised</text>
                    
                    <!-- アイコン -->
                    <text x="235" y="135" text-anchor="middle" font-size="28">🎨</text>
                    
                    <text x="235" y="170" text-anchor="middle" fill="#ccc" font-size="9">ラベルなしで</text>
                    <text x="235" y="185" text-anchor="middle" fill="#ccc" font-size="9">パターン発見</text>
                    <text x="235" y="205" text-anchor="middle" fill="#78909c" font-size="8">例: クラスタリング</text>
                </g>
                
                <!-- 強化学習 -->
                <g class="concept-layer" data-step="3">
                    <rect x="320" y="40" width="130" height="180" rx="10" fill="rgba(255, 152, 0, 0.2)" stroke="#ff9800" stroke-width="2"/>
                    <text x="385" y="70" text-anchor="middle" fill="#ff9800" font-size="13" font-weight="bold">強化学習</text>
                    <text x="385" y="95" text-anchor="middle" fill="#aaa" font-size="10">Reinforcement</text>
                    
                    <!-- アイコン -->
                    <text x="385" y="135" text-anchor="middle" font-size="28">🎮</text>
                    
                    <text x="385" y="170" text-anchor="middle" fill="#ccc" font-size="9">試行錯誤で</text>
                    <text x="385" y="185" text-anchor="middle" fill="#ccc" font-size="9">報酬を最大化</text>
                    <text x="385" y="205" text-anchor="middle" fill="#78909c" font-size="8">例: ゲームAI</text>
                </g>
                
                <!-- 共通説明 -->
                <text x="240" y="255" text-anchor="middle" fill="#78909c" font-size="10">
                    目的や利用可能なデータに応じてアプローチを選択する
                </text>
            </svg>
        `,
        steps: [
            { step: 1, label: '教師あり学習：正解データから学ぶ（分類・回帰）', highlight: '#4caf50' },
            { step: 2, label: '教師なし学習：データ構造を自分で発見（クラスタリング）', highlight: '#2196f3' },
            { step: 3, label: '強化学習：報酬を手がかりに最適行動を学ぶ', highlight: '#ff9800' }
        ]
    },

    // 過学習の可視化
    'overfitting-visualization': {
        id: 'overfitting-visualization',
        title: '過学習（Overfitting）の可視化',
        description: '未学習・適切な学習・過学習の違いを視覚的に理解します。',
        type: 'comparison',
        svg: `
            <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
                <!-- 未学習 -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="30" width="140" height="180" rx="8" fill="rgba(255, 152, 0, 0.15)" stroke="#ff9800" stroke-width="2"/>
                    <text x="90" y="55" text-anchor="middle" fill="#ff9800" font-size="12" font-weight="bold">未学習</text>
                    <text x="90" y="75" text-anchor="middle" fill="#aaa" font-size="9">Underfitting</text>
                    <circle cx="50" cy="120" r="4" fill="#4caf50"/>
                    <circle cx="70" cy="140" r="4" fill="#4caf50"/>
                    <circle cx="90" cy="110" r="4" fill="#4caf50"/>
                    <circle cx="110" cy="150" r="4" fill="#4caf50"/>
                    <circle cx="130" cy="130" r="4" fill="#4caf50"/>
                    <line x1="40" y1="160" x2="140" y2="100" stroke="#ff9800" stroke-width="2"/>
                    <text x="90" y="195" text-anchor="middle" fill="#ccc" font-size="9">単純すぎる</text>
                </g>
                <!-- 適切 -->
                <g class="concept-layer" data-step="2">
                    <rect x="180" y="30" width="140" height="180" rx="8" fill="rgba(76, 175, 80, 0.15)" stroke="#4caf50" stroke-width="2"/>
                    <text x="250" y="55" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">適切な学習</text>
                    <text x="250" y="75" text-anchor="middle" fill="#aaa" font-size="9">Good Fit</text>
                    <circle cx="210" cy="140" r="4" fill="#4caf50"/>
                    <circle cx="230" cy="120" r="4" fill="#4caf50"/>
                    <circle cx="250" cy="130" r="4" fill="#4caf50"/>
                    <circle cx="270" cy="110" r="4" fill="#4caf50"/>
                    <circle cx="290" cy="100" r="4" fill="#4caf50"/>
                    <path d="M200 150 Q230 125, 250 130 Q270 120, 300 95" stroke="#4caf50" stroke-width="2" fill="none"/>
                    <text x="250" y="195" text-anchor="middle" fill="#ccc" font-size="9">✓ 汎化OK</text>
                </g>
                <!-- 過学習 -->
                <g class="concept-layer" data-step="3">
                    <rect x="340" y="30" width="140" height="180" rx="8" fill="rgba(244, 67, 54, 0.15)" stroke="#f44336" stroke-width="2"/>
                    <text x="410" y="55" text-anchor="middle" fill="#f44336" font-size="12" font-weight="bold">過学習</text>
                    <text x="410" y="75" text-anchor="middle" fill="#aaa" font-size="9">Overfitting</text>
                    <circle cx="370" cy="130" r="4" fill="#4caf50"/>
                    <circle cx="390" cy="145" r="4" fill="#4caf50"/>
                    <circle cx="410" cy="120" r="4" fill="#4caf50"/>
                    <circle cx="430" cy="140" r="4" fill="#4caf50"/>
                    <circle cx="450" cy="110" r="4" fill="#4caf50"/>
                    <path d="M360 135 Q375 130, 375 130 Q390 145, 395 145 Q410 120, 415 120 Q430 140, 435 140 Q450 110, 455 105" stroke="#f44336" stroke-width="2" fill="none"/>
                    <text x="410" y="195" text-anchor="middle" fill="#ccc" font-size="9">複雑すぎる</text>
                </g>
                <text x="250" y="235" text-anchor="middle" fill="#78909c" font-size="10">訓練データへの適合度と汎化性能のバランスが重要</text>
            </svg>
        `,
        steps: [
            { step: 1, label: '未学習：モデルが単純すぎてパターンを捉えられない', highlight: '#ff9800' },
            { step: 2, label: '適切：訓練データと未知データの両方に良い性能', highlight: '#4caf50' },
            { step: 3, label: '過学習：訓練データに過度に適合し汎化できない', highlight: '#f44336' }
        ]
    },

    // バイアス・バリアンストレードオフ
    'bias-variance-tradeoff': {
        id: 'bias-variance-tradeoff',
        title: 'バイアスとバリアンスのトレードオフ',
        description: 'モデルの複雑さとエラーの関係を示します。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="biasGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#2196f3;stop-opacity:0.8"/>
                        <stop offset="100%" style="stop-color:#2196f3;stop-opacity:0.1"/>
                    </linearGradient>
                    <linearGradient id="varGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#ff9800;stop-opacity:0.1"/>
                        <stop offset="100%" style="stop-color:#ff9800;stop-opacity:0.8"/>
                    </linearGradient>
                </defs>
                <!-- 軸 -->
                <line x1="60" y1="200" x2="400" y2="200" stroke="#4a4a6a" stroke-width="2"/>
                <line x1="60" y1="200" x2="60" y2="40" stroke="#4a4a6a" stroke-width="2"/>
                <text x="230" y="230" text-anchor="middle" fill="#78909c" font-size="11">モデルの複雑さ →</text>
                <text x="30" y="120" text-anchor="middle" fill="#78909c" font-size="11" transform="rotate(-90 30 120)">エラー</text>
                <!-- バイアス曲線 -->
                <g class="concept-layer" data-step="1">
                    <path d="M80 80 Q200 100, 380 180" stroke="#2196f3" stroke-width="3" fill="none"/>
                    <text x="120" y="70" fill="#2196f3" font-size="11" font-weight="bold">バイアス²</text>
                </g>
                <!-- バリアンス曲線 -->
                <g class="concept-layer" data-step="2">
                    <path d="M80 180 Q200 160, 380 60" stroke="#ff9800" stroke-width="3" fill="none"/>
                    <text x="340" y="50" fill="#ff9800" font-size="11" font-weight="bold">バリアンス</text>
                </g>
                <!-- 総エラー -->
                <g class="concept-layer" data-step="3">
                    <path d="M80 100 Q150 90, 200 85 Q280 90, 380 140" stroke="#f44336" stroke-width="3" fill="none" stroke-dasharray="5,3"/>
                    <text x="380" y="155" fill="#f44336" font-size="11" font-weight="bold">総エラー</text>
                </g>
                <!-- 最適点 -->
                <g class="concept-layer" data-step="4">
                    <circle cx="200" cy="85" r="8" fill="#4caf50" stroke="#fff" stroke-width="2"/>
                    <text x="200" y="70" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">最適点</text>
                    <line x1="200" y1="93" x2="200" y2="200" stroke="#4caf50" stroke-width="1" stroke-dasharray="4,4"/>
                </g>
                <text x="100" y="255" fill="#78909c" font-size="9">単純</text>
                <text x="350" y="255" fill="#78909c" font-size="9">複雑</text>
            </svg>
        `,
        steps: [
            { step: 1, label: 'バイアス：モデルが単純すぎる誤差（複雑さ↑で減少）', highlight: '#2196f3' },
            { step: 2, label: 'バリアンス：ノイズへの過敏さ（複雑さ↑で増加）', highlight: '#ff9800' },
            { step: 3, label: '総エラー：バイアス²＋バリアンスの合計', highlight: '#f44336' },
            { step: 4, label: '最適点：両者のバランスが取れた複雑さ', highlight: '#4caf50' }
        ]
    },

    // 活性化関数比較
    'activation-functions': {
        id: 'activation-functions',
        title: '活性化関数の比較',
        description: '代表的な活性化関数のグラフと特徴を比較します。',
        type: 'comparison',
        svg: `
            <svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg">
                <!-- シグモイド -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="30" width="140" height="190" rx="8" fill="rgba(156, 39, 176, 0.1)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="90" y="55" text-anchor="middle" fill="#9c27b0" font-size="11" font-weight="bold">Sigmoid</text>
                    <line x1="40" y1="130" x2="140" y2="130" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="90" y1="80" x2="90" y2="180" stroke="#4a4a6a" stroke-width="1"/>
                    <path d="M45 170 Q70 165, 90 130 Q110 95, 135 90" stroke="#9c27b0" stroke-width="2" fill="none"/>
                    <text x="90" y="200" text-anchor="middle" fill="#aaa" font-size="8">出力: 0〜1</text>
                    <text x="90" y="215" text-anchor="middle" fill="#f44336" font-size="7">⚠️ 勾配消失</text>
                </g>
                <!-- tanh -->
                <g class="concept-layer" data-step="2">
                    <rect x="170" y="30" width="140" height="190" rx="8" fill="rgba(33, 150, 243, 0.1)" stroke="#2196f3" stroke-width="2"/>
                    <text x="240" y="55" text-anchor="middle" fill="#2196f3" font-size="11" font-weight="bold">tanh</text>
                    <line x1="190" y1="130" x2="290" y2="130" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="240" y1="80" x2="240" y2="180" stroke="#4a4a6a" stroke-width="1"/>
                    <path d="M195 175 Q220 170, 240 130 Q260 90, 285 85" stroke="#2196f3" stroke-width="2" fill="none"/>
                    <text x="240" y="200" text-anchor="middle" fill="#aaa" font-size="8">出力: -1〜1</text>
                    <text x="240" y="215" text-anchor="middle" fill="#ff9800" font-size="7">原点中心</text>
                </g>
                <!-- ReLU -->
                <g class="concept-layer" data-step="3">
                    <rect x="320" y="30" width="140" height="190" rx="8" fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="2"/>
                    <text x="390" y="55" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">ReLU</text>
                    <line x1="340" y1="130" x2="440" y2="130" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="390" y1="80" x2="390" y2="180" stroke="#4a4a6a" stroke-width="1"/>
                    <path d="M345 130 L390 130 L435 85" stroke="#4caf50" stroke-width="2" fill="none"/>
                    <text x="390" y="200" text-anchor="middle" fill="#aaa" font-size="8">出力: 0〜∞</text>
                    <text x="390" y="215" text-anchor="middle" fill="#4caf50" font-size="7">✓ 高速・推奨</text>
                </g>
                <text x="240" y="250" text-anchor="middle" fill="#78909c" font-size="10">ReLUが現在最も一般的に使用される</text>
            </svg>
        `,
        steps: [
            { step: 1, label: 'Sigmoid：0〜1出力、確率解釈可能だが勾配消失問題', highlight: '#9c27b0' },
            { step: 2, label: 'tanh：-1〜1出力、原点中心で学習安定', highlight: '#2196f3' },
            { step: 3, label: 'ReLU：計算高速、勾配消失しにくい（推奨）', highlight: '#4caf50' }
        ]
    },

    // 誤差逆伝播フロー
    'backpropagation-flow': {
        id: 'backpropagation-flow',
        title: '誤差逆伝播法の仕組み',
        description: '順伝播で計算し、逆伝播で誤差を伝えて重みを更新する流れを示します。',
        type: 'flow',
        svg: `
            <svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arrowRight" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4caf50"/>
                    </marker>
                    <marker id="arrowLeft" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
                        <polygon points="10 0, 0 3.5, 10 7" fill="#f44336"/>
                    </marker>
                </defs>
                <!-- 順伝播 -->
                <g class="concept-layer" data-step="1">
                    <text x="250" y="25" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">① 順伝播（Forward）</text>
                    <rect x="40" y="50" width="80" height="50" rx="8" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="2"/>
                    <text x="80" y="80" text-anchor="middle" fill="#4caf50" font-size="10">入力</text>
                    <line x1="125" y1="75" x2="175" y2="75" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowRight)"/>
                    <rect x="180" y="50" width="80" height="50" rx="8" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="2"/>
                    <text x="220" y="80" text-anchor="middle" fill="#2196f3" font-size="10">隠れ層</text>
                    <line x1="265" y1="75" x2="315" y2="75" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowRight)"/>
                    <rect x="320" y="50" width="80" height="50" rx="8" fill="rgba(156, 39, 176, 0.2)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="360" y="80" text-anchor="middle" fill="#9c27b0" font-size="10">出力</text>
                    <line x1="405" y1="75" x2="455" y2="75" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowRight)"/>
                    <text x="470" y="80" fill="#4caf50" font-size="10">予測</text>
                </g>
                <!-- 誤差計算 -->
                <g class="concept-layer" data-step="2">
                    <text x="430" y="125" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="bold">② 誤差計算</text>
                    <text x="430" y="145" text-anchor="middle" fill="#aaa" font-size="9">予測 vs 正解</text>
                </g>
                <!-- 逆伝播 -->
                <g class="concept-layer" data-step="3">
                    <text x="250" y="195" text-anchor="middle" fill="#f44336" font-size="12" font-weight="bold">③ 逆伝播（Backward）→ 重み更新</text>
                    <line x1="405" y1="165" x2="125" y2="165" stroke="#f44336" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowLeft)"/>
                    <text x="265" y="180" text-anchor="middle" fill="#f44336" font-size="9">勾配を伝播</text>
                </g>
            </svg>
        `,
        steps: [
            { step: 1, label: '順伝播：入力から出力まで予測値を計算', highlight: '#4caf50' },
            { step: 2, label: '誤差計算：予測と正解の差を損失関数で計算', highlight: '#ff9800' },
            { step: 3, label: '逆伝播：誤差を逆方向に伝えて各重みを更新', highlight: '#f44336' }
        ]
    },

    // 勾配降下法
    'gradient-descent-visualization': {
        id: 'gradient-descent-visualization',
        title: '勾配降下法の仕組み',
        description: '損失関数の最小値を探索する最適化プロセスを示します。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
                <!-- 損失曲線 -->
                <g class="concept-layer" data-step="1">
                    <path d="M50 60 Q100 200, 200 220 Q300 200, 350 100" stroke="#4a4a6a" stroke-width="3" fill="none"/>
                    <text x="200" y="250" text-anchor="middle" fill="#78909c" font-size="11">パラメータ（重み）</text>
                    <text x="25" y="140" fill="#78909c" font-size="10" transform="rotate(-90 25 140)">損失</text>
                </g>
                <!-- 開始点 -->
                <g class="concept-layer" data-step="2">
                    <circle cx="80" cy="120" r="10" fill="#f44336" stroke="#fff" stroke-width="2"/>
                    <text x="80" y="105" text-anchor="middle" fill="#f44336" font-size="9">開始点</text>
                </g>
                <!-- 降下パス -->
                <g class="concept-layer" data-step="3">
                    <path d="M80 120 L120 170 L160 200 L200 215" stroke="#ff9800" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
                    <circle cx="120" cy="170" r="5" fill="#ff9800"/>
                    <circle cx="160" cy="200" r="5" fill="#ff9800"/>
                </g>
                <!-- 最小点 -->
                <g class="concept-layer" data-step="4">
                    <circle cx="200" cy="220" r="12" fill="#4caf50" stroke="#fff" stroke-width="2"/>
                    <text x="200" y="225" text-anchor="middle" fill="#fff" font-size="8">最小</text>
                    <text x="250" y="215" fill="#4caf50" font-size="10">← 最適解</text>
                </g>
                <!-- 学習率の説明 -->
                <g class="concept-layer" data-step="5">
                    <rect x="280" y="40" width="110" height="70" rx="6" fill="rgba(33, 150, 243, 0.1)" stroke="#2196f3" stroke-width="1"/>
                    <text x="335" y="60" text-anchor="middle" fill="#2196f3" font-size="9" font-weight="bold">学習率</text>
                    <text x="335" y="80" text-anchor="middle" fill="#aaa" font-size="8">大: 速いが不安定</text>
                    <text x="335" y="95" text-anchor="middle" fill="#aaa" font-size="8">小: 安定だが遅い</text>
                </g>
            </svg>
        `,
        steps: [
            { step: 1, label: '損失関数：最小化したい誤差の曲面', highlight: '#4a4a6a' },
            { step: 2, label: '開始点：ランダムな初期値から開始', highlight: '#f44336' },
            { step: 3, label: '降下：勾配の逆方向に少しずつ移動', highlight: '#ff9800' },
            { step: 4, label: '最小点：損失が最小になる最適な重み', highlight: '#4caf50' },
            { step: 5, label: '学習率：1回の更新量を決めるパラメータ', highlight: '#2196f3' }
        ]
    },

    // CNN構造図
    'cnn-architecture': {
        id: 'cnn-architecture',
        title: 'CNN（畳み込みニューラルネットワーク）の構造',
        description: '画像認識で使われるCNNの層構造を示します。',
        type: 'architecture',
        svg: `
            <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
                <!-- 入力画像 -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="60" width="60" height="60" fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" stroke-width="2"/>
                    <rect x="25" y="55" width="60" height="60" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="1"/>
                    <rect x="30" y="50" width="60" height="60" fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="1"/>
                    <text x="55" y="145" text-anchor="middle" fill="#4caf50" font-size="9">入力画像</text>
                </g>
                <!-- 畳み込み層 -->
                <g class="concept-layer" data-step="2">
                    <line x1="95" y1="85" x2="115" y2="85" stroke="#4a4a6a" stroke-width="1"/>
                    <rect x="120" y="50" width="50" height="80" rx="4" fill="rgba(33, 150, 243, 0.3)" stroke="#2196f3" stroke-width="2"/>
                    <text x="145" y="95" text-anchor="middle" fill="#2196f3" font-size="8">Conv</text>
                    <text x="145" y="145" text-anchor="middle" fill="#2196f3" font-size="8">畳み込み</text>
                </g>
                <!-- プーリング層 -->
                <g class="concept-layer" data-step="3">
                    <line x1="175" y1="85" x2="195" y2="85" stroke="#4a4a6a" stroke-width="1"/>
                    <rect x="200" y="60" width="40" height="50" rx="4" fill="rgba(156, 39, 176, 0.3)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="220" y="90" text-anchor="middle" fill="#9c27b0" font-size="8">Pool</text>
                    <text x="220" y="145" text-anchor="middle" fill="#9c27b0" font-size="8">プーリング</text>
                </g>
                <!-- 繰り返し -->
                <g class="concept-layer" data-step="4">
                    <line x1="245" y1="85" x2="265" y2="85" stroke="#4a4a6a" stroke-width="1"/>
                    <text x="285" y="90" text-anchor="middle" fill="#78909c" font-size="12">...</text>
                    <line x1="305" y1="85" x2="325" y2="85" stroke="#4a4a6a" stroke-width="1"/>
                </g>
                <!-- 全結合層 -->
                <g class="concept-layer" data-step="5">
                    <rect x="330" y="55" width="30" height="70" rx="4" fill="rgba(255, 152, 0, 0.3)" stroke="#ff9800" stroke-width="2"/>
                    <text x="345" y="95" text-anchor="middle" fill="#ff9800" font-size="7">FC</text>
                    <text x="345" y="145" text-anchor="middle" fill="#ff9800" font-size="8">全結合</text>
                </g>
                <!-- 出力 -->
                <g class="concept-layer" data-step="6">
                    <line x1="365" y1="85" x2="385" y2="85" stroke="#4a4a6a" stroke-width="1"/>
                    <rect x="390" y="65" width="80" height="40" rx="4" fill="rgba(244, 67, 54, 0.3)" stroke="#f44336" stroke-width="2"/>
                    <text x="430" y="90" text-anchor="middle" fill="#f44336" font-size="9">分類結果</text>
                    <text x="430" y="145" text-anchor="middle" fill="#f44336" font-size="8">猫/犬/...</text>
                </g>
                <text x="260" y="185" text-anchor="middle" fill="#78909c" font-size="9">特徴抽出 → 分類</text>
            </svg>
        `,
        steps: [
            { step: 1, label: '入力画像：RGB画像（3チャンネル）', highlight: '#4caf50' },
            { step: 2, label: '畳み込み層：フィルタで局所的特徴を抽出', highlight: '#2196f3' },
            { step: 3, label: 'プーリング層：サイズを縮小、位置不変性を獲得', highlight: '#9c27b0' },
            { step: 4, label: '繰り返し：深い層ほど抽象的な特徴を学習', highlight: '#78909c' },
            { step: 5, label: '全結合層：特徴を統合して最終判断', highlight: '#ff9800' },
            { step: 6, label: '出力：各クラスの確率を出力', highlight: '#f44336' }
        ]
    },

    // RNN/LSTM構造比較
    'rnn-lstm-structure': {
        id: 'rnn-lstm-structure',
        title: 'RNN vs LSTM vs GRU',
        description: '時系列データを扱うネットワークの進化を示します。',
        type: 'comparison',
        svg: `
            <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
                <!-- RNN -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="30" width="140" height="170" rx="8" fill="rgba(244, 67, 54, 0.1)" stroke="#f44336" stroke-width="2"/>
                    <text x="90" y="55" text-anchor="middle" fill="#f44336" font-size="12" font-weight="bold">RNN</text>
                    <circle cx="90" cy="110" r="25" fill="rgba(244, 67, 54, 0.3)" stroke="#f44336" stroke-width="2"/>
                    <text x="90" y="115" text-anchor="middle" fill="#f44336" font-size="10">h</text>
                    <path d="M70 90 Q50 70, 70 70 Q90 70, 90 85" stroke="#f44336" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
                    <text x="90" y="160" text-anchor="middle" fill="#aaa" font-size="8">シンプルな構造</text>
                    <text x="90" y="180" text-anchor="middle" fill="#f44336" font-size="7">⚠️ 長期記憶が苦手</text>
                </g>
                <!-- LSTM -->
                <g class="concept-layer" data-step="2">
                    <rect x="180" y="30" width="140" height="170" rx="8" fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="2"/>
                    <text x="250" y="55" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">LSTM</text>
                    <rect x="210" y="85" width="80" height="50" rx="6" fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" stroke-width="2"/>
                    <text x="250" y="105" text-anchor="middle" fill="#4caf50" font-size="8">3つのゲート</text>
                    <text x="250" y="120" text-anchor="middle" fill="#4caf50" font-size="7">忘却/入力/出力</text>
                    <text x="250" y="160" text-anchor="middle" fill="#aaa" font-size="8">長期記憶を保持</text>
                    <text x="250" y="180" text-anchor="middle" fill="#4caf50" font-size="7">✓ 高精度</text>
                </g>
                <!-- GRU -->
                <g class="concept-layer" data-step="3">
                    <rect x="340" y="30" width="140" height="170" rx="8" fill="rgba(33, 150, 243, 0.1)" stroke="#2196f3" stroke-width="2"/>
                    <text x="410" y="55" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">GRU</text>
                    <rect x="370" y="85" width="80" height="50" rx="6" fill="rgba(33, 150, 243, 0.3)" stroke="#2196f3" stroke-width="2"/>
                    <text x="410" y="105" text-anchor="middle" fill="#2196f3" font-size="8">2つのゲート</text>
                    <text x="410" y="120" text-anchor="middle" fill="#2196f3" font-size="7">更新/リセット</text>
                    <text x="410" y="160" text-anchor="middle" fill="#aaa" font-size="8">LSTMを簡略化</text>
                    <text x="410" y="180" text-anchor="middle" fill="#2196f3" font-size="7">✓ 高速・軽量</text>
                </g>
                <text x="250" y="225" text-anchor="middle" fill="#78909c" font-size="9">用途に応じてLSTMかGRUを選択</text>
            </svg>
        `,
        steps: [
            { step: 1, label: 'RNN：シンプルだが長期依存性問題がある', highlight: '#f44336' },
            { step: 2, label: 'LSTM：3つのゲートで長期記憶を保持（高精度）', highlight: '#4caf50' },
            { step: 3, label: 'GRU：LSTMの簡略版、計算効率が良い', highlight: '#2196f3' }
        ]
    },

    // GAN構造図
    'gan-architecture': {
        id: 'gan-architecture',
        title: 'GAN（敵対的生成ネットワーク）の仕組み',
        description: '生成器と識別器が競争しながら学習する仕組みを示します。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg">
                <!-- ノイズ入力 -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="90" width="60" height="50" rx="6" fill="rgba(156, 39, 176, 0.2)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="50" y="120" text-anchor="middle" fill="#9c27b0" font-size="9">ノイズ z</text>
                </g>
                <!-- 生成器 -->
                <g class="concept-layer" data-step="2">
                    <line x1="85" y1="115" x2="115" y2="115" stroke="#4a4a6a" stroke-width="1"/>
                    <rect x="120" y="80" width="90" height="70" rx="8" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="2"/>
                    <text x="165" y="110" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">生成器 G</text>
                    <text x="165" y="130" text-anchor="middle" fill="#4caf50" font-size="8">Generator</text>
                </g>
                <!-- 生成画像 -->
                <g class="concept-layer" data-step="3">
                    <line x1="215" y1="115" x2="245" y2="115" stroke="#4a4a6a" stroke-width="1"/>
                    <rect x="250" y="95" width="40" height="40" rx="4" fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" stroke-width="1"/>
                    <text x="270" y="155" text-anchor="middle" fill="#4caf50" font-size="8">偽物</text>
                </g>
                <!-- 本物画像 -->
                <g class="concept-layer" data-step="4">
                    <rect x="250" y="180" width="40" height="40" rx="4" fill="rgba(33, 150, 243, 0.3)" stroke="#2196f3" stroke-width="1"/>
                    <text x="270" y="235" text-anchor="middle" fill="#2196f3" font-size="8">本物</text>
                </g>
                <!-- 識別器 -->
                <g class="concept-layer" data-step="5">
                    <line x1="295" y1="115" x2="325" y2="145" stroke="#4a4a6a" stroke-width="1"/>
                    <line x1="295" y1="200" x2="325" y2="170" stroke="#4a4a6a" stroke-width="1"/>
                    <rect x="330" y="120" width="90" height="70" rx="8" fill="rgba(255, 152, 0, 0.2)" stroke="#ff9800" stroke-width="2"/>
                    <text x="375" y="150" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="bold">識別器 D</text>
                    <text x="375" y="170" text-anchor="middle" fill="#ff9800" font-size="8">Discriminator</text>
                </g>
                <!-- 判定 -->
                <g class="concept-layer" data-step="6">
                    <line x1="425" y1="155" x2="455" y2="155" stroke="#4a4a6a" stroke-width="1"/>
                    <text x="465" y="150" fill="#78909c" font-size="9">本物?</text>
                    <text x="465" y="165" fill="#78909c" font-size="9">偽物?</text>
                </g>
                <!-- 競争の矢印 -->
                <path d="M165 155 Q165 200, 300 200 Q350 200, 350 190" stroke="#f44336" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/>
                <text x="250" y="50" text-anchor="middle" fill="#78909c" font-size="10">生成器は識別器を騙そうとし、識別器は見破ろうとする</text>
            </svg>
        `,
        steps: [
            { step: 1, label: 'ノイズ：ランダムなベクトルを入力', highlight: '#9c27b0' },
            { step: 2, label: '生成器G：ノイズから画像を生成', highlight: '#4caf50' },
            { step: 3, label: '偽物画像：生成器が作った画像', highlight: '#4caf50' },
            { step: 4, label: '本物画像：実際のデータセットの画像', highlight: '#2196f3' },
            { step: 5, label: '識別器D：本物か偽物かを判定', highlight: '#ff9800' },
            { step: 6, label: '競争：両者が騙し合いながら成長', highlight: '#f44336' }
        ]
    },

    // 転移学習フロー
    'transfer-learning-flow': {
        id: 'transfer-learning-flow',
        title: '転移学習とファインチューニング',
        description: '事前学習モデルを活用して少ないデータで高性能を実現する手法を示します。',
        type: 'flow',
        svg: `
            <svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
                <!-- 事前学習 -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="40" width="140" height="80" rx="8" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="2"/>
                    <text x="90" y="70" text-anchor="middle" fill="#2196f3" font-size="11" font-weight="bold">事前学習モデル</text>
                    <text x="90" y="90" text-anchor="middle" fill="#aaa" font-size="8">ImageNet等で学習済み</text>
                    <text x="90" y="105" text-anchor="middle" fill="#aaa" font-size="8">100万枚の画像</text>
                </g>
                <!-- 矢印 -->
                <g class="concept-layer" data-step="2">
                    <line x1="165" y1="80" x2="195" y2="80" stroke="#4a4a6a" stroke-width="2"/>
                    <polygon points="195 75, 205 80, 195 85" fill="#4a4a6a"/>
                </g>
                <!-- 新しいタスク -->
                <g class="concept-layer" data-step="3">
                    <rect x="210" y="40" width="140" height="80" rx="8" fill="rgba(156, 39, 176, 0.2)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="280" y="65" text-anchor="middle" fill="#9c27b0" font-size="10" font-weight="bold">新しいタスク</text>
                    <text x="280" y="85" text-anchor="middle" fill="#aaa" font-size="8">例: 医療画像分類</text>
                    <text x="280" y="100" text-anchor="middle" fill="#aaa" font-size="8">少量のデータでOK</text>
                </g>
                <!-- ファインチューニング -->
                <g class="concept-layer" data-step="4">
                    <rect x="20" y="150" width="200" height="50" rx="6" fill="rgba(76, 175, 80, 0.15)" stroke="#4caf50" stroke-width="1"/>
                    <text x="120" y="175" text-anchor="middle" fill="#4caf50" font-size="10">ファインチューニング：全体を微調整</text>
                </g>
                <g class="concept-layer" data-step="5">
                    <rect x="240" y="150" width="200" height="50" rx="6" fill="rgba(255, 152, 0, 0.15)" stroke="#ff9800" stroke-width="1"/>
                    <text x="340" y="175" text-anchor="middle" fill="#ff9800" font-size="10">特徴抽出：最終層のみ変更</text>
                </g>
                <!-- 矢印 -->
                <line x1="355" y1="80" x2="385" y2="80" stroke="#4a4a6a" stroke-width="2"/>
                <polygon points="385 75, 395 80, 385 85" fill="#4a4a6a"/>
                <text x="450" y="75" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">高精度</text>
                <text x="450" y="95" text-anchor="middle" fill="#aaa" font-size="8">少データでも</text>
            </svg>
        `,
        steps: [
            { step: 1, label: '事前学習モデル：大規模データで学習済み', highlight: '#2196f3' },
            { step: 2, label: '知識を転移：学習済みの特徴抽出能力を活用', highlight: '#4a4a6a' },
            { step: 3, label: '新タスク：少量データの新しい問題に適用', highlight: '#9c27b0' },
            { step: 4, label: 'ファインチューニング：全層を微調整', highlight: '#4caf50' },
            { step: 5, label: '特徴抽出：最終層のみ変更（よりシンプル）', highlight: '#ff9800' }
        ]
    },

    // AIプロジェクトライフサイクル
    'ai-project-lifecycle': {
        id: 'ai-project-lifecycle',
        title: 'AIプロジェクトのライフサイクル',
        description: 'AIプロジェクトの各フェーズと流れを示します。',
        type: 'cycle',
        svg: `
            <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
                <!-- 中心 -->
                <circle cx="240" cy="140" r="35" fill="rgba(98, 0, 234, 0.2)" stroke="#6200ea" stroke-width="2"/>
                <text x="240" y="135" text-anchor="middle" fill="#6200ea" font-size="10" font-weight="bold">AI</text>
                <text x="240" y="150" text-anchor="middle" fill="#6200ea" font-size="8">プロジェクト</text>
                <!-- フェーズ1: 課題定義 -->
                <g class="concept-layer" data-step="1">
                    <circle cx="240" cy="40" r="30" fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" stroke-width="2"/>
                    <text x="240" y="38" text-anchor="middle" fill="#4caf50" font-size="8" font-weight="bold">1. 課題</text>
                    <text x="240" y="50" text-anchor="middle" fill="#4caf50" font-size="7">定義</text>
                </g>
                <!-- フェーズ2: データ収集 -->
                <g class="concept-layer" data-step="2">
                    <circle cx="360" cy="80" r="30" fill="rgba(33, 150, 243, 0.3)" stroke="#2196f3" stroke-width="2"/>
                    <text x="360" y="78" text-anchor="middle" fill="#2196f3" font-size="8" font-weight="bold">2. データ</text>
                    <text x="360" y="90" text-anchor="middle" fill="#2196f3" font-size="7">収集</text>
                </g>
                <!-- フェーズ3: モデル開発 -->
                <g class="concept-layer" data-step="3">
                    <circle cx="400" cy="180" r="30" fill="rgba(156, 39, 176, 0.3)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="400" y="178" text-anchor="middle" fill="#9c27b0" font-size="8" font-weight="bold">3. モデル</text>
                    <text x="400" y="190" text-anchor="middle" fill="#9c27b0" font-size="7">開発</text>
                </g>
                <!-- フェーズ4: 評価 -->
                <g class="concept-layer" data-step="4">
                    <circle cx="300" cy="250" r="30" fill="rgba(255, 152, 0, 0.3)" stroke="#ff9800" stroke-width="2"/>
                    <text x="300" y="253" text-anchor="middle" fill="#ff9800" font-size="8" font-weight="bold">4. 評価</text>
                </g>
                <!-- フェーズ5: 本番導入 -->
                <g class="concept-layer" data-step="5">
                    <circle cx="180" cy="250" r="30" fill="rgba(244, 67, 54, 0.3)" stroke="#f44336" stroke-width="2"/>
                    <text x="180" y="248" text-anchor="middle" fill="#f44336" font-size="8" font-weight="bold">5. 本番</text>
                    <text x="180" y="260" text-anchor="middle" fill="#f44336" font-size="7">導入</text>
                </g>
                <!-- フェーズ6: 運用・改善 -->
                <g class="concept-layer" data-step="6">
                    <circle cx="80" cy="180" r="30" fill="rgba(0, 188, 212, 0.3)" stroke="#00bcd4" stroke-width="2"/>
                    <text x="80" y="178" text-anchor="middle" fill="#00bcd4" font-size="8" font-weight="bold">6. 運用</text>
                    <text x="80" y="190" text-anchor="middle" fill="#00bcd4" font-size="7">改善</text>
                </g>
                <!-- 矢印（円弧） -->
                <path d="M260 45 Q310 30, 335 60" stroke="#4a4a6a" stroke-width="1.5" fill="none"/>
                <path d="M385 95 Q420 130, 410 160" stroke="#4a4a6a" stroke-width="1.5" fill="none"/>
                <path d="M385 200 Q370 230, 330 245" stroke="#4a4a6a" stroke-width="1.5" fill="none"/>
                <path d="M270 255 Q230 265, 210 255" stroke="#4a4a6a" stroke-width="1.5" fill="none"/>
                <path d="M155 235 Q120 220, 95 205" stroke="#4a4a6a" stroke-width="1.5" fill="none"/>
                <path d="M70 155 Q60 100, 100 60 Q150 30, 215 35" stroke="#4a4a6a" stroke-width="1.5" fill="none" stroke-dasharray="4,2"/>
            </svg>
        `,
        steps: [
            { step: 1, label: '課題定義：ビジネス課題とAI適用可能性を検討', highlight: '#4caf50' },
            { step: 2, label: 'データ収集：必要なデータを収集・整備', highlight: '#2196f3' },
            { step: 3, label: 'モデル開発：アルゴリズム選択と学習', highlight: '#9c27b0' },
            { step: 4, label: '評価：精度・性能・公平性を検証', highlight: '#ff9800' },
            { step: 5, label: '本番導入：システムに組み込みデプロイ', highlight: '#f44336' },
            { step: 6, label: '運用・改善：監視と継続的な改善', highlight: '#00bcd4' }
        ]
    },

    // ベイズの定理
    'bayes-theorem': {
        id: 'bayes-theorem',
        title: 'ベイズの定理',
        description: '事後確率を計算する条件付き確率の公式を示します。',
        type: 'formula',
        svg: `
            <svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg">
                <!-- 公式 -->
                <g class="concept-layer" data-step="1">
                    <rect x="60" y="30" width="340" height="70" rx="10" fill="rgba(98, 0, 234, 0.2)" stroke="#6200ea" stroke-width="2"/>
                    <text x="230" y="55" text-anchor="middle" fill="#6200ea" font-size="14" font-weight="bold">ベイズの定理</text>
                    <text x="230" y="80" text-anchor="middle" fill="#fff" font-size="16" font-family="serif">P(A|B) = P(B|A) × P(A) / P(B)</text>
                </g>
                <!-- 各項の説明 -->
                <g class="concept-layer" data-step="2">
                    <rect x="30" y="120" width="95" height="50" rx="6" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="1"/>
                    <text x="77" y="140" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">P(A|B)</text>
                    <text x="77" y="158" text-anchor="middle" fill="#aaa" font-size="8">事後確率</text>
                </g>
                <g class="concept-layer" data-step="3">
                    <rect x="135" y="120" width="95" height="50" rx="6" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="1"/>
                    <text x="182" y="140" text-anchor="middle" fill="#2196f3" font-size="10" font-weight="bold">P(B|A)</text>
                    <text x="182" y="158" text-anchor="middle" fill="#aaa" font-size="8">尤度</text>
                </g>
                <g class="concept-layer" data-step="4">
                    <rect x="240" y="120" width="95" height="50" rx="6" fill="rgba(255, 152, 0, 0.2)" stroke="#ff9800" stroke-width="1"/>
                    <text x="287" y="140" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">P(A)</text>
                    <text x="287" y="158" text-anchor="middle" fill="#aaa" font-size="8">事前確率</text>
                </g>
                <g class="concept-layer" data-step="5">
                    <rect x="345" y="120" width="95" height="50" rx="6" fill="rgba(156, 39, 176, 0.2)" stroke="#9c27b0" stroke-width="1"/>
                    <text x="392" y="140" text-anchor="middle" fill="#9c27b0" font-size="10" font-weight="bold">P(B)</text>
                    <text x="392" y="158" text-anchor="middle" fill="#aaa" font-size="8">周辺確率</text>
                </g>
                <text x="230" y="210" text-anchor="middle" fill="#78909c" font-size="10">新しい証拠Bを得て、仮説Aの確率を更新する</text>
            </svg>
        `,
        steps: [
            { step: 1, label: 'ベイズの定理：条件付き確率を計算する公式', highlight: '#6200ea' },
            { step: 2, label: 'P(A|B)：Bが起きたときAが起きる確率（求めたい）', highlight: '#4caf50' },
            { step: 3, label: 'P(B|A)：Aが真のときBが観測される確率（尤度）', highlight: '#2196f3' },
            { step: 4, label: 'P(A)：Bを知る前のAの確率（事前確率）', highlight: '#ff9800' },
            { step: 5, label: 'P(B)：Bが観測される全体の確率', highlight: '#9c27b0' }
        ]
    },

    // 正規分布
    'normal-distribution': {
        id: 'normal-distribution',
        title: '正規分布（ガウス分布）',
        description: '自然界で最も一般的な確率分布で、釣鐘型の曲線を描きます。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg">
                <!-- 軸 -->
                <line x1="50" y1="180" x2="400" y2="180" stroke="#4a4a6a" stroke-width="2"/>
                <line x1="225" y1="180" x2="225" y2="40" stroke="#4a4a6a" stroke-width="1" stroke-dasharray="4,2"/>
                <!-- 曲線 -->
                <g class="concept-layer" data-step="1">
                    <path d="M60 178 Q100 176, 130 170 Q160 155, 190 120 Q210 80, 225 50 Q240 80, 260 120 Q290 155, 320 170 Q350 176, 390 178" stroke="#2196f3" stroke-width="3" fill="rgba(33, 150, 243, 0.2)"/>
                </g>
                <!-- μ（平均） -->
                <g class="concept-layer" data-step="2">
                    <circle cx="225" cy="180" r="6" fill="#4caf50"/>
                    <text x="225" y="200" text-anchor="middle" fill="#4caf50" font-size="14" font-weight="bold">μ</text>
                    <text x="225" y="215" text-anchor="middle" fill="#aaa" font-size="9">平均</text>
                </g>
                <!-- σ（標準偏差） -->
                <g class="concept-layer" data-step="3">
                    <line x1="155" y1="165" x2="295" y2="165" stroke="#ff9800" stroke-width="2"/>
                    <line x1="155" y1="160" x2="155" y2="170" stroke="#ff9800" stroke-width="2"/>
                    <line x1="295" y1="160" x2="295" y2="170" stroke="#ff9800" stroke-width="2"/>
                    <text x="155" y="155" text-anchor="middle" fill="#ff9800" font-size="10">-σ</text>
                    <text x="295" y="155" text-anchor="middle" fill="#ff9800" font-size="10">+σ</text>
                    <text x="225" y="145" text-anchor="middle" fill="#ff9800" font-size="9">約68%</text>
                </g>
                <!-- 特性 -->
                <g class="concept-layer" data-step="4">
                    <rect x="300" y="50" width="130" height="60" rx="6" fill="rgba(156, 39, 176, 0.1)" stroke="#9c27b0" stroke-width="1"/>
                    <text x="365" y="70" text-anchor="middle" fill="#9c27b0" font-size="9" font-weight="bold">特性</text>
                    <text x="365" y="85" text-anchor="middle" fill="#aaa" font-size="8">・左右対称</text>
                    <text x="365" y="100" text-anchor="middle" fill="#aaa" font-size="8">・平均=中央値=最頻値</text>
                </g>
                <text x="225" y="240" text-anchor="middle" fill="#78909c" font-size="10">身長、テストの点数、測定誤差など多くの現象に見られる</text>
            </svg>
        `,
        steps: [
            { step: 1, label: '正規分布：釣鐘型の連続確率分布', highlight: '#2196f3' },
            { step: 2, label: '平均μ：分布の中心位置', highlight: '#4caf50' },
            { step: 3, label: '標準偏差σ：分布の幅（広がり具合）', highlight: '#ff9800' },
            { step: 4, label: '特性：左右対称で平均＝中央値＝最頻値', highlight: '#9c27b0' }
        ]
    },

    // 相関と因果
    'correlation-causation': {
        id: 'correlation-causation',
        title: '相関と因果の違い',
        description: '相関関係があっても因果関係があるとは限りません。',
        type: 'comparison',
        svg: `
            <svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg">
                <!-- 相関 -->
                <g class="concept-layer" data-step="1">
                    <rect x="30" y="30" width="180" height="120" rx="10" fill="rgba(33, 150, 243, 0.1)" stroke="#2196f3" stroke-width="2"/>
                    <text x="120" y="55" text-anchor="middle" fill="#2196f3" font-size="12" font-weight="bold">相関（Correlation）</text>
                    <text x="120" y="80" text-anchor="middle" fill="#aaa" font-size="9">2つの変数が</text>
                    <text x="120" y="95" text-anchor="middle" fill="#aaa" font-size="9">一緒に変動する</text>
                    <text x="120" y="125" text-anchor="middle" fill="#2196f3" font-size="11">A ↔ B</text>
                </g>
                <!-- 因果 -->
                <g class="concept-layer" data-step="2">
                    <rect x="270" y="30" width="180" height="120" rx="10" fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="2"/>
                    <text x="360" y="55" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">因果（Causation）</text>
                    <text x="360" y="80" text-anchor="middle" fill="#aaa" font-size="9">一方が他方を</text>
                    <text x="360" y="95" text-anchor="middle" fill="#aaa" font-size="9">引き起こす</text>
                    <text x="360" y="125" text-anchor="middle" fill="#4caf50" font-size="11">A → B</text>
                </g>
                <!-- 例 -->
                <g class="concept-layer" data-step="3">
                    <rect x="80" y="170" width="320" height="60" rx="8" fill="rgba(255, 152, 0, 0.1)" stroke="#ff9800" stroke-width="1"/>
                    <text x="240" y="190" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">例：擬似相関</text>
                    <text x="240" y="210" text-anchor="middle" fill="#aaa" font-size="9">🍦アイス売上 ↔ 🏊溺死者数（相関あり、因果なし）</text>
                    <text x="240" y="225" text-anchor="middle" fill="#78909c" font-size="8">第三の要因「気温🌡️」が両方に影響</text>
                </g>
            </svg>
        `,
        steps: [
            { step: 1, label: '相関：2変数が同時に変動するパターン', highlight: '#2196f3' },
            { step: 2, label: '因果：一方が他方を直接引き起こす関係', highlight: '#4caf50' },
            { step: 3, label: '擬似相関：第三の変数が両方に影響している場合', highlight: '#ff9800' }
        ]
    },

    // AI関連法律フレームワーク
    'ai-legal-framework': {
        id: 'ai-legal-framework',
        title: 'AI関連の法律フレームワーク',
        description: 'AIに関わる主要な法律の関係を示します。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg">
                <text x="250" y="25" text-anchor="middle" fill="#78909c" font-size="11">AIに関わる主要法律</text>
                <!-- 個人情報保護法 -->
                <g class="concept-layer" data-step="1">
                    <rect x="30" y="50" width="130" height="80" rx="8" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="2"/>
                    <text x="95" y="75" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">個人情報保護法</text>
                    <text x="95" y="95" text-anchor="middle" fill="#aaa" font-size="8">プライバシー保護</text>
                    <text x="95" y="110" text-anchor="middle" fill="#aaa" font-size="8">データ取扱いルール</text>
                </g>
                <!-- 著作権法 -->
                <g class="concept-layer" data-step="2">
                    <rect x="185" y="50" width="130" height="80" rx="8" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="2"/>
                    <text x="250" y="75" text-anchor="middle" fill="#2196f3" font-size="10" font-weight="bold">著作権法</text>
                    <text x="250" y="95" text-anchor="middle" fill="#aaa" font-size="8">学習データの利用</text>
                    <text x="250" y="110" text-anchor="middle" fill="#aaa" font-size="8">30条の4 機械学習</text>
                </g>
                <!-- 特許法 -->
                <g class="concept-layer" data-step="3">
                    <rect x="340" y="50" width="130" height="80" rx="8" fill="rgba(156, 39, 176, 0.2)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="405" y="75" text-anchor="middle" fill="#9c27b0" font-size="10" font-weight="bold">特許法</text>
                    <text x="405" y="95" text-anchor="middle" fill="#aaa" font-size="8">AI技術の保護</text>
                    <text x="405" y="110" text-anchor="middle" fill="#aaa" font-size="8">発明者は人間のみ</text>
                </g>
                <!-- 不正競争防止法 -->
                <g class="concept-layer" data-step="4">
                    <rect x="105" y="155" width="130" height="80" rx="8" fill="rgba(255, 152, 0, 0.2)" stroke="#ff9800" stroke-width="2"/>
                    <text x="170" y="175" text-anchor="middle" fill="#ff9800" font-size="9" font-weight="bold">不正競争防止法</text>
                    <text x="170" y="195" text-anchor="middle" fill="#aaa" font-size="8">営業秘密保護</text>
                    <text x="170" y="210" text-anchor="middle" fill="#aaa" font-size="8">限定提供データ</text>
                </g>
                <!-- 契約法 -->
                <g class="concept-layer" data-step="5">
                    <rect x="265" y="155" width="130" height="80" rx="8" fill="rgba(244, 67, 54, 0.2)" stroke="#f44336" stroke-width="2"/>
                    <text x="330" y="175" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">契約・PL法</text>
                    <text x="330" y="195" text-anchor="middle" fill="#aaa" font-size="8">権利義務の明確化</text>
                    <text x="330" y="210" text-anchor="middle" fill="#aaa" font-size="8">製造物責任</text>
                </g>
            </svg>
        `,
        steps: [
            { step: 1, label: '個人情報保護法：個人データの取扱いルール', highlight: '#4caf50' },
            { step: 2, label: '著作権法：学習データ利用の条件', highlight: '#2196f3' },
            { step: 3, label: '特許法：AI技術・発明の保護', highlight: '#9c27b0' },
            { step: 4, label: '不正競争防止法：営業秘密とデータ保護', highlight: '#ff9800' },
            { step: 5, label: '契約法・PL法：権利義務と責任分担', highlight: '#f44336' }
        ]
    },

    // 知的財産権の比較
    'ip-comparison': {
        id: 'ip-comparison',
        title: '知的財産権の種類と比較',
        description: '著作権・特許・営業秘密の違いを比較します。',
        type: 'comparison',
        svg: `
            <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
                <!-- 著作権 -->
                <g class="concept-layer" data-step="1">
                    <rect x="20" y="30" width="145" height="170" rx="8" fill="rgba(33, 150, 243, 0.1)" stroke="#2196f3" stroke-width="2"/>
                    <text x="92" y="55" text-anchor="middle" fill="#2196f3" font-size="11" font-weight="bold">著作権</text>
                    <text x="92" y="80" text-anchor="middle" fill="#aaa" font-size="8">📝 表現を保護</text>
                    <text x="92" y="100" text-anchor="middle" fill="#aaa" font-size="8">登録不要</text>
                    <text x="92" y="120" text-anchor="middle" fill="#aaa" font-size="8">死後70年</text>
                    <text x="92" y="145" text-anchor="middle" fill="#78909c" font-size="7">文章,絵,音楽,</text>
                    <text x="92" y="160" text-anchor="middle" fill="#78909c" font-size="7">プログラム</text>
                </g>
                <!-- 特許権 -->
                <g class="concept-layer" data-step="2">
                    <rect x="177" y="30" width="145" height="170" rx="8" fill="rgba(156, 39, 176, 0.1)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="249" y="55" text-anchor="middle" fill="#9c27b0" font-size="11" font-weight="bold">特許権</text>
                    <text x="249" y="80" text-anchor="middle" fill="#aaa" font-size="8">💡 発明を保護</text>
                    <text x="249" y="100" text-anchor="middle" fill="#aaa" font-size="8">出願・審査必要</text>
                    <text x="249" y="120" text-anchor="middle" fill="#aaa" font-size="8">出願から20年</text>
                    <text x="249" y="145" text-anchor="middle" fill="#78909c" font-size="7">技術的アイデア</text>
                    <text x="249" y="160" text-anchor="middle" fill="#78909c" font-size="7">新規性・進歩性</text>
                </g>
                <!-- 営業秘密 -->
                <g class="concept-layer" data-step="3">
                    <rect x="334" y="30" width="145" height="170" rx="8" fill="rgba(255, 152, 0, 0.1)" stroke="#ff9800" stroke-width="2"/>
                    <text x="406" y="55" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="bold">営業秘密</text>
                    <text x="406" y="80" text-anchor="middle" fill="#aaa" font-size="8">🔒 秘密を保護</text>
                    <text x="406" y="100" text-anchor="middle" fill="#aaa" font-size="8">秘密管理必要</text>
                    <text x="406" y="120" text-anchor="middle" fill="#aaa" font-size="8">期限なし</text>
                    <text x="406" y="145" text-anchor="middle" fill="#78909c" font-size="7">ノウハウ,顧客リスト</text>
                    <text x="406" y="160" text-anchor="middle" fill="#78909c" font-size="7">学習済みモデル</text>
                </g>
                <text x="250" y="225" text-anchor="middle" fill="#78909c" font-size="9">保護対象・要件・期間が異なる</text>
            </svg>
        `,
        steps: [
            { step: 1, label: '著作権：表現の保護、登録不要、死後70年', highlight: '#2196f3' },
            { step: 2, label: '特許権：発明の保護、審査必要、出願から20年', highlight: '#9c27b0' },
            { step: 3, label: '営業秘密：秘密の保護、管理必要、期限なし', highlight: '#ff9800' }
        ]
    },

    // AI倫理5原則
    'ai-ethics-principles': {
        id: 'ai-ethics-principles',
        title: 'AI倫理の5つの原則',
        description: 'AIが社会で信頼されるために守るべき主要な倫理原則を示します。',
        type: 'diagram',
        svg: `
            <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
                <!-- 中心 -->
                <circle cx="240" cy="145" r="40" fill="rgba(98, 0, 234, 0.3)" stroke="#6200ea" stroke-width="2"/>
                <text x="240" y="140" text-anchor="middle" fill="#6200ea" font-size="10" font-weight="bold">AI</text>
                <text x="240" y="155" text-anchor="middle" fill="#6200ea" font-size="8">倫理</text>
                <!-- 公平性 -->
                <g class="concept-layer" data-step="1">
                    <circle cx="240" cy="40" r="30" fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" stroke-width="2"/>
                    <text x="240" y="38" text-anchor="middle" fill="#4caf50" font-size="9" font-weight="bold">公平性</text>
                    <text x="240" y="52" text-anchor="middle" fill="#4caf50" font-size="7">Fairness</text>
                </g>
                <!-- 透明性 -->
                <g class="concept-layer" data-step="2">
                    <circle cx="380" cy="100" r="30" fill="rgba(33, 150, 243, 0.3)" stroke="#2196f3" stroke-width="2"/>
                    <text x="380" y="98" text-anchor="middle" fill="#2196f3" font-size="9" font-weight="bold">透明性</text>
                    <text x="380" y="112" text-anchor="middle" fill="#2196f3" font-size="7">XAI</text>
                </g>
                <!-- プライバシー -->
                <g class="concept-layer" data-step="3">
                    <circle cx="340" cy="220" r="30" fill="rgba(156, 39, 176, 0.3)" stroke="#9c27b0" stroke-width="2"/>
                    <text x="340" y="215" text-anchor="middle" fill="#9c27b0" font-size="8" font-weight="bold">プライバ</text>
                    <text x="340" y="228" text-anchor="middle" fill="#9c27b0" font-size="8" font-weight="bold">シー</text>
                </g>
                <!-- 安全性 -->
                <g class="concept-layer" data-step="4">
                    <circle cx="140" cy="220" r="30" fill="rgba(244, 67, 54, 0.3)" stroke="#f44336" stroke-width="2"/>
                    <text x="140" y="218" text-anchor="middle" fill="#f44336" font-size="9" font-weight="bold">安全性</text>
                    <text x="140" y="232" text-anchor="middle" fill="#f44336" font-size="7">Security</text>
                </g>
                <!-- 説明責任 -->
                <g class="concept-layer" data-step="5">
                    <circle cx="100" cy="100" r="30" fill="rgba(255, 152, 0, 0.3)" stroke="#ff9800" stroke-width="2"/>
                    <text x="100" y="95" text-anchor="middle" fill="#ff9800" font-size="8" font-weight="bold">説明</text>
                    <text x="100" y="108" text-anchor="middle" fill="#ff9800" font-size="8" font-weight="bold">責任</text>
                </g>
                <text x="240" y="275" text-anchor="middle" fill="#78909c" font-size="9">人間中心のAIを実現するための5本柱</text>
            </svg>
        `,
        steps: [
            { step: 1, label: '公平性：差別やバイアスのない判断', highlight: '#4caf50' },
            { step: 2, label: '透明性：判断理由の説明可能性（XAI）', highlight: '#2196f3' },
            { step: 3, label: 'プライバシー：個人情報の保護', highlight: '#9c27b0' },
            { step: 4, label: '安全性：システムの安全とセキュリティ', highlight: '#f44336' },
            { step: 5, label: '説明責任：問題発生時の責任明確化', highlight: '#ff9800' }
        ]
    },

    // EU AI規制法のリスク分類
    'eu-ai-risk-classification': {
        id: 'eu-ai-risk-classification',
        title: 'EU AI規制法のリスク分類',
        description: 'EUのAI規制法案によるリスクベースのAI分類を示します。',
        type: 'pyramid',
        svg: `
            <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
                <!-- 禁止 -->
                <g class="concept-layer" data-step="1">
                    <polygon points="240,20 280,70 200,70" fill="rgba(244, 67, 54, 0.4)" stroke="#f44336" stroke-width="2"/>
                    <text x="240" y="55" text-anchor="middle" fill="#f44336" font-size="9" font-weight="bold">禁止</text>
                    <text x="350" y="50" fill="#f44336" font-size="8">社会スコアリング</text>
                    <text x="350" y="65" fill="#aaa" font-size="7">リアルタイム顔認識</text>
                </g>
                <!-- 高リスク -->
                <g class="concept-layer" data-step="2">
                    <polygon points="200,70 280,70 310,130 170,130" fill="rgba(255, 152, 0, 0.3)" stroke="#ff9800" stroke-width="2"/>
                    <text x="240" y="105" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">高リスク</text>
                    <text x="370" y="100" fill="#ff9800" font-size="8">採用・教育・医療</text>
                    <text x="370" y="115" fill="#aaa" font-size="7">厳格な規制適用</text>
                </g>
                <!-- 限定リスク -->
                <g class="concept-layer" data-step="3">
                    <polygon points="170,130 310,130 350,200 130,200" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" stroke-width="2"/>
                    <text x="240" y="170" text-anchor="middle" fill="#2196f3" font-size="10" font-weight="bold">限定的リスク</text>
                    <text x="400" y="170" fill="#2196f3" font-size="8">チャットボット</text>
                    <text x="400" y="185" fill="#aaa" font-size="7">透明性義務</text>
                </g>
                <!-- 最小リスク -->
                <g class="concept-layer" data-step="4">
                    <polygon points="130,200 350,200 380,260 100,260" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" stroke-width="2"/>
                    <text x="240" y="235" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">最小リスク</text>
                    <text x="420" y="235" fill="#4caf50" font-size="8">ゲーム・スパム</text>
                    <text x="420" y="250" fill="#aaa" font-size="7">規制なし</text>
                </g>
            </svg>
        `,
        steps: [
            { step: 1, label: '禁止：社会スコアリング、公共空間での顔認識', highlight: '#f44336' },
            { step: 2, label: '高リスク：採用・教育・医療・司法（厳格規制）', highlight: '#ff9800' },
            { step: 3, label: '限定リスク：チャットボット等（透明性義務）', highlight: '#2196f3' },
            { step: 4, label: '最小リスク：ゲーム等（規制なし）', highlight: '#4caf50' }
        ]
    }
};
/**
 * 概念IDから概念データを取得
 * @param {string} conceptId 
 * @returns {Object|null}
 */
export function getConcept(conceptId) {
    return CONCEPTS[conceptId] || null;
}

/**
 * 全概念IDのリストを取得
 * @returns {string[]}
 */
export function getAllConceptIds() {
    return Object.keys(CONCEPTS);
}
