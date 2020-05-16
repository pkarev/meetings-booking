import {Vue, Component} from 'vue-property-decorator';
import {Config, config, MeetingRoom} from '../../config';
import {getCurrentWorkWeek, getIsoShortKey, monthNames} from '../../utils';
import DateToggler from '../date-toggler/component.vue';
import WeekCalendar from '../week-calendar/component.vue';

@Component({
    components: {DateToggler, WeekCalendar}
})
export default class App extends Vue
{
    week: Date[] = getCurrentWorkWeek(new Date());

    config: Config = config;
    bookings: object = this.getBookings(this.week);

    getBookings(week: Date[]): object
    {
        const bookings = {};
        week.forEach((day: Date): void => {
            const dateKey = getIsoShortKey(day);
            const dateBookings = JSON.parse(localStorage.getItem(dateKey));
            bookings[dateKey] = dateBookings;
        });

        return bookings;
    }

    updateBookings(date: Date, room: MeetingRoom, timeSlot: string): void
    {
        const dateKey = getIsoShortKey(date);

        if (!this.bookings[dateKey]) {
            this.$set(this.bookings, dateKey, {
                [room.name]: {
                    [timeSlot]: true,
                }
            })
        } else if (!this.bookings[dateKey][room.name]) {
            this.$set(this.bookings[dateKey], room.name, {
                [timeSlot]: true,
            })
        } else if (!this.bookings[dateKey][room.name][timeSlot]) {
            this.$set(this.bookings[dateKey][room.name], timeSlot, true);
        } else {
            this.bookings[dateKey][room.name][timeSlot] = !this.bookings[dateKey][room.name][timeSlot];
        }

        localStorage.setItem(dateKey, JSON.stringify(this.bookings[dateKey]));
    }

    get togglerDate(): string
    {
        const monthBegin: number = this.week[0].getMonth();
        const monthEnd: number = this.week[this.week.length - 1].getMonth();

        let date: string = monthNames[monthBegin];

        if (monthEnd !== monthBegin) {
            date += `- ${monthNames[monthEnd]}`;
        }

        date += ` - ${String(this.week[this.week.length - 1].getFullYear())}`;

        return date;
    }
}
