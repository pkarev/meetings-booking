import {Vue, Component, Prop} from 'vue-property-decorator';
import {Config, MeetingRoom} from '../../config';
import {getDayNameByNumber, getIsoShortKey, isToday} from '../../utils';
import TimeSlot from '../time-slot/component.vue';

@Component({
    components: {TimeSlot}
})
export default class WeekCalendar extends Vue
{
    @Prop() week: Date[];
    @Prop() config: Config;
    @Prop() bookings: object;

    dayNumber(date: Date): number
    {
        return date.getDate();
    }

    dayName(date: Date): string
    {
        return getDayNameByNumber(date.getDay());
    }

    firstRoomClass(index: number): Dictionary<boolean>
    {
        return {
            'is-first-room': index === 0
        }
    }

    lastRoomClass(index: number, arr: any[]): Dictionary<boolean>
    {
        return {
            'is-last-room': index === arr.length - 1,
        }
    }

    firstDayClass(index: number): Dictionary<boolean>
    {
        return {
            'is-first-day': index === 0
        }
    }

    todayClass(date: Date): Dictionary<boolean>
    {
        return {
            'is-today': isToday(date),
        }
    }

    isBooked(date: Date, room: MeetingRoom, timeSlot: string): boolean
    {
        const dateKey = getIsoShortKey(date);

        return this.bookings[dateKey] &&
               this.bookings[dateKey][room.name] &&
               !!this.bookings[dateKey][room.name][timeSlot];
    }

    isDisabled(date: Date): boolean
    {
        return getIsoShortKey(date) < getIsoShortKey(new Date());
    }

    onBookingClick(date: Date, room: MeetingRoom, timeSlot: string): void
    {
        this.$emit('bookingClick', date, room, timeSlot);
    }
}
