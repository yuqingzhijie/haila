<template>
  <div id="home" class="home">
    <haila-header></haila-header>
    <haila-search></haila-search>
    <haila-navbar></haila-navbar>
    <div class="haila-banner">
      <img src="./../../static/imgs/海拉.png">
    </div>
    <div class="haila-product">
      <div class="container">
        <div class="haila-baby" id="baby">
          <div class="haila-baby-header">
            <h2>母婴儿童</h2>
          </div>
          <div class="haila-baby-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in babyList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-cosmetic" id="cosmetic">
          <div class="haila-cosmetic-header">
            <h2>美容彩妆</h2>
          </div>
          <div class="haila-cosmetic-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in cosmeticList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-dress" id="dress">
          <div class="haila-dress-header">
            <h2>服饰鞋包</h2>
          </div>
          <div class="haila-dress-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in dressList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-furniture" id="furniture">
          <div class="haila-furniture-header">
            <h2>家居个护</h2>
          </div>
          <div class="haila-furniture-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in furnitureList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-decoration" id="decoration">
          <div class="haila-decoration-header">
            <h2>手表配饰</h2>
          </div>
          <div class="haila-decoration-content">
            <ul class="haila-product-list">
              <!-- <li class="haila-product-item" v-for="item in decorationList">
                <img v-bind:src="'./../../static/imgs/'+item.place+'.png'" class="product-country"> -->
                <!-- <a href="/">
                  <img v-bind:src="'./../../'+item.picture" class="product-pic">
                </a> -->
                <!-- <router-link v-bind:to="{path:'product',query:{'productId':item._id}}">
                  <img v-bind:src="'./../../'+item.picture" class="product-pic">
                </router-link>
                <div class="product-info">
                  <span class="product-name">{{item.title}}</span>
                  <div class="product-box">
                    <div class="product-price-box">
                      <span class="product-price-title">价格</span>
                      <span class="product-price-now">￥{{item.priceNow}}</span>
                      <span class="product-price-old">￥{{item.priceOld}}</span>
                    </div>
                    <a href="javascript:void(0)" class="btn-add-dart product-add-cart" @click="addCart(item._id)">加入购物车</a>
                  </div>
                </div>
              </li> -->
              <haila-product v-for="item in decorationList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-digital" id="digital">
          <div class="haila-digital-header">
            <h2>数码家电</h2>
          </div>
          <div class="haila-digital-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in digitalList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-food" id="food">
          <div class="haila-food-header">
            <h2>环球美食</h2>
          </div>
          <div class="haila-food-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in foodList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
        <div class="haila-sport" id="sport">
          <div class="haila-sport-header">
            <h2>户外运动</h2>
          </div>
          <div class="haila-sport-content">
            <ul class="haila-product-list">
              <haila-product v-for="item in sportList" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
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
        babyList: [],
        cosmeticList: [],
        dressList: [],
        furnitureList: [],
        decorationList: [],
        digitalList: [],
        foodList: [],
        sportList: [],
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
      this.getHomeList();
    },
    methods: {
      getHomeList() {
        var param = {
          page: 1,
          pageSize: 8,
          sort: 1,
          typeList: ['母婴儿童', '美容彩妆', '服饰鞋包', '家居个护', '手表配饰', '数码家电', '环球美食', '运动户外']
        }
        axios.get("/product/home", {params: param}).then((res) => {
          var response = res.data;
          if (response.status == "0") {
            alert("对不起, 服务器维修中");
          }
          else {
            this.babyList = response.result['母婴儿童'];
            this.cosmeticList = response.result['美容彩妆'];
            this.dressList = response.result['服饰鞋包'];
            this.furnitureList = response.result['家居个护'];
            this.decorationList = response.result['手表配饰'];
            this.digitalList = response.result['数码家电'];
            this.foodList = response.result['环球美食'];
            this.sportList = response.result['运动户外'];
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
