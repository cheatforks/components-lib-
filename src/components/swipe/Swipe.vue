<template>
  <div class="swiper-wrap" ref="swiper-wrap" :style="{
  'transform': `translate3d(${translateX}px,${translateY}px,0)`,
  'transition-duration': `${transitionDuration}ms`
  }"
  @transitioned="_onTransitionEnd">
    <div v-for="item of swipeInfo">
      <a href="item.href"><img src="item.imgSrc" alt="pic"></a>
    </div>
  </div>
  <!--分页-->
  <div class="pagi" v-show="pagiVisible">
    <span class="bullet"
          v-for="item of slideEls"
          :class="{'active': index+1===currentPage}"
          @click="pagiClickable && setPage(index + 1)"
    ></span>
  </div>
</template>

<script>
  export default {
    props: {
      pagiVisible: {
        type: Boolean,
        default: false
      },
      pagiClickable: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
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
          imgSrc: './imgs/logo.png'
        }, {
          href: 'http://www.baidu.com',
          imgSrc: './imgs/logo.png'
        }, {
          href: 'http://www.baidu.com',
          imgSrc: './imgs/logo.png'
        }],
        currentPage: 1,
        lastPage: 1,
        translateX: 0,
        translateY: 0,
        startTranslate: 0,
        delta: 0,
        startPos: null,
        transitioning: false,
        slideEls: [],
        translateOffset: 0,
        transitionDuration: 0
      };
    },
    mounted() {
        this.slideEls = [].map.call(this.$refs.swiperWrap.children,el => el); //nodelist转化为数组
        if (this.loop) {
            this.$nextTick(function() {
                this._createLoop();
                this.setPage(this.currentPage, true);
            });
        } else {
            this.setPage(this.currentPage);
        }
    },
    methods: {
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
                if (this.delta === 0) {
                    this._setTranslate(self._getTranslateOfPage(this.lastPage));
                }
                setTimeout(function() {
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
            let propName = 'clientWidth',
              swiperWrapEl = this.$refs.swiperWrap,
              duplicateFirstChild = swiperWrapEl.firstElementChild.cloneNode(true),
              duplicateLastChild = swiperWrapEl.lastElementChild.cloneNode(true);
              swiperWrapEl.insertBefore(duplicateLastChild, swiperWrapEl.firstElementChild);
              swiperWrapEl.appendChild(duplicateFirstChild);
              this.translateOffset = -duplicateLastChild[propName];
        },
        _setTranslate(val) {
            let translateName = 'translateX';
            this[translateName] = val;
        },
        _getTranslateOfPage(page) {
            if (page === 0) return 0;
            let propName = 'clientWidth';
            return -[].reduce.call(this.slideEls, function(total, el, i) {
                return i > page - 2 ? total : total + el[propName];
            }, 0) + this.translateOffset;
        },
        _onTransitionStart() {
            this.transitioning = true;
            this.transitionDuration = this.speed;
            if (this._isPageChanged()) {
                this.$emit('slide-change-start', this.currentPage);
            } else {
                this.$emit('slide-revert-start', this.currentPage);
            }
        }

    }

  }
</script>
<style scoped lang="stylus">

</style>
