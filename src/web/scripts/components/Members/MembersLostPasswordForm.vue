<template>
  <section>
    members-lost-password-form
    <form name="MembersLostPasswordForm">

    </form>
  </section>
</template>

<script>
module.exports = {
  data: function () {
    return {
      formValid: false,
      formError: {},
      formModel: {},
    }
  },
  props: {
    language: String,
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    formController: function (model) {
      let valid = true;
      this.formError = {};

      this.formValid = valid;
    },
    onChange: function (name, value) {
      console.log('onChange', name, value);
    },
  },
  watch: {
    'formModel': {
      handler: function (nv, ov) {
        this.formController(nv);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>