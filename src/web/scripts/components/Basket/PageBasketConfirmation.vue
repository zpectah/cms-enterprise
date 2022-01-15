<template>
  <section>
    <h3>{{ t('basket.title.products') }}</h3>
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
    <h3>{{ t('basket.title.payment_delivery') }}</h3>
    <table>
      <tbody>
      <tr>
        <th>{{ t('input.label.payment') }}</th>
        <td>{{ selected_delivery.lang && selected_delivery.lang[this.$root.lang].title }}</td>
        <td>{{ selected_delivery.item_price }} {{ priceUnit }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.delivery') }}</th>
        <td>{{ selected_payment.lang && selected_payment.lang[this.$root.lang].title }}</td>
        <td>{{ selected_payment.item_price }} {{ priceUnit }}</td>
      </tr>
      </tbody>
    </table>
    <br />
    <hr />
    <h3>{{ t('basket.title.contact_information') }}</h3>
    <table>
      <tbody>
      <tr>
        <th>{{ t('input.label.user_name') }}</th>
        <td>{{ basket_summary.user_name }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.email') }}</th>
        <td>{{ basket_summary.email }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.phone') }}</th>
        <td>{{ basket_summary.phone }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.country') }}</th>
        <td>{{ basket_summary.country }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.city') }}</th>
        <td>{{ basket_summary.city }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.address') }}</th>
        <td>{{ basket_summary.address }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.zip') }}</th>
        <td>{{ basket_summary.zip }}</td>
      </tr>
      <tr>
        <th>{{ t('input.label.description') }}</th>
        <td>{{ basket_summary.description }}</td>
      </tr>
      </tbody>
    </table>
    <br />
    <hr />
    <h3>{{ t('basket.title.weight') }}</h3>
    <div>
      {{ t('label.weight_items') }}: {{ getItemsWeight() }} {{ weightUnit }}
    </div>
    <br />
    <hr />
    <h3>{{ t('basket.title.price') }}</h3>
    <div>
      {{ t('label.price_items') }}: {{ getItemsPrice() }} {{ priceUnit }}
      <br />
      {{ t('label.price_delivery_payment') }}: {{ getPaymentDeliveryPrice() }} {{ priceUnit }}
      <br />
      {{ t('label.price_total') }}: {{ getItemsPrice() + getPaymentDeliveryPrice() }} {{ priceUnit }}
    </div>
    <br />
    <div>
      <button
          class="btn btn-outline-secondary"
          @click="prevLinkHandler"
      >
        {{ t('btn.prev_step') }}
      </button>
      <button
          class="btn btn-outline-secondary"
          @click="nextLinkHandler"
          v-bind:disabled="no_items"
      >
        {{ t('btn.order_finish') }}
      </button>
    </div>
  </section>
</template>

<script>
const { storage, string } = require('../../../../../utils/utils');
const { get, post } = require('../../utils/http');
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
    weightUnit: String,
    btnNextLinkTarget: String,
    btnPrevLinkTarget: String,
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
    t: function (key) {
      return this.$root.t(key);
    },
    getItemsWeight: function () {
      let weight = 0;
      this.storage_items.map((item) => {
        weight = weight + Number(item.weight) * Number(item.count);
      });

      return weight;
    },
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
    nextLinkHandler: async function (e) {
      e.preventDefault();
      if (!this.no_items) {
        const price_total = this.getItemsPrice() + this.getPaymentDeliveryPrice();
        const id = `${Date.now()}-${string.getRandom(5, 'uppercase')}`;
        const items = [];
        this.storage_items.map((item) => {
          items.push(`${item.id}:${item.count}`);
        });
        const master = {
          name: id,
          type: 'basket',
          payment: this.basket_summary.payment,
          delivery: this.basket_summary.delivery,
          customer_name: this.basket_summary.user_name,
          company_name: this.basket_summary.company_name,
          company_id: this.basket_summary.company_id,
          email: this.basket_summary.email,
          phone: this.basket_summary.phone,
          country: this.basket_summary.country,
          city: this.basket_summary.city,
          address: this.basket_summary.address,
          zip: this.basket_summary.zip,
          description: this.basket_summary.description,
          delivery_country: this.basket_summary.delivery_country,
          delivery_city: this.basket_summary.delivery_city,
          delivery_address: this.basket_summary.delivery_address,
          delivery_zip: this.basket_summary.delivery_zip,
          items: items,
          price_total: price_total,
          status: 1,
        };
        await this.$parent.order_finish(
            master,
            id,
            price_total,
            this.priceUnit,
            this.btnNextLinkTarget,
        );
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