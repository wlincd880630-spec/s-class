const fs = require('fs');
const path = require('path');

const base = fs.readFileSync(path.join(__dirname, '../REFH/01/courseware/assets/js/shared.js'), 'utf8');
const i = base.indexOf('  let _pdfLibsPromise = null;');
const j = base.indexOf('  let _qrLibPromise = null;');
const block = base.slice(i, j);

for (const n of ['02', '03', '04', '05', '06', '07']) {
  const file = path.join(__dirname, `../REFH/${n}/courseware/assets/js/shared.js`);
  const c = fs.readFileSync(file, 'utf8');
  const c2 = c.replace(/  let _pdfLibsPromise = null;[\s\S]*?  let _qrLibPromise = null;/, block + '  let _qrLibPromise = null;');
  fs.writeFileSync(file, c2, 'utf8');
  console.log('patched', n);
}

for (const n of ['01', '02', '03', '04', '05', '06', '07']) {
  const file = path.join(__dirname, `../REFH/${n}/courseware/part2-reading.html`);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/shared\.js\?v=20260709e/g, 'shared.js?v=20260709f');
  fs.writeFileSync(file, html, 'utf8');
  console.log('bumped', n);
}
