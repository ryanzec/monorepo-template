import{n as r,m as c,o as l,r as a,e as i,i as g,B as u}from"./index.23c781d2.js";const d=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`,f=()=>{const n=c.useNavigate(),{login:e,loginRedirectUrl:t,finishLogin:o}=l.useContext(),s=a.exports.useCallback(async()=>{await e()},[e]);return a.exports.useEffect(()=>{!t||(n(t),o())},[n,t]),i(d,{"data-id":"login-page",children:i(g,{"data-id":"login-button","data-context":u.SAFE,onClick:s,children:"Login"})})};export{f as default};
