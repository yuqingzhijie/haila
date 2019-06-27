<template>
  <div>
    <your-component></your-component> <!--使用组件component-->
  </div>
</template>

<script>
import YourComponent from 'yourpath/YourComponent' // 引入组件component
export default {
  components: { // 声明组件component
    YourComponent
  },
  data () {
    return {}
  }
}
</script>
