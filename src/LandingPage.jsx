import { useState } from "react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="landing">
    <header className="landing-nav">
      <a className="landing-brand" href="/" aria-label="Portfolia home"><span className="portfolia-mark">P</span> portfolia<span className="brand-dot">.</span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
      </nav>
      <div className="nav-actions"><a className="nav-login" href="/admin">Admin sign in</a><a className="landing-cta small-cta" href="/signup">Get started <span>↗</span></a></div>
    </header>

    <main>
      <section className="landing-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-dot"></span> YOUR WORK. YOUR STORY. YOUR PORTFOLIO.</div>
          <h1>Make your work<br/> <span>impossible to ignore.</span></h1>
          <p className="hero-description">A thoughtful space to bring your best work together, tell your story, and share what you can do with the world.</p>
          <div className="hero-actions"><a className="landing-cta" href="/signup">Create your portfolio <span>↗</span></a><a className="text-link" href="#features">Explore Portfolia <span>↓</span></a></div>
          <div className="hero-note"><span className="note-check">✓</span> Made for your next big opportunity.</div>
        </div>
        <div className="portfolio-visual" aria-label="Illustration of a portfolio website">
          <div className="visual-top"><span className="visual-brand">P<span>.</span></span><span className="visual-menu">PORTFOLIO PREVIEW <span>↗</span></span></div>
          <div className="visual-content"><div className="visual-label">DESIGNER · CREATOR · BUILDER</div><div className="visual-title">Ideas into<br/><em>impact.</em></div><div className="visual-line"></div><div className="visual-bottom"><span>SELECTED WORK — 2026</span><span>01 / 04</span></div></div>
          <div className="visual-stamp">MAKE<br/>IT<br/><b>YOURS.</b></div>
          <div className="visual-footer"><span>PORTFOLIA / PERSONAL BRANDING</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section className="trust-strip"><span>ONE SPACE FOR YOUR</span><b>WORK</b><i>✳</i><b>STORY</b><i>✳</i><b>NEXT CHAPTER</b><span className="strip-end">BUILT AROUND YOU</span></section>

      <section className="features-section" id="features">
        <div className="section-intro"><div className="section-tag">01 / WHAT YOU GET</div><h2>Everything you need<br/>to <span>show up confidently.</span></h2></div>
        <div className="feature-grid">
          <article className="feature-card feature-dark"><div className="feature-number">01</div><div className="feature-icon">▤</div><h3>Your work,<br/>beautifully presented.</h3><p>Bring projects, case studies, and achievements together in one polished home.</p><span className="feature-arrow">↗</span></article>
          <article className="feature-card"><div className="feature-number">02</div><div className="feature-icon lime-icon">✳</div><h3>A look that feels<br/>like you.</h3><p>Build a personal presence that reflects your style, skills, and ambition.</p><span className="feature-arrow">↗</span></article>
          <article className="feature-card"><div className="feature-number">03</div><div className="feature-icon">⌘</div><h3>Smart tools for<br/>your next step.</h3><p>Explore AI-assisted ideas and helpful tools to shape how you present your work.</p><span className="feature-arrow">↗</span></article>
        </div>
      </section>

      <section className="how-section" id="how-it-works"><div className="how-left"><div className="section-tag">02 / HOW IT WORKS</div><h2>From scattered<br/>to <span>standout.</span></h2><p>Start with what you have. Shape it into a clear story. Share it when you’re ready.</p><a className="landing-cta dark-cta" href="/signup">Start building <span>↗</span></a></div><div className="steps"><div className="step"><span>01</span><div><h3>Bring your best work</h3><p>Collect your projects, skills, experience, and wins in one place.</p></div><b>↗</b></div><div className="step"><span>02</span><div><h3>Tell your story</h3><p>Make it easy for people to understand who you are and what you do.</p></div><b>↗</b></div><div className="step"><span>03</span><div><h3>Share your next move</h3><p>Give opportunities a simple place to find you and your work.</p></div><b>↗</b></div></div></section>

      <section className="about-section" id="about"><div className="about-big">P<span>.</span></div><div className="about-copy"><div className="section-tag">03 / ABOUT PORTFOLIA</div><h2>Your journey deserves<br/>a <span>great first impression.</span></h2><p>Portfolia is designed to help people present their work with clarity and confidence. Whether you’re starting out, changing direction, or ready for your next opportunity, your story deserves a home that feels considered and unmistakably yours.</p><a className="text-link" href="/signup">Make it yours <span>↗</span></a></div></section>

      <section className="closing-cta"><div className="section-tag light-tag">YOUR NEXT CHAPTER STARTS HERE</div><h2>Ready to put your work<br/>out into the world?</h2><a className="landing-cta" href="/signup">Get started with Portfolia <span>↗</span></a><div className="closing-spark">✳</div></section>
    </main>

    <footer className="landing-footer"><a className="landing-brand" href="/"><span className="portfolia-mark">P</span> portfolia<span className="brand-dot">.</span></a><span>YOUR WORK. YOUR STORY.</span><div><a href="#features">Features</a><a href="#about">About</a><a href="/admin">Admin</a></div><small>© {new Date().getFullYear()} Portfolia. Built for what’s next.</small></footer>
    <div className="integration-note"><strong>Signup integration:</strong> The “Get started” buttons currently point to <code>/signup</code>. Replace this path with your friend’s actual signup route or API integration when it is ready.</div>
  </div>;
}

