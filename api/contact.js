// Vercel Function. Potrebno je u Vercelu postaviti RESEND_API_KEY i
// CONTACT_FROM_EMAIL. Bez njih obrazac NE šalje poruke.
// Primatelji upita su određeni ovdje:
const CONTACT_TO = 'istraads@gmail.com';
const CONTACT_CC = 'renebabo299@gmail.com';
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});
const clean = (value) => typeof value === 'string' ? value.trim() : '';
const SERVICE_OPTIONS = new Set([
  'Snimanje i fotografiranje dronom', 'Izrada web stranice', 'SEO optimizacija', 'GEO optimizacija', 'Facebook i Instagram oglasi',
  'Google oglasi', 'Vođenje društvenih mreža', 'Video i foto sadržaj',
  'AI chatbot', 'Aplikacija / online rezervacije', 'Google Business profil',
  'Više usluga / Nisam siguran', 'Nisam siguran – predložite mi'
]);

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ error: 'Metoda nije podržana.' }, 405);
    if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Neispravan format zahtjeva.' }, 415);
    if (Number(request.headers.get('content-length') || 0) > 10000) return json({ error: 'Zahtjev je prevelik.' }, 413);

    let data;
    try {
      const body = await request.text();
      if (body.length > 10000) return json({ error: 'Zahtjev je prevelik.' }, 413);
      data = JSON.parse(body);
    } catch {
      return json({ error: 'Neispravan zahtjev.' }, 400);
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'Neispravni podaci.' }, 400);
    if (clean(data.website)) return json({ ok: true }); // skriveno polje protiv jednostavnih botova

    const name = clean(data.name);
    const email = clean(data.email);
    const phone = clean(data.phone);
    // Više usluga stiže kao polje; pojedinačno polje 'service' ostaje za stare otvorene stranice.
    const services = [...new Set((Array.isArray(data.services) ? data.services : [data.service]).map(clean))];
    const message = clean(data.message);
    if (!name || name.length > 100 || !email || email.length > 160 ||
        phone.length > 40 || message.length > 1500 ||
        !/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(email) ||
        !services.length || services.length > SERVICE_OPTIONS.size ||
        !services.every((s) => SERVICE_OPTIONS.has(s))) {
      return json({ error: 'Provjerite unesene podatke i pokušajte ponovno.' }, 400);
    }

    const key = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!key || !from) {
      return json({ error: 'Kontakt obrazac još nije konfiguriran. Pokušajte kasnije.' }, 503);
    }

    const body = `Novi upit putem istraads.com\n\nIme: ${name}\nE-mail: ${email}\nTelefon: ${phone || 'Nije naveden'}\nUsluge:\n${services.map((s) => `- ${s}`).join('\n')}\n\nPoruka:\n${message || 'Nije navedena'}`;
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [CONTACT_TO], cc: [CONTACT_CC], reply_to: email, subject: 'Novi upit s IstraAds web stranice', text: body })
      });
      if (!response.ok) {
        // Ne logirati sadržaj poruke ni API ključ.
        console.error('Slanje e-maila nije uspjelo; status:', response.status);
        return json({ error: 'Trenutno ne možemo poslati upit. Pokušajte ponovno kasnije.' }, 502);
      }
      return json({ ok: true });
    } catch {
      return json({ error: 'Trenutno ne možemo poslati upit. Pokušajte ponovno kasnije.' }, 502);
    }
  }
};
