<template>
  <div class="widget-content">
    <div>
      <div
          v-for="item in storage_items"
          v-bind:key="item.id"
      >
        #{{ item.id }} x{{ item.count }} _ price...
        <button
            type="button"
            @click="(e) => remove(e, item.id)"
        >
          Remove
        </button>
      </div>
    </div>
    <br />
    <div>
      Total price: {{ basket_price.total }} {{ priceUnit }}
    </div>
    <br />
    <button
        class="btn btn-outline-secondary"
        @click="basketLinkHandler"
        v-bind:disabled="no_items"
    >
      {{ btnBasketLabel }}
    </button>
  </div>
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
    btnBasketLabel: String,
    btnBasketTarget: String,
  },
  watch: {
    '$parent.basket_items': function (nv, ov) {
      this.storage_items = this.$parent.basket_items;
      this.no_items = this.$parent.basket_items.length === 0;
    },
  },
  methods: {
    remove: function (e, id) {
      e.preventDefault();
      this.$parent.remove_from_basket(id)
    },
    basketLinkHandler: function (e) {
      e.preventDefault();
      window.location.href = this.btnBasketTarget;
    },
  },
}
</script>

<style scoped></style>