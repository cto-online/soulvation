/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import SunIcon from '@/components/icons/SunIcon.vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';
const themeStore = useThemeStore();
const ariaLabel = computed(() => `Switch to ${themeStore.isDark ? 'light' : 'dark'} mode`); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.themeStore.toggleTheme();
            } },
        ...{ class: ("p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700") },
        'aria-label': ((__VLS_ctx.ariaLabel)),
    });
    const __VLS_0 = {}.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        name: ("theme-toggle"),
        mode: ("out-in"),
    }));
    const __VLS_2 = __VLS_1({
        name: ("theme-toggle"),
        mode: ("out-in"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    if (__VLS_ctx.themeStore.isDark) {
        // @ts-ignore
        /** @type { [typeof SunIcon, ] } */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(SunIcon, new SunIcon({
            ...{ class: ("text-gray-400 dark:text-gray-300") },
        }));
        const __VLS_7 = __VLS_6({
            ...{ class: ("text-gray-400 dark:text-gray-300") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    else {
        // @ts-ignore
        /** @type { [typeof MoonIcon, ] } */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(MoonIcon, new MoonIcon({
            ...{ class: ("text-gray-400 dark:text-gray-300") },
        }));
        const __VLS_12 = __VLS_11({
            ...{ class: ("text-gray-400 dark:text-gray-300") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['p-2', 'rounded-lg', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-gray-200', 'dark:focus:ring-gray-700', 'text-gray-400', 'dark:text-gray-300', 'text-gray-400', 'dark:text-gray-300',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SunIcon: SunIcon,
            MoonIcon: MoonIcon,
            themeStore: themeStore,
            ariaLabel: ariaLabel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
