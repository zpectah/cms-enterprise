<template>
  <section>
    <form name="MembersRegistrationForm">
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_first_name"
        >
          {{ t('input.label.first_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_first_name"
            name="MembersRegistrationForm_first_name"
            v-model="formModel.first_name"
            required
            :placeholder="t('input.placeholder.first_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_middle_name"
        >
          {{ t('input.label.middle_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_middle_name"
            name="MembersRegistrationForm_middle_name"
            v-model="formModel.middle_name"
            :placeholder="t('input.placeholder.middle_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_last_name"
        >
          {{ t('input.label.last_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_last_name"
            name="MembersRegistrationForm_last_name"
            v-model="formModel.last_name"
            required
            :placeholder="t('input.placeholder.last_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_nick_name"
        >
          {{ t('input.label.nick_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_nick_name"
            name="MembersRegistrationForm_nick_name"
            v-model="formModel.nick_name"
            :placeholder="t('input.placeholder.nick_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_email"
        >
          {{ t('input.label.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="MembersRegistrationForm_email"
            name="MembersRegistrationForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('input.placeholder.email')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_phone"
        >
          {{ t('input.label.phone') }} *
        </label>
        <input
            type="tel"
            class="form-control"
            id="MembersRegistrationForm_phone"
            name="MembersRegistrationForm_phone"
            v-model="formModel.phone"
            required
            :placeholder="t('input.placeholder.phone')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_password"
        >
          {{ t('input.label.password') }} *
        </label>
        <input
            type="password"
            class="form-control"
            id="MembersRegistrationForm_password"
            name="MembersRegistrationForm_password"
            v-model="formModel.password"
            required
            :placeholder="t('input.placeholder.password')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_country"
        >
          {{ t('input.label.country') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_country"
            name="MembersRegistrationForm_country"
            v-model="formModel.country"
            :placeholder="t('input.placeholder.country')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_city"
        >
          {{ t('input.label.city') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_city"
            name="MembersRegistrationForm_city"
            v-model="formModel.city"
            :placeholder="t('input.placeholder.city')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_address"
        >
          {{ t('input.label.address') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_address"
            name="MembersRegistrationForm_address"
            v-model="formModel.address"
            :placeholder="t('input.placeholder.address')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_zip"
        >
          {{ t('input.label.zip') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_zip"
            name="MembersRegistrationForm_zip"
            v-model="formModel.zip"
            :placeholder="t('input.placeholder.zip')"
        >
      </div>
      <div class="form-group mb-2">
        <div class="form-check">
          <input
              type="checkbox"
              class="form-check-input"
              v-model="formModel.subscription"
              id="MembersRegistrationForm_subscription"
          >
          <label
              class="form-check-label"
              for="MembersRegistrationForm_subscription"
          >
            {{ t('input.label.subscription') }}
          </label>
        </div>
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
  phone: '',
  password: '',
  nick_name: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  country: '',
  city: '',
  address: '',
  zip: '',
  subscription: true,
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
      if (model.phone === '' || model.phone.length < 3) {
        valid = false;
        this.formError['phone'] = this.t('msg.error.input.required');
      }
      if (model.first_name === '' || model.first_name.length < 3) {
        valid = false;
        this.formError['first_name'] = this.t('msg.error.input.required');
      }
      if (model.last_name === '' || model.last_name.length < 3) {
        valid = false;
        this.formError['last_name'] = this.t('msg.error.input.required');
      }
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
      await get(`/api/get_members?email=${master.email}&check_exist=true`).then((response) => {
        if (response.data && response.data.exist) {
          this.formSubmitMessageContext = 'error';
          this.formSubmitMessage = this.t('msg.error.member_already_exist');
          this.processing = false;
        } else {
          master['type'] = 'customer';
          master['active'] = true;
          post('/api/member_register', master).then((response) => {
            if (response.data && response.data.id !== 0) {
              this.formSubmitMessageContext = 'success';
              this.formSubmitMessage = this.t('msg.success.registration_success');
              this.formModel = _.cloneDeep(blankModel);
            } else {
              this.formSubmitMessageContext = 'error';
              this.formSubmitMessage = this.t('msg.error.registration_error');
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