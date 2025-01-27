/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import FeatureCard from '@/components/home/FeatureCard.vue';
import { homeFeatures } from '@/config/features';
const features = homeFeatures; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-[calc(100vh-4rem)] flex items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-4xl mx-auto space-y-12") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-center space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-xl text-gray-600 dark:text-gray-400") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-8") },
    });
    for (const [feature] of __VLS_getVForSourceType((__VLS_ctx.features))) {
        // @ts-ignore
        /** @type { [typeof FeatureCard, ] } */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(FeatureCard, new FeatureCard({
            key: ((feature.title)),
            feature: ((feature)),
        }));
        const __VLS_1 = __VLS_0({
            key: ((feature.title)),
            feature: ((feature)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    ['min-h-[calc(100vh-4rem)]', 'flex', 'items-center', 'max-w-4xl', 'mx-auto', 'space-y-12', 'text-center', 'space-y-6', 'text-4xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'sm:text-5xl', 'text-xl', 'text-gray-600', 'dark:text-gray-400', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-8',];
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
            FeatureCard: FeatureCard,
            features: features,
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
