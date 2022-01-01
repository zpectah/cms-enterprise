<template>
  <button
      class="btn"
      @click="(e) => add(e, id)"
  >
    {{ label }}
  </button>
</template>

<script>
module.exports = {
  data: function () {
    return {}
  },
  props: {
    id: String,
    label: String,
  },
  methods: {
    add: function (e, id) {
      e.preventDefault();
      this.$parent.add_to_basket(id);
    }
  }
}
</script>

<style scoped>

</style>