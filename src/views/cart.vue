<template>
  <div>
    <haila-header></haila-header>
    <haila-branch>
      <span>我的购物车</span>
    </haila-branch>
    <div class="haila-cart">
      <div class="container">
        <dl class="haila-cart-list">
          <dt class="haila-cart-header">
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>合计</span>
            <span>编辑</span>
          </dt>
          <dd class="haila-cart-item" v-for="item in cartList">
            <div class="cart-item-main">
              <input type="checkbox" name="" v-model="item.checked" @click="editCart('checkOne', item)">
              <img :src="'./../../'+item.product.picture">
              <router-link :to="{path: 'product', query: {productId: item.product._id}}">
                <span>{{item.product.title}}</span>
              </router-link>
            </div>
            <div class="cart-item-price">￥{{item.product.priceNow}}</div>
            <div class="cart-item-quantity">
              <a href="javascript:void(0)" @click="editCart('decOne', item)">-</a>
              <input type="text" name="" v-model="item.number"  @input="handleInput(item)">
              <a href="javascript:void(0)" @click="editCart('incOne', item)">+</a>
            </div>
            <div class="cart-item-subtotal">￥{{item.product.priceNow * item.number}}</div>
            <div class="cart-item-edit">
              <a href="javascript:void(0)" @click="delOneConfirm(item)">删除</a>
            </div>
          </dd>
        </dl>
        <div class="haila-cart-footer">
          <div class="cart-footer-select">
            <input type="checkbox" name="selectAll" id="select-all" @click="toggleCheckAll">
            <label for="select-all">全选</label>
            <a href="javascript:void(0)" @click="delManyConfirm">删除选中</a>
          </div>
          <div class="cart-footer-checkout">
            <span>总价: </span>
            <span class="cart-footer-total">￥{{totalPrice}}</span>
            <!-- <a href="/">去结算</a> -->
            <router-link :to="{path: 'address'}">
              去结算
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">{{tip}}</p>
      <div slot="btnGroup">
        <a class="btn btn-left" href="javascript:;" @click="delCart(kind)">确认</a>
        <a class="btn btn-right" href="javascript:;" @click="modalConfirm = false">关闭</a>
      </div>
    </Modal>
    <haila-footer></haila-footer>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import './../assets/css/modal.css';
  import './../assets/css/cart.css';
  import HailaHeader from './../components/header.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaBranch from './../components/branch.vue';
  import Modal from './../components/modal.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
        /************************************
        cartList             购物车列表
        modalConfirm         遮罩状态
        tip                  提示
        flag                 * 暂无用处, 保留
        delItem              记录当前想删除商品
        kind                 删除类别, 一个还是多个
        *************************************/
        cartList: [],
        modalConfirm:false,
        tip: "",
        flag: false,
        delItem: {},
        kind: "one"
      }
    },
    components: {
      HailaHeader,
      HailaFooter,
      HailaBranch,
      Modal
    },
    computed:{
      checkAllFlag(){
        var i = 0;
        this.cartList.forEach((item) => {
          if (item.checked) {
            i++;
          }
        })
        if (i == this.cartList.length) {
          return true;
        }
        return false;
      },
      totalPrice(){
        var money = 0;
        this.cartList.forEach((item) => {
          if (item.checked) {
            money += parseFloat(item.product.priceNow) * parseInt(item.number);
          }
        })
        return money;
      }
    },
    mounted() {
      this.initCart();
    },
    methods: {
      /************************************
        initCart            获取购物车
        handleInput         处理输入
        editCart            添加处理
        toggleCheckAll      全选切换
        delOneConfirm       删除某个
        delManyConfirm      删除选中
        delCart             删除
        closeModal          关闭遮罩
      *************************************/
      initCart() {
        axios.get('/cart/list').then((res) => {
          var response = res.data;
          if (response.status=="0") {
            alert(response.msg);
          }
          else {
            this.cartList = response.result;
          }
        });
      },
      handleInput(item) {
        item.number = parseInt(item.number.replace(/[\D]/g, ''));
        if (item.number > item.product.stock) {
          item.number = item.product.stock;
        }
        if (item.number < 1 || isNaN(item.number)) {
          item.number = 1
        }
        axios.post('/cart/update', {
          product: item.product._id,
          checked: item.checked,
          number: item.number
        }).then(res => {
          console.log(res.data);
        });
      },
      editCart(type, item) {
        console.log(type);
        var checked = true;
        if (item.product.number == 0) {
          alert("已卖完");
          item.checked = false;
          return;
        }
        //选中
        if (type == "checkOne") {
          item.checked = !item.checked;
        }
        //减一
        else if (type == "decOne") {
          if (item.number > item.product.number) {
            item.number = item.product.number;
          }
          else if (item.number > 1) {
            item.number--;
          }
          else {
            return;
          }
        }
        //加一
        else {
          if (item.number == item.product.number) {
            return;
          }
          else {
            item.number++;
          }
        }
        axios.post('/cart/update', {
          product: item.product._id,
          checked: item.checked,
          number: item.number
        }).then(res => {
          console.log(res.data);
        });
      },
      toggleCheckAll() {
        var flag = this.checkAllFlag ? false : true;
        this.cartList.forEach((item) => {
          item.checked = flag;
        });
        axios.post('/cart/toggleCheckAll', {
          flag: flag
        }).then( res => {
          console.log(res.data);
        });
      },
      delOneConfirm(item){
        this.delItem = item;
        this.kind = "one";
        this.modalConfirm = true;
        this.tip = "确认删除该商品?";
      },
      delManyConfirm() {
        this.kind = "many";
        this.modalConfirm = true;
        this.tip = "确认删除所选商品?";
      },
      delCart(kind) {
        this.modalConfirm = false;
        if (kind == "one") {
          axios.post("/cart/delOne", {
            productId: this.delItem.product._id
          }).then( res => {
            console.log(res.data);
            this.initCart();
          });
        }
        else {
          axios.post("/cart/delMany").then( res => {
            console.log(res.data);
            this.initCart();
          });
        }
      },
      closeModal(){
        this.modalConfirm = false;
      }
    }
  }
</script>
