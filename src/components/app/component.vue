<template>
<div class="app">
  <div class="container">
    <h1 class="app__title">
      Бронирование переговорок
    </h1>
    <DateToggler class="app__date-toggler" :date="togglerDate"/>
    <WeekCalendar class="app__week-calendar" :week="week" :config="config"/>
  </div>
</div>

</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Config, config} from '../../config';
import {monthNames} from '../../utils';
import DateToggler from '../date-toggler/component.vue';
import WeekCalendar from '../week-calendar/component.vue';

@Component({
  components: {DateToggler, WeekCalendar}
})
export default class App extends Vue
{
  week: Date[] = [
    new Date('2020-05-11'),
    new Date('2020-05-12'),
    new Date('2020-05-13'),
    new Date('2020-05-14'),
    new Date('2020-05-15'),
  ];

  config: Config = config;

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
</script>

<style lang="scss">
@import '../../mixins';

.app {
  padding-top: 24px;
  padding-bottom: 24px;

  @include tablet {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  @include desktop {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}

.app__week-calendar {
  margin-top: 10px;

  @include tablet {
    margin-top: 20px;
  }

  @include desktop {
    margin-top: 20px;
  }
}
</style>
