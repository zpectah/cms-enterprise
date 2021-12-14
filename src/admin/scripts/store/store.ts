import { storage } from '../../../../utils/utils';
import CFG from '../config';
import LangService from '../services/Language.service';
import ThemeService from '../services/Theme.service';
import { storeProps } from '../types/store';

const UiStoreState: storeProps = {
	language: LangService.get(),
	theme: ThemeService.get(),
	sideBarOpen: storage.get(CFG.project.keys.sidebar) === 'true',
	toasts: [],
};

export default UiStoreState;
