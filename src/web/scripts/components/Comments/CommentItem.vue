<template>
  <article>
    {{id}} | {{author}}
    <br />
    {{title}}
    <br />
    {{content}}
    <br />
    <button
        @click="toggle"
        class="btn btn-sm btn-outline-success"
    >
      {{isOpen ? t('btn.close') : replyLabel}}
    </button>
    <br />
    <div v-if="isOpen">
      <new-comment-form
          :language="language"
          :profile-email="profileEmail"
          :assigned="assigned"
          :assigned-id="assignedId"
          :parent="id"
          :onSubmit="onSubmit"
          :afterSubmit="afterSubmitHandler"
          :parentTitle="title"
      ></new-comment-form>
    </div>
    <br />
    <div
        v-if="children.length > 0"
        style="padding-left: 1rem"
    >
      <comment-item
          v-for="item in children"
          :id="item.id"
          :author="item.email"
          :title="item.title"
          :content="item.content"
          :children="item.children"
          :reply-label="replyLabel"
          :onSubmit="onSubmit"
          :afterSubmit="afterSubmit"
          :language="language"
          :profile-email="profileEmail"
          :assigned="assigned"
          :assigned-id="assignedId"
      ></comment-item>
    </div>
  </article>
</template>

<script>
const NewCommentForm = require('./NewCommentForm');

module.exports = {
  name: 'comment-item',
  components: {
    'new-comment-form': NewCommentForm,
  },
  data: function () {
    return {
      isOpen: false,
    };
  },
  props: {
    language: String,
    profileEmail: String,
    assigned: String,
    assignedId: String,
    onSubmit: Function,
    afterSubmit: Function,
    id: Number,
    author: String,
    title: String,
    content: String,
    children: Array,
    replyLabel: String,
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    toggle: function (e) {
      e.preventDefault();
      this.isOpen = !this.isOpen;
    },
    afterSubmitHandler: function (response) {
      this.isOpen = false;
      this.afterSubmit(response);
    },
  }
}
</script>

<style scoped>

</style>