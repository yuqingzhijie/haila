<template>
  <div id="list" class="list">
    <haila-header></haila-header>
    <haila-search></haila-search>
    <haila-navbar></haila-navbar>
    <div class="haila-introduction">
      <div class="container">
        <div class="haila-intro-content" id="baby">
          <h3>海拉, 谢谢您的光临 ^_^</h3>
        </div>
      </div>
    </div>
    <haila-footer></haila-footer>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import HailaHeader from './../components/header.vue';
  import HailaSearch from './../components/search.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaNavbar from './../components/navbar.vue';
  export default {
    data () {
      return {
        /************************************
        babyList            母婴儿童列表
        cosmeticList        美容彩妆列表
        dressList           服饰鞋包列表
        furnitureList       家居个护列表
        decorationList      手表配饰列表
        digitalList         数码家电列表
        foodList            环球美食列表
        sportList           运动户外列表
        *************************************/
        category: "",
        list: []
      }
    },
    components: {
      HailaHeader,
      HailaSearch,
      HailaFooter,
      HailaNavbar
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
