// TestMu AI · Pre-boarding · HRBP Admin Console
// ============================================================================
// Standalone admin dashboard for HR business partners. Separate surface from the
// joiner app: utility not emotion, calm and dense, color reserved for signal.
// Design system: Syne (display + numbers), DM Sans (body), JetBrains Mono (labels).
// Login: split-screen, simulated Google SSO. Overview: peek panel + full profile.
// Self-contained React prototype. ASCII apostrophes only. React state only.

import React, { useState, useMemo } from 'react';
import {
  Search, Bell, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, LayoutDashboard,
  Users, AlertTriangle, TrendingUp, FileText, Settings, ScrollText, LogOut, Check, X,
  Circle, AlertCircle, Phone, PhoneCall, MessageCircle, Mail, Calendar, CalendarClock,
  ShieldCheck, Lock, Compass, Activity, Filter, Plus, Pencil, Send, Clock, MapPin,
  Sparkles, Menu, Package, Megaphone, Gamepad2, Wand2, Telescope, Sunrise, ChevronLeft
} from 'lucide-react';

// ============================================================================
// TOKENS
// ============================================================================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
.hb{
  --paper:#F3F2EE; --card:#FFFFFF; --ink:#18181F; --muted:#73737E; --faint:#76757D;
  --hair:#E6E5DF; --accent:#4A43D4; --accent-soft:#ECEBFB; --panel:#17171F;
  --low:#2E9C68; --low-t:#E4F1E9; --med:#C9870B; --med-t:#F7EFD9; --high:#DE3F3F; --high-t:#FADEDE;
  font-family:'DM Sans',system-ui,sans-serif; color:var(--ink); background:var(--paper);
  -webkit-font-smoothing:antialiased;
}
.hb *{box-sizing:border-box; margin:0; padding:0;}
.hb button{font-family:inherit; cursor:pointer; border:none; background:none; color:inherit;}
.hb button:focus-visible,.hb a:focus-visible,.hb input:focus-visible{outline:2px solid var(--accent); outline-offset:2px;}
.hb input{font-family:inherit;}
.f-d{font-family:'Syne',sans-serif; letter-spacing:-0.01em;}
.f-b{font-family:'DM Sans',sans-serif;}
.f-m{font-family:'JetBrains Mono',monospace; text-transform:uppercase; letter-spacing:0.14em;}
.hb-scroll{overflow-y:auto;}
.hb-scroll::-webkit-scrollbar{width:9px; height:9px;}
.hb-scroll::-webkit-scrollbar-thumb{background:#D9D8D1; border-radius:99px;}
.hb-row{transition:background .12s ease;}
.hb-row:hover{background:#FAFAF8;}
.hb-navi{transition:background .12s ease, color .12s ease;}
.hb-navi:hover{background:var(--accent-soft);}
.hb-btn{transition:transform .1s ease, filter .12s ease;}
.hb-btn:hover{filter:brightness(1.04);}
.hb-btn:active{transform:translateY(1px);}
.hb-fade{animation:hbFade .45s cubic-bezier(.2,.7,.2,1) both;}
@keyframes hbFade{from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:none;}}
.hb-slide{animation:hbSlide .3s cubic-bezier(.2,.7,.2,1) both;}
@keyframes hbSlide{from{opacity:0; transform:translateX(12px);} to{opacity:1; transform:none;}}
.hb-ring{animation:hbRing 4s ease-out infinite;}
@keyframes hbRing{0%{transform:scale(.6); opacity:.5;}100%{transform:scale(1.6); opacity:0;}}
@media (prefers-reduced-motion: reduce){ .hb *{animation:none !important; transition:none !important;} }
.hb-login-left{display:flex; flex-direction:column;}
@media (max-width:820px){ .hb-login-left{display:none;} }
.hb-shell{display:grid; grid-template-columns:216px 1fr;}
.hb-ov-grid{display:grid; grid-template-columns:minmax(0,1.7fr) minmax(0,1fr); gap:16px; align-items:start;}
@media (max-width:900px){ .hb-ov-grid{grid-template-columns:1fr;} }
@media (max-width:760px){ .hb-shell{grid-template-columns:60px 1fr;} .hb-nav-label{display:none;} }
`;

// ============================================================================
// PALETTE HELPERS
// ============================================================================
const PASTEL = {
  lilac:{ t:'#ECEBFB', f:'#4A43D4' }, sage:{ t:'#E4EFE6', f:'#2E7D55' }, peach:{ t:'#FBEBE2', f:'#C2632F' },
  sky:{ t:'#E6EEFA', f:'#2E6BB0' }, butter:{ t:'#F7EFD6', f:'#9A7508' }, rose:{ t:'#FBE7EF', f:'#B23A6A' }
};
const RISK = { low:{ label:'Low', c:'#1F8753', t:'#E4F1E9' }, medium:{ label:'Medium', c:'#C9870B', t:'#F7EFD9' }, high:{ label:'High', c:'#CB3733', t:'#FADEDE' } };
const MOODC = { calm:'#7FA88A', curious:'#E0B048', floating:'#A99BE0', wired:'#E8934B', flooded:'#DE5B4E', silent:'#9A8C7A' };

// ============================================================================
// SCHEDULE ENGINE (preview for the joining-date control)
// ============================================================================
const SURFACES = [
  { key:'kit', label:'Welcome Kit', p:1, frac:0.08, lead:5, icon:Package },
  { key:'documents', label:'Documents', p:0, frac:0.15, lead:1, icon:FileText },
  { key:'culture', label:'Culture Game', p:2, frac:0.24, lead:0, icon:Gamepad2 },
  { key:'counteroffer', label:'Counteroffer', p:1, frac:0.27, lead:1, icon:ShieldCheck },
  { key:'howiwork', label:'How I Work', p:0, frac:0.30, lead:1, icon:Compass },
  { key:'sandbox', label:'Product Sandbox', p:2, frac:0.37, lead:0, icon:Wand2 },
  { key:'logistics', label:'Logistics', p:0, frac:0.66, lead:1, icon:MapPin },
  { key:'vision', label:'Vision', p:2, frac:0.80, lead:0, icon:Telescope },
  { key:'launch', label:'Launch', p:1, frac:0.95, lead:0, icon:Sunrise }
];
const tierOf = (d) => (d <= 7 ? 'Express' : d <= 21 ? 'Sprint' : d <= 45 ? 'Standard' : 'Extended');
const TIER_TONE = { Express:'Day-0 essentials, everything else deferred', Sprint:'Compressed, brisk cadence', Standard:'Full arc, near-daily', Extended:'Spacious, gentle cadence' };
function computeSchedule(days) {
  const variant = tierOf(days);
  const rows = [], deferred = [];
  SURFACES.forEach((s) => {
    if (variant === 'Express' && s.p === 2) { deferred.push(s.label); return; }
    if (variant === 'Express' && s.key === 'counteroffer') { rows.push({ ...s, when:'a call' }); return; }
    if (s.key === 'kit' && days < s.lead) { rows.push({ ...s, when:'desk-ready', warn:true }); return; }
    const day = Math.max(0, Math.min(days, Math.round(s.frac * days)));
    rows.push({ ...s, when:`Day ${day}`, day });
  });
  rows.sort((a, b) => (a.day == null ? 99 : a.day) - (b.day == null ? 99 : b.day));
  return { variant, tone:TIER_TONE[variant], rows, deferred };
}

// ============================================================================
// MOCK COHORT (canonical scenarios) · assigned to Radhika
// ============================================================================
const JOINERS = [
  { id:'akaash', name:'Akaash Mehta', role:'BDR · APAC', initials:'AM', hue:'lilac', variant:'Standard', day:9, total:30, doj:'24 Jul 2026', daysToJoin:21,
    moodTrend:['curious','calm','curious','floating','calm','curious','calm'], engagement:72, risk:'low', docsDone:4, docsTotal:6,
    wellbeingSaved:true, observations:['Focus blocks held on your calendar','Day 1 starts with a quick win','Written feedback first','Sandbox-first projects'],
    alerts:[], riskReasons:[], consents:{ c1:true, c2:true }, tripped:false, note:'Nervous about the counteroffer conversation but I want this.' },
  { id:'polina', name:'Polina Verma', role:'Senior SDET', initials:'PV', hue:'rose', variant:'Standard', day:12, total:30, doj:'21 Jul 2026', daysToJoin:18,
    moodTrend:['calm','calm','wired','flooded','flooded','silent','silent'], engagement:38, risk:'high', docsDone:3, docsTotal:6,
    wellbeingSaved:false, observations:[], alerts:['Silent 5 days · personal call by EOD','Wellbeing not complete'], riskReasons:['5+ days silent','Mood trending flooded','No How I Work profile'],
    consents:{ c1:true, c2:true }, tripped:true, note:'The counteroffer from my current company is real money. I have not told anyone I am wobbling.' },
  { id:'suresh', name:'Suresh Iyer', role:'Account Executive', initials:'SI', hue:'sage', variant:'Sprint', day:8, total:15, doj:'11 Jul 2026', daysToJoin:7,
    moodTrend:['curious','calm','curious','calm','calm','curious','calm'], engagement:86, risk:'low', docsDone:4, docsTotal:6,
    wellbeingSaved:true, observations:['Quick-win Day 1','Headphones suggested','Live conversation in 1:1s','Learns by stage'], alerts:['Salary slip returned · awaiting re-upload'], riskReasons:[],
    consents:{ c1:false, c2:true }, tripped:false, note:'Sprint start, feeling good, just want the laptop sorted early.' },
  { id:'anjali', name:'Anjali Sharma', role:'Product Manager', initials:'AS', hue:'peach', variant:'Extended', day:22, total:60, doj:'10 Aug 2026', daysToJoin:38,
    moodTrend:['curious','floating','floating','curious','floating','floating','curious'], engagement:94, risk:'low', docsDone:6, docsTotal:6,
    wellbeingSaved:true, observations:['Focus blocks held','Shifts to suit the noise','Written feedback first','Learns through people'], alerts:[], riskReasons:[],
    consents:{ c1:false, c2:false }, tripped:false, note:null },
  { id:'rishi', name:'Rishi Kapoor', role:'Solutions Engineer', initials:'RK', hue:'sky', variant:'Standard', day:7, total:30, doj:'21 Jul 2026', daysToJoin:23,
    moodTrend:['curious','calm','calm','wired','wired','calm','wired'], engagement:64, risk:'medium', docsDone:2, docsTotal:6,
    wellbeingSaved:false, observations:[], alerts:['Counteroffer window · suggest defense module'], riskReasons:['Counteroffer window active','Mood trending wired'],
    consents:{ c1:true, c2:false }, tripped:false, note:'Weighing another offer, honestly. Need a reason to be sure.' },
  { id:'kavya', name:'Kavya Reddy', role:'Marketing Lead', initials:'KR', hue:'butter', variant:'Extended', day:35, total:60, doj:'15 Aug 2026', daysToJoin:25,
    moodTrend:['calm','curious','curious','floating','curious','calm','floating'], engagement:91, risk:'low', docsDone:5, docsTotal:6,
    wellbeingSaved:true, observations:['Scans before acting','Reads the room and adapts','Processes through motion','Learns by example'], alerts:[], riskReasons:[],
    consents:{ c1:false, c2:false }, tripped:false, note:null }
];
function kpis(list) {
  const atRisk = list.filter((j) => j.risk !== 'low');
  return {
    active:list.length,
    atRisk:atRisk.length, high:list.filter((j) => j.risk === 'high').length, med:list.filter((j) => j.risk === 'medium').length,
    docsPending:list.reduce((s, j) => s + (j.docsTotal - j.docsDone), 0),
    avg:list.length ? Math.round(list.reduce((s, j) => s + j.engagement, 0) / list.length) : 0
  };
}
const noteVisible = (j) => j.tripped ? j.note : null;
const JOURNEY_SURFACES = [ { k:'documents', label:'Documents' }, { k:'howiwork', label:'How I Work' }, { k:'counteroffer', label:'Counteroffer' }, { k:'culture', label:'Culture' }, { k:'sandbox', label:'Sandbox' }, { k:'logistics', label:'Logistics' }, { k:'vision', label:'Vision' }, { k:'launch', label:'Launch' } ];
const DONE = { akaash:['howiwork','culture','counteroffer'], polina:[], suresh:['documents','howiwork','sandbox'], anjali:['documents','howiwork','culture','sandbox','logistics'], rishi:[], kavya:['documents','howiwork','culture','sandbox'] };

// ============================================================================
// SHARED COMPONENTS
// ============================================================================
function Mono({ children, style }) { return <span className="f-m" style={{ fontSize:10, color:'var(--faint)', ...style }}>{children}</span>; }
function RiskPill({ risk, big }) {
  const r = RISK[risk];
  return <span className="f-m" style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:big ? 10.5 : 9, fontWeight:500, padding:big ? '5px 10px' : '3px 8px', borderRadius:6, background:r.t, color:r.c, letterSpacing:'0.08em' }}><Circle size={big ? 7 : 6} fill={r.c} strokeWidth={0} /> {r.label}</span>;
}
function Avatar({ j, size = 38 }) {
  const p = PASTEL[j.hue];
  return <span className="f-d" style={{ width:size, height:size, flexShrink:0, borderRadius:size * 0.28, display:'grid', placeItems:'center', background:p.t, color:p.f, fontWeight:700, fontSize:size * 0.38 }}>{j.initials}</span>;
}
function Sparkline({ trend, h = 24 }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:2.5, height:h }} title={trend.join(' · ')}>
      {trend.map((m, i) => { const c = MOODC[m]; const neg = m === 'silent' || m === 'flooded'; const ht = neg ? h * 0.4 : m === 'wired' ? h * 0.6 : h * 0.9; return <span key={i} style={{ width:5, height:ht, borderRadius:2, background:c, opacity:0.9 }} />; })}
    </div>
  );
}
function KpiCard({ value, label, sub, tone }) {
  return (
    <div style={{ flex:'1 1 170px', minWidth:160, background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'16px 18px' }}>
      <div className="f-d" style={{ fontSize:32, fontWeight:800, lineHeight:1, color:tone || 'var(--ink)' }}>{value}</div>
      <div className="f-b" style={{ marginTop:8, fontSize:13.5, fontWeight:700, color:'var(--ink)' }}>{label}</div>
      <div className="f-b" style={{ marginTop:2, fontSize:12, color:'var(--muted)' }}>{sub}</div>
    </div>
  );
}

// ============================================================================
// LOGIN (split-screen · simulated Google SSO)
// ============================================================================
function Radar() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden="true" style={{ position:'absolute', right:-30, bottom:-30, opacity:0.9 }}>
      {[0,1,2].map((i) => <circle key={i} className="hb-ring" cx="110" cy="110" r="40" fill="none" stroke="#4A43D4" strokeWidth="1" style={{ transformOrigin:'110px 110px', animationDelay:`${i * 1.3}s` }} />)}
      <circle cx="110" cy="110" r="40" fill="none" stroke="#3A3550" strokeWidth="1" />
      <circle cx="110" cy="110" r="72" fill="none" stroke="#2A2740" strokeWidth="1" />
      <circle cx="110" cy="110" r="104" fill="none" stroke="#221F36" strokeWidth="1" />
      <circle cx="110" cy="110" r="4" fill="#6C63FF" />
      <circle cx="150" cy="86" r="3" fill="#DE5B4E" />
      <circle cx="78" cy="140" r="2.5" fill="#E0B048" />
    </svg>
  );
}
function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.3c-.5-1.4-.7-2.9-.7-4.3s.3-3 .7-4.3l-7.8-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.4l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.4 0-11.8-3.8-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}
function Login({ onSignIn }) {
  const [busy, setBusy] = useState(false);
  const go = () => { setBusy(true); setTimeout(onSignIn, 900); };
  return (
    <div className="hb" style={{ minHeight:'100vh', display:'flex' }}>
      <style>{CSS}</style>
      {/* left · trust panel */}
      <div style={{ flex:'1 1 46%', minWidth:0, background:'var(--panel)', color:'#EDEDF2', position:'relative', overflow:'hidden' }} className="hb-login-left">
        <Radar />
        <div style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', padding:'44px 48px' }}>
          <div className="f-d" style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.02em' }}>testmu<span style={{ color:'#6C63FF' }}>.</span></div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:420 }}>
            <Mono style={{ color:'#8B87B8' }}>Pre-boarding · HR console</Mono>
            <h1 className="f-d" style={{ marginTop:18, fontSize:'clamp(30px,3.6vw,42px)', fontWeight:800, lineHeight:1.08 }}>See the drop-off signals before they become a no-show.</h1>
            <p className="f-b" style={{ marginTop:16, fontSize:15, lineHeight:1.6, color:'#A5A2C4' }}>Every joiner between offer and Day 1, in one place. Risk, engagement, and the moment to reach out, watched for you.</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
            {[[ShieldCheck, 'Google Workspace single sign-on'], [Lock, 'Wellbeing data encrypted, access scoped to your portfolio'], [ScrollText, 'Every action and edit is audit-logged']].map(([Ic, t], i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}><Ic size={15} color="#6C63FF" /><span className="f-b" style={{ fontSize:12.5, color:'#B6B3D2' }}>{t}</span></div>
            ))}
          </div>
        </div>
      </div>
      {/* right · sign in */}
      <div style={{ flex:'1 1 54%', minWidth:0, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 28px' }}>
        <div className="hb-fade" style={{ width:'100%', maxWidth:380 }}>
          <div className="f-d" style={{ fontSize:20, fontWeight:800, letterSpacing:'-0.02em', marginBottom:30 }} >testmu<span style={{ color:'var(--accent)' }}>.</span><span className="f-m" style={{ marginLeft:10, fontSize:9, color:'var(--faint)', verticalAlign:'middle' }}>HR console</span></div>
          <h2 className="f-d" style={{ fontSize:27, fontWeight:800, color:'var(--ink)' }}>Sign in</h2>
          <p className="f-b" style={{ marginTop:8, fontSize:14, color:'var(--muted)', lineHeight:1.55 }}>Use your TestMu Workspace account. Access is restricted to HR business partners.</p>
          <button onClick={go} disabled={busy} className="hb-btn" style={{ marginTop:26, width:'100%', background:'var(--card)', border:'1px solid var(--hair)', borderRadius:12, padding:'14px', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:11, boxShadow:'0 1px 2px rgba(0,0,0,0.04)' }}>
            {busy ? <span className="f-b" style={{ fontSize:14.5, fontWeight:600, color:'var(--muted)' }}>Signing you in...</span> : <><GoogleG /><span className="f-b" style={{ fontSize:14.5, fontWeight:700, color:'var(--ink)' }}>Continue with Google</span></>}
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'22px 0' }}><span style={{ flex:1, height:1, background:'var(--hair)' }} /><Mono style={{ fontSize:8.5 }}>scoped access</Mono><span style={{ flex:1, height:1, background:'var(--hair)' }} /></div>
          <div style={{ display:'flex', alignItems:'flex-start', gap:9, background:'var(--card)', border:'1px solid var(--hair)', borderRadius:11, padding:'12px 14px' }}>
            <Lock size={14} color="var(--faint)" style={{ marginTop:1, flexShrink:0 }} />
            <span className="f-b" style={{ fontSize:12, color:'var(--muted)', lineHeight:1.5 }}>You will only see joiners in your portfolio. HR admins see all cohorts and the content editor.</span>
          </div>
          <p className="f-b" style={{ marginTop:26, fontSize:11, color:'var(--faint)', lineHeight:1.5 }}>Protected under TestMu data policy and DPDPA. Sessions expire after 12 hours.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SHELL · sidebar + topbar
// ============================================================================
const NAV_PRIMARY = [ { id:'overview', label:'Overview', icon:LayoutDashboard }, { id:'joiners', label:'Joiners', icon:Users }, { id:'alerts', label:'Alerts', icon:AlertTriangle }, { id:'trends', label:'Trends', icon:TrendingUp } ];
const NAV_CONFIG = [ { id:'content', label:'Content', icon:FileText }, { id:'settings', label:'Settings', icon:Settings }, { id:'audit', label:'Audit', icon:ScrollText } ];
function Sidebar({ route, go, onSignOut, alertCount }) {
  const Item = ({ it }) => { const on = route === it.id || (route === 'profile' && it.id === 'overview'); const Ic = it.icon; return (
    <button onClick={() => go(it.id)} title={it.label} className="hb-navi" style={{ display:'flex', alignItems:'center', gap:11, width:'100%', padding:'10px 12px', borderRadius:9, background:on ? 'var(--accent-soft)' : 'transparent', color:on ? 'var(--accent)' : 'var(--muted)' }}>
      <Ic size={18} strokeWidth={on ? 2.4 : 2} style={{ flexShrink:0 }} />
      <span className="hb-nav-label f-b" style={{ fontSize:13.5, fontWeight:on ? 700 : 500 }}>{it.label}</span>
      {it.id === 'alerts' && alertCount > 0 && <span className="hb-nav-label f-m" style={{ marginLeft:'auto', fontSize:9, fontWeight:500, color:'#fff', background:'var(--high)', borderRadius:99, padding:'1px 6px' }}>{alertCount}</span>}
    </button>
  ); };
  return (
    <aside style={{ background:'var(--card)', borderRight:'1px solid var(--hair)', display:'flex', flexDirection:'column', padding:'16px 12px', height:'100vh', position:'sticky', top:0 }}>
      <div className="f-d" style={{ fontSize:19, fontWeight:800, letterSpacing:'-0.02em', padding:'6px 10px 4px' }}>t<span className="hb-nav-label">estmu</span><span style={{ color:'var(--accent)' }}>.</span></div>
      <Mono style={{ padding:'0 10px 16px', fontSize:8 }} ><span className="hb-nav-label">HR console</span></Mono>
      <div style={{ display:'grid', gap:3 }}>{NAV_PRIMARY.map((it) => <Item key={it.id} it={it} />)}</div>
      <div style={{ height:1, background:'var(--hair)', margin:'14px 8px' }} />
      <Mono style={{ padding:'0 12px 8px', fontSize:8 }}><span className="hb-nav-label">Configure</span></Mono>
      <div style={{ display:'grid', gap:3 }}>{NAV_CONFIG.map((it) => <Item key={it.id} it={it} />)}</div>
      <div style={{ marginTop:'auto' }}>
        <div style={{ height:1, background:'var(--hair)', margin:'14px 8px' }} />
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 10px' }}>
          <span className="f-d" style={{ width:32, height:32, borderRadius:9, flexShrink:0, display:'grid', placeItems:'center', background:PASTEL.rose.t, color:PASTEL.rose.f, fontWeight:700, fontSize:13 }}>R</span>
          <div className="hb-nav-label" style={{ flex:1, minWidth:0 }}><div className="f-b" style={{ fontSize:12.5, fontWeight:700, color:'var(--ink)' }}>Radhika</div><div className="f-b" style={{ fontSize:10.5, color:'var(--muted)' }}>HRBP · Mumbai</div></div>
          <button onClick={onSignOut} className="hb-nav-label" title="Sign out" style={{ color:'var(--faint)' }}><LogOut size={15} /></button>
        </div>
      </div>
    </aside>
  );
}
function Topbar({ title, query, setQuery }) {
  return (
    <div style={{ position:'sticky', top:0, zIndex:5, background:'rgba(243,242,238,0.9)', backdropFilter:'blur(6px)', borderBottom:'1px solid var(--hair)', padding:'12px 24px', display:'flex', alignItems:'center', gap:16 }}>
      <div className="f-d" style={{ fontSize:16, fontWeight:700, color:'var(--ink)' }}>{title}</div>
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10, background:'var(--card)', border:'1px solid var(--hair)', borderRadius:10, padding:'8px 12px', width:260, maxWidth:'34vw' }}>
        <Search size={15} color="var(--faint)" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search joiners" className="f-b" style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize:13, color:'var(--ink)' }} />
      </div>
      <button className="hb-btn" style={{ position:'relative', width:38, height:38, borderRadius:10, border:'1px solid var(--hair)', background:'var(--card)', display:'grid', placeItems:'center', color:'var(--muted)' }}><Bell size={17} /><span style={{ position:'absolute', top:9, right:10, width:7, height:7, borderRadius:99, background:'var(--high)', border:'1.5px solid var(--card)' }} /></button>
    </div>
  );
}

// ============================================================================
// OVERVIEW
// ============================================================================
function CohortTable({ list, selId, onSelect, onOpen }) {
  const [sort, setSort] = useState('risk');
  const order = { high:0, medium:1, low:2 };
  const sorted = [...list].sort((a, b) => sort === 'risk' ? order[a.risk] - order[b.risk] : sort === 'eng' ? a.engagement - b.engagement : a.day / a.total - b.day / b.total);
  const Th = ({ id, children, w }) => <th onClick={() => id && setSort(id)} className="f-m" style={{ textAlign:'left', fontSize:8.5, color:'var(--faint)', fontWeight:500, padding:'11px 14px', cursor:id ? 'pointer' : 'default', width:w }}>{children}{sort === id && <ChevronDown size={10} style={{ marginLeft:4, verticalAlign:'middle' }} />}</th>;
  return (
    <div style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderBottom:'1px solid var(--hair)' }}>
        <span className="f-d" style={{ fontSize:15, fontWeight:700 }}>Your cohort</span>
        <span className="f-m" style={{ fontSize:9, color:'var(--faint)' }}>{list.length} joiners</span>
        <span style={{ marginLeft:'auto', display:'inline-flex', gap:10, color:'var(--faint)' }}><Filter size={15} /></span>
      </div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', minWidth:560 }}>
          <thead><tr style={{ background:'#FAFAF8' }}><Th>Joiner</Th><Th>Variant</Th><Th id="day">Day</Th><Th>7-day mood</Th><Th id="eng">Eng</Th><Th id="risk">Risk</Th><th /></tr></thead>
          <tbody>
            {sorted.map((j) => { const on = j.id === selId; return (
              <tr key={j.id} onClick={() => onSelect(j.id)} tabIndex={0} role="button" aria-label={`${j.name}, ${j.risk} risk, engagement ${j.engagement}`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(j.id); } }} className="hb-row" style={{ cursor:'pointer', background:on ? 'var(--accent-soft)' : 'transparent', borderTop:'1px solid var(--hair)' }}>
                <td style={{ padding:'11px 14px' }}><div style={{ display:'flex', alignItems:'center', gap:11 }}><Avatar j={j} size={34} /><div><div className="f-b" style={{ fontSize:13.5, fontWeight:700, color:'var(--ink)' }}>{j.name}</div><div className="f-b" style={{ fontSize:11.5, color:'var(--muted)' }}>{j.role}</div></div></div></td>
                <td className="f-b" style={{ padding:'11px 14px', fontSize:12.5, color:'var(--muted)' }}>{j.variant}</td>
                <td className="f-b" style={{ padding:'11px 14px', fontSize:12.5, fontWeight:600, color:'var(--ink)' }}>{j.day}<span style={{ color:'var(--faint)' }}>/{j.total}</span></td>
                <td style={{ padding:'11px 14px' }}><Sparkline trend={j.moodTrend} /></td>
                <td className="f-d" style={{ padding:'11px 14px', fontSize:15, fontWeight:800, color:'var(--ink)' }}>{j.engagement}</td>
                <td style={{ padding:'11px 14px' }}><RiskPill risk={j.risk} /></td>
                <td style={{ padding:'11px 8px' }}><button onClick={(e) => { e.stopPropagation(); onOpen(j.id); }} className="hb-btn" title="Open full profile" style={{ color:'var(--faint)' }}><ChevronRight size={17} /></button></td>
              </tr>
            ); })}
            {sorted.length === 0 && <tr><td colSpan={7} className="f-b" style={{ padding:'30px', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No joiners match your search.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function PeekPanel({ j, onOpen }) {
  if (!j) return null;
  const note = noteVisible(j);
  return (
    <div className="hb-slide" key={j.id} style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'18px', position:'sticky', top:88 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <Avatar j={j} size={46} />
        <div style={{ flex:1, minWidth:0 }}><div className="f-d" style={{ fontSize:18, fontWeight:700 }}>{j.name}</div><Mono style={{ fontSize:9 }}>{j.role} · {j.variant}</Mono></div>
        <RiskPill risk={j.risk} big />
      </div>
      <div style={{ display:'flex', gap:10, marginTop:16 }}>
        <div style={{ flex:1, background:'var(--paper)', borderRadius:10, padding:'11px 13px' }}><Mono style={{ fontSize:8.5 }}>Engagement</Mono><div className="f-d" style={{ marginTop:3, fontSize:22, fontWeight:800, color:'var(--ink)' }}>{j.engagement}</div></div>
        <div style={{ flex:1, background:'var(--paper)', borderRadius:10, padding:'11px 13px' }}><Mono style={{ fontSize:8.5 }}>Day</Mono><div className="f-d" style={{ marginTop:3, fontSize:22, fontWeight:800 }}>{j.day}<span style={{ fontSize:12, color:'var(--faint)' }}>/{j.total}</span></div></div>
      </div>
      <div style={{ marginTop:14 }}><Mono style={{ fontSize:8.5 }}>7-day mood</Mono><div style={{ marginTop:8 }}><Sparkline trend={j.moodTrend} h={30} /></div></div>
      {j.riskReasons.length > 0 && <div style={{ marginTop:14 }}><Mono style={{ fontSize:8.5 }}>Why</Mono><div style={{ marginTop:6, display:'grid', gap:5 }}>{j.riskReasons.map((x, i) => <div key={i} className="f-b" style={{ display:'flex', gap:7, alignItems:'center', fontSize:12.5, color:'var(--ink)' }}><AlertCircle size={13} color={RISK[j.risk].c} /> {x}</div>)}</div></div>}
      {note && <div style={{ marginTop:14, background:'var(--high-t)', borderRadius:10, padding:'11px 13px' }}><Mono style={{ fontSize:8, color:'var(--high)' }}>Personal note · alert tripped</Mono><p className="f-b" style={{ marginTop:5, fontSize:12.5, fontStyle:'italic', color:'#7A2A2A', lineHeight:1.5 }}>"{note}"</p></div>}
      <button onClick={() => onOpen(j.id)} className="hb-btn" style={{ marginTop:16, width:'100%', background:'var(--accent)', color:'#fff', borderRadius:10, padding:'12px', fontWeight:700, fontSize:13.5 }} ><span className="f-b">Open full profile</span></button>
    </div>
  );
}
function Overview({ list, selId, onSelect, onOpen }) {
  const k = kpis(JOINERS);
  const banner = JOINERS.flatMap((j) => j.alerts.map((a) => ({ id:j.id, name:j.name, text:a, risk:j.risk }))).sort((a, b) => (a.risk === 'high' ? 0 : 1) - (b.risk === 'high' ? 0 : 1)).slice(0, 3);
  const sel = list.find((j) => j.id === selId) || list[0];
  return (
    <div className="hb-fade" style={{ padding:'22px 24px 60px' }}>
      <Mono>{new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })}</Mono>
      <h1 className="f-d" style={{ marginTop:7, fontSize:'clamp(24px,3vw,30px)', fontWeight:800 }}>Good morning, Radhika.</h1>
      <p className="f-b" style={{ marginTop:5, fontSize:14, color:'var(--muted)' }}>{k.atRisk > 0 ? `${k.atRisk} of your ${k.active} joiners need a look today.` : `All ${k.active} joiners are tracking well.`}</p>
      <div style={{ marginTop:18, display:'flex', flexWrap:'wrap', gap:12 }}>
        <KpiCard value={k.active} label="Active joiners" sub="in your portfolio" />
        <KpiCard value={k.atRisk} label="At risk" sub={`${k.high} high · ${k.med} medium`} tone={k.atRisk ? 'var(--high)' : undefined} />
        <KpiCard value={k.docsPending} label="Docs pending" sub="across the cohort" tone="var(--med)" />
        <KpiCard value={`${k.avg}%`} label="Avg engagement" sub="live across cohort" tone="var(--low)" />
      </div>
      {banner.length > 0 && (
        <div style={{ marginTop:16, background:'var(--card)', border:'1px solid #F0CFCF', borderRadius:14, padding:'14px 16px' }}>
          <div className="f-m" style={{ fontSize:9, color:'var(--high)', marginBottom:11, display:'flex', alignItems:'center', gap:7 }}><AlertCircle size={13} /> {banner.length} need attention today</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            {banner.map((b, i) => { const col = b.risk === 'high' ? 'var(--high)' : 'var(--med)'; return (
              <button key={i} onClick={() => onSelect(b.id)} className="hb-btn" style={{ flex:'1 1 250px', minWidth:220, textAlign:'left', background:'var(--paper)', borderLeft:`3px solid ${col}`, borderRadius:8, padding:'10px 13px' }}>
                <div className="f-b" style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>{b.name}</div>
                <div className="f-b" style={{ marginTop:2, fontSize:12, color:'var(--muted)' }}>{b.text}</div>
              </button>
            ); })}
          </div>
        </div>
      )}
      <div style={{ marginTop:16 }} className="hb-ov-grid">
        <CohortTable list={list} selId={selId} onSelect={onSelect} onOpen={onOpen} />
        <PeekPanel j={sel} onOpen={onOpen} />
      </div>
    </div>
  );
}

// ============================================================================
// FULL JOINER PROFILE
// ============================================================================
function JoiningDateCard({ j, flash, onApply }) {
  const [days, setDays] = useState(j.daysToJoin);
  const sched = useMemo(() => computeSchedule(days), [days]);
  const presets = [2, 10, 21, 30, 45, 60];
  const changed = days !== j.daysToJoin;
  return (
    <div style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'18px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:4 }}><CalendarClock size={16} color="var(--accent)" /><span className="f-d" style={{ fontSize:15, fontWeight:700 }}>Joining date</span><span className="f-m" style={{ marginLeft:'auto', fontSize:9, color:'var(--faint)' }}>drives the whole plan</span></div>
      <p className="f-b" style={{ fontSize:12.5, color:'var(--muted)', marginBottom:14 }}>Set or move the date. The joiner app re-plans to fit the window.</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:12 }}>
        {presets.map((p) => { const on = days === p; return <button key={p} onClick={() => setDays(p)} className="hb-btn f-m" style={{ fontSize:10, padding:'8px 12px', borderRadius:8, background:on ? 'var(--accent)' : 'var(--paper)', color:on ? '#fff' : 'var(--muted)', border:`1px solid ${on ? 'var(--accent)' : 'var(--hair)'}` }}>{p} days</button>; })}
      </div>
      <input type="range" min="1" max="70" value={days} onChange={(e) => setDays(parseInt(e.target.value))} style={{ width:'100%', accentColor:'#4A43D4' }} />
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginTop:8 }}>
        <div><span className="f-d" style={{ fontSize:26, fontWeight:800 }}>{days}</span><span className="f-b" style={{ fontSize:13, color:'var(--muted)' }}> days to join</span></div>
        <span className="f-m" style={{ fontSize:10, padding:'4px 10px', borderRadius:6, background:'var(--accent-soft)', color:'var(--accent)' }}>{sched.variant}</span>
      </div>
      <p className="f-b" style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{sched.tone}.</p>
      {/* preview */}
      <div style={{ marginTop:14, borderTop:'1px solid var(--hair)', paddingTop:14 }}>
        <Mono style={{ fontSize:8.5 }}>What unlocks, and when</Mono>
        <div style={{ marginTop:9, display:'grid', gap:6 }}>
          {sched.rows.map((r) => { const Ic = r.icon; return (
            <div key={r.key} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <Ic size={14} color="var(--faint)" style={{ flexShrink:0 }} />
              <span className="f-b" style={{ fontSize:12.5, color:'var(--ink)' }}>{r.label}</span>
              <span className="f-m" style={{ marginLeft:'auto', fontSize:9, color:r.warn ? 'var(--med)' : 'var(--muted)' }}>{r.when}</span>
            </div>
          ); })}
        </div>
        {sched.deferred.length > 0 && (
          <div style={{ marginTop:12, background:'var(--paper)', borderRadius:10, padding:'11px 13px' }}>
            <Mono style={{ fontSize:8, color:'var(--med)' }}>Deferred to Week 1 (post-join)</Mono>
            <div style={{ marginTop:7, display:'flex', flexWrap:'wrap', gap:6 }}>{sched.deferred.map((d) => <span key={d} className="f-b" style={{ fontSize:11.5, fontWeight:600, color:'var(--muted)', background:'var(--card)', border:'1px solid var(--hair)', borderRadius:99, padding:'4px 10px' }}>{d}</span>)}</div>
          </div>
        )}
      </div>
      <button disabled={!changed} onClick={() => { flash(`New date applied. ${j.name}'s plan recompiled to ${sched.variant}.`); onApply && onApply(days, sched.variant); }} className="hb-btn f-b" style={{ marginTop:14, width:'100%', background:changed ? 'var(--accent)' : 'var(--paper)', color:changed ? '#fff' : 'var(--faint)', border:changed ? 'none' : '1px solid var(--hair)', borderRadius:10, padding:'12px', fontWeight:700, fontSize:13.5, cursor:changed ? 'pointer' : 'default' }}>{changed ? 'Apply new date and re-plan' : 'No change to apply'}</button>
    </div>
  );
}
function JourneyCard({ j }) {
  const done = DONE[j.id] || [];
  const cleared = JOURNEY_SURFACES.filter((s) => done.includes(s.k)).length;
  const pct = Math.round((cleared / JOURNEY_SURFACES.length) * 100);
  return (
    <div style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'18px' }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
        <Mono style={{ fontSize:8.5 }}>Journey progress</Mono>
        <span className="f-b" style={{ fontSize:12, color:'var(--muted)' }}>{cleared} of {JOURNEY_SURFACES.length} surfaces</span>
      </div>
      <div style={{ marginTop:9, height:6, borderRadius:99, background:'var(--paper)', overflow:'hidden' }}><div style={{ height:'100%', width:`${pct}%`, background:'var(--accent)', borderRadius:99 }} /></div>
      <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        {JOURNEY_SURFACES.map((s) => { const d = done.includes(s.k); return (
          <div key={s.k} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:18, height:18, borderRadius:6, flexShrink:0, display:'grid', placeItems:'center', background:d ? 'var(--low-t)' : 'var(--paper)', color:d ? 'var(--low)' : 'var(--faint)' }}>{d ? <Check size={12} strokeWidth={3} /> : <Circle size={6} fill="currentColor" strokeWidth={0} />}</span>
            <span className="f-b" style={{ fontSize:12.5, color:d ? 'var(--ink)' : 'var(--muted)' }}>{s.label}</span>
          </div>
        ); })}
      </div>
    </div>
  );
}
function Profile({ j, onBack, flash }) {
  const note = noteVisible(j);
  const [plan, setPlan] = useState({ variant:j.variant, days:j.daysToJoin });
  const replanned = plan.variant !== j.variant;
  const ACTIONS = [ { k:'WhatsApp', icon:MessageCircle, primary:true }, { k:'Call', icon:PhoneCall }, { k:'Email', icon:Mail }, { k:'Nudge via Kane', icon:Send }, { k:'Escalate to recruiter', icon:AlertTriangle }, { k:'Approve documents', icon:Check } ];
  return (
    <div className="hb-fade" style={{ padding:'20px 24px 60px' }}>
      <button onClick={onBack} className="hb-btn f-b" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:16 }}><ArrowLeft size={15} /> Overview</button>
      <div style={{ display:'flex', alignItems:'flex-start', gap:16, flexWrap:'wrap' }}>
        <Avatar j={j} size={58} />
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}><h1 className="f-d" style={{ fontSize:26, fontWeight:800 }}>{j.name}</h1><RiskPill risk={j.risk} big /></div>
          <div className="f-m" style={{ marginTop:6, fontSize:9.5, color:'var(--faint)' }}>{j.role} · {plan.variant}{replanned ? ' (re-planned)' : ''} · day {j.day} of {j.total} · joins {j.doj}</div>
        </div>
      </div>
      <div style={{ marginTop:20 }} className="hb-ov-grid">
        {/* main column */}
        <div style={{ display:'grid', gap:14 }}>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:150, background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'16px 18px' }}><Mono style={{ fontSize:8.5 }}>Engagement</Mono><div className="f-d" style={{ marginTop:5, fontSize:30, fontWeight:800, color:'var(--ink)' }}>{j.engagement}<span style={{ fontSize:14, color:'var(--faint)' }}>/100</span></div></div>
            <div style={{ flex:1, minWidth:150, background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'16px 18px' }}><Mono style={{ fontSize:8.5 }}>Documents</Mono><div className="f-d" style={{ marginTop:5, fontSize:30, fontWeight:800 }}>{j.docsDone}<span style={{ fontSize:14, color:'var(--faint)' }}>/{j.docsTotal}</span></div></div>
          </div>
          <JourneyCard j={j} />
          {j.riskReasons.length > 0 && (
            <div style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'18px' }}>
              <Mono style={{ fontSize:8.5 }}>Risk drivers</Mono>
              <div style={{ marginTop:10, display:'grid', gap:8 }}>{j.riskReasons.map((x, i) => <div key={i} className="f-b" style={{ display:'flex', gap:9, alignItems:'center', fontSize:13.5, color:'var(--ink)' }}><AlertCircle size={15} color={RISK[j.risk].c} /> {x}</div>)}</div>
            </div>
          )}
          <div style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'18px' }}>
            <Mono style={{ fontSize:8.5 }}>7-day mood</Mono>
            <div style={{ marginTop:12, display:'flex', gap:8 }}>{j.moodTrend.map((m, i) => <div key={i} style={{ flex:1, textAlign:'center' }}><div style={{ height:40, borderRadius:7, background:MOODC[m], opacity:0.9 }} title={m} /><Mono style={{ fontSize:7.5, marginTop:5 }}>{m.slice(0, 3)}</Mono></div>)}</div>
          </div>
          {j.wellbeingSaved ? (
            <div style={{ background:'var(--low-t)', borderRadius:14, padding:'18px' }}>
              <Mono style={{ fontSize:8.5, color:'var(--low)' }}>Day-1 configuration · always shared with HR</Mono>
              <div style={{ marginTop:11, display:'grid', gap:7 }}>{j.observations.map((o, i) => <div key={i} className="f-b" style={{ display:'flex', gap:9, fontSize:13, color:'#22402F', lineHeight:1.4 }}><Check size={15} strokeWidth={2.6} style={{ flexShrink:0, marginTop:1 }} /> {o}</div>)}</div>
            </div>
          ) : (
            <div style={{ background:'var(--card)', border:'1px dashed var(--hair)', borderRadius:14, padding:'18px', textAlign:'center' }}><span className="f-b" style={{ fontSize:13, color:'var(--muted)' }}>How I Work not completed yet. No Day-1 configuration to share.</span></div>
          )}
          <div style={{ borderRadius:14, padding:'16px 18px', background:note ? 'var(--high-t)' : 'var(--card)', border:`1px solid ${note ? '#F0CFCF' : 'var(--hair)'}` }}>
            <div className="f-m" style={{ fontSize:8.5, color:note ? 'var(--high)' : 'var(--faint)', display:'flex', alignItems:'center', gap:6 }}>{note ? <><AlertCircle size={12} /> Personal note · consent alert tripped</> : <><Lock size={12} /> Personal note · sealed</>}</div>
            {note ? <p className="f-b" style={{ marginTop:8, fontSize:13.5, fontStyle:'italic', color:'#7A2A2A', lineHeight:1.5 }}>"{note}"</p>
              : <p className="f-b" style={{ marginTop:8, fontSize:12.5, color:'var(--muted)', lineHeight:1.5 }}>{j.consents.c1 || j.consents.c2 ? 'They consented to HR being looped in, but no alert has tripped. Their notes stay between them and Kane.' : 'No HR-escalation consent given. Their notes stay private.'}</p>}
          </div>
        </div>
        {/* right rail */}
        <div style={{ display:'grid', gap:14, position:'sticky', top:88 }}>
          <div style={{ background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'18px' }}>
            <Mono style={{ fontSize:8.5 }}>Actions</Mono>
            <div style={{ marginTop:12, display:'grid', gap:8 }}>
              {ACTIONS.map((a) => { const Ic = a.icon; return (
                <button key={a.k} onClick={() => flash(`Simulated: ${a.k} for ${j.name}`)} className="hb-btn f-b" style={{ display:'flex', alignItems:'center', gap:10, width:'100%', textAlign:'left', padding:'11px 13px', borderRadius:10, fontSize:13, fontWeight:600, background:a.primary ? 'var(--accent)' : 'var(--paper)', color:a.primary ? '#fff' : 'var(--ink)', border:a.primary ? 'none' : '1px solid var(--hair)' }}><Ic size={15} /> {a.k}</button>
              ); })}
            </div>
          </div>
          <JoiningDateCard j={j} flash={flash} onApply={(days, variant) => setPlan({ days, variant })} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// OTHER ROUTES (light, on-brand)
