<style src="./component.scss" scoped></style>
<script src="./component.ts" lang="ts"></script>

<template>
    <div class="app">
        <div class="container">
            <h1 class="app__title">
                Бронирование переговорок
            </h1>
            <DateToggler
                class="app__date-toggler"
                :date="togglerDate"
                @prevClick="onPrevWeekChange"
                @nextClick="onNextWeekChange"
            />
            <WeekCalendar class="app__week-calendar"
                :config="config"
                :week="week"
                :bookings="bookings"
                @bookingClick="requireUpdate"
            />
        </div>
        <Confirm v-model="isConfirmVisible" @confirm="confirmUpdate">
            <span class="app__confirm-date">
                {{ confirmDate }}
            </span>
            <span class="app__confirm-action">
                {{ confirmAction }}
            </span>
        </Confirm>
    </div>
</template>
