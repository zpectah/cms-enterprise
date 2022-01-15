<template>
  <section>
    <form
        name="BasketSummaryForm"
    >
      <h3>{{ t('basket.title.contact_information') }}</h3>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_user_name"
        >
          {{ t('input.label.user_name') }} *
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_user_name"
            name="BasketSummaryForm_user_name"
            v-model="formModel.user_name"
            required
            :placeholder="t('input.placeholder.user_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_company_name"
        >
          {{ t('input.label.company_name') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_company_name"
            name="BasketSummaryForm_company_name"
            v-model="formModel.company_name"
            :placeholder="t('input.placeholder.company_name')"
        >
      </div>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_company_id"
        >
          {{ t('input.label.company_id') }}
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_company_id"
            name="BasketSummaryForm_company_id"
            v-model="formModel.company_id"
            :placeholder="t('input.placeholder.company_id')"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_email"
        >
          {{ t('input.label.email') }} *
        </label>
        <input
            type="email"
            class="form-control"
            id="BasketSummaryForm_email"
            name="BasketSummaryForm_email"
            v-model="formModel.email"
            required
            :placeholder="t('input.placeholder.email')"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_phone"
        >
          {{ t('input.label.phone') }} *
        </label>
        <input
            type="tel"
            class="form-control"
            id="BasketSummaryForm_phone"
            name="BasketSummaryForm_phone"
            v-model="formModel.phone"
            required
            :placeholder="t('input.placeholder.phone')"
        >
      </div>

      <div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_country"
          >
            {{ t('input.label.country') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_country"
              name="BasketSummaryForm_country"
              v-model="formModel.country"
              required
              :placeholder="t('input.placeholder.country')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_city"
          >
            {{ t('input.label.city') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_city"
              name="BasketSummaryForm_city"
              v-model="formModel.city"
              required
              :placeholder="t('input.placeholder.city')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_address"
          >
            {{ t('input.label.address') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_address"
              name="BasketSummaryForm_address"
              v-model="formModel.address"
              required
              :placeholder="t('input.placeholder.address')"
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_zip"
          >
            {{ t('input.label.zip') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_zip"
              name="BasketSummaryForm_zip"
              v-model="formModel.zip"
              required
              :placeholder="t('input.placeholder.zip')"
          >
        </div>
      </div>
      <br />
      <hr />
      <div>
        <h3>{{ t('basket.title.delivery_information') }}</h3>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_country"
          >
            {{ t('input.label.country') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_country"
              name="BasketSummaryForm_delivery_country"
              v-model="formModel.delivery_country"
              :placeholder="t('input.placeholder.country')"
              required
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_city"
          >
            {{ t('input.label.city') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_city"
              name="BasketSummaryForm_delivery_city"
              v-model="formModel.delivery_city"
              :placeholder="t('input.placeholder.city')"
              required
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_address"
          >
            {{ t('input.label.address') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_address"
              name="BasketSummaryForm_delivery_address"
              v-model="formModel.delivery_address"
              :placeholder="t('input.placeholder.address')"
              required
          >
        </div>
        <div class="form-group mb-2">
          <label
              for="BasketSummaryForm_delivery_zip"
          >
            {{ t('input.label.zip') }} *
          </label>
          <input
              type="text"
              class="form-control"
              id="BasketSummaryForm_delivery_zip"
              name="BasketSummaryForm_delivery_zip"
              v-model="formModel.delivery_zip"
              :placeholder="t('input.placeholder.zip')"
              required
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
          {{ t('input.label.description') }}
        </label>
        <textarea
            class="form-control"
            id="BasketSummaryForm_description"
            v-model="formModel.description"
            rows="5"
            :placeholder="t('input.placeholder.description')"
        ></textarea>
      </div>
      <br />
      <hr />
      <h3>{{ t('basket.title.payment_delivery') }}</h3>
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_payment"
        >
          {{ t('input.label.payment') }} *
        </label>
        <select
            class="form-select"
            aria-label="Select payment"
            id="BasketSummaryForm_payment"
            v-model="formModel.payment"
            required
        >
          <option selected disabled value="">{{ t('input.placeholder.payment') }}</option>
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
          {{ t('input.label.delivery') }} *
        </label>
        <select
            class="form-select"
            aria-label="Select delivery"
            id="BasketSummaryForm_delivery"
            v-model="formModel.delivery"
            required
        >
          <option selected disabled value="">{{ t('input.placeholder.delivery') }}</option>
          <option
              v-for="item in options.deliveries"
              v-bind:key="item.value"
              :value="item.value"
          >{{ item.label }}</option>
        </select>
      </div>

    </form>
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
  props: {
    priceUnit: String,
    weightUnit: String,
    btnNextLinkTarget: String,
    btnPrevLinkTarget: String,
    memberEmail: String,
    memberName: String,
    memberAddress: String,
    memberCity: String,
    memberCountry: String,
    memberZip: String,
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
    if (this.memberEmail && this.formModel.email === '') this.formModel.email = this.memberEmail;
    if (this.memberName && this.formModel.user_name === '') this.formModel.user_name = this.memberName;
    if (this.memberAddress && this.formModel.address === '') {
      this.formModel.address = this.memberAddress;
      this.formModel.delivery_address = this.memberAddress;
    }
    if (this.memberCity && this.formModel.city === '') {
      this.formModel.city = this.memberCity;
      this.formModel.delivery_city = this.memberCity;
    }
    if (this.memberCountry && this.formModel.country === '') {
      this.formModel.country = this.memberCountry;
      this.formModel.delivery_country = this.memberCountry;
    }
    if (this.memberZip && this.formModel.zip === '') {
      this.formModel.zip = this.memberZip;
      this.formModel.delivery_zip = this.memberZip;
    }
    if (this.formModel) this.formController(this.formModel);
  },
  methods: {
    t: function (key) {
      return this.$root.t(key);
    },
    formController: function (model) {
      let valid = true;
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

      if (model.delivery_country === '' || model.delivery_country.length < 3) {
        valid = false;
        this.formError['delivery_country'] = this.t('msg.error.input.required');
      }
      if (model.delivery_city === '' || model.delivery_city.length < 3) {
        valid = false;
        this.formError['delivery_city'] = this.t('msg.error.input.required');
      }
      if (model.delivery_address === '' || model.delivery_address.length < 3) {
        valid = false;
        this.formError['delivery_address'] = this.t('msg.error.input.required');
      }
      if (model.delivery_zip === '' || model.delivery_zip.length < 3) {
        valid = false;
        this.formError['delivery_zip'] = this.t('msg.error.input.required');
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