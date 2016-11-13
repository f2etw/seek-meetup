import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import createICS from './createIcs';

let getFiles = (dir, filterPattern = /./, _files = []) => {
  fs.readdirSync(dir, {encoding: 'utf-8'})
    .forEach((file) => {
      let name = path.join(dir, file);
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, filterPattern, _files);
      } else if (filterPattern.test(file)) {
        _files.push(name);
      }
    });
  return _files;
};

let allYamls = getFiles('events', /\.yaml$/);
let allIcss = getFiles('ics', /\.ics$/);

let oldYamls = allIcss.map((yaml) => yaml.replace(/^ics\/(.+?)\.ics$/, 'events/$1'));
let newYamls = allYamls.filter((yaml) => !oldYamls.includes(yaml));
let newFolders = [...new Set(newYamls.map(i => i.replace(/^events(.+\/).+/, 'ics$1')))];

newFolders.forEach((folder) => mkdirp.sync(folder));

newYamls.forEach((yaml) => createICS({ yaml }));
