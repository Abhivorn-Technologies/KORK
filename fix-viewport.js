const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

walk('d:/krk/krk/app').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/viewport=\{\{\s*once:\s*true,\s*margin:\s*"-100px"\s*\}\}\s*(whileHover)/g, '$1');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed', file);
  }
});
