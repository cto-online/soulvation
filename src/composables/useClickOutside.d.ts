import { type Ref } from 'vue';
export declare function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void, excludeSelector?: string): {
    handleClick: (event: MouseEvent) => void;
};
