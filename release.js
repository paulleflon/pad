const fs = require('fs');

const changelog = fs.readFileSync('CHANGELOG.MD', {encoding: 'utf-8'}).split('\n');

let notes = '# Pad\n';
let relevant = false;
for (const line of changelog) {
	if (relevant && line.startsWith('## ')) {
		relevant = false;
		break;
	}
	if (line.startsWith('## ') && !line.includes('Unreleased'))
		relevant = true;
	if (relevant)
		notes += `${line}\n`;
}
fs.writeFileSync('assets/release-notes.md', notes);