import { OutsideBusinessHoursHint, PNVBanner, TemporarilyBarredHint, Verification } from '@/components';
import {
    useGetBusinessHours,
    useGetPhoneNumberVerification,
    useIsAdvertiser,
    useIsAdvertiserBarred,
    useIsAdvertiserNotVerified,
} from '@/hooks/custom-hooks';
import { Loader } from '@deriv-com/ui';
import { MyAdsTable } from './MyAdsTable';
import './MyAds.scss';

const MyAds = () => {
    const isAdvertiserBarred = useIsAdvertiserBarred();
    const { isScheduleAvailable } = useGetBusinessHours();
    const isAdvertiserNotVerified = useIsAdvertiserNotVerified();
    const isAdvertiser = useIsAdvertiser();
    const { isGetSettingsLoading, shouldShowVerification } = useGetPhoneNumberVerification();

    if (isGetSettingsLoading) {
        return <Loader />;
    }

    if (isAdvertiserNotVerified)
        return (
            <div className='overflow-y-auto h-[calc(100%-11rem)]'>
                <Verification />;
            </div>
        );

    return (
        <div className='flex flex-col h-full my-ads'>
            {isAdvertiserBarred && <TemporarilyBarredHint />}
            {!isScheduleAvailable && !isAdvertiserBarred && <OutsideBusinessHoursHint />}
            {isAdvertiser && shouldShowVerification && <PNVBanner />}
            <MyAdsTable />
        </div>
    );
};
export default MyAds;
