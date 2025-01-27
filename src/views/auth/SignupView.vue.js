/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { useRegisterForm } from '@/composables/useRegisterForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons.vue';
const { email, password, confirmPassword, loading, error, emailError, passwordError, confirmPasswordError, isPasswordMatch, passwordMismatchError, handleRegister } = useRegisterForm(); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-md w-full space-y-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleRegister) },
        ...{ class: ("mt-8 space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("rounded-md shadow-sm -space-y-px") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email-address"),
        ...{ class: ("sr-only") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        id: ("email-address"),
        name: ("email"),
        type: ("email"),
        autocomplete: ("email"),
        required: (true),
        ...{ class: ("appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800") },
        placeholder: ("Email address"),
    });
    (__VLS_ctx.email);
    if (__VLS_ctx.emailError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-red-600 text-sm mt-1 text-center") },
        });
        (__VLS_ctx.emailError);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("password"),
        ...{ class: ("sr-only") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        id: ("password"),
        name: ("password"),
        type: ("password"),
        autocomplete: ("new-password"),
        required: (true),
        ...{ class: ("appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800") },
        placeholder: ("Password"),
    });
    (__VLS_ctx.password);
    if (__VLS_ctx.passwordError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-red-600 text-sm mt-1 text-center") },
        });
        (__VLS_ctx.passwordError);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("confirm-password"),
        ...{ class: ("sr-only") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        id: ("confirm-password"),
        name: ("confirm-password"),
        type: ("password"),
        autocomplete: ("new-password"),
        required: (true),
        ...{ class: ("appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800") },
        placeholder: ("Confirm password"),
    });
    (__VLS_ctx.confirmPassword);
    if (__VLS_ctx.confirmPasswordError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-red-600 text-sm mt-1 text-center") },
        });
        (__VLS_ctx.confirmPasswordError);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center justify-between") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-sm") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/login"),
        ...{ class: ("font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/login"),
        ...{ class: ("font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        disabled: ((__VLS_ctx.loading)),
        ...{ class: ("group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("absolute left-0 inset-y-0 flex items-center pl-3") },
    });
    if (!__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("h-5 w-5 text-indigo-500 group-hover:text-indigo-400") },
            xmlns: ("http://www.w3.org/2000/svg"),
            viewBox: ("0 0 20 20"),
            fill: ("currentColor"),
            'aria-hidden': ("true"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'fill-rule': ("evenodd"),
            d: ("M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"),
            'clip-rule': ("evenodd"),
        });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("animate-spin h-5 w-5 text-white") },
            xmlns: ("http://www.w3.org/2000/svg"),
            fill: ("none"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.circle, __VLS_intrinsicElements.circle)({
            ...{ class: ("opacity-25") },
            cx: ("12"),
            cy: ("12"),
            r: ("10"),
            stroke: ("currentColor"),
            'stroke-width': ("4"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
            ...{ class: ("opacity-75") },
            fill: ("currentColor"),
            d: ("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"),
        });
    }
    (__VLS_ctx.loading ? 'Creating account...' : 'Create account');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute inset-0 flex items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full border-t border-gray-300 dark:border-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative flex justify-center text-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("px-2 bg-gray-50 dark:bg-gray-900 text-gray-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-6") },
    });
    // @ts-ignore
    /** @type { [typeof SocialLoginButtons, ] } */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(SocialLoginButtons, new SocialLoginButtons({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mt-4 text-red-600 text-center text-sm") },
        });
        (__VLS_ctx.error);
    }
    ['min-h-screen', 'flex', 'items-center', 'justify-center', 'bg-gray-50', 'dark:bg-gray-900', 'py-12', 'px-4', 'sm:px-6', 'lg:px-8', 'max-w-md', 'w-full', 'space-y-8', 'mt-6', 'text-center', 'text-3xl', 'font-extrabold', 'text-gray-900', 'dark:text-white', 'mt-8', 'space-y-6', 'rounded-md', 'shadow-sm', '-space-y-px', 'sr-only', 'appearance-none', 'rounded-none', 'relative', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-700', 'placeholder-gray-500', 'dark:placeholder-gray-400', 'text-gray-900', 'dark:text-white', 'rounded-t-md', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'focus:z-10', 'sm:text-sm', 'dark:bg-gray-800', 'text-red-600', 'text-sm', 'mt-1', 'text-center', 'sr-only', 'appearance-none', 'rounded-none', 'relative', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-700', 'placeholder-gray-500', 'dark:placeholder-gray-400', 'text-gray-900', 'dark:text-white', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'focus:z-10', 'sm:text-sm', 'dark:bg-gray-800', 'text-red-600', 'text-sm', 'mt-1', 'text-center', 'sr-only', 'appearance-none', 'rounded-none', 'relative', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-700', 'placeholder-gray-500', 'dark:placeholder-gray-400', 'text-gray-900', 'dark:text-white', 'rounded-b-md', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'focus:z-10', 'sm:text-sm', 'dark:bg-gray-800', 'text-red-600', 'text-sm', 'mt-1', 'text-center', 'flex', 'items-center', 'justify-between', 'text-sm', 'font-medium', 'text-indigo-600', 'hover:text-indigo-500', 'dark:text-indigo-400', 'dark:hover:text-indigo-300', 'group', 'relative', 'w-full', 'flex', 'justify-center', 'py-2', 'px-4', 'border', 'border-transparent', 'text-sm', 'font-medium', 'rounded-md', 'text-white', 'bg-indigo-600', 'hover:bg-indigo-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-indigo-500', 'disabled:opacity-50', 'disabled:cursor-not-allowed', 'absolute', 'left-0', 'inset-y-0', 'flex', 'items-center', 'pl-3', 'h-5', 'w-5', 'text-indigo-500', 'group-hover:text-indigo-400', 'animate-spin', 'h-5', 'w-5', 'text-white', 'opacity-25', 'opacity-75', 'mt-6', 'relative', 'absolute', 'inset-0', 'flex', 'items-center', 'w-full', 'border-t', 'border-gray-300', 'dark:border-gray-700', 'relative', 'flex', 'justify-center', 'text-sm', 'px-2', 'bg-gray-50', 'dark:bg-gray-900', 'text-gray-500', 'mt-6', 'mt-4', 'text-red-600', 'text-center', 'text-sm',];
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
            SocialLoginButtons: SocialLoginButtons,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            loading: loading,
            error: error,
            emailError: emailError,
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError,
            handleRegister: handleRegister,
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
