/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { useAuthStore } from '@/stores/auth';
import appleIcon from '@/assets/icons/apple.svg';
import googleIcon from '@/assets/icons/google.svg';
import xIcon from '@/assets/icons/x.svg';
import microsoftIcon from '@/assets/icons/microsoft.svg';
const auth = useAuthStore();
const { loading, loginWithGoogle, loginWithMicrosoft, loginWithX, loginWithApple } = auth;
const providers = [
    {
        name: 'Apple',
        icon: appleIcon,
        login: loginWithApple
    },
    {
        name: 'Google',
        icon: googleIcon,
        login: loginWithGoogle
    },
    {
        name: 'X',
        icon: xIcon,
        login: loginWithX
    },
    {
        name: 'Microsoft',
        icon: microsoftIcon,
        login: loginWithMicrosoft
    }
]; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row space-x-3 justify-center") },
    });
    for (const [provider] of __VLS_getVForSourceType((__VLS_ctx.providers))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (provider.login) },
            key: ((provider.name)),
            ...{ class: ("social-login-button") },
            disabled: ((__VLS_ctx.loading)),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((provider.icon)),
            alt: ((provider.name)),
            ...{ class: ("w-5 h-5") },
        });
    }
    ['flex', 'flex-row', 'space-x-3', 'justify-center', 'social-login-button', 'w-5', 'h-5',];
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
            loading: loading,
            providers: providers,
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
