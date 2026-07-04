const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '../..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, '.cos-config.json'), 'utf8'));
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

const words = [
  { folder: 'woof', word: 'woof' },
  { folder: 'job', word: 'job' },
  { folder: 'Good_job!', word: 'Good_job!' },
  { folder: 'dirty', word: 'dirty' },
];
const base = path.join(__dirname, 'Courseware/4GA/assets/images/words/Unit2');

function put(filePath, key) {
  return new Promise((resolve, reject) => {
    const size = fs.statSync(filePath).size;
    cos.putObject(
      { Bucket, Region, Key: key, Body: fs.createReadStream(filePath), ContentLength: size },
      (err, data) => (err ? reject(err) : resolve(data))
    );
  });
}

(async () => {
  for (const { folder, word } of words) {
    const dir = path.join(base, folder);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));
    for (const f of files) {
      const local = path.join(dir, f);
      const rel = `Primary/School_textbook/Courseware/4GA/assets/images/words/Unit2/${word}/${f}`;
      const key = cosPrefix + rel.replace(/\\/g, '/');
      process.stdout.write(`Uploading ${key} ... `);
      await put(local, key);
      console.log('OK');
    }
  }
  console.log('All 8 files uploaded.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
