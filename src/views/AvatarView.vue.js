/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref, computed } from 'vue';
import { useAvatarStore } from '@/stores/avatar';
import { storeToRefs } from 'pinia';
const avatarStore = useAvatarStore();
const { totalAvatars } = storeToRefs(avatarStore);
const isLoading = ref(false);
const error = ref(null);
const selectedType = ref('');
const avatarTypes = [
    {
        name: 'Inner Critic',
        description: 'The analytical and judgmental aspect of your personality',
        icon: 'svg-icon-critic'
    },
    {
        name: 'People Pleaser',
        description: 'The harmonious and accommodating aspect',
        icon: 'svg-icon-pleaser'
    },
    {
        name: 'Achiever',
        description: 'The ambitious and goal-oriented aspect',
        icon: 'svg-icon-achiever'
    },
    {
        name: 'Nurturer',
        description: 'The caring and supportive aspect',
        icon: 'svg-icon-nurturer'
    }
];
const traits = ref([
    {
        label: 'Primary Motivation',
        value: '',
        options: ['Growth', 'Security', 'Connection', 'Achievement']
    },
    {
        label: 'Communication Style',
        value: '',
        options: ['Direct', 'Diplomatic', 'Analytical', 'Empathetic']
    },
    {
        label: 'Core Challenge',
        value: '',
        options: ['Fear of Failure', 'Fear of Rejection', 'Perfectionism', 'Boundaries']
    }
]);
const isFormValid = computed(() => {
    return selectedType.value && traits.value.every(trait => trait.value);
});
const resetForm = () => {
    selectedType.value = '';
    traits.value.forEach(trait => trait.value = '');
    error.value = null;
};
const saveAvatar = async () => {
    if (!isFormValid.value)
        return;
    isLoading.value = true;
    error.value = null;
    try {
        await avatarStore.createAvatar({
            type: selectedType.value,
            traits: traits.value.reduce((acc, trait) => ({
                ...acc,
                [trait.label]: trait.value
            }), {})
        });
        resetForm();
    }
    catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to create avatar';
    }
    finally {
        isLoading.value = false;
    }
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-8 animate-fade") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
        ...{ class: ("text-center space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-4xl font-bold text-gray-900") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-xl text-gray-600 max-w-2xl mx-auto") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 lg:grid-cols-3 gap-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("lg:col-span-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold text-gray-900") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("aspect-square bg-primary-50 rounded-lg flex items-center justify-center border-2 border-dashed border-primary-200") },
    });
    if (__VLS_ctx.selectedType && !__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-center p-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("h-32 w-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            xmlns: ("http://www.w3.org/2000/svg"),
            ...{ class: ("h-16 w-16 text-primary-600") },
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
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("mt-4 font-medium text-gray-900") },
        });
        (__VLS_ctx.selectedType);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-500") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("lg:col-span-2 space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold text-gray-900 mb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 sm:grid-cols-2 gap-4") },
    });
    for (const [type] of __VLS_getVForSourceType((__VLS_ctx.avatarTypes))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.selectedType = type.name;
                } },
            key: ((type.name)),
            ...{ class: ("p-4 rounded-lg border-2 transition-all") },
            ...{ class: (([
                    __VLS_ctx.selectedType === type.name
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                ])) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center space-x-3") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center") },
        });
        const __VLS_0 = ((type.icon));
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ class: ("h-5 w-5 text-primary-600") },
        }));
        const __VLS_2 = __VLS_1({
            ...{ class: ("h-5 w-5 text-primary-600") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-left") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("font-medium text-gray-900") },
        });
        (type.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-gray-500") },
        });
        (type.description);
    }
    if (__VLS_ctx.selectedType) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("card") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold text-gray-900 mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-4") },
        });
        for (const [trait, index] of __VLS_getVForSourceType((__VLS_ctx.traits))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: ((index)),
                ...{ class: ("space-y-2") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: (('trait-' + index)),
                ...{ class: ("block text-sm font-medium text-gray-700") },
            });
            (trait.label);
            __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
                id: (('trait-' + index)),
                value: ((trait.value)),
                ...{ class: ("input") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                value: (""),
            });
            for (const [option] of __VLS_getVForSourceType((trait.options))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                    key: ((option)),
                    value: ((option)),
                });
                (option);
            }
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-end space-x-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.resetForm) },
        ...{ class: ("btn btn-secondary") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.saveAvatar) },
        ...{ class: ("btn btn-primary") },
        disabled: ((!__VLS_ctx.isFormValid || __VLS_ctx.isLoading)),
        ...{ class: (({ 'opacity-50 cursor-not-allowed': __VLS_ctx.isLoading })) },
    });
    ['space-y-8', 'animate-fade', 'text-center', 'space-y-4', 'text-4xl', 'font-bold', 'text-gray-900', 'text-xl', 'text-gray-600', 'max-w-2xl', 'mx-auto', 'grid', 'grid-cols-1', 'lg:grid-cols-3', 'gap-8', 'lg:col-span-1', 'card', 'space-y-6', 'text-xl', 'font-semibold', 'text-gray-900', 'aspect-square', 'bg-primary-50', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'border-2', 'border-dashed', 'border-primary-200', 'text-center', 'p-4', 'h-32', 'w-32', 'mx-auto', 'bg-primary-100', 'rounded-full', 'flex', 'items-center', 'justify-center', 'h-16', 'w-16', 'text-primary-600', 'mt-4', 'font-medium', 'text-gray-900', 'text-gray-500', 'lg:col-span-2', 'space-y-6', 'card', 'text-xl', 'font-semibold', 'text-gray-900', 'mb-4', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-4', 'p-4', 'rounded-lg', 'border-2', 'transition-all', 'flex', 'items-center', 'space-x-3', 'h-10', 'w-10', 'rounded-full', 'bg-primary-100', 'flex', 'items-center', 'justify-center', 'h-5', 'w-5', 'text-primary-600', 'text-left', 'font-medium', 'text-gray-900', 'text-sm', 'text-gray-500', 'card', 'text-xl', 'font-semibold', 'text-gray-900', 'mb-4', 'space-y-4', 'space-y-2', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'input', 'flex', 'justify-end', 'space-x-4', 'btn', 'btn-secondary', 'btn', 'btn-primary', 'opacity-50', 'cursor-not-allowed',];
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
            isLoading: isLoading,
            selectedType: selectedType,
            avatarTypes: avatarTypes,
            traits: traits,
            isFormValid: isFormValid,
            resetForm: resetForm,
            saveAvatar: saveAvatar,
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
