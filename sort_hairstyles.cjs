const fs = require('fs');

const content = fs.readFileSync('src/data/hairstyles.js', 'utf8');

const startMarker = 'export const hairstyles = [';
const endMarker = ']\n\n// ─── Recommendation engine';
const prefix = content.split(startMarker)[0] + startMarker + '\n';
const suffixIndex = content.indexOf(endMarker);
const suffix = content.substring(suffixIndex);

const arrayContent = content.substring(content.indexOf(startMarker) + startMarker.length, suffixIndex);

// Use a simple parser to split objects
let objects = [];
let depth = 0;
let current = '';

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];
  if (char === '{') {
    if (depth === 0) current = '';
    depth++;
  }
  
  if (depth > 0) {
    current += char;
  }
  
  if (char === '}') {
    depth--;
    if (depth === 0) {
      objects.push(current);
      current = '';
    }
  }
}

// Extract names and remove "The "
const items = objects.map(obj => {
  const nameMatch = obj.match(/name:\s*"([^"]+)"/);
  let rawName = nameMatch ? nameMatch[1] : '';
  let newText = obj;
  
  if (rawName.startsWith('The ')) {
    rawName = rawName.substring(4);
    newText = obj.replace(/name:\s*"The ([^"]+)"/, 'name: "$1"');
  }
  
  return { text: newText, rawName };
});

items.sort((a, b) => a.rawName.localeCompare(b.rawName));

const newArrayContent = items.map(item => '  ' + item.text + ',').join('\n');
fs.writeFileSync('src/data/hairstyles.js', prefix + newArrayContent + '\n' + suffix);
console.log('Removed "The " and sorted hairstyles.js successfully');
