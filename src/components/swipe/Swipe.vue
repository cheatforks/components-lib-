<template>
  <div class="swiper">
    <div class="swiper-wrap" ref="swiperWrap" :style="{
  'transform': `translate3d(${translateX}px,${translateY}px,0)`,
  'transition-duration': `${transitionDuration}ms`
  }"
         @transitionend="_onTransitionEnd">
      <div v-for="item of swipeInfo">
        <a :href="item.href"><img :src="item.imgSrc" alt="pic"></a>
      </div>
    </div>
    <!--分页-->
    <div class="pagi" v-show="pagiVisible">
    <span class="bullet"
          v-for="(item, index) of slideEls"
          :class="{'active': index+1===currentPage}"
          @click="pagiClickable && setPage(index + 1)"
    ></span>
    </div>
    <span @click="next">下页</span>
    <span @click="prev">上页</span>
  </div>
</template>

<script>
  export default {
    name: 'swipe',
    props: {
      pagiVisible: {
        type: Boolean,
        default: true
      },
      pagiClickable: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: true
      },
      speed: {
        type: Number,
        default: 500
      }
    },
    data() {
      return {
        swipeInfo: [{
          href: 'http://www.baidu.com',
          imgSrc: require('./imgs/logo.png')
        }, {
          href: 'http://www.baidu.com',
          imgSrc: require('./imgs/logo.png')
        }, {
          href: 'http://www.baidu.com',
          imgSrc: require('./imgs/logo.png')
        }],
        currentPage: 1,
        lastPage: 1,
        translateX: 0,
        translateY: 0,
        transitioning: false,
        translateOffset: 0,
        slideEls: [],
        transitionDuration: 0
      };
    },
    mounted() {
      this.slideEls = [].map.call(this.$refs.swiperWrap.children, el => el); // nodelist转化为数组
      if (this.loop) {
        this.$nextTick(function () {
          this._createLoop();
          this.setPage(this.currentPage, true);
        });
      } else {
        this.setPage(this.currentPage);
      }
    },
    methods: {
      // 定位轮播页
      setPage(page, noAnimation) {
        let self = this;
        this.lastPage = this.currentPage;
        if (page === 0) {
          this.currentPage = this.slideEls.length;
        } else if (page === this.slideEls.length + 1) {
          this.currentPage = 1;
        } else {
          this.currentPage = page;
        }

        if (this.loop) {
            // 开启新循环
          this._setTranslate(self._getTranslateOfPage(this.lastPage));

          // 保证循环动画位于最后的异步队列
          setTimeout(function () {
            self._setTranslate(self._getTranslateOfPage(page));
            if (noAnimation) return;
            self._onTransitionStart();
          }, 0);
        } else {
          this._setTranslate(this._getTranslateOfPage(page));
          if (noAnimation) return;
          this._onTransitionStart();
        }
      },
      _createLoop() {
        let propName = 'clientWidth';
        let swiperWrapEl = this.$refs.swiperWrap;
        let duplicateFirstChild = swiperWrapEl.firstElementChild.cloneNode(true);
        let duplicateLastChild = swiperWrapEl.lastElementChild.cloneNode(true);
        swiperWrapEl.insertBefore(duplicateLastChild, swiperWrapEl.firstElementChild);
        swiperWrapEl.appendChild(duplicateFirstChild);
        this.translateOffset = -duplicateFirstChild[propName];
      },
      // 进行位移
      _setTranslate(val) {
        let translateName = 'translateX';
        this[translateName] = val;
      },
      // 计算位移距离
      _getTranslateOfPage(page) {
        if (page === 0) return 0;
        let propName = 'clientWidth';
        return -[].reduce.call(this.slideEls, function (total, el, i) {
          return i > page - 2 ? total : total + el[propName];
        }, 0) + this.translateOffset;
      },
      _onTransitionStart() {
        this.transitioning = true;
        this.transitionDuration = this.speed;
      },
      _onTransitionEnd() {
        this.transitioning = false;
        this.transitionDuration = 0;
      },
      next() {
        let page = this.currentPage;
        if (page < this.slideEls.length || this.loop) {
          this.setPage(page + 1);
        }
      },
      prev() {
        let page = this.currentPage;
        if (page > 1 || this.loop) {
          this.setPage(page - 1);
        }
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper
    position: relative
    overflow: hidden
    .swiper-wrap
      display: flex
      width: 100%
      height: 100%
      transition: all 0ms ease
      div
        overflow: hidden
        flex-shrink: 0
        width: 100%
        height: 100%
    .pagi
      position: absolute
      bottom: 10px
      width: 100%
      text-align: center
      .bullet
        display: inline-block
        margin: 0 3px
        width: 8px
        height: 8px
        border-radius: 50%
        background-color: #000000
        opacity: .2
        transition: all .5s ease
      .bullet.active
        background: #007aff
        opacity: 1

</style>
