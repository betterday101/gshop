<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="menuUl">
          <li @click="selectItem(index)" class="menu-item" :class="{current:currentIndex===index}" v-for="(goods ,index) in shopgoods">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="goods.icon" :src="goods.icon">
              {{goods.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodUl">
          <li class="food-list-hook" v-for="(goods ,index) in shopgoods" @key="index">
            <h1 class="title">{{goods.name}}</h1>
            <ul>
              <li @click="showFood(food,true)"  class="food-item bottom-border-1px" v-for="(food,index) in goods.foods" @key="index">
                  <div class="icon">
                    <img width="57" height="57"
                         :src="`${food.icon}`">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cart-control :food="food"></cart-control>
                    </div>
                  </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Food :food="food" v-show="isShowFood" @showFood="showFood"/>
      <shop-cart></shop-cart>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import cartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
    export default {
      name: "shop-goods",
      computed:{
        //...mapState(["shopgoods"])//等同下面的写法
        shopgoods(){
          return  this.$store.state.shopgoods;
        },
        currentIndex(){
          const {tops,scrollY}=this;
          const index=tops.findIndex((top,index)=>{
              return scrollY>=top&&scrollY<tops[index+1]
            });

          //如果当前分类的下标发生了变化，就让左侧列表滚动到index对应的li处
          if(index!=this.index&&this.scrollMenu){
              this.index=index;
              //const lis=this.$refs.menuUl.querySelectorAll("li");
              const lis=this.$refs.menuUl.children;
              this.scrollMenu.scrollToElement(lis[index])
          }
          return index
        }
      },
      components:{
        cartControl,
        Food,
        ShopCart
      },
      data(){
         return {
           food:{},
           isShowFood:false,
           tops:[0,5],
           scrollY:0 //这个表示当前滑动的值
         }
      },
      mounted(){
        this.$store.dispatch("getShoopGoods",()=>{
           this.$nextTick(()=>{
             this._initScroll();
             this._initTops();
           })
        });

      },
      methods:{
        _initScroll(){
           this.scrollMenu=new BScroll('.menu-wrapper',{});
           this.scrollFoods=new BScroll('.foods-wrapper',{
               click:true,
               probeType:1
           });

          // 绑定滚动的事件监听
          this.scrollFoods.on('scroll', ({x, y}) => {
            console.log('scroll', x, y)
            // 更新scrollY
            this.scrollY = Math.abs(y)
          })
          this.scrollFoods.on("scrollEnd",({x,y})=>{
            console.log("scrollEnd",{x,y});
            this.scrollY=Math.abs(y);
          })

        },
        _initTops(){
          const tops=[];
          let top =0;
          tops.push(top)
          //querySelectorAll可以用foreEach遍历，伪数组
          //const lis= this.$refs.foodUl.querySelectorAll(".food-list-hook");
          // const lis= this.$refs.foodUl.getElementsByClassName("food-list-hook");
          // lis.forEach((li)=>{
          //   top+=li.clientHeight;
          //   tops.push(top);
          // });
          //getElementsByClassName可以用用slice转成伪数组后用foreEach遍历，
          const lis= this.$refs.foodUl.getElementsByClassName("food-list-hook");
          Array.prototype.slice.call(lis).forEach((li)=>{
            top+=li.clientHeight;
            tops.push(top);
          });

          this.tops=tops;
        },
        showFood(food,bool){
           this.food=food;
           this.isShowFood=bool;
        },
        //选择左侧分类项
        selectItem(index){
          //计算目标位置的坐标
          const y=-this.tops[index];
          this.scrollY=-y;
          this.scrollFoods.scrollTo(0,y,30);
        }

      }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


