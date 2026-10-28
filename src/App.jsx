import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [adminEmail, setAdminEmail] = useState(() => sessionStorage.getItem("admin_email") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [section, setSection] = useState("Overview");

  async function signIn(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      sessionStorage.setItem("admin_token", result.token);
      sessionStorage.setItem("admin_email", result.email);
      setAdminEmail(result.email);
      setToken(result.token);
      setPassword("");
    } catch (err) {
      setError(err.message || "Could not reach the login service. Deploy this project to Vercel and check its API logs.");
    } finally { setBusy(false); }
  }

  function signOut() {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_email");
    setToken("");
    setAdminEmail("");
    setPassword("");
  }

  if (!token) return <main className="login-page">
    <section className="login-panel">
      <div className="logo">A<span>.</span></div>
      <div className="eyebrow">SECURE ADMINISTRATION</div>
      <h1>Welcome back.</h1>
      <p className="muted">Sign in to your administration workspace.</p>
      <form onSubmit={signIn}>
        <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin email" autoComplete="username" required /></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" required /></label>
        {error && <div className="error" role="alert">{error}</div>}
        <button className="button primary wide" disabled={busy}>{busy ? "Signing in…" : "Sign in"} <span>↗</span></button>
      </form>
      <div className="login-bottom"><span className="lock">▣</span> Private administrator access</div>
    </section>
    <div className="login-side"><div className="side-top">ADMIN CONSOLE <span>V1.0</span></div><div className="side-copy"><div className="eyebrow light">CONTROL CENTER</div><h2>Everything<br/>in its place.</h2><p>A clean workspace designed for focused administration.</p></div><div className="side-bottom"><span>BLACK / WHITE</span><span>BUILT FOR CLARITY</span></div></div>
  </main>;

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon">A<span>.</span></div><div>ADMIN<span className="brand-sub">CONTROL PANEL</span></div></div>
      <div className="nav-caption">WORKSPACE</div>
      {["Overview","Users","Settings"].map((item,i)=><button key={item} className={"nav-item "+(section===item?"chosen":"")} onClick={()=>setSection(item)}><span className="nav-icon">{["◫","♙","⚙"][i]}</span>{item}{item==="Users"&&<span className="nav-arrow">›</span>}</button>)}
      <div className="sidebar-footer"><div className="avatar">A</div><div className="account"><strong>Administrator</strong><span>{adminEmail}</span></div><button className="signout-icon" onClick={signOut} aria-label="Sign out">↗</button></div>
    </aside>
    <main className="workspace">
      <header className="header"><div><div className="breadcrumbs">WORKSPACE <span>/</span> {section.toUpperCase()}</div><h1>{section}</h1></div><button className="button outline" onClick={signOut}>Sign out ↗</button></header>
      {section==="Overview" && <>
        <section className="hero"><div><div className="eyebrow light">ADMINISTRATOR WORKSPACE</div><h2>Good to have you here.</h2><p>Your dashboard is ready for backend integration.</p></div><div className="hero-art">A<span>.</span></div></section>
        <div className="stats">
          <article className="stat"><div className="stat-label">USER RECORDS <span>↗</span></div><strong>—</strong><small>Connect your backend to load data</small></article>
          <article className="stat"><div className="stat-label">ACTIVE USERS <span>↗</span></div><strong>—</strong><small>Waiting for live user data</small></article>
          <article className="stat"><div className="stat-label">PENDING ACTIONS <span>↗</span></div><strong>—</strong><small>Available after API connection</small></article>
        </div>
        <section className="content-card"><div className="card-heading"><div><div className="eyebrow">SYSTEM STATUS</div><h2>Backend connection</h2></div><span className="pill"><i/> Not connected</span></div><div className="connection"><div className="connection-icon">⌁</div><div><strong>Connect your friend's API</strong><p>This dashboard contains no fake user records. When you connect the backend, wire the Users page to your API endpoints to load and manage real accounts.</p></div></div><div className="endpoint-list"><div><span>Authentication</span><code>/api/login</code><span className="tag ready">Included</span></div><div><span>List users</span><code>GET /api/users</code><span className="tag pending">Backend needed</span></div><div><span>Update users</span><code>PATCH /api/users/:id</code><span className="tag pending">Backend needed</span></div></div></section>
      </>}
      {section==="Users" && <section className="content-card"><div className="card-heading"><div><div className="eyebrow">DIRECTORY</div><h2>Users</h2></div><span className="pill"><i/> Waiting for API</span></div><div className="empty-state"><div className="empty-icon">♙</div><h3>No backend connected</h3><p>No sample users are shown. Connect your friend's backend API to display real user accounts here.</p><button className="button outline" onClick={()=>setSection("Overview")}>View connection details</button></div></section>}
      {section==="Settings" && <section className="content-card"><div className="eyebrow">PREFERENCES</div><h2>Account settings</h2><div className="settings-row"><div><strong>Signed in as</strong><p>{adminEmail}</p></div><button className="button outline" onClick={signOut}>Sign out</button></div><div className="settings-row"><div><strong>Backend API</strong><p>Not connected yet. Your friend can provide the API base URL and endpoint documentation.</p></div></div></section>}
      <footer className="footer"><span>ADMIN CONSOLE</span><span>BLACK & WHITE EDITION</span><span>SECURE WORKSPACE</span></footer>
    </main>
  </div>;
}
