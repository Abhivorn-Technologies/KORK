import fs from 'fs';
import path from 'path';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = getFiles('d:/krk/krk/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const newContent = content.replace(/<button\s([^>]*onClick=\{\(\) => setActiveFaq)/g, (match, p1) => {
    if (!p1.includes('suppressHydrationWarning')) {
      changed = true;
      return `<button suppressHydrationWarning ${p1}`;
    }
    return match;
  });

  const newContent2 = newContent.replace(/<button\s([^>]*onClick=\{\(\) => setActiveFaqQuestions)/g, (match, p1) => {
    if (!p1.includes('suppressHydrationWarning')) {
      changed = true;
      return `<button suppressHydrationWarning ${p1}`;
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, newContent2, 'utf8');
    console.log('Fixed:', file);
  }
});
