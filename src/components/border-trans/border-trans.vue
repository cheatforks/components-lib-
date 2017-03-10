<template>
    <!--suppress HtmlUnknownAttribute -->
  <div class="o-hover block wrap" ref="pos" :style="options" :class='{hover:ishover,tab:istab}' @mouseover="changehover" @mouseout="changehover">
      <slot>

      </slot>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>

    .block
      --color: #000000
      text-decoration: none
      position: relative
      display: inline-block
      width: 50px
      height: 50px
      text-align: center
      &:after
        content: ''
        display: block
        position: absolute
      &:before
        content: ''
        display: block
        position: absolute
    .o-hover
      color: black
      box-sizing: border-box
      &:after,
      &:before
        box-sizing: border-box
        border: 1px solid transparent
        width: 0
        height: 0
      &:after
        top: 0
        left: 0
        transition: border-color 0s ease-in .8s, width 0.2s ease-in 0.6s, height 0.2s ease-in 0.4s
      &:before
        bottom: 0
        right: 0
        transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s, height 0.2s ease-in
      &.hover
        &:after,
        &:before
          width: 100%
          height: 100%
        &:after
          border-top-color: black
          border-right-color: black
          transition: width 0.2s ease-out, height 0.2s ease-out 0.2s
        &:before
          border-bottom-color: black
          border-left-color: black
          transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s
        &:after
          border-top-color: var(--color)
          border-right-color: var(--color)
          transition: width 0.2s ease-out, height 0.2s ease-out 0.2s
        &:before
          border-bottom-color: var(--color)
          border-left-color: var(--color)
          transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s

      &.hover.tab
        &:after,
        &:before
          width: 100%
          height: 100%
        &:after
          border-top-color: white
          border-right-color: white
          transition: width 0.2s ease-out, height 0.2s ease-out 0.2s
        &:before
          border-bottom-color: white
          border-left-color: white
          transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s
</style>
<script>
    export default{
      props: {
        options: {
          type: Object
        },
        color: {
          type: String,
          default: 'black'
        }
      },
      name: 'bordertrans',
      data: function() {
        return {
          ishover: false,
          istab: false
        };
      },
      methods: {
        handleScroll: function() {
          let rect = this.$refs.pos.getBoundingClientRect();
          this.ishover = (rect.bottom < window.innerHeight) && (rect.top > 0);
        },
        changehover: function() {
          var that;
          this.ishover = !this.ishover;
          that = this;
          var toggle = function() {
            that.ishover = !that.ishover;
          };
          var timeId = window.setTimeout(toggle, 1000);
        }
      },
      mounted: function() {
        window.addEventListener('scroll', this.handleScroll);
        if (this.color !== 'black') {
          this.istab = true;
        }

        this.$refs.pos.style.setProperty('--color', this.color);
        var that = this;
        var toggle = function() {
          that.ishover = true;
        };
        var timeId = window.setTimeout(toggle, 0);
      },
      destroyed: function() {
        window.removeEventListener('scroll', this.handleScroll);
      }
    };
</script>

