<template>
  <button
      class="btn btn-sm btn-success"
      @click="replyCallback"
  >
    {{label}}
  </button>
</template>

<script>
module.exports = {
  props: {
    label: String,
    parentId: Number,
    onReply: Function,
  },
  methods: {
    replyCallback: function (e) {
      e.preventDefault();

      this.onReply({
        parentId: this.parentId,
      });

    },
  },
}
</script>

<style scoped>

</style>