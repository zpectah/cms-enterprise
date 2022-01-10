<template>
  <div>
    <form name="NewCommentForm">
      <div class="form-group mb-2">
        <label
            for="NewCommentForm_email"
        >
          {{ t('label.input.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="NewCommentForm_email"
            name="NewCommentForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('placeholder.input.email')"
        />
      </div>
      <div class="form-group mb-2">
        <label
            for="NewCommentForm_title"
        >
          {{ t('label.input.title') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="NewCommentForm_title"
            name="NewCommentForm_title"
            v-model="formModel.title"
            required
            :placeholder="t('placeholder.input.title')"
        />
      </div>
      <div class="form-group mb-2">
        <label
            for="NewCommentForm_content"
        >
          {{ t('label.input.content') }} *
        </label>
        <textarea
            type="email"
            class="form-control"
            id="NewCommentForm_content"
            name="NewCommentForm_content"
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
  </div>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');

const blankModel = {
  email: '',
  title: '',
  content: '',
  assigned: '',
  assigned_id: '',
  parent: 0,
  status: 1,
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
    profileEmail: String,
    assigned: String,
    assignedId: String,
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
  },
}
</script>

<style scoped>

</style>