import { render, screen } from '@testing-library/react';
import PNVBanner from '../PNVBanner';

const mockUseBalance = {
    data: { balance: 100 },
};

jest.mock('@deriv-com/ui', () => ({
    ...jest.requireActual('@deriv-com/ui'),
    useDevice: jest.fn(() => ({
        isMobile: false,
    })),
}));

jest.mock('@deriv-com/api-hooks', () => ({
    ...jest.requireActual('@deriv-com/api-hooks'),
    useAccountList: jest.fn(() => ({
        data: [
            {
                account_category: 'trading',
                account_type: 'binary',
                broker: 'CR',
                currency: 'USD',
                loginid: 'CR90000383',
            },
        ],
    })),
    useAuthData: jest.fn().mockReturnValue({
        isAuthorized: true,
    }),
    useBalance: jest.fn(() => mockUseBalance),
    useGetSettings: jest.fn(() => ({ email: 'test@gmail.com' })),
}));

describe('PNVBanner', () => {
    it('should render the proper message for existing users who do not have their phone number verified', async () => {
        render(<PNVBanner />);

        expect(screen.getByText('Verify your phone number to continue using Deriv P2P.')).toBeInTheDocument();
    });
});
