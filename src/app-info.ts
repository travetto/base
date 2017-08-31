import * as fs from 'fs';

let pkg = JSON.parse(fs.readFileSync(process.cwd() + '/package.json').toString());

export const AppInfo = {
  VERSION: pkg.version,
  NAME: pkg.name,
  SIMPLE_NAME: pkg.name.replace(/[@]/g, '').replace(/[\/]/g, '_'),
  LICENSE: pkg.license,
  AUTHOR: pkg.author,
  DESCRIPTION: pkg.description,
  DEV_MODE: !!(process.env.DEV || !process.env.PROD)
};