<script setup>
import { onMounted } from 'vue'
import { reveal } from './reveal.js'
import HeroSection from './components/home/HeroSection.vue'
import ServicesSection from './components/home/ServicesSection.vue'
import IstraSection from './components/home/IstraSection.vue'
import SiteFooter from './components/home/SiteFooter.vue'

onMounted(reveal)
</script>

<template>
  <div class="istraads-landing">
    <main>
      <HeroSection />
      <ServicesSection />
      <IstraSection />
    </main>
    <SiteFooter />
  </div>
</template>
