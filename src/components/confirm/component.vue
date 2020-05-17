<template>
<div class="confirm" v-if="visible">
    <div class="confirm__content">
        <slot>
            {{ text }}
        </slot>
        <div class="confirm__actions">
            <button class="button button_theme_gray confirm__action" type="button" @click="onCancel">Нет</button>
            <button class="button button_theme_main confirm__action" type="button" @click="onConfirm">Да</button>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {Vue, Component, Model, Prop} from 'vue-property-decorator';

@Component
export default class Confirm extends Vue
{
    @Model('visible-change') visible: boolean;

    @Prop() text: string;

    toggleModal(): void
    {
        this.$emit('visible-change', false);
    }

    onConfirm(): void
    {
        this.toggleModal()
        this.$emit('confirm');
    }

    onCancel(): void
    {
        this.toggleModal();
        this.$emit('cancel');
    }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
@import '../../mixins';

.confirm {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 26, 0.4);
    overflow: scroll;
}

.confirm__content {
    max-width: 100vw;
    width: 400px;
    background: white;
    border-radius: $border-radius;
    padding: 36px 20px 20px;

}

.confirm__actions {
    display: flex;
    align-items: center;
    margin-top: 38px;
}

.confirm__action {
    margin-left: 16px;
    flex-grow: 1;

    &:first-child {
        margin-left: 0;
    }
}
</style>
