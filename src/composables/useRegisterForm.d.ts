export declare function useRegisterForm(): {
    email: import("vue").Ref<string, string>;
    password: import("vue").Ref<string, string>;
    confirmPassword: import("vue").Ref<string, string>;
    loading: boolean;
    error: string | null;
    isPasswordMatch: import("vue").ComputedRef<boolean>;
    passwordMismatchError: import("vue").ComputedRef<"Passwords do not match" | null>;
    emailError: import("vue").Ref<string | null, string | null>;
    passwordError: import("vue").Ref<string | null, string | null>;
    confirmPasswordError: import("vue").Ref<string | null, string | null>;
    handleRegister: () => Promise<void>;
    resetForm: () => void;
};
