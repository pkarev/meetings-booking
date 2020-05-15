<style src="./component.scss" scoped></style>
<script src='./component.ts' lang="ts"></script>

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
                            <TimeSlot class="week-calendar__cell-slot"
                                :time-slot="timeSlot"
                                :is-booked="isBooked(day, room, timeSlot)"
                                :is-disabled="isDisabled(day)"
                                @click="onBookingClick(day, room, timeSlot)"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </template>
</div>
</template>
