import { appModelProps } from '../types/app';
import { oneOfModelItemProps } from '../types/model';
import CategoriesNew from '../modules/Categories/Categories.new';
import MenuNew from '../modules/Menu/Menu.new';
import PostsNew from '../modules/Posts/Posts.new';
import PagesNew from '../modules/Pages/Pages.new';
import TagsNew from '../modules/Tags/Tags.new';
import TranslationsNew from '../modules/Translations/Translations.new';
import UploadsNew from '../modules/Uploads/Uploads.new';
import UsersNew from '../modules/Users/Users.new';
import MembersNew from '../modules/Members/Members.new';
import DeliveriesNew from '../modules/Deliveries/Deliveries.new';
import DistributorsNew from '../modules/Distributors/Distributors.new';
import OrdersNew from '../modules/Orders/Orders.new';
import PaymentsNew from '../modules/Payments/Payments.new';
import ProducersNew from '../modules/Producers/Producers.new';
import ProductsNew from '../modules/Products/Products.new';
import StoresNew from '../modules/Stores/Stores.new';

export const blankDataItem = {
	Categories: CategoriesNew,
	Menu: MenuNew,
	Posts: PostsNew,
	Pages: PagesNew,
	Tags: TagsNew,
	Translations: TranslationsNew,
	Uploads: UploadsNew,
	Users: UsersNew,
	Members: MembersNew,
	Deliveries: DeliveriesNew,
	Distributors: DistributorsNew,
	Orders: OrdersNew,
	Payments: PaymentsNew,
	Producers: ProducersNew,
	Products: ProductsNew,
	Stores: StoresNew,
};

export default (
	id: number | string,
	model: appModelProps,
	items: oneOfModelItemProps[],
) => {
	let item;

	if (id == 'new') {
		item = blankDataItem[model];
	} else {
		item = items.find((item) => item.id == id);
	}

	return item;
};
