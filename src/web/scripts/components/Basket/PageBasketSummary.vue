<template>
  <section>
    <form
        name="BasketSummaryForm"
    >
      <h3>{{ t('title.basket.contact_information') }}</h3>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_user_name"
        >
          {{ t('label.input.user_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_user_name"
            name="BasketSummaryForm_user_name"
            v-model="formModel.user_name"
            required
            :placeholder="t('placeholder.input.user_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_company_name"
        >
          {{ t('label.input.company_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_company_name"
            name="BasketSummaryForm_company_name"
            v-model="formModel.company_name"
            :placeholder="t('placeholder.input.company_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_company_id"
        >
          {{ t('label.input.company_id') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_company_id"
            name="BasketSummaryForm_company_id"
            v-model="formModel.company_id"
            :placeholder="t('placeholder.input.company_id')"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_email"
        >
          {{ t('label.input.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="BasketSummaryForm_email"
            name="BasketSummaryForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('placeholder.input.email')"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_phone"
        >
          {{ t('label.input.phone') }} *
        </label>
        <input
            type="tel"
            class="form-control"
            id="BasketSummaryForm_phone"
            name="BasketSummaryForm_phone"
            v-model="formModel.phone"
            required
            :placeholder="t('placeholder.input.phone')"
        >
      </div>

      <div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_country"
          >
            {{ t('label.input.country') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_country"
              name="BasketSummaryForm_country"
              v-model="formModel.country"
              required
              :placeholder="t('placeholder.input.country')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_city"
          >
            {{ t('label.input.city') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_city"
              name="BasketSummaryForm_city"
              v-model="formModel.city"
              required
              :placeholder="t('placeholder.input.city')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_address"
          >
            {{ t('label.input.address') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_address"
              name="BasketSummaryForm_address"
              v-model="formModel.address"
              required
              :placeholder="t('placeholder.input.address')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_zip"
          >
            {{ t('label.input.zip') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_zip"
              name="BasketSummaryForm_zip"
              v-model="formModel.zip"
              required
              :placeholder="t('placeholder.input.zip')"
          >
        </div>
      </div>
      <br />
      <hr />
      <div>
        <h3>{{ t('title.basket.delivery_information') }}</h3>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_country"
          >
            {{ t('label.input.country') }}
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_country"
              name="BasketSummaryForm_delivery_country"
              v-model="formModel.delivery_country"
              :placeholder="t('placeholder.input.country')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_city"
          >
            {{ t('label.input.city') }}
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_city"
              name="BasketSummaryForm_delivery_city"
              v-model="formModel.delivery_city"
              :placeholder="t('placeholder.input.city')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_address"
          >
            {{ t('label.input.address') }}
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_address"
              name="BasketSummaryForm_delivery_address"
              v-model="formModel.delivery_address"
              :placeholder="t('placeholder.input.address')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_zip"
          >
            {{ t('label.input.zip') }}
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_zip"
              name="BasketSummaryForm_delivery_zip"
              v-model="formModel.delivery_zip"
              :placeholder="t('placeholder.input.zip')"
          >
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_description"
        >
          {{ t('label.input.description') }}
        </label>
        <textarea
            class="form-control"
            id="BasketSummaryForm_description"
            v-model="formModel.description"
            rows="5"
            :placeholder="t('placeholder.input.description')"
        ></textarea>
      </div>
      <br />
      <hr />
      <h3>{{ t('title.basket.payment_delivery') }}</h3>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_payment"
        >
          {{ t('label.input.payment') }} *
        </label>
        <select
            class="form-select"
            aria-label="Select payment"
            id="BasketSummaryForm_payment"
            v-model="formModel.payment"
            required
            @change="(e) => onChange('payment', e.target.value)"
        >
          <option selected disabled value="">{{ t('placeholder.input.payment') }}</option>
          <option
              v-for="item in options.payments"
              v-bind:key="item.value"
              :value="item.value"
          >{{ item.label }}</option>
        </select>
      </div>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_delivery"
        >
          {{ t('label.input.delivery') }} *
        </label>
        <select
            class="form-select"
            aria-label="Select delivery"
            id="BasketSummaryForm_delivery"
            v-model="formModel.delivery"
            required
            @change="(e) => onChange('delivery', e.target.value)"
        >
          <option selected disabled value="">{{ t('placeholder.input.delivery') }}</option>
          <option
              v-for="item in options.deliveries"
              v-bind:key="item.value"
              :value="item.value"
          >{{ item.label }}</option>
        </select>
      </div>

    </form>
    <hr />
    <h3>{{ t('title.basket.weight') }}</h3>
    <div>
      {{ t('label.weight_items') }}: {{ getItemsWeight() }} {{ weightUnit }}
    </div>
    <br />
    <hr />
    <div>
      {{ t('label.price_items') }}: {{ getItemsPrice() }} {{ priceUnit }}
      <br />
      {{ t('label.price_delivery_payment') }}: {{ getPaymentDeliveryPrice() }} {{ priceUnit }}
      <br />
      {{ t('label.price_total') }}: {{ getItemsPrice() + getPaymentDeliveryPrice() }} {{ priceUnit }}
    </div>
    <br />
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
          v-bind:disabled="no_items || !formValid"
      >
        {{ t('btn.next_step') }}
      </button>
    </div>
  </section>
</template>

<script>
const _ = require('lodash');
const { storage } = require('../../../../../utils/utils');
const { get } = require('../../utils/http');
const { STORAGE_KEY_BASKET_SUMMARY, EMAIL_REGEX } = require('../../constants');

const blankModel = {
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
  //
  //
  company_name: '',
  company_id: '',

  delivery_country: '',
  delivery_city: '',
  delivery_address: '',
  delivery_zip: '',
};

module.exports = {
  data: function () {
    return {
      options: {
        payments: [],
        deliveries: [],
      },
      formValid: false,
      formError: {},
      formModel: _.cloneDeep(blankModel),
      storage_items: this.$parent.basket_items,
      no_items: this.$parent.basket_items.length === 0,
      _deliveries: [],
      _payments: [],
    };
  },
  mounted: async function () {
    const storage_model = storage.get(STORAGE_KEY_BASKET_SUMMARY);
    await get('/api/get_deliveries').then((response) => {
      if (response.data) {
        let tmp = [];
        this._deliveries = response.data;
        this._deliveries.map((item) => {
          tmp.push({
            label: `${item.lang[this.$root.lang].title} - ${item.item_price}${this.priceUnit}`,
            value: item.id
          });
        });
        this.options.deliveries = tmp;
      }
    });
    await get('/api/get_payments').then((response) => {
      if (response.data) {
        let tmp = [];
        this._payments = response.data;
        this._payments.map((item) => {
          tmp.push({
            label: `${item.lang[this.$root.lang].title} - ${item.item_price}${this.priceUnit}`,
            value: item.id
          });
        });
        this.options.payments = tmp;
      }
    });
    if (storage_model) this.formModel = JSON.parse(storage_model);
    if (this.formModel) this.formController(this.formModel);
  },
  props: {
    priceUnit: String,
    weightUnit: String,
    btnNextLinkTarget: String,
    btnPrevLinkTarget: String,
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    formController: function (model) {
      let valid = true;
      let touched = false;
      this.formError = {};
      if (model.user_name === '' || model.user_name.length < 3) {
        valid = false;
        this.formError['user_name'] = this.t('msg.error.input.required');
      }
      if (model.payment === '') {
        valid = false;
        this.formError['payment'] = this.t('msg.error.input.required');
      }
      if (model.delivery === '') {
        valid = false;
        this.formError['delivery'] = this.t('msg.error.input.required');
      }
      if (model.email === '' || model.email.length < 3 || !model.email.match(EMAIL_REGEX)) {
        valid = false;
        if (!model.email.match(EMAIL_REGEX)) {
          this.formError['email'] = this.t('msg.error.input.email_format');
        } else {
          this.formError['email'] = this.t('msg.error.input.required');
        }
      }
      if (model.phone === '' || model.phone.length < 3) {
        valid = false;
        this.formError['phone'] = this.t('msg.error.input.required');
      }
      if (model.country === '' || model.country.length < 3) {
        valid = false;
        this.formError['country'] = this.t('msg.error.input.required');
      }
      if (model.city === '' || model.city.length < 3) {
        valid = false;
        this.formError['city'] = this.t('msg.error.input.required');
      }
      if (model.address === '' || model.address.length < 3) {
        valid = false;
        this.formError['address'] = this.t('msg.error.input.required');
      }
      if (model.zip === '' || model.zip.length < 3) {
        valid = false;
        this.formError['zip'] = this.t('msg.error.input.required');
      }
      this.formValid = valid;

      const old_state = storage.get(STORAGE_KEY_BASKET_SUMMARY);
      const new_state = JSON.stringify(this.formModel);
      if (old_state !== new_state) storage.set(STORAGE_KEY_BASKET_SUMMARY, new_state);
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
      const fd = this._deliveries && this._deliveries.find((item) => Number(item.id) === Number(this.formModel.delivery));
      const fp = this._payments && this._payments.find((item) => Number(item.id) === Number(this.formModel.payment));
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