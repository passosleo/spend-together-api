import fs from 'fs-extra';
import packageJson from './package.json';

fs.mkdirpSync('dist/prisma');
fs.copySync('prisma', 'dist/prisma');
fs.copySync('Dockerfile', 'dist/Dockerfile');

packageJson.scripts.start = 'node src/app/server.js';

fs.writeFileSync('dist/package.json', JSON.stringify(packageJson));
