<template>
  <div>
    <div>
      <new-comment-form
          :language="language"
          :profile-email="profileEmail"
          :assigned="assigned"
          :assigned-id="assignedId"
          :parent="0"
          :onSubmit="onSubmit"
          :afterSubmit="afterSubmit"
          v-if="userShouldComment"
      ></new-comment-form>
    </div>
    <br />
    <br />
    <div>
      <comment-item
          v-for="item in commentsList"
          :id="item.id"
          :author="item.email"
          :title="item.title"
          :content="item.content"
          :children="item.children"
          reply-label="Reply comment"
          :onSubmit="onSubmit"
          :afterSubmit="afterSubmit"
          :language="language"
          :profile-email="profileEmail"
          :assigned="assigned"
          :assigned-id="assignedId"
          :user-should-comment="userShouldComment"
      ></comment-item>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');
const CommentItem = require('./CommentItem');
const NewCommentForm = require('./NewCommentForm');

module.exports = {
  components: {
    'comment-item': CommentItem,
    'new-comment-form': NewCommentForm,
  },
  data: function () {
    return {
      loading: false,
      commentsList: [],
      userShouldComment: false,
    };
  },
  props: {
    language: String,
    profileEmail: String,
    assigned: String,
    assignedId: String,
    anonymousActive: String,
  },
  mounted: function () {
    this.loadList();
    if (this.anonymousActive == '1' || this.profileEmail) this.userShouldComment = true;
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    loadList: async function () {
      this.loading = true;
      await get(`/api/get_comments?assigned=${this.assigned}&assigned_id=${this.assignedId}&with_children=true`).then((response) => {
        if (response.data) {
          this.commentsList = response.data;
          this.loading = false;
        }
      });
    },
    onSubmit: function (master) {
      return post('/api/create_comments', master);
    },
    afterSubmit: function (response) {
      this.loadList();
    }
  },
}
</script>

<style scoped>

</style>