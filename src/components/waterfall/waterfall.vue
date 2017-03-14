<template>
	<div class="vue-waterfall" :style="style">
    <slot></slot>
	</div>
</template>

<script>
  export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" scoped>
  .vue-waterfall
    position: relative
</style>
