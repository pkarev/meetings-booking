import {Vue, Component} from 'vue-property-decorator';
import {Config, config, MeetingRoom} from '../../config';
import {getIsoShortKey, monthNames} from '../../utils';
import DateToggler from '../date-toggler/component.vue';
import WeekCalendar from '../week-calendar/component.vue';

@Component({
    components: {DateToggler, WeekCalendar}
})
export default class App extends Vue
{
    week: Date[] = [
        new Date('2020-05-15'),
        new Date('2020-05-16'),
        new Date('2020-05-17'),
        new Date('2020-05-18'),
        new Date('2020-05-19'),
    ];

    config: Config = config;
    bookings: object = {};

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

    handleBookingClick(date: Date, room: MeetingRoom, timeSlot: string): void
    {
        const dateKey = getIsoShortKey(date);

        if (!this.bookings[dateKey]) {
            this.$set(this.bookings, dateKey, {
                [room.name]: {
                    [timeSlot]: true,
                }
            })

            return;
        }

        if (!this.bookings[dateKey][room.name]) {
            this.$set(this.bookings[dateKey], room.name, {
                [timeSlot]: true,
            })

            return;
        }

        if (!this.bookings[dateKey][room.name][timeSlot]) {
            this.$set(this.bookings[dateKey][room.name], timeSlot, true);

            return;
        }

        this.bookings[dateKey][room.name][timeSlot] = !this.bookings[dateKey][room.name][timeSlot];
    }
}
