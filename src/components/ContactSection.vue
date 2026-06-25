<template>
  <section class="section-card" id="kontakt">
    <div class="contact-grid">
      <div>
        <span class="eyebrow" style="background:rgba(255,255,255,.16); color:#fff">SPREMNI ZA RAST?</span>
        <h2>Zatraži besplatnu analizu</h2>
        <p>Ispuni kratku formu i pošalji nam osnovne informacije o svom biznisu. Javit ćemo ti se s prijedlogom kako poboljšati web, oglase i online nastup.</p>

        <form class="contact-form" action="https://formsubmit.co/renebabo299@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="Novi upit s IstraAds stranice">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_next" value="https://istraads.com/">

          <input type="text" name="ime" placeholder="Ime i prezime" required>
          <input type="text" name="biznis" placeholder="Naziv biznisa" required>
          <input type="email" name="email" placeholder="Email adresa" required>
          <p v-if="emailError" class="field-error">{{ emailError }}</p>
          <input type="tel" name="telefon" placeholder="Broj mobitela / WhatsApp">

          <div class="checkbox-group">
            <label><input type="checkbox" name="ciljevi[]" value="Želim više upita"> Želim više upita</label>
            <label><input type="checkbox" name="ciljevi[]" value="Želim bolju web stranicu"> Želim bolju web stranicu</label>
            <label><input type="checkbox" name="ciljevi[]" value="Želim oglase"> Želim oglase</label>
            <label><input type="checkbox" name="ciljevi[]" value="Želim društvene mreže"> Želim društvene mreže</label>
            <label><input type="checkbox" name="ciljevi[]" value="Želim Google vidljivost"> Želim Google vidljivost</label>
            <label><input type="checkbox" name="ciljevi[]" value="Nisam siguran, trebam savjet"> Nisam siguran, trebam savjet</label>
          </div>

          <select name="paket">
            <option value="">Koji paket te zanima?</option>
            <option value="Basic">Basic (na upit)</option>
            <option value="Pro">Pro (na upit)</option>
            <option value="Premium">Premium (na upit)</option>
            <option value="Personalizirana ponuda">Personalizirana ponuda</option>
          </select>

          <textarea name="poruka" placeholder="Napiši ukratko što ti treba: web stranica, oglasi, društvene mreže, više upita..." required></textarea>

          <div class="gdpr-consent">
            <label>
              <input type="checkbox" name="gdpr" required>
              <span class="gdpr-box"></span>
              <span>Slanjem ovog upita prihvaćam <a href="/privatnost" target="_blank">Politiku privatnosti</a> i dajem pristanak za obradu mojih osobnih podataka u svrhu odgovora na upit.</span>
            </label>
          </div>

          <button
            class="btn btn-white form-submit"
            type="submit"
            :disabled="isBlocked"
          >
            {{ buttonLabel }}
          </button>

          <p v-if="isBlocked" class="rate-limit-msg">
            Upit je poslan. Možeš ponovo pokušati za {{ countdown }}s.
          </p>
        </form>

        <div class="form-note">Nakon prvog slanja FormSubmit može tražiti potvrdu email adrese. To je normalno i radi se samo jednom.</div>
      </div>

      <div class="contact-box">
        <strong>Kontakt i društvene mreže</strong>
        <a href="https://www.instagram.com/istraads/" target="_blank" rel="noopener">Instagram: instagram.com/istraads</a>
        <a href="https://www.facebook.com/istraads" target="_blank" rel="noopener">Facebook: facebook.com/istraads</a>
        <a href="#paketi">Pogledaj pakete i odaberi što ti najviše odgovara.</a>

        <div class="contact-actions">
          <a class="btn btn-ghost" href="https://www.instagram.com/istraads/" target="_blank" rel="noopener">Instagram</a>
          <a class="btn btn-ghost" href="https://www.facebook.com/istraads" target="_blank" rel="noopener">Facebook</a>
        </div>
      </div>
    </div>
  </section>
</template>