// ============================================================================
function AlertsView({ list, onOpen }) {
  const all = list.flatMap((j) => j.alerts.map((a) => ({ j, text:a }))).sort((x, y) => (x.j.risk === 'high' ? 0 : 1) - (y.j.risk === 'high' ? 0 : 1));
  return (
    <div className="hb-fade" style={{ padding:'22px 24px 60px' }}>
      <h1 className="f-d" style={{ fontSize:24, fontWeight:800 }}>Alerts</h1>
      <p className="f-b" style={{ marginTop:5, fontSize:14, color:'var(--muted)', marginBottom:18 }}>{all.length} open across your cohort, most urgent first.</p>
      <div style={{ display:'grid', gap:10 }}>
        {all.map((a, i) => { const col = a.j.risk === 'high' ? 'var(--high)' : 'var(--med)'; return (
          <button key={i} onClick={() => onOpen(a.j.id)} className="hb-row hb-btn" style={{ textAlign:'left', display:'flex', alignItems:'center', gap:13, background:'var(--card)', border:'1px solid var(--hair)', borderLeft:`3px solid ${col}`, borderRadius:12, padding:'14px 16px' }}>
            <Avatar j={a.j} size={38} />
            <div style={{ flex:1 }}><div className="f-b" style={{ fontSize:14, fontWeight:700 }}>{a.j.name}</div><div className="f-b" style={{ fontSize:12.5, color:'var(--muted)' }}>{a.text}</div></div>
            <RiskPill risk={a.j.risk} /><ChevronRight size={17} color="var(--faint)" />
          </button>
        ); })}
      </div>
    </div>
  );
}
function ContentView({ flash }) {
  const areas = [ { n:'Welcome Kit', s:'18 items · 6 categories', icon:Package }, { n:'Benefits', s:'18 cards · 6 groups', icon:Sparkles }, { n:'Documents', s:'7 sections', icon:FileText }, { n:'How I Work', s:'4 scenarios', icon:Compass }, { n:'Product Sandbox', s:'5 scenes · 8 lenses', icon:Wand2 }, { n:'Culture Game', s:'6 zones', icon:Gamepad2 }, { n:'Kane voice', s:'12 scripted lines', icon:MessageCircle }, { n:'Journey rules', s:'tiers · priorities · cadence', icon:CalendarClock }, { n:'Messages', s:'WhatsApp + email templates', icon:Mail } ];
  return (
    <div className="hb-fade" style={{ padding:'22px 24px 60px' }}>
      <h1 className="f-d" style={{ fontSize:24, fontWeight:800 }}>Content</h1>
      <p className="f-b" style={{ marginTop:5, fontSize:14, color:'var(--muted)', marginBottom:18 }}>Edit what every joiner sees. Changes draft, preview, then publish as a version.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
        {areas.map((a) => { const Ic = a.icon; return (
          <button key={a.n} onClick={() => flash(`Editor for ${a.n} opens here`)} className="hb-row hb-btn" style={{ textAlign:'left', background:'var(--card)', border:'1px solid var(--hair)', borderRadius:14, padding:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}><span style={{ width:36, height:36, borderRadius:10, display:'grid', placeItems:'center', background:'var(--accent-soft)', color:'var(--accent)' }}><Ic size={18} /></span><Pencil size={14} color="var(--faint)" /></div>
            <div className="f-d" style={{ marginTop:12, fontSize:15, fontWeight:700 }}>{a.n}</div>
            <div className="f-b" style={{ marginTop:2, fontSize:12, color:'var(--muted)' }}>{a.s}</div>
          </button>
        ); })}
      </div>
    </div>
  );
}
function Placeholder({ title, sub, icon:Ic }) {
  return (
    <div className="hb-fade" style={{ padding:'22px 24px 60px' }}>
      <h1 className="f-d" style={{ fontSize:24, fontWeight:800 }}>{title}</h1>
      <p className="f-b" style={{ marginTop:5, fontSize:14, color:'var(--muted)' }}>{sub}</p>
      <div style={{ marginTop:20, background:'var(--card)', border:'1px dashed var(--hair)', borderRadius:16, padding:'56px 24px', textAlign:'center' }}>
        <span style={{ width:52, height:52, borderRadius:14, display:'inline-grid', placeItems:'center', background:'var(--accent-soft)', color:'var(--accent)' }}><Ic size={24} /></span>
        <div className="f-d" style={{ marginTop:14, fontSize:16, fontWeight:700 }}>Coming in this build phase</div>
        <p className="f-b" style={{ marginTop:6, fontSize:13, color:'var(--muted)', maxWidth:320, marginInline:'auto', lineHeight:1.5 }}>Wired to the same cohort and engine as Overview. This screen is next on the plan.</p>
      </div>
    </div>
  );
}

// ============================================================================
// APP
// ============================================================================
export default function HRBPConsole() {
  const [authed, setAuthed] = useState(false);
  const [route, setRoute] = useState('overview');
  const [selId, setSelId] = useState(JOINERS[1].id);
  const [profileId, setProfileId] = useState(null);
  const [profileFrom, setProfileFrom] = useState('overview');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2800); };
  const list = useMemo(() => query ? JOINERS.filter((j) => j.name.toLowerCase().includes(query.toLowerCase()) || j.role.toLowerCase().includes(query.toLowerCase())) : JOINERS, [query]);
  const alertCount = JOINERS.reduce((s, j) => s + j.alerts.length, 0);
  const go = (r) => { setRoute(r); };
  const openProfile = (id) => { setProfileFrom(route === 'profile' ? profileFrom : route); setProfileId(id); setRoute('profile'); const el = document.querySelector('main.hb-scroll'); if (el) el.scrollTop = 0; };
  const profileJoiner = JOINERS.find((j) => j.id === profileId);
  if (!authed) return <Login onSignIn={() => setAuthed(true)} />;
  const TITLES = { overview:'Overview', joiners:'Joiners', alerts:'Alerts', trends:'Trends', content:'Content', settings:'Settings', audit:'Audit', profile:'Joiner' };
  return (
    <div className="hb" style={{ minHeight:'100vh' }}>
      <style>{CSS}</style>
      <div className="hb-shell">
        <Sidebar route={route} go={go} onSignOut={() => setAuthed(false)} alertCount={alertCount} />
        <main className="hb-scroll" style={{ height:'100vh', overflowY:'auto' }}>
          <Topbar title={TITLES[route] || 'Console'} query={query} setQuery={setQuery} />
          {route === 'overview' && <Overview list={list} selId={selId} onSelect={setSelId} onOpen={openProfile} />}
          {route === 'joiners' && <div className="hb-fade" style={{ padding:'22px 24px 60px' }}><h1 className="f-d" style={{ fontSize:24, fontWeight:800, marginBottom:16 }}>Joiners</h1><CohortTable list={list} selId={selId} onSelect={setSelId} onOpen={openProfile} /></div>}
          {route === 'alerts' && <AlertsView list={JOINERS} onOpen={openProfile} />}
          {route === 'trends' && <Placeholder title="Trends" sub="Engagement over time, the drop-off funnel, variant comparison." icon={TrendingUp} />}
          {route === 'content' && <ContentView flash={flash} />}
          {route === 'settings' && <Placeholder title="Settings" sub="Alert thresholds, integrations, the escalation chain." icon={Settings} />}
          {route === 'audit' && <Placeholder title="Audit" sub="Every action and edit, who, when, and what. Exportable." icon={ScrollText} />}
          {route === 'profile' && profileJoiner && <Profile j={profileJoiner} onBack={() => setRoute(profileFrom)} flash={flash} />}
        </main>
      </div>
      {toast && <div className="hb-fade" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'var(--ink)', color:'#fff', borderRadius:10, padding:'12px 18px', fontSize:13, fontWeight:600, zIndex:50, boxShadow:'0 8px 30px rgba(0,0,0,0.25)' }} ><span className="f-b">{toast}</span></div>}
    </div>
  );
}
