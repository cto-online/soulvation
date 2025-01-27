export declare function useUserMenu(): {
    isOpen: import("vue").Ref<boolean, boolean>;
    toggle: () => void;
    close: () => void;
    handleLogout: () => Promise<void>;
};
