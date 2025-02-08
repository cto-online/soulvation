declare module 'pinia' {
    import { ComponentCustomProperties } from 'vue';
    import { Store } from 'pinia';

    export * from '@pinia/types';

    export interface PiniaCustomProperties extends ComponentCustomProperties {
        $pinia: Pinia;
    }

    export interface DefineStoreOptionsBase<S extends StateTree, Store> {
        state?: () => S;
        getters?: Record<string, (state: S) => any>;
        actions?: Record<string, (...args: any[]) => any>;
        persist?: {
            storage?: Storage;
            paths?: string[];
        };
    }

    export type StateTree = Record<string | number | symbol, any>;

    export type Store<
        Id extends string = string,
        S extends StateTree = StateTree,
        G = Record<string, any>,
        A = Record<string, any>
    > = Omit<StoreDefinition<Id, S, G, A>, keyof StoreProperties<S>> &
        StoreProperties<S> &
        UnwrapRef<S> & {
            $id: Id;
            $state: UnwrapRef<S>;
            $patch(partialState: Partial<UnwrapRef<S>>): void;
            $reset(): void;
            $subscribe(callback: SubscriptionCallback<S>, options?: WatchOptions): () => void;
            $dispose(): void;
        } & ToRefs<S> &
        UnwrapRef<G> &
        A;

    export interface Pinia {
        install: (app: App) => void;
        use(plugin: PiniaPlugin): Pinia;
        state: Ref<Record<string, StateTree>>;
        store: Store;
    }

    export function defineStore<
        Id extends string,
        S extends StateTree = {},
        G extends Record<string, any> = {},
        A = {}
    >(
        id: Id,
        options: DefineStoreOptionsBase<S, Store<Id, S, G, A>>
    ): StoreDefinition<Id, S, G, A>;

    export function defineStore<Id extends string, SS>(
        id: Id,
        storeSetup: () => SS
    ): StoreDefinition<Id, StateTree, Record<string, any>, Record<string, any>>;
}