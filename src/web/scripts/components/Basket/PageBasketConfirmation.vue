<template>
  <section>
    ...basket confirmation...
    <br />
    <br />
    <div>
      {{ labelPrice }}: {{ basket_price.total }} {{ priceUnit }}
    </div>
    <br />
    <div>
      <button
          class="btn btn-outline-secondary"
          @click="prevLinkHandler"
      >
        {{ btnPrevLinkLabel }}
      </button>
      <button
          class="btn btn-outline-secondary"
          @click="nextLinkHandler"
          v-bind:disabled="no_items"
      >
        {{ btnNextLinkLabel }}
      </button>
    </div>
  </section>
</template>

<script>
module.exports = {
  data: function () {
    return {
      storage_items: this.$parent.basket_items,
      basket_price: this.$parent.basket_price,
      no_items: this.$parent.basket_items.length === 0,
    };
  },
  props: {
    priceUnit: String,
    btnPrevLinkTarget: String,
    btnPrevLinkLabel: String,
    btnNextLinkTarget: String,
    btnNextLinkLabel: String,
    labelPrice: String,
  },
  methods: {
    prevLinkHandler: function (e) {
      e.preventDefault();
      window.location.href = this.btnPrevLinkTarget;
    },
    nextLinkHandler: function (e) {
      e.preventDefault();

      if (this.no_items) {
        console.warn('No items!');
      } else {
        window.location.href = this.btnNextLinkTarget;
      }
    },
  },
  watch: {
    '$parent.basket_items': function (nv, ov) {
      this.storage_items = this.$parent.basket_items;
      this.no_items = this.$parent.basket_items.length === 0;
    },
    '$parent.basket_price': function (nv, ov) {
      this.basket_price = this.$parent.basket_price;
    },
  },
}
</script>

<style scoped>

</style>