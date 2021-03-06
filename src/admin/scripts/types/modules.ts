import { UsersItemProps } from './model';

export interface cmsSettingsObjectProps {
	comments_anonymous_active?: boolean;
	comments_global_active?: boolean;
	company_address?: string;
	company_bank?: string;
	company_city?: string;
	company_country?: string;
	company_description?: string;
	company_email?: string[];
	company_id?: string;
	company_location?: number[];
	company_name?: string;
	company_phone?: number[];
	company_zip?: string;
	content_redactor_approval?: boolean;
	form_email_recipients?: string[];
	form_email_sender?: string;
	language_active?: string[];
	language_default?: string;
	language_installed?: string[];
	module_crm_active?: boolean;
	module_crm_installed?: boolean;
	module_market_active?: boolean;
	module_market_installed?: boolean;
	project_name?: string;
	web_meta_description?: string;
	web_meta_keywords?: string[];
	web_meta_robots?: string;
	web_meta_title?: string;
	web_mode_debug?: boolean;
	web_mode_maintenance?: boolean;
	members_login_active?: boolean;
	members_lostPassword_active?: boolean;
	members_profile_active?: boolean;
	members_register_active?: boolean;
}

export type ProfileItemProps = UsersItemProps;
