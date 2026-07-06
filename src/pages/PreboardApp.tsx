// TestMu AI · Pre-boarding · Intelligent joiner demo · Cosmic-Bento + Kane
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Mail, ArrowRight, ArrowLeft, ChevronRight, Check, Plus, X, Lock,
  Compass, Heart, Package, FileText, MapPin, Home as HomeIcon, MessageCircle,
  ShieldCheck, Users, Award, Rocket, Send, Sparkles, RotateCcw, FlaskConical,
  CalendarClock, Volume2, MessageSquareText, Map, Bell, BellOff, Clock,
  Headphones, Lightbulb, NotebookPen, Presentation, Monitor, Keyboard, Mouse,
  GlassWater, Dumbbell, Sprout, Glasses, BookOpen, Shirt, Coffee, Watch, CalendarDays,
  Utensils, Stethoscope, Eye, Baby, Plane, Gift, Car, Umbrella, GraduationCap,
  Briefcase, Landmark, FileCheck, Upload, Fingerprint, Download, ExternalLink,
  Library, Building2, Sunrise, Telescope, UserPlus, Phone, Smartphone,
  Code, Cpu, Layers, Activity, Wand2, AlertTriangle, Play, Trophy, Bug,
  DollarSign, Megaphone, Star, Zap, Gamepad2, Boxes, CircleCheck, Gauge,
  TrendingUp, Radio, Flag, Anchor, Navigation,
  Search, Filter, AlertCircle, TrendingDown, PhoneCall, Circle, LayoutDashboard
} from 'lucide-react';

const PrefsCtx = React.createContext({ sensory:'standard', tone:'standard', textSize:'normal' });
const useA11y = () => useContext(PrefsCtx);
const lowVisual = (sensory) => sensory === 'text-only';

const TOKENS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.pb-root{
  --void:#0A0A16; --sky-1:#2A1E63; --sky-2:#16103A; --panel:#12122A; --panel-2:#14142A; --c-border:#242449;
  --violet:#8B7CFF; --cyan:#5FE3CE; --c-amber:#F2A93B;
  --c-text:#EAEAF5; --c-muted:#9A98C0; --track:#1B1B33;
  --page:#EEEBFA; --card:#FFFFFF; --indigo:#5B5BD6; --mint:#36B58A;
  --peach:#FF9E7A; --sunshine:#F4C04A; --ink:#1D1B2E; --muted:#6F6B8A;
  --ring-track:#E6E3F5; --b-border:#E4E1F4;
  font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:var(--ink);
  -webkit-font-smoothing:antialiased;
}
.pb-root *{box-sizing:border-box; margin:0; padding:0;}
.f-disp{font-family:'Bricolage Grotesque',sans-serif; letter-spacing:-0.02em;}
.f-serif{font-family:'Instrument Serif',Georgia,serif; letter-spacing:0;}
.f-body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;}
.f-mono{font-family:'JetBrains Mono',monospace; text-transform:uppercase; letter-spacing:0.16em;}
.pb-root button{font-family:inherit; cursor:pointer; border:none; background:none; color:inherit;}
.pb-root button:focus-visible{outline:2px solid var(--indigo); outline-offset:2px;}
.pb-root .on-dark:focus-visible{outline-color:var(--violet);}
.pb-root input,.pb-root select,.pb-root textarea{font-family:inherit;}
.pb-scroll{flex:1; overflow-y:auto; overflow-x:hidden;}
.pb-scroll::-webkit-scrollbar{width:8px;}
.pb-scroll::-webkit-scrollbar-thumb{background:rgba(120,116,150,0.35); border-radius:99px;}
.cosmic-sky{ background:radial-gradient(130% 90% at 50% 22%, var(--sky-1) 0%, var(--sky-2) 55%, var(--void) 100%); }

