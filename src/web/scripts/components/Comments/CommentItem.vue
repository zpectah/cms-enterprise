<template>
  <article>
    {{id}} | {{author}}
    <br />
    {{title}}
    <br />
    {{content}}
    <br />
    <comment-reply-button
        :label="replyLabel"
        :onReply="onReply"
        :parent-id="id"
    ></comment-reply-button>
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
          :onReply="onReply"
      ></comment-item>
    </div>
  </article>
</template>

<script>
const CommentReplyButton = require('./CommentReplyButton');

module.exports = {
  name: 'comment-item',
  components: {
    'comment-reply-button': CommentReplyButton,
  },
  props: {
    id: Number,
    author: String,
    title: String,
    content: String,
    children: Array,
    replyLabel: String,
    onReply: Function,
  },
}
</script>

<style scoped>

</style>