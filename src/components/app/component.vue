<style src="./component.scss" scoped></style>
<script src="./component.ts" lang="ts"></script>

<template>
    <div class="app">
        <div class="container">
            <h1 class="app__title">
                Бронирование переговорок
            </h1>
            <DateToggler class="app__date-toggler" :date="togglerDate"/>
            <WeekCalendar class="app__week-calendar"
                :config="config"
                :week="week"
                :bookings="bookings"
                @bookingClick="handleBookingClick"
            />
        </div>
    </div>
</template>
