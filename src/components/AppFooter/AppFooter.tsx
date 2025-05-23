import { LANGUAGES } from '@/constants';
import { useModalManager } from '@/hooks';
import { useTranslations } from '@deriv-com/translations';
import { DesktopLanguagesModal } from '@deriv-com/ui';
import { LocalStorageConstants, LocalStorageUtils, URLConstants } from '@deriv-com/utils';
import AccountLimits from './AccountLimits';
import Deriv from './Deriv';
import Endpoint from './Endpoint';
import FullScreen from './FullScreen';
import HelpCentre from './HelpCentre';
import LanguageSettings from './LanguageSettings';
import Livechat from './Livechat';
import NetworkStatus from './NetworkStatus';
import ResponsibleTrading from './ResponsibleTrading';
import ServerTime from './ServerTime';
import WhatsApp from './WhatsApp';
import './AppFooter.scss';

const prodServerUrls = ['green.derivws.com', 'blue.derivws.com', 'red.derivws.com'];

const AppFooter = () => {
    const { localize, switchLanguage } = useTranslations();
    const { hideModal, isModalOpenFor, showModal } = useModalManager();
    const currentLang = LocalStorageUtils.getValue<string>('i18n_language') || 'EN';

    const openLanguageSettingModal = () => showModal('DesktopLanguagesModal');
    const origin = window.location.origin;
    const isProduction = origin === URLConstants.derivP2pProduction;
    const isProdServer = prodServerUrls.includes(localStorage.getItem(LocalStorageConstants.configServerURL) || '');

    return (
        <footer className='app-footer'>
            <FullScreen />
            <LanguageSettings openLanguageSettingModal={openLanguageSettingModal} />
            <HelpCentre />
            <div className='app-footer__vertical-line' />
            {/* TODO: Implement theme */}
            {/* <ChangeTheme /> */}
            <AccountLimits />
            <ResponsibleTrading />
            <Deriv />
            <Livechat />
            <WhatsApp />
            <div className='app-footer__vertical-line' />
            <ServerTime />
            <div className='app-footer__vertical-line' />
            <NetworkStatus />
            {!isProduction && !isProdServer && <Endpoint />}

            {isModalOpenFor('DesktopLanguagesModal') && (
                <DesktopLanguagesModal
                    headerTitle={localize('Select Language')}
                    isModalOpen
                    languages={LANGUAGES}
                    onClose={hideModal}
                    onLanguageSwitch={code => {
                        switchLanguage(code);
                        hideModal();
                        window.location.reload();
                    }}
                    selectedLanguage={currentLang}
                />
            )}
        </footer>
    );
};

export default AppFooter;
