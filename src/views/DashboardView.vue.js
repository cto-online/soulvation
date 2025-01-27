/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
const navigationItems = [
    { name: 'Avatar', path: '/avatar' },
    { name: 'Scenarios', path: '/scenarios' },
    { name: 'Progress', path: '/progress' },
]; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-3xl font-bold text-gray-900 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6") },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navigationItems))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((item.path)),
            ...{ class: ("bg-white dark:bg-gray-800 shadow rounded-lg p-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold text-gray-900 dark:text-white mb-4") },
        });
        (item.name);
        const __VLS_0 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            to: ((item.path)),
            ...{ class: ("inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300") },
        }));
        const __VLS_2 = __VLS_1({
            to: ((item.path)),
            ...{ class: ("inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        (item.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("ml-2 h-5 w-5") },
            viewBox: ("0 0 20 20"),
            fill: ("currentColor"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'fill-rule': ("evenodd"),
            d: ("M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"),
            'clip-rule': ("evenodd"),
        });
        __VLS_5.slots.default;
        var __VLS_5;
    }
    ['space-y-6', 'text-3xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'bg-white', 'dark:bg-gray-800', 'shadow', 'rounded-lg', 'p-6', 'text-xl', 'font-semibold', 'text-gray-900', 'dark:text-white', 'mb-4', 'inline-flex', 'items-center', 'text-primary-600', 'hover:text-primary-700', 'dark:text-primary-400', 'dark:hover:text-primary-300', 'ml-2', 'h-5', 'w-5',];
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
            navigationItems: navigationItems,
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
