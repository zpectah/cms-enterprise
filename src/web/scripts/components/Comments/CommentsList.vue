<template>
  <div>
      <comment-reply-button
        label="New comment"
        :onReply="onReply"
        :parent-id="0"
      ></comment-reply-button>
    <div>
      <comment-item
          v-for="item in commentsList"
          :id="item.id"
          :author="item.email"
          :title="item.title"
          :content="item.content"
          :children="item.children"
          reply-label="Reply comment"
          :onReply="onReply"
      ></comment-item>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');
const CommentItem = require('./CommentItem');
const CommentReplyButton = require('./CommentReplyButton');
const NewCommentForm = require('./NewCommentForm');

module.exports = {
  components: {
    'comment-item': CommentItem,
    'comment-reply-button': CommentReplyButton,
    'new-comment-form': NewCommentForm,
  },
  data: function () {
    return {
      loading: false,
      commentsList: [],
    };
  },
  props: {
    language: String,
    profileEmail: String,
    assigned: String,
    assignedId: String,
  },
  mounted: function () {
    console.log('...', this.assigned, this.assignedId);
    // get list of comments
    this.loadList();
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    loadList: async function () {
      this.loading = true;
      await get(`/api/get_comments?assigned=${this.assigned}&assigned_id=${this.assignedId}&with_children=true`).then((response) => {
        console.log('get', response);
        if (response.data) {
          this.commentsList = response.data;
          this.loading = false;
        }
      });
    },
    onReply: function (props) {

      console.log('onReply', props, this.assigned, this.assignedId);


    },
    // onSubmit: function (e) {
    //   e.preventDefault();
    //
    //
    //   // on callback...
    //   this.loadList();
    // },
  },
}
</script>

<style scoped>

</style>