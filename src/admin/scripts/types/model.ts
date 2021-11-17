export interface commonItemProps {
	id: number | string;
	name: string;
	active: boolean;
}

export interface CategoriesItemProps extends commonItemProps {}

export interface MenuItemProps extends commonItemProps {}

export interface MenuItemItemProps extends commonItemProps {}

export interface PagesItemProps extends commonItemProps {}

export interface PostsItemProps extends commonItemProps {}

export interface TagsItemProps extends commonItemProps {}

export interface TranslationsItemProps extends commonItemProps {}

export interface UploadsItemProps extends commonItemProps {}

export interface UsersItemProps extends commonItemProps {}

export interface RequestsItemProps extends commonItemProps {}

export interface MembersItemProps extends commonItemProps {}

export interface DeliveriesItemProps extends commonItemProps {}

export interface DistributorsItemProps extends commonItemProps {}

export interface OrdersItemProps extends commonItemProps {}

export interface PaymentsItemProps extends commonItemProps {}

export interface ProducersItemProps extends commonItemProps {}

export interface ProductsItemProps extends commonItemProps {}

export interface ProductsOptionsItemProps extends commonItemProps {}

export interface StoresItemProps extends commonItemProps {}
