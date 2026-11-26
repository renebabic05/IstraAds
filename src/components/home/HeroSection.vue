<script setup>
import SiteHeader from './SiteHeader.vue'
import LeadForm from '../LeadForm.vue'
</script>

<template>
  <section class="hero" aria-labelledby="glavni-naslov">
    <div class="container">
      <SiteHeader />
      <div class="lead">
        <div class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span> Digitalna rješenja za Istru</div>
        <h1 id="glavni-naslov">Marketing Istra<br><span>Vaš sljedeći klijent počinje ovdje.</span></h1>
        <p class="hero-sub"><strong>Snimanje i fotografiranje dronom</strong>, web stranice, SEO i GEO optimizacija, Facebook i Instagram oglasi te digitalna rješenja za tvrtke u Istri. <strong>Recite nam svoj cilj.</strong></p>
      </div>
      <LeadForm />
      <a href="#usluge" class="down">Istražite što radimo <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m0 0 6-6m-6 6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    </div>
  </section>
</template>
