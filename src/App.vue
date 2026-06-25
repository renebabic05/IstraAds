<template>
  <AppHeader />
  <HeroSection />
  <main class="container">
    <Divider />
    <AboutSection class="reveal" id="o-nama" />
    <Divider />
    <AudienceSection class="reveal" id="za-koga" />
    <Divider />
    <ResultsSection class="reveal" id="rezultati" />
    <Divider />
    <TimelineSection class="reveal" id="zasto" />
    <Divider />
    <CompareSection class="reveal" />
    <Divider />
    <PackagesSection class="reveal" id="paketi" />
    <Divider />
    <FaqSection class="reveal" id="faq" />
    <Divider />
    <ContactSection class="reveal" @openPrivatnost="showPrivatnost = true" />
  </main>

  <AppFooter
    @openPrivatnost="showPrivatnost = true"
    @openImpressum="showImpressum = true"
    @openUvjeti="showUvjeti = true"
  />

  <CookieBanner @openPrivatnost="showPrivatnost = true" />

  <PrivatnostModal v-if="showPrivatnost" @close="showPrivatnost = false" />
  <ImpressumModal v-if="showImpressum" @close="showImpressum = false" />
  <UvjetiModal v-if="showUvjeti" @close="showUvjeti = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import AudienceSection from './components/AudienceSection.vue'
import ResultsSection from './components/ResultsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import CompareSection from './components/CompareSection.vue'
import PackagesSection from './components/PackagesSection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import Divider from './components/Divider.vue'
import PrivatnostModal from './components/PrivatnostModal.vue'
import ImpressumModal from './components/ImpressumModal.vue'
import UvjetiModal from './components/UvjetiModal.vue'
import CookieBanner from './components/CookieBanner.vue'

const showPrivatnost = ref(false)
const showImpressum = ref(false)
const showUvjeti = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('revealed')
        observer.unobserve(target)
      }
    })
  }, { threshold: 0.07 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>