/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref } from 'vue';
const userStats = ref({
    level: 3,
    xp: 750,
    nextLevelXp: 1000,
    scenariosCompleted: 12,
    successRate: 85,
    activeAvatars: [
        { id: 1, type: 'Inner Critic' },
        { id: 2, type: 'Nurturer' },
        { id: 3, type: 'Achiever' }
    ]
});
const recentAchievements = ref([
    {
        id: 1,
        title: 'Harmony Seeker',
        description: 'Successfully resolve 5 interpersonal conflicts',
        completed: true,
        progress: 100
    },
    {
        id: 2,
        title: 'Self-Awareness Master',
        description: 'Create and develop 3 different avatar types',
        completed: true,
        progress: 100
    },
    {
        id: 3,
        title: 'Growth Champion',
        description: 'Complete 15 challenging scenarios',
        completed: false,
        progress: 80
    },
    {
        id: 4,
        title: 'Mindfulness Explorer',
        description: 'Practice daily reflection for 7 consecutive days',
        completed: false,
        progress: 40
    }
]); /* PartiallyEnd: #3632/scriptSetup.vue */
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
        ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card bg-gradient-to-br from-primary-50 to-primary-100") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center justify-between") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-lg font-semibold text-gray-900") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-2xl font-bold text-primary-600") },
    });
    (__VLS_ctx.userStats.level);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-between text-sm text-gray-600") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.userStats.xp);
    (__VLS_ctx.userStats.nextLevelXp);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full bg-white rounded-full h-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-primary-600 h-2 rounded-full transition-all duration-500") },
        ...{ style: (({ width: `${(__VLS_ctx.userStats.xp / __VLS_ctx.userStats.nextLevelXp) * 100}%` })) },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-lg font-semibold text-gray-900") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-2 gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-2xl font-bold text-primary-600") },
    });
    (__VLS_ctx.userStats.scenariosCompleted);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-sm text-gray-600") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-2xl font-bold text-green-600") },
    });
    (__VLS_ctx.userStats.successRate);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-sm text-gray-600") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-lg font-semibold text-gray-900") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex -space-x-2") },
    });
    for (const [avatar] of __VLS_getVForSourceType((__VLS_ctx.userStats.activeAvatars))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((avatar.id)),
            ...{ class: ("h-10 w-10 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center") },
            title: ((avatar.type)),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm font-medium text-primary-600") },
        });
        (avatar.type.charAt(0));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold text-gray-900 mb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-6") },
    });
    for (const [achievement] of __VLS_getVForSourceType((__VLS_ctx.recentAchievements))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((achievement.id)),
            ...{ class: ("flex items-center space-x-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("h-12 w-12 rounded-lg flex items-center justify-center") },
            ...{ class: ((achievement.completed ? 'bg-primary-100' : 'bg-gray-100')) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            xmlns: ("http://www.w3.org/2000/svg"),
            ...{ class: ("h-6 w-6") },
            ...{ class: ((achievement.completed ? 'text-primary-600' : 'text-gray-400')) },
            fill: ("none"),
            viewBox: ("0 0 24 24"),
            stroke: ("currentColor"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex-1") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("font-medium text-gray-900") },
        });
        (achievement.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-gray-500") },
        });
        (achievement.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-right") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm font-medium") },
            ...{ class: ((achievement.completed ? 'text-primary-600' : 'text-gray-500')) },
        });
        (achievement.completed ? 'Completed' : 'In Progress');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm text-gray-500") },
        });
        (achievement.progress);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("card") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold text-gray-900 mb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("aspect-video bg-gray-50 rounded-lg p-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("h-full flex items-center justify-center text-gray-500") },
    });
    ['space-y-8', 'animate-fade', 'text-center', 'space-y-4', 'text-4xl', 'font-bold', 'text-gray-900', 'text-xl', 'text-gray-600', 'max-w-2xl', 'mx-auto', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6', 'card', 'bg-gradient-to-br', 'from-primary-50', 'to-primary-100', 'space-y-4', 'flex', 'items-center', 'justify-between', 'text-lg', 'font-semibold', 'text-gray-900', 'text-2xl', 'font-bold', 'text-primary-600', 'space-y-2', 'flex', 'justify-between', 'text-sm', 'text-gray-600', 'w-full', 'bg-white', 'rounded-full', 'h-2', 'bg-primary-600', 'h-2', 'rounded-full', 'transition-all', 'duration-500', 'card', 'space-y-4', 'text-lg', 'font-semibold', 'text-gray-900', 'grid', 'grid-cols-2', 'gap-4', 'text-2xl', 'font-bold', 'text-primary-600', 'text-sm', 'text-gray-600', 'text-2xl', 'font-bold', 'text-green-600', 'text-sm', 'text-gray-600', 'card', 'space-y-4', 'text-lg', 'font-semibold', 'text-gray-900', 'flex', '-space-x-2', 'h-10', 'w-10', 'rounded-full', 'bg-primary-100', 'border-2', 'border-white', 'flex', 'items-center', 'justify-center', 'text-sm', 'font-medium', 'text-primary-600', 'card', 'text-xl', 'font-semibold', 'text-gray-900', 'mb-6', 'space-y-6', 'flex', 'items-center', 'space-x-4', 'h-12', 'w-12', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'h-6', 'w-6', 'flex-1', 'font-medium', 'text-gray-900', 'text-sm', 'text-gray-500', 'text-right', 'text-sm', 'font-medium', 'text-sm', 'text-gray-500', 'card', 'text-xl', 'font-semibold', 'text-gray-900', 'mb-6', 'aspect-video', 'bg-gray-50', 'rounded-lg', 'p-4', 'h-full', 'flex', 'items-center', 'justify-center', 'text-gray-500',];
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
            userStats: userStats,
            recentAchievements: recentAchievements,
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
