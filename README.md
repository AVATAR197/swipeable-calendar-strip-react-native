# swipeable-calendar-strip-react-native

React Native library - Swipeable Calendar Strip 

# WARNINIG - I advise you to not use the library, It has not been maintained for over two years. (I am planning to update the package with the already coded new version which uses react reanimated under the hood, so maybe in upcoming months it will be replaced). For now, I advise you to use your custom solution.

<img src="images/libraryshow.gif" width="250"></img>

## Installation

Use npm package manager to install.

```bash
npm install swipeable-calendar-strip-react-native
```

## Props

|  Props | Description  | Type  | Default  |
|---|---|---|---|
|  heigth | set the height of the calendar  |  number | 75  |
|  dayPressed |  return day date format when day is pressed | function | --- |
|  showMonth | show or hide month data in header   | bool  |  true |
| showYear  | show or hide year data in header  | bool  | true  |
| activeDay  | set the active day, accepts Date/Moment date format  | funtion  | --- |
| startingDate  | set the starting Date  | moment() date format  | moment() |
| onMount  | fire funtion when calendar is mounted  | function | --- |
| calendarSwiped  | exectutes when calendar is swiped, give one parameter (number) 0=left 2=right  | funtion  | --- |

## Style
| Prop | Description | Type | Default |
| ---|---|---|---|
| style | Style the Parrent component | Any | --- |
| headerStyle | Style the header, this is necessary for padding of calendar header component | Any | --- |
| headerText | Style color of fontSize of the header text | Any | --- |
| dateNameStyle | Style for the name of the day in calendar strip | Any | --- |
| dateNumberStyle | Style for the number of the day in calendar strip | Any | --- |
| activeDayBorderColor | Set the color/width of the ActiveDayBorder | String | 'steelblue' |


## Usage

```javascript
import CalendarStrip from "swipeable-calendar-strip-react-native";
import moment from "moment";

const calendar = props => {
   return (
      <CalendarStrip 
        height={75} //height of the strip -- default 75
        dayPressed={(day) => console.log(day)} //executes when day is pressed
        showMonth={true} //accepts boolean -- default = true
        showYear={true} //accepts boolean -- default = true
        startingDate={moment()} //accepts Date or moment date format -- default = moment()
        activeDay={moment().add(1, "days")} //accepts Date/Moment date format
        onMount={() => console.log("calendar did mount")}
        calendarSwiped={(direction) => direction == 0 ? console.log("calendar swiped to left") : console.log("calendar swiped to right")}
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
