<script setup>
import { ref } from 'vue'

const submitting = ref(false)
const statusMessage = ref('')
const statusType = ref('')

async function submitForm(event) {
  const form = event.currentTarget
  if (!form.reportValidity()) return

  statusMessage.value = ''
  statusType.value = ''
  submitting.value = true

  const data = Object.fromEntries(new FormData(form).entries())

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(result.error || 'Slanje nije uspjelo. Pokušajte ponovno.')
    }
    form.reset()
    statusMessage.value = 'Hvala! Upit je uspješno poslan.'
    statusType.value = 'success'
  } catch (error) {
    statusMessage.value = error?.message || 'Došlo je do pogreške. Pokušajte ponovno.'
    statusType.value = 'error'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
<div class="istraads-landing">
  <main>
    <section class="hero" aria-labelledby="glavni-naslov">
      <div class="container">
        <header class="topbar">
          <a class="brand" href="/" aria-label="IstraAds – početna"><span class="brand-symbol" aria-hidden="true">↗</span>IstraAds</a>
          <a class="nav-link" href="#usluge">Naše usluge <span aria-hidden="true">↓</span></a>
        </header>
        <div class="lead">
          <div class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span> Digitalna rješenja za Istru</div>
          <h1 id="glavni-naslov">Vaš sljedeći klijent<br><span>počinje ovdje.</span></h1>
          <p class="hero-sub"><strong>Snimanje i fotografiranje dronom</strong>, web stranice, SEO optimizacija, Facebook i Instagram oglasi te digitalna rješenja za tvrtke u Istri. <strong>Recite nam svoj cilj.</strong></p>
        </div>
        <div class="form-wrap" id="kontakt">
          <div class="form-top">
            <div><h2>Zatražite besplatnu analizu</h2><p>Ispunite kratki obrazac i javit ćemo vam se s prijedlogom sljedećeg koraka.</p></div>
            <span class="form-tag">Bez obveze</span>
          </div>
          <form id="lead-form" @submit.prevent="submitForm">
            <div class="fields">
              <div class="field"><label for="name">Ime i prezime <em>*</em></label><input id="name" name="name" type="text" autocomplete="name" placeholder="Vaše ime" required maxlength="100"></div>
              <div class="field"><label for="email">E-mail adresa <em>*</em></label><input id="email" name="email" type="email" autocomplete="email" placeholder="ime@tvrtka.hr" required maxlength="160"></div>
              <div class="field"><label for="phone">Broj telefona (opcionalno)</label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+385 ..." maxlength="40"></div>
              <div class="field"><label for="service">Što vas zanima? <em>*</em></label><select id="service" name="service" required><option value="" disabled selected>Odaberite uslugu</option><option>Snimanje i fotografiranje dronom</option><option>Izrada web stranice</option><option>SEO optimizacija</option><option>Facebook i Instagram oglasi</option><option>Google oglasi</option><option>Vođenje društvenih mreža</option><option>Video i foto sadržaj</option><option>AI chatbot</option><option>Aplikacija / online rezervacije</option><option>Google Business profil</option><option>Više usluga / Nisam siguran</option></select></div>
              <div class="field full"><label for="message">Kratko opišite što vam treba (opcionalno)</label><textarea id="message" name="message" maxlength="1500" placeholder="Primjer: trebam web stranicu i više upita od klijenata..."></textarea></div>
              <div class="trap" aria-hidden="true"><label for="website">Ostavite prazno</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
            </div>
            <div class="form-bottom">
              <p class="fineprint">Podatke koristimo samo za odgovor na vaš upit. Više u <a href="/privatnost.html">obavijesti o privatnosti</a>.</p>
              <button class="submit" id="submit-button" type="submit" :disabled="submitting">{{ submitting ? 'Slanje...' : 'Pošalji upit' }} <span aria-hidden="true">↗</span></button>
            </div>
            <p class="status" :class="statusType" id="form-status" role="status" aria-live="polite">{{ statusMessage }}</p>
          </form>
        </div>
        <a href="#usluge" class="down">Istražite što radimo <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m0 0 6-6m-6 6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
    </section>

    <section class="services" id="usluge" aria-labelledby="usluge-naslov">
      <div class="container">
        <div class="section-heading">
          <span class="section-kicker">Što radimo</span>
          <h2 id="usluge-naslov">Sve što vašem poslovanju treba za digitalni rast.</h2>
          <p>Od prve web stranice do oglasa, automatizacija i novih upita. Odaberite jednu uslugu ili kombinaciju koja odgovara vašim ciljevima.</p>
        </div>
        <div class="service-grid">
          <article class="service"><div class="service-number" aria-hidden="true">01</div><h3>Snimanje i fotografiranje dronom</h3><p>Zračne fotografije i videozapisi nekretnina, vila, zemljišta i poslovnih prostora za web stranice, oglase i društvene mreže.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">02</div><h3>Izrada web stranica</h3><p>Moderne, brze i pregledne web stranice te landing stranice koje jasno predstavljaju vašu ponudu i olakšavaju kontakt.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">03</div><h3>SEO optimizacija</h3><p>Tehnički SEO, optimizacija sadržaja i lokalno pretraživanje kako bi vas potencijalni klijenti lakše pronašli na Googleu.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">04</div><h3>Facebook i Instagram oglasi</h3><p>Planiranje, izrada i optimizacija Meta kampanja usmjerenih na poruke, upite i nove potencijalne kupce.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">05</div><h3>Google oglašavanje</h3><p>Google Ads kampanje koje vašu ponudu prikazuju ljudima dok aktivno pretražuju proizvode i usluge.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">06</div><h3>Vođenje društvenih mreža</h3><p>Plan sadržaja, vizuali, objave i upravljanje Facebook i Instagram profilima za profesionalan online nastup.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">07</div><h3>Video i foto sadržaj</h3><p>Ideje, snimanje i uređivanje sadržaja za oglase i društvene mreže koji jasno prikazuje vaš posao.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">08</div><h3>AI chatbotovi</h3><p>Pametni asistenti za postojeće web stranice koji mogu odgovarati na česta pitanja i usmjeravati korisnike prema upitu.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">09</div><h3>Izrada aplikacija</h3><p>Poslovne aplikacije, sustavi za online naručivanje i rezervacije termina prilagođeni vašem načinu rada.</p></article>
          <article class="service"><div class="service-number" aria-hidden="true">10</div><h3>Google Business profil</h3><p>Postavljanje i optimizacija Google profila radi kvalitetnijeg lokalnog nastupa i lakšeg kontakta s kupcima.</p></article>
        </div>
        <p class="mini-cta">Niste sigurni koja usluga vam treba? <a href="#kontakt">Opišite nam svoj cilj →</a></p>
      </div>
    </section>
  </main>
  <footer>
    <div class="container footer-inner">
      <strong>IstraAds<span style="color:#70adff">.</span></strong>
      <span>Digitalna rješenja za tvrtke u Istri.</span>
      <div class="footer-links"><a href="#kontakt">Kontakt</a><a href="/privatnost.html">Privatnost</a><a href="#usluge">Usluge</a></div>
    </div>
  </footer>
</div>
</template>

<style>
:root {
      color-scheme: light;
      --navy: #091b40;
      --navy2: #102d67;
      --blue: #2165f4;
      --blue-bright: #3d82ff;
      --ink: #0e2450;
      --muted: #60708a;
      --line: #dce6f5;
      --soft: #f4f7fd;
      --radius: 20px;
      font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-synthesis: none;
    }
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; color: var(--ink); background: #fff; -webkit-font-smoothing: antialiased; }
    button, input, select, textarea { font: inherit; }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; }
    :focus-visible { outline: 3px solid #7dc3ff; outline-offset: 3px; }
    .container { width: min(1120px, calc(100% - 40px)); margin-inline: auto; }
    .hero { position: relative; overflow: hidden; color: #fff; background: radial-gradient(ellipse at 89% 8%, rgba(29,111,245,.42), transparent 32%), radial-gradient(ellipse at 15% 65%, rgba(7,79,180,.28), transparent 40%), linear-gradient(125deg, #081939 4%, #0b285b 58%, #092047 100%); padding-bottom: 90px; isolation: isolate; }
    .hero::after { content:""; pointer-events:none; position:absolute; z-index:-1; inset:0; opacity:.25; background-image:linear-gradient(to right,rgba(220,238,255,.12) 1px,transparent 1px),linear-gradient(to bottom,rgba(220,238,255,.12) 1px,transparent 1px); background-size:80px 80px; mask-image:linear-gradient(to bottom,black,transparent 77%); }
    .topbar { display:flex; align-items:center; justify-content:space-between; padding-block:27px; }
    .brand { display:inline-flex; align-items:center; gap:10px; color:white; letter-spacing:-1.1px; font-size:25px; font-weight:850; }
    .brand-symbol { display:grid; place-items:center; width:37px; height:37px; border-radius:11px; background:linear-gradient(138deg,#65b9ff,#2471ff); color:white; font-size:22px; font-weight:900; box-shadow:0 8px 23px rgba(37,113,255,.28); }
    .nav-link { color:#d3e2ff; font-size:14px; font-weight:650; display:inline-flex; gap:8px; align-items:center; border:1px solid rgba(255,255,255,.23); border-radius:999px; padding:11px 18px; transition: background .2s ease; }
    .nav-link:hover { background:rgba(255,255,255,.10); }
    .lead { text-align:center; padding-top:65px; }
    .eyebrow { display:inline-flex; align-items:center; gap:9px; font-size:11px; font-weight:850; letter-spacing:2.4px; text-transform:uppercase; color:#b3d8ff; }
    .eyebrow-dot { width:7px;height:7px;border-radius:50%;background:#51b6ff;box-shadow:0 0 0 5px rgba(81,182,255,.14); }
    h1 { font-size:clamp(42px,6.1vw,79px); line-height:1.07; letter-spacing:-.055em; font-weight:840; max-width:990px; margin:23px auto 18px; text-wrap:balance; }
    h1 span { color:#83bbff; }
    .hero-sub { max-width:720px; margin:0 auto; color:#c9daf2; font-size:clamp(16px,1.7vw,19px); line-height:1.7; }
    .hero-sub strong { color:#fff; font-weight:650; }
    .form-wrap { max-width:800px; margin:48px auto 0; background:#fff; color:var(--ink); border-radius:23px; padding:32px; border:1px solid rgba(255,255,255,.6); box-shadow:0 32px 80px rgba(0,8,38,.26),0 0 0 1px rgba(255,255,255,.13); text-align:left; }
    .form-top { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:21px; }
    .form-top h2 { margin:0 0 7px; font-size:25px; line-height:1.2; letter-spacing:-.7px; }
    .form-top p { font-size:14px; margin:0; color:var(--muted); line-height:1.55; }
    .form-tag { flex:none; font-size:11px; font-weight:760; white-space:nowrap; padding:9px 12px; background:#e9f2ff; border:1px solid #d8e7ff; border-radius:100px; color:#1158cc; }
    .fields { display:grid; grid-template-columns:1fr 1fr; gap:17px; }
    .field { display:flex; flex-direction:column; gap:7px; }
    .field.full { grid-column:1/-1; }
    label { font-size:12.5px; font-weight:750; color:#294067; }
    label em { color:#2771ed; font-style:normal; }
    input, select, textarea { width:100%; min-width:0; border:1px solid #d7e2f2; background:#fbfcff; border-radius:10px; color:#102650; outline:none; padding:12px 13px; min-height:47px; font-size:14px; transition:border-color .2s,box-shadow .2s,background .2s; }
    input:focus,select:focus,textarea:focus { border-color:#357bf2; box-shadow:0 0 0 3px rgba(46,117,243,.12); background:white; }
    input::placeholder,textarea::placeholder { color:#91a0b5; }
    textarea { min-height:80px; resize:vertical; }
    .form-bottom { display:flex; align-items:center; justify-content:space-between; gap:17px; margin-top:18px; }
    .submit { border:0; background:linear-gradient(98deg,#2267f4,#1257d8); border-radius:11px; color:#fff; font-size:14px; font-weight:790; padding:15px 23px; min-height:49px; transition:transform .2s,box-shadow .2s; box-shadow:0 9px 22px rgba(26,94,235,.24); white-space:nowrap; }
    .submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 14px 29px rgba(26,94,235,.3); }
    .submit:disabled { opacity:.65;cursor:wait; }
    .fineprint { color:#79869b;font-size:11px;line-height:1.6;max-width:345px;margin:0; }
    .fineprint a { text-decoration:underline;text-underline-offset:2px; color:#3b67ae; }
    .status { min-height:19px; margin:13px 0 0; font-size:13px; font-weight:650; }
    .status.error { color:#bb263b; } .status.success { color:#14805f; }
    .trap { position:absolute !important;left:-9999px !important; width:1px !important;height:1px !important; opacity:0 !important; }
    .down { display:flex; align-items:center; justify-content:center; margin-top:33px; gap:8px; color:#bad4fa; font-size:12px; font-weight:650; letter-spacing:.03em; }
    .down svg { width:17px;height:17px; }
    .services { background:linear-gradient(180deg,#f8faff 0%,#ffffff 32%); padding:100px 0 105px; }
    .section-heading { text-align:center; max-width:730px; margin:0 auto 45px; }
    .section-kicker { font-size:11px; font-weight:850; color:#2163dd; text-transform:uppercase; letter-spacing:2.1px; }
    .section-heading h2 { margin:13px auto 15px; letter-spacing:-.045em; font-size:clamp(32px,4.1vw,51px); line-height:1.12; text-wrap:balance; }
    .section-heading p { font-size:16px; line-height:1.7; color:var(--muted); margin:0; }
    .service-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:17px; }
    .service { border:1px solid #e2e9f3; border-radius:17px; background:white; padding:27px 25px 25px; box-shadow:0 7px 19px rgba(25,69,120,.027); transition:transform .2s,border-color .2s,box-shadow .2s; }
    .service:hover { transform:translateY(-4px); border-color:#b8d1ff; box-shadow:0 16px 35px rgba(16,79,165,.09); }
    .service-number { width:40px;height:40px;display:grid;place-items:center; background:#eaf1ff; color:#2363e9; font-size:13px; font-weight:850; border-radius:11px; margin-bottom:22px; }
    .service h3 { font-size:18px; letter-spacing:-.5px; margin:0 0 10px; }
    .service p { font-size:14px; line-height:1.7; color:var(--muted); margin:0; }
    .mini-cta { margin:49px auto 0; text-align:center; color:var(--muted); font-size:14px; }
    .mini-cta a { color:#1760e9; font-weight:800; border-bottom:1px solid currentColor; padding-bottom:2px; }
    footer { background:#081b40; color:#c1d1ed; }
    .footer-inner { display:flex; justify-content:space-between; align-items:center; gap:20px; padding-block:24px; font-size:12px; }
    .footer-inner strong { color:#fff; font-size:17px; letter-spacing:-.5px; }
    .footer-links { display:flex;align-items:center;gap:24px; }
    .footer-links a:hover { color:#fff; }
    @media (max-width:780px) { .lead { padding-top:39px; } .hero { padding-bottom:63px; } .form-wrap { margin-top:35px; } .service-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .services { padding-block:75px; } }
    @media (max-width:550px) { .container { width:min(100% - 30px,1120px); } .topbar { padding-block:19px; }.brand {font-size:23px;} .nav-link { padding:9px 12px;font-size:12px;} .lead { padding-top:38px; } h1 { margin:17px 0 16px; } .hero-sub { font-size:15px; } .form-wrap { padding:22px 18px; margin-top:31px; border-radius:18px; } .form-top { flex-wrap:wrap; } .form-top h2 { font-size:23px; } .fields { grid-template-columns:1fr; gap:13px; } .field.full { grid-column:auto; } .form-bottom { flex-direction:column-reverse; align-items:stretch; gap:12px; } .fineprint { max-width:unset; } .submit { width:100%; } .service-grid { grid-template-columns:1fr; } .service { padding:25px 23px; } .services { padding-block:65px; }.footer-inner { flex-direction:column; text-align:center; } .footer-links { gap:18px; } }
    @media (prefers-reduced-motion:reduce) {html {scroll-behavior:auto;} *,*::before,*::after {transition:none !important; animation:none !important;} }

    /* Reset ograničenja širine koja može dodati postojeći Vite/Vue CSS. */
    html, body { width: 100%; }
    body { display: block; min-width: 320px; }
    #app { max-width: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; text-align: initial; }
    .istraads-landing { width: 100%; min-height: 100vh; background: white; }
    
    /* IstraAds samostalna landing stranica: zaštita od stilova starog projekta. */
    .istraads-landing .hero .lead,
    .istraads-landing .hero .form-wrap,
    .istraads-landing .hero .down {
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
      clip-path: none !important;
      animation: none !important;
    }
    .istraads-landing .hero .lead { display: block !important; }
    .istraads-landing .hero .form-wrap {
      display: block !important;
      background: #fff !important;
      color: #0e2450 !important;
    }
    .istraads-landing .hero .down { display: flex !important; }
    .istraads-landing .hero h1 { color: #fff !important; -webkit-text-fill-color: #fff !important; }
    .istraads-landing .hero h1 span { color: #83bbff !important; -webkit-text-fill-color: #83bbff !important; }
    .istraads-landing .hero .form-wrap h2,
    .istraads-landing .services .section-heading h2,
    .istraads-landing .services .service h3 {
      color: #0e2450 !important;
      -webkit-text-fill-color: #0e2450 !important;
    }

</style>
