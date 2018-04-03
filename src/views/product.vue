<template>
  <div>
    <haila-header></haila-header>
    <haila-search></haila-search>
    <haila-navbar></haila-navbar>
    <haila-branch>
      <span>商品信息</span>
    </haila-branch>
    <div class="haila-product">
      <div class="container">
        <div class="haila-product-detail" v-if="productIsFind">
          <div class="product-detail-preview">
            <img :src="'./../../'+product.picture">
          </div>
          <div class="product-detail-info">
            <div class="product-brand">
              <!-- <img src="./images/丹麦.png"> -->
              <span class="country-name">{{product.place}}</span>
              <span>|</span>
              <span class="brand-name-en">{{product.brandEn}}</span>
              <span class="brand-name-ch">{{product.brandCn}}</span>
            </div>
            <div class="product-title">
              <h3>{{product.title}}</h3>
            </div>
            <div class="product-introduction">
              <p>{{product.summary}}</p>
            </div>
            <div class="product-price">
              <div class="product-price-now">
                <span>售价</span>
                <span class="key">￥{{product.priceNow}}</span>
              </div>
              <div class="product-price-old">
                <span>参考价</span>
                <span>￥{{product.priceOld}}</span>
              </div>
            </div>
            <div class="product-number">
              <span>数量</span>
              <div>
                <input type="text" name="" v-model="number" @input="handleInput($event)">
                <a href="javascript:void(0)" class="product-number-add" @click="incNum">+</a>
                <a href="javascript:void(0)" class="product-number-reduce" @click="decNum">-</a>
              </div>
              <a href="javascript:void(0)" class="product-add" @click="addCart">加入购物车</a>
            </div>
            <div class="product-comment-prief">
              <span>评价</span>
              <span>{{product.praise}}</span>
              <span>好评度</span>
              <span>{{product.evaNumber}}</span>
              <span>评价人数</span>
            </div>
          </div>
        </div>
        <div v-if="!productIsFind">
          <p>未找到该商品</p>
        </div>
        <div class="haila-product-comment" v-if="productIsFind">
          <h2>用户评价</h2>
          <div class="comment-form">
            <div class="comment-content-wrap">
              <textarea class="comment-content" v-model="content"></textarea>
              <div class="comment-star">
                <a href="javascript:void(0)" class="star-level" :class="{isActive: starLevel==5}" @click="starLevel=5">5(完美)</a>
                <a href="javascript:void(0)" class="star-level"  :class="{isActive: starLevel==4}" @click="starLevel=4">4(好用)</a>
                <a href="javascript:void(0)" class="star-level"  :class="{isActive: starLevel==3}" @click="starLevel=3">3(一般)</a>
                <a href="javascript:void(0)" class="star-level"  :class="{isActive: starLevel==2}" @click="starLevel=2">2(差)</a>
              </div>
            </div>
            <a href="javascript:void(0)" class="submit-btn" @click="comment">评论</a>
          </div>
          <ul class="product-comment-list">
            <li class="comment-list-item" v-for="item in commentList">
              <span class="user-name">{{item.userName}}&nbsp;&nbsp;:</span>
              <div class="user-comment-box">
                <ul class="user-star" :style="{width: item.star*12+'px'}">
                  <!-- <li><img src="./../../static/imgs/star.png"></li>
                  <li><img src="./../../static/imgs/star.png"></li> -->
                </ul>
                <div class="user-comment">
                  <p>{{item.content}}</p>
                </div>
              </div>
              <div class="user-time">
                <span>{{item.time}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <haila-footer></haila-footer>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import './../assets/css/modal.css';
  import './../assets/css/product.css';
  import './../assets/css/cart.css';
  import HailaHeader from './../components/header.vue';
  import HailaSearch from './../components/search.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaNavbar from './../components/navbar.vue';
  import HailaBranch from './../components/branch.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
        /************************************
        product             商品
        stock               库存
        productIsFind       是否找到该商品
        number              往购物车添加商品数量
        commentList         评论列表
        starLevel           评论星级
        content             评论内容
        page                当前评论页数
        pageTotal           评论总页数
        *************************************/
        product: {},
        stock: 0,
        productIsFind: false,
        number: 1,
        commentList: [],
        starLevel: 0,
        content: '',
        page: 1,
        pageTotal: 0
      }
    },
    components: {
      HailaHeader,
      HailaSearch,
      HailaFooter,
      HailaNavbar,
      HailaBranch
    },
    mounted() {
      this.productInit();
    },
    methods: {
      //页面初始化
      productInit() {
        var productId = this.$route.query.productId;
        axios.get('/product/detail', {
          params: {
            productId: productId
          }
        }).then((res) => {
          var result = res.data;
          if (result.status == "0") {
            this.productIsFind = false;
          }
          else {
            this.product = result.result;
            this.stock = this.product.stock;
            this.productIsFind = true;
            this.commentGet();
          }
        });
      },
      //商品数量加一
      incNum() {
        if (this.number < this.stock) {
          this.number++;
        }
      },
      //商品数量减一
      decNum() {
        if (this.number > 1) {
          this.number--;
        }
      },
      handleInput(e) {
        this.number = parseInt(e.target.value.replace(/[\D]/g, ''));
        if (isNaN(this.number)) {
          this.number = 1;
        }
        if (this.number > this.stock) {
          this.number = this.stock;
        }
      },
      addCart() {
        if (this.stock < 0) {
          alert("该商品已售完");
        }
        var productId = this.product._id;
        var number = this.number;
        axios.post('/cart/add', {
          productId: productId,
          number: number
        }).then((res) => {
          var data = res.data;
          if (data.status == "0") {
            alert("添加失败");
          }
          else {
            alert("添加成功");
          }
        });
      },
      comment() {
        if (this.starLevel == 0) {
          alert("您未评分");
        }
        else {
          var productId = this.product._id;
          var starLevel = this.starLevel;
          var content = this.content.trim();
          axios.post('/comment/add', {
            productId: productId,
            starLevel: starLevel,
            content: content
          }).then((res) => {
            var response = res.data;
            /*if (res.status == "0") {
              alert()
            }*/
            alert(response.msg);
            this.commentGet();
          });
        }
      },
      commentGet() {
        var productId = this.product._id;
        var page = this.page;
        axios.get('/comment/commentList', {
          params: {
            productId: productId,
            pageSize: 10,
            page: page
          }
        }).then((res) => {
          var response = res.data;
          console.log(this);
          if (response.status == "1") {
            this.pageTotal = response.result.pageTotal;
            this.commentList = response.result.list;
            console.log(this);
          }
        });
      }
    }
  }
</script>
