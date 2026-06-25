<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box">
      <button class="modal-close" @click="$emit('close')" aria-label="Zatvori">✕</button>
      <h2>Impressum</h2>

      <div class="modal-body">
        <h3>Naziv obrta</h3>
        <p>IstraAds</p>

        <h3>Vlasnik</h3>
        <p>Rene Babić</p>

        <h3>Adresa</h3>
        <p>Istra, Hrvatska</p>

        <h3>Email</h3>
        <p><a href="mailto:renebabo299@gmail.com">renebabo299@gmail.com</a></p>

        <h3>Djelatnost</h3>
        <p>Digitalni marketing, izrada web stranica, upravljanje oglasima i društvenim mrežama za lokalne biznise.</p>

        <h3>Odgovornost za sadržaj</h3>
        <p>Sadržaj ove web stranice izrađen je s dužnom pažnjom. Ipak, ne preuzimamo odgovornost za točnost, potpunost ili aktualnost objavljenih informacija.</p>

        <h3>Autorska prava</h3>
        <p>Sav sadržaj ove stranice (tekstovi, slike, dizajn) zaštićen je autorskim pravima. Svaka upotreba bez izričitog pisanog odobrenja zabranjena je.</p>
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
  margin: 0 0 24px; font-size: 32px; color: var(--text); letter-spacing: -1px;
}
.modal-body h3 {
  margin: 20px 0 5px; font-size: 14px; color: var(--text-muted);
  font-weight: 700; text-transform: uppercase; letter-spacing: .5px;
}
.modal-body p {
  margin: 0; color: var(--text); line-height: 1.75; font-size: 15px;
}
.modal-body a { color: var(--blue); }
.modal-btn {
  margin-top: 28px; border: none; cursor: pointer; font: inherit;
  padding: 13px 28px; border-radius: 14px; font-weight: 800;
}
</style>