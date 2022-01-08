import MembersRegistrationForm from '../components/Members/MembersRegistrationForm';
import MembersSubscriptionForm from '../components/Members/MembersSubscriptionForm';
import MembersLoginForm from '../components/Members/MembersLoginForm';
import MembersLostPasswordForm from '../components/Members/MembersLostPasswordForm';
import MembersLostPasswordConfirmForm from '../components/Members/MembersLostPasswordConfirmForm';
import MembersProfileForm from '../components/Members/MembersProfileForm';

const MembersMixin = {
	components: {
		'members-registration-form': MembersRegistrationForm,
		'members-subscription-form': MembersSubscriptionForm,
		'members-login-form': MembersLoginForm,
		'members-lost-password-form': MembersLostPasswordForm,
		'members-lost-password-confirm-form': MembersLostPasswordConfirmForm,
		'members-profile-form': MembersProfileForm,
	},
	mounted: function () {},
	methods: {},
};

export default MembersMixin;
