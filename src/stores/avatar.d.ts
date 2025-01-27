export type AvatarType = 'human' | 'robot' | 'animal';
export interface AvatarTraits {
    [key: string]: string;
}
export interface Avatar {
    id: string;
    type: AvatarType;
    traits: AvatarTraits;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAvatarPayload {
    type: AvatarType;
    traits: AvatarTraits;
}
export declare const useAvatarStore: import("pinia").StoreDefinition<"avatar", Pick<{
    avatars: import("vue").Ref<{
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    }[], Avatar[] | {
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    }[]>;
    selectedAvatar: import("vue").ComputedRef<{
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    } | undefined>;
    totalAvatars: import("vue").ComputedRef<number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    createAvatar: (payload: CreateAvatarPayload) => Promise<Avatar | null>;
    deleteAvatar: (id: string) => Promise<boolean>;
    selectAvatar: (id: string | null) => void;
    updateAvatar: (id: string, traits: AvatarTraits) => Promise<boolean>;
}, "loading" | "error" | "avatars">, Pick<{
    avatars: import("vue").Ref<{
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    }[], Avatar[] | {
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    }[]>;
    selectedAvatar: import("vue").ComputedRef<{
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    } | undefined>;
    totalAvatars: import("vue").ComputedRef<number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    createAvatar: (payload: CreateAvatarPayload) => Promise<Avatar | null>;
    deleteAvatar: (id: string) => Promise<boolean>;
    selectAvatar: (id: string | null) => void;
    updateAvatar: (id: string, traits: AvatarTraits) => Promise<boolean>;
}, "selectedAvatar" | "totalAvatars">, Pick<{
    avatars: import("vue").Ref<{
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    }[], Avatar[] | {
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    }[]>;
    selectedAvatar: import("vue").ComputedRef<{
        id: string;
        type: AvatarType;
        traits: AvatarTraits;
        createdAt: string;
        updatedAt: string;
    } | undefined>;
    totalAvatars: import("vue").ComputedRef<number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    createAvatar: (payload: CreateAvatarPayload) => Promise<Avatar | null>;
    deleteAvatar: (id: string) => Promise<boolean>;
    selectAvatar: (id: string | null) => void;
    updateAvatar: (id: string, traits: AvatarTraits) => Promise<boolean>;
}, "createAvatar" | "deleteAvatar" | "selectAvatar" | "updateAvatar">>;
