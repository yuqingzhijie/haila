<template>
  <div>
    <haila-header></haila-header>
    <haila-branch>
      <span>订单确认</span>
    </haila-branch>
    <div class="haila-address">
      <div class="container">
        <div class="haila-address-select">
          <div class="address-select-header">
            <h2>收货地址</h2>
          </div>
          <div class="address-select-content">
            <ul class="address-list">
              <li v-for="item in addressList" :class="{selected: item.isDefault}">
                <dl class="address-info">
                  <dt>{{item.receptionist}}</dt>
                  <dd>{{item.street}}</dd>
                  <dd>{{item.phoneNumber}}</dd>
                </dl>
                <div class="address-opration">
                  <a href="javascript:void(0)" class="address-confirm" @click="selectAddress(item)" v-show="!item.isDefault">选择</a>
                  <span v-show="item.isDefault">默认地址</span>
                  <a href="javascript:;" class="address-delete" @click="delAddressConfirm(item)">删除</a>
                </div>
              </li>
            </ul>
            <div class="address-list">
              <li>
                <a href="javascript:void(0)" class="address-new" @click="addressModalFlag=true">
                  <i></i>
                  <span>添加新地址</span>
                </a>
              </li>
            </div>
          </div>
        </div>
        <div class="haila-order-confirm">
          <div class="address-order-header">
            <h2>订单商品列表</h2>
            <dl class="haila-order-list">
              <dt class="order-list-header">
                <span>商品信息</span>
                <span>单价</span>
                <span>数量</span>
                <span>合计</span>
              </dt>
              <dd class="order-list-item" v-for="item in checkCartList">
                <div class="order-item-main">
                  <a href="/">
                    <img :src="'./../../'+item.product.picture">
                    <span>{{item.product.title}}</span>
                  </a>
                </div>
                <div class="order-item-price">￥{{item.product.priceNow}}</div>
                <div class="order-item-quantity">
                  <span>{{item.number}}</span>
                </div>
                <div class="order-item-subtotal">￥469</div>
              </dd>
            </dl>
          </div>
          <div class="address-order-footer">
            <span>订单总计: </span>
            <span class="order-footer-total">￥2000</span>
            <a href="javascript:void(0)" @click="addOrder">提交订单</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="addressModalFlag">
      <div class="modal-inner">
        <div class="modal-top">
          <div class="modal-title">新地址</div>
          <a class="modal-close" @click="addressModalFlag=false">关闭</a>
        </div>
        <div class="modal-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorShow">{{errorTip}}</span>
            </div>
            <div class="address-box">
              <input type="text" name="name" v-model="receptionist" class="name" placeholder="收件人姓名">
              <textarea name="street" v-model="street" class="street" placeholder="详细地址"></textarea>
              <input type="text" name="phoneNumber" v-model="phoneNumber" class="phoneNumber" placeholder="联系号码">
            </div>
          </div>
          <div class="signin-wrap">
            <a href="javascript:;" class="btn-address" @click="addAddress()">添  加</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-overlay" v-if="addressModalFlag"></div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">{{tip}}</p>
      <div slot="btnGroup">
        <a class="btn btn-confirm" href="javascript:;" @click="delAddress">确认</a>
        <a class="btn btn-cancel" href="javascript:;" @click="modalConfirm = false">关闭</a>
      </div>
    </Modal>
    <haila-footer></haila-footer>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import './../assets/css/modal.css';
  import './../assets/css/address.css';
  import HailaHeader from './../components/header.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaBranch from './../components/branch.vue';
  import Modal from './../components/modal.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
        /************************************
        addressList         地址列表
        checkCartList       商品列表
        selectAddressId     * 选中地址id
        addressModalFlag    遮罩状态
        errorTip            错误提示
        errorShow           错误展示情况
        delItem             删除地址
        modalConfirm        确认遮罩
        tip                 提示
        receptionist        收件人
        street              详细地址
        phoneNumber         号码
        *************************************/
        addressList: [],
        checkCartList: [],
        selectAddressId: "",
        addressModalFlag: false,
        errorTip: "",
        errorShow: false,
        delItem: {},
        modalConfirm: false,
        tip: "",
        receptionist: "",
        street: "",
        phoneNumber: ""
      }
    },
    components: {
      HailaHeader,
      HailaFooter,
      HailaBranch,
      Modal
    },
    computed:{
      /*checkAddress() {
        if (this.checkName && this.checkStreet && this.checkPhone) {
          this.errorShow = false;
          return true;
        }
        this.errorShow = true;
        return false;
      }*/
    },
    mounted() {
      this.getAddressList();
      this.getCheckProduct();
    },
    methods: {
      /************************************
      getAddressList      获取地址列表
      getCheckProduct     获取商品列表
      selectAddress       改变默认地址
      initAddress         取得默认地址信息
      addAddress          添加地址
      delAddress          删除地址
      delAddressConfirm   确认删除
      closeModal          关闭遮罩
      checkName           检查名字
      checkPhone          检查号码
      checkStreet         检查街道
      addOrder            添加订单
      *************************************/
      getAddressList() {
        axios.get('/address/getAddressList').then(res => {
          var response = res.data;
          if (response.status == "1") {
            this.addressList = response.result;
            this.initAddress();
          }
        })
      },
      getCheckProduct() {
        axios.get('/cart/list').then(res => {
          var response = res.data;
          if (response.status == "1") {
            var list = response.result;
            var that = this;
            list.forEach(function(item) {
              if (item.checked) {
                that.checkCartList.push(item);
              }
            });
          }
          else {
            alert(response.msg);
          }
        });
      },
      selectAddress(address) {
        axios.post('/address/setDefault', {
          addressId: address._id
        }).then(res => {
          if (res.data.status == "1") {
            this.addressList.forEach(function(item) {
              item.isDefault = false;
            });
            address.isDefault = true;
            this.initAddress();
          }
          else {
            alert(res.data.msg);
          }
        });
      },
      initAddress() {
        for (let item of this.addressList) {
          if (item.isDefault) {
            this.receptionist = item.receptionist;
            this.phoneNumber = item.phoneNumber;
            this.street = item.street;
          }
        }
      },
      delAddress() {
        axios.post('/address/delAddress', {
          addressId: this.delItem._id
        }).then(res => {
          if (status != "1") {
            alert(res.data.msg);
            this.getAddressList();
          }
        });
        this.modalConfirm = false;
      },
      delAddressConfirm(item) {
        this.tip = "确认删除该地址吗";
        this.modalConfirm = true;
        this.delItem = item;
      },
      closeModal() {
        this.modalConfirm = false;
      },
      checkName() {
        var nameReg = /^[\u4e00-\u9fa5]{2,5}$/;
        if(!nameReg.test(this.receptionist)) {
          this.errorTip = "姓名错误";
          return false;
        }
        return true;
      },
      checkStreet() {
        var length = this.street.length;
        if (length > 40 || length < 6) {
          this.errorTip = "字数太长或太短(10-40为宜)";
          console.log(length);
          return false;
        }
        return true;
      },
      checkPhone() {
        var phoneReg = /^1[134578]\d{9}$/;
        if(!phoneReg.test(this.phoneNumber)) {
          this.errorTip = "手机号码不正确";
          console.log('hh');
          return false;
        }
        console.log('aa');
        return true;
      },
      addAddress() {
        if (this.checkName() && this.checkStreet() && this.checkPhone()) {
          this.errorShow = false;
          axios.post('/address/add', {
            receptionist: this.receptionist,
            street: this.street,
            phoneNumber: this.phoneNumber
          }).then( res => {
            alert(res.data.msg);
            this.addressModalFlag = false;
            this.getAddressList();
          });
        }
        else {
          this.errorShow = true;
        }
      },
      addOrder() {
        if (this.receptionist != "" && this.receptionist != null) {
          axios.post('/order/add', {
            receptionist: this.receptionist,
            street: this.street,
            phoneNumber: this.phoneNumber,
            list: this.checkCartList
          }).then( res => {
            console.log(res.data);
          });
        }
        else {
          alert('未选择地址');
        }
      },
      change() {
        console.log(this.street.length);
      }
    }
  }
</script>
