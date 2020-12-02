<template>
  <div id="app">
    {{a}}
    <button @click="location">地址</button>
    <button @click="chooseImage">图片</button>
    <HelloWorld msg="Welcome to Your Vue.js App 11"/>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'
import SDKHelper from '../../jssdk/index'

export default {
  name: 'app',
  data() {
    return {
      sdk:null,
      a: 'sss'
    }
  },
  components: {
    HelloWorld
  },
  watch: {
    a(oldVal, newVal) {
      console.log('oldVal, newVal==', oldVal, newVal)
    }
  },
  mounted() {
    this.a = 'sss1'
  },
  methods:{
    location() {
      this.sdk = SDKHelper()
      // this.sdk.getLocation().then(res => {
      //   console.log('res===', res)
      // })
    },
    chooseImage() {
      this.sdk = SDKHelper()
      this.sdk.chooseImage(9).then(res => {
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
