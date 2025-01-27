/// <reference types="../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { useRouter } from 'vue-router';
import AppLayout from './components/layout/AppLayout.vue';
const router = useRouter();
const handleError = (error) => {
    // Log error and redirect to home on critical errors
    console.error('Application error:', error);
    if (error.message.includes('critical')) {
        router.push('/');
    }
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.ErrorBoundary;
    /** @type { [typeof __VLS_components.ErrorBoundary, typeof __VLS_components.ErrorBoundary, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onError': {} },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onError': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    let __VLS_7;
    const __VLS_8 = {
        onError: (__VLS_ctx.handleError)
    };
    let __VLS_3;
    let __VLS_4;
    // @ts-ignore
    /** @type { [typeof AppLayout, typeof AppLayout, ] } */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(AppLayout, new AppLayout({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
    const __VLS_14 = {}.RouterView;
    /** @type { [typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ] } */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
    const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_13.slots.default;
    var __VLS_13;
    __VLS_5.slots.default;
    var __VLS_5;
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
            AppLayout: AppLayout,
            handleError: handleError,
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
