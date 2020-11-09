<template>
  <img alt="Vue logo" src="@/assets/img/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'

@Options({
    components: {
        HelloWorld,
    },
})
export default class App extends Vue {}
</script>

<style lang="sass">
#app
    margin-top: 60px
    color: #2c3e50
    text-align: center
</style>
