import Vue from 'vue';

import { get } from './utils/http';
import { DEFAULT_LANGUAGE } from './constants';

// Mixins
import BasketMixin from './mixins/Basket.mixin';
import MembersMixin from './mixins/Members.mixin';
import CommentsMixin from './mixins/Comments.mixin';

// Components
import demoComponent from './components/demoComponent';
import ContactForm from './components/ContactForm';

// Vue init
new Vue({
	el: '#vue-app',
	mixins: [BasketMixin, MembersMixin, CommentsMixin],
	components: {
		'demo-component': demoComponent,
		'contact-form': ContactForm,
	},
	data: function () {
		return {
			lang: DEFAULT_LANGUAGE,
			to: {},
			tmpToken: window.TMP_TOKEN,
			memberToken: window.MEMBER_TOKEN,
		};
	},
	mounted: async function () {
		this.lang = this.$el.dataset.lang;
		await get(`/api/get_translations?parsed=true&lang=${this.lang}`).then(
			(response) => {
				if (response.data) this.to = response.data;
			},
		);
	},
	computed: {},
	methods: {
		// Translations
		t: function (key) {
			let label = key;
			if (this.to[key]) {
				label = this.to[key];
			} else {
				// console.warn(`Missing translation key: "${key}"`);
			}

			return label;
		},
	},
});
