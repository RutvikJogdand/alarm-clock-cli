const readline = require("readline");
const { EventEmitter } = require("events");

class AlarmClock extends EventEmitter {
  constructor() {
    super();
    this.alarms = [];
  }

  start() {
    setInterval(() => {
      //   this.displayCurrentTime();
      this.checkAlarms();
    }, 1000);
  }

  displayCurrentTime() {
    const now = new Date();
    console.log(`Current time: ${now.toLocaleString()}`);
  }

  parseDateString(dateString) {
    const ordinalToNumber = (str) => str.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const [time, datePart] = dateString.split(" on ");
    const [day, month, year] = datePart.split(" ");

    const numericDay = ordinalToNumber(day);
    const fullDateString = `${month} ${numericDay}, ${year} ${time}`;

    return new Date(fullDateString);
  }

  addAlarm(alarmInput) {
    const alarmDate = this.parseDateString(alarmInput);
    if (isNaN(alarmDate.getTime())) {
      console.log("Invalid date format");
      return;
    }
    this.alarms.push({ time: alarmDate, snoozes: 0 });
    console.log(`Alarm set for ${alarmDate.toLocaleString()}`);
  }

  deleteAlarm(index) {
    if (index < this.alarms.length) {
      this.alarms.splice(index, 1);
      console.log(`Alarm at index ${index} deleted`);
    } else {
      console.log(`No alarm found at index ${index}`);
    }
  }

  snoozeAlarm(index) {
    if (index < this.alarms.length) {
      let alarm = this.alarms[index];
      if (alarm.snoozes < 3) {
        alarm.time.setMinutes(alarm.time.getMinutes() + 5);
        alarm.snoozes += 1;
        console.log(`Alarm snoozed to ${alarm.time.toLocaleString()}`);
      } else {
        console.log("Maximum snoozes reached");
      }
    } else {
      console.log(`No alarm found at index ${index}`);
    }
  }

  showAlarms() {
    console.log("all alarms ,", this.alarms);
  }

  checkAlarms() {
    const now = new Date();

    this.alarms.forEach((alarm, index) => {
      if (now >= alarm.time) {
        console.log(`Alarm ringing! Time: ${alarm.time.toLocaleString()}`);
        this.emit("alarm", index);
      }
    });
  }
}

const alarmClock = new AlarmClock();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const [command, ...args] = input.split(" ");

  switch (command) {
    case "add":
      const alarmInput = args.join(" ");
      alarmClock.addAlarm(alarmInput);
      break;
    case "delete":
      const deleteIndex = parseInt(args[0], 10);
      alarmClock.deleteAlarm(deleteIndex);
      break;
    case "show":
      alarmClock.showAlarms();
      break;
    case "snooze":
      const snoozeIndex = parseInt(args[0], 10);
      alarmClock.snoozeAlarm(snoozeIndex);
      break;
    default:
      console.log("Unknown command");
  }
});

alarmClock.on("alarm", (index) => {
  console.log(
    `Snooze or stop the alarm. Type 'snooze ${index}' or 'delete ${index}'`
  );
});

alarmClock.start();
console.log(
  'Alarm clock started. Type "add <time> on <date>", "delete <index>", "show" or "snooze <index>" to manage and view alarms.'
);
