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
          <p>Poma?emo tvrtkama u Istri da do?u do klijenata uz izradu web stranica, SEO i digitalno ogla?avanje. Od prve web stranice do oglasa, automatizacija i novih upita. Odaberite jednu uslugu ili kombinaciju koja odgovara vašim ciljevima.</p>
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
