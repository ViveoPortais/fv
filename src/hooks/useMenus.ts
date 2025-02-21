import { create } from 'zustand';

interface LateralMenuProps {
    isMenuOpen: boolean;
    changeMenu: (value: boolean) => void;
}

export const useLateralMenu = create<LateralMenuProps>(
    (set) => ({
        isMenuOpen: true,
        changeMenu: () => set((state) => ({ isMenuOpen:!state.isMenuOpen }))
    })
)

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    changeMobileMenu: (value: boolean) => void;
}

export const useMobilelMenu = create<MobileMenuProps>(
    (set) => ({
        isMobileMenuOpen: false,
        changeMobileMenu: () => set((state) => ({ isMobileMenuOpen:!state.isMobileMenuOpen }))
    })
)

interface LateralRightMenu {
    isMenuOpen: boolean;
    changeMenu: (value: boolean) => void;
}

export const useLateralRightMenu = create<LateralRightMenu>(
    (set) => ({
        isMenuOpen: false,
        changeMenu: () => set((state) => ({ isMenuOpen:!state.isMenuOpen }))
    })
)
