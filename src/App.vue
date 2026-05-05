<template>
  <AppHeader />
  <HeroSection />
  <main class="container">
    <Divider />
    <AboutSection class="reveal" />
    <Divider />
    <AudienceSection class="reveal" />
    <Divider />
    <ResultsSection class="reveal" />
    <Divider />
    <TimelineSection class="reveal" />
    <Divider />
    <CompareSection class="reveal" />
    <Divider />
    <PackagesSection class="reveal" />
    <Divider />
    <FaqSection class="reveal" />
    <Divider />
    <ContactSection class="reveal" />
    <AppFooter />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
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
