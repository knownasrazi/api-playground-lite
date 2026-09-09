import { useState } from "react";
export default function App(){
  const [url,setUrl]=useState("https://jsonplaceholder.typicode.com/posts/1");
  const [method,setMethod]=useState("GET");
  const [body,setBody]=useState("");
  const [res,setRes]=useState("");
  async function send(){
    try{
      const r=await fetch(url,{method, body: method==="GET" ? undefined : body, headers: {"Content-Type":"application/json"}});
      const t=await r.text();
      setRes(r.status+"\n"+t);
    }catch(e:any){ setRes(String(e)) }
  }
  return (
    <main className="bg-[#fdfcfa] min-h-screen text-[#1a1a1a]">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-light">api-playground-lite</h1>
        <div className="mt-4 flex gap-2">
          <select value={method} onChange={e=>setMethod(e.target.value)} className="rounded-xl border border-[#ebe7e0] px-3 py-2 text-sm">
            <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
          </select>
          <input value={url} onChange={e=>setUrl(e.target.value)} className="flex-1 rounded-xl border border-[#ebe7e0] px-3 py-2 text-sm" />
          <button onClick={send} className="rounded-xl bg-[#1a1a1a] px-4 py-2 text-sm text-white">Send</button>
        </div>
        {method!=="GET" && <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder='{"key":"value"}' rows={4} className="mt-2 w-full rounded-xl border border-[#ebe7e0] p-3 text-sm" />}
        <pre className="mt-4 max-h-[40vh] overflow-auto rounded-2xl border border-[#ebe7e0] bg-white p-4 text-xs">{res || "Response will appear here"}</pre>
      </div>
    </main>
  );
}
