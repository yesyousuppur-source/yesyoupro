// YesYouPro v3.0 - Clean Build
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const FREE_LIMIT = 5;
const PREM_LIMIT = 50;
const PREM_DAYS = 30;

const FB = {
  apiKey:"AIzaSyDww7gi4QRRNm4t3PFQ9ny8a2WLV-V9OFU",
  authDomain:"mood2meet-85866.firebaseapp.com",
  projectId:"mood2meet-85866",
};

const S = {
  get:(k)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):null; }catch{return null;} },
  set:(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

let _auth=null;
async function getFA(){
  if(_auth) return _auth;
  const {initializeApp,getApps}=await import("firebase/app");
  const {getAuth}=await import("firebase/auth");
  const app=getApps().length?getApps()[0]:initializeApp(FB);
  _auth=getAuth(app); return _auth;
}

const CATS=[
  {id:"Electronics",logo:"https://cdn.simpleicons.org/samsung/1428A0",g:"Physical"},
  {id:"Beauty & Skincare",logo:"https://cdn.simpleicons.org/sephora/000000",g:"Physical"},
  {id:"Home & Kitchen",logo:"https://cdn.simpleicons.org/ikea/0058A3",g:"Physical"},
  {id:"Fitness",logo:"https://cdn.simpleicons.org/peloton/000000",g:"Physical"},
  {id:"Fashion",logo:"https://cdn.simpleicons.org/uniqlo/FF0000",g:"Physical"},
  {id:"Pet Supplies",logo:null,e:"Pets",g:"Physical"},
  {id:"Toys & Games",logo:"https://cdn.simpleicons.org/lego/E3000B",g:"Physical"},
  {id:"Health & Wellness",logo:"https://cdn.simpleicons.org/headspace/F47D31",g:"Physical"},
  {id:"Outdoor & Sports",logo:"https://cdn.simpleicons.org/decathlon/0082C3",g:"Physical"},
  {id:"Food & Beverages",logo:"https://cdn.simpleicons.org/zomato/E23744",g:"Physical"},
  {id:"Books",logo:"https://cdn.simpleicons.org/audible/F8991C",g:"Physical"},
  {id:"Travel & Luggage",logo:"https://cdn.simpleicons.org/airbnb/FF5A5F",g:"Physical"},
  {id:"Art & Crafts",logo:"https://cdn.simpleicons.org/etsy/F56400",g:"Physical"},
  {id:"Office Supplies",logo:"https://cdn.simpleicons.org/notion/000000",g:"Physical"},
  {id:"Music & Audio",logo:"https://cdn.simpleicons.org/spotify/1DB954",g:"Physical"},
  {id:"Mobile Apps",logo:"https://cdn.simpleicons.org/android/3DDC84",g:"Digital"},
  {id:"PC / Console Games",logo:"https://cdn.simpleicons.org/steam/000000",g:"Digital"},
  {id:"Online Courses",logo:"https://cdn.simpleicons.org/udemy/A435F0",g:"Digital"},
  {id:"Software & SaaS",logo:"https://cdn.simpleicons.org/microsoftazure/0078D4",g:"Digital"},
  {id:"Website / Blog",logo:"https://cdn.simpleicons.org/wordpress/21759B",g:"Digital"},
  {id:"YouTube Channel",logo:"https://cdn.simpleicons.org/youtube/FF0000",g:"Digital"},
  {id:"Instagram Page",logo:"https://cdn.simpleicons.org/instagram/E1306C",g:"Digital"},
  {id:"Podcast",logo:"https://cdn.simpleicons.org/spotify/1DB954",g:"Digital"},
  {id:"NFT & Crypto",logo:"https://cdn.simpleicons.org/ethereum/627EEA",g:"Digital"},
  {id:"Freelance Services",logo:"https://cdn.simpleicons.org/fiverr/1DBF73",g:"Digital"},
  {id:"Dropshipping",logo:"https://cdn.simpleicons.org/shopify/96BF48",g:"Digital"},
  {id:"Digital Products",logo:"https://cdn.simpleicons.org/gumroad/FF90E8",g:"Digital"},
  {id:"Any Other",logo:null,e:"Other",g:"Digital"},
];

const PLATS=[
  {id:"Amazon",logo:"https://cdn.simpleicons.org/amazon/FF9900",c:"#FF9900",g:"Ecommerce"},
  {id:"Flipkart",logo:"https://cdn.simpleicons.org/flipkart/2874F0",c:"#2874f0",g:"Ecommerce"},
  {id:"Meesho",logo:"https://cdn.simpleicons.org/meesho/F43397",c:"#e91e8c",g:"Ecommerce"},
  {id:"Shopify",logo:"https://cdn.simpleicons.org/shopify/96BF48",c:"#96bf48",g:"Ecommerce"},
  {id:"Etsy",logo:"https://cdn.simpleicons.org/etsy/F56400",c:"#f56400",g:"Ecommerce"},
  {id:"Nykaa",logo:"https://cdn.simpleicons.org/nykaa/FC2779",c:"#fc2779",g:"Ecommerce"},
  {id:"WooCommerce",logo:"https://cdn.simpleicons.org/woocommerce/7F54B3",c:"#7f54b3",g:"Ecommerce"},
  {id:"Instagram",logo:"https://cdn.simpleicons.org/instagram/E1306C",c:"#e1306c",g:"Social"},
  {id:"Facebook",logo:"https://cdn.simpleicons.org/facebook/1877F2",c:"#1877f2",g:"Social"},
  {id:"YouTube",logo:"https://cdn.simpleicons.org/youtube/FF0000",c:"#ff0000",g:"Social"},
  {id:"WhatsApp Business",logo:"https://cdn.simpleicons.org/whatsapp/25D366",c:"#25d366",g:"Social"},
  {id:"TikTok",logo:"https://cdn.simpleicons.org/tiktok/000000",c:"#010101",g:"Social"},
  {id:"Pinterest",logo:"https://cdn.simpleicons.org/pinterest/E60023",c:"#e60023",g:"Social"},
  {id:"X (Twitter)",logo:"https://cdn.simpleicons.org/x/000000",c:"#14171a",g:"Social"},
  {id:"LinkedIn",logo:"https://cdn.simpleicons.org/linkedin/0077B5",c:"#0077b5",g:"Social"},
  {id:"Telegram",logo:"https://cdn.simpleicons.org/telegram/26A5E4",c:"#0088cc",g:"Social"},
  {id:"Discord",logo:"https://cdn.simpleicons.org/discord/5865F2",c:"#5865f2",g:"Social"},
  {id:"Reddit",logo:"https://cdn.simpleicons.org/reddit/FF4500",c:"#ff4500",g:"Social"},
  {id:"Google Play Store",logo:"https://cdn.simpleicons.org/googleplay/414141",c:"#01875f",g:"Stores"},
  {id:"Apple App Store",logo:"https://cdn.simpleicons.org/apple/000000",c:"#0071e3",g:"Stores"},
  {id:"Steam",logo:"https://cdn.simpleicons.org/steam/000000",c:"#1b2838",g:"Stores"},
  {id:"Udemy",logo:"https://cdn.simpleicons.org/udemy/A435F0",c:"#a435f0",g:"Courses"},
  {id:"Fiverr",logo:"https://cdn.simpleicons.org/fiverr/1DBF73",c:"#1dbf73",g:"Freelance"},
  {id:"Upwork",logo:"https://cdn.simpleicons.org/upwork/6FDA44",c:"#14a800",g:"Freelance"},
  {id:"Zomato",logo:"https://cdn.simpleicons.org/zomato/E23744",c:"#e23744",g:"Food"},
  {id:"Own Website",logo:"https://cdn.simpleicons.org/googlechrome/4285F4",c:"#6366f1",g:"Other"},
  {id:"Any Other",logo:null,e:"Other",c:"#94a3b8",g:"Other"},
];

export default function App() {
  const [screen,setScreen]=useState("loading");
  const [user,setUser]=useState(null);
  const [saved,setSaved]=useState([]);
  const [toast,setToast]=useState(null);
  const [showPrem,setShowPrem]=useState(false);
  const [showPay,setShowPay]=useState(false);
  const [payStep,setPayStep]=useState("form");
  const [showProf,setShowProf]=useState(false);
  const [profTab,setProfTab]=useState("main");
  const [pf,setPf]=useState({name:"",cat:"",plat:""});
  const [showCats,setShowCats]=useState(false);
  const [showPlats,setShowPlats]=useState(false);
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [tab,setTab]=useState("profit");
  const [usage,setUsage]=useState({used:0,remaining:FREE_LIMIT,plan:"free"});
  const [authMode,setAuthMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [authErr,setAuthErr]=useState("");
  const [authLoad,setAuthLoad]=useState(false);
  const [dark,setDark]=useState(()=>{ if(typeof window!=="undefined"){const s=S.get("yyp_theme");if(s===null)return false;return s!==false;}return false; });
  const [history,setHistory]=useState([]);
  const [showHist,setShowHist]=useState(false);
  const [refCopied,setRefCopied]=useState(false);
  // Tool states
  const [profR,setProfR]=useState(null);
  const [profF,setProfF]=useState({buy:"",sell:"",ship:"",plat:"",qty:"1"});
  const [invR,setInvR]=useState(null);
  const [invF,setInvF]=useState({budget:"",cost:"",sell:"",ship:""});
  const [salesD,setSalesD]=useState(null);const [salesL,setSalesL]=useState(false);
  const [invtD,setInvtD]=useState(null);const [invtL,setInvtL]=useState(false);
  const [descD,setDescD]=useState(null);const [descL,setDescL]=useState(false);
  const [trendD,setTrendD]=useState(null);const [trendL,setTrendL]=useState(false);
  const [compD,setCompD]=useState(null);const [compL,setCompL]=useState(false);
  const [suppD,setSuppD]=useState(null);const [suppL,setSuppL]=useState(false);
  const [priceD,setPriceD]=useState(null);const [priceL,setPriceL]=useState(false);
  const [revD,setRevD]=useState(null);const [revL,setRevL]=useState(false);
  const [nicheD,setNicheD]=useState(null);const [nicheL,setNicheL]=useState(false);
  const [starterD,setStarterD]=useState(null);const [starterL,setStarterL]=useState(false);
  const [beginD,setBeginD]=useState(null);const [beginL,setBeginL]=useState(false);
  const [gstF,setGstF]=useState({sell:"",rate:"12"});
  const [gstR,setGstR]=useState(null);
  const [shipF,setShipF]=useState({weight:"0.5",zone:"zone1",cod:"no"});
  const [shipR,setShipR]=useState(null);
  const [roasF,setRoasF]=useState({spend:"",sales:"",platform:"Instagram"});
  const [roasR,setRoasR]=useState(null);
  const [launchD,setLaunchD]=useState(null);const [launchL,setLaunchL]=useState(false);
  const [bundleD,setBundleD]=useState(null);const [bundleL,setBundleL]=useState(false);
  const [returnD,setReturnD]=useState(null);const [returnL,setReturnL]=useState(false);
  const [festSeason,setFestSeason]=useState("Diwali");
  const [festD,setFestD]=useState(null);const [festL,setFestL]=useState(false);
  const [cmpA,setCmpA]=useState({name:"",cat:"",plat:""});
  const [cmpB,setCmpB]=useState({name:"",cat:"",plat:""});
  const [cmpRes,setCmpRes]=useState(null);const [cmpL,setCmpL]=useState(false);
  const [waMsgD,setWaMsgD]=useState(null);const [waMsgL,setWaMsgL]=useState(false);
  const [captionD,setCaptionD]=useState(null);const [captionL,setCaptionL]=useState(false);
  const [titleD,setTitleD]=useState(null);const [titleL,setTitleL]=useState(false);
  const [adCopyD,setAdCopyD]=useState(null);const [adCopyL,setAdCopyL]=useState(false);
  const [revRepD,setRevRepD]=useState(null);const [revRepL,setRevRepL]=useState(false);
  const [listChkD,setListChkD]=useState(null);const [listChkL,setListChkL]=useState(false);
  const [reviewTxt,setReviewTxt]=useState("");
  const [listingTxt,setListingTxt]=useState("");
  const [showAd,setShowAd]=useState(false);
  const [adCount,setAdCount]=useState(0);
  const timerRef=useRef(null);

  const showT=(m)=>{ setToast(m); setTimeout(()=>setToast(null),3000); };
  const toggleTheme=()=>{ const nd=!dark; setDark(nd); S.set("yyp_theme",nd); };
  const todayK=()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
  const curPlan=(u)=>u?(S.get("yyp_plan_"+u.email)||"free"):"free";
  const isGuest=!!user?.isGuest;

  const calcUsage=(u)=>{
    if(!u||u.isGuest) return {used:0,remaining:FREE_LIMIT,plan:"free"};
    const plan=S.get("yyp_plan_"+u.email)||"free";
    if(plan==="premium"){
      const pd=S.get("yyp_prem_"+u.email)||{expiry:"",used:0};
      if(pd.expiry&&new Date(pd.expiry)>new Date()){
        return {used:pd.used||0,remaining:PREM_LIMIT-(pd.used||0),plan:"premium"};
      }
      S.set("yyp_plan_"+u.email,"free");
    }
    const dk=S.get("yyp_daily_"+u.email+"_"+todayK())||0;
    return {used:dk,remaining:Math.max(0,FREE_LIMIT-dk),plan:"free"};
  };

  const addUsage=(u)=>{
    if(!u||u.isGuest) return;
    const plan=S.get("yyp_plan_"+u.email)||"free";
    if(plan==="premium"){
      const pd=S.get("yyp_prem_"+u.email)||{used:0};
      pd.used=(pd.used||0)+1;
      S.set("yyp_prem_"+u.email,pd);
    } else {
      const k="yyp_daily_"+u.email+"_"+todayK();
      S.set(k,(S.get(k)||0)+1);
    }
  };

  const startTimer=(u)=>{
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>{ setUsage(calcUsage(u)); },5000);
  };

  const makeGuest=()=>{
    const g={name:"Guest",email:"guest@yyp.com",isGuest:true};
    setUser(g); setUsage(calcUsage(g)); setScreen("dashboard");
    setHistory(S.get("yyp_history")||[]);
  };

  // Referral helpers
  const genRefCode=(email)=>{
    if(!email) return "";
    const base=email.split("@")[0].replace(/[^a-zA-Z0-9]/g,"").toLowerCase().substring(0,8);
    const hash=Math.abs(email.split("").reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0),0)).toString(36).substring(0,4);
    return base+hash;
  };
  const getRefData=(email)=>{
    if(!email) return {code:"",referrals:[],rewarded:false};
    const code=genRefCode(email);
    const data=S.get("yyp_ref_"+email)||{code,referrals:[],rewarded:false};
    if(!data.code) data.code=code;
    return data;
  };
  const getRefLink=(email)=>"https://yesyoupro.com/?ref="+genRefCode(email);
  const copyRefLink=(email)=>{
    const link=getRefLink(email);
    try{ navigator.clipboard.writeText(link).then(()=>{setRefCopied(true);setTimeout(()=>setRefCopied(false),2500);}); }catch{}
  };
  const checkIncomingRef=async(newEmail,newName)=>{
    if(!newEmail) return;
    const savedRef=S.get("yyp_pending_ref");
    const refCode=savedRef||(typeof window!=="undefined"?new URLSearchParams(window.location.search).get("ref"):"");
    if(!refCode) return;
    S.set("yyp_pending_ref",null);
    const allAccounts=S.get("yyp_accounts")||[];
    let referrerEmail=null;
    for(const acc of allAccounts){ if(genRefCode(acc.email)===refCode){referrerEmail=acc.email;break;} }
    if(!referrerEmail||referrerEmail===newEmail) return;
    const refData=getRefData(referrerEmail);
    if(refData.referrals.some(r=>r.email===newEmail)) return;
    refData.referrals.push({email:newEmail,name:newName,time:Date.now()});
    S.set("yyp_ref_"+referrerEmail,refData);
    if(refData.referrals.length>=10&&!refData.rewarded){
      refData.rewarded=true; S.set("yyp_ref_"+referrerEmail,refData);
      const exp=new Date(Date.now()+7*86400000).toISOString();
      S.set("yyp_prem_"+referrerEmail,{expiry:exp,used:0}); S.set("yyp_plan_"+referrerEmail,"premium");
    }
    try{ await fetch("/api/referral",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"register",referrerEmail,newUserEmail:newEmail,newUserName:newName,refCode})}); }catch{}
    if(typeof window!=="undefined") window.history.replaceState({},"","/");
  };

  useEffect(()=>{
    setSaved(S.get("yyp_accounts")||[]);
    setHistory(S.get("yyp_history")||[]);
    if(typeof window!=="undefined"){
      const urlParams=new URLSearchParams(window.location.search);
      const refCode=urlParams.get("ref");
      if(refCode){ S.set("yyp_pending_ref",refCode); window.history.replaceState({},"","/"); }
    }
    const sv=S.get("yyp_current");
    if(sv?.email){ const u={...sv}; setUser(u); setUsage(calcUsage(u)); startTimer(u); setHistory(S.get("yyp_history")||[]); setScreen("dashboard"); }
    else { setScreen("auth"); }
    return()=>{ clearInterval(timerRef.current); };
  },[]);

  const saveAcc=(acc)=>{ const all=S.get("yyp_accounts")||[]; const idx=all.findIndex(a=>a.email===acc.email); if(idx>=0)all[idx]=acc; else all.push(acc); S.set("yyp_accounts",all); setSaved(all); };
  const activatePrem=(u)=>{ const exp=new Date(Date.now()+PREM_DAYS*86400000).toISOString(); S.set("yyp_prem_"+u.email,{expiry:exp,used:0}); S.set("yyp_plan_"+u.email,"premium"); const nu={...u,plan:"premium"}; setUser(nu); setUsage(calcUsage(nu)); S.set("yyp_current",nu); showT("Premium activated! 50 analyses for 30 days!"); setShowPrem(false); setShowPay(false); setPayStep("form"); };

  const handleGoogle=async()=>{
    setAuthLoad(true); setAuthErr("");
    try{
      const auth=await getFA();
      const {GoogleAuthProvider,signInWithPopup}=await import("firebase/auth");
      const provider=new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
      const fu=result.user;
      const acc={name:fu.displayName||"User",email:fu.email,photo:fu.photoURL,plan:"free"};
      saveAcc(acc); S.set("yyp_current",acc); setUser(acc);
      const pendingPrem=S.get("yyp_pending_prem");
      if(pendingPrem){ S.set("yyp_pending_prem",false); activatePrem(acc); }
      else { setUsage(calcUsage(acc)); startTimer(acc); setScreen("dashboard"); setHistory(S.get("yyp_history")||[]); }
      checkIncomingRef(acc.email,acc.name);
    }catch(e){ setAuthErr(e.message||"Google login failed"); }
    setAuthLoad(false);
  };

  const handleAuth=async()=>{
    if(!form.email||!form.password||(authMode==="signup"&&!form.name)){setAuthErr("All fields required");return;}
    setAuthLoad(true); setAuthErr("");
    try{
      const auth=await getFA();
      if(authMode==="signup"){
        const {createUserWithEmailAndPassword,updateProfile}=await import("firebase/auth");
        const cred=await createUserWithEmailAndPassword(auth,form.email,form.password);
        await updateProfile(cred.user,{displayName:form.name});
        const acc={name:form.name,email:form.email,plan:"free"};
        saveAcc(acc); S.set("yyp_current",acc); setUser(acc);
        const pendingPrem=S.get("yyp_pending_prem");
        if(pendingPrem){ S.set("yyp_pending_prem",false); activatePrem(acc); }
        else { setUsage(calcUsage(acc)); startTimer(acc); setScreen("dashboard"); setHistory(S.get("yyp_history")||[]); showT("Welcome to YesYouPro!"); }
        checkIncomingRef(form.email,form.name);
      } else {
        const {signInWithEmailAndPassword}=await import("firebase/auth");
        const cred=await signInWithEmailAndPassword(auth,form.email,form.password);
        const existing=saved.find(a=>a.email===form.email)||{name:cred.user.displayName||"User",email:form.email,plan:"free"};
        saveAcc(existing); S.set("yyp_current",existing); setUser(existing);
        const pendingPrem=S.get("yyp_pending_prem");
        if(pendingPrem){ S.set("yyp_pending_prem",false); activatePrem(existing); }
        else { setUsage(calcUsage(existing)); startTimer(existing); setScreen("dashboard"); setHistory(S.get("yyp_history")||[]); showT("Welcome back!"); }
      }
    }catch(e){ setAuthErr(e.message||"Auth failed"); }
    setAuthLoad(false);
  };

  const handleLogout=async()=>{
    try{ const auth=await getFA(); const {signOut}=await import("firebase/auth"); await signOut(auth); }catch{}
    S.set("yyp_current",null); setUser(null); setResult(null); setScreen("auth"); setHistory([]);
  };

  const handlePay=()=>{
    if(typeof window==="undefined") return;
    const script=document.createElement("script");
    script.src="https://checkout.razorpay.com/v1/checkout.js";
    script.onload=()=>{
      const kd=S.get("yyp_kd")||{key:"rzp_live_SXt6Nkr66vAkjk"};
      const options={
        key:kd.key,
        amount:94900,currency:"INR",name:"YesYouPro",description:"Premium 30 Days - 50 Analyses",
        handler:(res)=>{ if(res.razorpay_payment_id){ if(!user||isGuest){ S.set("yyp_pending_prem",true); setShowPrem(false); setShowPay(false); setPayStep("form"); setScreen("auth"); } else { activatePrem(user); } } },
        prefill:{name:user?.name||"",email:user?.email||""},
        theme:{color:"#6366f1"},
      };
      const rzp=new window.Razorpay(options);
      rzp.open();
    };
    document.head.appendChild(script);
  };

  const apiCall=async(mode,extra={})=>{
    const res=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:pf.name,category:pf.cat,platform:pf.plat,mode,...extra})});
    return res.json();
  };

  const showInterAd=()=>{ setAdCount(c=>c+1); if((adCount+1)%3===0){ setShowAd(true); } };
  const closeAd=()=>setShowAd(false);

  const runAnalysis=async()=>{
    if(!pf.name.trim()){showT("Product ka naam daalo!");return;}
    if(!pf.cat){showT("Category select karo!");return;}
    if(!pf.plat){showT("Platform select karo!");return;}
    if(!isGuest&&usage.remaining<=0){showT("Daily limit reached! Upgrade to Premium.");setShowPrem(true);return;}
    setLoading(true); setResult(null);
    try{
      const data=await apiCall("analyze");
      setResult(data); showT("Analysis complete!");
      if(!isGuest) addUsage(user);
      setUsage(calcUsage(user));
      const hEntry={id:Date.now(),name:pf.name,cat:pf.cat,plat:pf.plat,result:data,time:new Date().toLocaleDateString("en-IN")};
      const prevHist=S.get("yyp_history")||[];
      const filtered=prevHist.filter(h=>h.name!==pf.name);
      const newHist=[hEntry,...filtered].slice(0,10);
      S.set("yyp_history",newHist); setHistory(newHist);
      showInterAd();
    }catch(e){ showT("Analysis failed. Try again."); }
    setLoading(false);
  };

  const isLocked=curPlan(user)==="free";

  const LockBox=()=>(
    <div style={{position:"absolute",inset:0,background:"rgba(2,8,23,.85)",borderRadius:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:10,backdropFilter:"blur(4px)"}}>
      <div style={{fontSize:32,marginBottom:8}}>🔒</div>
      <div style={{fontWeight:800,fontSize:14,color:"#f8fafc",marginBottom:4}}>Premium Tool</div>
      <div style={{fontSize:11,color:"#94a3b8",marginBottom:14,textAlign:"center",padding:"0 20px"}}>Upgrade to unlock all premium tools</div>
      <button onClick={()=>setShowPrem(true)} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:100,padding:"8px 20px",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Upgrade $10 (Rs.949)</button>
    </div>
  );

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Inter',sans-serif;background:#020817;color:#f8fafc;min-height:100vh;-webkit-font-smoothing:antialiased;}
    .fa{animation:fadeIn .4s ease;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .dash{min-height:100vh;background:#020817;max-width:480px;margin:0 auto;padding-bottom:40px;}
    .light.dash{background:#f1f5f9;}
    .nav{position:sticky;top:0;z-index:100;background:rgba(2,8,23,.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.04);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;}
    .light .nav{background:rgba(255,255,255,.95);border-bottom-color:#e2e8f0;}
    .logo{font-weight:900;font-size:17px;background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .nav-r{display:flex;align-items:center;gap:8px;}
    .upill{background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:100px;padding:3px 10px;font-size:10px;color:#a5b4fc;font-weight:700;}
    .light .upill{background:rgba(99,102,241,.08);border-color:rgba(99,102,241,.2);}
    .upbtn{background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:100px;padding:6px 13px;color:#fff;font-weight:800;font-size:11px;cursor:pointer;font-family:'Inter',sans-serif;}
    .avt{width:30px;height:30px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#fff;cursor:pointer;overflow:hidden;}
    .avt img{width:100%;height:100%;object-fit:cover;}
    .dc{padding:14px;}
    .icard{background:rgba(10,18,35,.9);border:1px solid rgba(99,102,241,.15);border-radius:18px;padding:20px 16px;margin-bottom:12px;}
    .light .icard{background:#fff;border-color:#e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,.06);}
    .ict{font-weight:800;font-size:15px;margin-bottom:15px;color:#f8fafc;}
    .light .ict{color:#1a1a2e;}
    .ilbl{font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:5px;}
    .di{width:100%;background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:9px 11px;color:#f8fafc;font-size:13px;font-family:Inter,sans-serif;outline:none;transition:border-color .2s;}
    .di:focus{border-color:#6366f1;}
    .light .di{background:#f8fafc;border-color:#d1d5db;color:#1a1a2e;}
    .pick-btn{width:100%;background:rgba(15,23,42,.7);border:1px solid #1e293b;border-radius:10px;padding:10px 13px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;color:#64748b;font-size:12px;font-weight:600;font-family:Inter,sans-serif;transition:all .2s;text-align:left;margin-bottom:4px;}
    .pick-btn.sel{border-color:rgba(99,102,241,.4);color:#f8fafc;background:rgba(99,102,241,.08);}
    .light .pick-btn{background:#f8fafc;border-color:#d1d5db;color:#6b7280;}
    .pick-drop{background:rgba(10,18,35,.97);border:1px solid rgba(99,102,241,.2);border-radius:14px;padding:10px;margin-bottom:8px;max-height:260px;overflow-y:auto;}
    .light .pick-drop{background:#fff;border-color:#e2e8f0;}
    .pglbl{font-size:9px;color:#64748b;font-weight:800;text-transform:uppercase;letter-spacing:.8px;padding:6px 4px 4px;display:block;}
    .chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:4px;}
    .chip{display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:8px;border:1px solid #1e293b;background:rgba(15,23,42,.6);color:#94a3b8;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:Inter,sans-serif;}
    .chip.on{background:rgba(99,102,241,.15);border-color:rgba(99,102,241,.4);color:#f8fafc;}
    .chip img{width:14px;height:14px;object-fit:contain;border-radius:2px;}
    .light .chip{background:#f8fafc;border-color:#e2e8f0;color:#4b5563;}
    .cbtn{background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:11px;padding:12px 0;color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;letter-spacing:.2px;}
    .cbtn:disabled{opacity:.55;cursor:not-allowed;}
    .gbtn2{width:100%;border:none;border-radius:11px;padding:12px 0;color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:'Inter',sans-serif;margin-top:10px;transition:all .2s;}
    .gbtn2:disabled{opacity:.55;cursor:not-allowed;}
    .ssp{height:50px;display:flex;align-items:center;justify-content:center;}
    .ssp:after{content:"";width:22px;height:22px;border:3px solid rgba(99,102,241,.2);border-top-color:#6366f1;border-radius:50%;animation:spin .8s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg)}}
    .mrow{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:12px;}
    .mc{background:rgba(10,18,35,.8);border:1px solid rgba(255,255,255,.06);border-radius:13px;padding:13px 10px;text-align:center;}
    .light .mc{background:#fff;border-color:#e2e8f0;}
    .ml{font-size:9px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;}
    .mv{font-weight:900;font-size:14px;}
    .ftabs{display:flex;gap:5px;overflow-x:auto;padding-bottom:4px;margin-bottom:14px;}
    .ftabs::-webkit-scrollbar{height:3px;}
    .ftabs::-webkit-scrollbar-thumb{background:rgba(99,102,241,.3);border-radius:10px;}
    .ftab{flex-shrink:0;padding:7px 14px;background:rgba(15,23,42,.8);border:1px solid rgba(255,255,255,.06);border-radius:100px;color:#64748b;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;white-space:nowrap;}
    .ftab.on{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(99,102,241,.3);}
    .ftab:hover:not(.on){border-color:rgba(99,102,241,.25);color:#a5b4fc;}
    .light .ftab{background:#f8fafc;border-color:#e2e8f0;color:#6b7280;}
    .fbox{background:rgba(10,18,35,.9);border:1px solid rgba(99,102,241,.15);border-radius:18px;padding:20px 16px;margin-bottom:12px;position:relative;}
    .light .fbox{background:#fff;border-color:#e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,.06);}
    .gcard{background:rgba(10,18,35,.8);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:9px;}
    .light .gcard{background:#f8fafc;border-color:#e2e8f0;}
    .gct{font-weight:700;font-size:12px;color:#a5b4fc;}
    .gctx{font-size:11px;color:#94a3b8;line-height:1.65;margin-top:4px;}
    .light .gctx{color:#4b5563;}
    .kwrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px;}
    .kw{background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.2);color:#a5b4fc;border-radius:100px;padding:3px 10px;font-size:10px;font-weight:600;}
    .presult{background:rgba(2,8,23,.6);border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-bottom:10px;}
    .light .presult{background:#f8fafc;border-color:#e2e8f0;}
    .prc{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.04);}
    .prc:last-child{border-bottom:none;}
    .prl{font-size:11px;color:#64748b;}
    .prv{font-size:13px;font-weight:700;}
    .prow{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
    .pfield label{font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;display:block;margin-bottom:4px;}
    .pfield input,.pfield select{width:100%;background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:8px 10px;color:#f8fafc;font-size:12px;font-family:Inter,sans-serif;outline:none;}
    .pfield input:focus,.pfield select:focus{border-color:#6366f1;}
    .light .pfield input,.light .pfield select{background:#f8fafc;border-color:#d1d5db;color:#1a1a2e;}
    .errbanner{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:9px;padding:8px 11px;font-size:11px;color:#ef4444;margin-bottom:10px;}
    .hi{font-size:11px;line-height:1.65;}
    .light .hi{color:#374151;}
    .tcard{background:rgba(10,18,35,.8);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px;}
    .light .tcard{background:#fff;border-color:#e2e8f0;}
    .sc{background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.18);border-radius:14px;padding:14px;margin-bottom:9px;}
    .cc{background:rgba(10,18,35,.8);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px;margin-bottom:9px;}
    .light .cc{background:#f8fafc;border-color:#e2e8f0;}
    .ccbox{background:rgba(2,8,23,.5);border-radius:8px;padding:8px 10px;margin-top:6px;}
    .ccbt{font-size:10px;color:#94a3b8;font-weight:600;}
    .cpt{font-size:12px;font-weight:700;color:#e2e8f0;margin-bottom:4px;}
    .fglbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;margin-top:14px;display:flex;align-items:center;gap:6px;}
    .pm{background:rgba(10,18,35,.97);border:1px solid rgba(99,102,241,.15);border-radius:22px;padding:0;overflow:hidden;max-height:90vh;overflow-y:auto;}
    .light .pm{background:#fff;border-color:#e2e8f0;}
    .pmh{padding:16px 16px 0;display:flex;align-items:center;justify-content:space-between;}
    .pmenu{display:flex;flex-direction:column;gap:5px;padding:12px;}
    .pmbtn{background:rgba(15,23,42,.6);border:1px solid #1e293b;border-radius:11px;padding:11px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;font-family:Inter,sans-serif;color:#e2e8f0;font-size:13px;font-weight:600;transition:all .15s;}
    .pmbtn:hover{background:rgba(99,102,241,.06);border-color:rgba(99,102,241,.2);}
    .light .pmbtn{background:#f8fafc;border-color:#e2e8f0;color:#1a1a2e;}
    .pmico{font-size:18px;width:24px;text-align:center;}
    .pmarr{color:#475569;font-size:14px;margin-left:auto;}
    .lo{color:#ef4444!important;border-color:rgba(239,68,68,.2)!important;}
    .prh{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;}
    .prcl{background:rgba(15,23,42,.7);border:1px solid #1e293b;border-radius:9px;padding:6px 12px;color:#94a3b8;font-size:12px;cursor:pointer;font-family:Inter,sans-serif;}
    .tbox2{background:rgba(10,18,35,.8);border:1px solid #1e293b;border-radius:12px;padding:14px;max-height:350px;overflow-y:auto;margin-bottom:10px;}
    .light .tbox2{background:#f8fafc;border-color:#e2e8f0;}
    .th{font-weight:700;color:#6366f1;font-size:12px;margin-top:10px;margin-bottom:3px;}
    .tp{font-size:11px;color:#94a3b8;line-height:1.6;}
    .light .tp{color:#4b5563;}
    .phigh{font-size:10px;color:#94a3b8;line-height:1.8;margin-bottom:12px;}
    .pb2{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#f59e0b;margin-bottom:6px;}
    .ptitle{font-size:20px;font-weight:900;color:#f8fafc;margin-bottom:4px;}
    .ppr{font-weight:900;font-size:32px;background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:3px;}
    .ppr span{font-size:11px;-webkit-text-fill-color:#94a3b8;}
    .pbtn2{width:100%;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:11px;padding:12px 0;color:#fff;font-weight:800;font-size:13px;cursor:pointer;margin-bottom:6px;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;gap:6px;}
    .pr2{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:12px;}
    .mcan{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:9px;padding:8px 0;width:100%;color:#ef4444;font-weight:700;font-size:12px;cursor:pointer;font-family:Inter,sans-serif;margin-top:4px;}
    .lcard{background:rgba(10,18,35,.97);border-radius:22px;padding:20px;max-height:90vh;overflow-y:auto;}
    .light .lcard{background:#fff;}
    .lbrain{font-size:50px;margin-bottom:10px;}
    .lstps{display:flex;flex-direction:column;gap:6px;margin:12px 0;}
    .lstp{display:flex;align-items:center;gap:8px;font-size:12px;color:#94a3b8;}
    .adbox{background:rgba(10,18,35,.97);border-radius:22px;padding:24px 20px;text-align:center;max-height:90vh;overflow-y:auto;}
    .adcl{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);border-radius:9px;padding:6px 14px;color:#ef4444;font-size:11px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;}
    .sw-r{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
    .sw-b{padding:5px 11px;border-radius:8px;border:1px solid #1e293b;background:rgba(15,23,42,.6);color:#64748b;font-size:11px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;}
    .sw-b:hover{border-color:rgba(99,102,241,.3);color:#a5b4fc;}
    .auth-card{background:rgba(10,18,35,.95);border:1px solid rgba(99,102,241,.15);border-radius:20px;padding:28px 24px;}
    .auth-inp{width:100%;background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:11px 13px;color:#f8fafc;font-size:13px;font-family:Inter,sans-serif;outline:none;margin-bottom:8px;transition:border .2s;}
    .auth-inp:focus{border-color:#6366f1;}
    .auth-btn{width:100%;border:none;border-radius:11px;padding:13px 0;font-weight:800;font-size:14px;cursor:pointer;font-family:'Inter',sans-serif;margin-bottom:8px;}
    .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(10,18,35,.97);border:1px solid rgba(99,102,241,.3);border-radius:100px;padding:10px 22px;font-size:12px;font-weight:700;color:#e2e8f0;z-index:9999;white-space:nowrap;animation:fadeIn .3s ease;}
    .bnr-g{background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.2);border-radius:11px;padding:9px 13px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:8px;}
    .bnr-r{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:11px;padding:9px 13px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:8px;}
    footer{text-align:center;font-size:10px;color:#334155;padding:20px 0 10px;border-top:1px solid rgba(255,255,255,.03);margin-top:10px;}
    .light footer{color:#9ca3af;border-top-color:#e2e8f0;}
    @media(max-width:480px){.dash{max-width:100%;}}
    /* Light theme extras */
    .light .fglbl{color:#6b7280;}
    .light .presult{background:#f8fafc;border-color:#e2e8f0;}
    .light .prc{border-bottom-color:#e2e8f0;}
    .light .prl{color:#6b7280;}
    .light .gcard{background:#fff;border-color:#e2e8f0;}
    .light .gct{color:#6366f1;}
    .light .tcard{background:#fff;border-color:#e2e8f0;}
    .light .mc{background:#fff;border-color:#e2e8f0;}
  `;

  // ── LOADING ──
  if(screen==="loading") return (
    <><style>{css}</style>
    <div style={{minHeight:"100vh",background:"#020817",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div className="logo" style={{fontSize:28,marginBottom:12}}>YesYouPro</div>
        <div className="ssp"/>
      </div>
    </div></>
  );

  // ── AUTH ──
  if(screen==="auth") return (
    <><style>{css}</style>
    <div style={{minHeight:"100vh",background:"#020817",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="logo" style={{fontSize:26,marginBottom:6}}>YesYouPro</div>
      <div style={{fontSize:12,color:"#64748b",marginBottom:24}}>India ka #1 AI Product Analyzer</div>
      <div className="auth-card" style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontWeight:800,fontSize:17,color:"#f8fafc",marginBottom:4}}>{authMode==="login"?"Welcome Back":"Create Account"}</div>
          <div style={{fontSize:11,color:"#64748b"}}>{authMode==="login"?"Login karke analysis shuru karo":"Free mein shuru karo — no credit card"}</div>
        </div>
        <button onClick={handleGoogle} disabled={authLoad} style={{width:"100%",background:"#fff",border:"1px solid #e2e8f0",borderRadius:11,padding:"11px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:"#1a1a2e",marginBottom:14,opacity:authLoad?.6:1}}>
          <img src="https://cdn.simpleicons.org/google/4285F4" alt="G" style={{width:18,height:18}}/>
          Continue with Google
        </button>
        <div style={{textAlign:"center",fontSize:11,color:"#334155",marginBottom:12}}>— or —</div>
        {authMode==="signup"&&<input className="auth-inp" placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}
        <input className="auth-inp" type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="auth-inp" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handleAuth()}/>
        {authErr&&<div className="errbanner">{authErr}</div>}
        <button className="auth-btn" onClick={handleAuth} disabled={authLoad} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",opacity:authLoad?.6:1}}>
          {authLoad?"Please wait...":(authMode==="login"?"Login":"Create Account")}
        </button>
        <div style={{textAlign:"center",fontSize:12,color:"#64748b"}}>
          {authMode==="login"?"Account nahi hai? ":"Already have account? "}
          <span style={{color:"#6366f1",cursor:"pointer",fontWeight:700}} onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setAuthErr("");}}>
            {authMode==="login"?"Sign Up":"Login"}
          </span>
        </div>
        {saved.length>0&&authMode==="login"&&(
          <div style={{marginTop:12}}>
            <div style={{fontSize:10,color:"#475569",marginBottom:6,textTransform:"uppercase",fontWeight:700}}>Recent Accounts</div>
            <div className="sw-r">
              {saved.slice(0,4).map((a,i)=>(
                <button key={i} className="sw-b" onClick={()=>setForm({...form,email:a.email,name:a.name})}>{a.name}</button>
              ))}
            </div>
          </div>
        )}
        <button onClick={makeGuest} style={{width:"100%",background:"none",border:"none",color:"#475569",fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif",marginTop:10,padding:"6px 0"}}>
          Continue as Guest (limited access)
        </button>
      </div>
    </div></>
  );

  return (
    <>
    <Head>
      <title>YesYouPro - AI Product Analyzer for Indian Sellers</title>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
    </Head>
    <style>{css}</style>

    {/* TOAST */}
    {toast&&<div className="toast">{toast}</div>}

    {/* AD MODAL */}
    {showAd&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        <div className="adbox" style={{width:"100%",maxWidth:380}}>
          <div style={{fontSize:36,marginTop:5}}>📢</div>
          <div style={{fontWeight:800,fontSize:16,color:"#f8fafc",marginBottom:4}}>Unlimited Analyses</div>
          <div style={{fontSize:12,color:"#94a3b8",marginBottom:16}}>Ad-free experience + All 24 premium tools</div>
          <button className="pbtn2" onClick={()=>{setShowAd(false);setShowPrem(true);}}>Get Premium $10 (Rs.949)</button>
          <button className="adcl" onClick={closeAd}>Continue with ads</button>
        </div>
      </div>
    )}

    {/* PREMIUM MODAL */}
    {showPrem&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:16}}>
        <div className="pm fa" style={{width:"100%",maxWidth:480}}>
          {!showPay?(
            <div style={{padding:20}}>
              <div style={{textAlign:"center",marginBottom:16}}>
                <div className="pb2">PREMIUM</div>
                <div className="ptitle">Unlock Everything</div>
                <div className="ppr">$10 <span>/ 30 days</span></div>
                <div style={{fontSize:12,color:"#94a3b8",marginBottom:4}}>Rs.949 — 50 analyses</div>
              </div>
              <div className="phigh">
                ✓ 50 analyses / 30 days (Free: 5/day only)<br/>
                ✓ All 24 tools unlocked<br/>
                ✓ Ad Copy Generator 🔒<br/>
                ✓ Review Reply Generator 🔒<br/>
                ✓ Listing Quality Checker 🔒<br/>
                ✓ Instagram Captions 🔒<br/>
                ✓ Launch Strategy 🔒
              </div>
              {user&&!isGuest?(
                <button className="pbtn2" onClick={()=>setShowPay(true)}>🔓 Unlock Premium — $10 (Rs.949)</button>
              ):(
                <button className="pbtn2" onClick={()=>{setShowPrem(false);setShowPay(false);setPayStep("form");S.set("yyp_pending_prem",true);setScreen("auth");}}>🔒 Create Account to Activate</button>
              )}
              <button onClick={()=>{setShowPrem(false);setShowPay(false);}} style={{width:"100%",background:"none",border:"none",color:"#475569",fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif",padding:"8px 0"}}>Maybe later</button>
            </div>
          ):(
            <div style={{padding:20}}>
              <div style={{fontWeight:800,fontSize:15,color:"#f8fafc",marginBottom:14}}>Confirm Payment</div>
              <div className="presult" style={{marginBottom:12}}>
                <div className="pr2"><span>Plan</span><span style={{color:"#f59e0b",fontWeight:700}}>Premium 30 Days</span></div>
                <div className="pr2"><span>Analyses</span><span style={{color:"#10b981",fontWeight:700}}>50 in 30 days</span></div>
                <div className="pr2"><span>Amount</span><span style={{color:"#f59e0b",fontWeight:700}}>$10 (Rs.949)</span></div>
              </div>
              <button className="pbtn2" onClick={handlePay}>
                <svg width="14" height="14" viewBox="0 0 30 30" fill="none"><path d="M14.396 0L0 19.578h9.979L7.242 30l22.758-19.56H19.5L22.25 0z" fill="#528FF0"/></svg>
                Pay $10 (Rs.949) via Razorpay
              </button>
              <button className="mcan" onClick={()=>setShowPay(false)}>Back</button>
            </div>
          )}
          {(payStep==="success"||curPlan(user)==="premium")&&(
            <div style={{padding:20,textAlign:"center"}}>
              <div style={{fontSize:50,marginBottom:8}}>🎉</div>
              <div style={{fontWeight:800,fontSize:17,color:"#10b981",marginBottom:4}}>Premium Activated!</div>
              <div style={{fontSize:12,color:"#94a3b8",marginBottom:16}}>50 analyses for 30 days unlocked</div>
              <button className="pbtn2" onClick={()=>{setShowPrem(false);setShowPay(false);setPayStep("form");}}>🚀 Start Analyzing</button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* PROFILE MODAL */}
    {showProf&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:16}} onClick={()=>setShowProf(false)}>
        <div className="pm fa" style={{width:"100%",maxWidth:480}} onClick={e=>e.stopPropagation()}>
          {profTab==="main"&&<>
            <div className="pmh">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div className="avt" style={{width:38,height:38,fontSize:15}}>{user?.photo?<img src={user.photo} alt=""/>:user?.name?.[0]?.toUpperCase()||"U"}</div>
                <div>
                  <div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>{user?.name||"Guest"}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>{user?.email||""}</div>
                </div>
              </div>
              <button onClick={()=>setShowProf(false)} style={{background:"none",border:"none",color:"#475569",fontSize:20,cursor:"pointer"}}>&#215;</button>
            </div>
            <div style={{padding:"8px 16px 4px"}}>
              {curPlan(user)==="free"?(
                <div className="upill">Free Plan &bull; {usage.remaining}/{FREE_LIMIT} today</div>
              ):(
                <div style={{fontSize:11,color:"#f59e0b",fontWeight:600}}>Premium Active &bull; {usage.remaining} analyses left</div>
              )}
            </div>
            {/* Theme Toggle */}
            <div style={{margin:"8px 16px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:dark?"rgba(15,23,42,.6)":"#f1f5f9",border:dark?"1px solid #1e293b":"1px solid #e2e8f0",borderRadius:11,padding:"10px 14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>{dark?"🌙":"&#9728;"}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:dark?"#e2e8f0":"#1a1a2e"}}>{dark?"Dark Mode":"Light Mode"}</div>
                    <div style={{fontSize:10,color:"#64748b"}}>Click to switch</div>
                  </div>
                </div>
                <div onClick={toggleTheme} style={{width:48,height:26,borderRadius:100,background:dark?"rgba(99,102,241,.2)":"#d1d5db",padding:3,cursor:"pointer",position:"relative",transition:"all .3s"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:dark?"linear-gradient(135deg,#6366f1,#8b5cf6)":"linear-gradient(135deg,#f59e0b,#f97316)",position:"absolute",top:3,left:dark?3:25,transition:"left .25s ease"}}/>
                </div>
              </div>
            </div>
            <div className="pmenu">
              <button className="pmbtn" onClick={()=>setProfTab("referral")} style={{borderColor:"rgba(16,185,129,.2)"}}>
                <span className="pmico">🎁</span>
                <span style={{flex:1}}>Refer and Earn Premium <span style={{background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:100,marginLeft:4}}>FREE</span></span>
                {!isGuest&&user?.email&&<span style={{fontSize:10,color:"#10b981",fontWeight:700,marginRight:4}}>{((S.get("yyp_ref_"+user.email)||{referrals:[]}).referrals||[]).length}/10</span>}
                <span className="pmarr">&#8250;</span>
              </button>
              <button className="pmbtn" onClick={()=>setProfTab("terms")}><span className="pmico">📋</span><span>Terms and Conditions</span><span className="pmarr">&#8250;</span></button>
              <button className="pmbtn" onClick={()=>setProfTab("question")}><span className="pmico">&#10067;</span><span>Any Questions?</span><span className="pmarr">&#8250;</span></button>
              {!isGuest&&(()=>{const waMsg=encodeURIComponent("Hello, I am "+(user?.name||"User")+" (Plan: "+(curPlan(user)==="premium"?"Premium":"Free")+"). I need help with YesYouPro.");return(<a href={"https://wa.me/919958540498?text="+waMsg} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.25)",borderRadius:11,padding:"11px 14px",textDecoration:"none"}}><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WA" style={{width:22,height:22,objectFit:"contain",flexShrink:0}}/><span style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#25d366"}}>WhatsApp Support</div><div style={{fontSize:10,color:"#64748b"}}>Click — message auto fill hoga</div></span><span style={{color:"#25d366",fontSize:13}}>&#8250;</span></a>);})()} 
              {curPlan(user)==="free"&&<button className="pmbtn" onClick={()=>{setShowProf(false);setShowPrem(true);}}><span className="pmico">💎</span><span>Upgrade Premium — $10 (Rs.949)</span><span className="pmarr">&#8250;</span></button>}
              {isGuest
                ?<button className="pmbtn" onClick={()=>{setShowProf(false);setScreen("auth");}} style={{borderColor:"rgba(99,102,241,.25)",color:"#a5b4fc"}}><span className="pmico">&#128272;</span><span>Login / Sign Up</span><span className="pmarr">&#8250;</span></button>
                :<button className="pmbtn lo" onClick={()=>{setShowProf(false);handleLogout();}}><span className="pmico">&#128682;</span><span>Logout</span></button>
              }
            </div>
            <div style={{textAlign:"center",fontSize:10,color:"#334155",paddingBottom:12}}>YesYouPro &middot; yesyoupro.com</div>
          </>}

          {profTab==="terms"&&<>
            <div className="prh"><button className="prcl" onClick={()=>setProfTab("main")}>← Back</button><div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>Terms &amp; Conditions</div><div style={{width:60}}/></div>
            <div style={{padding:"0 16px 16px"}}>
              <div className="tbox2">
                <div className="th">1. Acceptance</div><p className="tp">By using YesYouPro, you agree to these terms.</p>
                <div className="th">2. Free Plan</div><p className="tp">5 analyses/day. Upgrade for more.</p>
                <div className="th">3. Premium Plan</div><p className="tp">$10 (Rs.949) for 30 days / 50 analyses. No auto-renewal.</p>
                <div className="th">4. Refund Policy</div><p className="tp">No refunds once Premium activated. Issues: support@yesyoupro.com within 24hrs.</p>
                <div className="th">5. AI Accuracy</div><p className="tp">AI results are suggestions only. Do your own research.</p>
                <div className="th">6. Privacy</div><p className="tp">We store email and usage data securely. Payments via Razorpay.</p>
                <div className="th">7. Contact</div><p className="tp">support@yesyoupro.com</p>
              </div>
              <button className="pmbtn" onClick={()=>setProfTab("main")} style={{justifyContent:"center"}}>← Back</button>
            </div>
          </>}

          {profTab==="question"&&<>
            <div className="prh"><button className="prcl" onClick={()=>setProfTab("main")}>← Back</button><div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>Questions</div><div style={{width:60}}/></div>
            <div style={{padding:"0 16px 16px"}}>
              <div className="tbox2">
                {[{q:"Analysis limit kab reset hogi?",a:"Har din midnight pe free limit reset hoti hai."},{q:"Premium kab expire hoga?",a:"30 din baad ya 50 analyses ke baad, jo pehle aaye."},{q:"Razorpay safe hai?",a:"Haan — PCI-DSS compliant, secure payment gateway."},{q:"Refund milega?",a:"Premium activate hone ke baad refund nahi. Issues pe 24hr mein contact karo."}].map((item,i)=>(
                  <div key={i} style={{marginBottom:12}}>
                    <div className="th">{item.q}</div>
                    <p className="tp">{item.a}</p>
                  </div>
                ))}
              </div>
              <button className="pmbtn" onClick={()=>setProfTab("main")} style={{justifyContent:"center"}}>← Back</button>
            </div>
          </>}

          {profTab==="referral"&&!isGuest&&(()=>{
            const rd=user?.email?getRefData(user.email):{code:"",referrals:[],rewarded:false};
            const count=(rd.referrals||[]).length;
            const pct=Math.min(100,(count/10)*100);
            const refCodeStr=user?.email?genRefCode(user.email):"";
            const refLink="https://yesyoupro.com/?ref="+refCodeStr;
            const waMsg=encodeURIComponent("Bhai YesYouPro try karo - AI se 30 sec mein winning product dhundho FREE: "+refLink);
            return(<>
              <div className="prh"><button className="prcl" onClick={()=>setProfTab("main")}>← Back</button><div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>Refer and Earn</div><div style={{width:60}}/></div>
              <div style={{padding:"0 16px 16px"}}>
                {rd.rewarded?(
                  <div style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.3)",borderRadius:13,padding:15,textAlign:"center",marginBottom:13}}>
                    <div style={{fontWeight:800,fontSize:14,color:"#f59e0b"}}>🏆 Reward Claimed!</div>
                    <div style={{fontSize:11,color:"#94a3b8",marginTop:4}}>7 days Premium aapko mil gaya!</div>
                  </div>
                ):(
                  <div style={{background:"rgba(16,185,129,.07)",border:"1px solid rgba(16,185,129,.2)",borderRadius:13,padding:13,marginBottom:13}}>
                    <div style={{fontWeight:800,fontSize:12,color:"#10b981",marginBottom:3}}>10 Referrals = Premium FREE (7 days)</div>
                    <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.6}}>Link share karo → 10 log sign up karein → Premium auto!</div>
                  </div>
                )}
                <div style={{background:"rgba(2,8,23,.5)",border:"1px solid #1e293b",borderRadius:11,padding:12,marginBottom:11}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
                    <span style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>Progress</span>
                    <span style={{fontSize:14,fontWeight:900,color:"#a5b4fc"}}>{count}/10</span>
                  </div>
                  <div style={{background:"#1e293b",borderRadius:100,height:9,overflow:"hidden",marginBottom:7}}>
                    <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#6366f1,#a855f7,#10b981)",borderRadius:100,transition:"width .6s ease"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#475569"}}>
                    <span>0</span><span style={{color:"#6366f1",fontWeight:700}}>{count} joined</span><span style={{color:"#f59e0b",fontWeight:700}}>10 = FREE</span>
                  </div>
                </div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:10,color:"#64748b",fontWeight:700,marginBottom:5,textTransform:"uppercase"}}>Your Referral Link</div>
                  <div style={{background:"rgba(2,8,23,.7)",border:"1px solid rgba(99,102,241,.25)",borderRadius:10,padding:"9px 11px",display:"flex",alignItems:"center",gap:7}}>
                    <div style={{fontSize:11,color:"#a5b4fc",fontWeight:600,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{"yesyoupro.com/?ref="+refCodeStr}</div>
                    <button onClick={()=>copyRefLink(user?.email)} style={{background:refCopied?"linear-gradient(135deg,#10b981,#059669)":"linear-gradient(135deg,#6366f1,#8b5cf6)",border:"none",borderRadius:7,padding:"5px 11px",color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap"}}>{refCopied?"Copied!":"Copy"}</button>
                  </div>
                </div>
                <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
                  <a href={"https://wa.me/?text="+waMsg} target="_blank" rel="noreferrer" style={{flex:1,minWidth:48,background:"#25d366",borderRadius:10,padding:"9px 6px",textDecoration:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="WA" style={{width:20,height:20}}/>
                    <span style={{fontSize:9,color:"#fff",fontWeight:700}}>WhatsApp</span>
                  </a>
                  <a href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(refLink)} target="_blank" rel="noreferrer" style={{flex:1,minWidth:48,background:"#1877f2",borderRadius:10,padding:"9px 6px",textDecoration:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="FB" style={{width:20,height:20}}/>
                    <span style={{fontSize:9,color:"#fff",fontWeight:700}}>Facebook</span>
                  </a>
                  <a href={"https://twitter.com/intent/tweet?text="+encodeURIComponent("YesYouPro try karo: "+refLink)} target="_blank" rel="noreferrer" style={{flex:1,minWidth:48,background:"#000",border:"1px solid #333",borderRadius:10,padding:"9px 6px",textDecoration:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <img src="https://cdn.simpleicons.org/x/ffffff" alt="X" style={{width:20,height:20}}/>
                    <span style={{fontSize:9,color:"#fff",fontWeight:700}}>Twitter</span>
                  </a>
                  <a href={"https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(refLink)} target="_blank" rel="noreferrer" style={{flex:1,minWidth:48,background:"#0077b5",borderRadius:10,padding:"9px 6px",textDecoration:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <img src="https://cdn.simpleicons.org/linkedin/ffffff" alt="LI" style={{width:20,height:20}}/>
                    <span style={{fontSize:9,color:"#fff",fontWeight:700}}>LinkedIn</span>
                  </a>
                </div>
              </div>
            </>);
          })()}
        </div>
      </div>
    )}

    {/* DASHBOARD */}
    {screen==="dashboard"&&<div className={"dash"+(dark?"":" light")}>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="logo">YesYouPro</div>
        <div className="nav-r">
          {!isGuest&&curPlan(user)==="free"&&<div className="upill">{usage.remaining}/{FREE_LIMIT} today</div>}
          {curPlan(user)==="free"
            ?<button className="upbtn" onClick={()=>setShowPrem(true)}>💎 $10</button>
            :null
          }
          {isGuest
            ?<button onClick={()=>setScreen("auth")} style={{background:"rgba(99,102,241,.12)",border:"1px solid rgba(99,102,241,.35)",borderRadius:100,padding:"5px 11px",color:"#a5b4fc",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Login</button>
            :<div className="avt" onClick={()=>{setShowProf(true);setProfTab("main");}}>{user?.photo?<img src={user.photo} alt=""/>:user?.name?.[0]?.toUpperCase()||"U"}</div>
          }
        </div>
      </nav>

      <div className="dc">

        {/* HISTORY BUTTON */}
        {history.length>0&&(
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
            <button onClick={()=>setShowHist(!showHist)} style={{background:"rgba(15,23,42,.7)",border:"1px solid rgba(99,102,241,.2)",borderRadius:100,padding:"5px 14px",color:"#a5b4fc",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
              {showHist?"Hide":"History ("+ history.length+")"}
            </button>
          </div>
        )}
        {showHist&&(
          <div style={{background:"rgba(15,23,42,.85)",border:"1px solid rgba(99,102,241,.2)",borderRadius:14,padding:14,marginBottom:14}} className="fa">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:"#f8fafc"}}>Recent Analyses ({history.length}/10)</div>
              <button onClick={()=>{S.set("yyp_history",[]);setHistory([]);setShowHist(false);showT("Cleared!");}} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:7,padding:"3px 9px",color:"#ef4444",fontSize:10,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Clear All</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:280,overflowY:"auto"}}>
              {history.map((h,i)=>(
                <div key={h.id||i} onClick={()=>{setPf({name:h.name,cat:h.cat||"",plat:h.plat||""});setResult(h.result);setShowHist(false);showT("Loaded: "+h.name);}} style={{background:"rgba(2,8,23,.6)",border:"1px solid #1e293b",borderRadius:9,padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:26,height:26,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:12,color:"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{h.name}</div>
                    <div style={{fontSize:10,color:"#64748b"}}>{h.cat} &middot; {h.plat} &middot; {h.time}</div>
                  </div>
                  <div style={{fontSize:9,color:"#6366f1",fontWeight:700,background:"rgba(99,102,241,.1)",padding:"2px 7px",borderRadius:100,flexShrink:0}}>Load</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INPUT CARD */}
        <div className="icard">
          <h3 className="ict">Analyze Anything</h3>
          <label className="ilbl">Name</label>
          <input className="di" placeholder="e.g. Portable Blender, BGMI, YouTube Channel..." value={pf.name} onChange={e=>setPf({...pf,name:e.target.value})} style={{marginBottom:10}}/>
          <label className="ilbl">Category</label>
          <button className="pick-btn"+(pf.cat?" sel":"")} onClick={()=>{setShowCats(!showCats);setShowPlats(false);}}>
            <span style={{display:"flex",alignItems:"center",gap:6}}>
              {pf.cat&&(()=>{const ct=CATS.find(c=>c.id===pf.cat);return ct?.logo?<img src={ct.logo} alt={pf.cat} style={{width:15,height:15,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:13}}>{ct?.e||"Cat"}</span>;})()}
              <span>{pf.cat||"Select Category"}</span>
            </span>
            <span style={{fontSize:10,color:"#6366f1"}}>{showCats?"&#9650;":"&#9660;"}</span>
          </button>
          {showCats&&(
            <div className="pick-drop">
              {["Physical","Digital"].map(g=>(
                <div key={g}>
                  <span className="pglbl">{g}</span>
                  <div className="chips">
                    {CATS.filter(c=>c.g===g).map(c=>(
                      <button key={c.id} className={"chip"+(pf.cat===c.id?" on":"")} onClick={()=>{setPf({...pf,cat:c.id});setShowCats(false);}}>
                        {c.logo?<img src={c.logo} alt={c.id} style={{width:14,height:14,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:11}}>{c.e}</span>}
                        {c.id}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <label className="ilbl" style={{marginTop:8,display:"block"}}>Platform</label>
          <button className={"pick-btn"+(pf.plat?" sel":"")} onClick={()=>{setShowPlats(!showPlats);setShowCats(false);}}>
            <span style={{display:"flex",alignItems:"center",gap:6}}>
              {pf.plat&&(()=>{const pl=PLATS.find(p=>p.id===pf.plat);return pl?.logo?<img src={pl.logo} alt={pf.plat} style={{width:15,height:15,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:13}}>{pl?.e||"Plat"}</span>;})()}
              <span>{pf.plat||"Select Platform"}</span>
            </span>
            <span style={{fontSize:10,color:"#6366f1"}}>{showPlats?"&#9650;":"&#9660;"}</span>
          </button>
          {showPlats&&(
            <div className="pick-drop">
              {["Ecommerce","Social","Stores","Courses","Freelance","Food","Other"].map(g=>(
                PLATS.filter(p=>p.g===g).length>0&&(
                  <div key={g}>
                    <span className="pglbl">{g}</span>
                    <div className="chips">
                      {PLATS.filter(p=>p.g===g).map(p=>(
                        <button key={p.id} className={"chip"+(pf.plat===p.id?" on":"")} onClick={()=>{setPf({...pf,plat:p.id});setShowPlats(false);}}>
                          {p.logo?<img src={p.logo} alt={p.id} style={{width:13,height:13,objectFit:"contain",borderRadius:2}} onError={(e)=>{e.target.style.display="none";}}/>:<span style={{fontSize:11}}>{p.e}</span>}
                          {p.id}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
          <button className="cbtn" style={{width:"100%",marginTop:12}} onClick={runAnalysis} disabled={loading}>
            {loading?"Analyzing...":"Get AI Analysis"}
          </button>
          {!isGuest&&usage.remaining<=0&&<div style={{textAlign:"center",fontSize:10,color:"#f59e0b",marginTop:6}}>Daily limit reached. Upgrade for more.</div>}
        </div>

        {/* LOADING */}
        {loading&&<div className="icard fa"><div className="ssp"/><div style={{textAlign:"center",fontSize:12,color:"#64748b",marginTop:8}}>AI analyzing your product...</div></div>}

        {/* BANNER */}
        {!loading&&(usage.remaining>0
          ?<div className="bnr-g"><div style={{fontSize:11,color:"#10b981",fontWeight:700}}>✓ {usage.remaining} analyses left today</div>{curPlan(user)==="free"&&<button onClick={()=>setShowPrem(true)} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:100,padding:"5px 11px",color:"#fff",fontWeight:800,fontSize:10,cursor:"pointer",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap"}}>Upgrade</button>}</div>
          :<div className="bnr-r"><div><div style={{fontWeight:700,fontSize:11,color:"#ef4444"}}>Daily Limit Reached</div><div style={{fontSize:10,color:"#64748b"}}>Upgrade for 50 analyses</div></div><button onClick={()=>setShowPrem(true)} style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:8,padding:"5px 10px",color:"#fff",fontWeight:700,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"Inter,sans-serif"}}>Upgrade</button></div>
        )}


        {/* RESULT */}
        {result&&!loading&&(
          <div className="fa">
            <div className="icard">
              <div style={{fontWeight:800,fontSize:14,color:"#f8fafc",marginBottom:12}}>{pf.name}</div>
              <div className="mrow">
                {[{l:"Viral Score",v:result.viral_score,c:"#f59e0b"},{l:"Demand",v:result.demand_level,c:"#10b981"},{l:"Competition",v:result.competition_level,c:"#ef4444"},{l:"Price Range",v:result.price_range,c:"#6366f1"}].map(m=>(
                  <div key={m.l} className="mc"><div className="ml">{m.l}</div><div className="mv" style={{color:m.c,fontSize:m.v&&m.v.length>7?11:14}}>{m.v||"-"}</div></div>
                ))}
              </div>
              {result.hooks?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct">Hooks &amp; USPs</div>{result.hooks.map((h,i)=><div key={i} className="hi" style={{padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>{h}</div>)}</div>}
              {result.keywords?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct">Keywords</div><div className="kwrow">{result.keywords.map((k,i)=><span key={i} className="kw">{k}</span>)}</div></div>}
              {result.target_audience?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct">Target Audience</div>{result.target_audience.map((a,i)=><div key={i} className="hi" style={{padding:"2px 0"}}>• {a}</div>)}</div>}
              {result.selling_tips?.length>0&&<div className="gcard"><div className="gct">Selling Tips</div>{result.selling_tips.map((t,i)=><div key={i} className="hi" style={{padding:"2px 0"}}>✓ {t}</div>)}</div>}
            </div>

            {/* TOOLS */}
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontWeight:800,fontSize:14,color:"#f8fafc"}}>AI Tools</div>
                <div style={{background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.2)",borderRadius:100,padding:"3px 12px",fontSize:10,color:"#a5b4fc",fontWeight:700}}>24 Tools</div>
              </div>
              <div className="ftabs">
                {[
                  {id:"profit",l:"💰 Profit Calc"},{id:"gst",l:"🧾 GST Calc"},{id:"shipping",l:"🚚 Shipping"},{id:"roas",l:"📊 ROAS Calc"},
                  {id:"investment",l:"🧮 Investment"},{id:"sales",l:"📈 Sales Est"},{id:"inventory",l:"📊 Inventory"},{id:"price",l:"Pricing"},
                  {id:"compare",l:"⚡ Compare"},{id:"competitor",l:"⚔️ Competitor"},{id:"niche",l:"Niche"},{id:"trending",l:"🔥 Trending"},
                  {id:"supplier",l:"📦 Supplier"},{id:"bundle",l:"🎁 Bundle"},{id:"returns",l:"📦 Returns"},{id:"festival",l:"🎊 Festival"},
                  {id:"wamsg",l:"WhatsApp Msg"},{id:"titl",l:"📝 Title Opt"},
                  {id:"adcopy",l:"Ad Copy"},{id:"revreply",l:"Review Reply"},{id:"listcheck",l:"Listing Check"},
                  {id:"caption",l:"📸 Captions"},{id:"launch",l:"Launch Plan"},{id:"description",l:"📝 Description"},
                ].map(t=>(
                  <button key={t.id} className={"ftab"+(tab===t.id?" on":"")} onClick={()=>setTab(t.id)}>{t.l}</button>
                ))}
              </div>

              {/* PROFIT CALCULATOR */}
              {tab==="profit"&&(
                <div className="fbox fa">
                  <h3 className="ict">Profit Calculator</h3>
                  <div className="prow">
                    <div className="pfield"><label>Buy Price (Rs.)</label><input type="number" placeholder="200" value={profF.buy} onChange={e=>setProfF({...profF,buy:e.target.value})}/></div>
                    <div className="pfield"><label>Sell Price (Rs.)</label><input type="number" placeholder="500" value={profF.sell} onChange={e=>setProfF({...profF,sell:e.target.value})}/></div>
                    <div className="pfield"><label>Shipping (Rs.)</label><input type="number" placeholder="50" value={profF.ship} onChange={e=>setProfF({...profF,ship:e.target.value})}/></div>
                    <div className="pfield"><label>Platform Fee %</label><input type="number" placeholder="10" value={profF.plat} onChange={e=>setProfF({...profF,plat:e.target.value})}/></div>
                  </div>
                  <button className="cbtn" style={{width:"100%"}} onClick={()=>{
                    const buy=parseFloat(profF.buy)||0,sell=parseFloat(profF.sell)||0,ship=parseFloat(profF.ship)||0,platFee=parseFloat(profF.plat)||0,qty=parseInt(profF.qty)||1;
                    const platformCut=(sell*platFee)/100;
                    const np=sell-buy-ship-platformCut;
                    const margin=sell>0?((np/sell)*100).toFixed(1):0;
                    const roi=buy>0?((np/buy)*100).toFixed(1):0;
                    setProfR({np:np.toFixed(2),margin,roi,platformCut:platformCut.toFixed(2),total:(np*qty).toFixed(2),qty});
                  }}>Calculate Profit</button>
                  {profR&&(
                    <div style={{marginTop:12}} className="fa">
                      <div style={{background:"rgba(99,102,241,.08)",border:"1px solid rgba(99,102,241,.2)",borderRadius:12,padding:12,textAlign:"center",marginBottom:10}}>
                        <div style={{fontSize:10,color:"#64748b",marginBottom:2}}>Net Profit Per Unit</div>
                        <div style={{fontSize:28,fontWeight:900,color:parseFloat(profR.np)>0?"#10b981":"#ef4444"}}>Rs. {profR.np}</div>
                      </div>
                      <div className="presult">
                        {[{l:"Margin",v:profR.margin+"%",c:"#10b981"},{l:"ROI",v:profR.roi+"%",c:"#6366f1"},{l:"Platform Cut",v:"Rs."+profR.platformCut,c:"#f59e0b"}].map(r=>(
                          <div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c}}>{r.v}</div></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* GST CALCULATOR */}
              {tab==="gst"&&(
                <div className="fbox fa">
                  <h3 className="ict">GST Calculator</h3>
                  <div className="prow">
                    <div className="pfield"><label>Selling Price (Rs.)</label><input type="number" placeholder="500" value={gstF.sell} onChange={e=>setGstF({...gstF,sell:e.target.value})}/></div>
                    <div className="pfield"><label>GST Rate</label>
                      <select value={gstF.rate} onChange={e=>setGstF({...gstF,rate:e.target.value})} style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"8px 10px",color:"#f8fafc",fontFamily:"Inter,sans-serif",outline:"none"}}>
                        <option value="0">0% - Essentials</option>
                        <option value="5">5% - Food/Books</option>
                        <option value="12">12% - Fashion/Home</option>
                        <option value="18">18% - Electronics</option>
                        <option value="28">28% - Luxury</option>
                      </select>
                    </div>
                  </div>
                  <button className="cbtn" style={{width:"100%"}} onClick={()=>{
                    const s=parseFloat(gstF.sell)||0,rate=parseFloat(gstF.rate)||0;
                    const base=s/(1+rate/100),gstAmt=s-base;
                    setGstR({sell:s.toFixed(2),base:base.toFixed(2),gst:gstAmt.toFixed(2),cgst:(gstAmt/2).toFixed(2),sgst:(gstAmt/2).toFixed(2),rate});
                  }}>Calculate GST</button>
                  {gstR&&(
                    <div style={{marginTop:12}} className="fa">
                      <div style={{background:"rgba(99,102,241,.08)",border:"1px solid rgba(99,102,241,.2)",borderRadius:12,padding:12,textAlign:"center",marginBottom:10}}>
                        <div style={{fontSize:10,color:"#64748b",marginBottom:2}}>GST Amount</div>
                        <div style={{fontSize:26,fontWeight:900,color:"#ef4444"}}>Rs. {gstR.gst}</div>
                        <div style={{fontSize:10,color:"#64748b"}}>@ {gstR.rate}%</div>
                      </div>
                      <div className="presult">
                        {[{l:"Selling Price",v:"Rs."+gstR.sell,c:"#f8fafc"},{l:"Base Price",v:"Rs."+gstR.base,c:"#10b981"},{l:"CGST",v:"Rs."+gstR.cgst,c:"#f59e0b"},{l:"SGST",v:"Rs."+gstR.sgst,c:"#f59e0b"}].map(r=>(
                          <div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c}}>{r.v}</div></div>
                        ))}
                      </div>
                      <div style={{background:"rgba(16,185,129,.07)",border:"1px solid rgba(16,185,129,.15)",borderRadius:10,padding:10,marginTop:8,fontSize:11,color:"#94a3b8",lineHeight:1.65}}>
                        CGST+SGST = Same state delivery &middot; IGST = Different state
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SHIPPING COST */}
              {tab==="shipping"&&(
                <div className="fbox fa">
                  <h3 className="ict">Shipping Cost Comparator</h3>
                  <div className="prow">
                    <div className="pfield"><label>Weight (kg)</label><input type="number" placeholder="0.5" step="0.1" value={shipF.weight} onChange={e=>setShipF({...shipF,weight:e.target.value})}/></div>
                    <div className="pfield"><label>Zone</label>
                      <select value={shipF.zone} onChange={e=>setShipF({...shipF,zone:e.target.value})} style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"8px 10px",color:"#f8fafc",fontFamily:"Inter,sans-serif",outline:"none"}}>
                        <option value="local">Local (Same City)</option>
                        <option value="zone1">Zone 1 (Nearby State)</option>
                        <option value="zone2">Zone 2 (Far State)</option>
                        <option value="zone3">Zone 3 (Extreme Far)</option>
                      </select>
                    </div>
                    <div className="pfield"><label>Payment</label>
                      <select value={shipF.cod} onChange={e=>setShipF({...shipF,cod:e.target.value})} style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"8px 10px",color:"#f8fafc",fontFamily:"Inter,sans-serif",outline:"none"}}>
                        <option value="no">Prepaid</option>
                        <option value="yes">COD</option>
                      </select>
                    </div>
                  </div>
                  <button className="cbtn" style={{width:"100%"}} onClick={()=>{
                    const w=parseFloat(shipF.weight)||0.5,cod=shipF.cod==="yes";
                    const zm={local:1,zone1:1.3,zone2:1.6,zone3:2}[shipF.zone]||1;
                    const codExtra=cod?35:0;
                    const couriers=[
                      {name:"Delhivery",base:35,perKg:45,c:"#ef4444"},{name:"Shiprocket",base:40,perKg:50,c:"#6366f1"},
                      {name:"Amazon FBA",base:30,perKg:40,c:"#f59e0b"},{name:"Ekart",base:28,perKg:38,c:"#10b981"},
                      {name:"Shadowfax",base:32,perKg:42,c:"#8b5cf6"},{name:"XpressBees",base:36,perKg:46,c:"#f97316"},
                    ].map(c=>({...c,cost:Math.round((c.base+c.perKg*Math.max(0.5,w))*zm+codExtra)})).sort((a,b)=>a.cost-b.cost);
                    setShipR({couriers,cod});
                  }}>Compare Rates</button>
                  {shipR&&(
                    <div style={{marginTop:12}} className="fa">
                      {shipR.couriers.map((c,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",background:i===0?"rgba(16,185,129,.07)":"rgba(2,8,23,.4)",border:i===0?"1px solid rgba(16,185,129,.25)":"1px solid #1e293b",borderRadius:10,marginBottom:6}}>
                          {i===0&&<div style={{fontSize:9,fontWeight:800,background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",padding:"2px 6px",borderRadius:100,flexShrink:0}}>BEST</div>}
                          <div style={{width:8,height:8,borderRadius:"50%",background:c.c,flexShrink:0}}/>
                          <div style={{flex:1,fontWeight:600,fontSize:12,color:"#e2e8f0"}}>{c.name}</div>
                          <div style={{fontWeight:900,fontSize:14,color:i===0?"#10b981":"#f8fafc"}}>Rs.{c.cost}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ROAS CALCULATOR */}
              {tab==="roas"&&(
                <div className="fbox fa">
                  <h3 className="ict">Ad ROAS Calculator</h3>
                  <div className="prow">
                    <div className="pfield"><label>Ad Spend (Rs.)</label><input type="number" placeholder="500" value={roasF.spend} onChange={e=>setRoasF({...roasF,spend:e.target.value})}/></div>
                    <div className="pfield"><label>Total Sales (Rs.)</label><input type="number" placeholder="2500" value={roasF.sales} onChange={e=>setRoasF({...roasF,sales:e.target.value})}/></div>
                  </div>
                  <button className="cbtn" style={{width:"100%"}} onClick={()=>{
                    const spend=parseFloat(roasF.spend)||0,sales=parseFloat(roasF.sales)||0;
                    if(!spend||!sales){showT("Fill all fields!");return;}
                    const roas=(sales/spend).toFixed(2),acos=((spend/sales)*100).toFixed(1),profit=(sales-spend).toFixed(0);
                    const status=roas>=4?"Excellent":roas>=2?"Good":roas>=1?"Break Even":"Loss";
                    const advice=roas>=4?"Ads chal rahe hain! Budget badha sakte ho.":roas>=2?"Theek hai. Targeting optimize karo.":roas>=1?"Break even. Fix targeting urgently.":"Loss ho raha hai. Band karo ya change karo.";
                    setRoasR({roas,acos,profit,status,advice});
                  }}>Calculate ROAS</button>
                  {roasR&&(
                    <div style={{marginTop:12}} className="fa">
                      <div style={{background:parseFloat(roasR.roas)>=4?"rgba(16,185,129,.1)":parseFloat(roasR.roas)>=2?"rgba(245,158,11,.1)":"rgba(239,68,68,.1)",border:"1px solid rgba(99,102,241,.2)",borderRadius:12,padding:14,textAlign:"center",marginBottom:10}}>
                        <div style={{fontSize:10,color:"#64748b",marginBottom:2}}>ROAS</div>
                        <div style={{fontSize:30,fontWeight:900,color:parseFloat(roasR.roas)>=4?"#10b981":parseFloat(roasR.roas)>=2?"#f59e0b":"#ef4444"}}>{roasR.roas}x</div>
                        <div style={{fontSize:12,color:"#94a3b8"}}>{roasR.status}</div>
                      </div>
                      <div className="presult">
                        {[{l:"Profit",v:"Rs."+roasR.profit,c:parseFloat(roasR.profit)>0?"#10b981":"#ef4444"},{l:"ACoS",v:roasR.acos+"%",c:"#f59e0b"}].map(r=>(
                          <div key={r.l} className="prc"><div className="prl">{r.l}</div><div className="prv" style={{color:r.c}}>{r.v}</div></div>
                        ))}
                      </div>
                      <div style={{background:"rgba(99,102,241,.07)",border:"1px solid rgba(99,102,241,.15)",borderRadius:10,padding:11,marginTop:8}}>
                        <div style={{fontWeight:700,color:"#a5b4fc",fontSize:11,marginBottom:4}}>AI Advice</div>
                        <p style={{color:"#94a3b8",fontSize:11,lineHeight:1.65}}>{roasR.advice}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* AI TOOLS - API BASED */}
              {["investment","sales","inventory","price","competitor","niche","trending","supplier","bundle","returns","festival","compare","wamsg","titl","description","adcopy","revreply","listcheck","caption","launch"].map(toolId=>{
                const toolConfig={
                  investment:{label:"Investment Calculator",locked:false,color:"#6366f1",states:[invR,setInvR,invR,setInvR]},
                  sales:{label:"Sales Estimator",locked:false,color:"#f59e0b"},
                  inventory:{label:"Inventory Calculator",locked:false,color:"#10b981"},
                  price:{label:"Price Optimizer",locked:false,color:"#6366f1"},
                  competitor:{label:"Competitor Analysis",locked:false,color:"#ef4444"},
                  niche:{label:"🎯 Niche Finder",locked:false,color:"#8b5cf6"},
                  trending:{label:"Trending Products",locked:false,color:"#f97316"},
                  supplier:{label:"Supplier Finder",locked:false,color:"#0088cc"},
                  bundle:{label:"Bundle Creator",locked:false,color:"#ec4899"},
                  returns:{label:"Return Manager",locked:false,color:"#ef4444"},
                  festival:{label:"Festival Planner",locked:false,color:"#f59e0b"},
                  compare:{label:"Compare Products",locked:false,color:"#6366f1"},
                  wamsg:{label:"WhatsApp Message",locked:false,color:"#25d366"},
                  titl:{label:"Title Optimizer",locked:false,color:"#8b5cf6"},
                  description:{label:"Description Generator",locked:false,color:"#6366f1"},
                  adcopy:{label:"Ad Copy Generator",locked:true,color:"#f59e0b"},
                  revreply:{label:"Review Reply Generator",locked:true,color:"#10b981"},
                  listcheck:{label:"Listing Quality Checker",locked:true,color:"#6366f1"},
                  caption:{label:"Instagram Captions",locked:true,color:"#e1306c"},
                  launch:{label:"Launch Strategy",locked:true,color:"#8b5cf6"},
                };
                const cfg=toolConfig[toolId];
                if(!cfg||tab!==toolId) return null;
                const stateMap={
                  investment:[invR,setInvR,invtL,setInvtL],
                  sales:[salesD,setSalesD,salesL,setSalesL],
                  inventory:[invtD,setInvtD,invtL,setInvtL],
                  price:[priceD,setPriceD,priceL,setPriceL],
                  competitor:[compD,setCompD,compL,setCompL],
                  niche:[nicheD,setNicheD,nicheL,setNicheL],
                  trending:[trendD,setTrendD,trendL,setTrendL],
                  supplier:[suppD,setSuppD,suppL,setSuppL],
                  bundle:[bundleD,setBundleD,bundleL,setBundleL],
                  returns:[returnD,setReturnD,returnL,setReturnL],
                  festival:[festD,setFestD,festL,setFestL],
                  compare:[cmpRes,setCmpRes,cmpL,setCmpL],
                  wamsg:[waMsgD,setWaMsgD,waMsgL,setWaMsgL],
                  titl:[titleD,setTitleD,titleL,setTitleL],
                  description:[descD,setDescD,descL,setDescL],
                  adcopy:[adCopyD,setAdCopyD,adCopyL,setAdCopyL],
                  revreply:[revRepD,setRevRepD,revRepL,setRevRepL],
                  listcheck:[listChkD,setListChkD,listChkL,setListChkL],
                  caption:[captionD,setCaptionD,captionL,setCaptionL],
                  launch:[launchD,setLaunchD,launchL,setLaunchL],
                };
                const [data,setData,isLoading,setIsLoading]=stateMap[toolId]||[null,()=>{},false,()=>{}];
                const locked=cfg.locked&&isLocked;
                return(
                  <div key={toolId} className="fbox fa" style={{position:"relative"}}>
                    {locked&&<LockBox/>}
                    <h3 className="ict">{cfg.label}</h3>
                    {!pf.name&&<div className="errbanner">Pehle product analyze karo</div>}

                    {/* Special inputs for specific tools */}
                    {toolId==="revreply"&&(
                      <div style={{marginBottom:10}}>
                        <label className="ilbl">Customer Review Paste Karo</label>
                        <textarea value={reviewTxt} onChange={e=>setReviewTxt(e.target.value)} placeholder="e.g. Product bahut kharab tha, 2 din mein toot gaya..." style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"10px 12px",color:"#f8fafc",fontSize:12,fontFamily:"Inter,sans-serif",outline:"none",resize:"vertical",minHeight:80}}/>
                      </div>
                    )}
                    {toolId==="listcheck"&&(
                      <div style={{marginBottom:10}}>
                        <label className="ilbl">Apni Listing Paste Karo</label>
                        <textarea value={listingTxt} onChange={e=>setListingTxt(e.target.value)} placeholder="Title: ...\nDescription: ...\nBullet Points: ..." style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"10px 12px",color:"#f8fafc",fontSize:12,fontFamily:"Inter,sans-serif",outline:"none",resize:"vertical",minHeight:100}}/>
                      </div>
                    )}
                    {toolId==="festival"&&(
                      <div style={{marginBottom:10}}>
                        <label className="ilbl">Festival Select Karo</label>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:5}}>
                          {["Diwali","Holi","Eid","Christmas","New Year","Amazon Sale","Valentine Day","Navratri"].map(s=>(
                            <button key={s} onClick={()=>setFestSeason(s)} style={{padding:"5px 11px",borderRadius:100,border:"1.5px solid",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"Inter,sans-serif",background:festSeason===s?"linear-gradient(135deg,#f59e0b,#ef4444)":"rgba(15,23,42,.6)",borderColor:festSeason===s?"#f59e0b":"#1e293b",color:festSeason===s?"#fff":"#94a3b8"}}>{s}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="gbtn2" style={{background:"linear-gradient(135deg,"+cfg.color+","+cfg.color+"cc"}} disabled={isLoading||(!pf.name)} onClick={async()=>{
                      setIsLoading(true);
                      try{
                        let extra={};
                        if(toolId==="festival") extra={season:festSeason};
                        if(toolId==="revreply") extra={review:reviewTxt};
                        if(toolId==="listcheck") extra={listing:listingTxt};
                        const d=await apiCall(toolId==="revreply"?"review_reply":toolId==="listcheck"?"listing_checker":toolId==="adcopy"?"ad_copy_generator":toolId,extra);
                        setData(d);
                      }catch{ showT("Failed. Try again."); }
                      setIsLoading(false);
                    }}>
                      {isLoading?"Analyzing...":"Run "+cfg.label}
                    </button>
                    {isLoading&&<div className="ssp"/>}

                    {/* Results rendering */}
                    {data&&!isLoading&&(
                      <div style={{marginTop:12}} className="fa">
                        {/* Generic text blocks */}
                        {data.overview&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5}}>Overview</div><p className="gctx">{data.overview}</p></div>}
                        {data.analysis&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5}}>Analysis</div><p className="gctx">{data.analysis}</p></div>}
                        {data.description&&toolId==="description"&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>Description</span><button onClick={()=>navigator.clipboard?.writeText(data.description).then(()=>showT("Copied!"))} style={{background:"rgba(99,102,241,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#a5b4fc",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx" style={{whiteSpace:"pre-wrap"}}>{data.description}</p></div>}
                        {data.score&&<div style={{textAlign:"center",marginBottom:10}}><div style={{fontSize:36,fontWeight:900,color:parseInt(data.score)>=70?"#10b981":parseInt(data.score)>=50?"#f59e0b":"#ef4444"}}>{data.score}<span style={{fontSize:14,color:"#64748b"}}>/100</span></div></div>}
                        {data.issues?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,color:"#ef4444"}}>Issues</div>{data.issues.map((item,i)=><div key={i} style={{color:"#94a3b8",fontSize:11,padding:"2px 0",display:"flex",gap:6}}><span style={{color:"#ef4444",flexShrink:0}}>✗</span><span>{item}</span></div>)}</div>}
                        {data.improvements?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,color:"#10b981"}}>Improvements</div>{data.improvements.map((item,i)=><div key={i} style={{color:"#94a3b8",fontSize:11,padding:"2px 0",display:"flex",gap:6}}><span style={{color:"#10b981",flexShrink:0}}>✓</span><span>{item}</span></div>)}</div>}
                        {data.keywords?.length>0&&toolId!=="description"&&<div className="gcard" style={{marginBottom:8}}><div className="gct">Keywords</div><div className="kwrow">{data.keywords.map((k,i)=><span key={i} className="kw">{k}</span>)}</div></div>}
                        {data.missing_keywords?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct">Missing Keywords</div><div className="kwrow">{data.missing_keywords.map((k,i)=><span key={i} className="kw">{k}</span>)}</div></div>}
                        {data.optimized_title&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>Optimized Title</span><button onClick={()=>navigator.clipboard?.writeText(data.optimized_title).then(()=>showT("Copied!"))} style={{background:"rgba(99,102,241,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#a5b4fc",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx">{data.optimized_title}</p></div>}
                        {data.titles?.length>0&&data.titles.map((t,i)=><div key={i} className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>{t.platform||"Title "+(i+1)}</span><button onClick={()=>navigator.clipboard?.writeText(t.title||t).then(()=>showT("Copied!"))} style={{background:"rgba(99,102,241,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#a5b4fc",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx">{t.title||t}</p>{t.keywords&&<p style={{color:"#64748b",fontSize:10,marginTop:4}}>Keywords: {t.keywords}</p>}</div>)}
                        {data.copies?.length>0&&data.copies.map((c,i)=><div key={i} className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>{c.platform||"Ad "+(i+1)}</span><button onClick={()=>navigator.clipboard?.writeText(c.copy||c.text||c).then(()=>showT("Copied!"))} style={{background:"rgba(99,102,241,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#a5b4fc",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx" style={{whiteSpace:"pre-wrap"}}>{c.copy||c.text||c}</p></div>)}
                        {data.replies?.length>0&&data.replies.map((r,i)=><div key={i} className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>{r.type||"Reply "+(i+1)}</span><button onClick={()=>navigator.clipboard?.writeText(r.reply||r).then(()=>showT("Copied!"))} style={{background:"rgba(16,185,129,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#10b981",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx" style={{whiteSpace:"pre-wrap"}}>{r.reply||r}</p></div>)}
                        {data.captions?.length>0&&data.captions.map((c,i)=><div key={i} className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>Caption {i+1}</span><button onClick={()=>navigator.clipboard?.writeText((c.text||c)+" "+(c.hashtags||"")).then(()=>showT("Copied!"))} style={{background:"rgba(225,48,108,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#e1306c",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx">{c.text||c}</p>{c.hashtags&&<p style={{color:"#6366f1",fontSize:10,marginTop:4}}>{c.hashtags}</p>}</div>)}
                        {data.messages?.length>0&&data.messages.map((m,i)=><div key={i} className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>{m.type||"Message "+(i+1)}</span><button onClick={()=>navigator.clipboard?.writeText(m.text||m).then(()=>showT("Copied!"))} style={{background:"rgba(37,211,102,.1)",border:"none",borderRadius:6,padding:"2px 9px",color:"#25d366",fontSize:9,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Copy</button></div><p className="gctx" style={{whiteSpace:"pre-wrap"}}>{m.text||m}</p></div>)}
                        {data.week_plan?.length>0&&data.week_plan.map((w,i)=><div key={i} className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:6}}>{w.week||"Week "+(i+1)}</div>{(w.tasks||[]).map((t,j)=><div key={j} style={{color:"#94a3b8",fontSize:11,padding:"2px 0",display:"flex",gap:6}}><span style={{color:"#6366f1"}}>•</span><span>{t}</span></div>)}</div>)}
                        {data.bundles?.length>0&&data.bundles.map((b,i)=><div key={i} className="cc" style={{marginBottom:8}}><div className="cpt">{b.name}</div><div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:5}}>{(b.items||[]).map((item,j)=><span key={j} className="kw">{item}</span>)}</div><div style={{fontSize:11,color:"#94a3b8"}}>{b.bundle_price} &bull; {b.margin_increase}</div><p className="gctx" style={{marginTop:4}}>{b.why_works}</p></div>)}
                        {data.return_rate&&<div style={{textAlign:"center",marginBottom:10}}><div style={{fontSize:28,fontWeight:900,color:"#ef4444"}}>{data.return_rate}</div><div style={{fontSize:10,color:"#64748b"}}>{data.industry_average}</div></div>}
                        {data.prevention_tips?.length>0&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:6}}>Prevention Tips</div>{data.prevention_tips.map((t,i)=><div key={i} style={{color:"#94a3b8",fontSize:11,padding:"2px 0",display:"flex",gap:6}}><span style={{color:"#10b981"}}>✓</span><span>{t}</span></div>)}</div>}
                        {data.timeline?.length>0&&data.timeline.map((t,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}><div style={{minWidth:80,fontSize:10,color:"#f59e0b",fontWeight:700,flexShrink:0}}>{t.when}</div><div style={{color:"#94a3b8",fontSize:11}}>{t.action}</div></div>)}
                        {data.products?.length>0&&<div className="gcard"><div className="gct" style={{marginBottom:8}}>Products</div>{data.products.map((p,i)=><div key={i} className="sc" style={{marginBottom:6}}><div className="cpt">{p.name||p}</div>{p.reason&&<p className="gctx">{p.reason}</p>}</div>)}</div>}
                        {data.suppliers?.length>0&&data.suppliers.map((s,i)=><div key={i} className="sc" style={{marginBottom:6}}><div className="cpt">{s.name||s}</div>{s.contact&&<div style={{fontSize:10,color:"#64748b"}}>{s.contact}</div>}{s.why&&<p className="gctx" style={{marginTop:3}}>{s.why}</p>}</div>)}
                        {data.tips?.length>0&&<div className="gcard"><div className="gct" style={{marginBottom:6}}>Tips</div>{data.tips.map((t,i)=><div key={i} style={{color:"#94a3b8",fontSize:11,padding:"2px 0",display:"flex",gap:6}}><span style={{color:"#6366f1"}}>•</span><span>{t}</span></div>)}</div>}
                        {data.pricing_strategy&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5}}>Pricing Strategy</div><p className="gctx">{data.pricing_strategy}</p></div>}
                        {data.review_strategy&&<div className="gcard"><div className="gct" style={{marginBottom:5}}>Review Strategy</div><p className="gctx">{data.review_strategy}</p></div>}
                        {data.ad_strategy&&<div className="gcard"><div className="gct" style={{marginBottom:5}}>Ad Strategy</div><p className="gctx">{data.ad_strategy}</p></div>}
                        {data.stock_recommendation&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5}}>Stock Recommendation</div><p className="gctx">{data.stock_recommendation}</p></div>}
                        {data.ad_budget&&<div className="gcard" style={{marginBottom:8}}><div className="gct" style={{marginBottom:5}}>Ad Budget</div><p className="gctx">{data.ad_budget}</p></div>}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        )}

        <footer>YesYouPro &middot; AI Product Analyzer &middot; Made in India &middot; &copy; 2025</footer>
      </div>
    </div>}
    </>
  );
}
