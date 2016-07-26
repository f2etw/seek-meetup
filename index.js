import fs from 'fs';
import createICS from './createIcs';

var events = fs.readdirSync('events', {encoding: 'utf-8'});

events.forEach((item) => createICS({ item }));
