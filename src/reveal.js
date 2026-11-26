// Animacija pojavljivanja pri skrolanju. Sadržaj je u HTML-u uvijek vidljiv (SEO, rad bez JS-a);
// skrivaju se samo elementi ispod ekrana, i to tek kada se ova funkcija pokrene.
// Funkcija mora ostati samostalna: prerender.js je ugrađuje u lokalne stranice.
export function reveal() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const observer = new IntersectionObserver((entries) => {
    let order = 0
    for (const { target, isIntersecting, boundingClientRect } of entries) {
      // Prikaži i elemente koje je korisnik preskočio (skok na sidro).
      if (!isIntersecting && boundingClientRect.top > 0) continue
      observer.unobserve(target)
      target.style.opacity = ''
      target.animate(
        [{ opacity: 0, transform: 'translateY(34px) scale(.97)' }, { opacity: 1, transform: 'none' }],
        { duration: 700, delay: Math.min(order++, 5) * 90, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }
      )
    }
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })

  for (const el of document.querySelectorAll('.services .section-heading, .service, .mini-cta, .prose > *')) {
    if (el.getBoundingClientRect().top < window.innerHeight) continue
    el.style.opacity = '0'
    observer.observe(el)
  }
}
