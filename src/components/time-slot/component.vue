<template>
<button class="time-slot"
   @click="$emit('click')"
   :class="timeSlotClass"
   type="button"
   :disabled="isDisabled"
>
   {{ timeSlot }}
</button>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class TimeSlot extends Vue
{
   @Prop() timeSlot: string;
   @Prop({default: false}) isBooked: boolean;
   @Prop({default: false}) isDisabled: boolean;

   get timeSlotClass(): Dictionary<boolean>
   {
      return {
         'is-booked': this.isBooked,
         'is-disabled': this.isDisabled,
      }
   }
}
</script>

<style scoped lang="scss">
@import '../../mixins.scss';
@import '../../variables.scss';

.time-slot {
   @include button-reset;
   background: $background-color-gray;
   border-radius: $border-radius-s;
   padding: 2px 8px;
   display: inline-flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
   line-height: 20px;

   &::after {
      content: '';
      width: 16px;
      height: 16px;
      line-height: 16px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 4px;
      background: svg-load('../../svg/plus.svg', color=$color-primary) no-repeat center;
      background-size: 10px;
   }

   &.is-booked {
      background: $color-primary;
      color: white;
      &::after {
         background-image: svg-load('../../svg/trash.svg', color=white);
      }

      &.is-disabled {
         &::after {
            background-image: svg-load('../../svg/tick.svg', color=white);
         }
      }
   }

   &.is-disabled {
      cursor: not-allowed;
      opacity: .5;
   }

   @include hover-desktop {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
   }
}
</style>
