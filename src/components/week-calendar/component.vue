<style src="./component.scss" scoped></style>

<template>
<div class="week-calendar">
    <div class="week-calendar__day" :class="todayClass(day)"
        v-for="day in week"
    >
        <span class="week-calendar__day-number">
            {{ dayNumber(day) }}
        </span>
        <span class="week-calendar__day-name">
            {{ dayName(day) }}
        </span>
    </div>
    <template v-for="(room, roomIndex) in config.rooms">
        <div class="week-calendar__room" :class="firstRoomClass(roomIndex)">
            <span class="week-calendar__room-name">{{ room.name }}</span>
            <span class="week-calendar__room-capacity">до {{ room.capacity }} персон</span>
        </div>
        <template v-for="(day, dayIndex) in week">
            <div class="week-calendar__cell" :class="[firstRoomClass(roomIndex), firstDayClass(dayIndex)]">
                <div class="week-calendar__cell-room">
                    <span class="week-calendar__room-name">{{ room.name }}</span>
                    <span class="week-calendar__room-capacity">до {{ room.capacity }} персон</span>
                </div>
                <div class="week-calendar__cell-inner" :class="[firstRoomClass(roomIndex), lastRoomClass(roomIndex, config.rooms), todayClass(day)]">
                    <div class="week-calendar__cell-day">
                        <span class="week-calendar__cell-day-number">{{ dayNumber(day) }}</span>
                        <span class="week-calendar__cell-day-name">{{ dayName(day) }}</span>
                    </div>
                    <ul class="week-calendar__cell-slots-list">
                        <li class="week-calendar__cell-slots-item" v-for="timeSlot in config.timeSlots">
                            <TimeSlot class="week-calendar__cell-slot" :time-slot="timeSlot"/>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </template>
    <div class="week-calentar"></div>
</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {Config} from '../../config';
import {getDayNameByNumber, isToday} from '../../utils';
import TimeSlot from '../time-slot/component.vue';

@Component({
    components: {TimeSlot}
})
export default class WeekCalendar extends Vue
{
    @Prop() week: Date[];
    @Prop() config: Config;

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
}
</script>
