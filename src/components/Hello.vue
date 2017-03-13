<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <split></split>
    <border-trans></border-trans>
      <swipe></swipe>
    <img v-lazyload="src" src="../assets/logo.png" alt="懒加载测试">
  </div>
</template>

<script>
import split from 'components/split/split';
import BorderTrans from 'components/border-trans/border-trans';
import Swipe from 'components/swipe/Swipe';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      src: require('../assets/logo.png')
    };
  },
  created() {
    this.$http.get('/api/test').then((response) => {
      response = response.body;
      this.msg = response.data.name;
    });
  },
  components: {
    split,
    BorderTrans,
    Swipe
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
