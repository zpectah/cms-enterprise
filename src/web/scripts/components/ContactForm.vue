<template>
  <section>
    <form name="ContactForm">
      <div class="form-group mb-2">
        <label
            for="ContactForm_email"
        >
          {{ t('label.input.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="ContactForm_email"
            name="ContactForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('placeholder.input.email')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="ContactForm_title"
        >
          {{ t('label.input.title') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="ContactForm_title"
            name="ContactForm_title"
            v-model="formModel.title"
            required
            :placeholder="t('placeholder.input.title')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="ContactForm_content"
        >
          {{ t('label.input.content') }} *
        </label>
        <textarea
            class="form-control"
            id="ContactForm_content"
            name="ContactForm_content"
            v-model="formModel.content"
            required
            :placeholder="t('placeholder.input.content')"
        ></textarea>
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
const { EMAIL_REGEX } = require('../constants');
const { post } = require('../utils/http');

const blankModel = {
  email: '',
  title: '',
  content: '',
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
    };
  },
  props: {
    language: String,
    profileEmail: String,
  },
  mounted: function () {
    if (this.profileEmail) {
      this.formModel.email = this.profileEmail;
    }
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
      if (model.title === '' || model.title.length < 3) {
        valid = false;
        this.formError['title'] = this.t('msg.error.input.required');
      }
      if (model.content === '' || model.content.length < 3) {
        valid = false;
        this.formError['content'] = this.t('msg.error.input.required');
      }
      this.formValid = valid;
    },
    onSubmit: async function (e) {
      e.preventDefault();
      this.processing = true;
      this.formSubmitMessage = '';
      const master = _.cloneDeep(this.formModel);
      await post('/api/contact_form', master).then((response) => {
        switch (response.message) {
          case 'message_sent':
            this.formSubmitMessageContext = 'success';
            this.formSubmitMessage = this.t(`msg.success.message_sent`);
            this.formModel = _.cloneDeep(blankModel);
            break;

          case 'invalid_request':
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t(`msg.error.invalid_request`);
            break;

          default:
          case 'unknown_error':
            this.formSubmitMessageContext = 'error';
            this.formSubmitMessage = this.t(`msg.error.unknown_error`);
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