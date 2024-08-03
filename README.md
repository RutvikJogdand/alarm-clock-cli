# Alarm Clock CLI Application

This is a command-line interface (CLI) application for an alarm clock, implemented in JavaScript using Node.js. The application allows users to set alarms, delete alarms, snooze alarms, and display all active alarms.

## Features

- Display the current time.
- Create any number of alarms by specifying the alarm time and date.
- Snooze an alarm a maximum of 3 times at an interval of 5 minutes each.
- Delete an alarm.
- Display all active alarms.

## Prerequisites

- Node.js installed on your system.

## Installation

1. Clone the repository or download the code files.

2. Open your terminal and navigate to the directory containing the `index.js` file.

3. Install the required Node.js packages:

   ```bash
   npm install
   ```
### Usage:

1. Run the application using

    ```
    node index.js
    ```

2. Use the following commands to manage your alarms:

    1. Add a new alarm (please ensure that the below format is followed) :

    ```
    add <time of the alarm> on <date>
    ```

    Example:
    ```
    add 11:45 PM on 2nd August 2024
    ```

    2. Delete an existing alarm:

    ```
    delete <index of the alarm>
    ```

    Example:

    ```
    delete 0
    ```

    3. Snooze an alarm:

    ```
    snooze <index of the alarm>
    ```

    Example:

    ```
    snooze 0
    ```

    4. Show all alarms:

    ```
    show
    ```


3. When an alarm rings, you will see a message prompting you to either snooze or delete the alarm:

```
Alarm ringing! Time: <time>
Snooze or stop the alarm. Type 'snooze <index>' or 'delete <index>'
```


## Example usage:

```bash

$ node alarmClock.js
Alarm clock started. Type "add <time> on <date>", "delete <index>", "show" or "snooze <index>" to manage and view alarms.
Current time: <current time>

# Adding an alarm
$ add 11:45 PM on 2nd August 2024
Alarm set for 11:45:00 PM on 2nd August 2024

# Showing all alarms
$ show
all alarms , [ { time: 2024-08-02T23:45:00.000Z, snoozes: 0 } ]

# Snoozing an alarm
$ snooze 0
Alarm snoozed to <new time>

# Deleting an alarm
$ delete 0
Alarm at index 0 deleted

```

