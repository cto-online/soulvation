/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref, onErrorCaptured } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps();
const error = ref(null);
const router = useRouter();
onErrorCaptured((err) => {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    error.value = { message: errorMessage };
    props.onError?.(err);
    return false; // Prevent error from propagating
});
const handleReset = () => {
    error.value = null;
};
const handleGoHome = () => {
    error.value = null;
    router.push('/');
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-2xl font-bold text-gray-900 dark:text-white mb-4") },
        });
        (__VLS_ctx.error.message || 'Something went wrong');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-600 dark:text-gray-400 mb-8") },
        });
        (__VLS_ctx.error.details || 'Please try again or contact support if the problem persists.');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-center gap-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleReset) },
            ...{ class: ("inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleGoHome) },
            ...{ class: ("inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500") },
        });
    }
    else {
        var __VLS_0 = {};
    }
    ['min-h-[60vh]', 'flex', 'items-center', 'justify-center', 'px-4', 'sm:px-6', 'lg:px-8', 'text-center', 'text-2xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'mb-4', 'text-gray-600', 'dark:text-gray-400', 'mb-8', 'flex', 'justify-center', 'gap-4', 'inline-flex', 'items-center', 'px-4', 'py-2', 'border', 'border-transparent', 'text-base', 'font-medium', 'rounded-md', 'shadow-sm', 'text-white', 'bg-primary-600', 'hover:bg-primary-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-primary-500', 'inline-flex', 'items-center', 'px-4', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-600', 'text-base', 'font-medium', 'rounded-md', 'text-gray-700', 'dark:text-gray-300', 'bg-white', 'dark:bg-gray-800', 'hover:bg-gray-50', 'dark:hover:bg-gray-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-primary-500',];
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
            error: error,
            handleReset: handleReset,
            handleGoHome: handleGoHome,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
