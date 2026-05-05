<template>
  <section class="hero" id="top">
    <div class="container hero-inner">
      <div class="hero-grid">
        <div>
          <div class="pill">DIGITALNI MARKETING ZA POSLOVANJA U ISTRI</div>
          <h1>Vi vodite biznis.<span class="accent">Mi donosimo više upita, poziva i rezervacija.</span></h1>
          <p>IstraAds pomaže lokalnim biznisima u Istri da kroz web stranice, Meta oglase i digitalni marketing dođu do novih klijenata bez kompliciranja.</p>
          <div class="hero-actions">
            <a class="btn btn-white" href="#kontakt">Zatraži besplatnu analizu →</a>
            <a class="btn btn-ghost" href="#usluge">Pogledaj usluge →</a>
          </div>
          <div class="hero-mini">
            <div class="mini-feature">
              <div class="mini-icon">⌖</div>
              <div><strong>Lokalni stručnjaci</strong><span>Iz Istre, za Istru i lokalne biznise.</span></div>
            </div>
            <div class="mini-feature">
              <div class="mini-icon">▣</div>
              <div><strong>Transparentno izvještavanje</strong><span>Jasni rezultati, metrike i pregled rada.</span></div>
            </div>
            <div class="mini-feature">
              <div class="mini-icon">↗</div>
              <div><strong>Strategije koje donose rezultate</strong><span>Fokus na upite, pozive i stvarne klijente.</span></div>
            </div>
          </div>
        </div>

        <div class="dashboard-wrap">
          <div class="dashboard">
            <div class="dashboard-top">
              <h3>Pregled kampanja</h3>
              <div class="select">Zadnjih 30 dana ▾</div>
            </div>
            <div class="stats-grid">
              <div class="stat-card primary">
                <div class="stat-label">Ukupni upiti</div>
                <div class="stat-value">347</div>
                <div class="trend">+28%</div>
                <div class="chart"></div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Trošak po upitu</div>
                <div class="stat-value" style="color:#173052">2,18 €</div>
                <div class="trend">-18%</div>
                <div class="chart"></div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Prikazi oglasa</div>
                <div class="stat-value" style="color:#173052">98.4K</div>
                <div class="trend">+37%</div>
                <div class="chart"></div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Stopa konverzije</div>
                <div class="stat-value" style="color:#173052">7,32%</div>
                <div class="trend">+22%</div>
                <div class="chart"></div>
              </div>
            </div>
          </div>
          <div class="review">
            <div class="review-thumb">ISTRA</div>
            <div>
              <div class="stars">★★★★★</div>
              <p>Odlična suradnja, vidljivi rezultati i konstantan rast našeg poslovanja.</p>
              <strong>– Marina, Turistička agencija</strong>
            </div>
          </div>
        </div>
      </div>

      <ServicesSection />
    </div>
  </section>
</template>

<script setup>
import ServicesSection from './ServicesSection.vue'
</script>
