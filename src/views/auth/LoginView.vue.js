/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons.vue';
const router = useRouter();
const auth = useAuthStore();
const { loading, error, loginWithEmail } = auth;
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const handleLogin = async () => {
    await loginWithEmail(email.value, password.value, rememberMe.value);
    if (!error.value) {
        router.push('/');
    }
}; /* PartiallyEnd: #3632/scriptSetup.vue */
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ("@/assets/logo.svg"),
        alt: ("Logo"),
        ...{ class: ("mx-auto h-16 w-16") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("mt-2 text-center text-sm text-gray-600 dark:text-gray-400") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-6") },
    });
    // @ts-ignore
    /** @type { [typeof SocialLoginButtons, ] } */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SocialLoginButtons, new SocialLoginButtons({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleLogin) },
        ...{ class: ("mt-8 space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email-address"),
        ...{ class: ("block text-sm font-medium text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        id: ("email-address"),
        name: ("email"),
        type: ("email"),
        autocomplete: ("email"),
        required: (true),
        ...{ class: ("mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800") },
        placeholder: ("Enter your email..."),
    });
    (__VLS_ctx.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("password"),
        ...{ class: ("block text-sm font-medium text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        id: ("password"),
        name: ("password"),
        type: ("password"),
        autocomplete: ("current-password"),
        required: (true),
        ...{ class: ("mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800") },
        placeholder: ("••••••••••"),
    });
    (__VLS_ctx.password);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center justify-between") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        id: ("remember-me"),
        name: ("remember-me"),
        type: ("checkbox"),
        ...{ class: ("h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded") },
    });
    (__VLS_ctx.rememberMe);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("remember-me"),
        ...{ class: ("ml-2 block text-sm text-gray-900 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: ("#"),
        ...{ class: ("font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        disabled: ((__VLS_ctx.loading)),
        ...{ class: ("w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600") },
    });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("animate-spin -ml-1 mr-3 h-5 w-5 text-white") },
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
    (__VLS_ctx.loading ? 'Signing in...' : 'Sign in');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-center text-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-gray-600 dark:text-gray-400") },
    });
    const __VLS_5 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        to: ("/signup"),
        ...{ class: ("ml-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300") },
    }));
    const __VLS_7 = __VLS_6({
        to: ("/signup"),
        ...{ class: ("ml-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_10.slots.default;
    var __VLS_10;
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mt-4 text-red-600 text-center text-sm") },
        });
        (__VLS_ctx.error);
    }
    ['min-h-screen', 'flex', 'items-center', 'justify-center', 'bg-gray-50', 'dark:bg-gray-900', 'py-12', 'px-4', 'sm:px-6', 'lg:px-8', 'max-w-md', 'w-full', 'space-y-8', 'text-center', 'mx-auto', 'h-16', 'w-16', 'mt-6', 'text-center', 'text-3xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'mt-2', 'text-center', 'text-sm', 'text-gray-600', 'dark:text-gray-400', 'mt-6', 'relative', 'absolute', 'inset-0', 'flex', 'items-center', 'w-full', 'border-t', 'border-gray-300', 'dark:border-gray-700', 'relative', 'flex', 'justify-center', 'text-sm', 'px-2', 'bg-gray-50', 'dark:bg-gray-900', 'text-gray-500', 'mt-8', 'space-y-6', 'space-y-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mt-1', 'appearance-none', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-700', 'rounded-lg', 'placeholder-gray-500', 'dark:placeholder-gray-400', 'text-gray-900', 'dark:text-white', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'sm:text-sm', 'dark:bg-gray-800', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mt-1', 'appearance-none', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-700', 'rounded-lg', 'placeholder-gray-500', 'dark:placeholder-gray-400', 'text-gray-900', 'dark:text-white', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'sm:text-sm', 'dark:bg-gray-800', 'flex', 'items-center', 'justify-between', 'flex', 'items-center', 'h-4', 'w-4', 'text-indigo-600', 'focus:ring-indigo-500', 'border-gray-300', 'rounded', 'ml-2', 'block', 'text-sm', 'text-gray-900', 'dark:text-gray-300', 'text-sm', 'font-medium', 'text-indigo-600', 'hover:text-indigo-500', 'dark:text-indigo-400', 'dark:hover:text-indigo-300', 'w-full', 'flex', 'justify-center', 'py-2', 'px-4', 'border', 'border-transparent', 'text-sm', 'font-medium', 'rounded-lg', 'text-white', 'bg-gray-900', 'hover:bg-gray-800', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-gray-500', 'disabled:opacity-50', 'disabled:cursor-not-allowed', 'dark:bg-gray-700', 'dark:hover:bg-gray-600', 'animate-spin', '-ml-1', 'mr-3', 'h-5', 'w-5', 'text-white', 'opacity-25', 'opacity-75', 'text-center', 'text-sm', 'text-gray-600', 'dark:text-gray-400', 'ml-1', 'font-medium', 'text-indigo-600', 'hover:text-indigo-500', 'dark:text-indigo-400', 'dark:hover:text-indigo-300', 'mt-4', 'text-red-600', 'text-center', 'text-sm',];
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
            loading: loading,
            error: error,
            email: email,
            password: password,
            rememberMe: rememberMe,
            handleLogin: handleLogin,
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
