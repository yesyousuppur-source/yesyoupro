export default function Error({statusCode}) {
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#020817",fontFamily:"Inter,sans-serif"}}>
      <div style={{textAlign:"center",color:"#f8fafc"}}>
        <div style={{fontSize:40,marginBottom:16}}>⚠️</div>
        <h1 style={{fontSize:20,fontWeight:800,marginBottom:8}}>Something went wrong</h1>
        <p style={{color:"#64748b",fontSize:13,marginBottom:20}}>{statusCode ? "Server error "+statusCode : "Client error occurred"}</p>
        <button onClick={()=>window.location.href="/"} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",border:"none",borderRadius:10,padding:"10px 24px",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Go Home</button>
      </div>
    </div>
  );
}
Error.getInitialProps = ({res,err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};
