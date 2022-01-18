<template>
  <div v-if="isShown">
    <div>
      <div>{{ t('cookiesBar.title') }}</div>
      <div>{{ t('cookiesBar.content') }}</div>
    </div>
    <div>
      <button @click="confirm">
        {{ t('btn.confirm') }}
      </button>
      <button @click="close">
        {{ t('btn.close') }}
      </button>
    </div>
  </div>
</template>

<script>
const { cookies } = require('../../../../utils/utils');
const { EU_COOKIES_KEY } = require('../constants');

module.exports = {
  data: function () {
    return {
      isShown: false,
    };
  },
  mounted: function () {
    let c = cookies.get(EU_COOKIES_KEY);
    if (!c) {
      this.isShown = true;
    }
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    close: function (e) {
      e.preventDefault();
      this.isShown = false;
    },
    confirm: function (e) {
      e.preventDefault();
      this.isShown = false;
      cookies.set(EU_COOKIES_KEY, 'true', 365);
    },
  },
}
</script>

<style scoped>

</style>