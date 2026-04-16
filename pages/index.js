import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const FREE_LIMIT = 5;
const PREM_LIMIT = 50;
const PREM_DAYS = 30;
const FB = {
  apiKey:"AIzaSyDww7gi4QRRNm4t3PFQ9ny8a2WLV-V9OFU",
  authDomain:"mood2meet-85866.firebaseapp.com",
  projectId:"mood2meet-85866",
  storageBucket:"mood2meet-85866.firebasestorage.app",
  messagingSenderId:"455406578867",
  appId:"1:455406578867:web:fc5a2b6a00af996bc114c6"
};

const CATS = [
  {id:"Electronics",logo:"https://cdn.simpleicons.org/samsung/1428A0",e:"💻",g:"Physical"},
  {id:"Beauty & Skincare",logo:"https://cdn.simpleicons.org/sephora/000000",e:"💄",g:"Physical"},
  {id:"Home & Kitchen",logo:"https://cdn.simpleicons.org/ikea/0058A3",e:"🏠",g:"Physical"},
  {id:"Fitness",logo:"https://cdn.simpleicons.org/peloton/000000",e:"💪",g:"Physical"},
  {id:"Fashion",logo:"https://cdn.simpleicons.org/uniqlo/FF0000",e:"👗",g:"Physical"},
  {id:"Pet Supplies",logo:null,e:"🐾",g:"Physical"},
  {id:"Toys & Games",logo:"https://cdn.simpleicons.org/lego/E3000B",e:"🎮",g:"Physical"},
  {id:"Health & Wellness",logo:"https://cdn.simpleicons.org/headspace/F47D31",e:"❤️",g:"Physical"},
  {id:"Outdoor & Sports",logo:"https://cdn.simpleicons.org/decathlon/0082C3",e:"⛺",g:"Physical"},
  {id:"Food & Beverages",logo:"https://cdn.simpleicons.org/zomato/E23744",e:"🍔",g:"Physical"},
  {id:"Automotive",logo:"https://cdn.simpleicons.org/tesla/CC0000",e:"🚗",g:"Physical"},
  {id:"Books & Education",logo:"https://cdn.simpleicons.org/audible/F8991C",e:"📚",g:"Physical"},
  {id:"Jewelry",logo:null,e:"💍",g:"Physical"},
  {id:"Baby & Kids",logo:null,e:"👶",g:"Physical"},
  {id:"Tools & Hardware",logo:null,e:"🔧",g:"Physical"},
  {id:"Garden & Plants",logo:null,e:"🌱",g:"Physical"},
  {id:"Travel & Luggage",logo:"https://cdn.simpleicons.org/airbnb/FF5A5F",e:"✈️",g:"Physical"},
  {id:"Art & Crafts",logo:"https://cdn.simpleicons.org/etsy/F56400",e:"🎨",g:"Physical"},
  {id:"Office Supplies",logo:"https://cdn.simpleicons.org/notion/000000",e:"🗂️",g:"Physical"},
  {id:"Music & Audio",logo:"https://cdn.simpleicons.org/spotify/1DB954",e:"🎵",g:"Physical"},
  {id:"Mobile Apps",logo:"https://cdn.simpleicons.org/android/3DDC84",e:"📱",g:"Digital"},
  {id:"PC / Console Games",logo:"https://cdn.simpleicons.org/steam/000000",e:"🕹️",g:"Digital"},
  {id:"Online Courses",logo:"https://cdn.simpleicons.org/udemy/A435F0",e:"🎓",g:"Digital"},
  {id:"Software & SaaS",logo:"https://cdn.simpleicons.org/microsoftazure/0078D4",e:"💿",g:"Digital"},
  {id:"Website / Blog",logo:"https://cdn.simpleicons.org/wordpress/21759B",e:"🌐",g:"Digital"},
  {id:"YouTube Channel",logo:"https://cdn.simpleicons.org/youtube/FF0000",e:"📺",g:"Digital"},
  {id:"Instagram Page",logo:"https://cdn.simpleicons.org/instagram/E1306C",e:"📸",g:"Digital"},
  {id:"Podcast",logo:"https://cdn.simpleicons.org/spotify/1DB954",e:"🎙️",g:"Digital"},
  {id:"NFT & Crypto",logo:"https://cdn.simpleicons.org/ethereum/627EEA",e:"🖼️",g:"Digital"},
  {id:"Ebooks & Templates",logo:"https://cdn.simpleicons.org/amazon/FF9900",e:"📄",g:"Digital"},
  {id:"Freelance Services",logo:"https://cdn.simpleicons.org/fiverr/1DBF73",e:"🛠️",g:"Digital"},
  {id:"Dropshipping",logo:"https://cdn.simpleicons.org/shopify/96BF48",e:"🚚",g:"Digital"},
  {id:"Affiliate Marketing",logo:"https://cdn.simpleicons.org/amazon/FF9900",e:"🔗",g:"Digital"},
  {id:"Digital Products",logo:"https://cdn.simpleicons.org/gumroad/FF90E8",e:"📦",g:"Digital"},
  {id:"Any Other",logo:null,e:"✨",g:"Digital"},
];

const PLATS = [
  {id:"Amazon",logo:"https://cdn.simpleicons.org/amazon/FF9900",c:"#FF9900",g:"Ecommerce"},
  {id:"Flipkart",logo:"https://cdn.simpleicons.org/flipkart/2874F0",c:"#2874f0",g:"Ecommerce"},
  {id:"Meesho",logo:"https://cdn.simpleicons.org/meesho/F43397",c:"#e91e8c",g:"Ecommerce"},
  {id:"Shopify",logo:"https://cdn.simpleicons.org/shopify/96BF48",c:"#96bf48",g:"Ecommerce"},
  {id:"WooCommerce",logo:"https://cdn.simpleicons.org/woocommerce/7F54B3",c:"#7f54b3",g:"Ecommerce"},
  {id:"Etsy",logo:"https://cdn.simpleicons.org/etsy/F56400",c:"#f56400",g:"Ecommerce"},
  {id:"Nykaa",logo:"https://cdn.simpleicons.org/nykaa/FC2779",c:"#fc2779",g:"Ecommerce"},
  {id:"Myntra",logo:null,e:"👗",c:"#ff3f6c",g:"Ecommerce"},
  {id:"IndiaMART",logo:null,e:"🏭",c:"#0077b5",g:"Ecommerce"},
  {id:"JioMart",logo:null,e:"🛍️",c:"#003087",g:"Ecommerce"},
  {id:"Instagram",logo:"https://cdn.simpleicons.org/instagram/E1306C",c:"#e1306c",g:"Social"},
  {id:"Facebook",logo:"https://cdn.simpleicons.org/facebook/1877F2",c:"#1877f2",g:"Social"},
  {id:"YouTube",logo:"https://cdn.simpleicons.org/youtube/FF0000",c:"#ff0000",g:"Social"},
  {id:"TikTok",logo:"https://cdn.simpleicons.org/tiktok/000000",c:"#010101",g:"Social"},
  {id:"Pinterest",logo:"https://cdn.simpleicons.org/pinterest/E60023",c:"#e60023",g:"Social"},
  {id:"X (Twitter)",logo:"https://cdn.simpleicons.org/x/000000",c:"#14171a",g:"Social"},
  {id:"LinkedIn",logo:"https://cdn.simpleicons.org/linkedin/0077B5",c:"#0077b5",g:"Social"},
  {id:"WhatsApp Business",logo:"https://cdn.simpleicons.org/whatsapp/25D366",c:"#25d366",g:"Social"},
  {id:"Discord",logo:"https://cdn.simpleicons.org/discord/5865F2",c:"#5865f2",g:"Social"},
  {id:"Telegram",logo:"https://cdn.simpleicons.org/telegram/26A5E4",c:"#0088cc",g:"Social"},
  {id:"Google Play Store",logo:"https://cdn.simpleicons.org/googleplay/414141",c:"#01875f",g:"Stores"},
  {id:"Apple App Store",logo:"https://cdn.simpleicons.org/apple/000000",c:"#0071e3",g:"Stores"},
  {id:"Steam",logo:"https://cdn.simpleicons.org/steam/000000",c:"#1b2838",g:"Stores"},
  {id:"Udemy",logo:"https://cdn.simpleicons.org/udemy/A435F0",c:"#a435f0",g:"Courses"},
  {id:"Gumroad",logo:"https://cdn.simpleicons.org/gumroad/FF90E8",c:"#ff90e8",g:"Courses"},
  {id:"Fiverr",logo:"https://cdn.simpleicons.org/fiverr/1DBF73",c:"#1dbf73",g:"Freelance"},
  {id:"Upwork",logo:"https://cdn.simpleicons.org/upwork/6FDA44",c:"#14a800",g:"Freelance"},
  {id:"Zomato",logo:"https://cdn.simpleicons.org/zomato/E23744",c:"#e23744",g:"Food"},
  {id:"Own Website",logo:"https://cdn.simpleicons.org/googlechrome/4285F4",c:"#6366f1",g:"Other"},
  {id:"Any Other",logo:null,e:"✨",c:"#94a3b8",g:"Other"},
];

const ADPLATS = [
  {id:"g",n:"Google Ads",c:"#4285f4"},{id:"fb",n:"Facebook",c:"#1877f2"},
  {id:"ig",n:"Instagram",c:"#e1306c"},{id:"yt",n:"YouTube",c:"#ff0000"},
  {id:"tt",n:"TikTok",c:"#010101"},{id:"pin",n:"Pinterest",c:"#e60023"},
  {id:"sc",n:"Snapchat",c:"#f5c518"},{id:"tw",n:"X/Twitter",c:"#14171a"},
];

const S = {
  get:(k)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
};

let _auth = null;
async function getFA() {
  if(_auth) return _auth;
  const {initializeApp,getApps} = await import("firebase/app");
  const {getAuth} = await import("firebase/auth");
  const app = getApps().length ? getApps()[0] : initializeApp(FB);
  _auth = getAuth(app);
  return _auth;
}

