<template>
  <section>
    <form name="MembersLostPasswordForm">
      <div class="form-group mb-2">
        <label
            for="MembersLostPasswordForm_email"
        >
          {{ t('label.input.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="MembersLostPasswordForm_email"
            name="MembersLostPasswordForm_email"
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
      // this.formSubmitMessage = '';
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
          post('/api/member_lost_password', master).then((response) => {
            switch (response.message) {
              case 'request_was_send':
                this.formSubmitMessageContext = 'success';
                this.formSubmitMessage = this.t('msg.success.request_was_send');
                this.formModel = _.cloneDeep(blankModel);
                break;

              case 'member_not_active':
                this.formSubmitMessageContext = 'error';
                this.formSubmitMessage = this.t('msg.error.member_not_active');
                break;

              case 'member_is_deleted':
                this.formSubmitMessageContext = 'error';
                this.formSubmitMessage = this.t('msg.error.member_is_deleted');
                break;

              case 'member_not_found':
                this.formSubmitMessageContext = 'error';
                this.formSubmitMessage = this.t('msg.error.member_not_found');
                break;

              default:
                this.formSubmitMessageContext = 'error';
                this.formSubmitMessage = this.t('msg.error.process_error');
                break;

            }
            this.processing = false;
          });
        } else {
          this.formSubmitMessageContext = 'error';
          this.formSubmitMessage = this.t('msg.error.member_not_found');
          this.processing = false;
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