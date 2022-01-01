<template>
  <div class="demo-wrapper">kdfjhgksdjhfgksdjhf ... {{ var1 }} ... {{ dvLabel }}</div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      var1: 'Value1'
    }
  },
  props: ['dvLabel'],
}
</script>

<style scoped>
  .demo-wrapper{
    color: red;
  }
</style>