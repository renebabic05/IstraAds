<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box">
      <button class="modal-close" @click="$emit('close')" aria-label="Zatvori">✕</button>
      <h2>Uvjeti korištenja</h2>
      <p class="modal-date">Posljednja izmjena: lipanj 2026.</p>

      <div class="modal-body">
        <h3>1. Opće odredbe</h3>
        <p>
          Ovi Uvjeti korištenja uređuju pristup i korištenje web stranice IstraAds (<a href="https://istraads.com">istraads.com</a>),
          u vlasništvu Rene Babića. Korištenjem ove stranice prihvaćate sve navedene uvjete.
        </p>

        <h3>2. Usluge</h3>
        <p>
          IstraAds pruža usluge digitalnog marketinga, izrade web stranica i upravljanja online oglasima za poduzetnike i tvrtke.
          Detalji svake usluge, opseg i cijena dogovaraju se individualno putem kontakt forme ili izravnog dogovora.
        </p>

        <h3>3. Kontakt forma i upiti</h3>
        <p>
          Slanjem upita putem kontakt forme ne nastaje ugovorni odnos. Upit služi isključivo kao polazišna točka
          za daljnju komunikaciju i pripremu ponude. IstraAds zadržava pravo odbiti ili ne odgovoriti na bilo koji upit.
        </p>

        <h3>4. Intelektualno vlasništvo</h3>
        <p>
          Sav sadržaj na ovoj stranici (tekstovi, grafike, logotipovi, slike) vlasništvo je IstraAds-a ili se koristi
          uz odgovarajuće dozvole. Zabranjeno je kopiranje, redistribucija ili korištenje sadržaja bez pisanog odobrenja.
        </p>

        <h3>5. Ograničenje odgovornosti</h3>
        <p>
          IstraAds ne jamči određene poslovne rezultate kao ishod pruženih marketinških usluga. Rezultati ovise o
          nizu faktora izvan naše kontrole (tržište, sezona, konkurencija). Sve procjene i primjeri rezultata su
          ilustrativne naravi i temelje se na dosadašnjim iskustvima.
        </p>

        <h3>6. Poveznice na vanjske stranice</h3>
        <p>
          Ova stranica može sadržavati poveznice na vanjske web stranice. IstraAds nije odgovoran za sadržaj,
          točnost ni politiku privatnosti tih stranica.
        </p>

        <h3>7. Izmjene uvjeta</h3>
        <p>
          IstraAds zadržava pravo izmjene ovih Uvjeta u bilo kojem trenutku. Izmjene stupaju na snagu objavom
          na ovoj stranici. Nastavak korištenja stranice nakon izmjena smatra se prihvaćanjem novih uvjeta.
        </p>

        <h3>8. Mjerodavno pravo</h3>
        <p>
          Na ove Uvjete primjenjuje se pravo Republike Hrvatske. Za sve sporove nadležan je stvarno nadležni
          sud u Republici Hrvatskoj.
        </p>

        <h3>9. Kontakt</h3>
        <p>
          Za pitanja vezana uz ove Uvjete možete nas kontaktirati na:
          <a href="mailto:renebabo299@gmail.com">renebabo299@gmail.com</a>
        </p>
      </div>

      <button class="btn btn-white modal-btn" @click="$emit('close')">Zatvori</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(2, 3, 10, 0.88);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border-hi);
  border-radius: 26px;
  padding: 40px;
  max-width: 680px; width: 100%;
  max-height: 88vh; overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,.6);
}
.modal-close {
  position: absolute; top: 18px; right: 18px;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,.07);
  border: 1px solid var(--border);
  color: var(--text-soft); font-size: 18px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
.modal-close:hover { background: rgba(255,255,255,.13) }
.modal-box h2 {
  margin: 0 0 4px; font-size: 32px; color: var(--text); letter-spacing: -1px;
}
.modal-date {
  margin: 0 0 24px; font-size: 13px; color: var(--text-muted);
}
.modal-body h3 {
  margin: 22px 0 6px; font-size: 16px; color: var(--text); font-weight: 700;
}
.modal-body p {
  margin: 0; color: var(--text-muted); line-height: 1.75; font-size: 15px;
}
.modal-body a { color: var(--blue); }
.modal-btn {
  margin-top: 28px; border: none; cursor: pointer; font: inherit;
  padding: 13px 28px; border-radius: 14px; font-weight: 800;
}
</style>