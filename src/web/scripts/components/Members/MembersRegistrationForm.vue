<template>
  <section>
    <form name="MembersRegistrationForm">
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_first_name"
        >
          {{ t('label.input.first_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_first_name"
            name="MembersRegistrationForm_first_name"
            v-model="formModel.first_name"
            required
            :placeholder="t('placeholder.input.first_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_middle_name"
        >
          {{ t('label.input.middle_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_middle_name"
            name="MembersRegistrationForm_middle_name"
            v-model="formModel.middle_name"
            :placeholder="t('placeholder.input.middle_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_last_name"
        >
          {{ t('label.input.last_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_last_name"
            name="MembersRegistrationForm_last_name"
            v-model="formModel.last_name"
            required
            :placeholder="t('placeholder.input.last_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_nick_name"
        >
          {{ t('label.input.nick_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_nick_name"
            name="MembersRegistrationForm_nick_name"
            v-model="formModel.nick_name"
            :placeholder="t('placeholder.input.nick_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_email"
        >
          {{ t('label.input.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="MembersRegistrationForm_email"
            name="MembersRegistrationForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('placeholder.input.email')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_phone"
        >
          {{ t('label.input.phone') }} *
        </label>
        <input
            type="tel"
            class="form-control"
            id="MembersRegistrationForm_phone"
            name="MembersRegistrationForm_phone"
            v-model="formModel.phone"
            required
            :placeholder="t('placeholder.input.phone')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_password"
        >
          {{ t('label.input.password') }} *
        </label>
        <input
            type="password"
            class="form-control"
            id="MembersRegistrationForm_password"
            name="MembersRegistrationForm_password"
            v-model="formModel.password"
            required
            :placeholder="t('placeholder.input.password')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_country"
        >
          {{ t('label.input.country') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_country"
            name="MembersRegistrationForm_country"
            v-model="formModel.country"
            :placeholder="t('placeholder.input.country')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_city"
        >
          {{ t('label.input.city') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_city"
            name="MembersRegistrationForm_city"
            v-model="formModel.city"
            :placeholder="t('placeholder.input.city')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_address"
        >
          {{ t('label.input.address') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_address"
            name="MembersRegistrationForm_address"
            v-model="formModel.address"
            :placeholder="t('placeholder.input.address')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersRegistrationForm_zip"
        >
          {{ t('label.input.zip') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersRegistrationForm_zip"
            name="MembersRegistrationForm_zip"
            v-model="formModel.zip"
            :placeholder="t('placeholder.input.zip')"
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
            {{ t('label.input.subscription') }}
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
          this.formSubmitMessage = 'Error: This user is already exist';
          this.processing = false;
        } else {
          master['type'] = 'customer';
          // master['position'] = '';
          // master['phone_alt'] = [];
          // master['email_alt'] = [];
          // master['description'] = '';
          master['active'] = true;
          post('/api/member_register', master).then((response) => {
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