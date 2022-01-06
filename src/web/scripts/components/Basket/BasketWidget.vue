<template>
  <div class="widget-content">
    <div>
      <table>
        <tbody>
        <tr
            v-for="item in storage_items"
            v-bind:key="item.id"
        >
          <th>{{ item.count }}x {{ item.title }}</th>
          <td>{{ item.price * item.count }} {{ priceUnit }}</td>
          <td>
            <button
                type="button"
                @click="(e) => remove(e, item.id)"
            >
              {{ t('btn.remove') }}
            </button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td>
            {{ t('label.count_total') }}: {{ getItemsCount() }}
          </td>
          <td colspan="2">
            {{ t('label.price_total') }}: {{ getItemsPrice() }} {{ priceUnit }}
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <br />
    <br />
    <button
        class="btn btn-outline-secondary"
        @click="basketLinkHandler"
        v-bind:disabled="no_items"
    >
      {{ t('btn.show_basket') }}
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
  },
  watch: {
    '$parent.basket_items': function (nv, ov) {
      this.storage_items = this.$parent.basket_items;
      this.no_items = this.$parent.basket_items.length === 0;
    },
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    getItemsPrice: function () {
      let price = 0;
      this.storage_items.map((item) => {
        price = price + Number(item.price) * Number(item.count);
      });

      return price;
    },
    getItemsCount: function () {
      let count = 0;
      this.storage_items.map((item) => {
        count = count + Number(item.count);
      });

      return count;
    },
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