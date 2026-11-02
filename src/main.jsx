import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, Bell, Bookmark, BookmarkCheck, BookOpen, Check, ChevronDown,
  CircleHelp, Clock3, Headphones, Heart, Home, Languages, Lightbulb,
  Menu, MoreHorizontal, Play, RotateCcw, Search, Settings, Sparkles,
  Target, UserRound, Volume2, X, Zap
} from 'lucide-react'
import './styles.css'

const articles = [
  { type: '外刊', title: 'The quiet power of a daily walk', source: 'The Atlantic · 6 min read', desc: 'Why a simple walk may be one of the most underrated ways to think better, feel better, and live longer.', tag: '今日推荐', color: 'sage' },
  { type: '外刊', title: 'How cities are learning to breathe again', source: 'The Guardian · 8 min read', desc: 'Across the world, a new generation of urban planners is putting people — not cars — at the centre.', tag: '昨日精选', color: 'blue' },
]

const classics = [
  { title: 'Pride and Prejudice', author: 'Jane Austen', level: 'CET-6 高频', progress: 68, cover: 'pride' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', level: 'CET-4 高频', progress: 32, cover: 'gatsby' },
  { title: '1984', author: 'George Orwell', level: 'CET-6 高频', progress: 12, cover: 'year1984' },
]

const initialWords = [
  { word: 'underrated', phonetic: '/ˌʌndəˈreɪtɪd/', meaning: '被低估的；未得到充分重视的', example: 'Walking is one of the most underrated ways to clear your mind.', due: '今天', level: '熟悉' },
  { word: 'resilience', phonetic: '/rɪˈzɪliəns/', meaning: '韧性；恢复力', example: 'The city has shown remarkable resilience.', due: '今天', level: '复习中' },
  { word: 'perspective', phonetic: '/pəˈspektɪv/', meaning: '视角；观点', example: 'Travel gives us a fresh perspective on everyday life.', due: '明天', level: '新词' },
  { word: 'deliberately', phonetic: '/dɪˈlɪbərətli/', meaning: '故意地；从容不迫地', example: 'She deliberately slowed down to notice the details.', due: '明天', level: '新词' },
]

function App() {
  const [page, setPage] = useState('home')
  const [activeTab, setActiveTab] = useState('外刊')
  const [words, setWords] = useState(initialWords)
  const [reading, setReading] = useState(null)
  const [showAi, setShowAi] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState('')

  const reviewCount = words.filter(w => w.due === '今天').length
  const notify = (message) => { setToast(message); setTimeout(() => setToast(''), 2200) }
  const saveWord = (word) => {
    if (!words.find(item => item.word === word)) {
      setWords(prev => [{ word, phonetic: '/ˈwɜːrd/', meaning: '阅读文章中的重点词汇', example: 'A useful word to remember from today’s reading.', due: '今天', level: '新词' }, ...prev])
      notify(`已收藏 “${word}”`)
    } else notify('这个词已经在收藏夹里')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={() => setPage('home')}>
          <div className="brand-mark"><BookOpen size={18} strokeWidth={2.2} /></div>
          <span>viberead</span>
        </div>
        <nav className="desktop-nav">
          <button className={page === 'home' ? 'nav-active' : ''} onClick={() => setPage('home')}><Home size={16}/> 阅读</button>
          <button className={page === 'words' ? 'nav-active' : ''} onClick={() => setPage('words')}><Bookmark size={16}/> 词汇</button>
          <button className={page === 'profile' ? 'nav-active' : ''} onClick={() => setPage('profile')}><UserRound size={16}/> 我的</button>
        </nav>
        <div className="top-actions">
          <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="搜索"><Search size={18}/></button>
          <button className="icon-btn notification" aria-label="通知"><Bell size={18}/><i /></button>
          <button className="avatar" onClick={() => setPage('profile')}>L</button>
        </div>
      </header>

      <main className="main-content">
        {page === 'home' && <HomePage activeTab={activeTab} setActiveTab={setActiveTab} openArticle={setReading} openClassic={setReading} />}
        {page === 'words' && <WordsPage words={words} reviewCount={reviewCount} onReview={() => notify('复习完成，做得很好！')} />}
        {page === 'profile' && <ProfilePage notify={notify} />}
      </main>

      <nav className="mobile-nav">
        <button className={page === 'home' ? 'nav-active' : ''} onClick={() => setPage('home')}><Home size={19}/><span>阅读</span></button>
        <button className={page === 'words' ? 'nav-active' : ''} onClick={() => setPage('words')}><Bookmark size={19}/><span>词汇</span>{reviewCount > 0 && <b>{reviewCount}</b>}</button>
        <button className={page === 'profile' ? 'nav-active' : ''} onClick={() => setPage('profile')}><UserRound size={19}/><span>我的</span></button>
      </nav>

      {searchOpen && <div className="search-popover"><Search size={17}/><input autoFocus placeholder="搜索文章、词汇或作者…" /><kbd>ESC</kbd></div>}
      {reading && <Reader article={reading} close={() => setReading(null)} saveWord={saveWord} onAi={() => setShowAi(true)} />}
      {showAi && <AiPanel close={() => setShowAi(false)} />}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  )
}

function HomePage({ activeTab, setActiveTab, openArticle, openClassic }) {
  return <div className="home-page">
    <section className="hero">
      <div>
        <div className="eyebrow"><span className="live-dot"/> DAILY READING · 11月02日 星期一</div>
        <h1>今天，读点<br/><em>真正有趣的英语。</em></h1>
        <p>每天一篇外刊，配合精选名著。<br/>把碎片时间，变成看得见的进步。</p>
        <button className="primary-btn" onClick={() => openArticle(articles[0])}>开始今日阅读 <ArrowRight size={17}/></button>
      </div>
      <div className="hero-orbit"><div className="orbit-ring"/><div className="orbit-ring ring-two"/><div className="orbit-core"><span>06</span><small>MIN<br/>TODAY</small></div><div className="orbit-note note-one">NEW<br/><strong>阅读习惯</strong></div><div className="orbit-note note-two">+ 12<br/><strong>WORDS</strong></div></div>
    </section>

    <section className="section-heading">
      <div><p className="section-kicker">EXPLORE</p><h2>为你挑选的内容</h2></div>
      <div className="segmented"><button className={activeTab === '外刊' ? 'selected' : ''} onClick={() => setActiveTab('外刊')}>外刊 <span>12</span></button><button className={activeTab === '名著' ? 'selected' : ''} onClick={() => setActiveTab('名著')}>名著 <span>03</span></button></div>
    </section>

    {activeTab === '外刊' ? <div className="article-grid">{articles.map((article, i) => <ArticleCard key={article.title} article={article} featured={i === 0} onClick={() => openArticle(article)} />)}</div> : <div className="classic-grid">{classics.map(classic => <ClassicCard key={classic.title} classic={classic} onClick={() => openClassic({ ...classic, type: '名著', title: classic.title, source: classic.author + ' · Chapter ' + Math.max(1, Math.round(classic.progress / 8)), desc: 'Follow the original text at your own pace, with gentle guidance for every paragraph.' })} />)}</div>}

    <section className="continue-card">
      <div className="continue-icon"><Zap size={19}/></div>
      <div className="continue-copy"><p className="section-kicker">CONTINUE LEARNING</p><h3>你正在读《傲慢与偏见》</h3><span>Chapter 08 · 还剩 12 分钟</span></div>
      <div className="progress-wrap"><div className="progress-label"><span>阅读进度</span><b>68%</b></div><div className="progress"><i style={{width: '68%'}}/></div></div>
      <button className="round-arrow" onClick={() => openClassic({ ...classics[0], type: '名著', source: 'Jane Austen · Chapter 08', desc: 'Follow the original text at your own pace.' })}><ArrowRight size={18}/></button>
    </section>
  </div>
}

function ArticleCard({ article, featured, onClick }) {
  return <article className={`article-card ${featured ? 'featured' : ''}`} onClick={onClick}>
    <div className={`article-image ${article.color}`}><div className="image-label">{featured ? 'A WALK<br/>IN THE<br/>PARK' : 'CITY<br/>BREATHES'}</div><span className="card-tag">{article.tag}</span></div>
    <div className="article-info"><div className="meta-row"><span>{article.type}</span><span><Clock3 size={13}/> {article.source.split('·')[1]}</span></div><h3>{article.title}</h3><p>{article.desc}</p><div className="card-footer"><span>阅读文章 <ArrowRight size={14}/></span><button onClick={e => e.stopPropagation()}><Bookmark size={17}/></button></div></div>
  </article>
}

function ClassicCard({ classic, onClick }) {
  return <article className="classic-card" onClick={onClick}><div className={`book-cover ${classic.cover}`}><span>{classic.title}</span><small>{classic.author}</small></div><div className="classic-info"><div><span className="level-pill">{classic.level}</span><span className="chapter">Chapter {Math.max(1, Math.round(classic.progress / 8))}</span></div><h3>{classic.title}</h3><p>{classic.author}</p><div className="progress"><i style={{width: `${classic.progress}%`}}/></div><small>{classic.progress}% 已完成</small></div></article>
}

function Reader({ article, close, saveWord, onAi }) {
  const [mode, setMode] = useState('阅读')
  return <div className="reader-overlay"><div className="reader">
    <header className="reader-header"><button className="icon-btn" onClick={close}><X size={19}/></button><div className="reader-title"><span>{article.type} · 今日精选</span><strong>{article.title}</strong></div><div className="reader-tools"><button className="icon-btn"><Volume2 size={18}/></button><button className="icon-btn"><Bookmark size={18}/></button><button className="icon-btn"><MoreHorizontal size={19}/></button></div></header>
    <div className="reader-tabs"><button className={mode === '阅读' ? 'active' : ''} onClick={() => setMode('阅读')}><BookOpen size={15}/> 阅读</button><button className={mode === '译文' ? 'active' : ''} onClick={() => setMode('译文')}><Languages size={15}/> 对照译文</button><button className="ai-tab" onClick={onAi}><Sparkles size={15}/> AI 讲解</button></div>
    <div className="reader-body"><div className="reader-meta"><span>{article.source}</span><span>难度 <b>★★☆</b></span></div><h1>{article.title}</h1><p className="reader-intro">{article.desc}</p><div className="reading-text">{mode === '译文' ? <><p>为什么散步可能是最被低估的思考方式之一？我们不需要复杂的设备，也不需要专门的场所。只要穿上一双舒适的鞋，走出门，就能重新找回自己的节奏。</p><p>研究表明，规律的步行不仅能改善身体健康，也会让大脑更容易产生新的连接。很多重要的想法，往往发生在我们没有刻意寻找它们的时候。</p></> : <><p>Why might a simple walk be one of the most <mark onClick={() => saveWord('underrated')}>underrated</mark> ways to think better? You don't need special equipment or a particular place. Just a comfortable pair of shoes, and a little time to yourself.</p><p>Walking creates room for thoughts to arrive. As the rhythm of our steps settles, the mind begins to wander — not aimlessly, but with a kind of quiet <mark onClick={() => saveWord('resilience')}>resilience</mark>.</p><p className="quote">“The journey is the thing.” <span>— Homer</span></p><p>Perhaps this is why people have always walked to solve problems, make decisions, and see an old question from a new <mark onClick={() => saveWord('perspective')}>perspective</mark>.</p></>}</div><div className="reader-footer"><span><Headphones size={15}/> 听力模式</span><span>1 / 4</span><button className="next-btn">下一段 <ArrowRight size={15}/></button></div></div>
  </div></div>
}

function AiPanel({ close }) {
  return <div className="ai-overlay" onClick={close}><aside className="ai-panel" onClick={e => e.stopPropagation()}><header><div className="ai-heading"><div className="ai-spark"><Sparkles size={17}/></div><div><span>READWELL AI</span><strong>文章讲解</strong></div></div><button className="icon-btn" onClick={close}><X size={18}/></button></header><div className="ai-content"><div className="ai-context">The quiet power of a daily walk</div><div className="ai-block"><h4><Lightbulb size={15}/> 核心观点</h4><p>作者认为，散步不只是锻炼身体，更是给大脑创造“留白”的一种方式。放慢脚步，反而能让思考更清晰。</p></div><div className="ai-block"><h4><Languages size={15}/> 句子拆解</h4><div className="sentence-box"><p>Walking creates room for thoughts to arrive.</p><span>散步为想法的到来创造了空间。</span></div><p className="tiny-note">create room for something = 为某事留出空间 / 创造条件</p></div><button className="ai-action"><Sparkles size={16}/> 换个方式再讲讲</button></div></aside></div>
}

function WordsPage({ words, reviewCount, onReview }) {
  const [filter, setFilter] = useState('全部')
  const visible = filter === '今日复习' ? words.filter(w => w.due === '今天') : filter === '新词' ? words.filter(w => w.level === '新词') : words
  return <div className="words-page"><div className="page-intro"><div><p className="section-kicker">MY VOCABULARY</p><h1>词汇本</h1><p>把遇见的好词，变成自己的表达。</p></div><button className="outline-btn"><Search size={16}/> 搜索词汇</button></div><section className="review-banner"><div className="review-score"><span>今日复习</span><strong>{reviewCount}<small> 个词</small></strong><div className="mini-progress"><i style={{width: reviewCount ? '35%' : '0%'}}/></div><em>坚持一下，今天就能完成</em></div><div className="review-illustration"><div className="sun"/><div className="hill"/><BookOpen size={40}/></div><button className="primary-btn" onClick={onReview}><Play size={16} fill="currentColor"/> 开始复习</button></section><div className="word-toolbar"><div className="segmented"><button className={filter === '全部' ? 'selected' : ''} onClick={() => setFilter('全部')}>全部 <span>{words.length}</span></button><button className={filter === '今日复习' ? 'selected' : ''} onClick={() => setFilter('今日复习')}>今日复习 <span>{reviewCount}</span></button><button className={filter === '新词' ? 'selected' : ''} onClick={() => setFilter('新词')}>新词</button></div><button className="sort-btn">最近收藏 <ChevronDown size={15}/></button></div><div className="word-list">{visible.map(word => <div className="word-row" key={word.word}><button className="word-bookmark"><BookmarkCheck size={18}/></button><div className="word-main"><div><strong>{word.word}</strong><span>{word.phonetic}</span><button className="speaker"><Volume2 size={14}/></button></div><p>{word.meaning}</p></div><div className="word-example">{word.example}</div><span className={`word-status ${word.level === '熟悉' ? 'known' : ''}`}>{word.level}</span><span className="word-due">{word.due}</span><button className="more-btn"><MoreHorizontal size={17}/></button></div>)}</div></div>
}

function ProfilePage({ notify }) {
  return <div className="profile-page"><div className="profile-head"><div className="large-avatar">L</div><div><p className="section-kicker">MY SPACE</p><h1>你好，林同学 <span>✦</span></h1><p>这是你持续阅读的第 24 天</p></div><button className="outline-btn"><Settings size={16}/> 设置</button></div><div className="stats-grid"><div><span>连续阅读</span><strong>24<small> 天</small></strong><i><Zap size={14}/> 本周最佳</i></div><div><span>累计阅读</span><strong>18<small> 篇</small></strong><i><BookOpen size={14}/> 继续保持</i></div><div><span>掌握词汇</span><strong>328<small> 词</small></strong><i><Target size={14}/> 超过 68% 的用户</i></div></div><div className="profile-columns"><section className="settings-card"><div className="card-title"><h2>学习偏好</h2><span>自动保存</span></div><label>每日阅读时长 <b>15 分钟</b><input type="range" defaultValue="40"/></label><label>英语水平 <b>CET-6</b><select defaultValue="CET-6"><option>CET-4</option><option>CET-6</option><option>雅思 6.5</option></select></label><label className="switch-row">每日提醒 <button className="switch on"><i/></button></label></section><section className="achievement-card"><div className="card-title"><h2>本周成就</h2><span>查看全部 <ArrowRight size={13}/></span></div><div className="achievement"><div className="achievement-icon green"><Zap size={18}/></div><div><strong>七日连读</strong><p>连续 7 天完成每日阅读</p></div><Check size={17}/></div><div className="achievement"><div className="achievement-icon gold"><Target size={18}/></div><div><strong>词汇收集家</strong><p>本周收藏了 24 个新词</p></div><Check size={17}/></div><button className="text-btn" onClick={() => notify('更多主题即将开放')}>探索更多成就 <ArrowRight size={14}/></button></section></div></div>
}

createRoot(document.getElementById('root')).render(<App />)
