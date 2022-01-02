<template>
  <section>
    <form name="BasketSummaryForm">
      ...
      form ui components
      <br />
      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_user_name"
        >
          {{ inputLabelName }}
        </label>
        <input
          type="text"
          class="form-control"
          id="BasketSummaryForm_user_name"
          name="BasketSummaryForm_user_name"
          v-model="formModel.user_name"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_email"
        >
          E-mail
        </label>
        <input
            type="email"
            class="form-control"
            id="BasketSummaryForm_email"
            name="BasketSummaryForm_email"
            v-model="formModel.email"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_phone"
        >
          Phone
        </label>
        <input
            type="tel"
            class="form-control"
            id="BasketSummaryForm_phone"
            name="BasketSummaryForm_phone"
            v-model="formModel.phone"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_country"
        >
          Country
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_country"
            name="BasketSummaryForm_country"
            v-model="formModel.country"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_city"
        >
          City
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_city"
            name="BasketSummaryForm_city"
            v-model="formModel.city"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_address"
        >
          Address
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_address"
            name="BasketSummaryForm_address"
            v-model="formModel.address"
        >
      </div>

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_zip"
        >
          ZIP
        </label>
        <input
            type="text"
            class="form-control"
            id="BasketSummaryForm_zip"
            name="BasketSummaryForm_zip"
            v-model="formModel.zip"
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
        ></textarea>
      </div>

      <br />

      <div class="form-group mb-2">
        <label
            for="BasketSummaryForm_payment"
        >
          Payment select
        </label>
        <select
            class="form-select"
            aria-label="Select payment"
            id="BasketSummaryForm_payment"
            v-model="formModel.payment"
        >
          <option selected disabled>Open this select menu</option>
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
          Delivery select
        </label>
        <select
            class="form-select"
            aria-label="Select delivery"
            id="BasketSummaryForm_delivery"
            v-model="formModel.delivery"
        >
          <option selected disabled>Open this select menu</option>
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
    model data:
    <br />
    <pre>
      <code>
        {{ formModel }}
      </code>
    </pre>
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
    };
  },
  mounted: function () {},
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
        console.log('formModel', this.formModel);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>