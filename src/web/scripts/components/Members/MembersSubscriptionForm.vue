<template>
  <section>
    <form name="MembersSubscriptionForm">
      <div class="form-group mb-2">
        <label
            for="MembersSubscriptionForm_email"
        >
          {{ t('label.input.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="MembersSubscriptionForm_email"
            name="MembersSubscriptionForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('placeholder.input.email')"
        >
      </div>
      <div>
        <div v-if="formSubmitMessage !== ''">{{ formSubmitMessageContext }} | {{ formSubmitMessage }}</div>
      </div>
      <div>
        <button
            type="button"
            :disabled="!formValid"
            @click="onSubmit"
        >
          {{ t('btn.submit_form') }}
        </button>
      </div>
    </form>
  </section>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');

const blankModel = {
  email: '',
};

module.exports = {
  data: function () {
    return {
      formValid: false,
      formError: {},
      formSubmitMessage: '',
      formSubmitMessageContext: 'error',
      formModel: _.cloneDeep(blankModel),
      processing: false,
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
      this.formSubmitMessage = '';
      this.formError = {};
      if (model.email === '' || model.email.length < 3 || !model.email.match(EMAIL_REGEX)) {
        valid = false;
        if (!model.email.match(EMAIL_REGEX)) {
          this.formError['email'] = this.t('msg.error.input.email_format');
        } else {
          this.formError['email'] = this.t('msg.error.input.required');
        }
      }
      this.formValid = valid;
    },
    onSubmit: async function (e) {
      e.preventDefault();
      this.processing = true;
      this.formSubmitMessage = '';
      const master = _.cloneDeep(this.formModel);
      await get(`/api/get_members?email=${master.email}&check_exist=true`).then((response) => {
        if (response.data && response.data.exist) {
          this.formSubmitMessageContext = 'error';
          this.formSubmitMessage = 'Error: This user is already exist';
          this.processing = false;
        } else {
          master['type'] = 'subscriber';
          master['subscription'] = true;
          master['active'] = true;
          post('/api/register_members', master).then((response) => {
            if (response.data && response.data.id !== 0) {
              this.formSubmitMessageContext = 'success';
              this.formSubmitMessage = 'Success: Your registration was successfully';
              this.formModel = _.cloneDeep(blankModel);
            } else {
              this.formSubmitMessageContext = 'error';
              this.formSubmitMessage = 'Error: Submitting unknown error, try again';
            }
            this.processing = false;
          });
        }
      });
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