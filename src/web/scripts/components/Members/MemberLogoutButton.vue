<template>
  <button
      class="btn"
      @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
const { post } = require('../../utils/http');

module.exports = {
  data: function () {
    return {}
  },
  props: {
    label: String,
    targetPath: String,
  },
  methods: {
    onClick: function (e) {
      e.preventDefault();
      post('/api/member_logout', {}).then((response) => {
        window.location.href = this.targetPath;
      });
    }
  }
}
</script>

<style scoped>

</style>