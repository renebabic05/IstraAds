<template>
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="#" @click.prevent="$emit('openPrivatnost')">Politika privatnosti</a>
        <span class="footer-dot">·</span>
        <a href="#" @click.prevent="$emit('openImpressum')">Impressum</a>
        <span class="footer-dot">·</span>
        <a href="#" @click.prevent="$emit('openUvjeti')">Uvjeti korištenja</a>
      </div>
      <div class="footer-line">
        <div><strong>IstraAds</strong> · Digitalni marketing za lokalne biznise u Istri</div>
        <div>© 2026 IstraAds · Web, oglasi, SEO i društvene mreže</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['openPrivatnost', 'openImpressum', 'openUvjeti'])
</script>

<style scoped>
.footer-links {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 13px;
  padding-top: 26px;
  margin-bottom: 4px;
}
.footer-links a {
  color: var(--text-muted);
  font-weight: 600;
  transition: color .2s;
}
.footer-links a:hover {
  color: var(--text-soft);
}
.footer-dot {
  color: var(--border);
}
</style>