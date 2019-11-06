# swipeable-calendar-strip-react-native

React Native library - Swipeable Calendar Strip 

<img src="images/libraryshow.gif" width="250"></img>

## Installation

Use npm package manager to install.

```bash
npm install swipeable-calendar-strip-react-native
```

## Props

|  Props | Description  | default  | required  |
|---|---|---|---|
|  heigth | set the height of the calendar  |  75 | false  |
|  dayPressed |  return day date format when day is pressed | --- | true |
|  showMonth | show or hide month data in header   | true  |  false |
| showYear  | show or hide year data in header  | true  | false  |
| activeDay  | set the active day, accepts Date/Moment date format  | ---  | false |
| startingDate  | set the starting Date  | moment()  | false |

## Usage

```javascript
import CalendarStrip from "swipeable-calendar-strip-react-native";
import moment from "moment";

const calendar = props => {
   return (
      <CalendarStrip 
        height={75} //height of the strip -- default 75
        dayPressed={(day) => console.log(day)} //executes when day is pressed -- required
        showMonth={true} //accepts boolean -- default = true
        showYear={true} //accepts boolean -- default = true
        startingDate={moment()} //accepts Date or moment date format -- default = moment()
        activeDay={moment().add(1, "days")} //accepts Date/Moment date format
      />
   )
}

export default calendar;
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
Licenced under MIT licence
