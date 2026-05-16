<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Patient Tracking — HealDotIndia</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --navy:#0A2647;
  --gold:#D4A017;
  --gold-light:#F5E6B8;
  --cream:#FAFAF7;
  --white:#FFFFFF;
  --text:#1A1A2E;
  --text-muted:#5A6070;
  --border:#E8E8E0;
  --success:#0F6E56;
  --success-light:rgba(15,110,86,0.1);
  --warn:#D97706;
  --warn-light:rgba(217,119,6,0.1);
  --info:#1D4ED8;
  --info-light:rgba(29,78,216,0.08);
}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'DM Sans',sans-serif;color:var(--text);background:var(--cream);overflow-x:hidden;min-height:100vh}
a{text-decoration:none;color:inherit}

/* NAV */
nav{position:fixed;top:0;width:100%;z-index:1000;background:rgba(10,38,71,0.97);backdrop-filter:blur(10px);border-bottom:1px solid rgba(212,160,23,0.2)}
.nav-inner{max-width:1200px;margin:auto;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:70px}
.logo{font-family:'Playfair Display',serif;font-size:1.5rem;color:#fff;font-weight:700}
.logo span{color:var(--gold)}
.nav-back{color:rgba(255,255,255,0.7);font-size:0.88rem;display:flex;align-items:center;gap:0.4rem;transition:color 0.2s}
.nav-back:hover{color:var(--gold)}

/* HERO STRIP */
.hero-strip{background:linear-gradient(135deg,var(--navy) 0%,#16345a 100%);padding:120px 2rem 60px;text-align:center;position:relative;overflow:hidden}
.hero-strip::before{content:'';position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(212,160,23,0.1) 0%,transparent 70%);pointer-events:none}
.hero-strip .badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(212,160,23,0.15);border:1px solid rgba(212,160,23,0.3);color:var(--gold);padding:0.4rem 1rem;border-radius:20px;font-size:0.8rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:1.25rem}
.hero-strip h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:0.75rem}
.hero-strip h1 em{color:var(--gold);font-style:normal}
.hero-strip p{color:rgba(255,255,255,0.65);font-size:1rem;max-width:520px;margin:0 auto}

/* SEARCH SECTION */
.search-wrap{background:var(--white);border-bottom:1px solid var(--border);padding:2rem;position:sticky;top:70px;z-index:100;box-shadow:0 4px 20px rgba(10,38,71,0.06)}
.search-inner{max-width:700px;margin:auto}
.search-label{font-size:0.82rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem}
.search-row{display:flex;gap:0.75rem}
.search-input{flex:1;border:1.5px solid var(--border);border-radius:10px;padding:0.85rem 1.25rem;font-size:1rem;font-family:'DM Sans',sans-serif;color:var(--text);background:var(--cream);transition:border-color 0.2s;outline:none}
.search-input:focus{border-color:var(--navy)}
.search-btn{background:var(--navy);color:white;border:none;padding:0.85rem 1.75rem;border-radius:10px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background 0.2s;white-space:nowrap}
.search-btn:hover{background:#16345a}
.search-hint{font-size:0.78rem;color:var(--text-muted);margin-top:0.6rem}
.search-hint span{color:var(--gold);cursor:pointer;font-weight:600}
.search-hint span:hover{text-decoration:underline}

/* DEMO PILLS */
.demo-pills{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem}
.pill{background:var(--gold-light);color:var(--navy);border:1px solid rgba(212,160,23,0.3);border-radius:20px;padding:0.3rem 0.85rem;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.pill:hover{background:var(--gold);color:var(--navy)}

/* MAIN LAYOUT */
.main{max-width:1100px;margin:0 auto;padding:2.5rem 2rem 4rem}

/* EMPTY STATE */
.empty-state{text-align:center;padding:5rem 2rem;display:block}
.empty-icon{font-size:4rem;margin-bottom:1rem;opacity:0.5}
.empty-state h3{color:var(--navy);font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}
.empty-state p{color:var(--text-muted);font-size:0.9rem}

/* PATIENT HEADER CARD */
.patient-header{background:var(--navy);border-radius:16px;padding:2rem;margin-bottom:1.5rem;display:grid;grid-template-columns:auto 1fr auto;gap:1.5rem;align-items:center}
.patient-avatar{width:64px;height:64px;border-radius:50%;background:rgba(212,160,23,0.2);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--gold);font-weight:700;flex-shrink:0}
.patient-info h2{color:white;font-size:1.3rem;font-weight:600;margin-bottom:0.25rem}
.patient-meta{display:flex;gap:1.5rem;flex-wrap:wrap}
.patient-meta-item{color:rgba(255,255,255,0.6);font-size:0.83rem;display:flex;align-items:center;gap:0.35rem}
.patient-meta-item strong{color:rgba(255,255,255,0.9)}
.patient-status{text-align:right}
.status-badge{display:inline-flex;align-items:center;gap:0.4rem;padding:0.4rem 1rem;border-radius:20px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em}
.status-active{background:rgba(15,110,86,0.25);color:#4ade80;border:1px solid rgba(74,222,128,0.3)}
.status-pending{background:rgba(217,119,6,0.2);color:#fbbf24;border:1px solid rgba(251,191,36,0.3)}
.status-completed{background:rgba(29,78,216,0.2);color:#93c5fd;border:1px solid rgba(147,197,253,0.3)}
.status-dot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
.patient-id{color:rgba(255,255,255,0.4);font-size:0.78rem;margin-top:0.4rem}
@media(max-width:640px){.patient-header{grid-template-columns:auto 1fr;}.patient-status{grid-column:1/-1}}

/* GRID */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem}
@media(max-width:768px){.grid-2{grid-template-columns:1fr}}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}
@media(max-width:640px){.grid-3{grid-template-columns:1fr 1fr}}

/* CARDS */
.card{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:1.5rem}
.card-title{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:1.25rem;display:flex;align-items:center;gap:0.5rem}
.card-title::before{content:'';width:3px;height:14px;background:var(--gold);border-radius:2px;display:inline-block}

/* STAT CARDS */
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1rem}
.stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0}
.stat-icon.gold{background:var(--gold-light)}
.stat-icon.green{background:var(--success-light)}
.stat-icon.blue{background:var(--info-light)}
.stat-val{font-family:'Playfair Display',serif;font-size:1.6rem;color:var(--navy);font-weight:900;line-height:1}
.stat-lbl{font-size:0.78rem;color:var(--text-muted);margin-top:3px}