export default function App() {
  const [screen,setScreen] = useState("loading");
  const [user,setUser] = useState(null);
  const [authMode,setAuthMode] = useState("login");
  const [form,setForm] = useState({email:"",password:"",name:""});
  const [saved,setSaved] = useState([]);
  const [showPw,setShowPw] = useState(false);
  const [gLoad,setGLoad] = useState(false);
  const [authErr,setAuthErr] = useState("");
  const [usage,setUsage] = useState(null);
  const [timer,setTimer] = useState(null);
  const timerRef = useRef(null);
  const [pf,setPf] = useState({name:"",cat:"",plat:""});
  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);
  const [loadStep,setLoadStep] = useState(0);
  const [err,setErr] = useState("");
  const [showAd,setShowAd] = useState(false);
  const [adT,setAdT] = useState(5);
  const adRef = useRef(null);
  const [showPrem,setShowPrem] = useState(false);
  const [showPay,setShowPay] = useState(false);
  const [payStep,setPayStep] = useState("form");
  const [selP,setSelP] = useState(null);
  const [platD,setPlatD] = useState({});
  const [platLoad,setPlatLoad] = useState(false);
  const [tab,setTab] = useState("profit");
  const [toast,setToast] = useState(null);
  const [showCats,setShowCats] = useState(false);
  const [showPlats,setShowPlats] = useState(false);
  const [showProf,setShowProf] = useState(false);
  const [profTab,setProfTab] = useState("main");
  const [q,setQ] = useState("");
  const [qLoad,setQLoad] = useState(false);
  const [qSent,setQSent] = useState(false);
  const [profF,setProfF] = useState({buy:"",sell:"",units:"1",fee:"10",ship:"60",ads:"200"});
  const [profR,setProfR] = useState(null);
  const [descD,setDescD] = useState(null);const [descL,setDescL] = useState(false);
  const [trendD,setTrendD] = useState(null);const [trendL,setTrendL] = useState(false);const [trendCat,setTrendCat] = useState("Fashion");
  const [compD,setCompD] = useState(null);const [compL,setCompL] = useState(false);
  const [suppD,setSuppD] = useState(null);const [suppL,setSuppL] = useState(false);
  const [starF,setStarF] = useState({budget:"5000",exp:"beginner"});
  const [starD,setStarD] = useState(null);const [starL,setStarL] = useState(false);
  const [begF,setBegF] = useState({budget:"5000",category:"Fashion"});
  const [begD,setBegD] = useState(null);const [begL,setBegL] = useState(false);
  const [invF,setInvF] = useState({buy:"",sell:"",units:"10",fee:"10",ship:"60",ads:"200"});
  const [invR,setInvR] = useState(null);
  const [salesD,setSalesD] = useState(null);const [salesL,setSalesL] = useState(false);
  const [priceD,setPriceD] = useState(null);const [priceL,setPriceL] = useState(false);
  const [invtF,setInvtF] = useState({units:"50"});
  const [invtD,setInvtD] = useState(null);const [invtL,setInvtL] = useState(false);
  const [revD,setRevD] = useState(null);const [revL,setRevL] = useState(false);
  const [nicheD,setNicheD] = useState(null);const [nicheL,setNicheL] = useState(false);
  const [history,setHistory] = useState([]);
  const [showHist,setShowHist] = useState(false);
  const [dark,setDark] = useState(false);
  const [fpF,setFpF] = useState({name:"",price:"",cat:"Fashion",plat:"Amazon"});
  const [fpR,setFpR] = useState(null);
  const [fpL,setFpL] = useState(false);
  const [fpShowCats,setFpShowCats] = useState(false);
  const [fpShowPlats,setFpShowPlats] = useState(false);
  const [gstSell,setGstSell] = useState("");
  const [gstRate,setGstRate] = useState("12");
  const [gstRes,setGstRes] = useState(null);
  const [shipW,setShipW] = useState("0.5");
  const [shipZone,setShipZone] = useState("zone1");
  const [shipCod,setShipCod] = useState("no");
  const [shipRes,setShipRes] = useState(null);

  const toggleTheme = () => { const nd=!dark; setDark(nd); S.set("yyp_theme",nd); };
  const showT = (m) => { setToast(m); setTimeout(()=>setToast(null),3500); };
  const todayK = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
  const curPlan = user ? (S.get("yyp_plan_"+user.email)||"free") : "free";
  const isGuest = !!user?.isGuest;
  const isLocked = curPlan!=="premium" && (!usage||usage.remaining<=0||!!timer);
  const platGroups = [...new Set(PLATS.map(p=>p.g))];

  const calcUsage = (u) => {
    if(!u?.email) return {plan:"free",remaining:FREE_LIMIT,total:FREE_LIMIT,used:0};
    const plan = S.get("yyp_plan_"+u.email)||"free";
    if(plan==="premium"){
      const pd = S.get("yyp_prem_"+u.email);
      if(!pd){S.set("yyp_plan_"+u.email,"free");return{plan:"free",remaining:FREE_LIMIT,total:FREE_LIMIT,used:0};}
      if(new Date()>new Date(pd.expiry)){S.set("yyp_plan_"+u.email,"free");return{plan:"free",remaining:FREE_LIMIT,total:FREE_LIMIT,expired:true};}
      const used = pd.used||0;
      return {plan,remaining:Math.max(0,PREM_LIMIT-used),total:PREM_LIMIT,used,expiry:pd.expiry};
    }
    const used = parseInt(S.get("yyp_daily_"+u.email+"_"+todayK())||"0");
    return {plan:"free",remaining:Math.max(0,FREE_LIMIT-used),total:FREE_LIMIT,used};
  };

  const addUsage = (u) => {
    if(!u?.email) return;
    const plan = S.get("yyp_plan_"+u.email)||"free";
    if(plan==="premium"){const pd=S.get("yyp_prem_"+u.email);if(pd)S.set("yyp_prem_"+u.email,{...pd,used:(pd.used||0)+1});}
    else{const k="yyp_daily_"+u.email+"_"+todayK();S.set(k,String(parseInt(S.get(k)||"0")+1));}
  };

  const startTimer = (u) => {
    if(!u) return;
    if((S.get("yyp_plan_"+u.email)||"free")==="premium"){setTimer(null);return;}
    const used = parseInt(S.get("yyp_daily_"+u.email+"_"+todayK())||"0");
    if(used<FREE_LIMIT){setTimer(null);return;}
    const hit = S.get("yyp_hit_"+u.email);
    if(!hit) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(()=>{
      const rem = hit+86400000-Date.now();
      if(rem<=0){clearInterval(timerRef.current);S.set("yyp_daily_"+u.email+"_"+todayK(),"0");S.set("yyp_hit_"+u.email,null);setTimer(null);showT("✅ 2 free analyses reset!");}
      else setTimer({h:Math.floor(rem/3600000),m:Math.floor((rem%3600000)/60000),s:Math.floor((rem%60000)/1000),total:rem});
    },1000);
  };

  const makeGuest = () => {
    const sg = S.get("yyp_guest");
    if(sg?.email){setUser(sg);setUsage(calcUsage(sg));return sg;}
    const g = {email:"guest_"+Date.now(),name:"Guest",photo:null,plan:"free",isGuest:true};
    S.set("yyp_guest",g);setUser(g);setUsage(calcUsage(g));return g;
  };

  useEffect(()=>{
    setSaved(S.get("yyp_accounts")||[]);
    setHistory(S.get("yyp_history")||[]);
    const savedTheme = S.get("yyp_theme");
    if(savedTheme === true) setDark(true);
    const sv = S.get("yyp_current");
    if(sv?.email){const u={...sv,plan:S.get("yyp_plan_"+sv.email)||"free"};setUser(u);setUsage(calcUsage(u));startTimer(u);}
    else makeGuest();
    setScreen("dashboard");
    (async()=>{try{const auth=await getFA();const{onAuthStateChanged}=await import("firebase/auth");onAuthStateChanged(auth,(fbU)=>{if(fbU){const u={email:fbU.email,name:fbU.displayName||fbU.email.split("@")[0],photo:fbU.photoURL||null,plan:S.get("yyp_plan_"+fbU.email)||"free"};S.set("yyp_current",u);S.set("yyp_guest",null);setUser(u);setUsage(calcUsage(u));startTimer(u);}});}catch{}})();
    return ()=>clearInterval(timerRef.current);
  },[]);

  useEffect(()=>{if(!user||isGuest)return;startTimer(user);return()=>clearInterval(timerRef.current);},[user?.email]);
  useEffect(()=>{if(loading){setLoadStep(0);[1,2,3].forEach((s,i)=>setTimeout(()=>setLoadStep(s),(i+1)*1200));}},[loading]);

  const saveAcc = (email,name,pw,photo) => {
    const list = S.get("yyp_accounts")||[];
    const i = list.findIndex(a=>a.email===email);
    const acc = {email,name,password:pw||"",photo:photo||null};
    if(i>=0)list[i]=acc; else list.push(acc);
    S.set("yyp_accounts",list);setSaved([...list]);
  };

  const handleGoogle = async () => {
    setGLoad(true);setAuthErr("");
    try{
      const auth = await getFA();
      const {signInWithPopup,GoogleAuthProvider} = await import("firebase/auth");
      const r = await signInWithPopup(auth,new GoogleAuthProvider());
      const u = {email:r.user.email,name:r.user.displayName,photo:r.user.photoURL,plan:S.get("yyp_plan_"+r.user.email)||"free"};
      if(S.get("yyp_pending_prem")){S.set("yyp_pending_prem",null);const exp=new Date(Date.now()+PREM_DAYS*86400000).toISOString();S.set("yyp_prem_"+u.email,{expiry:exp,used:0});S.set("yyp_plan_"+u.email,"premium");u.plan="premium";}
      S.set("yyp_current",u);S.set("yyp_guest",null);saveAcc(r.user.email,r.user.displayName,"",r.user.photoURL);
      setUser(u);setUsage(calcUsage(u));startTimer(u);setScreen("dashboard");showT("✅ Signed in!");
    }catch(e){setAuthErr(e.code==="auth/popup-closed-by-user"?"Cancelled.":"Google sign-in failed.");}
    setGLoad(false);
  };

  const applyPending = (email) => {
    if(S.get("yyp_pending_prem")){S.set("yyp_pending_prem",null);const exp=new Date(Date.now()+PREM_DAYS*86400000).toISOString();S.set("yyp_prem_"+email,{expiry:exp,used:0});S.set("yyp_plan_"+email,"premium");return "premium";}
    return S.get("yyp_plan_"+email)||"free";
  };

  const handleAuth = async () => {
    if(!form.email||!form.password){setAuthErr("Please fill all fields");return;}
    if(authMode==="signup"&&!form.name){setAuthErr("Name required");return;}
    if(form.password.length<6){setAuthErr("Password must be 6+ chars");return;}
    setAuthErr("");
    try{
      const auth = await getFA();
      if(authMode==="signup"){
        const {createUserWithEmailAndPassword,updateProfile} = await import("firebase/auth");
        const r = await createUserWithEmailAndPassword(auth,form.email,form.password);
        await updateProfile(r.user,{displayName:form.name});
        const plan = applyPending(form.email);
        const u = {email:form.email,name:form.name,photo:null,plan};
        S.set("yyp_current",u);S.set("yyp_guest",null);saveAcc(form.email,form.name,form.password,null);
        setUser(u);setUsage(calcUsage(u));setScreen("dashboard");showT(plan==="premium"?"🎉 Premium activated!":"✅ Welcome!");
      } else {
        const {signInWithEmailAndPassword} = await import("firebase/auth");
        const r = await signInWithEmailAndPassword(auth,form.email,form.password);
        const plan = applyPending(form.email);
        const u = {email:r.user.email,name:r.user.displayName||form.email.split("@")[0],photo:null,plan};
        S.set("yyp_current",u);S.set("yyp_guest",null);saveAcc(form.email,u.name,form.password,null);
        setUser(u);setUsage(calcUsage(u));startTimer(u);setScreen("dashboard");showT(plan==="premium"?"🎉 Premium activated!":"✅ Welcome back!");
      }
    }catch(e){
      const allU = S.get("yyp_users")||{};
      if(authMode==="signup"){
        if(allU[form.email]){setAuthErr("Email already registered.");return;}
        allU[form.email]={email:form.email,name:form.name,password:form.password};S.set("yyp_users",allU);
        const plan = applyPending(form.email);
        const u = {email:form.email,name:form.name,photo:null,plan};
        S.set("yyp_current",u);S.set("yyp_guest",null);saveAcc(form.email,form.name,form.password,null);
        setUser(u);setUsage(calcUsage(u));setScreen("dashboard");showT("✅ Account created!");
      } else {
        const found = allU[form.email];
        if(!found){setAuthErr("No account found. Sign Up first.");return;}
        if(found.password!==form.password){setAuthErr("Wrong password.");return;}
        const plan = applyPending(form.email);
        const u = {email:found.email,name:found.name,photo:null,plan};
        S.set("yyp_current",u);S.set("yyp_guest",null);saveAcc(form.email,found.name,form.password,null);
        setUser(u);setUsage(calcUsage(u));startTimer(u);setScreen("dashboard");showT("✅ Welcome back!");
      }
    }
  };

  const handleLogout = async () => {
    try{const auth=await getFA();const{signOut}=await import("firebase/auth");await signOut(auth);}catch{}
    S.set("yyp_current",null);clearInterval(timerRef.current);
    makeGuest();setResult(null);setTimer(null);setScreen("dashboard");showT("Logged out.");
  };

  const quickLogin = async (acc) => {
    setAuthErr("");
    if(!acc.password){handleGoogle();return;}
    try{const auth=await getFA();const{signInWithEmailAndPassword}=await import("firebase/auth");await signInWithEmailAndPassword(auth,acc.email,acc.password);}
    catch{const allU=S.get("yyp_users")||{};const f=allU[acc.email];if(f&&f.password===acc.password){const plan=S.get("yyp_plan_"+f.email)||"free";const u={email:f.email,name:f.name,photo:null,plan};S.set("yyp_current",u);S.set("yyp_guest",null);setUser(u);setUsage(calcUsage(u));startTimer(u);setScreen("dashboard");showT("✅ Welcome back!");}else setAuthErr("Login failed.");}
  };

  const handleForgotPw = async () => {
    if(!form.email){setAuthErr("Enter email first");return;}
    try{const auth=await getFA();const{sendPasswordResetEmail}=await import("firebase/auth");await sendPasswordResetEmail(auth,form.email);showT("✅ Reset email sent!");setAuthErr("");}
    catch{setAuthErr("Could not send reset email.");}
  };

  const showInterAd = () => new Promise(resolve=>{
    setAdT(5);setShowAd(true);let t=5;
    adRef.current=setInterval(()=>{t--;setAdT(t);if(t<=0)clearInterval(adRef.current);},1000);
    window._adRes=resolve;
  });
  const closeAd = () => {
    if(adT>0) return;
    clearInterval(adRef.current);setShowAd(false);
    if(window._adRes){window._adRes();window._adRes=null;}
  };

  const runAnalysis = async () => {
    if(!pf.name||!pf.cat||!pf.plat){setErr("Please fill all fields");return;}
    setErr("");
    if(calcUsage(user).remaining<=0){setShowPrem(true);return;}
    if(curPlan==="free") await showInterAd();
    setLoading(true);setResult(null);setSelP(null);setPlatD({});
    try{
      const res = await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:pf.name,category:pf.cat,platform:pf.plat})});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error||"Failed");
      addUsage(user);
      const ni = calcUsage(user);setUsage(ni);
      if(ni.remaining<=0&&curPlan==="free"&&!S.get("yyp_hit_"+user.email)){S.set("yyp_hit_"+user.email,Date.now());setTimeout(()=>startTimer(user),300);}
      setResult(data);showT("✅ Analysis complete!");
      const he={id:Date.now(),name:pf.name,cat:pf.cat,plat:pf.plat,result:data,time:new Date().toLocaleDateString("en-IN")};
      const nh=[he,...(S.get("yyp_history")||[]).filter(h=>h.name!==pf.name)].slice(0,10);
      S.set("yyp_history",nh);setHistory(nh);
    }catch(e){setErr("Analysis failed: "+e.message);}
    setLoading(false);
  };

  const fetchPlat = async (pid) => {
    if(isLocked){setShowPrem(true);return;}
    setSelP(pid);if(platD[pid])return;setPlatLoad(true);
    try{
      const pl = ADPLATS.find(p=>p.id===pid);
      const ctrl = new AbortController();const to=setTimeout(()=>ctrl.abort(),25000);
      const res = await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:pf.name,category:pf.cat,platform:pl.n,mode:"ads_platform"}),signal:ctrl.signal});
      clearTimeout(to);
      const data = await res.json();if(data.error)throw new Error(data.error);
      setPlatD(prev=>({...prev,[pid]:data}));
    }catch(e){showT(e.name==="AbortError"?"Timed out.":"Failed. Try again.");setSelP(null);}
    setPlatLoad(false);
  };

  const apiCall = async (mode,extra={}) => {
    if(isLocked){setShowPrem(true);throw new Error("locked");}
    const res = await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:pf.name||"general",category:pf.cat||"Fashion",platform:pf.plat||"Amazon",mode,...extra})});
    if(!res.ok) throw new Error("err");
    return res.json();
  };

  const calcP = () => {
    const b=parseFloat(profF.buy)||0,s=parseFloat(profF.sell)||0,u=parseInt(profF.units)||1;
    const f=parseFloat(profF.fee)||0,sh=parseFloat(profF.ship)||0,a=parseFloat(profF.ads)||0;
    const cut=s*(f/100),np=s-b-cut-sh,tp=(np*u)-a,tc=(b*u)+a;
    setProfR({profit:tp.toFixed(0),np:np.toFixed(0),roi:tc>0?((tp/tc)*100).toFixed(1):0,margin:s>0?((np/s)*100).toFixed(1):0,cost:tc.toFixed(0),rev:(s*u).toFixed(0),be:np>0?Math.ceil(a/np):0});
  };

  const calcI = () => {
    const b=parseFloat(invF.buy)||0,s=parseFloat(invF.sell)||0,u=parseInt(invF.units)||1;
    const f=parseFloat(invF.fee)||0,sh=parseFloat(invF.ship)||0,a=parseFloat(invF.ads)||0;
    const cut=s*(f/100),np=s-b-cut-sh,tp=(np*u)-a,tc=(b*u)+a;
    setInvR({profit:tp.toFixed(0),np:np.toFixed(0),roi:tc>0?((tp/tc)*100).toFixed(1):0,margin:s>0?((np/s)*100).toFixed(1):0,cost:tc.toFixed(0),rev:(s*u).toFixed(0),be:np>0?Math.ceil(a/np):0});
  };

  const copyTxt = (text,lbl) => {
    if(curPlan!=="premium"){setShowPrem(true);return;}
    try{navigator.clipboard.writeText(text).then(()=>showT("📋 Copied: "+lbl));}
    catch{const el=document.createElement("textarea");el.value=text;document.body.appendChild(el);el.select();document.execCommand("copy");document.body.removeChild(el);showT("📋 Copied: "+lbl);}
  };

  const activatePrem = () => {
    if(isGuest){setPayStep("make_account");return;}
    const exp = new Date(Date.now()+PREM_DAYS*86400000).toISOString();
    S.set("yyp_prem_"+user.email,{expiry:exp,used:0});S.set("yyp_plan_"+user.email,"premium");
    S.set("yyp_hit_"+user.email,null);clearInterval(timerRef.current);setTimer(null);
    const u = {...user,plan:"premium"};setUser(u);setUsage(calcUsage(u));
    setPayStep("success");showT("🎉 Premium activated!");
  };

  const handlePay = async () => {
    setPayStep("processing");
    try{
      const kr = await fetch("/api/payment");const kd = await kr.json();
      if(!kd.key){await new Promise(r=>setTimeout(r,1500));activatePrem();return;}
      const loaded = await new Promise(resolve=>{if(window.Razorpay){resolve(true);return;}const s=document.createElement("script");s.src="https://checkout.razorpay.com/v1/checkout.js";s.onload=()=>resolve(true);s.onerror=()=>resolve(false);document.body.appendChild(s);});
      if(!loaded){showT("Payment failed to load");setPayStep("form");return;}
      setPayStep("form");
      const rzp = new window.Razorpay({key:kd.key,amount:94900,currency:"INR",name:"YesYouPro",description:"Premium 30 Days",handler:(r)=>{if(r.razorpay_payment_id)activatePrem();},prefill:{name:isGuest?"":user?.name||"",email:isGuest?"":user?.email||""},theme:{color:"#6366f1"},modal:{ondismiss:()=>{setPayStep("form");showT("Payment cancelled.");}}});
      rzp.on("payment.failed",()=>{setPayStep("form");showT("Payment failed.");});rzp.open();
    }catch{await new Promise(r=>setTimeout(r,1000));activatePrem();}
  };

  const sendQ = async () => {
    if(!q.trim()){showT("Please type your question");return;}
    setQLoad(true);
    try{await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:user?.email,name:user?.name,message:q,plan:curPlan})});setQSent(true);setQ("");showT("✅ Question sent!");}
    catch{showT("Failed. Try again.");}
    setQLoad(false);
  };

  const STEPS = ["Product data received","Analyzing market trends","Generating AI insights","Creating viral hooks"];

  const LockBox = () => (
    <div onClick={()=>setShowPrem(true)} style={{position:"absolute",inset:0,background:"rgba(2,8,23,.9)",borderRadius:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10,backdropFilter:"blur(4px)"}}>
      <div style={{fontSize:36,marginBottom:8}}>🔒</div>
      <div style={{fontWeight:800,fontSize:14,color:"#f8fafc",marginBottom:12}}>Premium Feature</div>
      <button onClick={(e)=>{e.stopPropagation();setShowPrem(true);}} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:10,padding:"9px 22px",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>💎 Unlock ₹949</button>
    </div>
  );

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#e8ecf1;font-family:'Inter',sans-serif;color:#1a1a2e;}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scaleIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .fa{animation:fadeIn .4s ease}
    .sp{width:36px;height:36px;border:3px solid rgba(99,102,241,.2);border-top:3px solid #6366f1;border-radius:50%;animation:spin .8s linear infinite}
    .ssp{width:20px;height:20px;border:2px solid rgba(99,102,241,.2);border-top:2px solid #6366f1;border-radius:50%;animation:spin .8s linear infinite;margin:18px auto}
    .toast{position:fixed;top:22px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:10px 24px;border-radius:100px;font-size:13px;font-weight:600;z-index:9999;animation:fadeIn .3s ease;white-space:nowrap;box-shadow:0 6px 24px rgba(16,185,129,.4)}
    .neu{min-height:100vh;background:#e8ecf1;display:flex;align-items:center;justify-content:center;padding:18px}
    .nc{background:#e8ecf1;border-radius:28px;padding:30px 22px;width:100%;max-width:400px;box-shadow:8px 8px 20px #c8cdd5,-8px -8px 20px #fff}
    .navt{width:68px;height:68px;background:#e8ecf1;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;box-shadow:6px 6px 14px #c8cdd5,-6px -6px 14px #fff;overflow:hidden}
    .navt img{width:100%;height:100%;object-fit:cover;border-radius:50%}
    .ntitle{font-size:19px;font-weight:800;color:#1a1a2e;margin-bottom:2px}
    .nsub{color:#8b8fa8;font-size:12px;margin-bottom:16px}
    .ntabs{display:flex;background:#e8ecf1;border-radius:12px;padding:3px;margin-bottom:13px;box-shadow:inset 4px 4px 10px #c8cdd5,inset -4px -4px 10px #fff}
    .ntab{flex:1;padding:8px 0;background:none;border:none;color:#8b8fa8;font-size:13px;font-weight:600;cursor:pointer;border-radius:10px;font-family:Inter,sans-serif;transition:all .2s}
    .ntab.on{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:3px 3px 8px rgba(99,102,241,.4)}
    .niw{position:relative;margin-bottom:9px}
    .nii{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:14px;pointer-events:none}
    .ni{width:100%;background:#e8ecf1;border:none;border-radius:12px;padding:11px 13px 11px 38px;color:#1a1a2e;font-size:13px;font-family:Inter,sans-serif;outline:none;box-shadow:inset 4px 4px 10px #c8cdd5,inset -4px -4px 10px #fff}
    .ni::placeholder{color:#adb5bd}
    .eye{position:absolute;right:11px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px}
    .nerr{color:#e53e3e;font-size:11px;margin:-4px 0 8px 3px}
    .nbtn{width:100%;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:12px;padding:12px 0;color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:Inter,sans-serif;box-shadow:3px 3px 10px rgba(99,102,241,.4);margin-bottom:9px}
    .gbtn{width:100%;background:#e8ecf1;border:none;border-radius:12px;padding:10px 0;color:#4a5568;font-weight:700;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:Inter,sans-serif;box-shadow:4px 4px 10px #c8cdd5,-4px -4px 10px #fff;margin-bottom:9px}
    .dvl{display:flex;align-items:center;gap:10px;margin:9px 0}
    .dl{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c8cdd5,transparent)}
    .dt{color:#adb5bd;font-size:10px;font-weight:600}
    .sw-r{margin-bottom:11px}
    .slbl{color:#8b8fa8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
    .sacc{display:flex;align-items:center;gap:8px;background:#e8ecf1;border:none;border-radius:11px;padding:8px 10px;margin-bottom:5px;cursor:pointer;width:100%;text-align:left;box-shadow:3px 3px 8px #c8cdd5,-3px -3px 8px #fff}
    .savt{width:30px;height:30px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#fff;flex-shrink:0;overflow:hidden}
    .savt img{width:100%;height:100%;object-fit:cover}
    .si{flex:1;min-width:0}
    .sn{font-size:11px;font-weight:700;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .se{font-size:10px;color:#8b8fa8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .rem{display:flex;align-items:center;gap:6px;margin-bottom:9px}
    .rem input{width:15px;height:15px;accent-color:#6366f1}
    .rem label{color:#8b8fa8;font-size:11px;flex:1}
    .fgot{color:#6366f1;font-size:11px;font-weight:600;cursor:pointer}
    .swtxt{color:#8b8fa8;font-size:11px;text-align:center;margin-top:9px}
    .swlnk{color:#6366f1;cursor:pointer;font-weight:700}
    .dash{min-height:100vh;background:#020817;color:#f8fafc}
    .nav{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.04);background:rgba(2,8,23,.95);backdrop-filter:blur(20px);position:sticky;top:0;z-index:100}
    .logo{font-weight:900;font-size:16px;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .upill{background:rgba(15,23,42,.9);border:1px solid #1e293b;border-radius:100px;padding:4px 11px;font-size:11px;display:flex;align-items:center;gap:6px}
    .navr{display:flex;align-items:center;gap:6px}
    .upbtn{background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:100px;padding:6px 13px;color:#fff;font-weight:800;font-size:11px;cursor:pointer;font-family:Inter,sans-serif}
    .avt{width:32px;height:32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#fff;overflow:hidden;cursor:pointer;border:2px solid rgba(99,102,241,.4)}
    .avt img{width:100%;height:100%;object-fit:cover}
    .dc{max-width:860px;margin:0 auto;padding:24px 13px 70px}
    .hero{text-align:center;margin-bottom:28px}
    .hbadge{display:inline-flex;align-items:center;gap:5px;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.3);border-radius:100px;padding:4px 13px;font-size:10px;color:#a5b4fc;font-weight:700;margin-bottom:11px}
    .htitle{font-weight:900;font-size:clamp(20px,5vw,40px);line-height:1.1;margin-bottom:9px;letter-spacing:-1px}
    .grad{background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hsub{color:#64748b;font-size:12px;max-width:440px;margin:0 auto;line-height:1.6}
    .tbox{background:linear-gradient(135deg,rgba(239,68,68,.1),rgba(245,158,11,.06));border:1px solid rgba(239,68,68,.3);border-radius:16px;padding:17px;margin-bottom:16px;text-align:center}
    .ttitle{font-size:13px;font-weight:800;color:#ef4444;margin-bottom:3px}
    .tsub{font-size:11px;color:#64748b;margin-bottom:13px}
    .trow{display:flex;align-items:center;justify-content:center;gap:7px}
    .tunit{background:rgba(15,23,42,.8);border:1px solid rgba(239,68,68,.2);border-radius:9px;padding:8px 11px;min-width:50px}
    .tnum{font-size:22px;font-weight:900;color:#ef4444;font-variant-numeric:tabular-nums;line-height:1}
    .tlbl{font-size:9px;color:#64748b;font-weight:600;margin-top:2px;text-transform:uppercase}
    .tsep{font-size:18px;font-weight:900;color:#ef4444;margin-bottom:7px}
    .tprog{height:3px;background:#1e293b;border-radius:100px;overflow:hidden;margin-top:9px}
    .tpf{height:100%;background:linear-gradient(90deg,#ef4444,#f59e0b);transition:width 1s linear}
    .bnr-g{background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.2);border-radius:11px;padding:9px 13px;margin-bottom:13px;display:flex;align-items:center;justify-content:space-between;gap:7px}
    .bnr-r{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:11px;padding:9px 13px;margin-bottom:13px;display:flex;align-items:center;justify-content:space-between;gap:7px}
    .icard{background:rgba(15,23,42,.8);border:1px solid rgba(99,102,241,.15);border-radius:18px;padding:18px 14px;margin-bottom:26px}
    .ict{font-weight:800;font-size:15px;margin-bottom:15px;color:#f8fafc}
    .ilbl{font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:5px}
    .di{width:100%;background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:9px 11px;color:#f8fafc;font-size:13px;font-family:Inter,sans-serif;outline:none;transition:border-color .2s}
    .di:focus{border-color:#6366f1}
    .pick-btn{width:100%;background:rgba(15,23,42,.7);border:1px solid #1e293b;border-radius:10px;padding:10px 13px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;color:#64748b;font-size:12px;font-weight:600;font-family:Inter,sans-serif;transition:all .2s;text-align:left;margin-bottom:4px}
    .pick-btn.sel{border-color:rgba(99,102,241,.4);color:#f8fafc;background:rgba(99,102,241,.08)}
    .pick-drop{background:#0a1228;border:1px solid rgba(99,102,241,.2);border-radius:11px;padding:11px 9px;animation:fadeIn .2s ease;max-height:280px;overflow-y:auto;margin-bottom:9px}
    .pick-drop::-webkit-scrollbar{width:3px}
    .pick-drop::-webkit-scrollbar-thumb{background:#1e293b;border-radius:10px}
    .pg-lbl{font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.7px;margin-bottom:5px;margin-top:9px}
    .pg-lbl:first-child{margin-top:0}
    .chips{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:3px}
    .chip{display:flex;align-items:center;gap:4px;padding:4px 9px;border-radius:7px;border:1px solid #1e293b;background:rgba(15,23,42,.6);cursor:pointer;font-size:11px;font-weight:500;color:#94a3b8;font-family:Inter,sans-serif;transition:all .15s}
    .chip:hover{border-color:rgba(99,102,241,.4);color:#a5b4fc}
    .chip.on{color:#fff;border-color:transparent;font-weight:700}
    .errbanner{background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.25);border-radius:9px;padding:8px 11px;color:#ef4444;font-size:11px;margin-bottom:11px}
    .abtn{width:100%;background:linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7);border:none;border-radius:12px;padding:13px 0;color:#fff;font-weight:800;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 6px 22px rgba(99,102,241,.3);font-family:Inter,sans-serif;margin-top:13px}
    .anote{font-size:10px;opacity:.6}
    .loverlay{position:fixed;inset:0;background:rgba(2,8,23,.97);display:flex;align-items:center;justify-content:center;z-index:7000}
    .lcard{background:rgba(15,23,42,.95);border:1px solid rgba(99,102,241,.25);border-radius:18px;padding:34px 26px;text-align:center;max-width:310px;width:90%}
    .lbrain{font-size:46px;margin-bottom:13px;animation:pulse 1.2s ease infinite}
    .lt1{font-weight:900;font-size:17px;margin-bottom:3px;color:#f8fafc}
    .lt2{color:#64748b;font-size:11px;margin-bottom:17px}
    .lstps{display:flex;flex-direction:column;gap:5px}
    .lstp{display:flex;align-items:center;gap:7px;padding:5px 9px;border-radius:7px;border:1px solid transparent;font-size:11px;color:#475569;transition:all .3s}
    .lstp.done{color:#10b981;border-color:rgba(16,185,129,.2);background:rgba(16,185,129,.05)}
    .lstp.act{color:#a5b4fc;border-color:rgba(99,102,241,.25);background:rgba(99,102,241,.07)}
    .gcard{background:rgba(15,23,42,.75);border:1px solid #1e293b;border-radius:13px;padding:15px;margin-bottom:8px}
    .gct{font-weight:800;font-size:12px;color:#e2e8f0}
    .gctx{color:#94a3b8;line-height:1.7;font-size:12px}
    .mrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:11px}
    .mc{background:rgba(15,23,42,.85);border:1px solid #1e293b;border-radius:12px;padding:13px 10px;position:relative;overflow:hidden}
    .mc::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#6366f1,#a855f7)}
    .ml{font-size:9px;color:#64748b;margin-bottom:5px;font-weight:600;text-transform:uppercase}
    .mv{font-weight:900;font-size:15px}
    .tcol{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-bottom:8px}
    .hi{display:flex;align-items:flex-start;gap:7px;color:#cbd5e1;font-size:12px;margin-bottom:7px}
    .hn{min-width:20px;height:20px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;flex-shrink:0}
    .kwg{display:flex;flex-wrap:wrap;gap:5px}
    .kwc{background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.22);color:#a5b4fc;border-radius:100px;padding:3px 9px;font-size:11px;cursor:pointer}
    .cpybtn{background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:5px;padding:2px 7px;cursor:pointer;color:#a5b4fc;font-size:10px;font-weight:600;font-family:Inter,sans-serif;margin-left:5px}
    .psec{background:rgba(15,23,42,.8);border:1px solid rgba(245,158,11,.2);border-radius:16px;padding:17px 13px;margin-bottom:8px;position:relative}
    .psh{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
    .pst{font-weight:800;font-size:13px;color:#e2e8f0}
    .pss{color:#64748b;font-size:10px;margin-bottom:13px}
    .pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:9px}
    .ppb{background:rgba(2,8,23,.7);border:1.5px solid #1e293b;border-radius:10px;padding:9px 3px 7px;text-align:center;cursor:pointer;transition:all .2s;position:relative}
    .ppb:hover{transform:translateY(-1px)}
    .ppb.on{background:rgba(99,102,241,.1)}
    .pplk{position:absolute;top:2px;right:3px;font-size:8px}
    .pdet{background:rgba(2,8,23,.7);border:1px solid rgba(99,102,241,.2);border-radius:11px;padding:14px 12px;margin-top:9px;animation:fadeIn .4s ease}
    .pdb{margin-bottom:12px}
    .pdt{font-size:9px;font-weight:800;color:#a5b4fc;margin-bottom:5px;text-transform:uppercase}
    .pdtx{color:#94a3b8;font-size:11px;line-height:1.7}
    .pdstps{display:flex;flex-direction:column;gap:3px}
    .pdstep{display:flex;align-items:flex-start;gap:6px;background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.1);border-radius:6px;padding:5px 8px;color:#cbd5e1;font-size:11px}
    .pdsn{min-width:14px;height:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;flex-shrink:0}
    .pdch{display:flex;flex-wrap:wrap;gap:3px}
    .pdchip{background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);color:#a5b4fc;border-radius:5px;padding:2px 6px;font-size:10px}
    .ftw{margin-bottom:16px}
    .fglbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;margin-bottom:5px;margin-top:11px}
    .ftabs{display:flex;gap:5px;overflow-x:auto;padding-bottom:2px}
    .ftabs::-webkit-scrollbar{height:2px}
    .ftabs::-webkit-scrollbar-thumb{background:#1e293b;border-radius:10px}
    .ftab{flex-shrink:0;padding:6px 11px;background:rgba(15,23,42,.7);border:1px solid #1e293b;border-radius:100px;color:#64748b;font-size:11px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s;white-space:nowrap}
    .ftab.on{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-color:transparent;box-shadow:0 3px 11px rgba(99,102,241,.3)}
    .ftab:hover:not(.on){border-color:rgba(99,102,241,.3);color:#a5b4fc}
    .fbox{background:rgba(15,23,42,.8);border:1px solid rgba(99,102,241,.12);border-radius:16px;padding:17px 13px;margin-bottom:9px;position:relative}
    .prow{display:grid;grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:7px;margin-bottom:10px}
    .pfield{display:flex;flex-direction:column;gap:3px}
    .pfield label{font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase}
    .pfield input,.pfield select{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:8px 9px;color:#f8fafc;font-size:12px;font-family:Inter,sans-serif;outline:none}
    .pfield input:focus,.pfield select:focus{border-color:#6366f1}
    .presult{display:grid;grid-template-columns:repeat(auto-fit,minmax(95px,1fr));gap:7px;margin-top:9px;animation:fadeIn .4s ease}
    .prc{background:rgba(2,8,23,.6);border:1px solid #1e293b;border-radius:9px;padding:10px;text-align:center}
    .prl{font-size:9px;color:#64748b;margin-bottom:3px;font-weight:600;text-transform:uppercase}
    .prv{font-size:14px;font-weight:900}
    .cbtn{background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:9px;padding:9px 17px;color:#fff;font-weight:700;font-size:12px;cursor:pointer;font-family:Inter,sans-serif}
    .gbtn2{width:100%;border:none;border-radius:10px;padding:10px 0;color:#fff;font-weight:700;font-size:12px;cursor:pointer;font-family:Inter,sans-serif;margin-top:9px}
    .cc{background:rgba(15,23,42,.8);border:1px solid #1e293b;border-radius:11px;padding:12px;margin-bottom:7px}
    .ccrow{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:7px}
    .ccbox{background:rgba(2,8,23,.5);border-radius:6px;padding:7px}
    .ccbt{font-size:9px;color:#64748b;margin-bottom:3px;font-weight:700;text-transform:uppercase}
    .cpt{font-size:10px;color:#94a3b8;padding:2px 0;display:flex;gap:4px}
    .tgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:7px;margin-top:10px}
    .tcard{background:rgba(15,23,42,.8);border:1px solid #1e293b;border-radius:11px;padding:12px}
    .trnk{width:21px;height:21px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;margin-bottom:5px}
    .tc{background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);color:#10b981;border-radius:100px;padding:1px 5px;font-size:9px}
    .sc{background:rgba(15,23,42,.8);border:1px solid rgba(16,185,129,.15);border-radius:11px;padding:12px;margin-bottom:7px}
    .schip{background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);color:#10b981;border-radius:5px;padding:2px 7px;font-size:10px;font-weight:600}
    .slink{display:inline-block;margin-top:5px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border-radius:6px;padding:4px 10px;font-size:10px;font-weight:600;text-decoration:none}
    .mov{position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;z-index:8000;backdrop-filter:blur(8px)}
    .pm{background:linear-gradient(180deg,#0f172a,#020817);border:1px solid rgba(245,158,11,.25);border-radius:22px;padding:26px 19px;max-width:420px;width:92%;text-align:center;animation:scaleIn .3s ease;max-height:90vh;overflow-y:auto}
    .pb2{display:inline-block;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:100px;padding:4px 13px;font-size:10px;font-weight:800;color:#fff;margin-bottom:8px}
    .ptitle{font-weight:900;font-size:19px;margin-bottom:3px;color:#f8fafc}
    .ppr{font-weight:900;font-size:32px;background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:3px}
    .ppr span{font-size:11px;-webkit-text-fill-color:#94a3b8}
    .phigh{background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.25);border-radius:10px;padding:9px;margin-bottom:12px;color:#10b981;font-size:11px;font-weight:600;line-height:1.6;text-align:left}
    .pflist{display:flex;flex-direction:column;gap:4px;margin-bottom:15px;text-align:left}
    .pfi{color:#cbd5e1;font-size:11px;padding:5px 9px;background:rgba(255,255,255,.02);border-radius:7px;border:1px solid rgba(255,255,255,.03)}
    .pbtn2{width:100%;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:11px;padding:12px 0;color:#fff;font-weight:800;font-size:13px;cursor:pointer;margin-bottom:6px;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;gap:6px}
    .mcan{background:none;border:none;color:#475569;font-family:Inter,sans-serif;font-size:11px;cursor:pointer;padding:5px 0;width:100%}
    .paybox{background:#020817;border:1px solid #1e293b;border-radius:10px;padding:11px;margin-bottom:9px;text-align:left}
    .pr2{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);color:#94a3b8;font-size:11px}
    .pr2:last-child{border-bottom:none}
    .sfeat{background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);border-radius:10px;padding:10px;margin:9px 0 14px;text-align:left}
    .sfi2{color:#10b981;font-size:11px;padding:2px 0;font-weight:500}
    .adov{position:fixed;inset:0;background:rgba(0,0,0,.97);display:flex;align-items:center;justify-content:center;z-index:9000}
    .adbox{background:linear-gradient(180deg,#0f172a,#020817);border:1px solid #1e293b;border-radius:17px;padding:26px 19px;max-width:330px;width:92%;text-align:center;position:relative;animation:scaleIn .3s ease}
    .adprog{height:3px;background:#1e293b;border-radius:100px;margin:11px 0 0;overflow:hidden}
    .adpf{height:100%;background:linear-gradient(90deg,#6366f1,#a855f7);transition:width 1s linear}
    .adcl{display:block;margin:7px auto 0;background:none;border:1px solid #2d3748;border-radius:100px;padding:5px 15px;color:#94a3b8;cursor:pointer;font-size:11px;font-family:Inter,sans-serif}
    .prov{position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:flex-end;justify-content:center;z-index:8500;backdrop-filter:blur(6px)}
    .prm{background:linear-gradient(180deg,#0f172a,#020817);border:1px solid rgba(99,102,241,.2);border-radius:22px 22px 0 0;padding:22px 17px 34px;width:100%;max-width:460px;animation:slideUp .3s ease}
    .prh{display:flex;align-items:center;justify-content:space-between;margin-bottom:17px}
    .pru{display:flex;align-items:center;gap:9px}
    .pra{width:42px;height:42px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;color:#fff;overflow:hidden;flex-shrink:0}
    .pra img{width:100%;height:100%;object-fit:cover}
    .prn{font-weight:800;font-size:14px;color:#f8fafc}
    .pre{font-size:11px;color:#64748b;margin-top:1px}
    .prpl{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;margin-top:3px}
    .prcl{background:rgba(255,255,255,.05);border:none;border-radius:50%;width:29px;height:29px;cursor:pointer;color:#94a3b8;font-size:15px;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif}
    .pmenu{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
    .pmbtn{display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:11px;padding:10px 13px;cursor:pointer;width:100%;text-align:left;color:#e2e8f0;font-size:13px;font-weight:600;font-family:Inter,sans-serif;transition:all .2s}
    .pmbtn:hover{background:rgba(99,102,241,.08);border-color:rgba(99,102,241,.25)}
    .pmbtn.lo{color:#ef4444;border-color:rgba(239,68,68,.15)}
    .pmico{font-size:17px;width:23px;text-align:center}
    .pmarr{margin-left:auto;color:#475569;font-size:12px}
    .tbox2{background:rgba(2,8,23,.5);border:1px solid #1e293b;border-radius:10px;padding:13px;max-height:270px;overflow-y:auto;margin-bottom:11px}
    .tbox2::-webkit-scrollbar{width:3px}
    .tbox2::-webkit-scrollbar-thumb{background:#1e293b;border-radius:10px}
    .th{font-weight:700;font-size:11px;color:#a5b4fc;margin-bottom:3px;margin-top:9px}
    .th:first-child{margin-top:0}
    .tp{font-size:11px;color:#94a3b8;line-height:1.65}
    .qbox{background:rgba(2,8,23,.5);border:1px solid #1e293b;border-radius:9px;padding:3px}
    .qinp{width:100%;background:none;border:none;color:#f8fafc;font-size:12px;font-family:Inter,sans-serif;padding:9px;outline:none;resize:none;min-height:85px;line-height:1.6}
    .qinp::placeholder{color:#475569}
    footer{text-align:center;padding:15px;color:#334155;font-size:10px;border-top:1px solid rgba(255,255,255,.03)}
    @media(max-width:600px){.nav{padding:10px 11px}.dc{padding:18px 9px 60px}.pgrid{gap:4px}.ppb{padding:8px 2px 6px}.nc{padding:24px 14px}.icard{padding:15px 11px}}
    .light.dash{background:#f1f5f9;}
    .light .nav{background:#fff;border-bottom:1px solid #e2e8f0;}
    .light .icard,.light .fbox,.light .gcard,.light .cc{background:#fff;border-color:#e2e8f0;}
    .light .di{background:#f8fafc;border-color:#d1d5db;color:#1a1a2e;}
    .light .ict,.light .gct,.light .cpt{color:#1a1a2e;}
    .light .gctx,.light .tp{color:#4b5563;}
    .light .pmbtn{background:#f8fafc;border-color:#e2e8f0;color:#1a1a2e;}
    .light .ftab{background:#f8fafc;border-color:#e2e8f0;color:#6b7280;}
    .light .prc{background:#f8fafc;border-color:#e2e8f0;}
    .light .chip{background:rgba(99,102,241,.05);border-color:#d1d5db;color:#374151;}
    .light .pick-btn{background:#f8fafc;border-color:#d1d5db;color:#374151;}
    .light .pick-drop{background:#fff;border-color:#e2e8f0;}
    .light footer{color:#9ca3af;}
  
  `;

  if(screen==="loading") return (
    <><style>{css}</style>
    <div style={{minHeight:"100vh",background:"#e8ecf1",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <div className="sp"/><p style={{color:"#8b8fa8",marginTop:12,fontSize:12,fontWeight:500}}>Loading YesYouPro...</p>
    </div></>
  );

  return (
    <>
      <Head>
        <title>YesYouPro — AI Product Analyzer for Indian Sellers</title>
        <meta name="description" content="YesYouPro — AI product analyzer for Indian ecommerce sellers. Get viral hooks, keywords, competitor analysis & 13 premium tools. Free to try!" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <style>{css}</style>
      {toast && <div className="toast">{toast}</div>}

      {loading && <div className="loverlay"><div className="lcard">
        <div className="lbrain">🧠</div>
        <h2 className="lt1">Analyzing...</h2>
        <p className="lt2">YYP AI is processing</p>
        <div className="lstps">{STEPS.map((s,i)=><div key={i} className={"lstp"+(loadStep>i?" done":loadStep===i?" act":"")}><span>{loadStep>i?"✅":loadStep===i?"⚙️":"○"}</span><span>{s}</span></div>)}</div>
      </div></div>}

      {showAd && <div className="adov"><div className="adbox">
        <div style={{position:"absolute",top:"-10px",left:"50%",transform:"translateX(-50%)",background:"#f59e0b",padding:"3px 12px",borderRadius:"100px",fontSize:"9px",fontWeight:800,color:"#fff",letterSpacing:"1.5px"}}>ADVERTISEMENT</div>
        <div style={{fontSize:36,marginTop:5}}>📢</div>
        <h2 style={{fontWeight:900,fontSize:16,margin:"9px 0 5px",color:"#f8fafc"}}>Scale Your Ecommerce Business</h2>
        <p style={{color:"#94a3b8",marginBottom:13,fontSize:11}}>Find winning products 10x faster with AI</p>
        <div className="adprog"><div className="adpf" style={{width:((5-adT)/5*100)+"%"}}/></div>
        <button onClick={closeAd} className="adcl" style={{opacity:adT>0?.3:1,cursor:adT>0?"not-allowed":"pointer"}}>{adT>0?"⏳ Skip in "+adT+"s":"✕ Close"}</button>
      </div></div>}

      {showPrem && <div className="mov" onClick={()=>{if(payStep==="form"||payStep==="success"){setShowPrem(false);setShowPay(false);setPayStep("form");}}}>
        <div className="pm" onClick={e=>e.stopPropagation()}>
          {!showPay && <>
            <div className="pb2">💎 PREMIUM</div>
            <h2 className="ptitle">Unlock Everything</h2>
            <div className="ppr">₹949 <span>/ 7 days</span></div>
            <div className="phigh">📊 50 analyses / 30 days (Free: 2/day only)<br/>⏰ No 24hr lockout<br/>🚫 Zero ads<br/>📋 Copy any AI result<br/>🔓 All 13 tools unlocked</div>
            <div className="pflist">{["✅ 50 analyses / 30 days","✅ Zero ads","✅ No 24hr lockout","📋 Copy full reports","🎓 Starter Guide","🔰 Beginner Products","🧮 Investment Calculator","📊 Sales Estimator","🏷️ Price Optimizer","📦 Inventory Calculator","⭐ Review Analyzer","🎯 Niche Finder","📺 Ads on 8 platforms"].map(f=><div key={f} className="pfi">{f}</div>)}</div>
            <button className="pbtn2" onClick={()=>setShowPay(true)}>🔓 Unlock Premium — ₹949</button>
            <button className="mcan" onClick={()=>setShowPrem(false)}>Maybe later</button>
          </>}
          {showPay && payStep==="form" && <>
            <h2 className="ptitle">Complete Payment</h2>
            <div className="paybox">
              <div className="pr2"><span>Plan</span><span>Premium 7-day</span></div>
              <div className="pr2"><span>Amount</span><span style={{color:"#f59e0b",fontWeight:700}}>₹949</span></div>
              <div className="pr2"><span>Analyses</span><span style={{color:"#10b981"}}>30 in 7 days</span></div>
              <div className="pr2"><span>All 13 Tools</span><span style={{color:"#10b981"}}>✅ Unlocked</span></div>
              <div className="pr2"><span>Copy Results</span><span style={{color:"#a5b4fc"}}>✅ Enabled</span></div>
            </div>
            <button className="pbtn2" onClick={handlePay}><svg width="14" height="14" viewBox="0 0 30 30" fill="none"><path d="M14.396 0L0 19.578h9.979L7.242 30l22.758-19.56H19.5L22.25 0z" fill="#528FF0"/></svg>Pay ₹949 via Razorpay</button>
            <button className="mcan" onClick={()=>setShowPay(false)}>← Back</button>
          </>}
          {showPay && payStep==="processing" && <div style={{textAlign:"center",padding:30}}><div className="sp" style={{margin:"0 auto"}}/><p style={{color:"#94a3b8",marginTop:11}}>Processing...</p></div>}
          {showPay && payStep==="make_account" && <div style={{textAlign:"center"}}>
            <div style={{fontSize:50,marginBottom:8}}>🎉</div>
            <h2 className="ptitle">Payment Successful!</h2>
            <p style={{color:"#94a3b8",fontSize:12,marginBottom:15,lineHeight:1.6}}>Create your account to activate Premium!</p>
            <button className="pbtn2" onClick={()=>{setShowPrem(false);setShowPay(false);setPayStep("form");S.set("yyp_pending_prem",true);setScreen("auth");}}>🔐 Create Account to Activate</button>
          </div>}
          {showPay && payStep==="success" && <div style={{textAlign:"center"}}>
            <div style={{fontSize:50,marginBottom:8}}>🎉</div>
            <h2 className="ptitle">Premium Activated!</h2>
            <div className="sfeat">
              <div className="sfi2">✅ 50 analyses / 30 days</div>
              <div className="sfi2">✅ Zero ads</div>
              <div className="sfi2">✅ Copy results enabled</div>
              <div className="sfi2">✅ All 13 tools unlocked</div>
            </div>
            <button className="pbtn2" onClick={()=>{setShowPrem(false);setShowPay(false);setPayStep("form");}}>🚀 Start Analyzing →</button>
          </div>}
        </div>
      </div>}

      {showProf && <div className="prov" onClick={()=>setShowProf(false)}>
        <div className="prm" onClick={e=>e.stopPropagation()}>
          {profTab==="main" && <>
            <div className="prh">
              <div className="pru">
                <div className="pra">{user?.photo?<img src={user.photo} alt=""/>:(isGuest?"👤":user?.name?.[0]?.toUpperCase()||"U")}</div>
                <div>
                  <div className="prn">{isGuest?"Guest User":user?.name}</div>
                  <div className="pre">{isGuest?"Not logged in":user?.email}</div>
                  <div className="prpl" style={{background:curPlan==="premium"?"rgba(245,158,11,.12)":"rgba(99,102,241,.1)",color:curPlan==="premium"?"#f59e0b":"#a5b4fc",border:curPlan==="premium"?"1px solid rgba(245,158,11,.25)":"1px solid rgba(99,102,241,.2)"}}>{curPlan==="premium"?"💎 Premium":"🆓 Free"}</div>
                </div>
              </div>
              <button className="prcl" onClick={()=>setShowProf(false)}>✕</button>
            </div>
            {curPlan==="premium" && usage && <div style={{background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.2)",borderRadius:9,padding:"8px 12px",marginBottom:11,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:11,color:"#f59e0b",fontWeight:600}}>💎 Premium Active</div>
              <div style={{fontSize:11,color:"#94a3b8"}}>{usage.remaining} analyses left</div>
            </div>}
            <div className="pmenu">
              <button className="pmbtn" onClick={()=>setProfTab("terms")}><span className="pmico">📋</span><span>Terms & Conditions</span><span className="pmarr">›</span></button>
              <button className="pmbtn" onClick={()=>setProfTab("question")}><span className="pmico">❓</span><span>Any Questions?</span><span className="pmarr">›</span></button>
              {curPlan==="free" && <button className="pmbtn" onClick={()=>{setShowProf(false);setShowPrem(true);}}><span className="pmico">💎</span><span>Upgrade Premium — ₹949</span><span className="pmarr">›</span></button>}
              {isGuest
                ? <button className="pmbtn" onClick={()=>{setShowProf(false);setScreen("auth");}} style={{borderColor:"rgba(99,102,241,.25)",color:"#a5b4fc"}}><span className="pmico">🔐</span><span>Login / Sign Up</span><span className="pmarr">›</span></button>
                : <button className="pmbtn lo" onClick={()=>{setShowProf(false);handleLogout();}}><span className="pmico">🚪</span><span>Logout</span></button>
              }
            </div>
            <div onClick={toggleTheme} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:dark?"rgba(15,23,42,.6)":"#f8fafc",border:dark?"1px solid #1e293b":"1px solid #e2e8f0",borderRadius:11,padding:"10px 14px",marginBottom:10,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>{dark?"🌙":"☀️"}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:dark?"#e2e8f0":"#1a1a2e"}}>{dark?"Dark Mode":"Light Mode"}</div>
                  <div style={{fontSize:10,color:"#64748b"}}>Tap to switch</div>
                </div>
              </div>
              <div style={{width:44,height:24,borderRadius:100,background:dark?"rgba(99,102,241,.3)":"#d1d5db",padding:3,position:"relative"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:dark?"#6366f1":"#fff",position:"absolute",top:3,left:dark?23:3,transition:"left .2s"}}/>
              </div>
            </div>
            <div style={{textAlign:"center",fontSize:10,color:"#334155"}}>YesYouPro · yesyoupro.com</div>
          </>}

          {profTab==="terms" && <>
            <div className="prh"><button className="prcl" style={{background:"none",fontSize:18}} onClick={()=>setProfTab("main")}>←</button><div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>Terms & Conditions</div><div style={{width:29}}/></div>
            <div className="tbox2">
              <div className="th">1. Acceptance</div><p className="tp">By using YesYouPro, you agree to these terms.</p>
              <div className="th">2. Free Plan</div><p className="tp">5 analyses/day. 24hr lockout after limit. All tools available during active analyses.</p>
              <div className="th">3. Premium Plan</div><p className="tp">₹949 for 30 days / 50 analyses. Expires after 7 days OR 30 analyses. No auto-renewal.</p>
              <div className="th">4. Refund Policy</div><p className="tp">No refunds once Premium is activated. Technical issues: support@yesyoupro.com within 24 hours.</p>
              <div className="th">5. AI Accuracy</div><p className="tp">AI results are suggestions only — not guaranteed business advice. Do your own research.</p>
              <div className="th">6. Privacy</div><p className="tp">We store email and usage data securely. We never sell personal data. Payments via Razorpay.</p>
              <div className="th">7. Contact</div><p className="tp">support@yesyoupro.com</p>
            </div>
            <button className="pmbtn" onClick={()=>setProfTab("main")} style={{justifyContent:"center"}}>← Back</button>
          </>}

          {profTab==="question" && <>
            <div className="prh"><button className="prcl" style={{background:"none",fontSize:18}} onClick={()=>setProfTab("main")}>←</button><div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>Any Questions?</div><div style={{width:29}}/></div>
            {qSent
              ? <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.3)",borderRadius:10,padding:17,textAlign:"center"}}><div style={{fontSize:30,marginBottom:6}}>✅</div><div style={{fontWeight:700,color:"#10b981",fontSize:13,marginBottom:3}}>Sent!</div><div style={{color:"#64748b",fontSize:11}}>24 ghante mein reply karenge.</div></div>
              : <>
                <div style={{fontSize:11,color:"#64748b",marginBottom:9,lineHeight:1.6}}>Koi bhi problem? Hume likho! 📩</div>
                <div className="qbox" style={{marginBottom:7}}><textarea className="qinp" placeholder="Apna question yahan likho..." value={q} onChange={e=>setQ(e.target.value)} rows={4}/></div>
                <div style={{fontSize:10,color:"#475569",marginBottom:9}}>📧 {isGuest?"Guest":user?.email} · {curPlan}</div>
                <button onClick={sendQ} disabled={qLoad||!q.trim()} style={{width:"100%",background:q.trim()?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(30,41,59,.5)",border:"none",borderRadius:10,padding:"10px 0",color:q.trim()?"#fff":"#475569",fontWeight:800,fontSize:13,cursor:q.trim()?"pointer":"not-allowed",fontFamily:"Inter,sans-serif"}}>{qLoad?"📤 Sending...":"📤 Send Message"}</button>
              </>
            }
            <div style={{textAlign:"center",fontSize:10,color:"#334155",marginTop:7}}>or: support@yesyoupro.com</div>
          </>}
        </div>
      </div>}

      {screen==="auth" && <div className="neu">
        <div className="nc">
          <div className="navt"><svg viewBox="0 0 24 24" fill="none" stroke="#8b8fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
            <h1 className="ntitle">{authMode==="login"?"Welcome back":"Create account"}</h1>
            <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"1px solid #c8cdd5",borderRadius:100,padding:"4px 10px",color:"#8b8fa8",fontSize:10,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>← Back</button>
          </div>
          <p className="nsub">{authMode==="login"?"Sign in to continue":"Join YesYouPro for free"}</p>
          {authMode==="login" && saved.length>0 && <div className="sw-r">
            <div className="slbl">Quick Login</div>
            {saved.map(a=><button key={a.email} className="sacc" onClick={()=>quickLogin(a)}>
              <div className="savt">{a.photo?<img src={a.photo} alt=""/>:a.name?.[0]?.toUpperCase()||"U"}</div>
              <div className="si"><div className="sn">{a.name}</div><div className="se">{a.email}</div></div>
              <div style={{color:"#6366f1",fontSize:14,fontWeight:700}}>→</div>
            </button>)}
            <div className="dvl"><div className="dl"/><div className="dt">OR MANUALLY</div><div className="dl"/></div>
          </div>}
          <div className="ntabs">{["login","signup"].map(m=><button key={m} className={"ntab"+(authMode===m?" on":"")} onClick={()=>{setAuthMode(m);setAuthErr("");setForm({email:"",password:"",name:""});}}>{m==="login"?"Login":"Sign Up"}</button>)}</div>
          <button className="gbtn" onClick={handleGoogle} disabled={gLoad}>
            {gLoad?<div className="sp" style={{width:14,height:14,border:"2px solid rgba(99,102,241,.2)",borderTop:"2px solid #6366f1"}}/>:<svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
            {gLoad?"Signing in...":"Continue with Google"}
          </button>
          <div className="dvl"><div className="dl"/><div className="dt">OR WITH EMAIL</div><div className="dl"/></div>
          {authMode==="signup" && <div className="niw"><span className="nii">👤</span><input className="ni" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>}
          <div className="niw"><span className="nii">✉️</span><input className="ni" placeholder="Email address" type="email" autoComplete="off" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
          <div className="niw"><span className="nii">🔒</span><input className="ni" placeholder="Password" type={showPw?"text":"password"} autoComplete="new-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button className="eye" onClick={()=>setShowPw(!showPw)}>{showPw?"🙈":"👁️"}</button></div>
          {authErr && <p className="nerr">⚠️ {authErr}</p>}
          {authMode==="login" && <div className="rem"><input type="checkbox" id="rem" defaultChecked/><label htmlFor="rem">Remember me</label><span className="fgot" onClick={handleForgotPw}>Forgot password?</span></div>}
          <button className="nbtn" onClick={handleAuth}>{authMode==="login"?"Sign In →":"Create Account →"}</button>
          <p className="swtxt">{authMode==="login"?"Don't have an account? ":"Already have an account? "}<span className="swlnk" onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setAuthErr("");setForm({email:"",password:"",name:""}); }}>{authMode==="login"?"Sign Up Free":"Sign In"}</span></p>
        </div>
      </div>}

      {screen==="dashboard" && <div className={"dash"+(dark?" light":"")} >
        <nav className="nav">
          <div className="logo">🧠 YesYouPro</div>
          {usage && <div className="upill">
            <span style={{color:curPlan==="premium"?"#f59e0b":"#94a3b8",fontWeight:700}}>{curPlan==="premium"?"💎":"🆓"}</span>
            <span style={{color:"#334155"}}>|</span>
            <span style={{color:usage.remaining>0?"#10b981":"#ef4444",fontWeight:700}}>{curPlan==="premium"?usage.remaining+" left":usage.remaining+"/2 today"}</span>
          </div>}
          <div className="navr">
            {curPlan==="free" && <button className="upbtn" onClick={()=>setShowPrem(true)}>💎 ₹949</button>}
            {isGuest
              ? <button onClick={()=>setScreen("auth")} style={{background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.35)",borderRadius:100,padding:"5px 11px",color:"#a5b4fc",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Login / Sign Up</button>
              : <div className="avt" onClick={()=>{setShowProf(true);setProfTab("main");}}>{user?.photo?<img src={user.photo} alt=""/>:user?.name?.[0]?.toUpperCase()||"U"}</div>
            }
          </div>
        </nav>

        <div className="dc">
          <div className="hero">
            <div className="hbadge">✨ Universal AI Analyzer</div>
            <h1 className="htitle">Analyze Anything<br/><span className="grad">Powered by YesYouPro</span></h1>
            <p className="hsub">Products, apps, games, websites, channels — AI insights for anything! No login needed.</p>
          </div>

          {timer && curPlan==="free" && <div className="tbox">
            <div className="ttitle">⏳ Daily Limit Reached</div>
            <div className="tsub">2 free analyses used. Reset in:</div>
            <div className="trow">
              {[{v:String(timer.h).padStart(2,"0"),l:"Hours"},{sep:true},{v:String(timer.m).padStart(2,"0"),l:"Min"},{sep:true},{v:String(timer.s).padStart(2,"0"),l:"Sec"}].map((t,i)=>
                t.sep?<div key={i} className="tsep">:</div>:<div key={i} className="tunit"><div className="tnum">{t.v}</div><div className="tlbl">{t.l}</div></div>
              )}
            </div>
            <div className="tprog"><div className="tpf" style={{width:Math.max(0,100-(timer.total/86400000)*100)+"%"}}/></div>
            <div style={{marginTop:9,display:"flex",alignItems:"center",justifyContent:"center",gap:7,flexWrap:"wrap"}}>
              <span style={{color:"#64748b",fontSize:11}}>Don&apos;t want to wait?</span>
              <button onClick={()=>setShowPrem(true)} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:100,padding:"6px 13px",color:"#fff",fontWeight:800,fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>💎 Get Premium ₹949</button>
            </div>
          </div>}

          {curPlan==="free" && !timer && usage && (
            usage.remaining>0
              ?<div className="bnr-g"><div><div style={{fontWeight:700,fontSize:11,color:"#10b981"}}>✅ All Tools Unlocked — {usage.remaining} Analyses Left</div><div style={{fontSize:10,color:"#475569"}}>No login needed. Resets every 24hrs.</div></div></div>
              :<div className="bnr-r"><div><div style={{fontWeight:700,fontSize:11,color:"#ef4444"}}>🔒 Daily Limit Reached — Tools Locked</div><div style={{fontSize:10,color:"#64748b"}}>Upgrade for 30 analyses & no lockout.</div></div><button onClick={()=>setShowPrem(true)} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:8,padding:"5px 10px",color:"#fff",fontWeight:700,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"Inter,sans-serif"}}>💎 ₹949</button></div>
          )}

          {history.length>0&&(
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
              <button onClick={()=>setShowHist(!showHist)} style={{background:"rgba(15,23,42,.7)",border:"1px solid rgba(99,102,241,.2)",borderRadius:100,padding:"5px 14px",color:"#a5b4fc",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
                {showHist?"Hide":"History ("+history.length+")"}
              </button>
            </div>
          )}
          {showHist&&(
            <div style={{background:"rgba(15,23,42,.85)",border:"1px solid rgba(99,102,241,.2)",borderRadius:14,padding:14,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontWeight:800,fontSize:13,color:"#f8fafc"}}>Recent ({history.length}/10)</div>
                <button onClick={()=>{S.set("yyp_history",[]);setHistory([]);setShowHist(false);showT("Cleared!");}} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:7,padding:"3px 9px",color:"#ef4444",fontSize:10,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Clear</button>
              </div>
              {history.length===0?<div style={{textAlign:"center",padding:"16px 0",color:"#475569",fontSize:11}}>Koi history nahi yet</div>:(
                <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:240,overflowY:"auto"}}>
                  {history.map((h,i)=>(
                    <div key={h.id||i} onClick={()=>{setPf({name:h.name,cat:h.cat||"",plat:h.plat||""});setResult(h.result);setShowHist(false);showT("Loaded: "+h.name);}} style={{background:"rgba(2,8,23,.6)",border:"1px solid #1e293b",borderRadius:9,padding:"9px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:26,height:26,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff",flexShrink:0}}>{i+1}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:12,color:"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{h.name}</div>
                        <div style={{fontSize:10,color:"#64748b"}}>{h.cat||"—"} · {h.time}</div>
                      </div>
                      <div style={{fontSize:9,color:"#6366f1",fontWeight:700,background:"rgba(99,102,241,.1)",padding:"2px 7px",borderRadius:100,flexShrink:0}}>Load</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="icard">
            <h3 className="ict">🎯 Analyze Anything</h3>
            <div style={{marginBottom:13}}>
              <label className="ilbl">Name *</label>
              <input className="di" placeholder="e.g. Portable Blender, BGMI, YouTube Channel, SaaS..." value={pf.name} onChange={e=>setPf({...pf,name:e.target.value})}/>
            </div>

            <div style={{marginBottom:13}}>
              <label className="ilbl">Category * {pf.cat && <span style={{color:"#10b981",marginLeft:4,fontSize:10}}>✅ {pf.cat}</span>}</label>
              <button className={"pick-btn"+(pf.cat?" sel":"")} onClick={()=>{setShowCats(!showCats);setShowPlats(false);}}>
                <span>{pf.cat&&(()=>{const ct=CATS.find(c=>c.id===pf.cat);return ct?.logo?<img src={ct.logo} alt={pf.cat} style={{width:15,height:15,objectFit:"contain",borderRadius:2,marginRight:4}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{marginRight:4}}>{ct?.e||"📂"}</span>;})()}{pf.cat||"Select Category"}</span>
                <span style={{fontSize:10,color:"#6366f1"}}>{showCats?"▲":"▼"}</span>
              </button>
              {showCats && <div className="pick-drop">
                {["Physical","Digital"].map(g=><div key={g}>
                  <div className="pg-lbl">{g==="Physical"?"📦 Physical Products":"💻 Digital & Virtual"}</div>
                  <div className="chips">{CATS.filter(c=>c.g===g).map(c=><button key={c.id} className={"chip"+(pf.cat===c.id?" on":"")} style={pf.cat===c.id?{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderColor:"#6366f1"}:{}} onClick={()=>{setPf({...pf,cat:c.id});setShowCats(false);}}>{c.logo?<img src={c.logo} alt={c.id} style={{width:14,height:14,objectFit:"contain",flexShrink:0,borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:12}}>{c.e||""}</span>}{c.id}</button>)}</div>
                </div>)}
              </div>}
            </div>

            <div style={{marginBottom:5}}>
              <label className="ilbl">Platform * {pf.plat && <span style={{color:"#10b981",marginLeft:4,fontSize:10}}>✅ {pf.plat}</span>}</label>
              <button className={"pick-btn"+(pf.plat?" sel":"")} onClick={()=>{setShowPlats(!showPlats);setShowCats(false);}}>
                <span>{pf.plat&&(()=>{const pl=PLATS.find(p=>p.id===pf.plat);return pl?.logo?<img src={pl.logo} alt={pf.plat} style={{width:15,height:15,objectFit:"contain",borderRadius:2,marginRight:4}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{marginRight:4}}>{pl?.e||"🌐"}</span>;})()}{pf.plat||"Select Platform"}</span>
                <span style={{fontSize:10,color:"#6366f1"}}>{showPlats?"▲":"▼"}</span>
              </button>
              {showPlats && <div className="pick-drop">
                {platGroups.map(g=><div key={g}>
                  <div className="pg-lbl">{g==="Ecommerce"?"🛒 "+g:g==="Social Media"?"📱 "+g:g==="App Stores"?"📲 "+g:g==="Courses"?"🎓 "+g:g==="Freelance"?"💼 "+g:g==="Food"?"🍔 "+g:"🌐 "+g}</div>
                  <div className="chips">{PLATS.filter(p=>p.g===g).map(p=><button key={p.id} className={"chip"+(pf.plat===p.id?" on":"")} style={pf.plat===p.id?{background:p.c,borderColor:p.c}:{}} onClick={()=>{setPf({...pf,plat:p.id});setShowPlats(false);}}>{p.logo?<img src={p.logo} alt={p.id} style={{width:13,height:13,objectFit:"contain",flexShrink:0,borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:12}}>{p.e||""}</span>}{p.id}</button>)}</div>
                </div>)}
              </div>}
            </div>

            {err && <div className="errbanner">{err}</div>}
            <button className="abtn" onClick={runAnalysis} disabled={loading||(!!timer&&curPlan==="free")}>
              🚀 Get AI Analysis {curPlan==="free" && !timer && <span className="anote">· Ad plays first</span>}
            </button>
          </div>

          {result && <div className="fa" style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13,flexWrap:"wrap",gap:7}}>
              <h2 style={{fontWeight:900,fontSize:16,color:"#f8fafc",margin:0}}>📊 <span className="grad">{pf.name}</span></h2>
              {curPlan==="premium"
                ?<button className="cpybtn" onClick={()=>{const r=["=== YESYOUPRO ANALYSIS ===","Product: "+pf.name,"Category: "+pf.cat,"Platform: "+pf.plat,"","Viral Score: "+result.viral_score,"Demand: "+result.demand_level,"Competition: "+result.competition_level,"Price: "+result.price_range,"","Description:",result.description||"","","Hooks:",...(result.hooks||[]).map((h,i)=>(i+1)+". "+h),"","Keywords:",(result.keywords||[]).join(", "),"=== yesyoupro.com ==="].join("\n");copyTxt(r,"Full Report");}}>📋 Copy Report</button>
                :<div style={{background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:7,padding:"3px 9px",fontSize:10,color:"#f59e0b",cursor:"pointer"}} onClick={()=>setShowPrem(true)}>🔒 Copy (Premium)</div>
              }
            </div>
            {result.item_type && <div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.3)",borderRadius:100,padding:"2px 10px",fontSize:10,color:"#a5b4fc",fontWeight:600,marginBottom:9}}>🏷️ {result.item_type}</div>}
            <div className="mrow">{[{l:"🔥 Viral Score",v:result.viral_score,c:"#f59e0b"},{l:"📈 Demand",v:result.demand_level,c:"#10b981"},{l:"⚔️ Competition",v:result.competition_level,c:"#ef4444"},{l:"💰 Price",v:result.price_range,c:"#6366f1"}].map(m=><div key={m.l} className="mc"><div className="ml">{m.l}</div><div className="mv" style={{color:m.c,fontSize:m.v?.length>8?11:15}}>{m.v}</div></div>)}</div>
            <div className="tcol">
              <div className="gcard"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}><h4 className="gct">📝 Description</h4>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt(result.description||"","Desc")}>📋</button>}</div><p className="gctx">{result.description}</p></div>
              <div className="gcard"><h4 className="gct" style={{marginBottom:7}}>🎯 Target Audience</h4>{Array.isArray(result.target_audience)?result.target_audience.map((a,i)=><div key={i} className="hi"><span className="hn">{i+1}</span><span style={{color:"#94a3b8",fontSize:11,lineHeight:1.6}}>{a}</span></div>):<p className="gctx">{result.target_audience}</p>}</div>
            </div>
            <div className="gcard"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}><h4 className="gct">🪝 Viral Hooks</h4>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt((result.hooks||[]).join("\n"),"Hooks")}>📋 All</button>}</div>
              {result.hooks?.map((h,i)=><div key={i} className="hi" style={{justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"flex-start",gap:7,flex:1}}><span className="hn">{i+1}</span><span>{h}</span></div>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt(h,"Hook "+(i+1))}>📋</button>}</div>)}
            </div>
            <div className="gcard"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}><h4 className="gct">🔑 Keywords</h4>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt((result.keywords||[]).join(", "),"Keywords")}>📋 All</button>}</div>
              <div className="kwg">{result.keywords?.map((k,i)=><div key={i} className="kwc" onClick={()=>curPlan==="premium"&&copyTxt(k,k)} style={{cursor:curPlan==="premium"?"pointer":"default"}}>{k}{curPlan==="premium"&&<span style={{fontSize:9,opacity:.5,marginLeft:2}}>📋</span>}</div>)}</div>
            </div>
            {result.best_platforms?.length>0&&<div className="gcard"><h4 className="gct" style={{marginBottom:7}}>🚀 Best Platforms</h4><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{result.best_platforms.map((p,i)=><div key={i} style={{background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",color:"#10b981",borderRadius:7,padding:"3px 10px",fontSize:11,fontWeight:600}}>✅ {p}</div>)}</div></div>}
            {result.monetization&&<div className="gcard"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}><h4 className="gct">💰 Monetization</h4>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt(result.monetization,"Monetization")}>📋</button>}</div><p className="gctx">{result.monetization}</p></div>}

            <div className="psec">
              {isLocked && <div onClick={()=>setShowPrem(true)} style={{position:"absolute",inset:0,background:"rgba(2,8,23,.9)",borderRadius:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10,backdropFilter:"blur(4px)"}}>
                <div style={{fontSize:34,marginBottom:7}}>🔒</div>
                <div style={{fontWeight:800,fontSize:13,color:"#f8fafc",marginBottom:11}}>Run Ads + Publish Content</div>
                <button onClick={(e)=>{e.stopPropagation();setShowPrem(true);}} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:10,padding:"8px 20px",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>💎 Unlock ₹949</button>
              </div>}
              <div className="psh"><div className="pst">📺 Run Ads + Publish Content</div></div>
              <p className="pss">Complete ad strategy for every platform</p>
              <div className="pgrid">{ADPLATS.map(p=>(
                <div key={p.id} className={"ppb"+(selP===p.id?" on":"")} onClick={()=>fetchPlat(p.id)} style={{borderColor:selP===p.id?p.c:undefined}}>
                  {isLocked&&<div className="pplk">🔒</div>}
                  <div style={{width:20,height:20,background:p.c,borderRadius:5,margin:"0 auto 4px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:800}}>
                    {p.n[0]}
                  </div>
                  <div style={{fontSize:8,fontWeight:700,color:"#94a3b8"}}>{p.n}</div>
                </div>
              ))}</div>
              {selP && !isLocked && <div className="pdet">
                {platLoad?<div style={{textAlign:"center",padding:14}}><div className="sp" style={{margin:"0 auto 7px"}}/><p style={{color:"#64748b",fontSize:11}}>Generating...</p></div>
                :platD[selP]?(()=>{try{const d=platD[selP];return(<>
                  {d.account_setup&&<div className="pdb"><div className="pdt">🏗️ Account Setup</div><div className="pdstps">{String(d.account_setup).split("\n").filter(s=>s.trim()).map((s,i)=><div key={i} className="pdstep"><span className="pdsn">{i+1}</span><span style={{flex:1}}>{s.replace(/^Step\s*\d+[:\s]*/i,"").trim()}</span></div>)}</div></div>}
                  {d.targeting&&<div className="pdb"><div className="pdt">🎯 Targeting</div><div className="pdtx">{d.targeting}</div></div>}
                  {Array.isArray(d.ad_keywords)&&d.ad_keywords.length>0&&<div className="pdb"><div className="pdt">🔑 Keywords</div><div className="pdch">{d.ad_keywords.map((k,i)=><div key={i} className="pdchip">{k}</div>)}</div></div>}
                  {d.script&&<div className="pdb"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}><div className="pdt" style={{margin:0}}>📝 Script</div>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt(d.script,"Script")}>📋</button>}</div><div className="pdtx" style={{background:"rgba(99,102,241,.05)",padding:9,borderRadius:7,border:"1px solid rgba(99,102,241,.12)",lineHeight:1.7}}>{d.script}</div></div>}
                  {d.video_steps&&<div className="pdb"><div className="pdt">🎬 Video Steps</div><div className="pdstps">{String(d.video_steps).split("\n").filter(s=>s.trim()).map((s,i)=><div key={i} className="pdstep"><span className="pdsn">{i+1}</span><span style={{flex:1}}>{s.replace(/^Step\s*\d+[:\s]*/i,"").trim()}</span></div>)}</div></div>}
                  {(Array.isArray(d.titles)?d.titles:d.title?[d.title]:[]).length>0&&<div className="pdb"><div className="pdt">📌 Titles</div>{(Array.isArray(d.titles)?d.titles:[d.title]).map((t,i)=><div key={i} style={{background:"rgba(99,102,241,.05)",border:"1px solid rgba(99,102,241,.12)",borderRadius:7,padding:"6px 9px",marginBottom:4,color:"#e2e8f0",fontSize:11,fontWeight:600}}><span style={{color:"#6366f1",marginRight:5}}>#{i+1}</span>{t}</div>)}</div>}
                  {d.budget&&<div className="pdb"><div className="pdt">💰 Budget</div><div className="pdtx">{d.budget}</div></div>}
                </>);}catch{return<div style={{color:"#ef4444",textAlign:"center",padding:11,fontSize:11}}>Error. Try again.</div>;}})():null}
              </div>}
            </div>
          </div>}

          <div className="ftw">
            <div className="fglbl" style={{color:"#64748b"}}>🆓 Free Tools</div>
            <div className="ftabs"><button className={"ftab"+(tab==="profit"?" on":"")} onClick={()=>setTab("profit")}>💰 Profit Calculator</button></div>
            <div className="fglbl" style={{color:isLocked?"#ef4444":"#10b981"}}>{isLocked?"🔒 Locked (Buy Premium to Unlock)":"✅ Premium Tools (Unlocked)"}</div>
            <div className="ftabs">
              {[{id:"starter",l:"🎓 Starter Guide"},{id:"beginner",l:"🔰 Beginner Products"},{id:"investment",l:"🧮 Investment Calc"},{id:"description",l:"📝 Description"},{id:"trending",l:"🔥 Trending"},{id:"competitor",l:"⚔️ Competitor"},{id:"supplier",l:"📦 Supplier"},{id:"sales",l:"📊 Sales Estimator"},{id:"price",l:"🏷️ Price Optimizer"},{id:"inventory",l:"📦 Inventory"},{id:"review",l:"⭐ Reviews"},{id:"niche",l:"🎯 Niche Finder"},
                  {id:"failpred",l:"🔮 Failure Predictor"},
                  {id:"gst",l:"🧾 GST Calc"},
                  {id:"shipping",l:"🚚 Shipping Cost"}
                ].map(t=>(
                <button key={t.id} className={"ftab"+(tab===t.id?" on":"")} onClick={()=>{if(isLocked){setShowPrem(true);return;}setTab(t.id);}}>{t.l}{isLocked&&" 🔒"}</button>
              ))}
            </div>
          </div>

          {tab==="profit" && <div className="fbox fa">
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>💰 Profit Calculator</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Calculate profit, margin & ROI</p>
            <div className="prow">{[{l:"Buy Price (₹)",k:"buy"},{l:"Sell Price (₹)",k:"sell"},{l:"Units",k:"units"},{l:"Platform Fee%",k:"fee"},{l:"Shipping (₹)",k:"ship"},{l:"Ad Budget (₹)",k:"ads"}].map(f=><div key={f.k} className="pfield"><label>{f.l}</label><input type="number" placeholder="0" value={profF[f.k]} onChange={e=>setProfF({...profF,[f.k]:e.target.value})}/></div>)}</div>
            <button className="cbtn" onClick={calcP}>📊 Calculate</button>
            {profR && <div className="presult">{[{l:"Net Profit",v:"₹"+profR.profit,c:parseFloat(profR.profit)>0?"#10b981":"#ef4444"},{l:"Per Unit",v:"₹"+profR.np,c:"#a5b4fc"},{l:"ROI",v:profR.roi+"%",c:"#f59e0b"},{l:"Margin",v:profR.margin+"%",c:"#6366f1"},{l:"Revenue",v:"₹"+profR.rev,c:"#10b981"},{l:"Break Even",v:profR.be+" units",c:"#94a3b8"}].map(r=><div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c}}>{r.v}</div></div>)}</div>}
          </div>}

          {tab==="starter" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>🎓 Starter Guide</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Personalized plan for your budget</p>
            <div className="prow"><div className="pfield"><label>Budget (₹)</label><input type="number" placeholder="5000" value={starF.budget} onChange={e=>setStarF({...starF,budget:e.target.value})}/></div><div className="pfield"><label>Experience</label><select value={starF.exp} onChange={e=>setStarF({...starF,exp:e.target.value})}><option value="beginner">Beginner</option><option value="some">Some Exp</option><option value="intermediate">Intermediate</option></select></div></div>
            <button className="gbtn2" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}} onClick={async()=>{setStarL(true);try{const d=await apiCall("starter_guide",{budget:starF.budget,experience:starF.exp});setStarD(d);}catch{}setStarL(false);}} disabled={starL}>{starL?"⏳ Generating...":"🎓 Generate Guide"}</button>
            {starL&&<div className="ssp"/>}
            {starD&&!starL&&<div style={{marginTop:13}} className="fa">
              {starD.platform_recommendation&&<div style={{background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:9,padding:10,marginBottom:9}}><div style={{fontWeight:800,fontSize:12,color:"#10b981",marginBottom:2}}>✅ Best: {starD.platform_recommendation.name}</div><div style={{color:"#94a3b8",fontSize:11}}>{starD.platform_recommendation.why}</div></div>}
              {starD.steps?.map((s,i)=><div key={i} className="cc" style={{marginBottom:6}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><div style={{width:22,height:22,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:11,color:"#fff",flexShrink:0}}>{s.step}</div><div style={{fontWeight:700,fontSize:12,color:"#e2e8f0"}}>{s.title}</div></div><div style={{color:"#94a3b8",fontSize:11,lineHeight:1.6,marginBottom:4}}>{s.description}</div><div style={{display:"flex",gap:4}}><span style={{background:"rgba(99,102,241,.1)",color:"#a5b4fc",borderRadius:5,padding:"1px 6px",fontSize:10}}>⏱ {s.time}</span><span style={{background:"rgba(16,185,129,.1)",color:"#10b981",borderRadius:5,padding:"1px 6px",fontSize:10}}>💰 {s.cost}</span></div></div>)}
              {starD.mistakes?.length>0&&<div style={{background:"rgba(239,68,68,.05)",border:"1px solid rgba(239,68,68,.2)",borderRadius:9,padding:9}}><div style={{fontWeight:700,color:"#ef4444",marginBottom:4,fontSize:11}}>⚠️ Avoid:</div>{starD.mistakes.map((m,i)=><div key={i} style={{color:"#94a3b8",fontSize:11,padding:"2px 0",display:"flex",gap:4}}><span>❌</span><span>{m}</span></div>)}</div>}
            </div>}
          </div>}

          {tab==="beginner" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>🔰 Beginner Product Finder</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Low risk, high profit products</p>
            <div className="prow"><div className="pfield"><label>Budget (₹)</label><input type="number" placeholder="5000" value={begF.budget} onChange={e=>setBegF({...begF,budget:e.target.value})}/></div><div className="pfield"><label>Category</label><select value={begF.category} onChange={e=>setBegF({...begF,category:e.target.value})}>{["Fashion","Electronics","Beauty & Skincare","Home & Kitchen","Fitness","Digital Products","Online Courses","Any Other"].map(c=><option key={c}>{c}</option>)}</select></div></div>
            <button className="gbtn2" style={{background:"linear-gradient(135deg,#10b981,#059669)"}} onClick={async()=>{setBegL(true);try{const d=await apiCall("beginner_product",begF);setBegD(d);}catch{}setBegL(false);}} disabled={begL}>{begL?"⏳ Finding...":"🔰 Find Products"}</button>
            {begL&&<div className="ssp"/>}
            {begD&&!begL&&<div style={{marginTop:13}} className="fa">{begD.products?.map((p,i)=><div key={i} className="cc" style={{marginBottom:6}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4,flexWrap:"wrap",gap:3}}><div style={{fontWeight:700,fontSize:12,color:"#e2e8f0"}}>#{i+1} {p.name}</div><span style={{background:p.risk==="Low"?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)",color:p.risk==="Low"?"#10b981":"#f59e0b",borderRadius:5,padding:"1px 6px",fontSize:10,fontWeight:600}}>Risk: {p.risk}</span></div><div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:4}}><span style={{color:"#ef4444",fontSize:11,fontWeight:600}}>Buy: {p.buy_price}</span><span style={{color:"#94a3b8"}}>→</span><span style={{color:"#10b981",fontSize:11,fontWeight:600}}>Sell: {p.sell_price}</span><span style={{color:"#f59e0b",fontSize:11,fontWeight:700}}>💰 {p.profit_per_unit}</span></div><div style={{color:"#94a3b8",fontSize:10,marginBottom:4}}>{p.why_good}</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}><span style={{background:"rgba(99,102,241,.1)",color:"#a5b4fc",borderRadius:5,padding:"1px 6px",fontSize:10}}>📦 {p.platform}</span><span style={{background:"rgba(16,185,129,.1)",color:"#10b981",borderRadius:5,padding:"1px 6px",fontSize:10}}>🏭 {p.suppliers}</span></div></div>)}</div>}
          </div>}

          {tab==="investment" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>🧮 Investment Calculator</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Full ROI with platform fees</p>
            <div className="prow">{[{l:"Buy Price (₹)",k:"buy"},{l:"Sell Price (₹)",k:"sell"},{l:"Units",k:"units"},{l:"Platform Fee%",k:"fee"},{l:"Shipping (₹)",k:"ship"},{l:"Ad Budget (₹)",k:"ads"}].map(f=><div key={f.k} className="pfield"><label>{f.l}</label><input type="number" placeholder="0" value={invF[f.k]} onChange={e=>setInvF({...invF,[f.k]:e.target.value})}/></div>)}</div>
            <button className="cbtn" style={{width:"100%"}} onClick={calcI}>🧮 Calculate</button>
            {invR&&<div className="presult">{[{l:"Total Profit",v:"₹"+invR.profit,c:parseFloat(invR.profit)>0?"#10b981":"#ef4444"},{l:"Per Unit",v:"₹"+invR.np,c:"#a5b4fc"},{l:"ROI",v:invR.roi+"%",c:"#f59e0b"},{l:"Margin",v:invR.margin+"%",c:"#6366f1"},{l:"Investment",v:"₹"+invR.cost,c:"#94a3b8"},{l:"Break Even",v:invR.be+" units",c:"#94a3b8"}].map(r=><div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c}}>{r.v}</div></div>)}</div>}
          </div>}

          {tab==="description" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>📝 Description Generator</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>SEO listings for Amazon, Meesho, Flipkart & more</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <button className="gbtn2" style={{background:"linear-gradient(135deg,#6366f1,#a855f7)"}} onClick={async()=>{setDescL(true);try{const d=await apiCall("description");setDescD(d);}catch{}setDescL(false);}} disabled={descL||!pf.name}>{descL?"⏳ Generating...":"✨ Generate Descriptions"}</button>
            {descL&&<div className="ssp"/>}
            {descD&&!descL&&<div style={{marginTop:13}} className="fa">{descD.listings?.map((l,i)=><div key={i} style={{background:"rgba(2,8,23,.5)",border:"1px solid #1e293b",borderRadius:10,padding:11,marginBottom:7}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}><div style={{display:"inline-block",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:100}}>{l.platform}</div>{curPlan==="premium"&&<button className="cpybtn" onClick={()=>copyTxt([l.title,l.description,...(l.bullets||[])].join("\n"),l.platform)}>📋</button>}</div><div style={{fontSize:12,fontWeight:700,color:"#e2e8f0",marginBottom:4}}>📌 {l.title}</div><div style={{color:"#94a3b8",fontSize:11,lineHeight:1.65,marginBottom:4}}>{l.description}</div>{l.bullets&&<div>{l.bullets.map((b,j)=><div key={j} style={{color:"#a5b4fc",fontSize:10,display:"flex",gap:4,marginBottom:2}}><span>✅</span><span>{b}</span></div>)}</div>}</div>)}</div>}
          </div>}

          {tab==="trending" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>🔥 Trending Products</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Top trending in India right now</p>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:10}}><select className="di" style={{flex:1,minWidth:120}} value={trendCat} onChange={e=>setTrendCat(e.target.value)}>{CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.id}</option>)}</select><button className="cbtn" onClick={async()=>{setTrendL(true);try{const d=await apiCall("trending",{category:trendCat});setTrendD(d);}catch{}setTrendL(false);}} disabled={trendL}>{trendL?"⏳":"🔥 Get"}</button></div>
            {trendL&&<div className="ssp"/>}
            {trendD&&!trendL&&<div className="tgrid fa">{trendD.products?.map((p,i)=><div key={i} className="tcard"><div className="trnk">{i+1}</div><div style={{fontWeight:700,fontSize:11,color:"#e2e8f0",marginBottom:3}}>{p.name}</div><div style={{color:"#64748b",fontSize:10,marginBottom:5,lineHeight:1.5}}>{p.why_trending}</div><div style={{color:"#f59e0b",fontSize:10,fontWeight:600,marginBottom:4}}>💰 {p.price_range}</div><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{p.tags?.map((t,j)=><span key={j} className="tc">{t}</span>)}</div></div>)}</div>}
          </div>}

          {tab==="competitor" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>⚔️ Competitor Analysis</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Top 4 competitors — prices, strengths & weaknesses</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <button className="cbtn" onClick={async()=>{setCompL(true);try{const d=await apiCall("competitor");setCompD(d);}catch{}setCompL(false);}} disabled={compL||!pf.name}>{compL?"⏳ Analyzing...":"🔍 Analyze Competitors"}</button>
            {compL&&<div className="ssp"/>}
            {compD&&!compL&&<div style={{marginTop:13}} className="fa">{compD.competitors?.map((c,i)=><div key={i} className="cc"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4,flexWrap:"wrap",gap:4}}><div style={{fontWeight:700,fontSize:12,color:"#e2e8f0"}}>🏪 {c.name}</div><div style={{display:"flex",gap:4}}><span style={{background:"rgba(245,158,11,.1)",color:"#f59e0b",borderRadius:5,padding:"1px 6px",fontSize:10,fontWeight:700}}>{c.price}</span><span style={{color:"#64748b",fontSize:10}}>⭐ {c.rating}</span></div></div><div className="ccrow"><div className="ccbox"><div className="ccbt" style={{color:"#10b981"}}>✅ Strengths</div>{c.strengths?.map((s,j)=><div key={j} className="cpt"><span style={{color:"#10b981"}}>+</span><span>{s}</span></div>)}</div><div className="ccbox"><div className="ccbt" style={{color:"#ef4444"}}>❌ Weaknesses</div>{c.weaknesses?.map((w,j)=><div key={j} className="cpt"><span style={{color:"#ef4444"}}>-</span><span>{w}</span></div>)}</div></div>{c.opportunity&&<div style={{marginTop:7,background:"rgba(99,102,241,.07)",border:"1px solid rgba(99,102,241,.18)",borderRadius:6,padding:"6px 9px",color:"#a5b4fc",fontSize:10}}>💡 {c.opportunity}</div>}</div>)}</div>}
          </div>}

          {tab==="supplier" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>📦 Supplier Finder</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Best suppliers with price, MOQ & tips</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <button className="cbtn" style={{background:"linear-gradient(135deg,#10b981,#059669)"}} onClick={async()=>{setSuppL(true);try{const d=await apiCall("supplier");setSuppD(d);}catch{}setSuppL(false);}} disabled={suppL||!pf.name}>{suppL?"⏳ Finding...":"🔍 Find Suppliers"}</button>
            {suppL&&<div className="ssp"/>}
            {suppD&&!suppL&&<div style={{marginTop:13}} className="fa">{suppD.suppliers?.map((s,i)=><div key={i} className="sc"><div style={{fontWeight:700,fontSize:12,color:"#e2e8f0",marginBottom:5}}>🏭 {s.name}</div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:5}}><span className="schip">💰 {s.price_range}</span><span className="schip">📦 MOQ: {s.moq}</span><span className="schip">⭐ {s.rating}</span><span className="schip">🚚 {s.delivery}</span></div><div style={{color:"#94a3b8",fontSize:10,marginBottom:4}}>{s.description}</div>{s.tip&&<div style={{background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.2)",borderRadius:7,padding:"5px 8px",color:"#f59e0b",fontSize:10,marginBottom:4}}>💡 {s.tip}</div>}<a className="slink" href={s.search_url||"#"} target="_blank" rel="noreferrer">🔗 Search on {s.platform}</a></div>)}</div>}
          </div>}

          {tab==="sales" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>📊 Sales Estimator</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Monthly sales & revenue forecast</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <button className="cbtn" onClick={async()=>{setSalesL(true);try{const d=await apiCall("sales_estimator");setSalesD(d);}catch{}setSalesL(false);}} disabled={salesL||!pf.name}>{salesL?"⏳ Estimating...":"📊 Estimate Sales"}</button>
            {salesL&&<div className="ssp"/>}
            {salesD&&!salesL&&<div style={{marginTop:13}} className="fa"><div className="presult" style={{marginBottom:9}}>{[{l:"Low Units",v:(salesD.monthly_units?.low||0)+" units",c:"#ef4444"},{l:"Avg Units",v:(salesD.monthly_units?.medium||0)+" units",c:"#f59e0b"},{l:"High Units",v:(salesD.monthly_units?.high||0)+" units",c:"#10b981"}].map(r=><div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c,fontSize:13}}>{r.v}</div></div>)}</div><div className="presult" style={{marginBottom:9}}>{[{l:"Low Revenue",v:salesD.monthly_revenue?.low,c:"#ef4444"},{l:"Avg Revenue",v:salesD.monthly_revenue?.medium,c:"#f59e0b"},{l:"High Revenue",v:salesD.monthly_revenue?.high,c:"#10b981"}].map(r=><div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c,fontSize:12}}>{r.v}</div></div>)}</div>{salesD.tips?.length>0&&<div className="gcard"><div className="gct" style={{marginBottom:5}}>💡 Tips</div>{salesD.tips.map((t,i)=><div key={i} style={{color:"#94a3b8",fontSize:10,padding:"2px 0",display:"flex",gap:4}}><span style={{color:"#10b981"}}>✓</span><span>{t}</span></div>)}</div>}</div>}
          </div>}

          {tab==="price" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>🏷️ Price Optimizer</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Best price to maximize profit</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <button className="cbtn" style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)"}} onClick={async()=>{setPriceL(true);try{const d=await apiCall("price_optimizer");setPriceD(d);}catch{}setPriceL(false);}} disabled={priceL||!pf.name}>{priceL?"⏳ Optimizing...":"🏷️ Optimize Price"}</button>
            {priceL&&<div className="ssp"/>}
            {priceD&&!priceL&&<div style={{marginTop:13}} className="fa"><div style={{background:"linear-gradient(135deg,rgba(16,185,129,.1),rgba(6,95,70,.1))",border:"1px solid rgba(16,185,129,.3)",borderRadius:11,padding:13,textAlign:"center",marginBottom:9}}><div style={{fontSize:10,color:"#64748b",marginBottom:2}}>Recommended Price</div><div style={{fontSize:26,fontWeight:900,color:"#10b981"}}>{priceD.recommended_price}</div></div>{priceD.competitor_prices?.length>0&&<div className="gcard" style={{marginBottom:7}}><div className="gct" style={{marginBottom:5}}>⚔️ Competitor Prices</div>{priceD.competitor_prices.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,.04)",color:"#94a3b8",fontSize:11}}><span>{c.seller}</span><span style={{color:"#f59e0b",fontWeight:600}}>{c.price}</span></div>)}</div>}{priceD.psychological_tricks?.length>0&&<div className="gcard"><div className="gct" style={{marginBottom:5}}>🧠 Pricing Tips</div>{priceD.psychological_tricks.map((t,i)=><div key={i} style={{color:"#94a3b8",fontSize:10,padding:"2px 0",display:"flex",gap:4}}><span style={{color:"#a5b4fc"}}>→</span><span>{t}</span></div>)}</div>}</div>}
          </div>}

          {tab==="inventory" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>📦 Inventory Calculator</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>Plan stock to never overstock</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <div className="prow"><div className="pfield"><label>Starting Units</label><input type="number" placeholder="50" value={invtF.units} onChange={e=>setInvtF({units:e.target.value})}/></div></div>
            <button className="gbtn2" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}} onClick={async()=>{setInvtL(true);try{const d=await apiCall("inventory",{units:invtF.units});setInvtD(d);}catch{}setInvtL(false);}} disabled={invtL||!pf.name}>{invtL?"⏳ Calculating...":"📦 Calculate"}</button>
            {invtL&&<div className="ssp"/>}
            {invtD&&!invtL&&<div style={{marginTop:13}} className="fa"><div className="presult" style={{marginBottom:9}}>{[{l:"Starter Stock",v:invtD.recommended_stock?.starter,c:"#10b981"},{l:"Safe Stock",v:invtD.recommended_stock?.safe,c:"#f59e0b"},{l:"Reorder At",v:invtD.reorder_point,c:"#ef4444"}].map(r=><div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c,fontSize:11}}>{r.v}</div></div>)}</div><div className="gcard"><div className="gct" style={{marginBottom:5}}>📋 Info</div><div style={{color:"#94a3b8",fontSize:11}}><span style={{color:"#f59e0b"}}>Storage: </span>{invtD.storage_cost}</div><div style={{color:"#94a3b8",fontSize:11,marginTop:2}}><span style={{color:"#a5b4fc"}}>Duration: </span>{invtD.turnover_days}</div><div style={{color:"#94a3b8",fontSize:11,marginTop:2}}><span style={{color:"#ef4444"}}>Risk: </span>{invtD.risk}</div></div></div>}
          </div>}

          {tab==="review" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>⭐ Review Analyzer</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>What customers love & hate</p>
            {!pf.name&&<div className="errbanner">⚠️ Run product analysis first</div>}
            <button className="cbtn" style={{background:"linear-gradient(135deg,#f59e0b,#f97316)"}} onClick={async()=>{setRevL(true);try{const d=await apiCall("review_analyzer");setRevD(d);}catch{}setRevL(false);}} disabled={revL||!pf.name}>{revL?"⏳ Analyzing...":"⭐ Analyze Reviews"}</button>
            {revL&&<div className="ssp"/>}
            {revD&&!revL&&<div style={{marginTop:13}} className="fa"><div style={{background:"rgba(99,102,241,.07)",border:"1px solid rgba(99,102,241,.2)",borderRadius:10,padding:11,textAlign:"center",marginBottom:9}}><div style={{fontSize:10,color:"#64748b"}}>Sentiment Score</div><div style={{fontSize:22,fontWeight:900,color:"#6366f1"}}>{revD.sentiment_score}</div></div><div className="ccrow" style={{marginBottom:7}}><div className="ccbox"><div className="ccbt" style={{color:"#10b981"}}>❤️ Love</div>{revD.what_customers_love?.map((l,i)=><div key={i} className="cpt"><span style={{color:"#10b981"}}>+</span><span>{l}</span></div>)}</div><div className="ccbox"><div className="ccbt" style={{color:"#ef4444"}}>😠 Hate</div>{revD.common_complaints?.map((c,i)=><div key={i} className="cpt"><span style={{color:"#ef4444"}}>-</span><span>{c}</span></div>)}</div></div>{revD.opportunities?.length>0&&<div className="gcard"><div className="gct" style={{marginBottom:5}}>💡 Opportunities</div>{revD.opportunities.map((o,i)=><div key={i} style={{color:"#94a3b8",fontSize:10,padding:"2px 0",display:"flex",gap:4}}><span style={{color:"#a5b4fc"}}>→</span><span>{o}</span></div>)}</div>}</div>}
          </div>}

          {tab==="niche" && <div className="fbox fa" style={{position:"relative"}}>{isLocked&&<LockBox/>}
            <h3 style={{fontWeight:800,fontSize:14,marginBottom:2,color:"#f8fafc"}}>🎯 Niche Finder</h3>
            <p style={{color:"#64748b",fontSize:10,marginBottom:11}}>6 untapped profitable niches in India</p>
            <button className="cbtn" style={{background:"linear-gradient(135deg,#a855f7,#7c3aed)"}} onClick={async()=>{setNicheL(true);try{const d=await apiCall("niche_finder");setNicheD(d);}catch{}setNicheL(false);}} disabled={nicheL}>{nicheL?"⏳ Finding...":"🎯 Find Niches"}</button>
            {nicheL&&<div className="ssp"/>}
            {nicheD&&!nicheL&&<div className="tgrid fa" style={{marginTop:13}}>{nicheD.niches?.map((n,i)=><div key={i} className="tcard"><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}><div className="trnk">{i+1}</div><div style={{fontWeight:700,fontSize:11,color:"#e2e8f0"}}>{n.name}</div></div><div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}><span style={{background:"rgba(16,185,129,.1)",color:"#10b981",borderRadius:5,padding:"1px 5px",fontSize:9,fontWeight:600}}>Comp: {n.competition}</span><span style={{background:"rgba(245,158,11,.1)",color:"#f59e0b",borderRadius:5,padding:"1px 5px",fontSize:9,fontWeight:600}}>Margin: {n.profit_margin}</span></div><div style={{color:"#64748b",fontSize:10,marginBottom:4,lineHeight:1.5}}>{n.why_untapped}</div><div style={{color:"#a5b4fc",fontSize:9,marginBottom:3}}>💰 {n.investment}</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{n.example_products?.map((p,j)=><span key={j} className="tc">{p}</span>)}</div><div style={{marginTop:4,fontSize:9,color:n.trend==="Growing"?"#10b981":"#f59e0b",fontWeight:600}}>📈 {n.trend}</div></div>)}</div>}
          </div>}

        </div>
          {tab==="failpred"&&(
            <div className="fbox fa">
              <h3 className="ict">🔮 AI Failure Predictor</h3>
              <p style={{color:"#64748b",fontSize:11,marginBottom:14}}>Launch se pehle janno — product succeed karega ya fail?</p>
              <div className="prow">
                <div className="pfield">
                  <label className="ilbl">Product Name</label>
                  <input className="di" placeholder="e.g. Wireless Earbuds" value={fpF.name} onChange={e=>setFpF({...fpF,name:e.target.value})}/>
                </div>
                <div className="pfield">
                  <label className="ilbl">Selling Price (₹)</label>
                  <input className="di" type="number" placeholder="e.g. 499" value={fpF.price} onChange={e=>setFpF({...fpF,price:e.target.value})}/>
                </div>
              </div>
              <div style={{marginBottom:8}}>
                <label className="ilbl">Category</label>
                <button className={"pick-btn"+(fpF.cat?" sel":"")} onClick={()=>{setFpShowCats(!fpShowCats);setFpShowPlats(false);}}>
                  <span style={{display:"flex",alignItems:"center",gap:6}}>
                    {fpF.cat&&(()=>{const ct=CATS.find(c=>c.id===fpF.cat);return ct?.logo?<img src={ct.logo} alt={fpF.cat} style={{width:15,height:15,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span>{ct?.e||"📂"}</span>;})()}
                    <span>{fpF.cat||"Select Category"}</span>
                  </span>
                  <span style={{fontSize:10,color:"#6366f1"}}>{fpShowCats?"▲":"▼"}</span>
                </button>
                {fpShowCats&&(
                  <div className="pick-drop">
                    {["Physical","Digital"].map(g=>(
                      <div key={g}>
                        <span className="pglbl">{g}</span>
                        <div className="chips">
                          {CATS.filter(c=>c.g===g).map(c=>(
                            <button key={c.id} className={"chip"+(fpF.cat===c.id?" on":"")} onClick={()=>{setFpF({...fpF,cat:c.id});setFpShowCats(false);}}>
                              {c.logo?<img src={c.logo} alt={c.id} style={{width:14,height:14,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:11}}>{c.e}</span>}{c.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{marginBottom:12}}>
                <label className="ilbl">Platform</label>
                <button className={"pick-btn"+(fpF.plat?" sel":"")} onClick={()=>{setFpShowPlats(!fpShowPlats);setFpShowCats(false);}}>
                  <span style={{display:"flex",alignItems:"center",gap:6}}>
                    {fpF.plat&&(()=>{const pl=PLATS.find(p=>p.id===fpF.plat);return pl?.logo?<img src={pl.logo} alt={fpF.plat} style={{width:15,height:15,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span>{pl?.e||"🌐"}</span>;})()}
                    <span>{fpF.plat||"Select Platform"}</span>
                  </span>
                  <span style={{fontSize:10,color:"#6366f1"}}>{fpShowPlats?"▲":"▼"}</span>
                </button>
                {fpShowPlats&&(
                  <div className="pick-drop">
                    {["Ecommerce","Social","Stores","Courses","Freelance","Food","Other"].map(g=>(
                      PLATS.filter(p=>p.g===g).length>0&&(
                        <div key={g}>
                          <span className="pglbl">{g}</span>
                          <div className="chips">
                            {PLATS.filter(p=>p.g===g).map(p=>(
                              <button key={p.id} className={"chip"+(fpF.plat===p.id?" on":"")} onClick={()=>{setFpF({...fpF,plat:p.id});setFpShowPlats(false);}}>
                                {p.logo?<img src={p.logo} alt={p.id} style={{width:13,height:13,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:11}}>{p.e}</span>}{p.id}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
              <button className="gbtn2" style={{background:"linear-gradient(135deg,#8b5cf6,#6366f1)"}} disabled={fpL||!fpF.name||!fpF.price} onClick={async()=>{
                setFpL(true);setFpR(null);
                try{
                  const res=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:fpF.name,category:fpF.cat,platform:fpF.plat,mode:"failure_predictor",price:fpF.price})});
                  const d=await res.json();
                  setFpR(d);
                }catch{showT("Failed. Try again.");}
                setFpL(false);
              }}>{fpL?"Analyzing...":"🔮 Predict Success / Failure"}</button>
              {fpL&&<div className="ssp"/>}
              {fpR&&!fpL&&(
                <div style={{marginTop:14}} className="fa">
                  <div style={{background:parseInt(String(fpR.success_chance||"0").replace("%",""))>=60?"rgba(16,185,129,.08)":"rgba(239,68,68,.08)",border:"1px solid rgba(99,102,241,.2)",borderRadius:16,padding:20,textAlign:"center",marginBottom:12}}>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>Success Chance</div>
                    <div style={{fontSize:52,fontWeight:900,lineHeight:1,color:parseInt(String(fpR.success_chance||"0").replace("%",""))>=60?"#10b981":parseInt(String(fpR.success_chance||"0").replace("%",""))>=40?"#f59e0b":"#ef4444"}}>{fpR.success_chance||"N/A"}</div>
                    <div style={{height:8,background:"rgba(255,255,255,.08)",borderRadius:100,margin:"12px 0",overflow:"hidden"}}>
                      <div style={{height:"100%",width:String(fpR.success_chance||"0%").includes("%")?fpR.success_chance:fpR.success_chance+"%",background:"linear-gradient(90deg,#6366f1,#10b981)",borderRadius:100}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
                      {fpR.risk_level&&<span style={{background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.2)",borderRadius:100,padding:"3px 12px",fontSize:11,color:"#a5b4fc",fontWeight:700}}>Risk: {fpR.risk_level}</span>}
                      {fpR.suggested_price&&<span style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",borderRadius:100,padding:"3px 12px",fontSize:11,color:"#10b981",fontWeight:700}}>{fpR.suggested_price}</span>}
                    </div>
                  </div>
                  {fpR.verdict&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5}}>Verdict</div><p className="gctx">{fpR.verdict}</p></div>}
                  {fpR.win_factors?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:6,color:"#10b981"}}>Win Factors</div>{fpR.win_factors.map((w,i)=><div key={i} style={{display:"flex",gap:6,padding:"3px 0",fontSize:11,color:"#94a3b8"}}><span style={{color:"#10b981",flexShrink:0}}>+</span><span>{w}</span></div>)}</div>}
                  {fpR.fail_risks?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:6,color:"#ef4444"}}>Failure Risks</div>{fpR.fail_risks.map((r,i)=><div key={i} style={{display:"flex",gap:6,padding:"3px 0",fontSize:11,color:"#94a3b8"}}><span style={{color:"#ef4444",flexShrink:0}}>-</span><span>{r}</span></div>)}</div>}
                  {fpR.action_plan?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:6}}>Action Plan</div>{fpR.action_plan.map((a,i)=><div key={i} style={{display:"flex",gap:6,padding:"3px 0",fontSize:11,color:"#94a3b8"}}><span style={{color:"#6366f1",flexShrink:0,fontWeight:700}}>{i+1}.</span><span>{a}</span></div>)}</div>}
                  {fpR.break_even&&<div style={{background:"rgba(99,102,241,.06)",border:"1px solid rgba(99,102,241,.15)",borderRadius:10,padding:11}}><div style={{fontWeight:700,color:"#a5b4fc",fontSize:11,marginBottom:4}}>Break-Even</div><p style={{color:"#94a3b8",fontSize:11,lineHeight:1.65}}>{fpR.break_even}</p></div>}
                </div>
              )}
            </div>
          )}

          {tab==="gst"&&(
            <div className="fbox fa">
              <h3 className="ict">🧾 GST Calculator</h3>
              <p style={{color:"#64748b",fontSize:10,marginBottom:12}}>Selling price ke baad actual earning GST ke saath</p>
              <div className="prow">
                <div className="pfield">
                  <label>Selling Price (&#8377;)</label>
                  <input type="number" className="di" placeholder="500" value={gstSell} onChange={e=>setGstSell(e.target.value)}/>
                </div>
                <div className="pfield">
                  <label>GST Rate</label>
                  <select className="di" value={gstRate} onChange={e=>setGstRate(e.target.value)}>
                    <option value="0">0% - Essentials</option>
                    <option value="5">5% - Food/Books</option>
                    <option value="12">12% - Fashion/Home</option>
                    <option value="18">18% - Electronics</option>
                    <option value="28">28% - Luxury</option>
                  </select>
                </div>
              </div>
              <button className="cbtn" style={{width:"100%"}} onClick={()=>{
                const s=parseFloat(gstSell)||0;
                const r=parseFloat(gstRate)||0;
                const base=s/(1+r/100);
                const gst=s-base;
                setGstRes({sell:s.toFixed(2),base:base.toFixed(2),gst:gst.toFixed(2),cgst:(gst/2).toFixed(2),sgst:(gst/2).toFixed(2)});
              }}>Calculate GST</button>
              {gstRes&&(
                <div style={{marginTop:12}} className="fa">
                  <div style={{background:"rgba(99,102,241,.08)",border:"1px solid rgba(99,102,241,.2)",borderRadius:12,padding:14,textAlign:"center",marginBottom:10}}>
                    <div style={{fontSize:10,color:"#64748b",marginBottom:2}}>GST Amount</div>
                    <div style={{fontSize:28,fontWeight:900,color:"#ef4444"}}>&#8377;{gstRes.gst}</div>
                  </div>
                  <div className="presult">
                    {[{l:"Sell Price",v:"&#8377;"+gstRes.sell,c:"#f8fafc"},{l:"Base Price",v:"&#8377;"+gstRes.base,c:"#10b981"},{l:"CGST",v:"&#8377;"+gstRes.cgst,c:"#f59e0b"},{l:"SGST",v:"&#8377;"+gstRes.sgst,c:"#f59e0b"}].map(r=>(
                      <div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c}}>{r.v}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab==="shipping"&&(
            <div className="fbox fa">
              <h3 className="ict">🚚 Shipping Comparator</h3>
              <p style={{color:"#64748b",fontSize:10,marginBottom:12}}>Best courier dhundho — rate compare karo</p>
              <div className="prow">
                <div className="pfield">
                  <label>Weight (kg)</label>
                  <input type="number" className="di" placeholder="0.5" step="0.1" value={shipW} onChange={e=>setShipW(e.target.value)}/>
                </div>
                <div className="pfield">
                  <label>Zone</label>
                  <select className="di" value={shipZone} onChange={e=>setShipZone(e.target.value)}>
                    <option value="local">Local (Same City)</option>
                    <option value="zone1">Zone 1 (Nearby State)</option>
                    <option value="zone2">Zone 2 (Far State)</option>
                    <option value="zone3">Zone 3 (Extreme Far)</option>
                  </select>
                </div>
                <div className="pfield">
                  <label>Payment</label>
                  <select className="di" value={shipCod} onChange={e=>setShipCod(e.target.value)}>
                    <option value="no">Prepaid</option>
                    <option value="yes">COD</option>
                  </select>
                </div>
              </div>
              <button className="cbtn" style={{width:"100%"}} onClick={()=>{
                const wt=parseFloat(shipW)||0.5;
                const isCod=shipCod==="yes";
                const zm={local:1,zone1:1.3,zone2:1.6,zone3:2}[shipZone]||1;
                const couriers=[
                  {n:"Delhivery",b:35,p:45,c:"#ef4444"},
                  {n:"Shiprocket",b:40,p:50,c:"#6366f1"},
                  {n:"Amazon FBA",b:30,p:40,c:"#f59e0b"},
                  {n:"Ekart",b:28,p:38,c:"#10b981"},
                  {n:"Shadowfax",b:32,p:42,c:"#8b5cf6"},
                  {n:"XpressBees",b:36,p:46,c:"#f97316"},
                ].map(c=>({...c,cost:Math.round((c.b+c.p*Math.max(0.5,wt))*zm+(isCod?35:0))}))
                 .sort((a,b)=>a.cost-b.cost);
                setShipRes({couriers,isCod});
              }}>Compare Rates</button>
              {shipRes&&(
                <div style={{marginTop:12}} className="fa">
                  {shipRes.couriers.map((c,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",background:i===0?"rgba(16,185,129,.07)":"rgba(2,8,23,.4)",border:i===0?"1px solid rgba(16,185,129,.25)":"1px solid #1e293b",borderRadius:10,marginBottom:6}}>
                      {i===0&&<div style={{fontSize:9,fontWeight:800,background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",padding:"2px 6px",borderRadius:100,flexShrink:0}}>BEST</div>}
                      <div style={{width:8,height:8,borderRadius:"50%",background:c.c,flexShrink:0}}/>
                      <div style={{flex:1,fontWeight:600,fontSize:12,color:"#e2e8f0"}}>{c.n}</div>
                      <div style={{fontWeight:900,fontSize:14,color:i===0?"#10b981":"#f8fafc"}}>&#8377;{c.cost}</div>
                    </div>
                  ))}
                  {shipRes.isCod&&<div style={{fontSize:11,color:"#f59e0b",padding:"6px 0"}}>COD charge (+&#8377;35) included</div>}
                </div>
              )}
            </div>
          )}

        <footer>🧠 YesYouPro · AI Product Analyzer · Made in India 🇮🇳 · © 2025</footer>
      </div>}
    </>
  );
}
