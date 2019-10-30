import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import PropTypes from 'prop-types';

windowWidth = Dimensions.get('window').width;
windowHeight = Dimensions.get('window').height;

const getWeek = (date) => {
	const data = {
		start: moment(date).startOf('isoWeek'),
		end: moment(date).endOf('isoWeek')
	};
	let day = data.start;
	let days = [];
	while (day <= data.end) {
		days = [ ...days, day ];
		day = day.clone().add(1, 'days');
	}
	return days;
};

const getShowingMonths = (week) => {
	const firstDayMonth = moment(week[0]).format('MMMM');
	const lastDayMonth = moment(week[week.length - 1]).format('MMMM');

	if (firstDayMonth === lastDayMonth) {
		return firstDayMonth;
	}

	return firstDayMonth + '/' + lastDayMonth;
};

class Calendar extends Component {
	state = {
		weeks: {
			'-2': [],
			'-1': [],
			'0': [],
			'1': [],
			'2': []
		},
		activeDay: null,
		pages: [ '-1', '0', '1' ],
		key: 0,
		showingMonths: ''
	};

	static defaultProps = {
		startingDate: moment(),
		secondaryColor: 'steelblue',
		backgroundColor: '#fff'
	};

	componentDidMount() {
		this.props.onMount();
		const weeks = {
			'-2': getWeek(moment(this.props.startingDate).subtract(2, 'weeks')),
			'-1': getWeek(moment(this.props.startingDate).subtract(1, 'weeks')),
			'0': getWeek(moment(this.props.startingDate)),
			'1': getWeek(moment(this.props.startingDate).add(1, 'weeks')),
			'2': getWeek(moment(this.props.startingDate).add(2, 'weeks'))
		};

		this.setState({
			weeks: weeks,
			activeDay: moment(),
			showingMonths: getShowingMonths(weeks[this.state.pages[1]])
		});
	}

	dayPressedHandler = (day) => {
		this.props.dayPressed(day);
		this.setState({
			activeDay: day
		});
	};

	swiperScrollHandler = (index) => {
		this.props.calendarSwiped(index);
		if (index === 0) {
			const newPages = this.state.pages.map((e) => (parseInt(e) - 1).toString());
			const newKey = this.state.key + 1;
			let weeksObjKeys = Object.keys(this.state.weeks);
			const nextKey = Math.min(...weeksObjKeys) - 1;
			const deleteKey = Math.max(...weeksObjKeys);

			weeks = {
				...this.state.weeks,
				[nextKey]: getWeek(moment(this.state.weeks[this.state.pages[1]][3]).subtract(3, 'weeks'))
			};

			delete weeks[deleteKey];

			const newActiveDay = moment(this.state.activeDay).subtract(1, 'weeks');

			this.setState({
				key: newKey,
				pages: newPages,
				weeks: weeks,
				//activeDay: newActiveDay,
				showingMonths: getShowingMonths(weeks[newPages[1]])
			});
		} else if (index === 2) {
			const newPages = this.state.pages.map((e) => (parseInt(e) + 1).toString());
			const newKey = this.state.key + 1;
			let weeksObjKeys = Object.keys(this.state.weeks);
			const nextKey = Math.max(...weeksObjKeys) + 1;
			const deleteKey = Math.min(...weeksObjKeys);

			weeks = {
				...this.state.weeks,
				[nextKey]: getWeek(moment(this.state.weeks[this.state.pages[1]][3]).add(3, 'weeks'))
			};

			delete weeks[deleteKey];

			const newActiveDay = moment(this.state.activeDay).add(1, 'weeks');

			this.setState({
				key: newKey,
				pages: newPages,
				weeks: weeks,
				//activeDay: newActiveDay,
				showingMonths: getShowingMonths(weeks[newPages[1]])
			});
		}
	};

	render() {
		return (
			<View style={{ height: 100, marginTop: 25 }}>
				<ShowMonth showingMonths={this.state.showingMonths} />
				<Swiper
					key={this.state.key}
					onIndexChanged={this.swiperScrollHandler}
					showsPagination={false}
					loop={false}
					index={1}
				>
					{this.state.pages.map((page, index) => {
						return (
							<View key={index} style={{ flexDirection: 'row' }}>
								{this.state.weeks[page].map((day, index) => {
									return (
										<Day
											click={() => this.dayPressedHandler(day)}
											active={
												moment(day).format('MM-DD-YYYY') ===
												this.state.activeDay.format('MM-DD-YYYY')
											}
											key={index}
											dayNumber={moment(day).format('D')}
											dayInWeekName={moment(day).format('ddd')}
										/>
									);
								})}
							</View>
						);
					})}
				</Swiper>
			</View>
		);
	}
}

const Day = (props) => {
	return (
		<TouchableOpacity onPress={props.click} style={[ styles.Day, props.active ? styles.ActiveDay : null ]}>
			<Text style={{ color: 'steelblue', fontSize: 12 }}>{props.dayInWeekName}</Text>
			<Text style={{ fontSize: 15 }}>{props.dayNumber}</Text>
		</TouchableOpacity>
	);
};

const ShowMonth = (props) => {
	return (
		<View style={styles.MonthShowWrapper}>
			<Text style={styles.MonthText}>{props.showingMonths}</Text>
		</View>
	);
};

Calendar.propTypes = {
	startingDate: PropTypes.instanceOf(moment),

	dayPressed: PropTypes.func,
	calendarSwiped: PropsTypes.func,
	onMount: PropsTypes.func
};

const styles = StyleSheet.create({
	Day: {
		width: windowWidth / 7,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2,
		borderBottomColor: 'rgba(0, 0, 0, 0)'
	},
	ActiveDay: {
		borderBottomColor: 'steelblue'
	},
	MonthShowWrapper: {
		alignItems: 'center',
		paddingVertical: 5
	},
	MonthText: {
		fontSize: 12,
		color: 'rgba(0, 0, 0, .7)'
	}
});

export default Calendar;
