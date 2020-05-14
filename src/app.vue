<template>
<h1>
  Hello, {{name}}!
</h1>
</template>

<script lang="ts">
import Vue from "vue";

export default class App extends Vue
{
  name: string = 'Meetings booking'
}
</script>

<style lang="scss">
h1 {
  margin: 0;
}
</style>
