<template>
  <Transition name="cookie">
    <div v-if="visible" class="cookie-banner">
      <p>
        Ova stranica koristi Google Fonts koji se učitavaju s Googleovih servera.
        Više informacija u našoj
        <button class="cookie-link" @click="$emit('openPrivatnost')">Politici privatnosti</button>.
      </p>
      <div class="cookie-actions">
        <button class="btn-cookie btn-cookie-accept" @click="accept">Prihvati</button>
        <button class="btn-cookie btn-cookie-decline" @click="decline">Odbij</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['openPrivatnost'])

const visible = ref(false)

onMounted(() => {
  if (!localStorage.getItem('cookie-consent')) {
    setTimeout(() => { visible.value = true }, 800)
  }
})

function accept() {
  localStorage.setItem('cookie-consent', 'accepted')
  visible.value = false
}

function decline() {
  localStorage.setItem('cookie-consent', 'declined')
  visible.value = false
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8000;
  background: var(--bg-card);
  border: 1px solid var(--border-hi);
  border-radius: 18px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 680px;
  width: calc(100% - 48px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
}

.cookie-banner p {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}

.cookie-link {
  background: none;
  border: none;
  padding: 0;
  color: var(--blue);
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  text-decoration: underline;
}

.cookie-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-cookie {
  border: none;
  border-radius: 10px;
  padding: 9px 18px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
}

.btn-cookie:hover { opacity: 0.85; }

.btn-cookie-accept {
  background: #fff;
  color: #05060f;
}

.btn-cookie-decline {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.cookie-enter-active,
.cookie-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}

@media (max-width: 560px) {
  .cookie-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    bottom: 16px;
  }
}
</style>