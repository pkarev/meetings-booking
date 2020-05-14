<template>
<div class="date-toggler">
    <button class="date-toggler__control date-toggler__control_prev"
        type="button"
        title="Назад"
        @click="handlePrevClick"
    ></button>
    <span class="date-toggler__text">{{ date }}</span>
    <button class="date-toggler__control date-toggler__control_next"
        type="button"
        title="Вперед"
        @click="handleNextClick"
    ></button>
</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class DateToggler extends Vue
{
    @Prop() date: string;

    handlePrevClick(): void
    {
        this.$emit('prevClick');
    }

    handleNextClick(): void
    {
        this.$emit('nextClick');
    }
}
</script>

<style lang="scss" scoped>
@import '../../variables.scss';
@import '../../mixins.scss';

.date-toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px;
    border-radius: $border-radius;
    background: $background-color-gray-light;
}

.date-toggler__control {
    @include button-reset;

    width: 40px;
    height: 40px;
    padding: 12px;
    border-radius: $border-radius-s;

    background: svg-load('../../svg/arrow.svg', color=$color-black) no-repeat center;
    background-size: 16px;

    &_prev {
        transform: rotate(180deg);
    }
}

.date-toggler__text {
    color: $color-black;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
}
</style>
