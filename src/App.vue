<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<template>
  <div>
    页面内容
  </div>
</template>

<script>
  import css / vue / 第三方依赖;

  export default {
    data () {
      return { 数据 }   //被用来渲染页面
    },
    components: { HailaHeader, },
    mounted() { this.getList(); },
    watch: { '$route' (val) { this.getList(); } },
    methods: {
      getList() {
        axios.get(URL, 参数).then((res) => { 业务处理 });
        this.$router.push('cart');
      }
    },
    filters: {
      tofixed(value) { return value.toFixed(4) * 100 + '%'; }
    },
    computed:{
      checkAllFlag(){ }
    },
  }
</script>

