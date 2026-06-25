<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box">
      <button class="modal-close" @click="$emit('close')" aria-label="Zatvori">✕</button>
      <h2>Politika privatnosti</h2>
      <p class="modal-date">Posljednja izmjena: lipanj 2026.</p>

      <div class="modal-body">
        <h3>1. Rukovalac podacima</h3>
        <p>
          IstraAds, vlasnik Rene Babić, obrt registriran u Republici Hrvatskoj.<br>
          Email: <a href="mailto:renebabo299@gmail.com">renebabo299@gmail.com</a>
        </p>

        <h3>2. Koje podatke prikupljamo</h3>
        <p>Putem kontakt forme prikupljamo: ime i prezime, naziv biznisa, email adresu, broj telefona i sadržaj poruke koje nam dobrovoljno šaljete.</p>

        <h3>3. Svrha obrade</h3>
        <p>Vaše podatke koristimo isključivo za odgovor na vaš upit i uspostavljanje poslovne suradnje. Podatke ne prodajemo niti dijelimo s trećim stranama, osim s pružateljem usluge za dostavu emaila (FormSubmit).</p>

        <h3>4. Kolačići (cookies)</h3>
        <p>Ova stranica koristi Google Fonts koji se učitavaju s Googleovih servera. Time Google može pohraniti tehničke kolačiće. Stranica ne koristi vlastite kolačiće za praćenje, analitiku niti oglašavanje.</p>

        <h3>5. Vaša prava</h3>
        <p>Imate pravo na pristup, ispravak, brisanje i prenosivost svojih osobnih podataka, kao i pravo na prigovor obradi. Za ostvarivanje prava kontaktirajte nas na email naveden gore.</p>

        <h3>6. Pohrana podataka</h3>
        <p>Podatke čuvamo onoliko dugo koliko je potrebno za obradu upita, a najdulje 2 godine od posljednjeg kontakta.</p>

        <h3>7. Kontakt za zaštitu podataka</h3>
        <p>Za sva pitanja vezana uz privatnost možete nas kontaktirati na: <a href="mailto:renebabo299@gmail.com">renebabo299@gmail.com</a></p>
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