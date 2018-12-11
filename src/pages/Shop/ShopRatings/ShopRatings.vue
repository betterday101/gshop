<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{shopinfo.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{shopinfo.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size="36" :score="shopinfo.serviceScore"/>
            <span class="score">{{shopinfo.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :size="36" :score="shopinfo.foodScore"/>
            <span class="score">{{shopinfo.foodScore}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{shopinfo.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split/>
      <rating-select :type="type" :onlyContent="onlyContent" @selectType="selectType" @toggleOnlyContent="setonlyContent"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="item.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <Star :size="24" :score="item.score"/>
                <span class="delivery">{{item.score}}</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                <span class="item" v-for="(oneitem, index) in item.recommend" :key="index">{{oneitem}}</span>
              </div>
              <div class="time">{{item.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import  Star from '../../../components/Star/Star'
  import RatingSelect from '../../../components/RatingSelect/RatingSelect'
  import Bscroll from 'better-scroll'
  export default {
        name: "shop-ratings",
        components:{
          Star,
          RatingSelect
        },
        data(){
          return {
            type:2,  //0推荐,1不推荐,2全部
            onlyContent:true  //只显示有内容的评价
          }
        },
        computed:{
          ...mapState(["shopinfo","shopratings"]),
           filterRatings(){
             const {shopratings,onlyContent,type}=this;
             return shopratings.filter((rating,index)=>{
               const {rateType,text}=rating;
               /*
                 条件1
                   selectType: 0/1/2
                   rateType: 0/1
                   条件1表达式1:  selectType===2
                   条件1表达式2:  rateType===selectType
                   条件1表达式: selectType===2 || rateType===selectType
               */
               /*
               条件2
               onlyContent: true/false
               text: 有值/没值
               条件2表达式1:  onlyContent===false
               条件2表达式2:  text.length>0
               条件2表达式:   !onlyContent || text.length>0
                */
               return (type===2 || rateType===type)&&(!onlyContent||text.length>0);
             })
           }
        },

        mounted(){
           this.$store.dispatch("getShopRatings",()=>{
             this.$nextTick(()=>{
                 new Bscroll(".ratings",{});

             })
           });

        },
        methods:{
          selectType(type){
            this.type=type
          },
          setonlyContent(){
            this.onlyContent=! this.onlyContent
          }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../../common/mixins.styl"

  .ratings
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>

