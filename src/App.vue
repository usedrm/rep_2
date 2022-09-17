<template>
  <div class="app-container">
  <!--头部区域渲染-->
  <Header></Header>
    <!--数据渲染-->
  <Goods v-for="item in list" 
  :key="item.id" 
  :g_price="item.price" 
  :g_title="item.name" 
  :g_id="item.id" 
  :g_s="item.status" 
  :g_num="item.num"
  @newData="newdata"
  @changeNum="newNum"
  @subNum="chnum"></Goods>  <!--价格，名称传递-->
  <!-- 选中状态渲染,goods组件选中状态同步到app组件的数据中，子向父 -->

  <Footer :checked="allSelect" :amount="gross" :quannum="allnum" @staC="staca"></Footer> <!-- 底部全选功能 父向子 计算所有状态，计算属性 -->
  </div>
</template>

<script>
import axios from 'axios'
import Goods from '@/components/Goods/Goods.vue'  //每一条数据对应一个
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue' //导入底部组件
export default {
  components:{
    Goods,
    Header,
    Footer
  },
  data(){
    return {
      list:[]
    }
  },
  computed:{
    allSelect(){
      return this.list.every(item => item.status);
    },
    gross(){ //总价钱
      return this.list.filter(item=> item.status).reduce((gro,item)=>{return gro + item.price*item.num},0)
    },
    allnum(){
      return this.list.filter(item=> item.status).reduce((gro,item)=>{return gro + item.num},0)
    }
  },
  //created 发起请求得到商品数据列表
  created(){
    this.getList()
  },
  methods:{
    async getList(){
      const { data: res } = await axios.get('http://127.0.0.1/data')
      if(res.status === 200) this.list = res.list //获取的数据存到组件数据中
    
    },
    newdata(val){  //子组件触发事件，父组件绑定好事件，对应处理函数
      this.list.some((item)=>{
        if(item.id === val.id) return item.status=val.sta;
      })
    },
    staca(val){
      this.list.forEach(item => {
        item.status = val} )
    },
    newNum(val) {
      this.list.some((item)=>{
        if(item.id === val.id) return item.num = val.num
      })
    },
    chnum(val) {
      this.list.some((item)=>{
        if(item.id === val.id) return item.num = val.num
      })
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
