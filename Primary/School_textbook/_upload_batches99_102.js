const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '../..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, '.cos-config.json'), 'utf8'));
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

const items = [
  { unit: 'Unit2', folder: 'woof' },
  { unit: 'Unit2', folder: 'job' },
  { unit: 'Unit2', folder: 'Good_job!' },
  { unit: 'Unit2', folder: 'dirty' },
  { unit: 'Unit2', folder: 'desk' },
  { unit: 'Unit2', folder: 'wall' },
  { unit: 'Unit2', folder: 'again' },
  { unit: 'Unit2', folder: 'also' },
  { unit: 'Unit2', folder: 'sunshine' },
  { unit: 'Unit2', folder: 'sometimes' },
  { unit: 'Unit2', folder: 'feel' },
  { unit: 'Unit2', folder: 'tired' },
  { unit: 'Unit2', folder: 'helpful' },
  { unit: 'Unit2', folder: 'warm' },
  { unit: 'Unit3', folder: 'weather' },
  { unit: 'Unit3', folder: 'sunny' },
];

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
  let count = 0;
  for (const { unit, folder } of items) {
    const dir = path.join(__dirname, 'Courseware/4GA/assets/images/words', unit, folder);
    if (!fs.existsSync(dir)) {
      console.error('Missing:', dir);
      process.exit(1);
    }
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));
    for (const f of files) {
      const local = path.join(dir, f);
      const rel = `Primary/School_textbook/Courseware/4GA/assets/images/words/${unit}/${folder}/${f}`;
      const key = cosPrefix + rel.replace(/\\/g, '/');
      process.stdout.write(`Uploading ${key} ... `);
      await put(local, key);
      console.log('OK');
      count++;
    }
  }
  console.log(`All ${count} files uploaded.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
