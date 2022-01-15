<template>
  <section class="section-page">
    <h3>{{ t('basket.title.products') }}</h3>
    <div>

      <table class="w-100">
        <tbody>
        <tr
            v-for="item in storage_items"
            v-bind:key="item.id"
        >
          <th>{{ item.title }}</th>
          <td>{{ item.price }} {{ priceUnit }}</td>
          <td>
            <input
                type="number"
                v-bind:value="item.count"
                v-on:change="e => updateCount(e, item.id)"
                v-on:blur="e => updateCount(e, item.id)"
                v-on:paste="e => updateCount(e, item.id)"
            />
          </td>
          <td>
            {{ item.count * item.price }} {{ priceUnit }}
          </td>
          <td>
            {{ item.in_stock ? t('label.in_stock') : t('label.not_in_stock') }}
          </td>
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
      </table>

    </div>
    <br />
    <div>
      {{ t('label.count_total') }}: {{ getItemsCount() }}
    </div>
    <div>
      {{ t('label.price_total') }}: {{ getItemsPrice() }} {{ priceUnit }}
    </div>
    <br />
    <button
        class="btn btn-outline-secondary"
        @click="nextLinkHandler"
        v-bind:disabled="no_items"
    >
      {{ t('btn.next_step') }}
    </button>
  </section>
</template>

<script>
module.exports = {
  data: function () {
    return {
      storage_items: this.$parent.basket_items,
      basket_price: this.$parent.basket_price,
      no_items: this.$parent.basket_items.length === 0,
    }
  },
  props: {
    priceUnit: String,
    btnNextLinkTarget: String,
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
    updateCount: function (e, id) {
      this.$parent.update_basket_item(id, Number(e.target.value))
    },
    nextLinkHandler: function (e) {
      e.preventDefault();

      if (!this.no_items) {
        window.location.href = this.btnNextLinkTarget;
      }
    },
  },
  watch: {
    '$parent.basket_items': function (nv, ov) {
      this.storage_items = this.$parent.basket_items;
      this.no_items = this.$parent.basket_items.length === 0;
    },
  },
}
</script>

<style scoped>

</style>