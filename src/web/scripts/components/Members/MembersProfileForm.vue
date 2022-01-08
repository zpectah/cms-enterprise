<template>
  <section>
    members-profile-form
    <form name="MembersProfileForm">

    </form>
  </section>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');

const blankModel = {
  password: '',
};

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
    formValidController: function (model) {
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
        this.formValidController(nv);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>