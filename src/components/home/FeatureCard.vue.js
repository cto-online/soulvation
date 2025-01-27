/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { RouterLink } from 'vue-router';
import FeatureCardContent from './FeatureCardContent.vue';
const __VLS_props = defineProps(); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    if (__VLS_ctx.feature.link) {
        const __VLS_0 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            to: ((__VLS_ctx.feature.link)),
            ...{ class: ("block bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200") },
        }));
        const __VLS_2 = __VLS_1({
            to: ((__VLS_ctx.feature.link)),
            ...{ class: ("block bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        // @ts-ignore
        /** @type { [typeof FeatureCardContent, ] } */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(FeatureCardContent, new FeatureCardContent({
            feature: ((__VLS_ctx.feature)),
        }));
        const __VLS_7 = __VLS_6({
            feature: ((__VLS_ctx.feature)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        __VLS_5.slots.default;
        var __VLS_5;
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white dark:bg-gray-800 shadow rounded-lg p-6") },
        });
        // @ts-ignore
        /** @type { [typeof FeatureCardContent, ] } */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(FeatureCardContent, new FeatureCardContent({
            feature: ((__VLS_ctx.feature)),
        }));
        const __VLS_12 = __VLS_11({
            feature: ((__VLS_ctx.feature)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
    ['block', 'bg-white', 'dark:bg-gray-800', 'shadow', 'rounded-lg', 'p-6', 'hover:shadow-lg', 'transition-shadow', 'duration-200', 'bg-white', 'dark:bg-gray-800', 'shadow', 'rounded-lg', 'p-6',];
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
            RouterLink: RouterLink,
            FeatureCardContent: FeatureCardContent,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
