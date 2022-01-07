<template>
  <section>
    <div v-if="status === 'success'">
      Order #{{ oid }} was successfully created
    </div>
    <div v-if="status === 'error'">
      Error while creating order or payment
    </div>
  </section>
</template>

<script>
module.exports = {
  props: {
    oid: String,
    status: String,
  },
  mounted: function () {
    this.$parent.clear_storage();
  },
};
</script>

<style scoped>

</style>