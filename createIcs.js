import fs from 'fs';
import YAML from 'yamljs';
import icalToolkit from 'ical-toolkit';

export default function (opt) {
  var defaultData = {
    calname: 'F2ETW 好聚好善! Seek Meetups',
    title: '',
    start: new Date().toJSON(),
    end: new Date().toJSON(),
    location: '',
    url: '',
    info: '',
    org: {
      name: '',
      url: ''
    }
  };

  var eventData = Object.assign(defaultData, YAML.load(`${__dirname}/events/${opt.item}`));

  // Create a builder
  var builder = icalToolkit.createIcsFileBuilder();

  /*
   * Settings (All Default values shown below. It is optional to specify)
   * */
  builder.spacers = true; // Add space in ICS file, better human reading. Default: true
  builder.NEWLINE_CHAR = '\r\n'; // Newline char to use.
  builder.throwError = false; // If true throws errors, else returns error when you do .toString() to generate the file contents.
  builder.ignoreTZIDMismatch = true; // If TZID is invalid, ignore or not to ignore!

  /**
   * Build ICS
   * */

  // Name of calander 'X-WR-CALNAME' tag.
  builder.calname = eventData.calname;

  // Cal timezone 'X-WR-TIMEZONE' tag. Optional. We recommend it to be same as tzid.
  builder.timezone = 'Asia/Taipei';

  // Time Zone ID. This will automatically add VTIMEZONE info.
  builder.tzid = 'Asia/Taipei';

  // Method
  builder.method = 'REQUEST';

  var eventConfig = (function () {
    var timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // s
    var confObj = {
      // Event start time, Required: type Date()
      start: new Date(+new Date(eventData.start) + timezoneOffset),

      // Event end time, Required: type Date()
      end: new Date(+new Date(eventData.end) + timezoneOffset),

      // transp. Will add TRANSP:OPAQUE to block calendar.
      transp: 'OPAQUE',

      // Event summary, Required: type String
      summary: eventData.title,

      // Location of event, optional.
      location: eventData.location,

      // Optional description of event.
      description: eventData.url + '\n' + eventData.info,

      // What to do on addition
      method: 'PUBLISH',

      // Status of event
      status: 'CONFIRMED',

      // Url for event on core application, Optional.
      url: eventData.url
    };

    if (eventData.repeating) {
      confObj.repeating = eventData.repeating;
    }

    // Optional if repeating event
    // repeating: {
    //   freq: 'WEEKLY',
    //   count: 2,
    //   interval: 1
    // },

    // // Optional if all day event
    // allDay: true,

    // // Creation timestamp, Optional.
    // stamp: new Date(),

    // // Optional, floating time.
    // floating: false,

    return confObj;
  })();

  // Add events
  builder.events.push(eventConfig);

  // Optional tags on VCALENDAR level if you intent to add. Optional field
  // builder.additionalTags = {
  //   'SOMETAG': 'SOME VALUE'
  // };

  // Try to build
  var icsFileContent = builder.toString();

  // Check if there was an error (Only required if yu configured to return error, else error will be thrown.)
  if (icsFileContent instanceof Error) {
    console.log('Returned Error, you can also configure to throw errors!');
    // handle error
  } else {
    fs.writeFile(`ics/${opt.item}.ics`, icsFileContent);
  }

  // Here isteh ics file content.
  // console.log(icsFileContent);
}
