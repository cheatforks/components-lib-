<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <split></split>
    <bord-trans></bord-trans>
  </div>
</template>

<script>
import split from 'components/split/split';
import borderTrans from 'components/border-trans/border-trans';
import Swipe from 'components/swipe/Swipe';
import SwipeItem from 'components/swipe/SwipeItem';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  created: function() {
    this.$http.get('/api/test').then((response) => {
      response = response.body;
      this.msg = response.data.name;
    });
  },
  components: {
    split,
    borderTrans
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
