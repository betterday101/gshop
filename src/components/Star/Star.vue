<template>
  <div :class="`star star-${size}`" >
    <span class="star-item on" :key="index" v-for="(item,index) in getClass" :class="item"></span>
  </div>
</template>

<script>
    export default {
      name: "start",
      props:{
        score:Number,
        size:Number
      },
      computed:{
        getClass(){
          const startCollect=[];
          const onCount=Math.floor(this.score);
          for(let i=0;i<onCount;i++){
            startCollect.push("on");
          }
          if(this.score*10-onCount*10>=5){
            startCollect.push("half");
          }
          while(startCollect.length<5){
            startCollect.push("off");
          }
          return startCollect
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import '../../common/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
