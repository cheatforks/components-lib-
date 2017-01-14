<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <split></split>
    <bordertrans></bordertrans>
  </div>
</template>

<script>
import split from 'components/split/split';
import bordertrans from 'components/border-trans/border-trans';

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
    bordertrans
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