/* PROGRESS TRACKER */
.progress-track{position:relative;margin:1rem 0 0.5rem}
.track-steps{display:flex;justify-content:space-between;position:relative;z-index:1}
.track-steps::before{content:'';position:absolute;top:18px;left:0;right:0;height:2px;background:var(--border);z-index:0}
.track-fill{position:absolute;top:18px;left:0;height:2px;background:var(--gold);z-index:1;transition:width 0.8s ease}
.track-step{display:flex;flex-direction:column;align-items:center;gap:0.5rem;flex:1;position:relative;z-index:2}
.step-circle{width:36px;height:36px;border-radius:50%;border:2px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;color:var(--text-muted);transition:all 0.3s;flex-shrink:0}
.step-circle.done{background:var(--gold);border-color:var(--gold);color:var(--navy)}
.step-circle.active{background:var(--navy);border-color:var(--gold);color:var(--gold);box-shadow:0 0 0 4px rgba(212,160,23,0.15)}
.step-label{font-size:0.7rem;color:var(--text-muted);text-align:center;max-width:70px;line-height:1.3;font-weight:500}
.step-label.done{color:var(--navy);font-weight:600}
.step-label.active{color:var(--gold);font-weight:700}

/* TIMELINE */
.timeline{display:flex;flex-direction:column;gap:0}
.tl-item{display:flex;gap:1rem;padding-bottom:1.25rem;position:relative}
.tl-item:last-child{padding-bottom:0}
.tl-item:not(:last-child)::after{content:'';position:absolute;left:15px;top:32px;bottom:0;width:2px;background:var(--border)}
.tl-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.85rem;flex-shrink:0;position:relative;z-index:1}
.tl-dot.green{background:var(--success-light);border:2px solid var(--success)}
.tl-dot.gold{background:var(--gold-light);border:2px solid var(--gold)}
.tl-dot.blue{background:var(--info-light);border:2px solid var(--info)}
.tl-dot.gray{background:var(--border);border:2px solid #ccc}
.tl-content{flex:1;padding-top:4px}
.tl-title{font-size:0.9rem;font-weight:600;color:var(--navy);margin-bottom:2px}
.tl-date{font-size:0.75rem;color:var(--text-muted)}
.tl-note{font-size:0.82rem;color:var(--text-muted);margin-top:4px;line-height:1.5;padding:0.5rem 0.75rem;background:var(--cream);border-radius:6px;border-left:2px solid var(--border)}

/* DOCUMENTS */
.doc-list{display:flex;flex-direction:column;gap:0.75rem}
.doc-item{display:flex;align-items:center;gap:0.75rem;padding:0.75rem;border:1px solid var(--border);border-radius:8px;transition:border-color 0.2s;cursor:pointer}
.doc-item:hover{border-color:var(--gold)}
.doc-icon{width:36px;height:36px;border-radius:8px;background:var(--gold-light);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.doc-name{font-size:0.88rem;font-weight:600;color:var(--navy)}
.doc-meta{font-size:0.75rem;color:var(--text-muted)}
.doc-badge{margin-left:auto;font-size:0.7rem;padding:2px 8px;border-radius:4px;font-weight:600}
.doc-badge.ready{background:var(--success-light);color:var(--success)}
.doc-badge.pending{background:var(--warn-light);color:var(--warn)}

/* TEAM */
.team-list{display:flex;flex-direction:column;gap:0.75rem}
.team-member{display:flex;align-items:center;gap:0.75rem}
.member-avatar{width:40px;height:40px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;color:var(--gold);font-family:'Playfair Display',serif;font-weight:700;font-size:0.9rem;flex-shrink:0}
.member-name{font-size:0.9rem;font-weight:600;color:var(--navy)}
.member-role{font-size:0.75rem;color:var(--text-muted)}
.member-contact{margin-left:auto;display:flex;gap:0.5rem}
.contact-btn{width:32px;height:32px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:0.85rem;cursor:pointer;transition:all 0.2s;text-decoration:none}
.contact-btn:hover{border-color:var(--gold);background:var(--gold-light)}

/* COST TABLE */
.cost-table{width:100%;border-collapse:collapse}
.cost-table th{text-align:left;font-size:0.75rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;padding:0 0 0.75rem;border-bottom:1px solid var(--border)}
.cost-table td{padding:0.75rem 0;border-bottom:1px solid var(--border);font-size:0.88rem;color:var(--text)}
.cost-table tr:last-child td{border:none;font-weight:700;color:var(--navy)}
.cost-table .amount{text-align:right;font-variant-numeric:tabular-nums}
.cost-table .paid{color:var(--success)}
.cost-table .due{color:var(--warn)}

/* MESSAGES */
.msg-list{display:flex;flex-direction:column;gap:0.75rem;max-height:300px;overflow-y:auto;padding-right:4px}
.msg-list::-webkit-scrollbar{width:4px}
.msg-list::-webkit-scrollbar-track{background:var(--border);border-radius:4px}
.msg-list::-webkit-scrollbar-thumb{background:var(--gold);border-radius:4px}
.msg{padding:0.75rem 1rem;border-radius:10px;font-size:0.85rem;line-height:1.5}
.msg.from-team{background:var(--navy);color:rgba(255,255,255,0.85);border-bottom-left-radius:3px}
.msg.from-patient{background:var(--gold-light);color:var(--navy);border-bottom-right-radius:3px;align-self:flex-end;text-align:right}
.msg-sender{font-size:0.7rem;opacity:0.6;margin-bottom:3px;font-weight:600}
.msg-time{font-size:0.7rem;opacity:0.5;margin-top:3px}
.msg-input-row{display:flex;gap:0.5rem;margin-top:1rem}
.msg-input{flex:1;border:1.5px solid var(--border);border-radius:8px;padding:0.6rem 1rem;font-size:0.88rem;font-family:'DM Sans',sans-serif;outline:none;color:var(--text);background:var(--cream)}
.msg-input:focus{border-color:var(--navy)}
.msg-send{background:var(--navy);color:white;border:none;padding:0.6rem 1.1rem;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif}
.msg-send:hover{background:#16345a}

/* WHATSAPP */
.wa-btn{position:fixed;bottom:2rem;right:2rem;width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.4);z-index:999;transition:transform 0.2s}
.wa-btn:hover{transform:scale(1.1)}

/* SCROLL TOP */
.scroll-top{position:fixed;bottom:5.5rem;right:2rem;width:40px;height:40px;background:var(--navy);border:1px solid rgba(212,160,23,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold);cursor:pointer;opacity:0;transition:all 0.3s;font-size:1.1rem;z-index:998;border-style:solid}
.scroll-top.show{opacity:1}

/* ALERT BANNER */
.alert{border-radius:10px;padding:1rem 1.25rem;margin-bottom:1.5rem;display:flex;align-items:flex-start;gap:0.75rem;font-size:0.88rem;line-height:1.5}
.alert.info{background:var(--info-light);border:1px solid rgba(29,78,216,0.2);color:var(--info)}
.alert.success{background:var(--success-light);border:1px solid rgba(15,110,86,0.3);color:var(--success)}
.alert.warn{background:var(--warn-light);border:1px solid rgba(217,119,6,0.3);color:var(--warn)}
.alert-icon{font-size:1.1rem;flex-shrink:0}

/* TABS */
.tabs{display:flex;gap:0;border-bottom:2px solid var(--border);margin-bottom:1.5rem}
.tab{background:none;border:none;padding:0.75rem 1.25rem;font-size:0.88rem;font-weight:600;color:var(--text-muted);cursor:pointer;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all 0.2s}
.tab.active{color:var(--navy);border-bottom-color:var(--gold)}
.tab:hover{color:var(--navy)}
.tab-panel{display:none}
.tab-panel.active{display:block}

/* ANIMATIONS */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fade-up{animation:fadeUp 0.5s ease forwards}
.delay-1{animation-delay:0.1s;opacity:0}
.delay-2{animation-delay:0.2s;opacity:0}
.delay-3{animation-delay:0.3s;opacity:0}
.delay-4{animation-delay:0.4s;opacity:0}

@media(max-width:480px){
  .search-row{flex-direction:column}
  .track-steps{gap:0}
  .step-label{font-size:0.62rem;max-width:55px}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-inner">
    <a href="index.html" class="logo">Heal<span>Dot</span>India</a>
    <a href="index.html" class="nav-back">← Back to Home</a>
  </div>
</nav>

<!-- HERO -->
<div class="hero-strip">
  <div class="badge">🔒 Secure Patient Portal</div>
  <h1>Track Your <em>Treatment Journey</em></h1>
  <p>Enter your Patient ID or booking reference to view your real-time treatment status, documents, and care team.</p>
</div>

<!-- SEARCH -->
<div class="search-wrap">
  <div class="search-inner">
    <div class="search-label">Enter Patient ID or Booking Reference</div>
    <div class="search-row">
      <input type="text" class="search-input" id="trackingInput" placeholder="e.g. HDI-2026-00142" onkeydown="if(event.key==='Enter')trackPatient()">
      <button class="search-btn" onclick="trackPatient()">Track Now →</button>
    </div>
    <div class="search-hint">Don't have your ID? <span onclick="loadDemo('HDI-2026-00142')">Try a demo: HDI-2026-00142</span> · <span onclick="loadDemo('HDI-2026-00089')">HDI-2026-00089</span> · <span onclick="loadDemo('HDI-2026-00201')">HDI-2026-00201</span></div>
    <div class="demo-pills">
      <div class="pill" onclick="loadDemo('HDI-2026-00142')">🫀 Cardiac · Active</div>
      <div class="pill" onclick="loadDemo('HDI-2026-00089')">🦵 Ortho · Completed</div>
      <div class="pill" onclick="loadDemo('HDI-2026-00201')">👶 IVF · Pre-Travel</div>
    </div>
  </div>
</div>

<!-- MAIN -->
<div class="main">
  <!-- EMPTY STATE -->
  <div class="empty-state" id="emptyState">
    <div class="empty-icon">🏥</div>
    <h3>Enter your Patient ID to get started</h3>
    <p>Your unique tracking ID was sent to your email when you booked your consultation with HealDotIndia.</p>
  </div>

  <!-- TRACKING RESULT -->
  <div id="trackingResult" style="display:none">

    <!-- ALERT -->
    <div class="alert info fade-up" id="alertBanner">
      <span class="alert-icon">ℹ️</span>
      <span id="alertText">Your next appointment is scheduled. Please ensure all documents are uploaded.</span>
    </div>

    <!-- PATIENT HEADER -->
    <div class="patient-header fade-up delay-1" id="patientHeader">
      <div class="patient-avatar" id="patientAvatar">RJ</div>
      <div class="patient-info">
        <h2 id="patientName">Robert Johnson</h2>
        <div class="patient-meta">
          <div class="patient-meta-item">🌍 <strong id="patientCountry">Texas, USA</strong></div>
          <div class="patient-meta-item">🏥 <strong id="patientHospital">Apollo Hospital, Delhi</strong></div>
          <div class="patient-meta-item">💊 <strong id="patientTreatment">Heart Bypass Surgery</strong></div>
        </div>
      </div>
      <div class="patient-status">
        <div class="status-badge" id="statusBadge"><span class="status-dot"></span><span id="statusText">In Treatment</span></div>
        <div class="patient-id" id="patientIdDisplay">ID: HDI-2026-00142</div>
      </div>
    </div>

    <!-- STAT CARDS -->
    <div class="grid-3 fade-up delay-2" id="statCards">
      <div class="stat-card">
        <div class="stat-icon gold">📅</div>
        <div>
          <div class="stat-val" id="statDays">Day 8</div>
          <div class="stat-lbl">Of Treatment</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div>
          <div class="stat-val" id="statCompleted">3/5</div>
          <div class="stat-lbl">Steps Completed</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">💰</div>
        <div>
          <div class="stat-val" id="statSaved">$73K</div>
          <div class="stat-lbl">Total Saved</div>
        </div>
      </div>
    </div>

    <!-- PROGRESS TRACKER -->
    <div class="card fade-up delay-2" style="margin-bottom:1.5rem">
      <div class="card-title">Treatment Progress</div>
      <div class="progress-track">
        <div class="track-fill" id="trackFill" style="width:60%"></div>
        <div class="track-steps" id="trackSteps">
          <!-- filled by JS -->
        </div>
      </div>
      <div style="margin-top:1.5rem;font-size:0.85rem;color:var(--text-muted);text-align:center" id="progressNote">Currently at: <strong style="color:var(--navy)">Surgery & Hospital Stay</strong></div>
    </div>

    <!-- TABS -->
    <div class="tabs">
      <button class="tab active" onclick="switchTab('timeline',this)">📋 Timeline</button>
      <button class="tab" onclick="switchTab('documents',this)">📄 Documents</button>
      <button class="tab" onclick="switchTab('costs',this)">💳 Costs</button>
      <button class="tab" onclick="switchTab('team',this)">👨‍⚕️ Care Team</button>
      <button class="tab" onclick="switchTab('messages',this)">💬 Messages</button>
    </div>

    <!-- TIMELINE TAB -->
    <div class="tab-panel active" id="tab-timeline">
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Journey Timeline</div>
          <div class="timeline" id="timelineList"></div>
        </div>
        <div class="card">
          <div class="card-title">Upcoming Schedule</div>
          <div class="timeline" id="upcomingList"></div>
        </div>
      </div>
    </div>

    <!-- DOCUMENTS TAB -->
    <div class="tab-panel" id="tab-documents">
      <div class="card">
        <div class="card-title">Medical Documents</div>
        <div class="doc-list" id="docList"></div>
        <div style="margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--border);display:flex;gap:0.75rem;flex-wrap:wrap">
          <button style="background:var(--navy);color:white;border:none;padding:0.6rem 1.25rem;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">+ Upload Document</button>
          <button style="background:var(--cream);color:var(--navy);border:1px solid var(--border);padding:0.6rem 1.25rem;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">📥 Download All</button>
        </div>
      </div>
    </div>

    <!-- COSTS TAB -->
    <div class="tab-panel" id="tab-costs">
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Cost Breakdown</div>
          <table class="cost-table" id="costTable"></table>
        </div>
        <div class="card">
          <div class="card-title">Savings Summary</div>
          <div id="savingsSummary"></div>
        </div>
      </div>
    </div>

    <!-- TEAM TAB -->
    <div class="tab-panel" id="tab-team">
      <div class="card">
        <div class="card-title">Your Care Team</div>
        <div class="team-list" id="teamList"></div>
      </div>
    </div>

    <!-- MESSAGES TAB -->
    <div class="tab-panel" id="tab-messages">
      <div class="card">
        <div class="card-title">Messages with Care Team</div>
        <div class="msg-list" id="msgList"></div>
        <div class="msg-input-row">
          <input type="text" class="msg-input" id="msgInput" placeholder="Type a message..." onkeydown="if(event.key==='Enter')sendMessage()">
          <button class="msg-send" onclick="sendMessage()">Send →</button>
        </div>
      </div>
    </div>

  </div><!-- end trackingResult -->
</div><!-- end main -->

<!-- WHATSAPP -->
<a href="https://wa.me/918318465090?text=Hello, I need help with my patient tracking" class="wa-btn" target="_blank" title="Chat on WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<!-- SCROLL TOP -->
<button class="scroll-top" id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>

<script>
// ═══════════════════════════════════════
//  PATIENT DATA (demo)
// ═══════════════════════════════════════
const patients = {
  'HDI-2026-00142': {
    name: 'Robert Johnson',
    initials: 'RJ',
    country: 'Texas, USA',
    hospital: 'Apollo Hospital, Delhi',
    treatment: 'Heart Bypass Surgery',
    status: 'active',
    statusText: 'In Treatment',
    day: 'Day 8',
    steps: '3/5',
    saved: '$73K',
    progressPct: 60,
    currentStep: 3,
    alert: { type: 'info', text: 'Your next cardiology review is scheduled for tomorrow at 9:00 AM. Please fast from midnight.' },
    trackSteps: [
      { label: 'Consultation', state: 'done' },
      { label: 'Visa & Travel', state: 'done' },
      { label: 'Pre-Surgery', state: 'done' },
      { label: 'Surgery & Stay', state: 'active' },
      { label: 'Recovery', state: '' },
    ],
    timeline: [
      { icon: '✅', color: 'green', title: 'Arrived at Apollo Hospital, Delhi', date: 'May 8, 2026 · 2:30 PM', note: 'Welcome package received. Room 412 assigned. Coordinator: Priya Sharma.' },
      { icon: '🩺', color: 'green', title: 'Pre-surgical assessment completed', date: 'May 9, 2026 · 10:00 AM', note: 'All vitals normal. ECG, blood work, and chest X-ray cleared by Dr. Kapoor.' },
      { icon: '❤️', color: 'gold', title: 'Heart Bypass Surgery performed', date: 'May 11, 2026 · 7:30 AM', note: 'Surgery duration: 4h 20m. Procedure successful. Patient shifted to ICU for observation.' },
      { icon: '🛏️', color: 'blue', title: 'Moved to General Ward', date: 'May 13, 2026 · 3:00 PM', note: 'Stable. Physio sessions started. Pain management protocol in place.' },
    ],
    upcoming: [
      { icon: '🔬', color: 'gold', title: 'Cardiology Review — Dr. Kapoor', date: 'May 17, 2026 · 9:00 AM', note: 'Bring all medication logs. Fasting required from midnight.' },
      { icon: '🏃', color: 'blue', title: 'Physiotherapy Session 3', date: 'May 17, 2026 · 3:00 PM', note: 'Light walking exercises. Comfortable shoes recommended.' },
      { icon: '✈️', color: 'gray', title: 'Estimated discharge & flight home', date: 'May 22, 2026', note: 'Flight TX-442 Delhi→Dallas. Wheelchair assistance pre-booked.' },
    ],
    docs: [
      { icon: '📋', name: 'Medical History & Diagnosis', meta: 'PDF · 2.4 MB · Uploaded May 5', status: 'ready' },
      { icon: '🩻', name: 'Pre-Surgery ECG & X-Ray', meta: 'PDF · 8.1 MB · Uploaded May 9', status: 'ready' },
      { icon: '🔬', name: 'Blood Work Results', meta: 'PDF · 1.2 MB · Uploaded May 9', status: 'ready' },
      { icon: '📄', name: 'Surgery Report', meta: 'PDF · 3.6 MB · Uploaded May 11', status: 'ready' },
      { icon: '💊', name: 'Discharge Prescription', meta: 'PDF · Awaiting discharge', status: 'pending' },
      { icon: '🛡️', name: 'Insurance Pre-Auth Letter', meta: 'PDF · 0.9 MB · Uploaded May 4', status: 'ready' },
    ],
    costs: [
      { item: 'Heart Bypass Surgery', home: '$92,000', india: '$7,200', status: 'paid' },
      { item: 'Hospital Room (12 nights)', home: '$18,000', india: '$1,440', status: 'paid' },
      { item: 'ICU Stay (2 nights)', home: '$10,000', india: '$800', status: 'paid' },
      { item: 'Medications & Supplies', home: '$5,000', india: '$420', status: 'due' },
      { item: 'Physiotherapy (10 sessions)', home: '$3,000', india: '$180', status: 'due' },
    ],
    homeCostTotal: '$128,000', indiaCostTotal: '$10,040', savedTotal: '$117,960', pct: '92%',
    team: [
      { initials: 'AK', name: 'Dr. Arjun Kapoor', role: 'Lead Cardiac Surgeon', wa: '918318465090' },
      { initials: 'PS', name: 'Priya Sharma', role: 'Patient Coordinator', wa: '918318465090' },
      { initials: 'NR', name: 'Dr. Neha Rao', role: 'Anesthesiologist', wa: '918318465090' },
      { initials: 'VM', name: 'Vikram Mehta', role: 'Physiotherapist', wa: '918318465090' },
    ],
    messages: [
      { from: 'team', sender: 'Priya Sharma', text: 'Welcome Robert! We\'re so glad you chose HealDotIndia. Dr. Kapoor will meet you tomorrow at 10am for your pre-surgical assessment.', time: 'May 8, 2:45 PM' },
      { from: 'patient', sender: 'Robert J.', text: 'Thank you Priya! The room is excellent. The staff have been incredibly welcoming.', time: 'May 8, 3:10 PM' },
      { from: 'team', sender: 'Dr. Kapoor', text: 'Robert, your surgery went extremely well. Your heart is responding beautifully. Rest well — we\'ll review tomorrow.', time: 'May 11, 12:00 PM' },
      { from: 'patient', sender: 'Robert J.', text: 'Thank you doctor. My family back home is relieved. When can I video call them?', time: 'May 11, 2:00 PM' },
      { from: 'team', sender: 'Priya Sharma', text: 'Anytime Robert! The hospital Wi-Fi is strong in your ward. Also, your cardiology review is tomorrow at 9 AM — please fast from midnight.', time: 'May 16, 9:00 AM' },
    ],
  },

  'HDI-2026-00089': {
    name: 'Margaret Thompson',
    initials: 'MT',
    country: 'London, UK',
    hospital: 'Fortis Hospital, Delhi',
    treatment: 'Knee Replacement',
    status: 'completed',
    statusText: 'Completed',
    day: 'Day 28',
    steps: '5/5',
    saved: '£32K',
    progressPct: 100,
    currentStep: 5,
    alert: { type: 'success', text: 'Your treatment is complete! Your 3-month follow-up telemedicine call is scheduled for August 10, 2026.' },
    trackSteps: [
      { label: 'Consultation', state: 'done' },
      { label: 'Visa & Travel', state: 'done' },
      { label: 'Pre-Surgery', state: 'done' },
      { label: 'Surgery & Stay', state: 'done' },
      { label: 'Recovery', state: 'done' },
    ],
    timeline: [
      { icon: '✅', color: 'green', title: 'Initial consultation approved', date: 'Apr 1, 2026', note: 'Treatment plan approved by Dr. Singh. Hospital booking confirmed.' },
      { icon: '✅', color: 'green', title: 'Medical visa approved', date: 'Apr 8, 2026', note: 'e-Visa granted in 4 business days.' },
      { icon: '✅', color: 'green', title: 'Knee replacement surgery', date: 'Apr 18, 2026', note: 'Robotic-assisted surgery. 2.5 hrs. Full implant. Highly successful.' },
      { icon: '✅', color: 'green', title: 'Physiotherapy completed', date: 'Apr 26 – May 5, 2026', note: '10 sessions. Walking unassisted by session 6.' },
      { icon: '✅', color: 'green', title: 'Returned home to London', date: 'May 8, 2026', note: 'Wheelchair assistance provided. Full medical report handed over.' },
    ],
    upcoming: [
      { icon: '📞', color: 'gold', title: 'Telemedicine Follow-Up — Dr. Singh', date: 'Aug 10, 2026 · 3:00 PM IST', note: 'X-ray from your GP required before the call.' },
    ],
    docs: [
      { icon: '📋', name: 'Pre-Op Assessment Report', meta: 'PDF · 1.8 MB', status: 'ready' },
      { icon: '🩻', name: 'Post-Op X-Ray (Knee)', meta: 'PDF · 5.2 MB', status: 'ready' },
      { icon: '📄', name: 'Discharge Summary', meta: 'PDF · 2.1 MB', status: 'ready' },
      { icon: '💊', name: 'Medication & Care Plan', meta: 'PDF · 0.8 MB', status: 'ready' },
    ],
    costs: [
      { item: 'Robotic Knee Replacement', home: '£38,000', india: '$6,500', status: 'paid' },
      { item: 'Hospital Stay (10 nights)', home: '£12,000', india: '$900', status: 'paid' },
      { item: 'Physiotherapy (10 sessions)', home: '£2,000', india: '$180', status: 'paid' },
    ],
    homeCostTotal: '£52,000', indiaCostTotal: '$7,580', savedTotal: '£44,420', pct: '85%',
    team: [
      { initials: 'RS', name: 'Dr. Rajiv Singh', role: 'Orthopedic Surgeon', wa: '918318465090' },
      { initials: 'AM', name: 'Anita Mishra', role: 'Patient Coordinator', wa: '918318465090' },
    ],
    messages: [
      { from: 'team', sender: 'Anita Mishra', text: 'Welcome Margaret! We\'re so pleased to have you here. Your surgery is confirmed for April 18th.', time: 'Apr 16, 10:00 AM' },
      { from: 'patient', sender: 'Margaret T.', text: 'Thank you Anita. I\'m a bit nervous but the facility looks wonderful!', time: 'Apr 16, 11:30 AM' },
      { from: 'team', sender: 'Dr. Singh', text: 'Margaret, your surgery was a complete success. The new knee implant is perfectly positioned. You\'ll be walking in 2 days!', time: 'Apr 18, 4:00 PM' },
    ],
  },

  'HDI-2026-00201': {
    name: 'Sarah & James Kim',
    initials: 'SK',
    country: 'Sydney, Australia',
    hospital: 'Fortis Hospital, Bangalore',
    treatment: 'IVF Treatment',
    status: 'pending',
    statusText: 'Pre-Travel',
    day: 'T-12 Days',
    steps: '1/5',
    saved: 'AU$42K',
    progressPct: 20,
    currentStep: 2,
    alert: { type: 'warn', text: 'Action required: Please upload your medical reports and complete the pre-travel checklist before May 25.' },
    trackSteps: [
      { label: 'Consultation', state: 'done' },
      { label: 'Visa & Travel', state: 'active' },
      { label: 'Pre-Treatment', state: '' },
      { label: 'IVF Cycle', state: '' },
      { label: 'Follow-up', state: '' },
    ],
    timeline: [
      { icon: '✅', color: 'green', title: 'Free consultation completed', date: 'May 2, 2026', note: 'Treatment plan prepared by Dr. Mehra. IVF cycle dates confirmed.' },
      { icon: '🛂', color: 'gold', title: 'Medical visa application submitted', date: 'May 14, 2026', note: 'Application reference: MV-2026-AUS-7821. Expected approval in 3-5 days.' },
    ],
    upcoming: [
      { icon: '🛂', color: 'gold', title: 'Visa Expected Approval', date: 'May 18-20, 2026', note: 'Check your email. HealDotIndia will also notify you instantly.' },
      { icon: '✈️', color: 'blue', title: 'Fly Sydney → Bangalore', date: 'May 28, 2026', note: 'Flight QF-51. Departure 10:30 PM. Airport pickup arranged.' },
      { icon: '🔬', color: 'blue', title: 'Initial Assessment — Dr. Mehra', date: 'May 29, 2026 · 11:00 AM', note: 'Bring all previous fertility reports and prescriptions.' },
    ],
    docs: [
      { icon: '📋', name: 'Previous IVF Cycle Reports', meta: 'Upload required', status: 'pending' },
      { icon: '🩸', name: 'Fertility Blood Panel', meta: 'Upload required', status: 'pending' },
      { icon: '🛂', name: 'Visa Application Copy', meta: 'PDF · 0.6 MB', status: 'ready' },
      { icon: '✈️', name: 'Flight Itinerary', meta: 'PDF · 0.3 MB', status: 'ready' },
    ],
    costs: [
      { item: 'IVF Cycle (complete)', home: 'AU$18,000', india: '$3,500', status: 'due' },
      { item: 'Medications', home: 'AU$4,000', india: '$600', status: 'due' },
      { item: 'Monitoring & Scans', home: 'AU$3,000', india: '$400', status: 'due' },
    ],
    homeCostTotal: 'AU$25,000', indiaCostTotal: '$4,500', savedTotal: 'AU$20,500', pct: '82%',
    team: [
      { initials: 'SM', name: 'Dr. Sunita Mehra', role: 'Fertility Specialist', wa: '918318465090' },
      { initials: 'RP', name: 'Ravi Pillai', role: 'Patient Coordinator', wa: '918318465090' },
    ],
    messages: [
      { from: 'team', sender: 'Ravi Pillai', text: 'Welcome Sarah & James! We\'re honoured to support your journey. Dr. Mehra is one of India\'s top fertility specialists with a 65% success rate.', time: 'May 2, 3:00 PM' },
      { from: 'patient', sender: 'Sarah K.', text: 'Thank you so much. After 3 failed cycles in Sydney we are hopeful. When should we upload our reports?', time: 'May 2, 4:30 PM' },
      { from: 'team', sender: 'Ravi Pillai', text: 'Please upload all previous IVF reports and blood work before May 25. Dr. Mehra will review them before your arrival. You\'ve got this! 🙏', time: 'May 3, 9:00 AM' },
    ],
  },
};

// ═══════════════════════════════════════
//  TRACK FUNCTION
// ═══════════════════════════════════════
function trackPatient() {
  const id = document.getElementById('trackingInput').value.trim().toUpperCase();
  if (!id) { alert('Please enter a Patient ID'); return; }
  const p = patients[id];
  if (!p) {
    alert('Patient ID not found. Try a demo ID:\nHDI-2026-00142\nHDI-2026-00089\nHDI-2026-00201');
    return;
  }
  renderPatient(id, p);
}

function loadDemo(id) {
  document.getElementById('trackingInput').value = id;
  renderPatient(id, patients[id]);
}

function renderPatient(id, p) {
  document.getElementById('emptyState').style.display = 'none';
  const result = document.getElementById('trackingResult');
  result.style.display = 'block';

  // Alert
  const alert = document.getElementById('alertBanner');
  alert.className = 'alert fade-up ' + p.alert.type;
  document.getElementById('alertText').textContent = p.alert.text;

  // Header
  document.getElementById('patientAvatar').textContent = p.initials;
  document.getElementById('patientName').textContent = p.name;
  document.getElementById('patientCountry').textContent = p.country;
  document.getElementById('patientHospital').textContent = p.hospital;
  document.getElementById('patientTreatment').textContent = p.treatment;
  document.getElementById('patientIdDisplay').textContent = 'ID: ' + id;

  const badge = document.getElementById('statusBadge');
  badge.className = 'status-badge status-' + p.status;
  document.getElementById('statusText').textContent = p.statusText;

  // Stats
  document.getElementById('statDays').textContent = p.day;
  document.getElementById('statCompleted').textContent = p.steps;
  document.getElementById('statSaved').textContent = p.saved;

  // Progress bar
  document.getElementById('trackFill').style.width = p.progressPct + '%';
  const stepsEl = document.getElementById('trackSteps');
  stepsEl.innerHTML = '';
  p.trackSteps.forEach(s => {
    stepsEl.innerHTML += `<div class="track-step">
      <div class="step-circle ${s.state}">${s.state==='done'?'✓':s.state==='active'?'●':''}</div>
      <div class="step-label ${s.state}">${s.label}</div>
    </div>`;
  });
  const currentLabel = p.trackSteps.find(s=>s.state==='active'||s.state==='done'&&p.progressPct===100)?.label || '';
  document.getElementById('progressNote').innerHTML = p.progressPct===100
    ? '<strong style="color:var(--success)">✅ Treatment journey complete!</strong>'
    : `Currently at: <strong style="color:var(--navy)">${p.trackSteps.find(s=>s.state==='active')?.label||''}</strong>`;

  // Timeline
  const tl = document.getElementById('timelineList');
  tl.innerHTML = '';
  p.timeline.forEach(t => {
    tl.innerHTML += `<div class="tl-item">
      <div class="tl-dot ${t.color}">${t.icon}</div>
      <div class="tl-content">
        <div class="tl-title">${t.title}</div>
        <div class="tl-date">${t.date}</div>
        ${t.note?`<div class="tl-note">${t.note}</div>`:''}
      </div>
    </div>`;
  });

  const up = document.getElementById('upcomingList');
  up.innerHTML = '';
  p.upcoming.forEach(t => {
    up.innerHTML += `<div class="tl-item">
      <div class="tl-dot ${t.color}">${t.icon}</div>
      <div class="tl-content">
        <div class="tl-title">${t.title}</div>
        <div class="tl-date">${t.date}</div>
        ${t.note?`<div class="tl-note">${t.note}</div>`:''}
      </div>
    </div>`;
  });

  // Documents
  const docList = document.getElementById('docList');
  docList.innerHTML = '';
  p.docs.forEach(d => {
    docList.innerHTML += `<div class="doc-item">
      <div class="doc-icon">${d.icon}</div>
      <div><div class="doc-name">${d.name}</div><div class="doc-meta">${d.meta}</div></div>
      <span class="doc-badge ${d.status==='ready'?'ready':'pending'}">${d.status==='ready'?'Ready':'Pending'}</span>
    </div>`;
  });

  // Costs
  const ct = document.getElementById('costTable');
  ct.innerHTML = `<tr><th>Item</th><th class="amount">Home Country</th><th class="amount">India</th><th class="amount">Status</th></tr>`;
  p.costs.forEach(c => {
    ct.innerHTML += `<tr>
      <td>${c.item}</td>
      <td class="amount" style="color:var(--text-muted);text-decoration:line-through">${c.home}</td>
      <td class="amount">${c.india}</td>
      <td class="amount"><span class="doc-badge ${c.status==='paid'?'ready':'pending'}">${c.status==='paid'?'Paid':'Due'}</span></td>
    </tr>`;
  });
  ct.innerHTML += `<tr>
    <td><strong>Total</strong></td>
    <td class="amount" style="color:#e24b4a;font-weight:700">${p.homeCostTotal}</td>
    <td class="amount" style="color:var(--success);font-weight:700">${p.indiaCostTotal}</td>
    <td class="amount"></td>
  </tr>`;

  const ss = document.getElementById('savingsSummary');
  ss.innerHTML = `
    <div style="text-align:center;padding:1.5rem 0">
      <div style="font-family:'Playfair Display',serif;font-size:3rem;color:var(--gold);font-weight:900;line-height:1">${p.savedTotal}</div>
      <div style="color:var(--text-muted);font-size:0.88rem;margin-top:0.4rem">Total Savings vs Home Country</div>
      <div style="margin-top:1rem;background:var(--success-light);color:var(--success);font-size:1.1rem;font-weight:700;padding:0.75rem;border-radius:8px">${p.pct} Saved</div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:1rem;margin-top:0.5rem">
      <div style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">
        <p>💡 Your savings include surgery, hospital stay, and medications. Travel and accommodation costs not included in calculation.</p>
      </div>
    </div>`;

  // Team
  const tl2 = document.getElementById('teamList');
  tl2.innerHTML = '';
  p.team.forEach(m => {
    tl2.innerHTML += `<div class="team-member">
      <div class="member-avatar">${m.initials}</div>
      <div>
        <div class="member-name">${m.name}</div>
        <div class="member-role">${m.role}</div>
      </div>
      <div class="member-contact">
        <a href="https://wa.me/${m.wa}" target="_blank" class="contact-btn" title="WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a href="mailto:hello@healdotindia.com" class="contact-btn" title="Email">📧</a>
      </div>
    </div>`;
  });

  // Messages
  renderMessages(p.messages);

  // Reset to first tab
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(t=>t.classList.remove('active'));
  document.querySelector('.tab').classList.add('active');
  document.getElementById('tab-timeline').classList.add('active');

  // Scroll to result
  setTimeout(()=>result.scrollIntoView({behavior:'smooth',block:'start'}),100);
}

function renderMessages(msgs) {
  const list = document.getElementById('msgList');
  list.innerHTML = '';
  msgs.forEach(m => {
    list.innerHTML += `<div class="msg from-${m.from}">
      <div class="msg-sender">${m.sender}</div>
      ${m.text}
      <div class="msg-time">${m.time}</div>
    </div>`;
  });
  list.scrollTop = list.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text) return;
  const list = document.getElementById('msgList');
  const now = new Date().toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
  list.innerHTML += `<div class="msg from-patient">
    <div class="msg-sender">You</div>
    ${text}
    <div class="msg-time">${now}</div>
  </div>`;
  input.value = '';
  list.scrollTop = list.scrollHeight;
  // Auto-reply
  setTimeout(()=>{
    list.innerHTML += `<div class="msg from-team">
      <div class="msg-sender">HealDotIndia Team</div>
      Thank you for your message! Our team will respond within 2 hours. For urgent queries, please WhatsApp us directly.
      <div class="msg-time">Just now</div>
    </div>`;
    list.scrollTop = list.scrollHeight;
  }, 1200);
}

function switchTab(name, btn) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}

// Scroll top
window.onscroll = function() {
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 300);
};
</script>
</body>
</html>