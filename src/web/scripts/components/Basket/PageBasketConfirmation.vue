<template>
  <section>
    <h3>Products</h3>
    <table>
      <tbody>
      <tr
          v-for="item in storage_items"
          v-bind:key="item.id"
      >
        <td>
          {{ item.count }}x
        </td>
        <th>
          {{ item.title }}
        </th>
        <td>
          {{ item.price }} {{ priceUnit }}
        </td>
        <td>
          {{ item.count * item.price }} {{ priceUnit }}
        </td>
      </tr>
      </tbody>
    </table>
    <br />
    <hr />
    <h3>Payment and delivery</h3>
    <table>
      <tbody>
      <tr>
        <th>Payment</th>
        <td>{{ selected_delivery.name }}</td>
        <td>{{ selected_delivery.item_price }} {{ priceUnit }}</td>
      </tr>
      <tr>
        <th>Delivery</th>
        <td>{{ selected_payment.name }}</td>
        <td>{{ selected_payment.item_price }} {{ priceUnit }}</td>
      </tr>
      </tbody>
    </table>
    <br />
    <hr />
    <h3>Contact information</h3>
    <table>
      <tbody>
      <tr>
        <th>User name</th>
        <td>{{ basket_summary.user_name }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{ basket_summary.email }}</td>
      </tr>
      <tr>
        <th>Phone</th>
        <td>{{ basket_summary.phone }}</td>
      </tr>
      <tr>
        <th>Country</th>
        <td>{{ basket_summary.country }}</td>
      </tr>
      <tr>
        <th>City</th>
        <td>{{ basket_summary.city }}</td>
      </tr>
      <tr>
        <th>Address</th>
        <td>{{ basket_summary.address }}</td>
      </tr>
      <tr>
        <th>Zip</th>
        <td>{{ basket_summary.zip }}</td>
      </tr>
      <tr>
        <th>Description</th>
        <td>{{ basket_summary.description }}</td>
      </tr>
      </tbody>
    </table>
    <br />
    <hr />
    <h3>Price</h3>
    <div>
      Price of items: {{ getItemsPrice() }} {{ priceUnit }}
      <br />
      Price of delivery and payment: {{ getPaymentDeliveryPrice() }} {{ priceUnit }}
      <br />
      Total price: {{ getItemsPrice() + getPaymentDeliveryPrice() }} {{ priceUnit }}
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
const { storage } = require('../../../../../utils/utils');
const { get } = require('../../utils/http');
const { STORAGE_KEY_BASKET_SUMMARY } = require('../../constants');

module.exports = {
  data: function () {
    return {
      storage_items: this.$parent.basket_items,
      no_items: this.$parent.basket_items.length === 0,
      basket_summary: {},
      selected_delivery: {},
      selected_payment: {},
      _deliveries: [],
      _payments: [],
    };
  },
  props: {
    priceUnit: String,
    btnPrevLinkTarget: String,
    btnPrevLinkLabel: String,
    btnNextLinkTarget: String,
    btnNextLinkLabel: String,
    labelPrice: String, // TODO: smazat
  },
  mounted: async function () {
    const storage_model = storage.get(STORAGE_KEY_BASKET_SUMMARY);
    if (storage_model) this.basket_summary = JSON.parse(storage_model);
    await get('/api/get_deliveries').then((response) => {
      if (response.data) {
        this._deliveries = response.data;
        this.selected_delivery = this._deliveries.find((item) => Number(item.id) === Number(this.basket_summary.delivery));
      }
    });
    await get('/api/get_payments').then((response) => {
      if (response.data) {
        this._payments = response.data;
        this.selected_payment = this._payments.find((item) => Number(item.id) === Number(this.basket_summary.payment));
      }
    });
  },
  methods: {
    getItemsPrice: function () {
      let price = 0;
      this.storage_items.map((item) => {
        price = price + Number(item.price) * Number(item.count);
      });

      return price;
    },
    getPaymentDeliveryPrice: function () {
      const fd = this._deliveries && this._deliveries.find((item) => Number(item.id) === Number(this.selected_delivery.id));
      const fp = this._payments && this._payments.find((item) => Number(item.id) === Number(this.selected_payment.id));
      let price = 0;
      if (fd) price = price + Number(fd.item_price);
      if (fp) price = price + Number(fp.item_price);

      return price;
    },
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
  },
}
</script>

<style scoped>

</style>