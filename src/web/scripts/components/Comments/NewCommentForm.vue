<template>
  <div>
    <form name="NewCommentForm">
      <div class="form-group mb-2">
        <label
            for="NewCommentForm_email"
        >
          {{ t('input.label.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="NewCommentForm_email"
            name="NewCommentForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('input.placeholder.email')"
        />
      </div>
      <div class="form-group mb-2">
        <label
            for="NewCommentForm_title"
        >
          {{ t('input.label.title') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="NewCommentForm_title"
            name="NewCommentForm_title"
            v-model="formModel.title"
            required
            :placeholder="t('input.placeholder.title')"
        />
      </div>
      <div class="form-group mb-2">
        <label
            for="NewCommentForm_content"
        >
          {{ t('input.label.content') }} *
        </label>
        <textarea
            type="email"
            class="form-control"
            id="NewCommentForm_content"
            name="NewCommentForm_content"
            v-model="formModel.content"
            required
            :placeholder="t('input.placeholder.content')"
        ></textarea>
      </div>


      <div>
        <div v-if="formSubmitMessage !== ''">{{ formSubmitMessageContext }} | {{ formSubmitMessage }}</div>
      </div>
      <div>
        <button
            type="button"
            :disabled="!formValid"
            @click="submitHandler"
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
  assigned_id: 0,
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
    parent: Number,
    onSubmit: Function,
    afterSubmit: Function,
    parentTitle: String,
  },
  mounted: function () {
    if (this.profileEmail) this.formModel.email = this.profileEmail;
    if (this.parentTitle) this.formModel.title = `RE: ${this.parentTitle}`
    this.formModel.parent = this.parent;
    this.formModel.assigned = this.assigned;
    this.formModel.assigned_id = Number(this.assignedId);
  },
  watch: {
    'formModel': {
      handler: function (nv, ov) {
        this.formValidController(nv);
      },
      deep: true,
    },
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
    submitHandler: function (e) {
      this.processing = true;
      this.formSubmitMessage = '';
      const master = _.cloneDeep(this.formModel);
      this.onSubmit(master).then((response) => {
        if (response.data.id) {
          this.formModel = _.cloneDeep(blankModel);
        } else {
          this.formSubmitMessageContext = 'error';
          this.formSubmitMessage = this.t(`msg.error.request_error`);
        }
        this.processing = false;
        this.afterSubmit(response);
      });
    },
  },
}
</script>

<style scoped>

</style>