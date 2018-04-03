<template>
  <div id="list" class="list">
    <haila-header></haila-header>
    <haila-search></haila-search>
    <haila-navbar></haila-navbar>
    <div class="haila-banner">
      <img src="./../../static/imgs/海拉.png">
    </div>
    <div class="haila-product">
      <div class="container">
        <div class="haila-list" id="baby">
          <div class="haila-list-header">
            <h2>{{category}}</h2>
          </div>
          <div class="haila-list-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in list" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">{{tip}}</p>
      <div slot="btnGroup">
        <a class="btn btn-left" href="javascript:;" @click="closeModal">继续购物</a>
        <a class="btn btn-right" href="javascript:;" @click="goCart">查看购物车</a>
      </div>
    </Modal>
    <haila-footer></haila-footer>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import './../assets/css/modal.css';
  import HailaHeader from './../components/header.vue';
  import HailaSearch from './../components/search.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaNavbar from './../components/navbar.vue';
  import Modal from './../components/modal.vue';
  import HailaProduct from './../components/HailaProduct.vue';
  import axios from 'axios';
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
        list: [],
        tip: "加入成功",
        modalConfirm: false
      }
    },
    components: {
      HailaHeader,
      HailaSearch,
      HailaFooter,
      HailaNavbar,
      Modal,
      HailaProduct
    },
    mounted() {
      this.getList();
    },
    watch: {
      '$route' () {
        this.getList();
      }
    },
    methods: {
      getList() {
        var category = this.$route.query.keyword;
        this.category = category;
        var param = {
          page: 1,
          pageSize: 16,
          sort: 1,
          category: category
        };
        axios.get("/product/category", {params: param}).then((res) => {
          var response = res.data;
          if (response.status == "0") {
            alert("对不起, 服务器维修中");
          }
          else {
            this.list = response.result;
            console.log(this.list[0])
          }
        });
      },
      showModal() {
        this.modalConfirm = true;
      },
      closeModal() {
        this.modalConfirm = false;
      },
      goCart() {
        this.$router.push('cart');
      }
    }
  }
</script>
