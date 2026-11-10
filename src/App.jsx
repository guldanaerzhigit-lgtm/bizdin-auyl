import React, { useState } from 'react';

const initialPosts = [
  { id: 1, name: 'Айдана Сейдахмет', place: 'Торғай', time: '25 минут бұрын', initials: 'АС', text: 'Торғайдың бүгінгі кеші ерекше әдемі екен! 🌅 Осындай сәттер көп болсын.', likes: 24, comments: 6, tone: 'sunset' },
  { id: 2, name: 'Ерлан Қасымов', place: 'Амангелді', time: '1 сағат бұрын', initials: 'ЕҚ', text: 'Аудан тұрғындарына сұрақ: демалыс күндері футбол ойнайтын команда жинайық па? ⚽', likes: 17, comments: 12, tone: 'field' },
];

const copy = {
  kk: { feed: 'Жаңалықтар лентасы', subtitle: 'Ауданда не болып жатыр?', all: 'Барлығы', nearby: 'Жақын жерде', groups: 'Қауымдастықтар', market: 'Хабарландыру', write: 'Ойыңызбен бөлісіңіз...', publish: 'Жариялау', home: 'Басты бет', explore: 'Іздеу', messages: 'Хабарламалар', profile: 'Профиль', greeting: 'Қош келдіңіз!', intro: 'Өз ауылыңның тынысын бірге сезін.', people: 'Аудан тұрғындары', join: 'Қосылу' },
  ru: { feed: 'Лента района', subtitle: 'Что нового у нас?', all: 'Все', nearby: 'Рядом', groups: 'Сообщества', market: 'Объявления', write: 'Поделитесь новостью...', publish: 'Опубликовать', home: 'Главная', explore: 'Поиск', messages: 'Сообщения', profile: 'Профиль', greeting: 'Добро пожаловать!', intro: 'Будь ближе к своему селу и соседям.', people: 'Жители района', join: 'Вступить' }
};

