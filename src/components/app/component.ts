import {Vue, Component} from 'vue-property-decorator';
import {Config, config, MeetingRoom} from '../../config';
import {
    getCurrentWorkWeek,
    getIsoShortKey,
    getNextWorkWeek,
    getPrevWorkWeek,
    monthNames,
    getGenitiveMonthNameByNumber
} from '../../utils';
import DateToggler from '../date-toggler/component.vue';
import WeekCalendar from '../week-calendar/component.vue';

type Booking = {
    date: Date,
    room: MeetingRoom,
    timeSlot: string,
}

@Component({
    components: {DateToggler, WeekCalendar}
})
export default class App extends Vue
{
    isConfirmVisible: boolean = false;
    activeBooking: Booking = null;

    config: Config = config;
    week: Date[] = getCurrentWorkWeek(new Date());
    bookings: object = {};

    mounted(): void
    {
        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify(this.bookings));
        }

        this.bookings = JSON.parse(localStorage.getItem('bookings'));
    }

    requireUpdate(date: Date, room: MeetingRoom, timeSlot: string): void
    {
        this.isConfirmVisible = true;
        this.activeBooking = {
            date,
            room,
            timeSlot,
        }
    }

    confirmUpdate(): void
    {
        this.updateBookings(this.activeBooking.date, this.activeBooking.room, this.activeBooking.timeSlot);
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

        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }

    onPrevWeekChange(): void
    {
        this.week = getPrevWorkWeek(this.week);
    }

    onNextWeekChange(): void
    {
        this.week = getNextWorkWeek(this.week);
    }

    get togglerDate(): string
    {
        const monthBegin: number = this.week[0].getMonth();
        const monthEnd: number = this.week[this.week.length - 1].getMonth();

        let date: string = monthNames[monthBegin];

        if (monthEnd !== monthBegin) {
            date += ` - ${monthNames[monthEnd]}`;
        }

        date += ` - ${String(this.week[this.week.length - 1].getFullYear())}`;

        return date;
    }

    get confirmDate(): string
    {
        return this.activeBooking ?
            `${this.activeBooking.date.getDate()} ${getGenitiveMonthNameByNumber(this.activeBooking.date.getMonth()).toLowerCase()} ${this.activeBooking.timeSlot}` :
            null;
    }

    get confirmAction(): string
    {
        return this.activeBooking &&
               this.bookings[getIsoShortKey(this.activeBooking.date)] &&
               this.bookings[getIsoShortKey(this.activeBooking.date)][this.activeBooking.room.name] &&
               this.bookings[getIsoShortKey(this.activeBooking.date)][this.activeBooking.room.name][this.activeBooking.timeSlot] ?
                   `Отменить бронирование?` :
                   `Подтвердить бронирование?`;
    }
}
