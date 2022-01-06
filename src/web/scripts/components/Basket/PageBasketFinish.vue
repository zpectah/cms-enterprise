<template>
  <section>
    ... message by status ...
  </section>
</template>

<script>
module.exports = {
  data: function () {
    return {}
  },
  props: {},
  mounted: function () {
    console.log('.... get parameter ...');

    // if finish -->
    this.$parent.clear_storage();
  },
};
</script>

<style scoped>

</style>