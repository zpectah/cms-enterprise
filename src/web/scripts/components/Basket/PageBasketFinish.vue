<template>
  <section>
    <div v-if="status === 'success'">
      <h3>{{ t('basket.title.new_order_id') }} #{{ oid }}</h3>
      <p>{{ t('basket.message.finish.success') }}</p>
    </div>
    <div v-if="status === 'error'">
      <h3>{{ t('basket.title.new_order_error') }}</h3>
      <p>{{ t('basket.message.finish.success') }}</p>
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
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
  },
};
</script>

<style scoped>

</style>