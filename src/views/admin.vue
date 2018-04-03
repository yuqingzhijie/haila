<template>
  <div>
    <haila-header></haila-header>
    <div class="haila-admin">
      <div class="container">
        <form>
          <h4>商品录入</h4>
          <div class="form-group">
            <label for="title">标题:</label>
            <input type="text" id="title" v-model="title">
          </div>
          <div class="form-group">
            <label for="summary">简介:</label>
            <textarea id="summary" v-model="summary"></textarea>
          </div>
          <div class="form-group">
            <label for="category">分类:</label>
            <select id="category" v-model="category">
              <option>母婴儿童</option>
              <option>美容彩妆</option>
              <option>服饰鞋包</option>
              <option>家居个护</option>
              <option>手表配饰</option>
              <option>数码家电</option>
              <option>环球美食</option>
              <option>运动户外</option>
            </select>
          </div>
          <div class="form-group">
            <label for="brand-en">品牌 (en):</label>
            <input type="text" id="brand-en" v-model="brandEn">
          </div>
          <div class="form-group">
            <label for="brand-cn">品牌 (cn):</label>
            <input type="text" id="brand-cn" v-model="brandCn">
          </div>
          <div class="form-group">
            <label for="place">产地:</label>
            <select id="place" v-model="place">
              <option>日本</option>
              <option>美国</option>
              <option>意大利</option>
              <option>韩国</option>
              <option>德国</option>
              <option>瑞典</option>
              <option>丹麦</option>
              <option>英国</option>
              <option>法国</option>
              <option>澳大利亚</option>
              <option>奥地利</option>
            </select>
          </div>
          <div class="form-group">
            <label for="poster-pic">图片:</label>
            <input type="file" @change="getFile($event)" accept=".jpg,.jpeg,.png,.gif" id="poster-pic">
          </div>
          <div class="form-group">
            <div class="group-4">
              <label for="price-old">原价:</label>
              <input type="text" id="price-old" v-model="priceOld">
            </div>
          </div>
          <div class="form-group">
            <div class="group-4">
              <label for="price-now">现价:</label>
              <input type="text" id="price-now" v-model="priceNow">
            </div>
          </div>
          <div class="form-group">
            <label for="stock">库存:</label>
            <input type="text" id="stock" v-model="stock">
          </div>
          <div class="form-group">
            <label></label>
            <div class="btn-box">
              <button @click="submit($event)" id="btn-submit">录入</button>
              <a href="javascript:history.back();" id="btn-cancel">返回</a>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import './../assets/css/admin.css';
  import './../assets/css/modal.css';
  import HailaHeader from './../components/header.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
        /************************************
        title               标题
        place               产地
        brandCn             品牌中文名
        brandEn             品牌英文名
        summary             简介
        priceNow            现价
        priceOld            原价
        file                上传图片
        category            分类
        stock               库存
        *************************************/
        title: '',
        place: '日本',
        brandCn: '',
        brandEn: '',
        summary: '',
        priceNow: '',
        priceOld: '',
        file: '',
        category: '母婴儿童',
        stock: ''
      }
    },
    mounted() {
    },
    components: {
      HailaHeader
    },
    methods: {
      /************************************
        getFile             获取图片
        submit              提交
        *************************************/
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submit(event) {
        event.preventDefault();
        let formData = new FormData();

        formData.append('product[title]', this.title);
        formData.append('product[place]', this.place);
        formData.append('product[brandCn]', this.brandCn);
        formData.append('product[brandEn]', this.brandEn);
        formData.append('product[summary]', this.summary);
        formData.append('product[priceNow]', this.priceNow);
        formData.append('product[priceOld]', this.priceOld);
        formData.append('product[category]', this.category);
        formData.append('product[stock]', this.stock);
        formData.append('file', this.file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        axios.post('/admin/product', formData, config).then(function (res) {
          if (res.data.status == "1") {
            alert('成功');
          }
          else {
            alert('失败');
          }
        })
      }
    }
  }
</script>
