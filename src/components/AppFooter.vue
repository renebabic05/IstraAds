<template>
  <footer>
    <div class="footer-line">
      <div><strong>IstraAds</strong> · Digitalni marketing za lokalne biznise u Istri</div>
      <div>© 2026 IstraAds · Web, oglasi, SEO i društvene mreže</div>
      <div>
        <button class="footer-privacy-link" @click="$emit('openPrivatnost')">Politika privatnosti</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['openPrivatnost'])
</script>

<style scoped>
.footer-privacy-link {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  transition: color 0.2s;
}
.footer-privacy-link:hover {
  color: var(--text-soft);
}
</style>