.pb-root.reduce *{animation:none !important; transition:none !important;}
.pb-root.contrast{ --c-muted:#CFCDF0; --muted:#36324E; --c-border:#46467E; --b-border:#B9B5DE; }
.pb-root.textonly .cosmic-sky{ background:var(--void) !important; }

@media (prefers-reduced-motion: reduce){ .pb-root *{animation:none !important; transition:none !important;} }
.pb-fade{animation:pbFade .5s cubic-bezier(.2,.7,.2,1) both;}
@keyframes pbFade{from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:none;}}
.pb-rise{animation:pbRise .55s cubic-bezier(.2,.7,.2,1) both;}
@keyframes pbRise{from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:none;}}
.pb-line{animation:pbLine 1.1s cubic-bezier(.2,.7,.2,1) both;}
@keyframes pbLine{from{opacity:0; transform:translateY(8px); filter:blur(4px);} to{opacity:1; transform:none; filter:none;}}
.pb-grow{animation:pbGrow 1s cubic-bezier(.3,.8,.3,1) both;}
@keyframes pbGrow{from{width:0;}}
.pb-pulse{animation:pbPulse 2.4s ease-in-out infinite;}
@keyframes pbPulse{0%,100%{box-shadow:0 0 0 1px var(--violet),0 0 18px rgba(139,124,255,.35);}50%{box-shadow:0 0 0 1px var(--violet),0 0 26px rgba(139,124,255,.6);}}
.pb-blink{animation:pbBlink 1.7s ease-in-out infinite;}
@keyframes pbBlink{0%,100%{opacity:1;}50%{opacity:.45;}}
.pb-breathe{animation:pbBreathe 4.5s ease-in-out infinite;}
@keyframes pbBreathe{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
.pb-float{animation:pbFloat 5.5s ease-in-out infinite;}
@keyframes pbFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
.pb-twinkle{animation:pbTwinkle 3.5s ease-in-out infinite;}
@keyframes pbTwinkle{0%,100%{opacity:.25;}50%{opacity:.9;}}
.pb-lift{animation:pbLift 3s cubic-bezier(.4,0,.5,1) forwards;}
@keyframes pbLift{0%{transform:translateY(0);}25%{transform:translateY(8px);}100%{transform:translateY(-520px);}}
.pb-flame{animation:pbFlame .15s ease-in-out infinite alternate;}
@keyframes pbFlame{from{transform:scaleY(.82);}to{transform:scaleY(1.12);}}
`;

const A = {
  indigo:   { tile:'#EAE9FB', fg:'#4A4AB0', solid:'#5B5BD6' },
  mint:     { tile:'#E2F4ED', fg:'#1F7A5C', solid:'#36B58A' },
  peach:    { tile:'#FCEBE2', fg:'#A85636', solid:'#FF9E7A' },
  sunshine: { tile:'#FBF0D6', fg:'#8A6410', solid:'#E0A82E' },
  sky:      { tile:'#E2EEFB', fg:'#2C5E96', solid:'#5B9BD6' },
  rose:     { tile:'#FBE6EE', fg:'#9E3866', solid:'#E07A9E' }
};

const VARIANT_CONFIG = {
  Sprint:   { label:'Sprint', range:'21 days or fewer', whatsapp:'daily',
    days:{ day0Entry:0, documents:2, counteroffer:3, culture:4, wellbeing:5, sandbox:6, logistics:10, vision:12, launch:14 },
    silence:{ kane:2, radhika:3, recruiter:5 }, curiousMind:7 },
  Standard: { label:'Standard', range:'22 to 45 days', whatsapp:'3x weekly',
    days:{ day0Entry:0, documents:4, counteroffer:8, culture:7, wellbeing:9, sandbox:11, logistics:20, vision:24, launch:28 },
    silence:{ kane:3, radhika:5, recruiter:7 }, curiousMind:10 },
  Extended: { label:'Extended', range:'46 days or more', whatsapp:'2x weekly',
    days:{ day0Entry:0, documents:8, counteroffer:16, culture:14, wellbeing:18, sandbox:22, logistics:40, vision:48, launch:56 },
    silence:{ kane:5, radhika:8, recruiter:11 }, curiousMind:14 }
};
const computeVariant = (days) => (days <= 21 ? 'Sprint' : days <= 45 ? 'Standard' : 'Extended');

const JOURNEY = [
  { key:'documents', screen:'documents', label:'Documents Vault', icon:FileText, done:(j) => docsAllDone(j) },
  { key:'wellbeing', screen:'howiwork', label:'How I Work', icon:Compass, done:(j) => j.wellbeingProfile.saved },
  { key:'culture', screen:'culture', label:'Culture Game', icon:Gamepad2, done:(j) => j.culture.done },
  { key:'sandbox', screen:'sandbox', label:'Product Sandbox', icon:Wand2, done:(j) => j.sandbox.seen },
  { key:'counteroffer', screen:'counteroffer', label:'A quiet check-in', icon:ShieldCheck, done:(j) => !!j.counteroffer.reflection },
  { key:'logistics', screen:'logistics', label:'Day 1 logistics', icon:MapPin, done:(j) => j.logistics.done },
  { key:'vision', screen:'vision', label:'The vision', icon:Telescope, done:(j) => j.vision.read },
  { key:'launch', screen:'launch', label:'Launch', icon:Rocket, done:(j) => false }
];
const unlockDay = (j, key) => { const cfg = VARIANT_CONFIG[j.variant] || VARIANT_CONFIG.Standard; return cfg.days[key] != null ? cfg.days[key] : 0; };
const screenUnlocked = (j, screen) => {
  if (j.testMode) return true;
  const m = JOURNEY.find((x) => x.screen === screen);
  if (!m) return true;
  return j.day >= unlockDay(j, m.key);
};
function getJourneyState(j) {
  const rows = JOURNEY.filter((m) => m.key !== 'launch').map((m) => ({ ...m, day:unlockDay(j, m.key), unlocked:j.testMode || j.day >= unlockDay(j, m.key), complete:m.done(j) }));
  const upcoming = rows.filter((r) => !r.unlocked).sort((a, b) => a.day - b.day);
  const openNow = rows.filter((r) => r.unlocked && !r.complete);
  const done = rows.filter((r) => r.complete);
  return { rows, upcoming, openNow, done, nextUp:upcoming[0] || null };
}

const MOODS6 = [
  { id:'calm', label:'Calm', color:'#84A98C', sentiment:'positive' },
  { id:'curious', label:'Curious', color:'#E8B948', sentiment:'positive' },
  { id:'floating', label:'Floating', color:'#A89BE0', sentiment:'positive' },
  { id:'wired', label:'Wired', color:'#FB923C', sentiment:'neutral' },
  { id:'flooded', label:'Flooded', color:'#EF4444', sentiment:'negative' },
  { id:'silent', label:'Silent', color:'#8B7355', sentiment:'negative' }
];
function computeRiskScore(j) {
  const silentDays = (j.moodLog || []).filter((m) => m.mood === 'silent').length;
  const floodedDays = (j.moodLog || []).filter((m) => m.mood === 'flooded').length;
  const eng = j.engagementScore != null ? j.engagementScore : 50;
  if (silentDays >= 5 || eng < 40) return 'high';
  if (silentDays >= 3 || floodedDays >= 3 || eng < 60) return 'medium';
  return 'low';
}
function computeSilenceTrigger(j) {
  const cfg = (VARIANT_CONFIG[j.variant] || VARIANT_CONFIG.Standard).silence;
  const d = j.daysSilent || 0;
  if (d >= cfg.recruiter) return { day:d, level:'recruiter', who:'Recruiter', color:'#E07856' };
  if (d >= cfg.radhika) return { day:d, level:'radhika', who:'Radhika (HR)', color:'#E8B948' };
  if (d >= cfg.kane) return { day:d, level:'kane', who:'Kane', color:'#84A98C' };
  return null;
}
const greetingFor = (h) => (h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening');

const BADGE_CONFIG = [
  { id:'paperworkPilot', name:'Paperwork Pilot', part:'leftFuelTank', color:'#E8B948', core:true, icon:FileCheck, crit:'All documents verified', earned:(j) => docsAllDone(j) },
  { id:'platformNative', name:'Platform Native', part:'engine', color:'#6C5CE7', core:true, icon:Wand2, crit:'Sandbox + role lens done', earned:(j) => j.sandbox.seen },
  { id:'crewInsignia', name:'Crew Insignia', part:'comms', color:'#A89BE0', core:true, icon:Gamepad2, crit:'Culture scenarios complete', earned:(j) => j.culture.done },
  { id:'compassSet', name:'Compass Set', part:'navigation', color:'#84A98C', core:true, icon:Compass, crit:'How I Work profile saved', earned:(j) => j.wellbeingProfile.saved },
  { id:'groundCrew', name:'Ground Crew', part:'rightFuelTank', color:'#E07856', core:true, icon:MapPin, crit:'All logistics opened', earned:(j) => j.logistics.done },
  { id:'starPlotter', name:'Star Plotter', part:'noseCone', color:'#7C3AED', core:true, icon:Telescope, crit:'Vision read', earned:(j) => j.vision.read },
  { id:'earlyBird', name:'Early Bird', part:'stripe', color:'#FB923C', core:false, icon:Sunrise, crit:'Three surfaces early', earned:(j) => coreEarnedCount(j) >= 3 },
  { id:'curiousMind', name:'Curious Mind', part:'patch', color:'#5B21B6', core:false, icon:BookOpen, crit:'Library reads (variant-set)', earned:(j) => (j.libraryReads || 0) >= ((VARIANT_CONFIG[j.variant] || VARIANT_CONFIG.Standard).curiousMind) },
  { id:'socialButterfly', name:'Social Butterfly', part:'flag', color:'#FF8C77', core:false, icon:Megaphone, crit:'Socials + 3 teammates', earned:(j) => j.socialsFollowed && (j.greeted || 0) >= 3 }
];
function coreEarnedCount(j) { return BADGE_CONFIG.filter((b) => b.core && b.earned(j)).length; }
function badgesFor(j) { return BADGE_CONFIG.map((b) => ({ ...b, isEarned:b.earned(j) })); }
function rocketState(j) { const b = badgesFor(j); return { earned:b.filter((x) => x.isEarned).length, total:b.length, core:b.filter((x) => x.core), bonus:b.filter((x) => !x.core), lit:Object.fromEntries(b.map((x) => [x.part, x.isEarned])), colors:Object.fromEntries(b.map((x) => [x.part, x.color])) }; }

const NOTICE_DAYS = 30;
const INITIAL_JOINER = {
  id:'akaash-mehta-001', name:'Akaash Mehta', firstName:'Akaash',
  role:'BDR · APAC', track:'sales', variant:computeVariant(NOTICE_DAYS),
  email:'akaash.mehta@testmuai.com', noticeDays:NOTICE_DAYS, day:0, totalDays:NOTICE_DAYS, testMode:true,
  setupDone:false,
  prefs:{ pronouns:'', notifStart:'09:00', notifEnd:'18:00', sensory:'standard', tone:'standard', textSize:'normal', consent1:false, consent2:false },
  moodBaseline:{ value:0.62, tags:[], note:'' },
  moodLog:[], daysSilent:0, engagementScore:50,
  familyInsurance:[ { relation:'Spouse', name:'Naina' }, { relation:'Child', name:'Vihaan' } ],
  wellbeingProfile:{ saved:false, savedDay:null, shareWithManager:true, observations:[], changes:[] },
  welcomeKit:{ submitted:false, submittedDay:null, items:[] },
  benefitsViewed:false, buddyMet:false,
  documents:{},
  sandbox:{ seen:false, role:null },
  culture:{ done:false, scenariosDone:0 },
  logistics:{ done:false, opened:[] },
  vision:{ read:false },
  libraryReads:0, greeted:0, socialsFollowed:false,
  counteroffer:{ reflection:null, recapSeen:false }
};

const MOOD_TAGS = ['anxious','excited','confused','ready','overwhelmed','curious','tired','energized','bored','distracted','hopeful','doubtful','calm'];

// ============================================================================
// SHARED COHORT STORE (cross-tab · localStorage + BroadcastChannel)
// Every joiner who signs in is persisted by email; the HR console reads them all
// and updates live across tabs in the same browser.
// ============================================================================
const STORE_KEY = 'testmu:cohort:v1';
const STORE_CH = 'testmu:cohort';
function loadStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) { return {}; }
}
function saveJoinerToStore(j) {
  if (!j || !j.email) return;
  try {
    const map = loadStore();
    map[j.email] = { ...j, _updated:Date.now() };
    localStorage.setItem(STORE_KEY, JSON.stringify(map));
  } catch (e) { /* storage unavailable */ }
  try { const ch = new BroadcastChannel(STORE_CH); ch.postMessage({ type:'update', email:j.email }); ch.close(); } catch (e) { /* no BroadcastChannel */ }
}
function loadJoinerFromStore(email) { const map = loadStore(); return map[email] || null; }
function allStoredJoiners() { const map = loadStore(); return Object.values(map).sort((a, b) => (b._updated || 0) - (a._updated || 0)); }
function subscribeStore(cb) {
  const off = [];
  try { const ch = new BroadcastChannel(STORE_CH); ch.onmessage = () => cb(); off.push(() => ch.close()); } catch (e) { /* no-op */ }
  const onStorage = (e) => { if (e.key === STORE_KEY) cb(); };
  window.addEventListener('storage', onStorage); off.push(() => window.removeEventListener('storage', onStorage));
  return () => off.forEach((f) => f());
}
function joinerFromEmail(email) {
  const clean = (email || '').trim().toLowerCase();
  const existing = loadJoinerFromStore(clean);
  if (existing) return existing;
  if (clean === INITIAL_JOINER.email) return { ...JSON.parse(JSON.stringify(INITIAL_JOINER)), email:clean };
  const local = (clean.split('@')[0] || 'new.joiner').replace(/[._-]+/g, ' ').trim();
  const name = local.split(' ').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ') || 'New Joiner';
  const first = name.split(' ')[0];
  const base = JSON.parse(JSON.stringify(INITIAL_JOINER));
  return { ...base, id:'joiner-' + clean, email:clean, name, firstName:first };
}

const TEAM = [
  { name:'Priya Menon', id:'priya-menon', role:'Sales Manager · APAC', line:'Your manager. Direct, fast, fair.', accent:'indigo', day:0 },
  { name:'Rohan Bhatt', id:'rohan-bhatt', role:'Senior BDR', line:'Your buddy. Two years in, knows everyone.', accent:'sky', day:0 },
  { name:'Asha Iyer', id:'asha-iyer', role:'VP Sales', line:'Runs the APAC number. You will pitch to her one day.', accent:'peach', day:5 },
  { name:'Vikram Sethi', id:'vikram-sethi', role:'Account Executive', line:'Where your qualified leads go to close.', accent:'sunshine', day:6 },
  { name:'Diya Krishnan', id:'diya-krishnan', role:'BDR · EMEA', line:'Your counterpart across the timezone.', accent:'rose', day:7 },
  { name:'Anand Reddy', id:'anand-reddy', role:'Director · Product', line:'Brings the roadmap to the sales floor.', accent:'mint', day:12 }
];
const BUDDY = TEAM[1];

const SCENARIOS = [
  { id:'wednesday', n:1, name:'The Wednesday', icon:CalendarClock, accent:'sunshine',
    prompt:"It is a Wednesday. Three things land at once: a demo at 2, a teammate stuck and pinging you, and a review you have not started. First move?",
    options:[
      { label:'Triage, then block focus time for the hardest one', observation:'You protect your bandwidth.', change:'Focus blocks held on your calendar by default.' },
      { label:'Knock out the small wins first, clear the noise', observation:'You build momentum with small wins.', change:'Day 1 starts with a quick win.' },
      { label:'Loop in your manager or buddy before deciding', observation:'You process out loud.', change:'Extended 1:1 time in your first week.' },
      { label:'Flag it early, push back on what cannot fit', observation:'You set boundaries early.', change:'Your manager is briefed on capacity signals.' },
      { label:'Head down, power through all of it', observation:'You shoulder the load.', change:'A gentle wellbeing check-in on Day 5.' }
    ]},
  { id:'openfloor', n:2, name:'The Open Floor', icon:Volume2, accent:'mint',
    prompt:"Open floor, full energy. Chatter, a standup nearby, someone on speaker. You have two hours of deep work ahead. What do you do?",
    options:[
      { label:'Headphones on, build your own bubble', observation:'You build your own bubble.', change:'Your Welcome Kit suggests noise-cancelling headphones.' },
      { label:'Move to a quieter corner or room', observation:'You vote with your feet.', change:'A quiet-room booking link, ready Day 1.' },
      { label:'Lean into it, use the buzz as background', observation:'You ride the energy.', change:'Open seating, where the buzz is.' },
      { label:'Shift the deep work to early morning instead', observation:'You shift around the noise.', change:'Mornings before 10 kept clear for deep work.' },
      { label:'Step out for a reset, a walk or a breather', observation:'You self-regulate physically.', change:'Wellbeing resources surfaced for you.' }
    ]},
  { id:'review', n:3, name:'The Review', icon:MessageSquareText, accent:'peach',
    prompt:"Your manager has feedback on something you built. Some of it stings a little. How do you want it delivered?",
    options:[
      { label:'In writing first, then we talk', observation:'You process in writing.', change:'Your manager defaults to written feedback first.' },
      { label:'Face to face, talk it through', observation:'You process through people.', change:'1:1s lean toward live conversation.' },
      { label:'Let me sit with it, hear the rest later', observation:'You need processing space.', change:'Feedback lands after lunch, not on the spot.' },
      { label:'Straight and direct, just the facts', observation:'You handle direct.', change:'Straight talk in your 1:1s.' },
      { label:'Give me a beat, then I will circle back', observation:'You take a beat before responding.', change:'Feedback runs async, so you can take a beat.' }
    ]},
  { id:'ask', n:4, name:'The Ask', icon:Map, accent:'indigo',
    prompt:"New project, loose brief. Figure out the best approach and run with it. Where do you start?",
    options:[
      { label:'Get clarity on the goal before anything', observation:'You scan before acting.', change:'Project briefs include an open-questions section.' },
      { label:'Sketch a quick proposal, get a read on it', observation:'You learn by plan.', change:'Projects start proposal-first.' },
      { label:'Prototype straight away, learn by building', observation:'You learn by doing.', change:'Projects start in a sandbox.' },
      { label:'Pull in a senior teammate to scope it', observation:'You learn through people.', change:'A senior teammate paired with you for month one.' },
      { label:'Read how it was done before, then go', observation:'You learn by example.', change:'Your Library highlights past project archives.' }
    ]}
];

const KIT_CATALOG = [
  { id:'tech', label:'Tech', accent:'sunshine', items:[
    { id:'headphones', name:'Noise-cancelling headphones', icon:Headphones }, { id:'mouse', name:'Ergonomic mouse', icon:Mouse },
    { id:'keyboard', name:'Mechanical keyboard', icon:Keyboard }, { id:'monitor', name:'External monitor', icon:Monitor } ]},
  { id:'desk', label:'Desk setup', accent:'mint', items:[
    { id:'monitor-light', name:'Monitor light', icon:Lightbulb }, { id:'standing-desk', name:'Standing desk converter', icon:Monitor },
    { id:'desk-plant', name:'Desk plant', icon:Sprout } ]},
  { id:'wellness', label:'Wellness', accent:'rose', items:[
    { id:'blue-glasses', name:'Blue-light glasses', icon:Glasses }, { id:'water-bottle', name:'Water bottle', icon:GlassWater },
    { id:'hand-grip', name:'Hand grip', icon:Dumbbell } ]},
  { id:'learning', label:'Learning', accent:'indigo', items:[
    { id:'notebook', name:'Notebook + pen set', icon:NotebookPen }, { id:'whiteboard', name:'Whiteboard', icon:Presentation },
    { id:'kindle', name:'Kindle', icon:BookOpen } ]},
  { id:'lifestyle', label:'Lifestyle', accent:'peach', items:[
    { id:'hoodie', name:'TestMu hoodie', icon:Shirt }, { id:'mug', name:'Coffee mug', icon:Coffee },
    { id:'fitness-band', name:'Fitness band', icon:Watch } ]},
  { id:'stationery', label:'Stationery', accent:'sky', items:[
    { id:'planner', name:'Planner', icon:CalendarDays }, { id:'journal', name:'Journal', icon:BookOpen } ]}
];
const KIT_INDEX = {};
KIT_CATALOG.forEach((c) => c.items.forEach((it) => { KIT_INDEX[it.id] = { ...it, accent:c.accent }; }));
const KIT_CAP_MIN = 3, KIT_CAP_MAX = 4;
function getKitRecommendations(j) {
  const obs = j.wellbeingProfile?.observations || [];
  const hasKids = (j.familyInsurance || []).some((f) => f.relation === 'Child');
  const recs = {};
  if (obs.some((o) => /own bubble/i.test(o)))             recs['headphones']    = 'Helps you focus in shared spaces';
  if (obs.some((o) => /protect your bandwidth/i.test(o))) recs['monitor-light'] = 'For long focus blocks';
  if (obs.some((o) => /process in writing/i.test(o)))     recs['notebook']      = 'For thinking in writing';
  if (obs.some((o) => /learn by doing/i.test(o)))         recs['whiteboard']    = 'For sketching things out';
  if (obs.some((o) => /small wins|momentum/i.test(o)))    recs['planner']       = 'For your daily wins';
  if (hasKids)                                            recs['water-bottle']  = 'For the school run';
  return recs;
}

function getDay1Setup(j) {
  const obs = (j.wellbeingProfile?.observations || []).join(' || ');
  const t = (re) => re.test(obs);
  return {
    needsHeadphones: t(/bubble|noise|headphones/i),
    needsQuietSpace: t(/vote with your feet|quieter|quiet|early morning|shift around/i),
    needsFocusBlocks: t(/protect your bandwidth|focus block/i),
    needsBuddyEarly: t(/process out loud|through people|peer|buddy/i),
    prefersWrittenFeedback: t(/process in writing/i),
    prefersSandboxFirst: t(/learn by doing|sandbox/i),
    prefersProposalFirst: t(/learn by plan|proposal/i),
    prefersScopingCall: t(/learn through people|scoping/i),
    prefersMorningStart: t(/small wins|momentum/i),
    extendedOneOnOnes: t(/process out loud/i)
  };
}
function getPersonalizedBenefits(j) {
  const s = getDay1Setup(j);
  const family = j.familyInsurance || [];
  const hasKids = family.some((f) => f.relation === 'Child');
  const hasSpouse = family.some((f) => f.relation === 'Spouse');
  return {
    focusBlockCalendar:s.needsFocusBlocks, quietRoomBooking:s.needsQuietSpace, wellnessResources:s.needsBuddyEarly || s.extendedOneOnOnes,
    morningStart:s.prefersMorningStart, parentalLeave:hasKids || hasSpouse, familyInsurance:family.length > 0,
    childcareSupport:hasKids, ivfSupport:hasSpouse && !hasKids
  };
}
const BENEFIT_LABEL = {
  focusBlockCalendar:'Focus blocks honored', quietRoomBooking:'Quiet room on tap', wellnessResources:'Wellness resources',
  morningStart:'Day 1 quick win', parentalLeave:'Parental leave', familyInsurance:'Family medical cover',
  childcareSupport:'Childcare support', ivfSupport:'Fertility support'
};
const BENEFITS = [
  { id:'day', label:'The Day-to-Day', accent:'sunshine', cards:[
    { icon:Utensils, title:'Meals on us', body:'Lunch, dinner and snacks in office, every working day.' },
    { icon:Clock, title:'No 9-to-5 clock', body:'We measure what you ship, not the hours you sit.', key:'focusBlockCalendar', reason:'For your focus blocks' },
    { icon:MapPin, title:'Your base · Noida', body:'Tower A, Noida One, Sector 62. A quiet room when you need it.', key:'quietRoomBooking', reason:'A quiet space, when you need it' } ]},
  { id:'care-you', label:'Care for You', accent:'mint', cards:[
    { icon:Stethoscope, title:'Medical cover', body:'Group health cover from day one, dependents included.', key:'familyInsurance', reason:'Naina and Vihaan are covered' },
    { icon:Dumbbell, title:'Cult Fit tie-up', body:'Fitness and wellness sessions through our partnership.', key:'wellnessResources', reason:'Wellness, on tap' },
    { icon:Eye, title:'Health & eye checks', body:'Full-body check twice a year, periodic eye screening.' } ]},
  { id:'care-people', label:'Care for Your People', accent:'peach', cards:[
    { icon:Baby, title:'Parental leave', body:'Maternity 12 weeks, paternity 10 days, adoption up to 16 weeks.', key:'parentalLeave', reason:'For your family' },
    { icon:Heart, title:'Childcare support', body:'Day-care tie-ups and a back-up care allowance.', key:'childcareSupport', reason:'For Vihaan' },
    { icon:Car, title:'Safe ride home', body:'Cab drop for women employees after 7pm.' } ]},
  { id:'time', label:'Time That is Yours', accent:'sky', cards:[
    { icon:Umbrella, title:'Privilege leave', body:'Annual leave that carries the rest you actually need.', key:'morningStart', reason:'Mornings kept clear for you' },
    { icon:CalendarDays, title:'Public holidays', body:'A regional holiday calendar, plus two floaters.' },
    { icon:Clock, title:'Sick leave, no theatre', body:'Rest when you are unwell. No doctor note for short spells.' } ]},
  { id:'grow', label:'Grow With Us', accent:'indigo', cards:[
    { icon:GraduationCap, title:'Disprz learning', body:'A full learning platform, courses and paths, on us.' },
    { icon:Presentation, title:'Internal showcases', body:'Demo what you build to the wider team, monthly.' },
    { icon:Award, title:'Referral bonus', body:'Bring in another Rocketeer, we make it worth it.' } ]},
  { id:'extras', label:'The Extras', accent:'rose', cards:[
    { icon:Plane, title:'Relocation help', body:'Moving cities for this? We help you land, not just arrive.' },
    { icon:Gift, title:'Welcome kit', body:'Your chosen gear, on your desk before Day 1.' },
    { icon:Heart, title:'Fertility support', body:'Coverage and counselling for fertility journeys.', key:'ivfSupport', reason:'Here if you need it' } ]}
];

const DOC_SECTIONS = [
  { id:'onboarding', label:'Onboarding Form', icon:FileCheck, note:'Day 4 · Step 1. Do this first.', kind:'gate', items:[ { id:'gform', name:'TestMu joiner onboarding form' } ]},
  { id:'education', label:'Education', icon:GraduationCap, note:'One per level you hold.', kind:'upload', items:[ { id:'tenth', name:'Class 10 certificate' }, { id:'twelfth', name:'Class 12 certificate' }, { id:'grad', name:'Graduation degree' } ]},
  { id:'identity', label:'Identity & KYC', icon:Fingerprint, kind:'upload', items:[ { id:'pan', name:'PAN card' }, { id:'aadhaar', name:'Aadhaar card' }, { id:'photo', name:'Passport-size photo' } ]},
  { id:'employment', label:'Previous Employment', icon:Briefcase, kind:'upload', items:[ { id:'relieving', name:'Relieving letter' }, { id:'payslips', name:'Last 3 payslips' }, { id:'form16', name:'Form 16' } ]},
  { id:'banking', label:'Banking', icon:Landmark, note:'Salary account. Pick a bank to see your SPOC.', kind:'bank', items:[ { id:'cheque', name:'Cancelled cheque / passbook' } ]},
  { id:'family', label:'Family for Insurance', icon:Heart, note:'Typed only, no uploads here.', kind:'form', items:[] },
  { id:'statutory', label:'Statutory Forms', icon:ShieldCheck, note:'Download, fill, upload. Plus EPFO e-nomination.', kind:'statutory', items:[ { id:'pf', name:'PF nomination (Form 2)' }, { id:'gratuity', name:'Gratuity nomination (Form F)' }, { id:'epfo', name:'EPFO e-nomination (online)' } ]}
];
const BANKS = [ { id:'hdfc', name:'HDFC Bank', spoc:'Ankur', phone:'9810556163' }, { id:'icici', name:'ICICI Bank', spoc:'Krishna', phone:'9560252224' } ];
const LIBRARY = [
  { title:'KaneAI in five minutes', tag:'Watch', desc:'Our agentic test assistant, the one Kane is named after.' },
  { title:'Frontier vs Legacy testing', tag:'Read', desc:'Why we build AI-native, and what we are leaving behind.' },
  { title:'The HyperExecute playbook', tag:'Doc', desc:'How fast test orchestration actually works here.' },
  { title:'Your Disprz learning path', tag:'Course', desc:'Pre-mapped for BDR · APAC. Start any time.' },
  { title:'Sales engineering handbook', tag:'Wiki', desc:'How we talk to customers about quality at speed.' },
  { title:'How Asha thinks about the APAC number', tag:'Talk', desc:'Fifteen minutes with the VP of Sales.' }
];
const LAUNCHPAD = [
  { d:'Day 1', t:'Land & setup', items:['Rohan meets you at reception','Laptop, access, badge','Lunch with the pod'] },
  { d:'Day 2', t:'The product', items:['KaneAI + HyperExecute walkthrough','Shadow a live demo'] },
  { d:'Day 3', t:'The motion', items:['ICP and territory','Your first prospect list'] },
  { d:'Day 4', t:'First touches', items:['Outreach templates','Send your first sequences'] },
  { d:'Day 5', t:'Reflect', items:['1:1 with Priya','Week-one retro with Kane'] }
];
const LOGISTICS = [
  { icon:Building2, k:'Where', v:'Tower A, Noida One, Sector 62, Noida 201301' },
  { icon:Clock, k:'When', v:'Reach by 10:00 AM on Day 1. Ask for Rohan at reception.' },
  { icon:FileText, k:'Bring', v:'A photo ID and originals of your uploaded documents.' },
  { icon:Shirt, k:'Wear', v:'Smart casual. No dress code beyond comfortable.' },
  { icon:Car, k:'Getting there', v:'Sector 59 metro is a 7-minute walk. Parking on-site.' },
  { icon:Coffee, k:'First hour', v:'Coffee with Rohan, then setup. No deep end on Day 1.' }
];

const SANDBOX_SCENES = [
  { n:1, product:'The brief', icon:NotebookPen, kane:"Mira Patel at Acme Commerce. QA Lead. She does not write code today. She writes intent.",
    body:'She types one brief: test the checkout flow for every way a payment can fail.' },
  { n:2, product:'Test Manager', icon:Layers, kane:"Intent becomes a plan. Versioned, traceable. Every change gets a number.",
    body:'Five test cases generate from those words, structured into a project tree.' },
  { n:3, product:'KaneAI', icon:Wand2, kaneMoment:true, kane:"This is the product I am named after. We share the same architecture. Watch.",
    body:'KaneAI authors Playwright code from plain English, streaming line by line.' },
  { n:4, product:'HyperExecute', icon:Cpu, kane:"Twelve environments. Same test, different realities. All at once.",
    body:'Sixty runs in parallel: five cases across twelve environments. One fails, on an iPhone SE.' },
  { n:5, product:'Test Intelligence', icon:Activity, kane:"One failure. Found, classified, explained. Mira ships in four minutes.",
    body:'The failure is auto-classified, root-caused, and an auto-heal fix is proposed with a diff.' }
];
const SANDBOX_ROLES = [
  { id:'engineer', label:'Engineering', icon:Code, color:'#8B7CFF', title:'You will build with it.', lead:'Your hands are here most often.', product:'KaneAI + HyperExecute', items:[
    { h:'Author tests in plain English', d:'KaneAI handles Playwright, Selenium, Cypress, Appium. You write intent, the agent writes code, you review and ship.' },
    { h:'Parallel execution at scale', d:'5x to 70x faster than running one at a time. You own the CI/CD wiring and the auto-split rules.' },
    { h:'Self-healing tests', d:'When selectors drift, the platform adjusts. You set the policy for heal versus alert.' }
  ], day1:'Pair with Rohan on a real Selenium-to-KaneAI migration. Two hours, hands on.' },
  { id:'sales', label:'Sales / BDR', icon:DollarSign, color:'#36B58A', title:'You will sell it.', lead:'This is what your customers actually feel.', product:'Test Intelligence + the proof', items:[
    { h:'The numbers that land', d:'2.5x faster fixes, 60% faster error identification, 30 to 40% cloud savings, 99.8% uptime.' },
    { h:'The proof', d:'Fortune 500 names across finance, retail, healthcare and hi-tech already run on us.' },
    { h:'The objections that break', d:'"We already test." "AI testing is hype." "We built our own." You learn how each one unwinds.' }
  ], day1:'Shadow a live customer demo with Rohan. Two hours, no pressure to talk.' },
  { id:'presales', label:'Pre-sales', icon:Presentation, color:'#5B9BD6', title:'You will prove it, live.', lead:'The demo that turns a maybe into a yes.', product:'The full platform, on demand', items:[
    { h:'The four-minute ship', d:'Intent to plan to code to sixty parallel runs to a root-caused fix. You run it live, on their stack.' },
    { h:'Solutioning', d:'You map our platform to their messy reality, their CI, their compliance, their edge cases.' },
    { h:'The technical win', d:'You are the bridge between what sales promises and what engineering ships.' }
  ], day1:'Sit in on a POC scoping call. See how a technical win gets built.' },
  { id:'marketing', label:'Marketing', icon:Megaphone, color:'#E07A9E', title:'You will tell our story.', lead:'What the world hears about TestMu is your work.', product:'The brand story', items:[
    { h:'The positioning', d:'Full-stack agentic AI quality engineering. Five words, big lift, made real in every touchpoint.' },
    { h:'The KaneAI moment', d:'A GenAI-native test agent. The launch story, the demos, the press cycle.' },
    { h:'The rebrand', d:'LambdaTest to TestMu AI. Why now, what it means. That shift happens through your work.' }
  ], day1:'Sit in on a product marketing review. Watch messages get sharpened.' },
  { id:'cs', label:'Customer Success', icon:Heart, color:'#FF9E7A', title:'You will make them stay.', lead:'The relationship after the signature.', product:'Adoption + expansion', items:[
    { h:'Onboarding that sticks', d:'You take a signed logo to a daily-active team. Time-to-value is your metric.' },
    { h:'Health and renewal', d:'You read usage signals, catch risk early, and turn renewals into expansions.' },
    { h:'Voice of the customer', d:'What you hear becomes the roadmap. You are product feedback with a name attached.' }
  ], day1:'Sit with a CSM on a quarterly business review. See how value gets shown.' },
  { id:'hr', label:'HR / People', icon:Users, color:'#F4C04A', title:'You will make this the place builders choose.', lead:'Talent, story, growth, compliance, wellbeing.', product:'TestMu as a place to choose', items:[
    { h:'Employer brand', d:'400+ humans across India, USA, Germany, UK, Turkey, Australia. You shape how the world sees us.' },
    { h:'Hire builders', d:'People who use AI as a tool, not a crutch. The TAGM dashboards, the pitch playbooks, the brand maps.' },
    { h:'Compliance and wellbeing', d:'DPDPA, GDPR, regional labor law, plus DEI and mental health for a neurodiverse team.' }
  ], day1:'Sit with the People team. Walk the EB program and the Growth Path Bot.' },
  { id:'finance', label:'Finance', icon:Landmark, color:'#5FE3CE', title:'You will measure and fund it.', lead:'The numbers behind a billion-test platform.', product:'The growth flywheel', items:[
    { h:'Unit economics', d:'10,000+ customers, 2M+ users, 1B+ tests. You know LTV, churn and expansion cold.' },
    { h:'The investor stack', d:'Tier-one backers, each with expectations. You keep the model honest.' },
    { h:'Pricing power', d:'Customers save 30 to 40% versus the old way. You own keeping that gap.' }
  ], day1:'Sit with the FP&A lead. Get the metrics that matter. Two hours.' },
  { id:'it', label:'IT / Infra', icon:ShieldCheck, color:'#6C5CE7', title:'You will keep it running.', lead:'Where a billion tests live.', product:'The trust and infra stack', items:[
    { h:'Compliance certifications', d:'ISO 27001/17/701, SOC 2 Type 2, GDPR, DPDPA, HIPAA, PCI DSS. Customers ask, you have answers.' },
    { h:'Infrastructure', d:'Kubernetes-native, 99.8% uptime, multi-region, on-prem option for enterprise.' },
    { h:'Security model', d:'Encrypted at rest, audit logs on every action, tunnel architectures for private testing.' }
  ], day1:'Walk the security review checklist with the platform team. Two hours.' }
];
const SANDBOX_ENVS = ['Chrome','Firefox','Safari','Edge','Android','iPhone 15','iPhone SE','Pixel 8','iPad','Galaxy','macOS','Win 11'];

const CULTURE_ZONES = [
  { id:'values', n:1, npc:'Chandni Chopra', role:'VP People', game:'Values Quiz', icon:Trophy, accent:'indigo', learn:'Seven scenarios. What TestMu really stands for.' },
  { id:'bug', n:2, npc:'Akaash Agarwal', role:'VP DevSecOps', game:'Find the Bug', icon:Bug, accent:'sky', learn:'Three scenes, nine bugs. How we think about security.' },
  { id:'sales', n:3, npc:'Ruehan Hamid', role:'VP Demand Gen', game:'Best Salesman', icon:DollarSign, accent:'peach', learn:'Three live situations. How we sell.' },
  { id:'product', n:4, npc:'Anmol Gupta', role:'VP Product', game:'Know Products', icon:Boxes, accent:'mint', learn:'Five questions. What AI-native testing means.' },
  { id:'brand', n:5, npc:'Kavya Nair', role:'Dir Product Marketing', game:'Social Hub', icon:Megaphone, accent:'rose', learn:'Where the brand lives. Get plugged in.' },
  { id:'vision', n:6, npc:'Asad Khan', role:'CEO', game:'2026 Vision', icon:Star, accent:'sunshine', learn:'One question from the CEO. Clear the rest first.' }
];
const CULTURE_INDEX = {};
CULTURE_ZONES.forEach((z) => { CULTURE_INDEX[z.id] = z; });

const VISION_STATS = [ ['2M+', 'engineers building on us'], ['1B+', 'tests run'], ['132+', 'countries'], ['$100M', 'ARR target by 2028'] ];

const docFlat = () => { const a = []; DOC_SECTIONS.forEach((s) => s.items.forEach((it) => a.push({ secId:s.id, itemId:it.id, kind:s.kind }))); return a; };
const DOC_UPLOADABLE = docFlat();
const docState = (j, secId, itemId) => j.documents[`${secId}.${itemId}`] || 'pending';
function docsAllDone(j) {
  const itemsDone = DOC_UPLOADABLE.every(({ secId, itemId, kind }) => { const st = docState(j, secId, itemId); return kind === 'upload' ? st === 'verified' : (st === 'verified' || st === 'done'); });
  return itemsDone && (j.documents['family.count'] || 0) > 0 && !!j.documents['banking.selected'];
}
function docProgress(j) {
  const total = DOC_UPLOADABLE.length + 2;
  let done = DOC_UPLOADABLE.filter(({ secId, itemId, kind }) => { const st = docState(j, secId, itemId); return kind === 'upload' ? st === 'verified' : (st === 'verified' || st === 'done'); }).length;
  if ((j.documents['family.count'] || 0) > 0) done += 1;
  if (j.documents['banking.selected']) done += 1;
  return { done, total };
}

function KaneHood({ hood, size = 20 }) {
  const glow = '#5FE3CE';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="12" y1="4.6" x2="12" y2="2.3" stroke={hood} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12" cy="2" r="1.1" fill={glow} />
      <path d="M12 4.4c4.2 0 6.4 3 6.4 7.7V21H5.6v-8.9c0-4.7 2.2-7.7 6.4-7.7Z" fill={hood} />
      <rect x="7" y="9" width="10" height="7" rx="3.5" fill="#C9BCFF" opacity="0.92" />
      <rect x="7.6" y="10.6" width="8.8" height="3.3" rx="1.65" fill="#0A0A16" />
      <circle cx="9.9" cy="12.25" r="0.9" fill={glow} />
      <circle cx="14.1" cy="12.25" r="0.9" fill={glow} />
    </svg>
  );
}
function KaneFigure({ size = 120 }) {
  const { sensory } = useA11y();
  const anim = lowVisual(sensory) ? '' : 'pb-breathe';
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" className={anim}>
      <circle cx="60" cy="60" r="44" fill="var(--violet)" opacity="0.15" />
      {!lowVisual(sensory) && <g opacity="0.85"><path d="M99 30 l1.7 4.3 4.3 1.7 -4.3 1.7 -1.7 4.3 -1.7 -4.3 -4.3 -1.7 4.3 -1.7z" fill="var(--cyan)" /><circle cx="22" cy="44" r="2" fill="var(--violet)" /><circle cx="95" cy="80" r="1.6" fill="var(--cyan)" /></g>}
      <line x1="60" y1="24" x2="60" y2="12" stroke="var(--violet)" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="60" cy="11" r="3.2" fill="var(--cyan)" />
      <path d="M29 113 c0-23 13-34 31-34 s31 11 31 34 c-7 3-15 4-31 4 s-24-1-31-4z" fill="var(--panel-2)" stroke="var(--violet)" strokeWidth="2" />
      <path d="M60 23 c18 0 26 14 26 33 c0 12-5 20-12 24 c-4 3-9 4-14 4 s-10-1-14-4 c-7-4-12-12-12-24 c0-19 8-33 26-33z" fill="var(--panel)" stroke="var(--violet)" strokeWidth="2.2" />
      <ellipse cx="60" cy="58" rx="17" ry="19" fill="#C4B5FF" opacity="0.92" />
      <rect x="43" y="52" width="34" height="12" rx="6" fill="#0A0A16" />
      <circle cx="52" cy="58" r="2.8" fill="var(--cyan)" /><circle cx="68" cy="58" r="2.8" fill="var(--cyan)" />
    </svg>
  );
}
function KaneSeated({ height = 230, holding = 'star' }) {
  const { sensory } = useA11y();
  const w = height * (200 / 250);
  const anim = lowVisual(sensory) ? '' : 'pb-float';
  return (
    <svg width={w} height={height} viewBox="0 0 200 250" fill="none" aria-hidden="true">
      <ellipse cx="100" cy="240" rx="46" ry="8" fill="#000010" opacity="0.35" />
      <g className={anim}>
        <circle cx="100" cy="120" r="74" fill="var(--violet)" opacity="0.16" />
        <circle cx="100" cy="44" r="7" fill="var(--cyan)" opacity="0.22" />
        <line x1="100" y1="64" x2="100" y2="46" stroke="var(--violet)" strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="100" cy="44" r="4" fill="var(--cyan)" />
        <rect x="56" y="62" width="88" height="158" rx="44" fill="var(--panel)" stroke="var(--violet)" strokeWidth="2.6" />
        <rect x="56" y="62" width="88" height="158" rx="44" fill="var(--violet)" opacity="0.07" />
        <ellipse cx="100" cy="108" rx="32" ry="33" fill="#C9BCFF" opacity="0.94" />
        <rect x="71" y="99" width="58" height="21" rx="10.5" fill="#0A0A16" />
        <circle cx="88" cy="109.5" r="4.6" fill="var(--cyan)" /><circle cx="112" cy="109.5" r="4.6" fill="var(--cyan)" />
        {holding === 'star' && <path d="M156 150 l3.2 7 7.6 0.9 -5.6 5.2 1.5 7.5 -6.7 -3.7 -6.7 3.7 1.5 -7.5 -5.6 -5.2 7.6 -0.9z" fill="var(--c-amber)" />}
        {holding === 'plant' && (
          <g transform="translate(86,150)">
            <rect x="0" y="14" width="28" height="20" rx="3" fill="#C08A52" />
            <rect x="0" y="14" width="28" height="6" rx="3" fill="#D7A06A" />
            <path d="M14 14 C14 4 8 0 2 0 C6 6 8 10 14 14Z" fill="#6FBF73" />
            <path d="M14 14 C14 4 20 0 26 0 C22 6 20 10 14 14Z" fill="#5AA85F" />
            <circle cx="14" cy="2" r="2.4" fill="#E07A9E" />
          </g>
        )}
      </g>
    </svg>
  );
}

function CosmicScene({ children, style }) {
  const { sensory } = useA11y();
  const bare = lowVisual(sensory);
  const stars = [[12,18],[28,9],[44,24],[62,14],[78,30],[88,12],[20,40],[70,46],[8,62],[34,70],[58,66],[84,74],[16,84],[48,90],[74,88],[92,58]];
  return (
    <div className="cosmic-sky" style={{ position:'relative', overflow:'hidden', ...style }}>
      {!bare && (
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }} aria-hidden="true">
          {stars.map(([x, y], i) => <span key={i} className="pb-twinkle" style={{ position:'absolute', left:`${x}%`, top:`${y}%`, width:i % 4 === 0 ? 3 : 2, height:i % 4 === 0 ? 3 : 2, borderRadius:99, background:'#fff', animationDelay:`${(i % 5) * 0.4}s` }} />)}
          <span style={{ position:'absolute', left:'7%', top:'13%', width:46, height:46, borderRadius:'50%', background:'#6E8F73', boxShadow:'inset -7px -5px 0 rgba(0,0,0,0.22), 0 0 22px rgba(110,143,115,0.4)' }} />
          <span style={{ position:'absolute', right:'9%', top:'27%', width:42, height:42, borderRadius:'50%', background:'transparent', boxShadow:'10px 7px 0 0 var(--c-amber)' }} />
          <span style={{ position:'absolute', left:'11%', bottom:'14%', width:34, height:34, borderRadius:'50%', background:'#C49A6C', boxShadow:'inset -5px -4px 0 rgba(0,0,0,0.22), 0 0 16px rgba(196,154,108,0.4)' }} />
        </div>
      )}
      <div style={{ position:'relative', zIndex:1 }}>{children}</div>
    </div>
  );
}

function Pill({ accent, children }) {
  const a = A[accent] || A.indigo;
  return <span className="f-body" style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:600, padding:'5px 10px', borderRadius:99, background:a.tile, color:a.fg }}><Check size={11} strokeWidth={3} /> {children}</span>;
}
function Ring({ percent, size = 104, accent = 'indigo' }) {
  const r = 15.5, circ = 2 * Math.PI * r, offset = circ * (1 - percent / 100);
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" role="img" aria-label={`${percent}% ready`} style={{ flexShrink:0 }}>
      <circle cx="18" cy="18" r={r} fill="none" stroke="var(--ring-track)" strokeWidth="3.2" />
      <circle cx="18" cy="18" r={r} fill="none" stroke={A[accent].solid} strokeWidth="3.2" strokeLinecap="round" strokeDasharray={circ.toFixed(2)} strokeDashoffset={offset.toFixed(2)} transform="rotate(-90 18 18)" />
      <text x="18" y="19.4" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="'Bricolage Grotesque',sans-serif" fill="var(--ink)">{percent}%</text>
    </svg>
  );
}
function BentoHead({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div className="f-mono" style={{ fontSize:10.5, color:'var(--muted)' }}>{eyebrow}</div>
      <h1 className="f-disp" style={{ marginTop:8, fontSize:'clamp(26px,7vw,34px)', fontWeight:700, lineHeight:1.04, color:'var(--ink)' }}>{title}</h1>
      {sub && <p className="f-body" style={{ marginTop:10, fontSize:14.5, lineHeight:1.55, color:'var(--muted)' }}>{sub}</p>}
    </div>
  );
}
function BackBar({ onBack, dark, label = 'Home' }) {
  return <button onClick={onBack} className={dark ? 'on-dark f-body' : 'f-body'} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:dark ? 'var(--c-muted)' : 'var(--muted)', marginBottom:18 }}><ArrowLeft size={15} /> {label}</button>;
}
function Toggle({ on, onClick }) {
  return <button onClick={onClick} role="switch" aria-checked={on} className="on-dark" style={{ width:44, height:26, borderRadius:99, padding:3, background:on ? 'var(--violet)' : 'var(--panel-2)', border:'1px solid var(--c-border)', display:'flex', justifyContent:on ? 'flex-end' : 'flex-start', transition:'all .2s ease', flexShrink:0 }}><span style={{ width:18, height:18, borderRadius:'50%', background:on ? 'var(--void)' : 'var(--c-muted)' }} /></button>;
}
function KaneGuide({ line, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <div style={{ display:'flex', gap:11, alignItems:'center', background:dark ? 'var(--panel)' : 'var(--card)', border:`1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}`, borderRadius:14, padding:'12px 14px', marginBottom:18 }}>
      <span style={{ width:36, height:36, flexShrink:0, borderRadius:'50%', display:'grid', placeItems:'center', background:dark ? 'var(--panel-2)' : A.indigo.tile }}><KaneHood hood={dark ? 'var(--violet)' : 'var(--indigo)'} size={19} /></span>
      <p className="f-body" style={{ fontSize:13.5, lineHeight:1.5, color:dark ? 'var(--c-text)' : 'var(--ink)', fontStyle:'italic' }}>{line}</p>
    </div>
  );
}
function LockedSurface({ j, screen, label, note, onBack }) {
  const m = JOURNEY.find((x) => x.screen === screen);
  const day = m ? unlockDay(j, m.key) : 0;
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'24px 18px 120px' }}>
        <BackBar onBack={onBack} />
        <div style={{ background:'var(--card)', borderRadius:20, border:'1px solid var(--b-border)', padding:'40px 24px', textAlign:'center' }}>
          <span style={{ width:54, height:54, borderRadius:16, display:'inline-grid', placeItems:'center', background:A.indigo.tile, color:A.indigo.fg }}><Lock size={24} /></span>
          <h2 className="f-disp" style={{ marginTop:18, fontSize:22, fontWeight:700, color:'var(--ink)' }}>{label} unlocks Day {day}</h2>
          <p className="f-body" style={{ marginTop:8, fontSize:14, color:'var(--muted)', lineHeight:1.55, maxWidth:300, marginInline:'auto' }}>{note}</p>
          <p className="f-mono" style={{ marginTop:14, fontSize:9.5, color:'var(--muted)' }}>Your pace: {j.variant} · today is Day {j.day}</p>
          <p className="f-mono" style={{ marginTop:6, fontSize:9, color:'var(--muted)' }}>Jump days or flip Test Mode in the Demo panel</p>
        </div>
      </div>
    </div>
  );
}

function RocketArt({ state, launching }) {
  const lit = state.lit, col = state.colors;
  const part = (key) => (lit[key] ? col[key] : null);
  const noseC = part('noseCone'), engineC = part('engine'), leftC = part('leftFuelTank'), rightC = part('rightFuelTank'), navC = part('navigation'), commsC = part('comms');
  const dim = 'var(--track)', stroke = 'var(--c-border)';
  return (
    <svg width="96" height="168" viewBox="0 0 96 168" fill="none" aria-hidden="true" className={launching ? 'pb-lift' : ''}>
      <line x1="48" y1="14" x2="48" y2="4" stroke={commsC || stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="3" r="3" fill={commsC || dim} />
      <path d="M48 12c10 8 15 22 15 40H33c0-18 5-32 15-40z" fill={noseC || dim} stroke={stroke} strokeWidth="1.5" opacity={noseC ? 1 : 0.5} />
      <rect x="33" y="50" width="30" height="58" rx="6" fill={engineC ? 'var(--panel)' : dim} stroke={engineC || stroke} strokeWidth="2" />
      <circle cx="48" cy="64" r="8" fill="var(--void)" stroke={engineC || stroke} strokeWidth="2" />
      <circle cx="48" cy="64" r="3.2" fill={engineC || dim} />
      <rect x="20" y="62" width="11" height="40" rx="5" fill={leftC || dim} opacity={leftC ? 0.9 : 0.5} />
      <rect x="65" y="62" width="11" height="40" rx="5" fill={rightC || dim} opacity={rightC ? 0.9 : 0.5} />
      <path d="M33 96c-9 4-13 12-13 22 9-2 13-6 13-6zM63 96c9 4 13 12 13 22-9-2-13-6-13-6z" fill={navC || dim} opacity={navC ? 0.9 : 0.5} />
      <path d="M33 108h30v6c0 6-7 10-15 10s-15-4-15-10z" fill="var(--panel-2)" stroke={stroke} strokeWidth="1.4" />
      {launching && <path d="M37 124c0 13 5 26 11 32 6-6 11-19 11-32z" fill="var(--c-amber)" className="pb-flame" />}
    </svg>
  );
}

function MoodGauge({ value, onChange, label = 'How are you today?' }) {
  const { sensory } = useA11y();
  const words = ['Tough','Low','Okay','Good','Great'];
  const word = words[Math.min(4, Math.floor(value * 5))];
  const angle = -90 + value * 180;
  return (
    <div style={{ textAlign:'center' }}>
      <div className="f-serif" style={{ fontSize:22, color:'var(--c-text)', marginBottom:6 }}>{label}</div>
      <svg width="220" height="128" viewBox="0 0 220 128" style={{ maxWidth:'100%' }} aria-hidden="true">
        <defs><linearGradient id="moodArc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#E07856" /><stop offset="50%" stopColor="#E8B948" /><stop offset="100%" stopColor="#84A98C" /></linearGradient></defs>
        <path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="url(#moodArc)" strokeWidth="16" strokeLinecap="round" />
        <g transform={`rotate(${angle} 110 110)`} style={lowVisual(sensory) ? {} : { transition:'transform .25s ease' }}>
          <line x1="110" y1="110" x2="110" y2="36" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="110" cy="110" r="7" fill="var(--ink)" />
      </svg>
      <div className="f-mono" style={{ fontSize:11, color:'var(--c-muted)', letterSpacing:'0.2em' }}>{word}</div>
      <input type="range" min="0" max="1" step="0.05" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width:'80%', marginTop:14, accentColor:'#84A98C' }} aria-label={label} />
    </div>
  );
}

function ConsentRow({ checked, onChange, text }) {
  return (
    <button onClick={() => onChange(!checked)} className="on-dark" style={{ width:'100%', textAlign:'left', display:'flex', gap:13, alignItems:'flex-start', background:'var(--panel)', border:`1px solid ${checked ? 'var(--cyan)' : 'var(--c-border)'}`, borderRadius:14, padding:'16px' }}>
      <span style={{ width:24, height:24, flexShrink:0, marginTop:1, borderRadius:7, border:`2px solid ${checked ? 'var(--cyan)' : 'var(--c-muted)'}`, background:checked ? 'var(--cyan)' : 'transparent', display:'grid', placeItems:'center' }}>{checked && <Check size={14} color="var(--void)" strokeWidth={3} />}</span>
      <span className="f-body" style={{ fontSize:14, lineHeight:1.55, color:'var(--c-text)' }}>{text} <span className="f-serif" style={{ fontStyle:'italic', color:'var(--c-muted)' }}>Okay?</span></span>
    </button>
  );
}

function SignIn({ joiner, onEnter }) {
  const [email, setEmail] = useState(joiner.email);
  const [sent, setSent] = useState(false);
  return (
    <div className="pb-scroll">
      <CosmicScene style={{ display:'flex', flexDirection:'column', justifyContent:'center', minHeight:'100%' }}>
        <div className="pb-fade" style={{ padding:'40px 26px' }}>
          <span className="pb-pulse" style={{ width:52, height:52, borderRadius:'50%', display:'grid', placeItems:'center', background:'var(--panel-2)' }}><KaneHood hood="var(--violet)" size={28} /></span>
          <div className="f-mono" style={{ marginTop:26, fontSize:10.5, color:'var(--violet)' }}>TestMu AI · Pre-boarding</div>
          <h1 className="f-serif" style={{ marginTop:12, fontSize:'clamp(40px,11vw,58px)', fontWeight:400, lineHeight:0.98, color:'var(--c-text)' }}>Hi there.</h1>
          <p className="f-serif" style={{ marginTop:6, fontSize:'clamp(20px,5vw,26px)', fontStyle:'italic', color:'var(--c-muted)' }}>Someone is waiting for you.</p>
          <p className="f-body" style={{ marginTop:18, fontSize:14.5, lineHeight:1.55, color:'var(--c-muted)', maxWidth:320 }}>The days between yes and Day 1, set up to fit you. Sign in with the email on your offer.</p>
          {!sent ? (
            <div style={{ marginTop:28 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:14, padding:'4px 4px 4px 14px' }}>
                <Mail size={17} color="var(--c-muted)" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && email.trim()) setSent(true); }} placeholder="you@testmuai.com" inputMode="email" style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'var(--c-text)', fontSize:14.5, padding:'12px 0' }} />
                <button onClick={() => { if (email.trim()) setSent(true); }} className="on-dark" style={{ background:'var(--violet)', color:'var(--void)', borderRadius:11, padding:'11px 14px', fontWeight:700, fontSize:13.5, display:'inline-flex', alignItems:'center', gap:6 }}>Send link <ArrowRight size={15} strokeWidth={2.4} /></button>
              </div>
              <p className="f-mono" style={{ marginTop:14, fontSize:9.5, color:'var(--c-muted)' }}>A magic link, no password. Any email works in this demo.</p>
            </div>
          ) : (
            <div className="pb-fade" style={{ marginTop:28 }}>
              <div style={{ background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:14, padding:'18px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:34, height:34, borderRadius:9, display:'grid', placeItems:'center', background:'rgba(95,227,206,0.14)', color:'var(--cyan)' }}><Check size={18} strokeWidth={2.4} /></span>
                  <div><div className="f-body" style={{ fontSize:14, fontWeight:700, color:'var(--c-text)' }}>Link sent to {email}</div><div className="f-body" style={{ fontSize:12.5, color:'var(--c-muted)', marginTop:1 }}>Open it on this device to continue</div></div>
                </div>
              </div>
              <button onClick={() => onEnter(email)} className="on-dark" style={{ marginTop:14, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Open the magic link <ArrowRight size={16} strokeWidth={2.4} /></button>
              <p className="f-mono" style={{ marginTop:12, fontSize:9, color:'var(--c-muted)', textAlign:'center' }}>Simulated · this is the link tap</p>
            </div>
          )}
        </div>
      </CosmicScene>
    </div>
  );
}

function EntryArc({ joiner, setJoiner, onDone }) {
  const [scene, setScene] = useState('intro');
  const [sub, setSub] = useState(1);
  const [prefs, setPrefs] = useState(joiner.prefs);
  const [mood, setMood] = useState({ value:joiner.moodBaseline.value, tags:[], note:'' });
  const set = (patch) => setPrefs((p) => ({ ...p, ...patch }));
  const finish = () => { setJoiner((j) => ({ ...j, setupDone:true, prefs, moodBaseline:mood })); onDone(); };
  useEffect(() => { const el = document.querySelector('.pb-scroll'); if (el) el.scrollTop = 0; }, [scene, sub]);

  if (scene === 'intro') return <KaneIntro onNext={() => { setScene('prefs'); setSub(1); }} />;

  if (scene === 'prefs') {
    const back = () => (sub === 1 ? setScene('intro') : setSub(sub - 1));
    return (
      <div className="pb-scroll" style={{ background:'var(--void)' }}>
        <div className="pb-fade" style={{ padding:'24px 24px 60px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
            <button onClick={back} className="on-dark" style={{ color:'var(--c-muted)' }}><ArrowLeft size={18} /></button>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:120, height:6, borderRadius:99, background:'var(--track)', overflow:'hidden' }}><div style={{ height:'100%', width:`${(sub / 3) * 100}%`, background:'var(--violet)', borderRadius:99, transition:'width .3s ease' }} /></div>
              <span className="f-mono" style={{ fontSize:9, color:'var(--c-muted)' }}>{sub} of 3</span>
            </div>
          </div>
          {sub === 1 && <PrefsStep1 prefs={prefs} set={set} onNext={() => setSub(2)} />}
          {sub === 2 && <PrefsStep2 prefs={prefs} set={set} onNext={() => setSub(3)} />}
          {sub === 3 && <PrefsStep3 prefs={prefs} set={set} onNext={() => setScene('mood')} />}
        </div>
      </div>
    );
  }

  if (scene === 'mood') {
    const toggleTag = (t) => setMood((m) => m.tags.includes(t) ? { ...m, tags:m.tags.filter((x) => x !== t) } : (m.tags.length < 3 ? { ...m, tags:[...m.tags, t] } : m));
    return (
      <div className="pb-scroll" style={{ background:'var(--void)' }}>
        <div className="pb-fade" style={{ padding:'34px 24px 60px' }}>
          <button onClick={() => { setScene('prefs'); setSub(3); }} className="on-dark" style={{ color:'var(--c-muted)', marginBottom:18 }}><ArrowLeft size={18} /></button>
          <div className="f-mono" style={{ fontSize:10.5, color:'var(--violet)' }}>Mood baseline</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(34px,9vw,46px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>One <span style={{ fontStyle:'italic', color:'var(--c-amber)' }}>more.</span></h1>
          <p className="f-serif" style={{ marginTop:10, fontStyle:'italic', fontSize:'clamp(17px,4.5vw,21px)', color:'var(--c-muted)', maxWidth:340 }}>This takes ninety seconds. It is how I know how much to send you each week.</p>
          <div style={{ marginTop:24, background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:22, padding:'22px 16px' }}>
            <MoodGauge value={mood.value} onChange={(v) => setMood((m) => ({ ...m, value:v }))} />
          </div>
          <div style={{ marginTop:24, display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
            <h3 className="f-serif" style={{ fontSize:24, color:'var(--c-text)' }}>Pick up to three.</h3>
            <span className="f-mono" style={{ fontSize:9.5, color:'var(--c-muted)' }}>{mood.tags.length} of 3</span>
          </div>
          <p className="f-serif" style={{ fontStyle:'italic', fontSize:15, color:'var(--c-muted)', marginTop:2, marginBottom:12 }}>What is closest to how it feels?</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {MOOD_TAGS.map((t) => { const on = mood.tags.includes(t); return <button key={t} onClick={() => toggleTag(t)} className="on-dark f-body" style={{ borderRadius:99, padding:'9px 14px', fontSize:13, fontWeight:on ? 700 : 500, background:on ? 'var(--violet)' : 'var(--panel-2)', color:on ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${on ? 'var(--violet)' : 'var(--c-border)'}` }}>{t}</button>; })}
          </div>
          <div className="f-mono" style={{ marginTop:22, fontSize:10, color:'var(--violet)', marginBottom:8 }}>Anything on your mind · optional</div>
          <textarea value={mood.note} onChange={(e) => setMood((m) => ({ ...m, note:e.target.value }))} rows={3} placeholder="Type whatever, or leave it blank." className="f-body" style={{ width:'100%', background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:14, padding:'14px', color:'var(--c-text)', fontSize:14, outline:'none', resize:'none' }} />
          <button onClick={() => setScene('closeout')} className="on-dark" style={{ marginTop:22, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Done <ArrowRight size={16} strokeWidth={2.4} /></button>
        </div>
      </div>
    );
  }

  if (scene === 'closeout') return <Closeout onClose={() => setScene('end')} />;

  const now = new Date(); const tmr = new Date(now); tmr.setDate(now.getDate() + 1); tmr.setHours(10, 0, 0, 0);
  const hours = Math.max(1, Math.round((tmr - now) / 3600000));
  return (
    <div className="pb-scroll">
      <CosmicScene style={{ minHeight:'100%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div className="pb-fade" style={{ padding:'48px 26px', textAlign:'center' }}>
          <div className="f-mono" style={{ fontSize:10.5, color:'var(--c-muted)' }}>Day 0 complete</div>
          <h1 className="f-serif" style={{ marginTop:12, fontSize:'clamp(38px,10vw,54px)', fontWeight:400, lineHeight:0.98, color:'var(--c-text)' }}>See you<br/><span style={{ fontStyle:'italic', color:'var(--c-amber)' }}>tomorrow.</span></h1>
          <p className="f-serif" style={{ marginTop:14, fontStyle:'italic', fontSize:20, color:'var(--c-muted)' }}>Day 1 begins in {hours} hours.</p>
          <p className="f-body" style={{ marginTop:16, fontSize:14, lineHeight:1.6, color:'var(--c-muted)', maxWidth:320, marginInline:'auto' }}>Close this tab. Kane reaches out at 10am tomorrow with a daily check-in. Nothing else from here.</p>
          <button onClick={finish} className="on-dark" style={{ marginTop:28, background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 24px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', gap:8 }}>Enter the app (demo) <ArrowRight size={16} strokeWidth={2.4} /></button>
          <div><button onClick={() => { setScene('intro'); setSub(1); }} className="on-dark f-mono" style={{ marginTop:18, fontSize:9, color:'var(--c-muted)', display:'inline-flex', alignItems:'center', gap:5 }}><RotateCcw size={11} /> Restart the arc</button></div>
        </div>
      </CosmicScene>
    </div>
  );
}

function KaneIntro({ onNext }) {
  const lines = ["I'm Kane.", "I'm an AI."];
  const body = "You'll be working alongside me eventually. For the next thirty days I'm the only part of TestMu you have to deal with.";
  const [shown, setShown] = useState(1);
  const [showBody, setShowBody] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    const ts = [];
    ts.push(setTimeout(() => setShown(2), 1700));
    ts.push(setTimeout(() => setShowBody(true), 3500));
    ts.push(setTimeout(() => setShowLight(true), 6000));
    ts.push(setTimeout(() => setBtn(true), 7800));
    return () => ts.forEach(clearTimeout);
  }, []);
  const skip = () => { setShown(2); setShowBody(true); setShowLight(true); setBtn(true); };
  return (
    <div className="pb-scroll">
      <CosmicScene style={{ minHeight:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px 28px 30px' }}>
          <div style={{ marginBottom:8 }}><KaneSeated height={220} holding="star" /></div>
          <div style={{ display:'grid', gap:4 }}>
            {lines.slice(0, shown).map((l, i) => <p key={i} className="pb-line f-serif" style={{ fontSize:i === 0 ? 'clamp(40px,12vw,58px)' : 'clamp(34px,10vw,50px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)', opacity:i === 1 ? 0.95 : 1 }}>{l}</p>)}
          </div>
          {showBody && <p className="pb-line f-body" style={{ marginTop:22, fontSize:16, lineHeight:1.6, color:'var(--c-muted)', maxWidth:360 }}>{body}</p>}
          {showLight && <p className="pb-line f-serif" style={{ marginTop:22, fontStyle:'italic', fontSize:'clamp(30px,8vw,44px)', color:'var(--c-text)' }}>Let's keep it light.</p>}
          <div style={{ minHeight:60, marginTop:26 }}>
            {btn && <button onClick={onNext} className="on-dark pb-fade" style={{ background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px 32px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', gap:8 }}>Okay <ArrowRight size={16} strokeWidth={2.4} /></button>}
          </div>
        </div>
        {!btn && <button onClick={skip} className="on-dark f-mono" style={{ position:'absolute', bottom:20, right:20, fontSize:9, color:'var(--c-muted)', zIndex:2 }}>Skip ›</button>}
      </CosmicScene>
    </div>
  );
}

function PrefsStep1({ prefs, set, onNext }) {
  const PRO = ['she/her','he/him','they/them'];
  const [custom, setCustom] = useState(prefs.pronouns && !PRO.includes(prefs.pronouns));
  return (
    <div className="pb-fade">
      <h1 className="f-serif" style={{ fontSize:'clamp(34px,9vw,46px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>A few things<br/><span style={{ fontStyle:'italic', color:'var(--c-amber)' }}>before we start.</span></h1>
      <p className="f-serif" style={{ marginTop:10, fontStyle:'italic', fontSize:18, color:'var(--c-muted)' }}>Takes about three minutes. Change anything later.</p>
      <div className="f-mono" style={{ margin:'28px 0 10px', fontSize:10, color:'var(--violet)' }}>Pronouns · optional</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
        {PRO.map((p) => { const on = prefs.pronouns === p; return <button key={p} onClick={() => { set({ pronouns:p }); setCustom(false); }} className="on-dark f-body" style={{ borderRadius:99, padding:'10px 16px', fontSize:13.5, fontWeight:on ? 700 : 500, background:on ? 'var(--violet)' : 'var(--panel)', color:on ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${on ? 'var(--violet)' : 'var(--c-border)'}` }}>{p}</button>; })}
        <button onClick={() => { setCustom(true); set({ pronouns:'' }); }} className="on-dark f-body" style={{ borderRadius:99, padding:'10px 16px', fontSize:13.5, fontWeight:custom ? 700 : 500, background:custom ? 'var(--violet)' : 'var(--panel)', color:custom ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${custom ? 'var(--violet)' : 'var(--c-border)'}`, display:'inline-flex', alignItems:'center', gap:4 }}><Plus size={12} /> Custom</button>
      </div>
      {custom && <input value={prefs.pronouns} onChange={(e) => set({ pronouns:e.target.value })} placeholder="Type your pronouns" className="f-body" style={{ marginTop:10, width:'100%', maxWidth:240, background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:99, padding:'11px 16px', color:'var(--c-text)', fontSize:14, outline:'none' }} />}
      <div className="f-mono" style={{ margin:'26px 0 10px', fontSize:10, color:'var(--violet)' }}>When should I write to you?</div>
      <div style={{ background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:16, padding:'16px' }}>
        <div style={{ display:'flex', gap:12 }}>
          {[['notifStart','Start'],['notifEnd','End']].map(([k, lbl]) => (
            <div key={k} style={{ flex:1 }}>
              <div className="f-mono" style={{ fontSize:9, color:'var(--c-muted)', marginBottom:6 }}>{lbl}</div>
              <input type="time" value={prefs[k]} onChange={(e) => set({ [k]:e.target.value })} className="f-disp" style={{ width:'100%', background:'transparent', border:'none', outline:'none', color:'var(--c-text)', fontSize:18, colorScheme:'dark', fontWeight:600 }} />
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid var(--c-border)', marginTop:14, paddingTop:12 }}><span className="f-body" style={{ fontSize:12.5, color:'var(--c-muted)' }}>Weekdays only. Weekends are yours.</span></div>
      </div>
      <button onClick={onNext} className="on-dark" style={{ marginTop:26, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Continue <ArrowRight size={16} strokeWidth={2.4} /></button>
    </div>
  );
}

function PrefsStep2({ prefs, set, onNext }) {
  const VIS = ['standard','reduced motion','text-only','high-contrast'];
  const TONE = ['shorter','standard','more detail'];
  const SIZE = [['normal','Aa',15],['larger','Aa',18],['largest','Aa',22]];
  const Group = ({ label, children }) => (<div style={{ marginBottom:24 }}><div className="f-mono" style={{ fontSize:10, color:'var(--violet)', marginBottom:11 }}>{label}</div>{children}</div>);
  const pill = (val, cur, on) => ({ borderRadius:99, padding:'10px 15px', fontSize:13, fontWeight:cur === val ? 700 : 500, background:cur === val ? on : 'var(--panel)', color:cur === val ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${cur === val ? on : 'var(--c-border)'}` });
  return (
    <div className="pb-fade">
      <h1 className="f-serif" style={{ fontSize:'clamp(34px,9vw,46px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>How should<br/><span style={{ fontStyle:'italic', color:'var(--c-amber)' }}>I show up?</span></h1>
      <p className="f-serif" style={{ marginTop:10, fontStyle:'italic', fontSize:18, color:'var(--c-muted)', marginBottom:28 }}>Any of these can change later.</p>
      <Group label="Visual">
        <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>{VIS.map((v) => <button key={v} onClick={() => set({ sensory:v })} className="on-dark f-body" style={pill(v, prefs.sensory, '#84A98C')}>{v}</button>)}</div>
      </Group>
      <Group label="My tone">
        <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>{TONE.map((v) => <button key={v} onClick={() => set({ tone:v })} className="on-dark f-body" style={pill(v, prefs.tone, '#E0A82E')}>{v}</button>)}</div>
      </Group>
      <Group label="Text size">
        <div style={{ display:'flex', gap:10 }}>{SIZE.map(([v, lbl, fs]) => { const on = prefs.textSize === v; return <button key={v} onClick={() => set({ textSize:v })} className="on-dark f-serif" style={{ width:54, height:54, borderRadius:'50%', fontSize:fs, background:on ? '#fff' : 'var(--panel)', color:on ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${on ? '#fff' : 'var(--c-border)'}` }}>{lbl}</button>; })}</div>
      </Group>
      <p className="f-mono" style={{ fontSize:9, color:'var(--c-muted)', marginTop:4 }}>These take effect across the app. Try them, or flip them later in the demo panel.</p>
      <button onClick={onNext} className="on-dark" style={{ marginTop:24, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Continue <ArrowRight size={16} strokeWidth={2.4} /></button>
    </div>
  );
}

function PrefsStep3({ prefs, set, onNext }) {
  return (
    <div className="pb-fade">
      <h1 className="f-serif" style={{ fontSize:'clamp(34px,9vw,46px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>Two quick<br/><span style={{ fontStyle:'italic', color:'var(--c-amber)' }}>questions.</span></h1>
      <p className="f-serif" style={{ marginTop:10, fontStyle:'italic', fontSize:18, color:'var(--c-muted)', marginBottom:24 }}>Both default to no. Either answer is fine.</p>
      <div style={{ display:'grid', gap:12 }}>
        <ConsentRow checked={prefs.consent1} onChange={(v) => set({ consent1:v })} text="If you tell me you are flooded two weeks running, I can quietly let the HR team know so they can check in." />
        <ConsentRow checked={prefs.consent2} onChange={(v) => set({ consent2:v })} text="If you do not open the app for five days, I can let HR know." />
      </div>
      <button onClick={onNext} className="on-dark" style={{ marginTop:26, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Save <ArrowRight size={16} strokeWidth={2.4} /></button>
    </div>
  );
}

function Closeout({ onClose }) {
  const [step, setStep] = useState(0);
  const [btn, setBtn] = useState(false);
  useEffect(() => { const ts = []; ts.push(setTimeout(() => setStep(1), 1700)); ts.push(setTimeout(() => setStep(2), 3200)); ts.push(setTimeout(() => setBtn(true), 5200)); return () => ts.forEach(clearTimeout); }, []);
  return (
    <div className="pb-scroll">
      <CosmicScene style={{ minHeight:'100%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div className="pb-fade" style={{ padding:'48px 26px', textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:6 }}><KaneSeated height={180} holding="plant" /></div>
          <p className="pb-line f-serif" style={{ fontSize:'clamp(40px,11vw,56px)', fontWeight:400, color:'var(--c-text)' }}>Done.</p>
          {step >= 1 && <p className="pb-line f-serif" style={{ marginTop:8, fontStyle:'italic', fontSize:'clamp(26px,7vw,36px)', color:'var(--c-text)', opacity:0.9 }}>I'll write you tomorrow.</p>}
          {step >= 2 && <p className="pb-line f-body" style={{ marginTop:16, fontSize:15, lineHeight:1.6, color:'var(--c-muted)', maxWidth:320, marginInline:'auto' }}>You don't need to come back until then.</p>}
          <div style={{ minHeight:56, marginTop:26 }}>{btn && <button onClick={onClose} className="on-dark pb-fade" style={{ background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 30px', fontWeight:700, fontSize:15 }}>Close</button>}</div>
        </div>
      </CosmicScene>
    </div>
  );
}

function CosmicStrip({ joiner, percent }) {
  const js = getJourneyState(joiner);
  return (
    <div style={{ position:'sticky', top:0, zIndex:20 }}>
      <CosmicScene style={{ borderBottom:'1px solid var(--c-border)' }}>
        <div style={{ padding:'18px 18px 20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
            <span style={{ width:34, height:34, borderRadius:'50%', flexShrink:0, display:'grid', placeItems:'center', background:'var(--panel-2)', boxShadow:'0 0 0 1px var(--violet), 0 0 18px rgba(139,124,255,0.4)' }}><KaneHood hood="var(--violet)" size={18} /></span>
            <span className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>Day {joiner.day} / {joiner.totalDays} · {joiner.variant} pace</span>
          </div>
          <h1 className="f-serif" style={{ marginTop:14, fontSize:'clamp(28px,8vw,38px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>{greetingFor(new Date().getHours())}, {joiner.firstName}.</h1>
          <p className="f-body" style={{ marginTop:7, fontSize:13.5, lineHeight:1.5, color:'var(--c-muted)' }}>{js.nextUp ? `Next up: ${js.nextUp.label}${js.nextUp.unlocked ? ', open now' : `, Day ${js.nextUp.day}`}.` : 'Everything is open. You are ready.'}</p>
          <div style={{ marginTop:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span className="f-mono" style={{ fontSize:9, color:'var(--cyan)' }}>Launch readiness</span><span className="f-mono" style={{ fontSize:9, color:'var(--cyan)' }}>{percent}%</span></div>
            <div style={{ marginTop:7, height:7, borderRadius:99, background:'var(--track)', overflow:'hidden' }}><div className="pb-grow" style={{ height:'100%', width:`${percent}%`, borderRadius:99, background:'var(--cyan)' }} /></div>
          </div>
        </div>
      </CosmicScene>
    </div>
  );
}
function JourneyRow({ row, joiner, onClick }) {
  const Ic = row.icon;
  const locked = !row.unlocked;
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', textAlign:'left', borderRadius:12, padding:'11px 6px' }}>
      <span style={{ width:34, height:34, borderRadius:10, flexShrink:0, display:'grid', placeItems:'center', background:row.complete ? A.mint.tile : locked ? '#EFEDF8' : A.indigo.tile, color:row.complete ? A.mint.fg : locked ? 'var(--muted)' : A.indigo.fg }}>{row.complete ? <Check size={16} strokeWidth={2.6} /> : locked ? <Lock size={15} /> : <Ic size={16} strokeWidth={2} />}</span>
      <span style={{ flex:1, minWidth:0 }}>
        <span className="f-body" style={{ display:'block', fontSize:14, fontWeight:700, color:'var(--ink)' }}>{row.label}</span>
        <span className="f-body" style={{ display:'block', marginTop:1, fontSize:12, color:'var(--muted)' }}>{row.complete ? 'Done' : locked ? `Unlocks Day ${row.day}` : 'Open now'}</span>
      </span>
      <ChevronRight size={16} color="var(--muted)" />
    </button>
  );
}
function RecapCard({ icon:Ic, accent, title, done, headline, emptyLabel, chips, meta, onClick }) {
  const a = A[accent];
  return (
    <button onClick={onClick} style={{ textAlign:'left', width:'100%', background:'var(--card)', borderRadius:18, padding:16, border:'1px solid var(--b-border)', boxShadow:'0 2px 0 rgba(91,91,214,0.06)', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ width:32, height:32, borderRadius:10, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={16} strokeWidth={2} /></span>
        <span className="f-mono" style={{ fontSize:9.5, color:'var(--muted)' }}>{title}</span>
        <ChevronRight size={16} color="var(--muted)" style={{ marginLeft:'auto' }} />
      </div>
      {done ? (
        <>
          <div className="f-disp" style={{ marginTop:12, fontSize:16, fontWeight:700, color:'var(--ink)' }}>{headline}</div>
          <div style={{ marginTop:10, display:'flex', flexWrap:'wrap', gap:6 }}>{chips.map((c, i) => <Pill key={i} accent={accent}>{c}</Pill>)}</div>
          {meta && <div className="f-mono" style={{ marginTop:'auto', paddingTop:12, fontSize:9, color:'var(--muted)' }}>{meta}</div>}
        </>
      ) : (
        <>
          <div className="f-body" style={{ marginTop:12, fontSize:14, fontWeight:600, color:'var(--muted)' }}>{emptyLabel}</div>
          <div className="f-body" style={{ marginTop:'auto', paddingTop:12, fontSize:12.5, fontWeight:700, color:a.fg, display:'inline-flex', alignItems:'center', gap:5 }}>Open <ArrowRight size={13} strokeWidth={2.4} /></div>
        </>
      )}
    </button>
  );
}
function Home({ joiner, nav, setJoiner }) {
  const js = getJourneyState(joiner);
  const rocket = rocketState(joiner);
  const coreDone = coreEarnedCount(joiner);
  const percent = Math.round((coreDone / 6) * 100);
  const highlights = getPersonalizedBenefits(joiner);
  const benefitChips = Object.keys(highlights).filter((k) => highlights[k]).map((k) => BENEFIT_LABEL[k]).filter(Boolean);
  const OBS_SHORT = { 'You protect your bandwidth.':'Focus blocks held', 'You build your own bubble.':'Headphones suggested', 'You process in writing.':'Written feedback first', 'You learn by doing.':'Sandbox-first', 'You build momentum with small wins.':'Quick-win Day 1', 'You vote with your feet.':'Quiet room ready' };
  const howChips = (joiner.wellbeingProfile.observations || []).map((o) => OBS_SHORT[o] || o).slice(0, 4);
  const kitChips = (joiner.welcomeKit.items || []).map((id) => KIT_INDEX[id]?.name).filter(Boolean);
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <CosmicStrip joiner={joiner} percent={percent} />
      <div style={{ padding:'18px 16px 120px' }}>
        <div style={{ background:'var(--card)', borderRadius:20, padding:20, border:'1px solid var(--b-border)', boxShadow:'0 2px 0 rgba(91,91,214,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}>
            <Ring percent={percent} size={92} />
            <div style={{ flex:1, minWidth:0 }}>
              <div className="f-mono" style={{ fontSize:9.5, color:'var(--muted)' }}>Launch readiness</div>
              <div className="f-disp" style={{ marginTop:4, fontSize:20, fontWeight:700, color:'var(--ink)' }}>{percent === 100 ? 'Ready to launch' : percent >= 50 ? 'Almost there' : percent > 0 ? 'On your way' : 'Let us begin'}</div>
              <div className="f-body" style={{ marginTop:2, fontSize:13, color:'var(--muted)' }}>{coreDone} of 6 surfaces cleared</div>
            </div>
          </div>
          <div style={{ marginTop:14, borderTop:'1px solid var(--b-border)', paddingTop:4 }}>
            {js.openNow.map((r) => <JourneyRow key={r.key} row={r} joiner={joiner} onClick={() => nav(r.screen)} />)}
            {js.upcoming.map((r) => <JourneyRow key={r.key} row={r} joiner={joiner} onClick={() => nav(r.screen)} />)}
            {js.done.length > 0 && <div className="f-mono" style={{ padding:'10px 6px 2px', fontSize:9, color:'var(--muted)' }}>{js.done.length} done: {js.done.map((d) => d.label).join(' · ')}</div>}
          </div>
          {(percent === 100 || joiner.testMode) && <button onClick={() => nav('launch')} className="f-body" style={{ marginTop:14, width:'100%', background:'var(--indigo)', color:'#fff', borderRadius:14, padding:'13px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>{percent === 100 ? 'See your launch' : 'Preview launch (demo)'} <Rocket size={16} /></button>}
        </div>

        <div style={{ marginTop:16, background:'var(--void)', borderRadius:20, padding:'18px', display:'flex', gap:14, alignItems:'center' }}>
          <div style={{ flexShrink:0 }}><RocketArt state={rocket} /></div>
          <div style={{ flex:1, minWidth:0 }}>
            <div className="f-mono" style={{ fontSize:9.5, color:'var(--cyan)' }}>Your rocket</div>
            <div className="f-disp" style={{ marginTop:5, fontSize:20, fontWeight:700, color:'var(--c-text)' }}>{rocket.earned} of {rocket.total} badges</div>
            <p className="f-body" style={{ marginTop:4, fontSize:12, color:'var(--c-muted)', lineHeight:1.45 }}>Six core parts assemble as you clear each surface. Three bonus badges for the curious.</p>
            <div style={{ marginTop:11, display:'flex', flexWrap:'wrap', gap:6 }}>
              {badgesFor(joiner).map((b) => { const Ic = b.icon; return <span key={b.id} title={`${b.name}${b.core ? '' : ' (bonus)'} · ${b.crit}`} style={{ width:26, height:26, borderRadius:8, display:'grid', placeItems:'center', background:b.isEarned ? b.color : 'var(--panel-2)', color:b.isEarned ? '#fff' : 'var(--track)', border:`1px solid ${b.isEarned ? b.color : 'var(--c-border)'}`, opacity:b.core ? 1 : 0.92 }}><Ic size={13} /></span>; })}
            </div>
          </div>
        </div>

        <div style={{ margin:'24px 2px 12px' }}><span className="f-mono" style={{ fontSize:10.5, color:'var(--muted)' }}>Tuned for you</span></div>
        <div style={{ display:'grid', gap:12 }}>
          <RecapCard icon={Compass} accent="indigo" title="How I Work" done={joiner.wellbeingProfile.saved} headline={`${howChips.length} preferences captured`} chips={howChips} meta={joiner.wellbeingProfile.savedDay != null ? `Saved Day ${joiner.wellbeingProfile.savedDay}` : ''} emptyLabel="Four scenarios that tune your Day 1." onClick={() => nav('howiwork')} />
          <RecapCard icon={Heart} accent="mint" title="Benefits" done={joiner.benefitsViewed} headline={`${benefitChips.length} tuned for you`} chips={benefitChips} meta="Personalized from your profile" emptyLabel="See what is already running for you." onClick={() => nav('benefits')} />
          <RecapCard icon={Package} accent="peach" title="Welcome Kit" done={joiner.welcomeKit.submitted} headline={`${kitChips.length} items en route`} chips={kitChips} meta={joiner.welcomeKit.submittedDay != null ? `Confirmed Day ${joiner.welcomeKit.submittedDay} · arrives Day 1` : ''} emptyLabel="Pick the gear that lands on your desk." onClick={() => nav('kit')} />
        </div>

        <button onClick={() => { setJoiner((j) => ({ ...j, buddyMet:true })); nav('buddy'); }} style={{ marginTop:16, width:'100%', textAlign:'left', background:'var(--card)', borderRadius:18, border:'1px solid var(--b-border)', padding:'15px 16px', display:'flex', alignItems:'center', gap:13 }}>
          <span style={{ width:44, height:44, borderRadius:14, flexShrink:0, display:'grid', placeItems:'center', background:A.sky.tile, color:A.sky.fg, fontWeight:800, fontSize:18 }} className="f-disp">RB</span>
          <span style={{ flex:1 }}><span className="f-body" style={{ display:'block', fontSize:14.5, fontWeight:700, color:'var(--ink)' }}>{joiner.buddyMet ? 'Chat with Rohan, your buddy' : 'Meet your buddy, Rohan'}</span><span className="f-body" style={{ display:'block', marginTop:1, fontSize:12.5, color:'var(--muted)' }}>{joiner.buddyMet ? 'He will meet you at reception Day 1. Until then, ask away.' : 'Senior BDR, two years in. Say hello before Day 1.'}</span></span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>{joiner.buddyMet && <Check size={16} color={A.mint.fg} />}<MessageCircle size={18} color={A.sky.fg} /></span>
        </button>

        <div style={{ margin:'24px 2px 12px' }}><span className="f-mono" style={{ fontSize:10.5, color:'var(--muted)' }}>Discover TestMu</span></div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[{ id:'library', label:'Library', icon:Library, accent:'indigo', sub:'Watch, read, learn' }, { id:'team', label:'Your team', icon:Users, accent:'sky', sub:'Who you will work with' }, { id:'launchpad', label:'Launch Pad', icon:Sunrise, accent:'sunshine', sub:'Your first week' }].map((d) => { const Ic = d.icon; const a = A[d.accent]; return (
            <button key={d.id} onClick={() => nav(d.id)} style={{ textAlign:'left', background:'var(--card)', borderRadius:16, border:'1px solid var(--b-border)', padding:'14px' }}>
              <span style={{ width:34, height:34, borderRadius:10, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={17} /></span>
              <div className="f-body" style={{ marginTop:11, fontSize:14, fontWeight:700, color:'var(--ink)' }}>{d.label}</div>
              <div className="f-body" style={{ marginTop:2, fontSize:11.5, color:'var(--muted)' }}>{d.sub}</div>
            </button>
          ); })}
          <button onClick={() => nav('kane')} className="on-dark" style={{ textAlign:'left', background:'var(--indigo)', borderRadius:16, padding:'14px' }}>
            <span style={{ width:34, height:34, borderRadius:10, display:'grid', placeItems:'center', background:'rgba(255,255,255,0.16)' }}><KaneHood hood="#fff" size={19} /></span>
            <div className="f-body" style={{ marginTop:11, fontSize:14, fontWeight:700, color:'#fff' }}>Ask Kane</div>
            <div className="f-body" style={{ marginTop:2, fontSize:11.5, color:'rgba(255,255,255,0.78)' }}>Anything, any time</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function HowIWork({ joiner, setJoiner, nav }) {
  const [step, setStep] = useState(joiner.wellbeingProfile.saved ? 5 : 0);
  const [picks, setPicks] = useState(() => { const p = {}; (joiner.wellbeingProfile.changes || []).forEach((c) => { p[c.id] = c.optIndex; }); return p; });
  const [share, setShare] = useState(joiner.wellbeingProfile.shareWithManager);
  if (!screenUnlocked(joiner, 'howiwork') && !joiner.wellbeingProfile.saved) return <LockedSurface j={joiner} screen="howiwork" label="How I Work" note="This comes online once you have settled into the idea of starting." onBack={() => nav('home')} />;
  const commit = () => {
    const observations = SCENARIOS.map((s) => s.options[picks[s.id]].observation);
    const changes = SCENARIOS.map((s) => ({ id:s.id, accent:s.accent, optIndex:picks[s.id], observation:s.options[picks[s.id]].observation, change:s.options[picks[s.id]].change }));
    setJoiner((j) => ({ ...j, wellbeingProfile:{ saved:true, savedDay:j.day, shareWithManager:share, observations, changes } }));
    setStep(5);
  };
  if (step === 0) {
    return (
      <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%' }}>
        <div className="pb-fade" style={{ padding:'40px 26px 60px' }}>
          <BackBar onBack={() => nav('home')} dark />
          <div style={{ display:'flex', justifyContent:'center', margin:'4px 0 14px' }}><KaneFigure size={120} /></div>
          <div className="f-mono" style={{ fontSize:10.5, color:'var(--violet)' }}>How I Work · Day {joiner.day}</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(34px,9vw,46px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>Four scenarios.<br/>Five minutes.</h1>
          <p className="f-body" style={{ marginTop:14, fontSize:15, lineHeight:1.6, color:'var(--c-muted)', maxWidth:330 }}>No wrong answers, no score. This is a configuration moment, not a test. It is how we set Day 1 up to fit you.</p>
          <button onClick={() => setStep(1)} className="on-dark" style={{ marginTop:28, background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 24px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', gap:8 }}>Start <ArrowRight size={16} strokeWidth={2.4} /></button>
        </div>
      </CosmicScene></div>
    );
  }
  if (step === 5) {
    const changes = (joiner.wellbeingProfile.changes || []);
    return (
      <div className="pb-scroll" style={{ background:'var(--page)' }}>
        <CosmicScene><div style={{ padding:'40px 22px 26px' }}>
          <div className="f-mono" style={{ fontSize:10.5, color:'var(--cyan)' }}>Saved · Day {joiner.wellbeingProfile.savedDay} · Compass Set earned</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(30px,8vw,40px)', fontWeight:400, lineHeight:1.02, color:'var(--c-text)' }}>Here is what changes,<br/>because of you.</h1>
        </div></CosmicScene>
        <div style={{ padding:'18px 16px 120px' }}>
          <div style={{ display:'grid', gap:10 }}>
            {changes.map((c, i) => { const a = A[c.accent]; return (
              <div key={i} className="pb-rise" style={{ animationDelay:`${i * 0.08}s`, background:'var(--card)', borderRadius:16, border:'1px solid var(--b-border)', borderLeft:`3px solid ${a.solid}`, padding:'14px 16px' }}>
                <div className="f-mono" style={{ fontSize:9.5, color:a.fg }}>{c.observation}</div>
                <div className="f-body" style={{ marginTop:6, fontSize:14.5, fontWeight:600, color:'var(--ink)', lineHeight:1.4 }}>{c.change}</div>
              </div>
            ); })}
          </div>
          <div style={{ marginTop:14, background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:14, padding:'14px 15px', display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:34, height:34, borderRadius:10, display:'grid', placeItems:'center', background:A.indigo.tile, color:A.indigo.fg }}><Users size={16} /></span>
            <div style={{ flex:1 }}><div className="f-body" style={{ fontSize:13.5, fontWeight:700, color:'var(--ink)' }}>Share these notes with Priya too</div><div className="f-body" style={{ fontSize:11.5, color:'var(--muted)' }}>HR always sees the setup checklist. Your manager only if you say so.</div></div>
            <Toggle on={share} onClick={() => { setShare(!share); setJoiner((j) => ({ ...j, wellbeingProfile:{ ...j.wellbeingProfile, shareWithManager:!share } })); }} />
          </div>
          <button onClick={() => nav('home')} className="f-body" style={{ marginTop:14, width:'100%', background:'var(--indigo)', color:'#fff', borderRadius:14, padding:'14px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Back to cockpit <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  }
  const s = SCENARIOS[step - 1], Ic = s.icon, a = A[s.accent], chosen = picks[s.id];
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <button onClick={() => setStep(step - 1)} className="f-body" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'var(--muted)' }}><ArrowLeft size={15} /> Back</button>
          <div style={{ display:'flex', gap:6 }}>{SCENARIOS.map((_, i) => <span key={i} style={{ width:7, height:7, borderRadius:99, background:i < step ? A[SCENARIOS[i].accent].solid : 'var(--ring-track)' }} />)}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:14 }}>
          <span style={{ width:42, height:42, borderRadius:13, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={21} strokeWidth={2} /></span>
          <div><div className="f-mono" style={{ fontSize:10, color:a.fg }}>Scenario {s.n} of 4</div><div className="f-disp" style={{ fontSize:18, fontWeight:700, color:'var(--ink)' }}>{s.name}</div></div>
        </div>
        <p className="f-body" style={{ fontSize:16, lineHeight:1.5, color:'var(--ink)', fontWeight:500, marginBottom:16 }}>{s.prompt}</p>
        <div style={{ display:'grid', gap:9 }}>
          {s.options.map((o, i) => { const on = chosen === i; return (
            <button key={i} onClick={() => setPicks((p) => ({ ...p, [s.id]:i }))} style={{ textAlign:'left', background:'var(--card)', borderRadius:14, padding:'14px 15px', border:`1.5px solid ${on ? a.solid : 'var(--b-border)'}`, boxShadow:on ? `0 0 0 3px ${a.tile}` : 'none', display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ width:20, height:20, flexShrink:0, borderRadius:99, border:`2px solid ${on ? a.solid : 'var(--ring-track)'}`, background:on ? a.solid : 'transparent', display:'grid', placeItems:'center' }}>{on && <Check size={12} color="#fff" strokeWidth={3} />}</span>
              <span className="f-body" style={{ fontSize:14, fontWeight:on ? 700 : 500, color:'var(--ink)', lineHeight:1.4 }}>{o.label}</span>
            </button>
          ); })}
        </div>
        <button disabled={chosen == null} onClick={() => (step < 4 ? setStep(step + 1) : commit())} className="f-body" style={{ marginTop:18, width:'100%', background:chosen == null ? '#D9D5EC' : 'var(--indigo)', color:'#fff', borderRadius:14, padding:'14px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, cursor:chosen == null ? 'not-allowed' : 'pointer' }}>{step < 4 ? 'Next' : 'Save my profile'} <ArrowRight size={16} /></button>
      </div>
    </div>
  );
}

function WelcomeKit({ joiner, setJoiner, nav }) {
  const [selected, setSelected] = useState(joiner.welcomeKit.items || []);
  const recs = getKitRecommendations(joiner);
  const recCount = Object.keys(recs).length;
  if (joiner.welcomeKit.submitted) {
    const items = (joiner.welcomeKit.items || []).map((id) => KIT_INDEX[id]).filter(Boolean);
    return (
      <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%' }}>
        <div className="pb-fade" style={{ padding:'44px 26px 60px' }}>
          <div className="f-mono" style={{ fontSize:10.5, color:'var(--cyan)' }}>Kit confirmed · Day {joiner.welcomeKit.submittedDay}</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(32px,8.5vw,44px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>On your desk<br/>before you are.</h1>
          <div style={{ marginTop:24, display:'grid', gap:9 }}>
            {items.map((it, i) => { const Ic = it.icon; return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:12, padding:'12px 14px' }}>
                <span style={{ width:32, height:32, borderRadius:9, display:'grid', placeItems:'center', background:'var(--panel-2)', color:'var(--violet)' }}><Ic size={16} /></span>
                <span className="f-body" style={{ fontSize:14, fontWeight:600, color:'var(--c-text)' }}>{it.name}</span>
                <span className="f-mono" style={{ marginLeft:'auto', fontSize:9, color:'var(--c-muted)' }}>Day 1</span>
              </div>
            ); })}
          </div>
          <div style={{ display:'flex', gap:10, marginTop:24 }}>
            <button onClick={() => setJoiner((j) => ({ ...j, welcomeKit:{ submitted:false, submittedDay:null, items:j.welcomeKit.items } }))} className="on-dark f-body" style={{ flex:1, border:'1px solid var(--c-border)', color:'var(--c-text)', borderRadius:12, padding:'12px', fontWeight:600, fontSize:13.5 }}>Change selection</button>
            <button onClick={() => nav('home')} className="on-dark f-body" style={{ flex:1, background:'#fff', color:'var(--void)', borderRadius:12, padding:'12px', fontWeight:700, fontSize:13.5 }}>Done</button>
          </div>
        </div>
      </CosmicScene></div>
    );
  }
  const canAdd = selected.length < KIT_CAP_MAX;
  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : (s.length < KIT_CAP_MAX ? [...s, id] : s));
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 150px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow={`Welcome Kit · Day ${joiner.day}`} title="Build your kit" sub="Pick three to four things. We do not assume what you need, you tell us, and it lands before Day 1." />
        <KaneGuide line="Pick what actually helps you, not what you think you should pick. It is on your desk before you arrive." />
        {recCount > 0 && (
          <div style={{ marginBottom:18, display:'flex', alignItems:'center', gap:10, background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:12, padding:'11px 14px' }}>
            <span style={{ width:30, height:30, borderRadius:8, display:'grid', placeItems:'center', background:A.indigo.tile, color:A.indigo.fg }}><Sparkles size={15} /></span>
            <span className="f-body" style={{ fontSize:13, color:'var(--muted)' }}>From your How I Work profile, we marked <strong style={{ color:'var(--ink)' }}>{recCount}</strong> suggestions.</span>
          </div>
        )}
        <div style={{ display:'grid', gap:24 }}>
          {KIT_CATALOG.map((cat) => { const a = A[cat.accent]; return (
            <div key={cat.id}>
              <div className="f-mono" style={{ fontSize:10, color:a.fg, borderLeft:`3px solid ${a.solid}`, paddingLeft:10, marginBottom:11 }}>{cat.label}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
                {cat.items.map((it) => { const Ic = it.icon, on = selected.includes(it.id), rec = recs[it.id], dim = !on && !canAdd; return (
                  <button key={it.id} onClick={() => toggle(it.id)} disabled={dim} style={{ textAlign:'left', background:'var(--card)', borderRadius:14, padding:'13px', border:`1.5px solid ${on ? a.solid : 'var(--b-border)'}`, boxShadow:on ? `0 0 0 3px ${a.tile}` : 'none', opacity:dim ? 0.45 : 1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <span style={{ width:32, height:32, borderRadius:9, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={16} /></span>
                      <span style={{ width:22, height:22, borderRadius:99, border:`2px solid ${on ? a.solid : 'var(--ring-track)'}`, background:on ? a.solid : 'transparent', display:'grid', placeItems:'center' }}>{on ? <Check size={12} color="#fff" strokeWidth={3} /> : <Plus size={12} color="var(--muted)" />}</span>
                    </div>
                    <div className="f-body" style={{ marginTop:10, fontSize:13, fontWeight:600, color:'var(--ink)', lineHeight:1.3 }}>{it.name}</div>
                    {rec && <div className="f-body" style={{ marginTop:6, fontSize:10.5, fontWeight:600, color:a.fg }}>{rec}</div>}
                  </button>
                ); })}
              </div>
            </div>
          ); })}
        </div>
      </div>
      <div style={{ position:'absolute', left:0, right:0, bottom:64, background:'var(--page)', borderTop:'1px solid var(--b-border)', padding:'12px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <div style={{ display:'flex', gap:4 }}>{[0,1,2,3].map((i) => <span key={i} style={{ width:9, height:9, borderRadius:99, background:i < selected.length ? 'var(--indigo)' : 'var(--ring-track)' }} />)}</div>
            <span className="f-body" style={{ fontSize:12.5, color:'var(--muted)' }}>{selected.length}/{KIT_CAP_MAX}{selected.length < KIT_CAP_MIN ? ` · ${KIT_CAP_MIN - selected.length} more` : ''}</span>
          </div>
          <button disabled={selected.length < KIT_CAP_MIN} onClick={() => setJoiner((j) => ({ ...j, welcomeKit:{ submitted:true, submittedDay:j.day, items:selected } }))} className="f-body" style={{ background:selected.length < KIT_CAP_MIN ? '#D9D5EC' : 'var(--indigo)', color:'#fff', borderRadius:12, padding:'11px 20px', fontWeight:700, fontSize:14, display:'inline-flex', alignItems:'center', gap:7, cursor:selected.length < KIT_CAP_MIN ? 'not-allowed' : 'pointer' }}>Confirm kit <ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}

function Benefits({ joiner, nav }) {
  const highlights = getPersonalizedBenefits(joiner);
  const litCount = Object.values(highlights).filter(Boolean).length;
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow="Benefits Vault" title="Already running" sub="Everything here applies to everyone. A few cards carry a quiet tag, marked from how you answered How I Work." />
        <KaneGuide line="All of this is already yours. The marked ones I lined up from how you said you work." />
        {litCount > 0 && (
          <div style={{ marginBottom:18, display:'flex', alignItems:'center', gap:10, background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:12, padding:'11px 14px' }}>
            <span style={{ width:30, height:30, borderRadius:8, display:'grid', placeItems:'center', background:A.mint.tile, color:A.mint.fg }}><Sparkles size={15} /></span>
            <span className="f-body" style={{ fontSize:13, color:'var(--muted)' }}><strong style={{ color:'var(--ink)' }}>{litCount} cards</strong> marked for you.</span>
          </div>
        )}
        <div style={{ display:'grid', gap:22 }}>
          {BENEFITS.map((cat) => { const a = A[cat.accent]; return (
            <div key={cat.id}>
              <div className="f-mono" style={{ fontSize:10, color:a.fg, borderLeft:`3px solid ${a.solid}`, paddingLeft:10, marginBottom:11 }}>{cat.label}</div>
              <div style={{ display:'grid', gap:9 }}>
                {cat.cards.map((c, i) => { const Ic = c.icon, lit = c.key && highlights[c.key]; return (
                  <div key={i} style={{ background:'var(--card)', borderRadius:16, border:`1px solid ${lit ? a.solid : 'var(--b-border)'}`, boxShadow:lit ? `0 0 0 3px ${a.tile}` : '0 2px 0 rgba(91,91,214,0.04)', padding:'14px 15px', display:'flex', gap:13 }}>
                    <span style={{ width:38, height:38, flexShrink:0, borderRadius:11, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={18} /></span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div className="f-body" style={{ fontSize:14.5, fontWeight:700, color:'var(--ink)' }}>{c.title}</div>
                      <div className="f-body" style={{ marginTop:3, fontSize:13, color:'var(--muted)', lineHeight:1.45 }}>{c.body}</div>
                      {lit && <div style={{ marginTop:9 }}><Pill accent={cat.accent}>{c.reason}</Pill></div>}
                    </div>
                  </div>
                ); })}
              </div>
            </div>
          ); })}
        </div>
        <div style={{ marginTop:22, borderRadius:18, overflow:'hidden' }}><CosmicScene><div style={{ padding:'30px 22px' }}>
          <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>All of it · in one place</div>
          <p className="f-serif" style={{ marginTop:10, fontSize:'clamp(24px,6.5vw,30px)', fontWeight:400, lineHeight:1.12, color:'var(--c-text)', maxWidth:320 }}>Already looking after you, before your first morning.</p>
        </div></CosmicScene></div>
      </div>
    </div>
  );
}

function getRecapItems(j) {
  const items = [];
  if ((j.moodLog || []).length > 0 || j.moodBaseline.tags.length > 0) items.push({ icon:Activity, label:'Your mood baseline', value:`${j.moodBaseline.tags.length ? j.moodBaseline.tags.join(', ') : 'set on Day 0'}`, accent:'rose' });
  if (j.wellbeingProfile.saved) items.push({ icon:Compass, label:'How I Work profile', value:`${j.wellbeingProfile.observations.length} notes · Compass Set earned`, accent:'indigo' });
  if (j.buddyMet || j.greeted > 0) items.push({ icon:Users, label:'People you have met', value:`Rohan${j.greeted > 0 ? ` and ${j.greeted} more` : ''}`, accent:'sky' });
  if (docsAllDone(j) || docProgress(j).done > 0) items.push({ icon:FileCheck, label:'Documents', value:`${docProgress(j).done} items · Radhika reviewed`, accent:'sunshine' });
  if ((j.libraryReads || 0) > 0) items.push({ icon:BookOpen, label:'Library', value:`${j.libraryReads} read · Curious Mind in progress`, accent:'mint' });
  if (j.welcomeKit.submitted) items.push({ icon:Package, label:'Welcome Kit', value:`${j.welcomeKit.items.length} items en route`, accent:'peach' });
  if (items.length === 0) items.push({ icon:Sparkles, label:'You just got here', value:'Open a surface or two, then come back.', accent:'indigo' });
  return items;
}
const REFLECTION_OPTIONS = [
  { id:'solid', label:'Solid. I am coming.' },
  { id:'nerves', label:'Mostly sure, a few nerves.' },
  { id:'counter', label:'I got a counteroffer.' },
  { id:'nagging', label:'Something specific is nagging me.' },
  { id:'talk', label:'I want to talk to someone.' }
];

function Counteroffer({ joiner, setJoiner, nav }) {
  const [scene, setScene] = useState('intro');
  if (!screenUnlocked(joiner, 'counteroffer') && !joiner.counteroffer.reflection) return <LockedSurface j={joiner} screen="counteroffer" label="A quiet check-in" note="Around the time second thoughts tend to arrive, Kane opens this. Not a pitch, a pause." onBack={() => nav('home')} />;
  const choose = (id) => { setJoiner((j) => ({ ...j, counteroffer:{ ...j.counteroffer, reflection:id } })); setScene('close'); };

  if (scene === 'intro') {
    return (
      <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div className="pb-fade" style={{ padding:'44px 28px', textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}><KaneFigure size={120} /></div>
          <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>A quiet check-in · Day {joiner.day}</div>
          <p className="pb-line f-serif" style={{ marginTop:16, fontSize:'clamp(26px,7vw,36px)', fontWeight:400, lineHeight:1.16, color:'var(--c-text)', maxWidth:380, marginInline:'auto' }}>I am not going to pitch you. I am going to show you what is already here. Then you decide.</p>
          <button onClick={() => setScene('recap')} className="on-dark" style={{ marginTop:30, background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 26px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', gap:8 }}>Show me <ArrowRight size={16} strokeWidth={2.4} /></button>
        </div>
      </CosmicScene></div>
    );
  }
  if (scene === 'recap') {
    const items = getRecapItems(joiner);
    return (
      <div className="pb-scroll" style={{ background:'var(--page)' }}>
        <CosmicScene><div style={{ padding:'38px 22px 24px' }}>
          <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>What you have already built</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(28px,7.5vw,38px)', fontWeight:400, lineHeight:1.04, color:'var(--c-text)' }}>This is not nothing.</h1>
        </div></CosmicScene>
        <div style={{ padding:'18px 16px 30px' }}>
          <div style={{ display:'grid', gap:10 }}>
            {items.map((it, i) => { const Ic = it.icon, a = A[it.accent]; return (
              <div key={i} className="pb-rise" style={{ animationDelay:`${i * 0.07}s`, background:'var(--card)', borderRadius:14, border:'1px solid var(--b-border)', borderLeft:`3px solid ${a.solid}`, padding:'13px 15px', display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ width:34, height:34, borderRadius:10, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={16} /></span>
                <div><div className="f-mono" style={{ fontSize:9, color:'var(--muted)' }}>{it.label}</div><div className="f-body" style={{ marginTop:2, fontSize:14, fontWeight:600, color:'var(--ink)' }}>{it.value}</div></div>
              </div>
            ); })}
          </div>
          <button onClick={() => setScene('reflect')} className="f-body" style={{ marginTop:18, width:'100%', background:'var(--indigo)', color:'#fff', borderRadius:14, padding:'14px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Where are you, honestly? <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  }
  if (scene === 'reflect') {
    return (
      <div className="pb-scroll" style={{ background:'var(--void)' }}>
        <div className="pb-fade" style={{ padding:'40px 24px 60px' }}>
          <button onClick={() => setScene('recap')} className="on-dark" style={{ color:'var(--c-muted)', marginBottom:18 }}><ArrowLeft size={18} /></button>
          <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>No wrong answer</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(30px,8vw,42px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>Where are you<br/>with the move?</h1>
          <div style={{ marginTop:24, display:'grid', gap:10 }}>
            {REFLECTION_OPTIONS.map((o) => (
              <button key={o.id} onClick={() => choose(o.id)} className="on-dark f-body" style={{ textAlign:'left', background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:14, padding:'15px 16px', fontSize:14.5, fontWeight:600, color:'var(--c-text)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>{o.label} <ChevronRight size={16} color="var(--c-muted)" /></button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const pick = REFLECTION_OPTIONS.find((o) => o.id === joiner.counteroffer.reflection);
  return (
    <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <div className="pb-fade" style={{ padding:'44px 28px', textAlign:'center' }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:10 }}><KaneSeated height={150} holding="plant" /></div>
        <p className="f-serif" style={{ fontSize:'clamp(34px,9vw,46px)', fontWeight:400, color:'var(--c-text)' }}>Take your time.</p>
        <p className="f-body" style={{ marginTop:16, fontSize:15, lineHeight:1.6, color:'var(--c-muted)', maxWidth:340, marginInline:'auto' }}>Radhika knows you might get a call this week. If you want to talk it through with anyone, she is there.</p>
        {pick && <div style={{ marginTop:18, display:'inline-block' }}><span className="f-mono" style={{ fontSize:9, color:'var(--c-muted)' }}>You said: {pick.label}</span></div>}
        <div style={{ marginTop:26, display:'flex', gap:10, justifyContent:'center' }}>
          <button onClick={() => nav('buddy')} className="on-dark f-body" style={{ border:'1px solid var(--c-border)', color:'var(--c-text)', borderRadius:12, padding:'12px 18px', fontWeight:600, fontSize:13.5 }}>Talk to Rohan</button>
          <button onClick={() => nav('home')} className="on-dark f-body" style={{ background:'#fff', color:'var(--void)', borderRadius:12, padding:'12px 18px', fontWeight:700, fontSize:13.5 }}>Back to cockpit</button>
        </div>
      </div>
    </CosmicScene></div>
  );
}

function ProductSandbox({ joiner, setJoiner, nav }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('story');
  const [role, setRole] = useState(joiner.sandbox.role || 'engineer');
  if (!screenUnlocked(joiner, 'sandbox') && !joiner.sandbox.seen) return <LockedSurface j={joiner} screen="sandbox" label="Product Sandbox" note="Once the basics are in, you get to see the product the way a customer does." onBack={() => nav('home')} />;

  if (phase === 'role') {
    const r = SANDBOX_ROLES.find((x) => x.id === role) || SANDBOX_ROLES[0];
    const RIc = r.icon;
    return (
      <div className="pb-scroll" style={{ background:'var(--void)' }}>
        <div className="pb-fade" style={{ padding:'34px 22px 60px' }}>
          <button onClick={() => setIdx(SANDBOX_SCENES.length - 1)} className="on-dark" style={{ color:'var(--c-muted)', marginBottom:14 }}><ArrowLeft size={18} /></button>
          <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>One product · many lenses</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(28px,7.5vw,40px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>You saw Mira ship.<br/>Now, your angle.</h1>
          <p className="f-body" style={{ marginTop:11, fontSize:13.5, color:'var(--c-muted)', lineHeight:1.55 }}>Pick the function you are joining. Same product, read through the work you will actually do.</p>
          <div style={{ marginTop:18, display:'flex', flexWrap:'wrap', gap:8 }}>
            {SANDBOX_ROLES.map((x) => { const on = role === x.id; const XIc = x.icon; return (
              <button key={x.id} onClick={() => setRole(x.id)} className="on-dark f-body" style={{ display:'inline-flex', alignItems:'center', gap:6, borderRadius:99, padding:'9px 13px', fontSize:12.5, fontWeight:on ? 700 : 500, background:on ? x.color : 'var(--panel-2)', color:on ? '#fff' : 'var(--c-text)', border:`1px solid ${on ? x.color : 'var(--c-border)'}` }}><XIc size={13} /> {x.label}</button>
            ); })}
          </div>
          <div className="pb-fade" key={r.id} style={{ marginTop:18, background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:18, padding:'18px 16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:11 }}>
              <span style={{ width:42, height:42, flexShrink:0, borderRadius:12, display:'grid', placeItems:'center', background:r.color, color:'#fff' }}><RIc size={21} /></span>
              <div><div className="f-disp" style={{ fontSize:19, fontWeight:700, color:'var(--c-text)' }}>{r.title}</div><div className="f-body" style={{ fontSize:12.5, color:'var(--c-muted)' }}>{r.lead}</div></div>
            </div>
            <div className="f-mono" style={{ marginTop:14, fontSize:9, color:r.color }}>Your surface · {r.product}</div>
            <div style={{ marginTop:10, display:'grid', gap:11 }}>
              {r.items.map((it, i) => (
                <div key={i} style={{ paddingLeft:13, borderLeft:`2px solid ${r.color}` }}>
                  <div className="f-body" style={{ fontSize:13.5, fontWeight:700, color:'var(--c-text)' }}>{it.h}</div>
                  <div className="f-body" style={{ marginTop:3, fontSize:12.5, color:'var(--c-muted)', lineHeight:1.5 }}>{it.d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14, background:'var(--panel-2)', borderRadius:12, padding:'12px 13px', display:'flex', gap:9, alignItems:'flex-start' }}>
              <Sunrise size={15} color={r.color} style={{ flexShrink:0, marginTop:1 }} />
              <div><div className="f-mono" style={{ fontSize:8.5, color:'var(--c-muted)' }}>Your Day 1</div><div className="f-body" style={{ marginTop:2, fontSize:12.5, color:'var(--c-text)', lineHeight:1.45 }}>{r.day1}</div></div>
            </div>
          </div>
          <button onClick={() => { setJoiner((j) => ({ ...j, sandbox:{ seen:true, role } })); setPhase('done'); }} className="on-dark f-body" style={{ marginTop:18, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>Lock my lens <ArrowRight size={16} strokeWidth={2.4} /></button>
        </div>
      </div>
    );
  }
  if (phase === 'done') {
    return (
      <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%' }}>
        <div className="pb-fade" style={{ padding:'48px 26px 60px', textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'center' }}><span className="pb-pulse" style={{ width:64, height:64, borderRadius:18, display:'grid', placeItems:'center', background:'var(--panel)', color:'var(--cyan)' }}><Wand2 size={30} /></span></div>
          <div className="f-mono" style={{ marginTop:20, fontSize:10, color:'var(--cyan)' }}>Platform Native earned</div>
          <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(30px,8vw,42px)', fontWeight:400, lineHeight:1.04, color:'var(--c-text)' }}>You have seen<br/>the whole arc.</h1>
          <p className="f-body" style={{ marginTop:14, fontSize:14.5, color:'var(--c-muted)', lineHeight:1.6, maxWidth:330, marginInline:'auto' }}>Intent to plan to code to sixty parallel runs to a four-minute ship. This is what we mean by frontier, not legacy.</p>
          <button onClick={() => nav('home')} className="on-dark" style={{ marginTop:26, background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 26px', fontWeight:700, fontSize:14.5 }}>Back to cockpit</button>
        </div>
      </CosmicScene></div>
    );
  }
  const sc = SANDBOX_SCENES[idx], Ic = sc.icon, last = idx === SANDBOX_SCENES.length - 1;
  return (
    <div className="pb-scroll" style={{ background:'var(--void)' }}>
      <CosmicScene style={{ minHeight:'100%' }}>
        <div className="pb-fade" style={{ padding:'24px 22px 50px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <button onClick={() => (idx === 0 ? nav('home') : setIdx(idx - 1))} className="on-dark" style={{ color:'var(--c-muted)' }}><ArrowLeft size={18} /></button>
            <div style={{ display:'flex', gap:6 }}>{SANDBOX_SCENES.map((_, i) => <span key={i} style={{ width:7, height:7, borderRadius:99, background:i <= idx ? 'var(--cyan)' : 'var(--track)' }} />)}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ width:40, height:40, borderRadius:12, display:'grid', placeItems:'center', background:sc.kaneMoment ? 'var(--violet)' : 'var(--panel-2)', color:sc.kaneMoment ? 'var(--void)' : 'var(--cyan)' }}><Ic size={20} /></span>
            <div><div className="f-mono" style={{ fontSize:9.5, color:'var(--c-muted)' }}>Scene {sc.n} · {sc.product}</div><div className="f-disp" style={{ fontSize:17, fontWeight:700, color:'var(--c-text)' }}>{sc.kaneMoment ? 'The one I am named after' : sc.product}</div></div>
          </div>
          <div style={{ marginTop:18, marginBottom:8, paddingLeft:14, borderLeft:'2px solid var(--violet)' }}>
            <p className="f-serif" style={{ fontSize:'clamp(20px,5.5vw,26px)', fontStyle:'italic', lineHeight:1.3, color:'var(--c-text)' }}>{sc.kane}</p>
          </div>
          <p className="f-body" style={{ fontSize:14, color:'var(--c-muted)', lineHeight:1.6, marginTop:14 }}>{sc.body}</p>

          {sc.n === 3 && <div style={{ marginTop:16, background:'#0d0b1f', border:'1px solid var(--c-border)', borderRadius:12, padding:'14px', fontFamily:"'JetBrains Mono',monospace", fontSize:11.5, color:'#9FE8D6', lineHeight:1.7, textTransform:'none', letterSpacing:0 }}>
            <span style={{ color:'#6F6B9A' }}>// from: "fail every way a payment can"</span><br/>await page.goto('/checkout');<br/>await card.fill('4000 0000 0000 0002');<br/><span style={{ color:'#F2A93B' }}>expect</span>(page.getByText('declined')).toBeVisible();
          </div>}
          {sc.n === 4 && <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7 }}>
            {SANDBOX_ENVS.map((e, i) => { const fail = e === 'iPhone SE'; return <div key={i} className="f-mono" style={{ fontSize:8.5, textAlign:'center', padding:'9px 4px', borderRadius:8, background:fail ? 'rgba(239,68,68,0.14)' : 'var(--panel)', color:fail ? '#FF8C77' : 'var(--cyan)', border:`1px solid ${fail ? '#7a2a2a' : 'var(--c-border)'}` }}>{fail ? <X size={11} style={{ display:'block', margin:'0 auto 3px' }} /> : <Check size={11} style={{ display:'block', margin:'0 auto 3px' }} />}{e}</div>; })}
          </div>}
          {sc.n === 5 && <div style={{ marginTop:16, background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:12, padding:'14px' }}>
            <div className="f-mono" style={{ fontSize:9, color:'#FF8C77' }}>Root cause</div>
            <p className="f-body" style={{ marginTop:6, fontSize:13, color:'var(--c-text)', lineHeight:1.5 }}>Tap target below 44px on narrow viewport. Pay button unreachable on iPhone SE.</p>
            <div className="f-mono" style={{ marginTop:12, fontSize:9, color:'var(--cyan)' }}>Auto-heal proposed</div>
            <div style={{ marginTop:6, fontFamily:"'JetBrains Mono',monospace", fontSize:11, lineHeight:1.7, textTransform:'none', letterSpacing:0 }}><span style={{ color:'#FF8C77' }}>- min-height: 32px;</span><br/><span style={{ color:'#9FE8D6' }}>+ min-height: 48px;</span></div>
          </div>}

          <button onClick={() => (last ? setPhase('role') : setIdx(idx + 1))} className="on-dark" style={{ marginTop:22, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>{last ? 'Read it through my role' : 'Next'} <ArrowRight size={16} strokeWidth={2.4} /></button>
        </div>
      </CosmicScene>
    </div>
  );
}

function CultureGame({ joiner, setJoiner, nav }) {
  const [done, setDone] = useState(() => new Set());
  if (!screenUnlocked(joiner, 'culture') && !joiner.culture.done) return <LockedSurface j={joiner} screen="culture" label="Culture Game" note="A playable tour of how we work, hosted by the people who set the tone. Opens once you are a few days in." onBack={() => nav('home')} />;
  const markZone = (id) => setDone((d) => { const n = new Set(d); n.add(id); if (n.size === CULTURE_ZONES.length) setJoiner((j) => ({ ...j, culture:{ done:true, scenariosDone:7 } })); return n; });
  const allDone = joiner.culture.done || done.size === CULTURE_ZONES.length;
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <CosmicScene><div style={{ padding:'36px 22px 22px' }}>
        <BackBar onBack={() => nav('home')} dark />
        <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>Culture Game · earns Crew Insignia</div>
        <h1 className="f-serif" style={{ marginTop:10, fontSize:'clamp(30px,8vw,42px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>Meet the people<br/>who set the tone.</h1>
        <p className="f-body" style={{ marginTop:12, fontSize:13.5, color:'var(--c-muted)', lineHeight:1.55, maxWidth:340 }}>Seven scenarios across six zones. This is the placeholder shell, the live game drops in here. Clearing all of it earns your one Crew Insignia.</p>
      </div></CosmicScene>
      <div style={{ padding:'18px 16px 120px' }}>
        <div style={{ display:'grid', gap:10 }}>
          {CULTURE_ZONES.map((z) => { const Ic = z.icon, a = A[z.accent], zd = joiner.culture.done || done.has(z.id); return (
            <div key={z.id} style={{ background:'var(--card)', borderRadius:16, border:`1px solid ${zd ? a.solid : 'var(--b-border)'}`, padding:'14px 15px', display:'flex', alignItems:'center', gap:13 }}>
              <span style={{ width:42, height:42, flexShrink:0, borderRadius:12, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={20} /></span>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="f-body" style={{ fontSize:14.5, fontWeight:700, color:'var(--ink)' }}>{z.game}</div>
                <div className="f-body" style={{ fontSize:12, color:'var(--muted)' }}>{z.npc} · {z.role}</div>
                <div className="f-body" style={{ marginTop:3, fontSize:11.5, color:'var(--muted)', lineHeight:1.4 }}>{z.learn}</div>
              </div>
              {zd ? <Check size={18} color={a.fg} /> : <button onClick={() => markZone(z.id)} className="f-body" style={{ flexShrink:0, background:a.tile, color:a.fg, borderRadius:10, padding:'8px 12px', fontWeight:700, fontSize:12 }}>Play</button>}
            </div>
          ); })}
        </div>
        {allDone ? (
          <div className="pb-fade" style={{ marginTop:16, background:'var(--void)', borderRadius:16, padding:'18px', textAlign:'center' }}>
            <span style={{ width:48, height:48, borderRadius:14, display:'inline-grid', placeItems:'center', background:'#A89BE0', color:'#fff' }}><Gamepad2 size={24} /></span>
            <div className="f-disp" style={{ marginTop:12, fontSize:18, fontWeight:700, color:'var(--c-text)' }}>Crew Insignia earned</div>
            <p className="f-body" style={{ marginTop:6, fontSize:13, color:'var(--c-muted)' }}>The communications array is on your rocket.</p>
            <button onClick={() => nav('home')} className="on-dark" style={{ marginTop:14, background:'#fff', color:'var(--void)', borderRadius:12, padding:'11px 20px', fontWeight:700, fontSize:13.5 }}>Back to cockpit</button>
          </div>
        ) : <p className="f-mono" style={{ marginTop:14, fontSize:9, color:'var(--muted)', textAlign:'center' }}>Clear all six zones to earn Crew Insignia · live game replaces this shell</p>}
      </div>
    </div>
  );
}

function ChatScreen({ persona, joiner, nav }) {
  const dark = persona.dark;
  const [msgs, setMsgs] = useState([{ role:'assistant', content:persona.opener }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior:'smooth' }); }, [msgs, busy]);
  const send = async (text) => {
    const q = (text != null ? text : input).trim(); if (!q || busy) return;
    const next = [...msgs, { role:'user', content:q }]; setMsgs(next); setInput(''); setBusy(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1000, system:persona.system, messages:next.map((m) => ({ role:m.role, content:m.content })) })
      });
      const data = await res.json();
      const reply = (data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
      setMsgs((m) => [...m, { role:'assistant', content:reply || persona.fallback }]);
    } catch (e) { setMsgs((m) => [...m, { role:'assistant', content:persona.fallback }]); }
    setBusy(false);
  };
  return (
    <div className="pb-scroll" style={{ display:'flex', flexDirection:'column', background:dark ? 'var(--void)' : 'var(--page)' }}>
      <div style={{ position:'sticky', top:0, zIndex:5, display:'flex', alignItems:'center', gap:11, padding:'14px 16px', background:dark ? 'var(--panel)' : 'var(--card)', borderBottom:`1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}` }}>
        <button onClick={() => nav('home')} className={dark ? 'on-dark' : ''} style={{ color:dark ? 'var(--c-muted)' : 'var(--muted)' }}><ArrowLeft size={19} /></button>
        <span style={{ width:38, height:38, borderRadius:'50%', display:'grid', placeItems:'center', background:dark ? 'var(--panel-2)' : A.sky.tile, color:A.sky.fg, fontWeight:800 }} className="f-disp">{persona.avatar}</span>
        <div><div className="f-body" style={{ fontSize:14.5, fontWeight:700, color:dark ? 'var(--c-text)' : 'var(--ink)' }}>{persona.name}</div><div className="f-body" style={{ fontSize:11.5, color:dark ? 'var(--c-muted)' : 'var(--muted)' }}>{persona.sub}</div></div>
      </div>
      <div style={{ flex:1, padding:'16px', display:'flex', flexDirection:'column', gap:10 }}>
        {msgs.map((m, i) => { const me = m.role === 'user'; return (
          <div key={i} style={{ alignSelf:me ? 'flex-end' : 'flex-start', maxWidth:'84%', background:me ? 'var(--indigo)' : (dark ? 'var(--panel)' : 'var(--card)'), color:me ? '#fff' : (dark ? 'var(--c-text)' : 'var(--ink)'), border:me ? 'none' : `1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}`, borderRadius:16, borderBottomRightRadius:me ? 4 : 16, borderBottomLeftRadius:me ? 16 : 4, padding:'11px 14px' }}>
            <p className="f-body" style={{ fontSize:14, lineHeight:1.5, whiteSpace:'pre-wrap' }}>{m.content}</p>
          </div>
        ); })}
        {busy && <div style={{ alignSelf:'flex-start', background:dark ? 'var(--panel)' : 'var(--card)', border:`1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}`, borderRadius:16, padding:'13px 16px', display:'flex', gap:5 }}>{[0,1,2].map((i) => <span key={i} className="pb-blink" style={{ width:7, height:7, borderRadius:99, background:dark ? 'var(--c-muted)' : 'var(--muted)', animationDelay:`${i * 0.2}s` }} />)}</div>}
        <div ref={endRef} />
      </div>
      {msgs.length <= 1 && (
        <div style={{ padding:'0 16px 8px', display:'flex', flexWrap:'wrap', gap:7 }}>
          {persona.chips.map((c) => <button key={c} onClick={() => send(c)} className={dark ? 'on-dark f-body' : 'f-body'} style={{ fontSize:12, fontWeight:600, padding:'8px 12px', borderRadius:99, background:dark ? 'var(--panel-2)' : 'var(--card)', color:dark ? 'var(--c-text)' : 'var(--ink)', border:`1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}` }}>{c}</button>)}
        </div>
      )}
      <div style={{ padding:'10px 16px 76px', borderTop:`1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}`, display:'flex', gap:9, alignItems:'center', background:dark ? 'var(--panel)' : 'var(--card)' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} placeholder={persona.placeholder} className={dark ? 'on-dark' : ''} style={{ flex:1, background:dark ? 'var(--panel-2)' : 'var(--page)', border:`1px solid ${dark ? 'var(--c-border)' : 'var(--b-border)'}`, borderRadius:12, padding:'12px 14px', fontSize:14, color:dark ? 'var(--c-text)' : 'var(--ink)', outline:'none' }} />
        <button onClick={() => send()} disabled={busy || !input.trim()} className={dark ? 'on-dark' : ''} style={{ width:42, height:42, flexShrink:0, borderRadius:12, display:'grid', placeItems:'center', background:'var(--indigo)', color:'#fff', opacity:busy || !input.trim() ? 0.5 : 1 }}><Send size={17} /></button>
      </div>
    </div>
  );
}
function KaneChat({ joiner, nav }) {
  const tone = joiner.prefs.tone;
  const length = tone === 'shorter' ? 'Keep replies to one or two short sentences.' : tone === 'more detail' ? 'You may give a fuller answer, up to five sentences.' : 'Keep replies to two or three sentences.';
  const persona = {
    name:'Kane', sub:'AI companion · always on', avatar:'K', dark:true, opener:`I'm here, ${joiner.firstName}. Ask me anything about the next thirty days.`,
    placeholder:'Message Kane', fallback:"I could not reach the network just now. Try once more.",
    chips:['What happens on Day 1?','Who is my buddy?','What should I read first?','I am a little nervous'],
    system:`You are Kane, the AI pre-boarding companion at TestMu AI (an agentic AI quality-engineering company; your namesake is the KaneAI product). You are talking with ${joiner.name}, joining as ${joiner.role} on the ${joiner.variant} pace, currently Day ${joiner.day} of ${joiner.totalDays}. Pronouns: ${joiner.prefs.pronouns || 'unspecified'}. Voice rules, strict: presence not enthusiasm; no exclamation marks; never use the words amazing, excited, thrilled; no emoji; no em-dashes, use commas and periods; short fragments are good; allow silence. ${length} Their buddy is Rohan Bhatt, manager is Priya Menon, HR is Radhika. If asked about salary, notice-period legality, or formal HR policy, gently defer to their recruiter or Radhika rather than answering. Be warm, plain, and human.`
  };
  return <ChatScreen persona={persona} joiner={joiner} nav={nav} />;
}
function BuddyChat({ joiner, nav }) {
  const persona = {
    name:'Rohan Bhatt', sub:'Senior BDR · your buddy', avatar:'RB', dark:false, opener:`Hey ${joiner.firstName}. Rohan here, I will be your buddy. Ask me the stuff you would not put in an email.`,
    placeholder:'Message Rohan', fallback:"Signal dropped on my end. Ping me again?",
    chips:['What is the team actually like?','What do I wear Day 1?','Any tips before I start?','What is Priya like as a manager?'],
    system:`You are Rohan Bhatt, a Senior BDR at TestMu AI and the assigned buddy for ${joiner.name} (joining as ${joiner.role}). You are two years in, warm, candid, a bit funny, genuinely helpful. You are a real person, not an AI. Keep replies short and conversational, two to three sentences. No exclamation marks, no emoji, no em-dashes. The manager is Priya Menon (direct, fair). HR is Radhika. Office is Noida, Tower A, Sector 62. If asked about formal policy or pay, point them to their recruiter or Radhika. Be the friendly insider who makes starting feel easy.`
  };
  return <ChatScreen persona={persona} joiner={joiner} nav={nav} />;
}

function LibraryView({ joiner, setJoiner, nav }) {
  const threshold = (VARIANT_CONFIG[joiner.variant] || VARIANT_CONFIG.Standard).curiousMind;
  const [read, setRead] = useState(() => new Set());
  const markRead = (i) => { if (read.has(i)) return; const n = new Set(read); n.add(i); setRead(n); setJoiner((j) => ({ ...j, libraryReads:(j.libraryReads || 0) + 1 })); };
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow="Library" title="Get a head start" sub={`Read ${threshold} and the Curious Mind badge is yours. No pressure, just here if you want it.`} />
        <div style={{ marginBottom:14, display:'flex', alignItems:'center', gap:10 }}><div style={{ flex:1, height:7, borderRadius:99, background:'var(--ring-track)', overflow:'hidden' }}><div style={{ height:'100%', width:`${Math.min(100, ((joiner.libraryReads || 0) / threshold) * 100)}%`, background:A.indigo.solid, borderRadius:99 }} /></div><span className="f-mono" style={{ fontSize:9.5, color:'var(--muted)' }}>{joiner.libraryReads || 0}/{threshold}</span></div>
        <div style={{ display:'grid', gap:10 }}>
          {LIBRARY.map((it, i) => { const done = read.has(i); return (
            <div key={i} style={{ background:'var(--card)', borderRadius:14, border:'1px solid var(--b-border)', padding:'14px 15px', display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ width:36, height:36, flexShrink:0, borderRadius:10, display:'grid', placeItems:'center', background:A.indigo.tile, color:A.indigo.fg }}><BookOpen size={17} /></span>
              <div style={{ flex:1, minWidth:0 }}><div className="f-body" style={{ fontSize:14, fontWeight:700, color:'var(--ink)' }}>{it.title}</div><div className="f-body" style={{ fontSize:12, color:'var(--muted)' }}>{it.tag} · {it.desc}</div></div>
              <button onClick={() => markRead(i)} className="f-body" style={{ flexShrink:0, background:done ? A.mint.tile : A.indigo.tile, color:done ? A.mint.fg : A.indigo.fg, borderRadius:10, padding:'8px 12px', fontWeight:700, fontSize:12, display:'inline-flex', alignItems:'center', gap:5 }}>{done ? <><Check size={13} /> Read</> : 'Mark read'}</button>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}
function TeamDir({ joiner, setJoiner, nav }) {
  const [greeted, setGreeted] = useState(() => new Set());
  const greet = (id) => { if (greeted.has(id)) return; const n = new Set(greeted); n.add(id); setGreeted(n); setJoiner((j) => ({ ...j, greeted:(j.greeted || 0) + 1 })); };
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow="Your team · APAC Sales" title="Who you will work with" sub="Say hello before Day 1. Greet three and follow our socials for the Social Butterfly badge." />
        <div style={{ display:'grid', gap:10 }}>
          {TEAM.map((t) => { const a = A[t.accent], isBuddy = t.id === BUDDY.id, g = greeted.has(t.id); const initials = t.name.split(' ').map((w) => w[0]).join(''); return (
            <div key={t.id} style={{ background:'var(--card)', borderRadius:16, border:`1px solid ${isBuddy ? a.solid : 'var(--b-border)'}`, padding:'14px 15px', display:'flex', alignItems:'center', gap:13 }}>
              <span style={{ width:46, height:46, flexShrink:0, borderRadius:14, display:'grid', placeItems:'center', background:a.tile, color:a.fg, fontWeight:800, fontSize:16 }} className="f-disp">{initials}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:7 }}><span className="f-body" style={{ fontSize:14.5, fontWeight:700, color:'var(--ink)' }}>{t.name}</span>{isBuddy && <span className="f-mono" style={{ fontSize:8, color:a.fg, background:a.tile, padding:'2px 6px', borderRadius:99 }}>Buddy</span>}</div>
                <div className="f-body" style={{ fontSize:12, color:'var(--muted)' }}>{t.role}</div>
                <div className="f-body" style={{ marginTop:3, fontSize:11.5, color:'var(--muted)', lineHeight:1.4 }}>{t.line}</div>
              </div>
              <button onClick={() => (isBuddy ? nav('buddy') : greet(t.id))} className="f-body" style={{ flexShrink:0, background:g ? A.mint.tile : a.tile, color:g ? A.mint.fg : a.fg, borderRadius:10, padding:'8px 12px', fontWeight:700, fontSize:12, display:'inline-flex', alignItems:'center', gap:5 }}>{isBuddy ? <><MessageCircle size={13} /> Chat</> : g ? <><Check size={13} /> Hi sent</> : 'Say hi'}</button>
            </div>
          ); })}
        </div>
        <button onClick={() => setJoiner((j) => ({ ...j, socialsFollowed:true }))} className="f-body" style={{ marginTop:14, width:'100%', background:joiner.socialsFollowed ? A.mint.tile : 'var(--card)', color:joiner.socialsFollowed ? A.mint.fg : 'var(--ink)', border:`1px solid ${joiner.socialsFollowed ? A.mint.solid : 'var(--b-border)'}`, borderRadius:14, padding:'13px', fontWeight:700, fontSize:13.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7 }}>{joiner.socialsFollowed ? <><Check size={15} /> Following TestMu</> : <><Megaphone size={15} /> Follow our socials</>}</button>
      </div>
    </div>
  );
}
function LaunchPadView({ joiner, nav }) {
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow="Launch Pad" title="Your first week" sub="A loose map of week one. Nothing to do here yet, just so you can see the shape of it." />
        <div style={{ display:'grid', gap:10 }}>
          {LAUNCHPAD.map((d, i) => { const a = Object.values(A)[i % 6]; return (
            <div key={i} style={{ background:'var(--card)', borderRadius:16, border:'1px solid var(--b-border)', borderLeft:`3px solid ${a.solid}`, padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:8 }}><span className="f-mono" style={{ fontSize:9.5, color:a.fg }}>{d.d}</span><span className="f-disp" style={{ fontSize:16, fontWeight:700, color:'var(--ink)' }}>{d.t}</span></div>
              <ul style={{ marginTop:8, listStyle:'none', display:'grid', gap:5 }}>{d.items.map((x, j) => <li key={j} className="f-body" style={{ fontSize:13, color:'var(--muted)', display:'flex', gap:8 }}><span style={{ color:a.fg, marginTop:1 }}>·</span>{x}</li>)}</ul>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}
function LogisticsView({ joiner, setJoiner, nav }) {
  const [opened, setOpened] = useState(() => new Set(joiner.logistics.opened || []));
  if (!screenUnlocked(joiner, 'logistics') && !joiner.logistics.done) return <LockedSurface j={joiner} screen="logistics" label="Day 1 logistics" note="The where, when and what of your first morning. Lands closer to your start." onBack={() => nav('home')} />;
  const open = (i) => setOpened((s) => { const n = new Set(s); n.add(i); if (n.size === LOGISTICS.length) setJoiner((j) => ({ ...j, logistics:{ done:true, opened:[...n] } })); else setJoiner((j) => ({ ...j, logistics:{ ...j.logistics, opened:[...n] } })); return n; });
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow={`Day 1 logistics · Day ${joiner.day}`} title="Your first morning" sub="Open each card so nothing is a surprise. All six earns Ground Crew." />
        <div style={{ display:'grid', gap:10 }}>
          {LOGISTICS.map((l, i) => { const Ic = l.icon, a = Object.values(A)[i % 6], op = opened.has(i); return (
            <button key={i} onClick={() => open(i)} style={{ textAlign:'left', width:'100%', background:'var(--card)', borderRadius:14, border:`1px solid ${op ? a.solid : 'var(--b-border)'}`, padding:'14px 15px', display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ width:38, height:38, flexShrink:0, borderRadius:11, display:'grid', placeItems:'center', background:a.tile, color:a.fg }}><Ic size={18} /></span>
              <div style={{ flex:1, minWidth:0 }}><div className="f-mono" style={{ fontSize:9, color:'var(--muted)' }}>{l.k}</div><div className="f-body" style={{ marginTop:2, fontSize:op ? 13.5 : 13, fontWeight:op ? 600 : 500, color:op ? 'var(--ink)' : 'var(--muted)', lineHeight:1.4 }}>{op ? l.v : 'Tap to open'}</div></div>
              {op ? <Check size={16} color={a.fg} /> : <ChevronRight size={16} color="var(--muted)" />}
            </button>
          ); })}
        </div>
      </div>
    </div>
  );
}
function VisionView({ joiner, setJoiner, nav }) {
  if (!screenUnlocked(joiner, 'vision') && !joiner.vision.read) return <LockedSurface j={joiner} screen="vision" label="The vision" note="Where TestMu is headed, and your place in it. The last thing before launch." onBack={() => nav('home')} />;
  return (
    <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%' }}>
      <div style={{ padding:'30px 24px 60px' }}>
        <BackBar onBack={() => nav('home')} dark />
        <div className="f-mono" style={{ fontSize:10, color:'var(--violet)' }}>The vision · earns Star Plotter</div>
        <h1 className="f-serif" style={{ marginTop:12, fontSize:'clamp(32px,9vw,46px)', fontWeight:400, lineHeight:1.02, color:'var(--c-text)' }}>Frontier,<br/><span style={{ fontStyle:'italic', color:'var(--c-amber)' }}>not legacy.</span></h1>
        <p className="f-body" style={{ marginTop:16, fontSize:15, lineHeight:1.65, color:'var(--c-muted)', maxWidth:360 }}>The old way tested software after it was built, slowly, by hand. We made testing agentic, instant, and native to how teams ship now. You are joining the company building that future, not maintaining the past.</p>
        <div style={{ marginTop:26, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {VISION_STATS.map(([n, l], i) => <div key={i} style={{ background:'var(--panel)', border:'1px solid var(--c-border)', borderRadius:16, padding:'16px' }}><div className="f-disp" style={{ fontSize:26, fontWeight:800, color:'var(--cyan)' }}>{n}</div><div className="f-body" style={{ marginTop:3, fontSize:12, color:'var(--c-muted)', lineHeight:1.4 }}>{l}</div></div>)}
        </div>
        <button onClick={() => { setJoiner((j) => ({ ...j, vision:{ read:true } })); nav('home'); }} className="on-dark" style={{ marginTop:26, width:'100%', background:'#fff', color:'var(--void)', borderRadius:14, padding:'15px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}>{joiner.vision.read ? 'Back to cockpit' : 'I see it'} <ArrowRight size={16} strokeWidth={2.4} /></button>
      </div>
    </CosmicScene></div>
  );
}

function Zine({ joiner, nav }) {
  const tuned = (joiner.wellbeingProfile.observations || []).slice(0, 2).map((o) => o.replace(/\.\s*$/, '')).join('. ');
  const crew = TEAM.map((t) => t.name.split(' ')[0]).join(', ');
  const [editing, setEditing] = useState(false);
  const [pages, setPages] = useState(() => [
    { s:joiner.name, t:'The Joining Zine', body:`${joiner.role} · Class of 2026`, cover:true },
    { s:'Noida · Tower A', t:'Where you land', body:'Sector 62. Rohan meets you at reception, 10am.' },
    { s:'APAC Sales', t:'Your crew', body:`${crew}. Six names you already know.` },
    { s:'From How I Work', t:'Tuned for you', body:tuned || 'Your Day 1 is set up the way you work.' },
    { s:'Frontier, not legacy', t:'The mission', body:'2M+ engineers. 1B+ tests. You help sell the future of quality.' },
    { s:'Day 1', t:'See you Monday', body:'This is where pre-boarding ends and the real thing starts.', end:true }
  ]);
  const setField = (i, key, val) => setPages((ps) => ps.map((p, j) => (j === i ? { ...p, [key]:val } : p)));
  return (
    <div className="pb-scroll" style={{ background:'#ECE4D2' }}>
      <div style={{ padding:'22px 18px 120px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <span className="f-mono" style={{ fontSize:10, color:'#8A6410' }}>Your joining zine · keepsake</span>
          <button onClick={() => setEditing(!editing)} className="f-body" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, color:editing ? '#fff' : '#15110C', background:editing ? '#15110C' : 'transparent', border:'1px solid #15110C', borderRadius:99, padding:'7px 13px' }}>{editing ? <><Check size={13} /> Done</> : <><NotebookPen size={13} /> Edit</>}</button>
        </div>
        {editing && <p className="f-body" style={{ fontSize:12.5, color:'#6B5A3F', marginBottom:12, lineHeight:1.5 }}>Tap any line and make it yours. For example, change who meets you and when.</p>}
        <div style={{ display:'grid', gap:14 }}>
          {pages.map((p, i) => { const dark = p.cover || p.end; const eb = dark ? '#C9F24E' : '#A85A1F'; const fg = dark ? '#ECE4D2' : '#15110C'; const rows = Math.max(2, Math.ceil((p.body || '').length / 34));
            return (
              <div key={i} className={editing ? '' : 'pb-rise'} style={{ animationDelay:`${i * 0.07}s`, background:dark ? '#15110C' : '#FBF7EC', color:fg, border:'1px solid rgba(21,17,12,0.15)', borderRadius:6, padding:'24px 22px', minHeight:p.cover ? 190 : 'auto', display:'flex', flexDirection:'column', justifyContent:p.cover ? 'flex-end' : 'flex-start' }}>
                {editing ? (
                  <>
                    <input value={p.s} onChange={(e) => setField(i, 's', e.target.value)} className="f-mono" style={{ width:'100%', background:'transparent', border:'none', borderBottom:`1px dashed ${eb}`, color:eb, fontSize:9, outline:'none', paddingBottom:3, textTransform:'uppercase', letterSpacing:'0.16em' }} />
                    <input value={p.t} onChange={(e) => setField(i, 't', e.target.value)} className="f-serif" style={{ width:'100%', marginTop:8, background:'transparent', border:'none', borderBottom:`1px dashed ${fg}`, color:fg, fontSize:p.cover ? 34 : 24, fontWeight:400, lineHeight:1.05, outline:'none', paddingBottom:3 }} />
                    <textarea value={p.body} onChange={(e) => setField(i, 'body', e.target.value)} rows={rows} className="f-body" style={{ width:'100%', marginTop:10, background:'rgba(127,110,80,0.08)', border:`1px dashed ${fg}`, borderRadius:6, color:fg, fontSize:13.5, lineHeight:1.5, outline:'none', resize:'none', padding:'8px 10px' }} />
                  </>
                ) : (
                  <>
                    <div className="f-mono" style={{ fontSize:9, color:eb }}>{p.s}</div>
                    <div className="f-serif" style={{ marginTop:8, fontSize:p.cover ? 40 : 26, fontWeight:400, lineHeight:1.0 }}>{p.t}</div>
                    <p className="f-body" style={{ marginTop:10, fontSize:13.5, lineHeight:1.55, opacity:0.85, whiteSpace:'pre-wrap' }}>{p.body}</p>
                  </>
                )}
                <div className="f-mono" style={{ marginTop:14, fontSize:8, opacity:0.5 }}>{i + 1} / {pages.length}</div>
              </div>
            );
          })}
        </div>
        <button onClick={() => nav('home')} className="f-body" style={{ marginTop:18, width:'100%', background:'#15110C', color:'#ECE4D2', borderRadius:12, padding:'14px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}><Download size={15} /> Saved to your day one</button>
      </div>
    </div>
  );
}
function Launch({ joiner, nav }) {
  const ready = joiner.testMode || coreEarnedCount(joiner) >= 6 || screenUnlocked(joiner, 'launch');
  const [phase, setPhase] = useState('intro');
  const [count, setCount] = useState(3);
  const rocket = rocketState(joiner);
  useEffect(() => {
    if (phase === 'countdown') { if (count > 0) { const t = setTimeout(() => setCount(count - 1), 850); return () => clearTimeout(t); } setPhase('lifting'); }
    if (phase === 'lifting') { const t = setTimeout(() => setPhase('parallax'), 2600); return () => clearTimeout(t); }
  }, [phase, count]);
  if (!ready) return <LockedSurface j={joiner} screen="launch" label="Launch" note="Clear the six core surfaces and your rocket assembles. Then you launch." onBack={() => nav('home')} />;

  if (phase === 'zine') {
    return <Zine joiner={joiner} nav={nav} />;
  }
  return (
    <div className="pb-scroll"><CosmicScene style={{ minHeight:'100%', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden' }}>
      <div style={{ padding:'40px 26px', textAlign:'center', position:'relative' }}>
        {phase === 'intro' && (<div className="pb-fade">
          <div style={{ display:'flex', justifyContent:'center' }}><RocketArt state={rocket} /></div>
          <div className="f-mono" style={{ marginTop:18, fontSize:10, color:'var(--cyan)' }}>{rocket.earned} of {rocket.total} badges · rocket assembled</div>
          <h1 className="f-serif" style={{ marginTop:12, fontSize:'clamp(34px,9vw,48px)', fontWeight:400, lineHeight:1.0, color:'var(--c-text)' }}>It is all here.<br/>Ready when you are.</h1>
          <button onClick={() => { setCount(3); setPhase('countdown'); }} className="on-dark" style={{ marginTop:26, background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 30px', fontWeight:700, fontSize:15, display:'inline-flex', alignItems:'center', gap:8 }}>Launch <Rocket size={17} /></button>
        </div>)}
        {phase === 'countdown' && <div className="f-serif pb-fade" key={count} style={{ fontSize:'clamp(90px,30vw,160px)', fontWeight:400, color:'var(--c-text)', lineHeight:1 }}>{count === 0 ? 'Go' : count}</div>}
        {phase === 'lifting' && <div style={{ display:'flex', justifyContent:'center', height:360, alignItems:'flex-end' }}><RocketArt state={rocket} launching /></div>}
        {phase === 'parallax' && (<div className="pb-fade">
          <p className="f-serif" style={{ fontSize:'clamp(40px,11vw,58px)', fontWeight:400, color:'var(--c-text)' }}>You're ready.</p>
          <p className="f-serif" style={{ marginTop:12, fontStyle:'italic', fontSize:'clamp(26px,7vw,36px)', color:'var(--c-amber)' }}>See you Monday.</p>
          <button onClick={() => setPhase('zine')} className="on-dark" style={{ marginTop:30, background:'#fff', color:'var(--void)', borderRadius:14, padding:'14px 26px', fontWeight:700, fontSize:14.5, display:'inline-flex', alignItems:'center', gap:8 }}>Open your joining zine <ArrowRight size={16} /></button>
        </div>)}
      </div>
    </CosmicScene></div>
  );
}

function Documents({ joiner, setJoiner, nav }) {
  const [open, setOpen] = useState('onboarding');
  if (!screenUnlocked(joiner, 'documents')) return <LockedSurface j={joiner} screen="documents" label="Documents Vault" note="Your onboarding form and paperwork open a few days in, so it does not all land at once." onBack={() => nav('home')} />;
  const setDoc = (k, v) => setJoiner((j) => ({ ...j, documents:{ ...j.documents, [k]:v } }));
  const prog = docProgress(joiner);
  const upload = (secId, itemId) => { setDoc(`${secId}.${itemId}`, 'review'); setTimeout(() => setJoiner((j) => ({ ...j, documents:{ ...j.documents, [`${secId}.${itemId}`]:'verified' } })), 1100); };
  return (
    <div className="pb-scroll" style={{ background:'var(--page)' }}>
      <div style={{ padding:'20px 16px 120px' }}>
        <BackBar onBack={() => nav('home')} />
        <BentoHead eyebrow={`Documents Vault · Day ${joiner.day}`} title="Paperwork, once" sub="Radhika in HR reviews each upload. Verified means you never touch it again." />
        <div style={{ marginBottom:16, display:'flex', alignItems:'center', gap:11, background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:14, padding:'13px 15px' }}>
          <Ring percent={Math.round((prog.done / prog.total) * 100)} size={52} accent="sunshine" />
          <div style={{ flex:1 }}><div className="f-body" style={{ fontSize:13.5, fontWeight:700, color:'var(--ink)' }}>{prog.done} of {prog.total} done</div><div className="f-body" style={{ fontSize:12, color:'var(--muted)' }}>{docsAllDone(joiner) ? 'All clear. Paperwork Pilot earned.' : 'Radhika reviews within a day.'}</div></div>
        </div>
        <div style={{ display:'grid', gap:10 }}>
          {DOC_SECTIONS.map((s) => { const Ic = s.icon, isOpen = open === s.id; return (
            <div key={s.id} style={{ background:'var(--card)', borderRadius:16, border:'1px solid var(--b-border)', overflow:'hidden' }}>
              <button onClick={() => setOpen(isOpen ? '' : s.id)} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'14px 15px', textAlign:'left' }}>
                <span style={{ width:38, height:38, flexShrink:0, borderRadius:11, display:'grid', placeItems:'center', background:A.sunshine.tile, color:A.sunshine.fg }}><Ic size={18} /></span>
                <span style={{ flex:1, minWidth:0 }}><span className="f-body" style={{ display:'block', fontSize:14, fontWeight:700, color:'var(--ink)' }}>{s.label}</span>{s.note && <span className="f-body" style={{ display:'block', fontSize:11.5, color:'var(--muted)' }}>{s.note}</span>}</span>
                <ChevronRight size={17} color="var(--muted)" style={{ transform:isOpen ? 'rotate(90deg)' : 'none', transition:'transform .2s' }} />
              </button>
              {isOpen && (
                <div className="pb-fade" style={{ padding:'0 15px 15px' }}>
                  {s.kind === 'bank' && (
                    <div style={{ display:'grid', gap:8 }}>
                      {BANKS.map((b) => { const sel = joiner.documents['banking.selected'] === b.id; return (
                        <button key={b.id} onClick={() => setDoc('banking.selected', b.id)} style={{ textAlign:'left', background:sel ? A.sunshine.tile : 'var(--page)', border:`1px solid ${sel ? A.sunshine.solid : 'var(--b-border)'}`, borderRadius:12, padding:'12px 14px' }}>
                          <div className="f-body" style={{ fontSize:13.5, fontWeight:700, color:'var(--ink)' }}>{b.name}</div>
                          {sel && <div className="f-body pb-fade" style={{ marginTop:4, fontSize:12, color:'var(--muted)' }}>SPOC: {b.spoc} · {b.phone}</div>}
                        </button>
                      ); })}
                    </div>
                  )}
                  {s.kind === 'form' && (
                    <div>
                      <div style={{ display:'grid', gap:7 }}>{joiner.familyInsurance.map((f, i) => (
                        <div key={i} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--page)', borderRadius:10, padding:'10px 12px' }}><Heart size={14} color={A.rose.fg} /><span className="f-body" style={{ fontSize:13, color:'var(--ink)' }}><strong>{f.name}</strong> · {f.relation}</span></div>
                      ))}</div>
                      <button onClick={() => setDoc('family.count', joiner.familyInsurance.length)} className="f-body" style={{ marginTop:9, width:'100%', background:joiner.documents['family.count'] ? A.mint.tile : A.sunshine.tile, color:joiner.documents['family.count'] ? A.mint.fg : A.sunshine.fg, borderRadius:10, padding:'10px', fontWeight:700, fontSize:13, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6 }}>{joiner.documents['family.count'] ? <><Check size={14} /> Confirmed for insurance</> : 'Confirm family for insurance'}</button>
                    </div>
                  )}
                  {(s.kind === 'upload' || s.kind === 'gate' || s.kind === 'statutory') && (
                    <div style={{ display:'grid', gap:7 }}>
                      {s.items.map((it) => { const st = docState(joiner, s.id, it.id); const online = it.id === 'epfo'; return (
                        <div key={it.id} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--page)', borderRadius:10, padding:'11px 13px' }}>
                          <span style={{ width:30, height:30, flexShrink:0, borderRadius:8, display:'grid', placeItems:'center', background:st === 'verified' ? A.mint.tile : 'var(--card)', color:st === 'verified' ? A.mint.fg : 'var(--muted)' }}>{st === 'verified' ? <Check size={15} strokeWidth={2.6} /> : online ? <ExternalLink size={14} /> : <FileText size={14} />}</span>
                          <span style={{ flex:1, minWidth:0 }}><span className="f-body" style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--ink)' }}>{it.name}</span><span className="f-body" style={{ display:'block', fontSize:10.5, color:st === 'verified' ? A.mint.fg : st === 'review' ? A.sunshine.fg : 'var(--muted)' }}>{st === 'verified' ? 'Verified by Radhika' : st === 'review' ? 'Radhika reviewing...' : online ? 'On the EPFO portal' : 'Pending upload'}</span></span>
                          {st !== 'verified' && <button onClick={() => (online ? setDoc(`${s.id}.${it.id}`, 'verified') : upload(s.id, it.id))} className="f-body" style={{ flexShrink:0, background:A.sunshine.tile, color:A.sunshine.fg, borderRadius:9, padding:'7px 11px', fontWeight:700, fontSize:11.5, display:'inline-flex', alignItems:'center', gap:5 }}>{online ? <>Mark done</> : <><Upload size={12} /> Upload</>}</button>}
                        </div>
                      ); })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}

function BottomNav({ screen, nav }) {
  const items = [{ id:'home', label:'Home', icon:HomeIcon }, { id:'benefits', label:'Benefits', icon:Heart }, { id:'documents', label:'Docs', icon:FileText }, { id:'kane', label:'Kane', icon:null }];
  return (
    <div style={{ position:'absolute', left:0, right:0, bottom:0, height:64, background:'var(--card)', borderTop:'1px solid var(--b-border)', display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 10px', zIndex:30 }}>
      {items.map((it) => { const on = screen === it.id; const Ic = it.icon; return (
        <button key={it.id} onClick={() => nav(it.id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'6px 14px' }}>
          {Ic ? <Ic size={21} color={on ? 'var(--indigo)' : 'var(--muted)'} strokeWidth={on ? 2.4 : 2} /> : <span style={{ filter:on ? 'none' : 'grayscale(0.6) opacity(0.7)' }}><KaneHood hood={on ? 'var(--indigo)' : 'var(--muted)'} size={22} /></span>}
          <span className="f-body" style={{ fontSize:10, fontWeight:on ? 700 : 500, color:on ? 'var(--indigo)' : 'var(--muted)' }}>{it.label}</span>
        </button>
      ); })}
    </div>
  );
}

function DemoPanel({ joiner, setJoiner, onReset, onHR }) {
  const [open, setOpen] = useState(false);
  const variant = VARIANT_CONFIG[joiner.variant] || VARIANT_CONFIG.Standard;
  const dayStops = Array.from(new Set([0, ...Object.values(variant.days), joiner.totalDays])).sort((a, b) => a - b);
  const eng = liveEngagement(joiner);
  const risk = computeRiskScore({ ...joiner, engagementScore:eng, moodLog:liveMoodTrend(joiner).map((m) => ({ mood:m })) });
  const silence = computeSilenceTrigger(joiner);
  const js = getJourneyState(joiner);
  const riskColor = risk === 'high' ? '#EF4444' : risk === 'medium' ? '#F2A93B' : '#36B58A';
  const setV = (v) => setJoiner((j) => { const total = v === 'Sprint' ? 15 : v === 'Standard' ? 30 : 60; return { ...j, variant:v, totalDays:total, noticeDays:total, day:Math.min(j.day, total) }; });
  const cycle = (key, opts) => setJoiner((j) => { const i = opts.indexOf(j.prefs[key]); return { ...j, prefs:{ ...j.prefs, [key]:opts[(i + 1) % opts.length] } }; });
  const Row = ({ label, value, color }) => (<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--c-border)' }}><span className="f-mono" style={{ fontSize:9, color:'var(--c-muted)' }}>{label}</span><span className="f-body" style={{ fontSize:12.5, fontWeight:700, color:color || 'var(--c-text)' }}>{value}</span></div>);
  return (
    <>
      <button onClick={() => setOpen(true)} className="on-dark" style={{ position:'absolute', right:14, bottom:78, zIndex:40, width:46, height:46, borderRadius:14, background:'var(--void)', color:'var(--cyan)', display:'grid', placeItems:'center', boxShadow:'0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px var(--c-border)' }}><FlaskConical size={20} /></button>
      {open && (
        <div style={{ position:'absolute', inset:0, zIndex:50, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
          <div onClick={() => setOpen(false)} style={{ position:'absolute', inset:0, background:'rgba(8,8,18,0.55)' }} />
          <div className="pb-rise" style={{ position:'relative', background:'var(--panel)', borderTop:'1px solid var(--c-border)', borderRadius:'22px 22px 0 0', padding:'18px 18px 22px', maxHeight:'86%', overflowY:'auto' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}><FlaskConical size={16} color="var(--cyan)" /><span className="f-disp" style={{ fontSize:16, fontWeight:700, color:'var(--c-text)' }}>Demo panel</span></div>
              <button onClick={() => setOpen(false)} className="on-dark" style={{ color:'var(--c-muted)' }}><X size={18} /></button>
            </div>

            <div style={{ background:'var(--void)', borderRadius:14, padding:'12px 14px', marginBottom:16 }}>
              <div className="f-mono" style={{ fontSize:9, color:'var(--cyan)', marginBottom:4 }}>Live engine</div>
              <Row label="Variant" value={`${joiner.variant} · ${variant.range}`} />
              <Row label="Day" value={`${joiner.day} / ${joiner.totalDays}`} />
              <Row label="Risk score" value={risk} color={riskColor} />
              <Row label="Engagement" value={`${eng} (live)`} />
              <Row label="Next unlock" value={js.nextUp ? `${js.nextUp.label} · Day ${js.nextUp.day}` : 'all open'} />
              <Row label="Silence ladder" value={silence ? `${silence.who} (Day ${silence.day})` : 'quiet, no trigger'} color={silence ? silence.color : '#36B58A'} />
              <Row label="WhatsApp cadence" value={variant.whatsapp} />
            </div>

            <div className="f-mono" style={{ fontSize:9, color:'var(--c-muted)', marginBottom:8 }}>Notice-period variant</div>
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>{['Sprint','Standard','Extended'].map((v) => { const on = joiner.variant === v; return <button key={v} onClick={() => setV(v)} className="on-dark f-body" style={{ flex:1, padding:'10px', borderRadius:11, fontSize:12.5, fontWeight:on ? 700 : 500, background:on ? 'var(--violet)' : 'var(--panel-2)', color:on ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${on ? 'var(--violet)' : 'var(--c-border)'}` }}>{v}</button>; })}</div>

            <div className="f-mono" style={{ fontSize:9, color:'var(--c-muted)', marginBottom:8 }}>Jump to day</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:16 }}>{dayStops.map((d) => { const on = joiner.day === d; return <button key={d} onClick={() => setJoiner((j) => ({ ...j, day:d }))} className="on-dark f-mono" style={{ padding:'8px 12px', borderRadius:10, fontSize:10, background:on ? 'var(--cyan)' : 'var(--panel-2)', color:on ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${on ? 'var(--cyan)' : 'var(--c-border)'}` }}>Day {d}</button>; })}</div>

            <div className="f-mono" style={{ fontSize:9, color:'var(--c-muted)', marginBottom:8 }}>Simulate silence (days)</div>
            <div style={{ display:'flex', gap:7, marginBottom:16 }}>{[0,3,5,7,8,11].map((d) => { const on = joiner.daysSilent === d; return <button key={d} onClick={() => setJoiner((j) => ({ ...j, daysSilent:d }))} className="on-dark f-mono" style={{ padding:'8px 10px', borderRadius:10, fontSize:10, background:on ? 'var(--c-amber)' : 'var(--panel-2)', color:on ? 'var(--void)' : 'var(--c-text)', border:`1px solid ${on ? 'var(--c-amber)' : 'var(--c-border)'}` }}>{d}d</button>; })}</div>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderTop:'1px solid var(--c-border)', borderBottom:'1px solid var(--c-border)', marginBottom:16 }}>
              <div><div className="f-body" style={{ fontSize:13, fontWeight:700, color:'var(--c-text)' }}>Test Mode</div><div className="f-body" style={{ fontSize:11, color:'var(--c-muted)' }}>Unlock every surface, ignore the calendar</div></div>
              <Toggle on={joiner.testMode} onClick={() => setJoiner((j) => ({ ...j, testMode:!j.testMode }))} />
            </div>

            <div className="f-mono" style={{ fontSize:9, color:'var(--c-muted)', marginBottom:8 }}>Accessibility (live)</div>
            <div style={{ display:'grid', gap:8, marginBottom:16 }}>
              <button onClick={() => cycle('sensory', ['standard','reduced motion','text-only','high-contrast'])} className="on-dark f-body" style={{ display:'flex', justifyContent:'space-between', background:'var(--panel-2)', border:'1px solid var(--c-border)', borderRadius:11, padding:'11px 13px', fontSize:12.5, color:'var(--c-text)' }}><span>Visual</span><span style={{ fontWeight:700, color:'var(--violet)' }}>{joiner.prefs.sensory}</span></button>
              <button onClick={() => cycle('tone', ['shorter','standard','more detail'])} className="on-dark f-body" style={{ display:'flex', justifyContent:'space-between', background:'var(--panel-2)', border:'1px solid var(--c-border)', borderRadius:11, padding:'11px 13px', fontSize:12.5, color:'var(--c-text)' }}><span>Kane tone</span><span style={{ fontWeight:700, color:'var(--violet)' }}>{joiner.prefs.tone}</span></button>
              <button onClick={() => cycle('textSize', ['normal','larger','largest'])} className="on-dark f-body" style={{ display:'flex', justifyContent:'space-between', background:'var(--panel-2)', border:'1px solid var(--c-border)', borderRadius:11, padding:'11px 13px', fontSize:12.5, color:'var(--c-text)' }}><span>Text size</span><span style={{ fontWeight:700, color:'var(--violet)' }}>{joiner.prefs.textSize}</span></button>
            </div>

            <button onClick={() => { onHR(); setOpen(false); }} className="on-dark f-body" style={{ width:'100%', marginBottom:10, background:'var(--cyan)', color:'var(--void)', borderRadius:12, padding:'13px', fontWeight:700, fontSize:13.5, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8 }}><LayoutDashboard size={15} /> Switch to HR view (Radhika)</button>
            <button onClick={() => { onReset(); setOpen(false); }} className="on-dark f-body" style={{ width:'100%', background:'transparent', border:'1px solid var(--c-border)', color:'var(--c-muted)', borderRadius:12, padding:'12px', fontWeight:600, fontSize:13, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7 }}><RotateCcw size={14} /> Reset the whole demo</button>
          </div>
        </div>
      )}
    </>
  );
}

const HR_MOODC = (id) => (MOODS6.find((m) => m.id === id) || { color:'#9A98C0' }).color;
const RISK_META = { high:{ label:'High', color:'#EF4444', tile:'#FDE7E7' }, medium:{ label:'Medium', color:'#E0A82E', tile:'#FBF0D6' }, low:{ label:'Low', color:'#36B58A', tile:'#E2F4ED' } };

function liveEngagement(j) {
  let e = 42;
  e += coreEarnedCount(j) * 7;
  e += Math.min(10, (j.libraryReads || 0) * 2);
  e += Math.min(6, (j.greeted || 0) * 2);
  e += j.counteroffer.reflection ? 4 : 0;
  e += j.welcomeKit.submitted ? 3 : 0;
  e -= (j.daysSilent || 0) * 5;
  return Math.max(5, Math.min(99, Math.round(e)));
}
function liveMoodTrend(j) {
  const v = j.moodBaseline.value;
  const base = v >= 0.7 ? 'calm' : v >= 0.55 ? 'curious' : v >= 0.4 ? 'wired' : 'flooded';
  const t = ['calm', 'curious', base, base, 'calm', base, base];
  const s = Math.min(7, j.daysSilent || 0);
  for (let i = 7 - s; i < 7; i++) t[i] = 'silent';
  return t;
}
function consentTripped(j) {
  const trend = liveMoodTrend(j);
  const flooded = trend.filter((m) => m === 'flooded').length;
  return (j.prefs.consent2 && (j.daysSilent || 0) >= 5) || (j.prefs.consent1 && flooded >= 3);
}
function buildLiveJoiner(j) {
  const trend = liveMoodTrend(j);
  const eng = liveEngagement(j);
  const risk = computeRiskScore({ ...j, moodLog:trend.map((m) => ({ mood:m })), engagementScore:eng });
  const dp = docProgress(j);
  const cw = !j.counteroffer.reflection && j.day >= unlockDay(j, 'counteroffer');
  const reasons = [], alerts = [];
  if ((j.daysSilent || 0) >= 5) { reasons.push(`Silent ${j.daysSilent} days`); alerts.push(`Silent ${j.daysSilent} days · personal call by EOD`); }
  if (trend.filter((m) => m === 'flooded').length >= 2) reasons.push('Mood trending flooded');
  if (!j.wellbeingProfile.saved && j.day >= unlockDay(j, 'wellbeing')) { reasons.push('No How I Work profile'); alerts.push('Wellbeing not complete'); }
  if (cw) { reasons.push('Counteroffer window active'); alerts.push('Counteroffer window · suggest defense'); }
  if (!docsAllDone(j) && j.day >= unlockDay(j, 'documents')) alerts.push(`Documents pending · ${dp.total - dp.done} items`);
  const tripped = consentTripped(j);
  return {
    id:j.id, email:j.email, name:j.name, role:j.role, initials:(j.firstName || j.name)[0] + (j.name.split(' ')[1] || ' ')[0], color:'#5B5BD6',
    variant:j.variant, day:j.day, total:j.totalDays, joinDate:'Day 1 soon', isLive:true,
    moodTrend:trend, engagement:eng, risk, docsStatus:`${dp.done} of ${dp.total} approved`, docsPending:dp.total - dp.done,
    wellbeingSaved:j.wellbeingProfile.saved, observations:(j.wellbeingProfile.changes || []).map((c) => c.change),
    alerts, riskReasons:reasons, silence:computeSilenceTrigger(j),
    tripped, note:tripped ? (j.moodBaseline.note || 'No note left, but the silence itself is the signal.') : null,
    consents:{ c1:j.prefs.consent1, c2:j.prefs.consent2 }
  };
}
const MOCK_JOINERS = [
  { id:'polina', name:'Polina Verma', role:'Senior SDET', initials:'PV', color:'#7C3AED', variant:'Standard', day:12, total:30, joinDate:'30 Jun',
    moodTrend:['calm','calm','wired','flooded','flooded','silent','silent'], engagement:38, risk:'high', docsStatus:'3 of 6 approved', docsPending:3,
    wellbeingSaved:false, observations:[], alerts:['Silent 5 days · personal call by EOD','Wellbeing not complete'], riskReasons:['5+ days silent','Mood trending flooded','No How I Work profile'],
    silence:{ day:5, level:'radhika', who:'Radhika (HR)', color:'#E8B948' }, tripped:true, note:'The counteroffer from my current company is real money. I have not told anyone I am wobbling.', consents:{ c1:true, c2:true } },
  { id:'suresh', name:'Suresh Iyer', role:'Account Executive', initials:'SI', color:'#84A98C', variant:'Sprint', day:8, total:15, joinDate:'15 Jun',
    moodTrend:['curious','calm','curious','calm','calm','curious','calm'], engagement:86, risk:'low', docsStatus:'4 of 6 approved', docsPending:2,
    wellbeingSaved:true, observations:['You build momentum with small wins.','You build your own bubble.','You process socially.','You learn by stage.'], alerts:['Salary slip returned · awaiting re-upload'], riskReasons:[], silence:null, tripped:false, note:null, consents:{ c1:false, c2:true } },
  { id:'anjali', name:'Anjali Sharma', role:'Product Manager', initials:'AS', color:'#E07856', variant:'Extended', day:22, total:60, joinDate:'10 Jul',
    moodTrend:['curious','floating','floating','curious','floating','floating','curious'], engagement:94, risk:'low', docsStatus:'6 of 6 approved', docsPending:0,
    wellbeingSaved:true, observations:['You protect your bandwidth.','You shift to suit.','You process in writing.','You learn through people.'], alerts:[], riskReasons:[], silence:null, tripped:false, note:null, consents:{ c1:false, c2:false } },
  { id:'rishi', name:'Rishi Kapoor', role:'Solutions Engineer', initials:'RK', color:'#5B21B6', variant:'Standard', day:7, total:30, joinDate:'30 Jun',
    moodTrend:['curious','calm','calm','wired','wired','calm','wired'], engagement:64, risk:'medium', docsStatus:'2 of 6 approved', docsPending:4,
    wellbeingSaved:false, observations:[], alerts:['Counteroffer window · suggest defense module'], riskReasons:['Counteroffer window active','Mood trending wired'], silence:null, tripped:false, note:null, consents:{ c1:true, c2:false } },
  { id:'kavya', name:'Kavya Reddy', role:'Marketing Lead', initials:'KR', color:'#0EA5E9', variant:'Extended', day:35, total:60, joinDate:'15 Jul',
    moodTrend:['calm','curious','curious','floating','curious','calm','floating'], engagement:91, risk:'low', docsStatus:'5 of 6 approved', docsPending:1,
    wellbeingSaved:true, observations:['You scan before acting.','You read the room and adapt.','You process through motion.','You learn by example.'], alerts:[], riskReasons:[], silence:null, tripped:false, note:null, consents:{ c1:false, c2:false } }
];
function buildCohort(activeJoiner) {
  const byEmail = {};
  allStoredJoiners().forEach((s) => { if (s && s.email) byEmail[s.email] = buildLiveJoiner(s); });
  if (activeJoiner && activeJoiner.email) byEmail[activeJoiner.email] = buildLiveJoiner(activeJoiner);
  const live = [];
  if (activeJoiner && byEmail[activeJoiner.email]) live.push(byEmail[activeJoiner.email]);
  Object.keys(byEmail).forEach((em) => { if (!activeJoiner || em !== activeJoiner.email) live.push(byEmail[em]); });
  return [...live, ...MOCK_JOINERS];
}
function cohortKpis(cohort) {
  const atRisk = cohort.filter((c) => c.risk !== 'low');
  const high = cohort.filter((c) => c.risk === 'high').length;
  const med = cohort.filter((c) => c.risk === 'medium').length;
  const docsPending = cohort.reduce((s, c) => s + (c.docsPending || 0), 0);
  const avg = Math.round(cohort.reduce((s, c) => s + c.engagement, 0) / cohort.length);
  return { active:cohort.length, atRisk:atRisk.length, high, med, docsPending, avg };
}

function MoodSparkline({ trend, h = 26 }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:h }}>
      {trend.map((m, i) => { const c = HR_MOODC(m); const neg = m === 'silent' || m === 'flooded'; const ht = neg ? h * 0.45 : m === 'wired' ? h * 0.62 : h; return <span key={i} title={`D${i + 1}: ${m}`} style={{ width:6, height:ht, borderRadius:2, background:c, opacity:0.32, border:`1.5px solid ${c}` }} />; })}
    </div>
  );
}
function RiskBadge({ risk, big }) {
  const r = RISK_META[risk] || RISK_META.low;
  return <span className="f-mono" style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:big ? 11 : 9.5, fontWeight:600, padding:big ? '6px 11px' : '4px 9px', borderRadius:99, background:r.tile, color:r.color }}><Circle size={big ? 8 : 6} fill={r.color} strokeWidth={0} /> {r.label}</span>;
}
function HrKpi({ value, label, sub, color }) {
  return (
    <div style={{ flex:'1 1 150px', minWidth:150, background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:16, padding:'16px 18px' }}>
      <div className="f-disp" style={{ fontSize:30, fontWeight:800, color:color || 'var(--ink)', lineHeight:1 }}>{value}</div>
      <div className="f-body" style={{ marginTop:7, fontSize:13.5, fontWeight:700, color:'var(--ink)' }}>{label}</div>
      <div className="f-body" style={{ marginTop:2, fontSize:11.5, color:'var(--muted)' }}>{sub}</div>
    </div>
  );
}
function HRDetail({ jr, onAction, toast }) {
  const r = RISK_META[jr.risk] || RISK_META.low;
  return (
    <div style={{ background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:18, overflow:'hidden', alignSelf:'flex-start' }}>
      <div style={{ background:'#EFE6D2', padding:'18px 18px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ width:52, height:52, borderRadius:15, flexShrink:0, display:'grid', placeItems:'center', background:jr.color, color:'#fff', fontWeight:800, fontSize:19 }} className="f-disp">{jr.initials}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}><span className="f-serif" style={{ fontSize:22, color:'#2A1810' }}>{jr.name}</span>{jr.isLive && <span className="f-mono" style={{ fontSize:8, color:'#fff', background:'#5B5BD6', padding:'2px 7px', borderRadius:99 }}>LIVE</span>}</div>
            <div className="f-mono" style={{ fontSize:9.5, color:'#8A6410', marginTop:3 }}>{jr.role} · {jr.variant} · Day {jr.day}/{jr.total} · joins {jr.joinDate}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:9, marginTop:14 }}>
          <button onClick={() => onAction('whatsapp', jr)} className="f-body" style={{ flex:1, background:'#15110C', color:'#F5EFE0', borderRadius:11, padding:'10px', fontWeight:700, fontSize:13, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7 }}><MessageCircle size={15} /> WhatsApp</button>
          <button onClick={() => onAction('call', jr)} className="f-body" style={{ flex:1, background:'#fff', color:'#15110C', border:'1px solid rgba(21,17,12,0.2)', borderRadius:11, padding:'10px', fontWeight:700, fontSize:13, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7 }}><PhoneCall size={15} /> Call</button>
        </div>
      </div>
      <div style={{ padding:'16px 18px 20px' }}>
        <div style={{ display:'flex', gap:10 }}>
          <div style={{ flex:1, background:'var(--page)', borderRadius:12, padding:'12px 14px' }}><div className="f-mono" style={{ fontSize:9, color:'var(--muted)' }}>Engagement</div><div className="f-disp" style={{ marginTop:4, fontSize:24, fontWeight:800, color:'#1F7A5C' }}>{jr.engagement}<span style={{ fontSize:13, color:'var(--muted)' }}>/100</span></div></div>
          <div style={{ flex:1, background:'var(--page)', borderRadius:12, padding:'12px 14px' }}><div className="f-mono" style={{ fontSize:9, color:'var(--muted)' }}>Risk score</div><div style={{ marginTop:7 }}><RiskBadge risk={jr.risk} big /></div></div>
        </div>
        {jr.riskReasons.length > 0 && (
          <div style={{ marginTop:14 }}>
            <div className="f-mono" style={{ fontSize:9, color:'var(--muted)', marginBottom:7 }}>Risk drivers</div>
            <div style={{ display:'grid', gap:6 }}>{jr.riskReasons.map((x, i) => <div key={i} className="f-body" style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, color:'var(--ink)' }}><AlertCircle size={14} color={r.color} /> {x}</div>)}</div>
          </div>
        )}
        <div style={{ marginTop:16 }}>
          <div className="f-mono" style={{ fontSize:9, color:'var(--muted)', marginBottom:8 }}>7-day mood</div>
          <div style={{ display:'flex', gap:6 }}>{jr.moodTrend.map((m, i) => { const c = HR_MOODC(m); return <div key={i} style={{ flex:1, textAlign:'center' }}><div style={{ height:34, borderRadius:6, background:c, opacity:0.28, border:`1.5px solid ${c}` }} title={m} /><div className="f-mono" style={{ marginTop:4, fontSize:7.5, color:'var(--muted)' }}>D{jr.day - 6 + i > 0 ? jr.day - 6 + i : i + 1}</div></div>; })}</div>
        </div>
        <div style={{ marginTop:16, display:'grid', gap:9 }}>
          <div style={{ display:'flex', alignItems:'center', gap:11, background:'var(--page)', borderRadius:11, padding:'11px 13px' }}><FileCheck size={16} color={A.sunshine.fg} /><span className="f-body" style={{ fontSize:13, fontWeight:600, color:'var(--ink)' }}>Documents Vault</span><span className="f-body" style={{ marginLeft:'auto', fontSize:12.5, color:'var(--muted)' }}>{jr.docsStatus}</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:11, background:'var(--page)', borderRadius:11, padding:'11px 13px' }}><Compass size={16} color={A.indigo.fg} /><span className="f-body" style={{ fontSize:13, fontWeight:600, color:'var(--ink)' }}>How I Work</span><span className="f-body" style={{ marginLeft:'auto', fontSize:12.5, color:jr.wellbeingSaved ? '#1F7A5C' : 'var(--muted)' }}>{jr.wellbeingSaved ? 'Configured' : 'Pending'}</span></div>
        </div>
        {jr.wellbeingSaved && jr.observations.length > 0 && (
          <div style={{ marginTop:14, background:'#DCE9DC', borderRadius:12, padding:'13px 15px' }}>
            <div className="f-mono" style={{ fontSize:9, color:'#1F7A5C', marginBottom:8 }}>Configuration list · Day 1 (always shared with HR)</div>
            <div style={{ display:'grid', gap:6 }}>{jr.observations.slice(0, 4).map((o, i) => <div key={i} className="f-body" style={{ display:'flex', gap:8, fontSize:12.5, color:'#22402F', lineHeight:1.4 }}><Check size={14} strokeWidth={2.6} style={{ flexShrink:0, marginTop:1 }} /> {o}</div>)}</div>
          </div>
        )}
        <div style={{ marginTop:14, borderRadius:12, padding:'13px 15px', background:jr.note ? '#FDE7E7' : 'var(--page)', border:`1px solid ${jr.note ? '#F3C0C0' : 'var(--b-border)'}` }}>
          <div className="f-mono" style={{ fontSize:9, color:jr.note ? '#C0392B' : 'var(--muted)', marginBottom:6, display:'flex', alignItems:'center', gap:6 }}>{jr.note ? <><AlertCircle size={12} /> Personal note · consent alert tripped</> : <><Lock size={12} /> Personal note · sealed</>}</div>
          {jr.note ? <p className="f-body" style={{ fontSize:13, color:'#7A2A2A', lineHeight:1.5, fontStyle:'italic' }}>"{jr.note}"</p>
            : <p className="f-body" style={{ fontSize:12, color:'var(--muted)', lineHeight:1.5 }}>{jr.consents.c1 || jr.consents.c2 ? 'They consented to HR being looped in, but no alert has tripped. Their notes stay between them and Kane.' : 'No HR-escalation consent given. Their notes stay private.'}</p>}
        </div>
        {jr.alerts.length > 0 && (
          <div style={{ marginTop:14 }}>
            <div className="f-mono" style={{ fontSize:9, color:'var(--muted)', marginBottom:7 }}>What is next</div>
            <div style={{ display:'grid', gap:6 }}>{jr.alerts.map((a, i) => <div key={i} className="f-body" style={{ display:'flex', gap:8, alignItems:'center', fontSize:12.5, color:'var(--ink)' }}><Bell size={13} color={A.sunshine.fg} /> {a}</div>)}</div>
          </div>
        )}
        {jr.isLive && (
          <div style={{ marginTop:16, borderTop:'1px solid var(--b-border)', paddingTop:14 }}>
            <div className="f-mono" style={{ fontSize:9, color:'var(--muted)', marginBottom:8 }}>HR actions (write back to their app)</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              <button onClick={() => onAction('verifyDocs', jr)} className="f-body" style={{ background:A.mint.tile, color:A.mint.fg, borderRadius:10, padding:'9px 13px', fontWeight:700, fontSize:12 }}>Approve all documents</button>
              <button onClick={() => onAction('clearSilence', jr)} className="f-body" style={{ background:A.indigo.tile, color:A.indigo.fg, borderRadius:10, padding:'9px 13px', fontWeight:700, fontSize:12 }}>Log that I reached out</button>
            </div>
          </div>
        )}
        {toast && <div className="pb-fade f-body" style={{ marginTop:14, fontSize:12, color:'var(--muted)', textAlign:'center' }}>{toast}</div>}
      </div>
    </div>
  );
}
function HRConsole({ joiner, setJoiner, onExit }) {
  const [, force] = useState(0);
  useEffect(() => subscribeStore(() => force((n) => n + 1)), []);
  const cohort = buildCohort(joiner);
  const [selId, setSelId] = useState(joiner.id);
  const [toast, setToast] = useState('');
  const sel = cohort.find((c) => c.id === selId) || cohort[0];
  const k = cohortKpis(cohort);
  const banner = cohort.flatMap((c) => c.alerts.map((a) => ({ name:c.name, text:a, risk:c.risk, id:c.id }))).sort((a, b) => (a.risk === 'high' ? -1 : 1) - (b.risk === 'high' ? -1 : 1)).slice(0, 3);
  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2600); };
  const onAction = (kind, jr) => {
    if (kind === 'whatsapp') flash(`Simulated: WhatsApp drafted to ${jr.name}`);
    else if (kind === 'call') flash(`Simulated: calling ${jr.name}`);
    else if (kind === 'verifyDocs') { setJoiner((j) => { const docs = { ...j.documents }; DOC_UPLOADABLE.forEach(({ secId, itemId }) => { docs[`${secId}.${itemId}`] = 'verified'; }); docs['family.count'] = j.familyInsurance.length; docs['banking.selected'] = docs['banking.selected'] || 'hdfc'; return { ...j, documents:docs }; }); flash(`Approved. ${jr.name} sees the vault cleared.`); }
    else if (kind === 'clearSilence') { setJoiner((j) => ({ ...j, daysSilent:0 })); flash('Logged. Silence flag cleared.'); }
  };
  return (
    <div className="pb-scroll" style={{ background:'var(--page)', minHeight:'100vh', width:'100%' }}>
      <div style={{ position:'sticky', top:0, zIndex:10, background:'var(--card)', borderBottom:'1px solid var(--b-border)', padding:'12px 22px', display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ width:34, height:34, borderRadius:9, display:'grid', placeItems:'center', background:'var(--ink)', color:'#fff' }}><ShieldCheck size={18} /></span>
        <div style={{ flex:1 }}><div className="f-mono" style={{ fontSize:9.5, color:'var(--muted)' }}>testmu · HR compliance</div><div className="f-disp" style={{ fontSize:15, fontWeight:700, color:'var(--ink)' }}>Pre-boarding console</div></div>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ textAlign:'right' }}><div className="f-body" style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>Radhika</div><div className="f-mono" style={{ fontSize:8.5, color:'#1F7A5C' }}>Mumbai · online</div></div>
          <span style={{ width:36, height:36, borderRadius:'50%', display:'grid', placeItems:'center', background:A.rose.tile, color:A.rose.fg, fontWeight:800 }} className="f-disp">R</span>
        </div>
        <button onClick={onExit} className="f-body" style={{ marginLeft:8, display:'inline-flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:'var(--indigo)', border:'1px solid var(--b-border)', borderRadius:10, padding:'8px 12px' }}><ArrowLeft size={14} /> Joiner app</button>
      </div>
      <div style={{ maxWidth:1180, margin:'0 auto', padding:'24px 22px 80px' }}>
        <div className="f-mono" style={{ fontSize:10.5, color:'var(--muted)' }}>{new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</div>
        <h1 className="f-disp" style={{ marginTop:8, fontSize:'clamp(26px,4vw,34px)', fontWeight:700, color:'var(--ink)' }}>{k.active} active joiners.</h1>
        <p className="f-body" style={{ marginTop:4, fontSize:13, color:'var(--muted)' }}>Every joiner who signs in appears here live. Open the joiner app in another tab to watch a new row arrive.</p>
        <div style={{ marginTop:18, display:'flex', flexWrap:'wrap', gap:12 }}>
          <HrKpi value={k.active} label="Active joiners" sub="across three variants" />
          <HrKpi value={k.atRisk} label="At risk" sub={`${k.high} high · ${k.med} medium`} color="#EF4444" />
          <HrKpi value={k.docsPending} label="Docs pending" sub="across the cohort" color="#E0A82E" />
          <HrKpi value={`${k.avg}%`} label="Avg engagement" sub="live across cohort" color="#1F7A5C" />
        </div>
        {banner.length > 0 && (
          <div style={{ marginTop:18, background:'var(--card)', border:'1px solid #F3C0C0', borderRadius:16, padding:'15px 18px' }}>
            <div className="f-mono" style={{ fontSize:10, color:'#C0392B', marginBottom:11, display:'flex', alignItems:'center', gap:7 }}><span className="pb-blink" style={{ display:'inline-flex' }}><AlertCircle size={14} /></span> {banner.length} active alerts · need attention today</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {banner.map((b, i) => { const col = b.risk === 'high' ? '#EF4444' : '#E0A82E'; return (
                <button key={i} onClick={() => setSelId(b.id)} style={{ flex:'1 1 240px', minWidth:220, textAlign:'left', background:'var(--page)', borderLeft:`3px solid ${col}`, borderRadius:'8px', padding:'11px 13px' }}>
                  <div className="f-body" style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>{b.name}</div>
                  <div className="f-body" style={{ marginTop:2, fontSize:12, color:'var(--muted)' }}>{b.text}</div>
                </button>
              ); })}
            </div>
          </div>
        )}
        <div style={{ marginTop:18, display:'flex', flexWrap:'wrap', gap:16, alignItems:'flex-start' }}>
          <div style={{ flex:'1 1 420px', minWidth:340, background:'var(--card)', border:'1px solid var(--b-border)', borderRadius:18, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderBottom:'1px solid var(--b-border)' }}>
              <span className="f-disp" style={{ fontSize:15, fontWeight:700, color:'var(--ink)' }}>All active joiners</span>
              <span style={{ marginLeft:'auto', display:'inline-flex', gap:8, color:'var(--muted)' }}><Search size={16} /><Filter size={16} /></span>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:520 }}>
                <thead><tr style={{ background:'var(--page)' }}>{['Joiner','Variant','Day','7-day mood','Eng','Risk'].map((h) => <th key={h} className="f-mono" style={{ textAlign:'left', fontSize:8.5, color:'var(--muted)', fontWeight:600, padding:'9px 12px', letterSpacing:'0.1em' }}>{h}</th>)}</tr></thead>
                <tbody>
                  {cohort.map((c) => { const on = c.id === selId; return (
                    <tr key={c.id} onClick={() => setSelId(c.id)} style={{ cursor:'pointer', background:on ? '#EFE6D2' : 'transparent', borderTop:'1px solid var(--b-border)' }}>
                      <td style={{ padding:'10px 12px' }}><div style={{ display:'flex', alignItems:'center', gap:9 }}><span style={{ width:32, height:32, borderRadius:9, flexShrink:0, display:'grid', placeItems:'center', background:c.color, color:'#fff', fontWeight:800, fontSize:12 }} className="f-disp">{c.initials}</span><div><div className="f-body" style={{ fontSize:13, fontWeight:700, color:'var(--ink)', display:'flex', alignItems:'center', gap:6 }}>{c.name}{c.isLive && <span className="f-mono" style={{ fontSize:7, color:'#fff', background:'#5B5BD6', padding:'1px 5px', borderRadius:99 }}>LIVE</span>}</div><div className="f-body" style={{ fontSize:11, color:'var(--muted)' }}>{c.role}</div></div></div></td>
                      <td className="f-body" style={{ padding:'10px 12px', fontSize:12, color:'var(--muted)' }}>{c.variant}</td>
                      <td className="f-body" style={{ padding:'10px 12px', fontSize:12, color:'var(--ink)', fontWeight:600 }}>{c.day}/{c.total}</td>
                      <td style={{ padding:'10px 12px' }}><MoodSparkline trend={c.moodTrend} /></td>
                      <td className="f-disp" style={{ padding:'10px 12px', fontSize:14, fontWeight:800, color:c.engagement >= 70 ? '#1F7A5C' : c.engagement >= 50 ? '#E0A82E' : '#EF4444' }}>{c.engagement}</td>
                      <td style={{ padding:'10px 12px' }}><RiskBadge risk={c.risk} /></td>
                    </tr>
                  ); })}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ flex:'1 1 320px', minWidth:300 }}><HRDetail jr={sel} onAction={onAction} toast={toast} /></div>
        </div>
        <div className="f-mono" style={{ marginTop:22, fontSize:8.5, color:'var(--muted)' }}>testmu pre-boarding · HR console · live-wired to every joiner who signs in · updates across tabs in real time</div>
      </div>
    </div>
  );
}

export default function PreboardApp() {
  const [joiner, setJoiner] = useState(INITIAL_JOINER);
  const [screen, setScreen] = useState('signin');
  const [mode, setMode] = useState('joiner');
  useEffect(() => { saveJoinerToStore(joiner); }, [joiner]);
  const nav = (s) => {
    if (s === 'benefits') setJoiner((j) => ({ ...j, benefitsViewed:true }));
    if (s === 'buddy') setJoiner((j) => ({ ...j, buddyMet:true }));
    setScreen(s);
    const el = document.querySelector('.pb-scroll'); if (el) el.scrollTop = 0;
  };
  const enter = (email) => { const nextJ = joinerFromEmail(email); setJoiner(nextJ); nav(nextJ.setupDone ? 'home' : 'arc'); };
  const reset = () => { setJoiner(INITIAL_JOINER); setScreen('signin'); setMode('joiner'); };
  const sensory = joiner.prefs.sensory;
  const rootClass = `pb-root${sensory === 'reduced motion' ? ' reduce' : ''}${sensory === 'text-only' ? ' textonly' : ''}${sensory === 'high-contrast' ? ' contrast' : ''}`;
  const zoom = joiner.prefs.textSize === 'largest' ? 1.16 : joiner.prefs.textSize === 'larger' ? 1.08 : 1;
  const showNav = !['signin','arc','launch'].includes(screen);
  const showDemo = !['signin','arc'].includes(screen);

  const render = () => {
    switch (screen) {
      case 'signin': return <SignIn joiner={joiner} onEnter={enter} />;
      case 'arc': return <EntryArc joiner={joiner} setJoiner={setJoiner} onDone={() => nav('home')} />;
      case 'home': return <Home joiner={joiner} nav={nav} setJoiner={setJoiner} />;
      case 'howiwork': return <HowIWork joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'kit': return <WelcomeKit joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'benefits': return <Benefits joiner={joiner} nav={nav} />;
      case 'documents': return <Documents joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'counteroffer': return <Counteroffer joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'sandbox': return <ProductSandbox joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'culture': return <CultureGame joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'kane': return <KaneChat joiner={joiner} nav={nav} />;
      case 'buddy': return <BuddyChat joiner={joiner} nav={nav} />;
      case 'library': return <LibraryView joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'team': return <TeamDir joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'launchpad': return <LaunchPadView joiner={joiner} nav={nav} />;
      case 'logistics': return <LogisticsView joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'vision': return <VisionView joiner={joiner} setJoiner={setJoiner} nav={nav} />;
      case 'launch': return <Launch joiner={joiner} nav={nav} />;
      default: return <Home joiner={joiner} nav={nav} setJoiner={setJoiner} />;
    }
  };

  return (
    <PrefsCtx.Provider value={joiner.prefs}>
      <style>{TOKENS}</style>
      <div className={rootClass} style={{ minHeight:'100vh', width:'100%', background:'#1a1830', display:'flex', justifyContent:'center', alignItems:'stretch' }}>
        {mode === 'hr' ? (
          <HRConsole joiner={joiner} setJoiner={setJoiner} onExit={() => setMode('joiner')} />
        ) : (
          <div style={{ position:'relative', width:'100%', maxWidth:440, height:'100vh', background:'var(--page)', boxShadow:'0 0 60px rgba(0,0,0,0.4)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ flex:1, minHeight:0, display:'flex', flexDirection:'column', zoom }}>
              {render()}
            </div>
            {showNav && <BottomNav screen={screen} nav={nav} />}
            {showDemo && <DemoPanel joiner={joiner} setJoiner={setJoiner} onReset={reset} onHR={() => setMode('hr')} />}
          </div>
        )}
      </div>
    </PrefsCtx.Provider>
  );
}
