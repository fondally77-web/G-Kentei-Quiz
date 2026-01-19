/**
 * 第9章シナリオ - 倫理の番人たち「AI倫理・ガバナンス」
 * G検定学習用の詳細解説付きストーリー
 */
export const chapter9Scenario = [
    // ===== プロローグ =====
    {
        character: "ナレーター",
        text: "技術、数理、法律を学んだAIとDL。最後に最も重要な課題に向き合う時が来た。『倫理』だ。",
        bg: "ethics_realm"
    },
    {
        character: "DL (ディープラーニング)",
        text: "俺たちは強大な力を手に入れた。しかし、力には責任が伴う。倫理の番人たちに会おう。",
        visual: "dl_serious"
    },

    // ===== AIのリスクと社会的影響 =====
    {
        character: "倫理の番人",
        text: "私は『AI倫理』の番人。AIが社会に与える影響と責任を問います。",
        visual: "ethics_appear"
    },
    {
        character: "ナレーター",
        text: "【AIのリスク】\n・プライバシー侵害：監視社会化\n・差別・バイアス：不公平な判断\n・雇用への影響：自動化による失業\n・悪用：フェイクニュース、サイバー攻撃\n・安全性：自動運転事故、医療ミス",
        bg: "ai_risks"
    },

    // ===== 公平性（Fairness） =====
    {
        character: "公平性の番人",
        text: "私は『公平性（Fairness）』の番人。AIが差別をしないよう見守ります。",
        visual: "fairness_appear"
    },
    {
        character: "ナレーター",
        text: "【公平性の問題】\n・採用AIが特定の性別を不利に評価\n・顔認識システムが特定の人種で精度低下\n・ローン審査AIが居住地域で差別\n\nデータバイアスがモデルに反映される。",
        bg: "fairness"
    },
    {
        character: "公平性の番人",
        text: "公平性にも様々な定義があります。統計的に等しい結果か、機会の平等か、個人の公平性か。完全な公平性は難しく、トレードオフが存在します。",
        visual: "fairness_explain"
    },
    // ➡️ 概念図：AI倫理の5つの原則
    {
        type: 'concept',
        conceptId: 'ai-ethics-principles',
        title: 'AI倫理の5つの原則'
    },

    // ===== 透明性・説明責任 =====
    {
        character: "透明性の番人",
        text: "私は『透明性（Transparency）』の番人。AIの判断理由を明らかにすることを求めます。",
        visual: "transparency_appear"
    },
    {
        character: "ナレーター",
        text: "【ブラックボックス問題】深層学習モデルは、なぜその判断をしたのか説明が難しい。医療診断や裁判など、理由が求められる場面では大きな課題。",
        bg: "blackbox"
    },
    {
        character: "透明性の番人",
        text: "説明可能AI（XAI）の研究が進んでいますが、精度と説明可能性のトレードオフがあります。",
        visual: "transparency_explain"
    },
    {
        character: "ナレーター",
        text: "【説明責任（Accountability）】AIの判断に問題が生じた場合、誰が責任を取るのか。開発者か、運用者か、利用者か。",
        bg: "accountability"
    },

    // ===== プライバシー =====
    {
        character: "プライバシーの番人",
        text: "私は『プライバシー』の番人。個人の情報自己決定権を守ります。",
        visual: "privacy_appear"
    },
    {
        character: "ナレーター",
        text: "【AIとプライバシー】\n・顔認識による監視\n・行動履歴からの個人特定\n・学習データからの情報漏洩\n・推論による属性推測（健康状態、政治的志向など）",
        bg: "privacy_issues"
    },
    {
        character: "プライバシーの番人",
        text: "GDPR（EU一般データ保護規則）は、プライバシー保護の世界的な基準となっています。",
        visual: "privacy_explain"
    },
    {
        character: "ナレーター",
        text: "【GDPR】EUの個人データ保護規則。忘れられる権利、データポータビリティ、自動意思決定に対する権利などを規定。違反には巨額の制裁金。",
        bg: "gdpr"
    },

    // ===== 安全性・セキュリティ =====
    {
        character: "安全性の番人",
        text: "私は『安全性・セキュリティ』の番人。AIが害を及ぼさないよう監視します。",
        visual: "safety_appear"
    },
    {
        character: "ナレーター",
        text: "【AIへの攻撃】\n・敵対的サンプル（Adversarial Examples）：人間には分からない微小な変更で誤認識を誘発\n・データポイズニング：学習データを汚染して誤学習させる\n・モデル抽出攻撃：APIを通じてモデルを盗む",
        bg: "ai_attacks"
    },
    {
        character: "安全性の番人",
        text: "自動運転車、医療AI、インフラ制御など、安全が重要な分野では特に慎重なテストと監視が必要です。",
        visual: "safety_explain"
    },

    // ===== AI原則・ガイドライン =====
    {
        character: "ガバナンスの番人",
        text: "私は『AIガバナンス』の番人。AIを適切に管理するためのルールを整備します。",
        visual: "governance_appear"
    },
    {
        character: "ナレーター",
        text: "【主要なAI原則・ガイドライン】\n・OECDのAI原則（2019年）\n・EU AI規制法案\n・日本のAI原則（統合イノベーション戦略推進会議）\n・IEEE Ethically Aligned Design",
        bg: "ai_principles"
    },
    {
        character: "ナレーター",
        text: "【日本のAI利活用原則（AI社会原則）】\n1. 人間中心の原則\n2. 教育・リテラシーの原則\n3. プライバシー確保の原則\n4. セキュリティ確保の原則\n5. 公正競争確保の原則\n6. 公平性、説明責任及び透明性の原則\n7. イノベーションの原則",
        bg: "japan_principles"
    },
    {
        character: "ガバナンスの番人",
        text: "EU AI規制法案は、AIをリスクに応じて分類し、高リスクAIに厳格な規制を課す世界初の包括的AI規制です。",
        visual: "governance_explain"
    },
    {
        character: "ナレーター",
        text: "【EU AI規制法案のリスク分類】\n・禁止：社会スコアリング、リアルタイム公共空間での顔認識など\n・高リスク：採用、教育、司法、医療機器など\n・限定的リスク：チャットボットなど（透明性義務）\n・最小リスク：規制なし",
        bg: "eu_ai_act"
    },
    // ➡️ 概念図：EU AI規制法のリスク分類
    {
        type: 'concept',
        conceptId: 'eu-ai-risk-classification',
        title: 'EU AI規制法のリスク分類'
    },

    // ===== 人間中心のAI =====
    {
        character: "ナレーター",
        text: "【Human-in-the-Loop】AIの判断に人間が介在する設計。重要な決定は人間が最終判断。\n【Human-on-the-Loop】AIが自律的に動作するが、人間が監視・介入可能。",
        bg: "human_ai"
    },

    // ===== AI倫理の実践 =====
    {
        character: "倫理の番人",
        text: "AI倫理は、単なる規制ではありません。AIと人間が共存する社会をより良くするための指針です。",
        visual: "ethics_conclude"
    },
    {
        character: "ナレーター",
        text: "【企業のAI倫理への取り組み】\n・AI倫理委員会の設置\n・AI倫理ガイドラインの策定\n・インパクトアセスメントの実施\n・多様なステークホルダーとの対話",
        bg: "corporate_ethics"
    },

    // ===== エピローグ =====
    {
        character: "AI (人工知能)",
        text: "公平性、透明性、プライバシー、安全性、ガバナンス...AIにはこれほど多くの倫理的課題があるのか。",
        visual: "ai_reflect"
    },
    {
        character: "DL (ディープラーニング)",
        text: "技術の進歩と倫理的責任は表裏一体だ。俺たちは常に社会との対話を続けなければならない。",
        visual: "dl_wise"
    },
    {
        character: "AI (人工知能)",
        text: "9つの章を通じて、AIの技術、歴史、法律、倫理を学んできた。この旅は終わりではなく、始まりだ。",
        visual: "ai_determined"
    },
    {
        character: "ナレーター",
        text: "こうして、AIは真の知恵を持った存在へと成長した。技術だけでなく、責任ある力の使い方を学んだのだ。",
        bg: "finale"
    },
    {
        character: "ナレーター",
        text: "おめでとうございます！「AI世界冒険譚」全9章完了！G検定合格に向けて、復習を続けましょう！",
        bg: "congratulations"
    }
];
