<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-box">
        <button class="modal-close" @click="$emit('close')" aria-label="Zatvori">✕</button>

        <h2>Politika privatnosti</h2>
        <p class="modal-updated">Zadnja izmjena: lipanj 2026.</p>

        <h3>1. Voditelj obrade podataka</h3>
        <p>IstraAds, Istra, Hrvatska<br>
        Email: <a href="mailto:renebabo299@gmail.com">renebabo299@gmail.com</a></p>

        <h3>2. Koje podatke prikupljamo</h3>
        <p>Putem kontakt forme prikupljamo: ime i prezime, naziv biznisa, email adresu, broj mobitela (opcionalno) te sadržaj vašeg upita.</p>

        <h3>3. Svrha i pravna osnova obrade</h3>
        <p>Podatke koristimo isključivo za odgovor na vaš upit i eventualni poslovni razgovor. Pravna osnova je vaš izričiti pristanak (čl. 6 st. 1 lit. a GDPR).</p>

        <h3>4. Dijeljenje podataka</h3>
        <p>Vaše podatke ne prodajemo niti ih dijelimo s trećim stranama, osim s pružateljem usluge slanja emaila (FormSubmit) koji je neophodan za primitak vašeg upita.</p>

        <h3>5. Čuvanje podataka</h3>
        <p>Podatke čuvamo onoliko dugo koliko je potrebno za odgovor na upit, a najdulje 12 mjeseci, nakon čega ih brišemo.</p>

        <h3>6. Vaša prava</h3>
        <p>Imate pravo na pristup, ispravak, brisanje i prenosivost svojih podataka, kao i pravo na prigovor i povlačenje pristanka u bilo kojem trenutku. Zahtjev možete poslati na gore navedenu email adresu.</p>

        <h3>7. Pritužba nadzornom tijelu</h3>
        <p>Imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136, 10000 Zagreb, <a href="https://azop.hr" target="_blank" rel="noopener">azop.hr</a>.</p>

        <button class="btn btn-primary modal-btn-close" @click="$emit('close')">Zatvori</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 30, 0.85);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  background: linear-gradient(135deg, #0b1f52, #0e2a6a);
  border: 1px solid rgba(91, 138, 255, 0.25);
  border-radius: 24px;
  padding: 40px;
  max-width: 620px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  color: #f0e6d2;
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(240, 230, 210, 0.5);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
  transition: color 0.2s;
}
.modal-close:hover { color: #f0e6d2; }

h2 {
  font-size: 28px;
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.modal-updated {
  font-size: 13px;
  color: rgba(240, 230, 210, 0.45);
  margin: 0 0 28px;
}

h3 {
  font-size: 15px;
  font-weight: 700;
  color: #5b8aff;
  margin: 22px 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

p {
  font-size: 14.5px;
  line-height: 1.7;
  color: rgba(240, 230, 210, 0.8);
  margin: 0;
}

a {
  color: #5b8aff;
  text-decoration: underline;
}

.modal-btn-close {
  margin-top: 28px;
  background: linear-gradient(135deg, #5b8aff, #3d6eea);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}
.modal-btn-close:hover { opacity: 0.85; }
</style>