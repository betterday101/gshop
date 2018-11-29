<template>
  <section class="msite">
    <!--首页头部-->
    <common-header title="昌平区北七家宏福科技园(337省道北)">
      <span class="header_search" slot="mheadtop">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login"  slot="mheadbottom">
        <span class="header_login_text">登录|注册</span>
      </span>
    </common-header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="(item,index) in getSwiperArr" class="swiper-slide" >
              <a v-for="(single,index) in item" href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img :src="`${dataImgUrl}${single.image_url}`" alt="">
                </div>
                <span>{{single.title}}</span>
              </a>
            </div>
          </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-bullets"><span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span></div>
      </div>
    </nav>
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <Shoplist />
    </div>
  </section>
</template>

<script>
  import commonHeader from '@/components/CommonHeader/commonHeader.vue'
  import Shoplist from '@/components/Shoplist/Shoplist.vue'
  import {mapState} from 'vuex'
  import 'swiper/dist/css/swiper.min.css'
  import Swiper from 'swiper'

export default {
  name: 'Msite',
  components:{
    commonHeader,
    Shoplist
  },
  data(){
      return{
        //图片地址
        dataImgUrl:"https://fuss10.elemecdn.com"
      }
  },
  mounted(){
    this.$store.dispatch("getFoods");
  },
  computed:{
    // ...mapState(["foodCategory"])等同下面
    foodCategory(){
      return this.$store.state.foodCategory
    },
    getSwiperArr(){
        const {foodCategory}=this;
        const bigArr=[];
        let smallArr=[];
        foodCategory.forEach(item=>{
            smallArr.push(item);
            if(smallArr.length==8){
               bigArr.push(smallArr);
               smallArr=[];
            }
      });
      return bigArr;

    }
  },
  watch:{
    //更新状态数据=>调用监视的回调=>异步更新界面
    foodCategory(){
      //必须在列表数据显示之后才能形成正确的轮播
      //目前这个是数据拿回来了但是没有渲染到页面上去，所以轮播不行
      //这里使用$nextTick，将回调延迟到下次 DOM更新循环之后执行。在修改数据之后立即使用它，
      this.$nextTick(function () {
        new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import '../../common/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
