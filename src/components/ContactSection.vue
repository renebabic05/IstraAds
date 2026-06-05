<template>
  <section class="contact-card" id="kontakt">
    <div class="contact-grid">
      <div>
        <span class="eyebrow" style="background:rgba(255,255,255,.16); color:#fff">SPREMNI ZA RAST?</span>
        <h2>Zatraži besplatnu analizu</h2>
        <p>Ispuni kratku formu i pošalji nam osnovne informacije o svom biznisu. Javit ćemo ti se s prijedlogom kako poboljšati web, oglase i online nastup.</p>

        <form class="contact-form" action="https://formsubmit.co/renebabo299@gmail.com" method="POST" @submit="handleSubmit">
          <input type="hidden" name="_subject" value="Novi upit s IstraAds stranice">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_next" value="https://istraads.com/hvala">

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
            <option value="Basic - 350€ / mj">Basic - 350€ / mj</option>
            <option value="Pro - 500€ / mj">Pro - 500€ / mj</option>
            <option value="Premium - 900€ / mj">Premium - 900€ / mj</option>
            <option value="Personalizirana ponuda">Personalizirana ponuda</option>
          </select>

          <textarea name="poruka" placeholder="Napiši ukratko što ti treba: web stranica, oglasi, društvene mreže, više upita..." required></textarea>

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

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const COOLDOWN = 60 // seconds

const isBlocked = ref(false)
const countdown = ref(COOLDOWN)
const emailError = ref('') 
let timer = null

const buttonLabel = computed(() => {
  if (isBlocked.value) return `Pričekaj ${countdown.value}s...`
  return 'Pošalji upit →'
})

function handleSubmit(e) {
  if (isBlocked.value) return

  const emailInput = e.target.querySelector('[name="email"]')
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(emailInput.value)) {
    e.preventDefault()
    emailInput.focus()
    emailError.value = 'Unesite ispravnu email adresu (npr. ime@gmail.com).'
    return
  }

  emailError.value = ''
  isBlocked.value = true
  countdown.value = COOLDOWN
  localStorage.setItem('formSubmittedAt', Date.now().toString())

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isBlocked.value = false
      localStorage.removeItem('formSubmittedAt')
    }
  }, 1000)
}

// Restore cooldown if user refreshes during cooldown window
const savedAt = localStorage.getItem('formSubmittedAt')
if (savedAt) {
  const elapsed = Math.floor((Date.now() - parseInt(savedAt)) / 1000)
  const remaining = COOLDOWN - elapsed
  if (remaining > 0) {
    isBlocked.value = true
    countdown.value = remaining
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        isBlocked.value = false
        localStorage.removeItem('formSubmittedAt')
      }
    }, 1000)
  } else {
    localStorage.removeItem('formSubmittedAt')
  }
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.rate-limit-msg {
  color: #ffdddd;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>