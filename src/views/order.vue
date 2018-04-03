<template>
  <div>
    <haila-header></haila-header>
    <haila-branch>
      <span>订单确认</span>
    </haila-branch>
    <div class="haila-order">
      <div class="container">
        <div class="haila-order-content">
          <div class="haila-order-tip">
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>合计</span>
          </div>
          <dl class="haila-order-list">
            <dt class="order-list-header">
              <div>
                <span>订单号:&nbsp;1522650708238</span>
                <span>2018-04-02 14:31:48</span>
                <span>收件人:&nbsp;小明</span>
                <span>18818818818</span>
                <span>订单总价:</span>
                <span class="price">￥8888</span>
              </div>
              <a href="javascript:void(0)">删除</a>
            </dt>
            <dd class="order-list-item">
              <div class="order-item-main">
                <a href="/">
                  <!-- <img src="./images/PANDORA潘多拉 醉人月夜925银串饰 791725-469.jpg"> -->
                  <span>PANDORA潘多拉 醉人月夜925银串饰</span>
                </a>
              </div>
              <div class="order-item-price">￥469</div>
              <div class="order-item-quantity">
                <span>2</span>
              </div>
              <div class="order-item-subtotal">￥469</div>
            </dd>
            <dd class="order-list-item">
              <div class="order-item-main">
                <a href="/">
                  <!-- <img src="./images/PANDORA潘多拉 醉人月夜925银串饰 791725-469.jpg"> -->
                  <span>PANDORA潘多拉 醉人月夜925银串饰</span>
                </a>
              </div>
              <div class="order-item-price">￥469</div>
              <div class="order-item-quantity">
                <span>2</span>
              </div>
              <div class="order-item-subtotal">￥469</div>
            </dd>
            <dd class="order-list-item">
              <div class="order-item-main">
                <a href="/">
                  <!-- <img src="./images/PANDORA潘多拉 醉人月夜925银串饰 791725-469.jpg"> -->
                  <span>PANDORA潘多拉 醉人月夜925银串饰</span>
                </a>
              </div>
              <div class="order-item-price">￥469</div>
              <div class="order-item-quantity">
                <span>2</span>
              </div>
              <div class="order-item-subtotal">￥469</div>
            </dd>
          </dl>
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
  import './../assets/css/address.css';
  import './../assets/css/order.css';
  import HailaHeader from './../components/header.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaBranch from './../components/branch.vue';
  import Modal from './../components/modal.vue';
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
      }
    },
    components: {
      HailaHeader,
      HailaFooter,
      HailaBranch,
      Modal
    },
    computed:{
    },
    mounted() {
    },
    methods: {
    }
  }
</script>