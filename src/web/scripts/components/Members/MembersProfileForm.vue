<template>
  <section>
    <form name="MembersProfileForm">
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_first_name"
        >
          {{ t('input.label.first_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_first_name"
            name="MembersProfileForm_first_name"
            v-model="formModel.first_name"
            required
            :placeholder="t('input.placeholder.first_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_middle_name"
        >
          {{ t('input.label.middle_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_middle_name"
            name="MembersProfileForm_middle_name"
            v-model="formModel.middle_name"
            :placeholder="t('input.placeholder.middle_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_last_name"
        >
          {{ t('input.label.last_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_last_name"
            name="MembersProfileForm_last_name"
            v-model="formModel.last_name"
            required
            :placeholder="t('input.placeholder.last_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_nick_name"
        >
          {{ t('input.label.nick_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_nick_name"
            name="MembersProfileForm_nick_name"
            v-model="formModel.nick_name"
            :placeholder="t('input.placeholder.nick_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_phone"
        >
          {{ t('input.label.phone') }} *
        </label>
        <input
            type="tel"
            class="form-control"
            id="MembersProfileForm_phone"
            name="MembersProfileForm_phone"
            v-model="formModel.phone"
            required
            :placeholder="t('input.placeholder.phone')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_password"
        >
          {{ t('input.label.password') }}
        </label>
        <input
            type="password"
            class="form-control"
            id="MembersProfileForm_password"
            name="MembersProfileForm_password"
            v-model="formModel.password"
            :placeholder="t('input.placeholder.password')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_country"
        >
          {{ t('input.label.country') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_country"
            name="MembersProfileForm_country"
            v-model="formModel.country"
            :placeholder="t('input.placeholder.country')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_city"
        >
          {{ t('input.label.city') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_city"
            name="MembersProfileForm_city"
            v-model="formModel.city"
            :placeholder="t('input.placeholder.city')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_address"
        >
          {{ t('input.label.address') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_address"
            name="MembersProfileForm_address"
            v-model="formModel.address"
            :placeholder="t('input.placeholder.address')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="MembersProfileForm_zip"
        >
          {{ t('input.label.zip') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="MembersProfileForm_zip"
            name="MembersProfileForm_zip"
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
              id="MembersProfileForm_subscription"
          >
          <label
              class="form-check-label"
              for="MembersProfileForm_subscription"
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
  subscription: false,
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
    tmpTokenControl: String,
  },
  mounted: async function () {
    await get('/api/get_member_profile').then((response) => {
      if (response.id) {
        this.formModel.first_name = response.first_name;
        this.formModel.middle_name = response.middle_name;
        this.formModel.last_name = response.last_name;
        this.formModel.nick_name = response.nick_name;
        this.formModel.phone = response.phone;
        this.formModel.country = response.country;
        this.formModel.city = response.city;
        this.formModel.address = response.address;
        this.formModel.subscription = response.subscription;
        this.formModel.zip = response.zip;
      }
    });
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    formValidController: function (model) {
      let valid = true;
      // this.formSubmitMessage = '';
      this.formError = {};
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
      if (model.password !== '' && model.password.length < 3) {
        valid = false;
        this.formError['password'] = this.t('msg.error.input.not_enough_chars');
      }
      this.formValid = valid;
    },
    onSubmit: async function (e) {
      e.preventDefault();
      this.processing = true;
      this.formSubmitMessage = '';
      const master = _.cloneDeep(this.formModel);
      await post('/api/update_member_profile', master).then((response) => {
        if (response.rows === 1) {
          this.formSubmitMessage = this.t('msg.success.update_success');
          this.formSubmitMessageContext = 'success';
        } else if (response.rows === 0) {
          this.formSubmitMessage = this.t('msg.info.nothing_to_update');
          this.formSubmitMessageContext = 'info';
        } else {
          this.formSubmitMessage = this.t('msg.error.process_error');
          this.formSubmitMessageContext = 'error';
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