export declare function useLoginForm(): {
    email: import("vue").Ref<string, string>;
    password: import("vue").Ref<string, string>;
    rememberMe: import("vue").Ref<boolean, boolean>;
    loading: boolean;
    error: string | null;
    emailError: import("vue").Ref<string | null, string | null>;
    passwordError: import("vue").Ref<string | null, string | null>;
    handleLogin: () => Promise<void>;
    resetForm: () => void;
};
