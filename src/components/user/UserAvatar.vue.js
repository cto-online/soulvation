/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
const props = defineProps();
const auth = useAuthStore();
const email = computed(() => auth.user?.email || '');
const initials = computed(() => {
    const emailValue = auth.user?.email || '';
    return emailValue.substring(0, 2).toUpperCase();
}); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center space-x-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-sm font-medium text-primary-700 dark:text-primary-300") },
    });
    (__VLS_ctx.initials);
    if (__VLS_ctx.showEmail) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("hidden md:block") },
        });
        (__VLS_ctx.email);
    }
    var __VLS_0 = {};
    ['flex', 'items-center', 'space-x-2', 'h-8', 'w-8', 'rounded-full', 'bg-primary-100', 'dark:bg-primary-800', 'flex', 'items-center', 'justify-center', 'text-sm', 'font-medium', 'text-primary-700', 'dark:text-primary-300', 'hidden', 'md:block',];
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
            email: email,
            initials: initials,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    __typeEl: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
