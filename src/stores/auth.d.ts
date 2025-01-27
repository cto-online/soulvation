import { type User } from 'firebase/auth';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", Pick<{
    user: import("vue").Ref<{
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null, User | {
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    loginWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<import("@firebase/auth").UserCredential>;
    registerWithEmail: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
    loginWithGoogle: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithMicrosoft: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithX: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithApple: () => Promise<import("@firebase/auth").UserCredential>;
    logout: () => Promise<void>;
}, "user" | "loading" | "error">, Pick<{
    user: import("vue").Ref<{
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null, User | {
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    loginWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<import("@firebase/auth").UserCredential>;
    registerWithEmail: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
    loginWithGoogle: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithMicrosoft: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithX: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithApple: () => Promise<import("@firebase/auth").UserCredential>;
    logout: () => Promise<void>;
}, "isAuthenticated">, Pick<{
    user: import("vue").Ref<{
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null, User | {
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    loginWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<import("@firebase/auth").UserCredential>;
    registerWithEmail: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
    loginWithGoogle: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithMicrosoft: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithX: () => Promise<import("@firebase/auth").UserCredential>;
    loginWithApple: () => Promise<import("@firebase/auth").UserCredential>;
    logout: () => Promise<void>;
}, "loginWithEmail" | "registerWithEmail" | "loginWithGoogle" | "loginWithMicrosoft" | "loginWithX" | "loginWithApple" | "logout">>;
