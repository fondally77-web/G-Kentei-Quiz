import './style.css'
import { Layout } from './components/Layout.js'
import { Router } from './core/router.js'
import { TitleScreen } from './components/TitleScreen.js'
import { ChapterSelectView } from './components/ChapterSelectView.js'
import { ChapterView, Chapter2View, Chapter3View, Chapter4View, Chapter5View, Chapter6View, Chapter7View, Chapter8View, Chapter9View } from './components/ChapterView.js'
import QuizOnlyView from './components/QuizOnlyView.jsx'
import GExamView from './components/GExamView.jsx'

// 第1章は専用実装（ミニゲーム付き）
import { Chapter1View } from './chapters/chapter1/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')

  // 1. アプリレイアウトをレンダリング（ヘッダー、フッター、メインコンテナ）
  const layout = new Layout()
  app.appendChild(layout.render())

  // 2. ルート設定
  const routes = {
    'title': TitleScreen,
    'chapterSelect': ChapterSelectView,

    // クイズモード
    'quizOnly': QuizOnlyView,
    'gExam': GExamView,

    // 各章のルート
    'chapter1': Chapter1View,    // 専用実装（ミニゲーム付き）
    'chapter2': Chapter2View,
    'chapter3': Chapter3View,
    'chapter4': Chapter4View,
    'chapter5': Chapter5View,
    'chapter6': Chapter6View,
    'chapter7': Chapter7View,
    'chapter8': Chapter8View,
    'chapter9': Chapter9View,

    // フォールバック用汎用ビュー
    'chapterGeneric': ChapterView,
  }

  // 3. ルーターを初期化
  new Router(routes)

  console.log('🌌 AI世界冒険譚 - アプリケーション起動完了')
})
