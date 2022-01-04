<template>
  <section class="section-page">
    <h3>Products</h3>
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
            <button
                type="button"
                @click="(e) => remove(e, item.id)"
            >
              {{ $root.t('btn.remove') }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <br />
    <div>
      {{ labelPrice }}: {{ basket_price.total }} {{ priceUnit }}
    </div>
    <br />
    <button
        class="btn btn-outline-secondary"
        @click="nextLinkHandler"
        v-bind:disabled="no_items"
    >
      {{ btnNextLinkLabel }}
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
    btnNextLinkLabel: String,
    btnRemoveLabel: String,
    labelPrice: String,
  },
  methods: {
    remove: function (e, id) {
      e.preventDefault();
      this.$parent.remove_from_basket(id)
    },
    updateCount: function (e, id) {
      this.$parent.update_basket_item(id, Number(e.target.value))
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