<script setup>
import { computed, nextTick, ref } from 'vue'

const UNSURE = 'Nisam siguran – predložite mi'
// Nazivi moraju odgovarati popisu SERVICE_OPTIONS u api/contact.js.
const options = [
  ['Izrada web stranice', 'M3 5h18v14H3zM3 9h18M7 7h.01'],
  ['SEO optimizacija', 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21'],
  ['GEO optimizacija', 'M12 3l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2zM19 16v5M16.5 18.5h5'],
  ['Google oglasi', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01'],
  ['Facebook i Instagram oglasi', 'M4 10v4h4l9 5V5l-9 5zM20 9v6M8 14l1 6h3'],
  ['Vođenje društvenih mreža', 'M4 5h16v11H9l-5 4zM8 9h8M8 12h5'],
  ['Video i foto sadržaj', 'M3 7h4l2-3h6l2 3h4v13H3zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z'],
  ['Snimanje i fotografiranje dronom', 'M9 9h6v6H9zM9 9 6 6M15 9l3-3M9 15l-3 3M15 15l3 3M3 6h6M15 6h6M3 18h6M15 18h6'],
  ['AI chatbot', 'M5 8h14v11H5zM12 8V4M9 13h.01M15 13h.01M9 16h6M2 12v3M22 12v3'],
  ['Aplikacija / online rezervacije', 'M4 6h16v15H4zM4 10h16M8 3v5M16 3v5M9 15l2 2 4-4'],
  ['Google Business profil', 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  [UNSURE, 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.700.4-1 .900-1 1.7M12 17h.01']
]

const selected = ref([])
const message = ref('')
const submitting = ref(false)
const sent = ref(false)
const errorMessage = ref('')
const serviceError = ref(false)
const successTitle = ref(null)

const count = computed(() => selected.value.filter((s) => s !== UNSURE).length)

// "Nisam siguran" isključuje ostale odabire i obrnuto.
function toggled(name, event) {
  serviceError.value = false
  if (!event.target.checked) return
  selected.value = name === UNSURE ? [UNSURE] : selected.value.filter((s) => s !== UNSURE)
}

async function submitForm(event) {
  const form = event.currentTarget
  errorMessage.value = ''
  if (!selected.value.length) {
    serviceError.value = true
    form.querySelector('input[name="services"]').focus()
    return
  }
  if (!form.reportValidity()) return

  const data = { ...Object.fromEntries(new FormData(form).entries()), services: [...selected.value] }
  submitting.value = true
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Slanje nije uspjelo. Pokušajte ponovno.')
    form.reset()
    selected.value = []
    message.value = ''
    sent.value = true
    await nextTick()
    successTitle.value?.focus()
  } catch (error) {
    errorMessage.value = error?.message || 'Došlo je do pogreške. Pokušajte ponovno.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="lf" id="kontakt">
    <div class="lf-card">
      <div class="lf-head">
        <div>
          <span class="lf-badge"><i aria-hidden="true"></i> Besplatno i bez obveze</span>
          <h2>Zatražite besplatnu analizu</h2>
          <p>Odaberite sve što vas zanima i javit ćemo vam se s prijedlogom sljedećeg koraka.</p>
        </div>
      </div>

      <div v-show="sent" class="lf-success" role="status">
        <div class="lf-success-icon" aria-hidden="true">✓</div>
        <h3 ref="successTitle" tabindex="-1">Hvala! Upit je uspješno poslan.</h3>
        <p>Javit ćemo vam se na navedene kontakt podatke.</p>
        <button type="button" class="lf-again" @click="sent = false">Pošalji novi upit</button>
      </div>

      <form v-show="!sent" id="lead-form" class="lf-body" novalidate @submit.prevent="submitForm">
        <fieldset class="lf-step" :class="{ 'has-error': serviceError }" :aria-describedby="serviceError ? 'lf-service-error' : undefined">
          <legend><span class="lf-num" aria-hidden="true">1</span> Što vas zanima? <em>*</em></legend>
          <div class="lf-hint">
            <span>Možete odabrati više usluga</span>
            <span class="lf-count" aria-live="polite">{{ count ? `Odabrano: ${count}` : '' }}</span>
          </div>
          <div class="lf-options">
            <label v-for="[name, icon] in options" :key="name" class="lf-option">
              <input v-model="selected" type="checkbox" name="services" :value="name" @change="toggled(name, $event)">
              <span class="lf-tile">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="icon" /></svg>
                <span class="lf-name">{{ name }}</span>
                <span class="lf-check" aria-hidden="true">✓</span>
              </span>
            </label>
          </div>
          <p v-show="serviceError" id="lf-service-error" class="lf-error" role="alert">Odaberite barem jednu uslugu.</p>
        </fieldset>

        <fieldset class="lf-step">
          <legend><span class="lf-num" aria-hidden="true">2</span> Vaši podaci</legend>
          <div class="lf-fields">
            <div class="lf-field"><label for="name">Ime i prezime <em>*</em></label><input id="name" name="name" type="text" autocomplete="name" placeholder="Vaše ime" required maxlength="100"></div>
            <div class="lf-field"><label for="email">E-mail adresa <em>*</em></label><input id="email" name="email" type="email" autocomplete="email" placeholder="ime@tvrtka.hr" required maxlength="160"></div>
            <div class="lf-field lf-full"><label for="phone">Broj telefona <small>opcionalno</small></label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+385 ..." maxlength="40"></div>
          </div>
        </fieldset>

        <fieldset class="lf-step">
          <legend><span class="lf-num" aria-hidden="true">3</span> Vaš cilj</legend>
          <div class="lf-field">
            <label for="message">Kratko opišite što vam treba <small>opcionalno</small></label>
            <textarea id="message" v-model="message" name="message" rows="4" maxlength="1500" placeholder="Primjer: trebam web stranicu i više upita od klijenata..."></textarea>
            <span class="lf-chars" aria-hidden="true">{{ message.length }} / 1500</span>
          </div>
        </fieldset>

        <div class="trap" aria-hidden="true"><label for="website">Ostavite prazno</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>

        <p v-show="errorMessage" class="lf-error lf-send-error" role="alert">{{ errorMessage }}</p>
        <button class="lf-submit" type="submit" :disabled="submitting">
          <span v-show="submitting" class="lf-spinner" aria-hidden="true"></span>
          <span>{{ submitting ? 'Slanje...' : 'Pošalji upit' }}</span>
          <span v-show="!submitting" aria-hidden="true">→</span>
        </button>
        <p class="lf-fine">Podatke koristimo samo za odgovor na vaš upit. Više u <a href="/privatnost.html">obavijesti o privatnosti</a>.</p>
      </form>
    </div>
  </div>
</template>
