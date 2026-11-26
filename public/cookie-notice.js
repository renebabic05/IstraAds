// Informativna obavijest o kolačićima. Stranica ne koristi kolačiće za analitiku ni oglašavanje.
// Ako se dodaju (npr. Google Analytics ili Meta Pixel), ova obavijest nije dovoljna:
// potrebna je privola PRIJE njihova učitavanja, uz jednako dostupno odbijanje.
(function () {
  var KEY = 'istraads-cookie-notice'
  try { if (localStorage.getItem(KEY)) return } catch (e) {}

  var style = document.createElement('style')
  style.textContent =
    '.cn{position:fixed;z-index:1000;left:16px;right:16px;bottom:16px;max-width:620px;margin:auto;display:flex;align-items:center;gap:18px;padding:18px 20px;border-radius:17px;background:#0a1d45;color:#d9e6fb;border:1px solid rgba(133,187,255,.35);box-shadow:0 20px 55px rgba(0,8,38,.45);font:13.5px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;text-align:left}' +
    '.cn p{margin:0;flex:1}.cn strong{display:block;color:#fff;font-size:15px}.cn a{color:#8fc4ff;text-decoration:underline}' +
    '.cn button{flex:none;border:0;border-radius:11px;padding:12px 24px;background:#2165f4;color:#fff;font:800 14px system-ui,sans-serif;cursor:pointer}' +
    '.cn button:focus-visible,.cn a:focus-visible{outline:3px solid #7dc3ff;outline-offset:3px}' +
    '@media (max-width:520px){.cn{flex-direction:column;align-items:stretch;gap:12px;left:10px;right:10px;bottom:10px}}'

  var box = document.createElement('aside')
  box.className = 'cn'
  box.setAttribute('aria-label', 'Obavijest o kolačićima')
  box.innerHTML =
    '<p><strong>Bez kolačića za praćenje</strong>Ne koristimo kolačiće za analitiku ni oglašavanje. U vašem pregledniku spremamo samo to da ste zatvorili ovu obavijest. <a href="/privatnost.html#kolacici">Saznajte više</a></p>' +
    '<button type="button">U redu</button>'
  box.querySelector('button').addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1') } catch (e) {}
    box.remove()
  })

  document.head.appendChild(style)
  document.body.appendChild(box)
})()
