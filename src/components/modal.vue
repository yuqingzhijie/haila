<template>
    <div>
      <div class="modal" v-show="mdShow">
        <div class="modal-inner">
          <div class="modal-top">
            <a class="modal-close" @click="closeModal">Close</a>
          </div>
          <div class="modal-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-overlay" v-show="mdShow" @click="closeModal"></div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props:["mdShow"],
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          }
        }
    }
</script>