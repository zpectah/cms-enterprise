<template>
  <section>
    <div>{{token}}</div>
    <form name="MembersLostPasswordConfirmForm">
      <div class="form-group mb-2">
        <label
            for="MembersLostPasswordConfirmForm_password"
        >
          {{ t('label.input.password') }} *
        </label>
        <input
            type="password"
            class="form-control"
            id="MembersLostPasswordConfirmForm_password"
            name="MembersLostPasswordConfirmForm_password"
            v-model="formModel.password"
            required
            :placeholder="t('placeholder.input.password')"
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
  password: '',
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
    token: String,
    email: String,
  },
  mounted: function () {},
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    formValidController: function (model) {
      let valid = true;
      // this.formSubmitMessage = '';
      this.formError = {};
      if (model.password === '' || model.password.length < 3) {
        valid = false;
        this.formError['password'] = this.t('msg.error.input.required');
      }
      this.formValid = valid;
    },
    onSubmit: async function (e) {
      e.preventDefault();
      this.processing = true;
      this.formSubmitMessage = '';
      const master = _.cloneDeep(this.formModel);
      if (this.email && this.token) {
        master['email'] = this.email;
        master['token'] = this.token;
        await get(`/api/get_members?email=${master.email}&check_exist=true`).then((response) => {
          if (response.data && response.data.exist) {
            post('/api/member_create_new_password', master).then((response) => {
              switch(response.message) {
                case 'member_password_reset_success':
                  this.formSubmitMessageContext = 'success';
                  this.formSubmitMessage = this.t('msg.success.member_password_reset_success');
                  this.formModel = _.cloneDeep(blankModel);
                  break;

                case 'member_password_already_reset':
                  this.formSubmitMessageContext = 'info';
                  this.formSubmitMessage = this.t('msg.info.member_password_already_reset');
                  break;

                case 'token_not_found':
                  this.formSubmitMessageContext = 'error';
                  this.formSubmitMessage = this.t('msg.error.token_not_found');
                  break;

                case 'request_not_found':
                  this.formSubmitMessageContext = 'error';
                  this.formSubmitMessage = this.t('msg.error.request_not_found');
                  break;

                default:
                case 'member_password_reset_error':
                  this.formSubmitMessageContext = 'error';
                  this.formSubmitMessage = this.t('msg.error.member_password_reset_error');
                  break;

              }
              this.processing = false;
            });
          } else {
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t('msg.error.member_not_exist');
            this.processing = false;
          }
        });
      } else {
        this.formSubmitMessageContext = 'error';
        this.formSubmitMessage = this.t('msg.error.unknown_request');
        this.processing = false;
      }
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