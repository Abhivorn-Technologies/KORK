const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
let content = fs.readFileSync(envPath, 'utf8');

// Match the FIREBASE_PRIVATE_KEY variable block (handling double quotes and multiline contents)
const regex = /FIREBASE_PRIVATE_KEY="([\s\S]*?)"/;
const match = content.match(regex);

if (match) {
  const rawKey = match[1];
  // Remove actual newlines, join them with literal \n sequence
  const cleanKey = rawKey
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\\n');
  
  content = content.replace(regex, `FIREBASE_PRIVATE_KEY="${cleanKey}"`);
  fs.writeFileSync(envPath, content, 'utf8');
  console.log('Successfully formatted FIREBASE_PRIVATE_KEY onto a single line in .env.local!');
} else {
  console.log('FIREBASE_PRIVATE_KEY not found in .env.local');
}
