/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref, onMounted } from 'vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import LoginModal from '@/components/auth/LoginModal.vue';
import { navigationItems } from '@/config/navigation';
import { useUserMenu } from '@/composables/useUserMenu';
import { useClickOutside } from '@/composables/useClickOutside';
const auth = useAuthStore();
const themeStore = useThemeStore();
const showLoginModal = ref(false);
const userMenu = useUserMenu();
const userMenuRef = ref(null);
useClickOutside(userMenuRef, () => userMenu.close());
onMounted(() => {
    themeStore.initTheme();
}); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: ("bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-between h-16") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex-shrink-0 flex items-center") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/"),
        ...{ class: ("text-xl font-bold text-primary-600") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/"),
        ...{ class: ("text-xl font-bold text-primary-600") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("hidden sm:ml-6 sm:flex sm:space-x-8") },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navigationItems))) {
        const __VLS_6 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            key: ((item.path)),
            to: ((item.path)),
            ...{ class: ("inline-flex items-center px-1 pt-1 border-b-2") },
            ...{ class: (([
                    __VLS_ctx.$route.path === item.path
                        ? 'border-primary-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'
                ])) },
        }));
        const __VLS_8 = __VLS_7({
            key: ((item.path)),
            to: ((item.path)),
            ...{ class: ("inline-flex items-center px-1 pt-1 border-b-2") },
            ...{ class: (([
                    __VLS_ctx.$route.path === item.path
                        ? 'border-primary-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'
                ])) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        (item.name);
        __VLS_11.slots.default;
        var __VLS_11;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center space-x-4") },
    });
    // @ts-ignore
    /** @type { [typeof ThemeToggle, ] } */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ThemeToggle, new ThemeToggle({}));
    const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
    if (__VLS_ctx.auth.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("relative") },
            ref: ("userMenuRef"),
        });
        // @ts-ignore navigation for `const userMenuRef = ref()`
        /** @type { typeof __VLS_ctx.userMenuRef } */ ;
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.userMenu.toggle) },
            ...{ class: ("flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none") },
        });
        // @ts-ignore
        /** @type { [typeof UserAvatar, typeof UserAvatar, ] } */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(UserAvatar, new UserAvatar({
            showEmail: ((true)),
        }));
        const __VLS_18 = __VLS_17({
            showEmail: ((true)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { suffix: __VLS_thisSlot } = __VLS_21.slots;
            __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                ...{ class: ("h-5 w-5") },
                xmlns: ("http://www.w3.org/2000/svg"),
                viewBox: ("0 0 20 20"),
                fill: ("currentColor"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
                'fill-rule': ("evenodd"),
                d: ("M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"),
                'clip-rule': ("evenodd"),
            });
        }
        var __VLS_21;
        if (__VLS_ctx.userMenu.isOpen) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("py-1") },
                role: ("menu"),
                'aria-orientation': ("vertical"),
                'aria-labelledby': ("user-menu"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.userMenu.handleLogout) },
                ...{ class: ("w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700") },
                role: ("menuitem"),
            });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.auth.isAuthenticated))))
                        return;
                    __VLS_ctx.showLoginModal = true;
                } },
            ...{ class: ("inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("h-6 w-6") },
            fill: ("none"),
            viewBox: ("0 0 24 24"),
            stroke: ("currentColor"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"),
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
        ...{ class: ("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8") },
    });
    const __VLS_22 = {}.RouterView;
    /** @type { [typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ] } */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
    const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
    {
        const { default: __VLS_thisSlot } = __VLS_27.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_28 = {}.transition;
        /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ] } */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            enterActiveClass: ("animate-fade-in"),
            leaveActiveClass: ("animate-fade-out"),
            mode: ("out-in"),
        }));
        const __VLS_30 = __VLS_29({
            enterActiveClass: ("animate-fade-in"),
            leaveActiveClass: ("animate-fade-out"),
            mode: ("out-in"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        const __VLS_34 = ((Component));
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
        const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
        __VLS_33.slots.default;
        var __VLS_33;
        __VLS_27.slots['' /* empty slot name completion */];
    }
    var __VLS_27;
    // @ts-ignore
    /** @type { [typeof LoginModal, ] } */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(LoginModal, new LoginModal({
        modelValue: ((__VLS_ctx.showLoginModal)),
    }));
    const __VLS_41 = __VLS_40({
        modelValue: ((__VLS_ctx.showLoginModal)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    ['min-h-screen', 'bg-gray-50', 'dark:bg-gray-900', 'transition-colors', 'duration-200', 'bg-white', 'dark:bg-gray-800', 'shadow-sm', 'transition-colors', 'duration-200', 'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'flex', 'justify-between', 'h-16', 'flex', 'flex-shrink-0', 'flex', 'items-center', 'text-xl', 'font-bold', 'text-primary-600', 'hidden', 'sm:ml-6', 'sm:flex', 'sm:space-x-8', 'inline-flex', 'items-center', 'px-1', 'pt-1', 'border-b-2', 'flex', 'items-center', 'space-x-4', 'relative', 'flex', 'items-center', 'space-x-2', 'text-gray-700', 'dark:text-gray-300', 'hover:text-gray-900', 'dark:hover:text-white', 'focus:outline-none', 'h-5', 'w-5', 'absolute', 'right-0', 'mt-2', 'w-48', 'rounded-md', 'shadow-lg', 'bg-white', 'dark:bg-gray-800', 'ring-1', 'ring-black', 'ring-opacity-5', 'py-1', 'w-full', 'text-left', 'px-4', 'py-2', 'text-sm', 'text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'inline-flex', 'items-center', 'justify-center', 'p-2', 'rounded-md', 'text-gray-700', 'dark:text-gray-300', 'hover:text-gray-900', 'dark:hover:text-white', 'focus:outline-none', 'h-6', 'w-6', 'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-8',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {
        'userMenuRef': __VLS_nativeElements['div'],
    };
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
            ThemeToggle: ThemeToggle,
            UserAvatar: UserAvatar,
            LoginModal: LoginModal,
            navigationItems: navigationItems,
            auth: auth,
            showLoginModal: showLoginModal,
            userMenu: userMenu,
            userMenuRef: userMenuRef,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeRefs: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
