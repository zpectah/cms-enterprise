<template>
  <div class="widget-content">
    <div>
      <div
          v-for="item in storage_items"
          v-bind:key="item.id"
      >
        {{ item.id }} _ {{ item.count }}
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
      Total price: {{ total_price }} {{ priceUnit }}
    </div>
    <br />
    <button
        class="btn btn-outline-secondary"
        @click="basketLinkHandler"
    >
      {{ btnBasketLabel }}
    </button>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    const items = this.$parent.basket_items;

    return {
      total_price: this.$parent.basket_total_price,
      storage_items: items,
      no_items: items.length === 0,
    };
  },
  props: {
    priceUnit: String,
    btnBasketLabel: String,
    btnBasketTarget: String,
  },
  computed: {},
  methods: {
    remove: function (e, id) {
      e.preventDefault();
      this.$parent.basket_remove_item(id)
    },
    basketLinkHandler: function (e) {
      e.preventDefault();
      window.location.href = this.btnBasketTarget;
    },
  },
}
</script>

<style scoped></style>