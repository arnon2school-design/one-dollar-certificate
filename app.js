const styleData = {
  explorer: { label: 'Brave Explorer', icon: '✦', words: ['COURAGE', 'DISCOVERY'] },
  magical: { label: 'Magical Hero', icon: '✧', words: ['KINDNESS', 'SPARKLE'] },
  celebration: { label: 'Colorful Celebration', icon: '★', words: ['JOY', 'CONFETTI'] },
};
const fields = ['name', 'age', 'achievement', 'message', 'date', 'presenter'];
const cert = document.getElementById('certificate');
const statusEl = document.getElementById('status');
document.getElementById('date').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function current() {
  const d = {};
  fields.forEach(id => d[id] = document.getElementById(id).value.trim());
  d.style = document.querySelector('input[name=style]:checked').value;
  return d;
}
function nameClass(n) {
  const l = n.length;
  return l > 34 ? 'xs' : l > 24 ? 'sm' : l > 16 ? 'md' : '';
}
function fitPreviewName() {
  const name = cert.querySelector('.child-name');
  if (!name) return;
  name.style.whiteSpace = 'nowrap';
  name.style.fontSize = '';
  const maxWidth = cert.querySelector('.inner').clientWidth * 0.92;
  let size = parseFloat(getComputedStyle(name).fontSize);
  while (name.scrollWidth > maxWidth && size > 16) {
    size -= 1;
    name.style.fontSize = `${size}px`;
  }
}
function render() {
  const d = current();
  const s = styleData[d.style];
  cert.className = `certificate ${d.style}`;
  cert.innerHTML = `<section class="cert"><div class="corner c1"></div><div class="corner c2"></div><div class="corner c3"></div><div class="corner c4"></div><div class="inner"><div class="top"><span>${s.words[0]}</span><span>${s.icon}</span><span>${s.words[1]}</span></div><h2>${s.label}</h2><p class="presented">This certificate is proudly presented to</p><h1 class="child-name ${nameClass(d.name)}">${esc(d.name) || 'Child Name'}</h1>${d.age ? `<p class="age">Age ${esc(d.age)}</p>` : ''}<p class="for">for</p><p class="achievement">${esc(d.achievement) || 'a wonderful achievement'}</p>${d.message ? `<p class="message">“${esc(d.message)}”</p>` : ''}<div class="footer"><div><b>${esc(d.date) || 'Date'}</b><span>Date</span></div><div class="seal">${s.icon}</div><div><b class="presenter-line">${esc(d.presenter) || 'With pride'}</b><span>Presented by</span></div></div></div></section>`;
  requestAnimationFrame(fitPreviewName);
}
function inlineComputedStyles(source, target) {
  const computed = getComputedStyle(source);
  target.setAttribute('style', Array.from(computed).map(prop => `${prop}:${computed.getPropertyValue(prop)};`).join(''));
  Array.from(source.children).forEach((child, index) => inlineComputedStyles(child, target.children[index]));
}
async function svgDataUrl() {
  fitPreviewName();
  const css = await fetch('styles.css').then(r => r.text()).catch(() => '');
  const clone = cert.cloneNode(true);
  inlineComputedStyles(cert, clone);
  const rect = cert.getBoundingClientRect();
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="3508" height="2480" viewBox="0 0 ${rect.width} ${rect.height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${css}</style>${new XMLSerializer().serializeToString(clone)}</div></foreignObject></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
}
function filename(ext) {
  const d = current();
  const base = (d.name || 'certificate').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'certificate';
  return `${base}-${d.style}.${ext}`;
}
async function downloadPng() {
  statusEl.textContent = 'Preparing PNG...';
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = 3508;
    c.height = 2480;
    const x = c.getContext('2d');
    x.fillStyle = '#fff';
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(img, 0, 0, c.width, c.height);
    const a = document.createElement('a');
    a.download = filename('png');
    a.href = c.toDataURL('image/png');
    a.click();
    statusEl.textContent = 'Ready';
  };
  img.src = await svgDataUrl();
}
function downloadPdf() {
  fitPreviewName();
  statusEl.textContent = 'Preparing PDF...';
  const w = window.open('', '_blank');
  w.document.write(`<!doctype html><title>${filename('pdf')}</title><link rel="stylesheet" href="styles.css"><style>@page{size:A4 landscape;margin:0}html,body{margin:0;width:297mm;height:210mm}.certificate{width:297mm!important;height:210mm!important;box-shadow:none!important}</style>${cert.outerHTML}<script>setTimeout(()=>print(),300)<\/script>`);
  w.document.close();
  statusEl.textContent = 'Ready';
}
fields.forEach(id => document.getElementById(id).addEventListener('input', render));
document.querySelectorAll('input[name=style]').forEach(r => r.addEventListener('change', render));
document.getElementById('png').addEventListener('click', downloadPng);
document.getElementById('pdf').addEventListener('click', downloadPdf);
render();
