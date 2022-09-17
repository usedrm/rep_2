<template>
  <div class="goods-container">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input type="checkbox" class="custom-control-input" :id="'cb'+id" :checked="g_s" @change="changeData" />
        <!-- 状态改变事件，触发函数 -->
        <label class="custom-control-label" :for="'cb'+id">
          <!-- 点击图片也能选中，id设为对应值 -->
          <!-- 商品的缩略图 -->
          <img src="../../assets/logo.png" alt="" />
        </label>
      </div>
    </div>
    <!-- 右侧信息区域 -->
    <div class="goods-info">
      <!-- 商品标题 -->
      <h6 class="goods-title">商品名称{{title}}</h6>
      <div class="goods-info-bottom">
        <!-- 商品价格 -->
        <span class="goods-price">￥{{price}}</span>
        <!-- 商品的数量 -->
        <Counter @addone="add" @subone="sub" :count="g_num"></Counter>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter/Counter.vue'
export default {
  components:{
    Counter
  },
  props:{
    g_price:{
      type:Number,
      required:true
    },
    g_title:{
      required:true
    },
    g_id:{
      type:Number,
      required:true
    },
    g_s:{
      required:true
    },
    g_num:{
      required:true,
      type:Number
    }
  },
  data(){
    return {
      price:this.g_price,
      title:this.g_title,
      id:this.g_id
    }
  },
  methods:{
    changeData(e){
      this.$emit('newData',{
        id:this.g_id,
        sta:e.target.checked
      })
    },
    add(val) {
      this.$emit('changeNum',{id:this.g_id,num:val})
    },
    sub(val) {
      this.$emit('subNum',{id:this.g_id,num:val})
    }
  }

}
</script>

<style lang="less" scoped>
.goods-container {
  + .goods-container {
    border-top: 1px solid #efefef;
  }
  padding: 10px;
  display: flex;
  .thumb {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }
  }

  .goods-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .goods-title {
      font-weight: bold;
      font-size: 12px;
    }
    .goods-info-bottom {
      display: flex;
      justify-content: space-between;
      .goods-price {
        font-weight: bold;
        color: red;
        font-size: 13px;
      }
    }
  }
}
</style>
