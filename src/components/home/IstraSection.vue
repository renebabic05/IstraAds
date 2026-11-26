<script setup>
import FaqList from './FaqList.vue'
import { locations, croatia } from '../../data/locations.js'
</script>

<template>
  <section class="local" id="marketing-istra" aria-labelledby="istra-naslov">
    <div class="container">
      <div class="prose">
        <h2 id="istra-naslov">Marketing u Istri za lokalne tvrtke</h2>
        <p>IstraAds nudi digitalni marketing usmjeren na tvrtke u Istri: web stranice, SEO, GEO, Google i Meta oglase, društvene mreže i vizualni sadržaj za obrte, ugostitelje, iznajmljivače, OPG-ove i uslužne djelatnosti. Plan ovisi o tome gdje poslujete, tko su vaši kupci i je li posao sezonski.</p>
        <h2>Marketing po gradovima i mjestima Istre</h2>
        <ul class="area-list">
          <li v-for="place in locations" :key="place.slug"><a :href="'/' + place.slug">Marketing {{ place.name }}</a></li>
        </ul>
        <p>Poslujete izvan Istre? Pogledajte <a :href="'/' + croatia.slug">marketing u Hrvatskoj uz suradnju na daljinu</a>.</p>
        <FaqList />
      </div>
    </div>
  </section>
</template>
