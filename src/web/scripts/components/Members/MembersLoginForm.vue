<template>
  <section>
    <form name="MembersLoginForm">
      <div class="form-group mb-2">
        <label
            for="MembersLoginForm_email"
        >
          {{ t('input.label.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="MembersLoginForm_email"
            name="MembersLoginForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('input.placeholder.email')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersLoginForm_password"
        >
          {{ t('input.label.password') }} *
        </label>
        <input
            type="password"
            class="form-control"
            id="MembersLoginForm_password"
            name="MembersLoginForm_password"
            v-model="formModel.password"
            required
            :placeholder="t('input.placeholder.password')"
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
    targetPath: String,
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
      if (model.password === '' || model.password.length < 3) {
        valid = false;
        this.formError['password'] = this.t('msg.error.input.required');
      }
      this.formValid = valid;
    },
    onSubmit: function (e) {
      e.preventDefault();
      this.processing = true;
      this.formSubmitMessage = '';
      const master = _.cloneDeep(this.formModel);
      post('/api/member_login', master).then((response) => {
        switch (response.message) {
          case 'member_login_success':
            this.formModel = _.cloneDeep(blankModel);
            window.location.href = this.targetPath;
            break;

          case 'member_is_deleted':
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t(`msg.error.member_is_deleted`);
            break;

          case 'member_password_not_match':
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t(`msg.error.member_password_not_match`);
            break;

          case 'member_not_active':
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t(`msg.error.member_not_active`);
            break;

          default:
          case 'member_not_found':
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t(`msg.error.member_not_found`);
            break;

        }
        this.processing = false;
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