export default function App() {
  const [lang, setLang] = useState('kk');
  const [tab, setTab] = useState('all');
  const [active, setActive] = useState('home');
  const [liked, setLiked] = useState([]);
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState('');
  const [composer, setComposer] = useState(false);
  const t = copy[lang];

  const publish = () => {
    if (!draft.trim()) return;
    setPosts([{ id: Date.now(), name: 'Сіз', place: 'Джангелдин ауданы', time: lang === 'kk' ? 'Қазір' : 'Сейчас', initials: 'С', text: draft.trim(), likes: 0, comments: 0, tone: 'plain' }, ...posts]);
    setDraft('');
    setComposer(false);
    setActive('home');
  };

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" onClick={e => {e.preventDefault();setActive('home')}}>
        <span className="brand-mark">Б</span><span><strong>BIZDIŃ AÝYL</strong><small>БІР АУДАН. БІР ҚАУЫМ. БІР ЖЕЛІ.</small></span>
      </a>
      <div className="top-actions">
        <button className="icon-btn" aria-label="Уведомления">♧<i /></button>
        <button className="lang-btn" onClick={() => setLang(lang === 'kk' ? 'ru' : 'kk')}>{lang === 'kk' ? 'ҚАЗ' : 'РУС'}⌄</button>
        <div className="mini-avatar">С</div>
      </div>
    </header>

    <div className="layout">
      <aside className="sidebar">
        <div className="welcome-card"><span className="eyebrow">BIZDIŃ AÝYL</span><h2>{t.greeting}</h2><p>{t.intro}</p><div className="welcome-art">⌂</div></div>
        <nav className="side-nav">
          <button className={active === 'home' ? 'selected' : ''} onClick={() => setActive('home')}><span>⌂</span>{t.home}</button>
          <button className={active === 'explore' ? 'selected' : ''} onClick={() => setActive('explore')}><span>⌕</span>{t.explore}</button>
          <button onClick={() => setActive('groups')}><span>♧</span>{t.groups}</button>
          <button onClick={() => setActive('market')}><span>◇</span>{t.market}</button>
          <button onClick={() => setActive('messages')}><span>▤</span>{t.messages}</button>
          <button onClick={() => setActive('profile')}><span>◉</span>{t.profile}</button>
        </nav>
        <div className="district-note"><span className="pin">⌖</span><div><b>Джангелдин ауданы</b><small>Қостанай облысы</small></div></div>
      </aside>

      <main className="main-content">
        <div className="page-heading"><div><span className="eyebrow">ӨЗ АУДАНЫҢ · ӨЗ ОРТАҢ</span><h1>{t.feed}</h1><p>{t.subtitle}</p></div><button className="create-btn" onClick={() => setComposer(true)}>＋ <span>{t.publish}</span></button></div>
        <div className="story-row">
          <button className="story add-story" onClick={() => setComposer(true)}><span className="story-ring plus">＋</span><small>{lang === 'kk' ? 'Оқиға қосу' : 'Добавить'}</small></button>
          {['Торғай','Амангелді','Қарасу','Шұбалаң'].map((v,i)=><button className="story" key={v}><span className={'story-ring ring-'+i}><span>{['Т','А','Қ','Ш'][i]}</span></span><small>{v}</small></button>)}
        </div>
        <div className="feed-tabs">{[['all',t.all],['nearby',t.nearby],['groups',t.groups],['market',t.market]].map(([id,label])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}>{label}</button>)}</div>
        <button className="composer-teaser" onClick={() => setComposer(true)}><div className="mini-avatar">С</div><span>{t.write}</span><b>＋</b></button>
        {active !== 'home' && <div className="notice-card"><b>{active === 'explore' ? t.explore : active === 'groups' ? t.groups : active === 'market' ? t.market : active === 'messages' ? t.messages : t.profile}</b><p>{lang === 'kk' ? 'Бұл бөлім келесі кезеңде іске қосылады.' : 'Этот раздел подключим на следующем этапе.'}</p></div>}
        <div className="posts">{posts.map(post=><article className="post-card" key={post.id}>
          <div className="post-head"><div className="avatar">{post.initials}</div><div className="post-author"><b>{post.name}</b><span>{post.place} · {post.time}</span></div><button className="more-btn">···</button></div>
          <p className="post-text">{post.text}</p>
          {post.tone !== 'plain' && <div className={'post-visual '+post.tone}>{post.tone==='sunset'?'TORҒАЙ · ТУҒАН ЖЕРГЕ СӘЛЕМ':'БІРГЕ БОЛСАҚ — БӘРІ МҮМКІН'}</div>}
          <div className="post-stats"><span>💚 {post.likes + (liked.includes(post.id)?1:0)} {lang==='kk'?'ұнату':'нравится'}</span><span>{post.comments} {lang==='kk'?'пікір':'комментариев'}</span></div>
          <div className="post-actions"><button className={liked.includes(post.id)?'is-liked':''} onClick={()=>setLiked(liked.includes(post.id)?liked.filter(x=>x!==post.id):[...liked,post.id])}>♡ {lang==='kk'?'Ұнату':'Нравится'}</button><button>▢ {lang==='kk'?'Пікір':'Комментировать'}</button><button>↗ {lang==='kk'?'Бөлісу':'Поделиться'}</button></div>
        </article>)}</div>
      </main>

      <aside className="rightbar">
        <div className="side-card"><div className="card-title"><h3>{t.people}</h3><button>•••</button></div>{[['А','Аружан','Торғай'],['М','Мақсат','Амангелді'],['Д','Динара','Қарасу']].map(([letter,name,place])=><div className="person" key={name}><div className="person-avatar">{letter}</div><div><b>{name}</b><small>{place}</small></div><button className="follow-btn">＋</button></div>)}</div>
        <div className="quote-card"><span>❝</span><p>Туған жердей жер болмас, туған елдей ел болмас.</p><small>— Халық мақалы</small></div>
        <footer>© 2026 BIZDIŃ AÝYL<br/>Джангелдин ауданы үшін ❤️</footer>
      </aside>
    </div>

    <nav className="mobile-nav"><button onClick={()=>setActive('home')} className={active==='home'?'on':''}>⌂<small>{t.home}</small></button><button onClick={()=>setActive('explore')}>⌕<small>{t.explore}</small></button><button className="mobile-add" onClick={()=>setComposer(true)}>＋</button><button onClick={()=>setActive('messages')}>▤<small>{t.messages}</small></button><button onClick={()=>setActive('profile')}>◉<small>{t.profile}</small></button></nav>

    {composer && <div className="modal-backdrop" onClick={()=>setComposer(false)}><section className="composer-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><h2>{lang==='kk'?'Жаңа жарияланым':'Новая публикация'}</h2><button onClick={()=>setComposer(false)}>×</button></div><textarea autoFocus value={draft} onChange={e=>setDraft(e.target.value)} placeholder={t.write}/><div className="modal-tools"><span>▧ {lang==='kk'?'Фото/видео':'Фото/видео'} · 📍 {lang==='kk'?'Орналасқан жер':'Местоположение'}</span><button onClick={publish} disabled={!draft.trim()}>{t.publish}</button></div></section></div>}
  </div>;
}