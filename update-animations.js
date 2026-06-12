const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

function fixImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixImports(filePath);
    } else if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      const badImportPattern = /import \{\s*\n(import \{ fadeUpReveal[^\n]+\n)/;
      const match = content.match(badImportPattern);
      
      if (match) {
        // match[1] is the inserted import statement
        // remove it from where it is
        content = content.replace(match[1], '');
        // and insert it before the last import {
        // Actually, let's just insert it at the very top right after 'use client'; or at index 0 if no use client.
        const useClientMatch = content.match(/('use client';|"use client";)\s*\n/);
        if (useClientMatch) {
          const insertPos = useClientMatch.index + useClientMatch[0].length;
          content = content.slice(0, insertPos) + match[1] + content.slice(insertPos);
        } else {
          content = match[1] + content;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed syntax error in ${filePath}`);
      }
    }
  }
}

fixImports(directoryPath);
console.log('Finished fixing imports.');
