<template>
  <section>
    <form
        name="BasketSummaryForm"
    >
      <h3>Contact information</h3>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_user_name"
        >
          {{ inputLabelName }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_user_name"
            name="BasketSummaryForm_user_name"
            v-model="formModel.user_name"
            required
            @keydown="(e) => onChange('user_name', e.target.value)"
            @keyup="(e) => onChange('user_name', e.target.value)"
            @change="(e) => onChange('user_name', e.target.value)"
            @paste="(e) => onChange('user_name', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_email"
        >
          E-mail *
        </label>
        <input
            type="email"
            class="form-control"
            id="BasketSummaryForm_email"
            name="BasketSummaryForm_email"
            v-model="formModel.email"
            required
            @keydown="(e) => onChange('email', e.target.value)"
            @keyup="(e) => onChange('email', e.target.value)"
            @change="(e) => onChange('email', e.target.value)"
            @paste="(e) => onChange('email', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_phone"
        >
          Phone *
        </label>
        <input
            type="tel"
            class="form-control"
            id="BasketSummaryForm_phone"
            name="BasketSummaryForm_phone"
            v-model="formModel.phone"
            required
            @keydown="(e) => onChange('phone', e.target.value)"
            @keyup="(e) => onChange('phone', e.target.value)"
            @change="(e) => onChange('phone', e.target.value)"
            @paste="(e) => onChange('phone', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_country"
        >
          Country *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_country"
            name="BasketSummaryForm_country"
            v-model="formModel.country"
            required
            @keydown="(e) => onChange('country', e.target.value)"
            @keyup="(e) => onChange('country', e.target.value)"
            @change="(e) => onChange('country', e.target.value)"
            @paste="(e) => onChange('country', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_city"
        >
          City *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_city"
            name="BasketSummaryForm_city"
            v-model="formModel.city"
            required
            @keydown="(e) => onChange('city', e.target.value)"
            @keyup="(e) => onChange('city', e.target.value)"
            @change="(e) => onChange('city', e.target.value)"
            @paste="(e) => onChange('city', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_address"
        >
          Address *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_address"
            name="BasketSummaryForm_address"
            v-model="formModel.address"
            required
            @keydown="(e) => onChange('address', e.target.value)"
            @keyup="(e) => onChange('address', e.target.value)"
            @change="(e) => onChange('address', e.target.value)"
            @paste="(e) => onChange('address', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_zip"
        >
          ZIP *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_zip"
            name="BasketSummaryForm_zip"
            v-model="formModel.zip"
            required
            @keydown="(e) => onChange('zip', e.target.value)"
            @keyup="(e) => onChange('zip', e.target.value)"
            @change="(e) => onChange('zip', e.target.value)"
            @paste="(e) => onChange('zip', e.target.value)"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_description"
        >
          Description
        </label>
        <textarea
            class="form-control"
            id="BasketSummaryForm_description"
            v-model="formModel.description"
            placeholder="Enter something..."
            rows="5"
            @keydown="(e) => onChange('description', e.target.value)"
            @keyup="(e) => onChange('description', e.target.value)"
            @change="(e) => onChange('description', e.target.value)"
            @paste="(e) => onChange('description', e.target.value)"
        ></textarea>
      </div>

      <br />
      <hr />
      <h3>Payment and delivery</h3>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_payment"
        >
          Payment *
        </label>
        <select
            class="form-select"
            aria-label="Select payment"
            id="BasketSummaryForm_payment"
            v-model="formModel.payment"
            required
            @change="(e) => onChange('payment', e.target.value)"
        >
          <option selected disabled value="''">Select payment</option>
          <option
              v-for="item in options.payments"
              v-bind:key="item.value"
              :value="item.value"
          >{{ item.label }} ... price ...</option>
        </select>
      </div>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_delivery"
        >
          Delivery *
        </label>
        <select
            class="form-select"
            aria-label="Select delivery"
            id="BasketSummaryForm_delivery"
            v-model="formModel.delivery"
            required
            @change="(e) => onChange('delivery', e.target.value)"
        >
          <option selected disabled value="''">Select delivery</option>
          <option
              v-for="item in options.deliveries"
              v-bind:key="item.value"
              :value="item.value"
          >{{ item.label }} ... price ...</option>
        </select>
      </div>

    </form>
    <br />
    <div>
      {{ labelPrice }}: {{ basket_price.total }} {{ priceUnit }}
    </div>
    <br />
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
          v-bind:disabled="no_items || !formValid"
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
      options: {
        payments: [
          {
            label: 'Payment 1',
            value: '1'
          },
          {
            label: 'Payment 2',
            value: '2'
          },
          {
            label: 'Payment 3',
            value: '3'
          }
        ],
        deliveries: [
          {
            label: 'Delivery 1',
            value: '1'
          },
          {
            label: 'Delivery 2',
            value: '2'
          },
          {
            label: 'Delivery 3',
            value: '3'
          }
        ],
      },
      formValid: false,
      formError: {},
      formModel: {
        payment: '',
        delivery: '',
        user_name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        zip: '',
        description: '',
      },
      storage_items: this.$parent.basket_items,
      basket_price: this.$parent.basket_price,
      no_items: this.$parent.basket_items.length === 0,
      //
      _deliveries: [],
      _payments: [],
    };
  },
  mounted: async function () {
    await get('/api/get_deliveries').then((response) => {
      if (response.data) {
        console.log('get_deliveries', response);
        this._deliveries = response.data;
      }
    });
    await get('/api/get_payments').then((response) => {
      if (response.data) {
        console.log('get_payments', response);
        this._payments = response.data;
      }
    });

    const storage_model = storage.get(STORAGE_KEY_BASKET_SUMMARY);
    if (storage_model) this.formModel = JSON.parse(storage_model);
    if (this.formModel) this.formController(this.formModel);
  },
  props: {
    priceUnit: String,
    btnPrevLinkTarget: String,
    btnPrevLinkLabel: String,
    btnNextLinkTarget: String,
    btnNextLinkLabel: String,
    labelPrice: String,
    //
    inputLabelName: String,
  },
  methods: {
    formController: function (model) {
      if (
          model.user_name === ''
          && model.payment === ''
          && model.delivery === ''
          && model.email === ''
          && model.phone === ''
          && model.country === ''
          && model.city === ''
          && model.address === ''
          && model.zip === ''
      ) {
        this.formValid = false;
      } else {
        // TODO: ... valid email adress
        this.formValid = true;
        // TODO: ... set errors
        // this.formError[key] = '';
      }
    },
    onChange: function (name, value) {
      const model_string = JSON.stringify(this.formModel);
      storage.set(STORAGE_KEY_BASKET_SUMMARY, model_string);
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
    '$parent.basket_price': function (nv, ov) {
      this.basket_price = this.$parent.basket_price;
    },
    'formModel': {
      handler: function (nv, ov) {
        this.formController(nv);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>