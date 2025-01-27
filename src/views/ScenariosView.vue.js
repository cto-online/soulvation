/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref } from 'vue';
const scenarios = [
    {
        id: 1,
        title: 'Workplace Dynamics',
        description: 'Navigate a challenging situation with a colleague while maintaining professional relationships.',
        difficulty: 'Beginner',
        estimatedTime: 15,
        steps: [
            {
                situation: 'The Project Deadline',
                description: "Your colleague is consistently late with their deliverables, affecting the team's progress. How do you handle this situation?",
                choices: [
                    {
                        id: 1,
                        text: 'Have a private conversation',
                        subtext: 'Discuss the impact on the team and offer support',
                        impact: 'Builds trust and understanding'
                    },
                    {
                        id: 2,
                        text: 'Report to supervisor',
                        subtext: 'Escalate the issue through proper channels',
                        impact: 'May create tension but ensures accountability'
                    },
                    {
                        id: 3,
                        text: 'Adapt and compensate',
                        subtext: 'Adjust your work to accommodate delays',
                        impact: 'Maintains harmony but may enable behavior'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: 'Personal Boundaries',
        description: 'Practice setting healthy boundaries in personal relationships.',
        difficulty: 'Intermediate',
        estimatedTime: 20,
        steps: [
            {
                situation: 'The Persistent Friend',
                description: 'A friend constantly asks for favors that stretch your resources and time. How do you address this?',
                choices: [
                    {
                        id: 1,
                        text: 'Set clear boundaries',
                        subtext: 'Explain your limitations while showing care',
                        impact: 'Promotes healthy relationship dynamics'
                    },
                    {
                        id: 2,
                        text: 'Gradually distance yourself',
                        subtext: 'Reduce availability without confrontation',
                        impact: 'Avoids conflict but may not resolve issue'
                    },
                    {
                        id: 3,
                        text: 'Continue helping',
                        subtext: 'Maintain the status quo to preserve friendship',
                        impact: 'May lead to burnout and resentment'
                    }
                ]
            }
        ]
    }
];
const difficultyColors = {
    Beginner: 'bg-green-100',
    Intermediate: 'bg-yellow-100',
    Advanced: 'bg-red-100'
};
const difficultyIconColors = {
    Beginner: 'text-green-600',
    Intermediate: 'text-yellow-600',
    Advanced: 'text-red-600'
};
const difficultyTextColors = {
    Beginner: 'text-green-600',
    Intermediate: 'text-yellow-600',
    Advanced: 'text-red-600'
};
const activeScenario = ref(null);
const currentStep = ref(1);
const startScenario = (scenario) => {
    activeScenario.value = scenario;
    currentStep.value = 1;
};
const makeChoice = (choice) => {
    // TODO: Implement choice impact logic
    if (activeScenario.value && currentStep.value < activeScenario.value.steps.length) {
        currentStep.value++;
    }
    else {
        // Scenario complete
        exitScenario();
    }
};
const exitScenario = () => {
    activeScenario.value = null;
    currentStep.value = 1;
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
    if (!__VLS_ctx.activeScenario) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6") },
        });
        for (const [scenario] of __VLS_getVForSourceType((__VLS_ctx.scenarios))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!((!__VLS_ctx.activeScenario)))
                            return;
                        __VLS_ctx.startScenario(scenario);
                    } },
                key: ((scenario.id)),
                ...{ class: ("card hover:shadow-md transition-shadow cursor-pointer") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("space-y-4") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("h-12 w-12 rounded-lg flex items-center justify-center") },
                ...{ class: ((__VLS_ctx.difficultyColors[scenario.difficulty])) },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                xmlns: ("http://www.w3.org/2000/svg"),
                ...{ class: ("h-6 w-6") },
                ...{ class: ((__VLS_ctx.difficultyIconColors[scenario.difficulty])) },
                fill: ("none"),
                viewBox: ("0 0 24 24"),
                stroke: ("currentColor"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
                'stroke-linecap': ("round"),
                'stroke-linejoin': ("round"),
                'stroke-width': ("2"),
                d: ("M13 10V3L4 14h7v7l9-11h-7z"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: ("text-lg font-semibold text-gray-900") },
            });
            (scenario.title);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ("text-sm text-gray-500") },
            });
            (scenario.description);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("flex items-center justify-between") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("text-sm font-medium") },
                ...{ class: ((__VLS_ctx.difficultyTextColors[scenario.difficulty])) },
            });
            (scenario.difficulty);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("text-sm text-gray-500") },
            });
            (scenario.estimatedTime);
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("max-w-2xl mx-auto") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("card space-y-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-full bg-gray-200 rounded-full h-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-primary-600 h-2 rounded-full transition-all duration-500") },
            ...{ style: (({ width: `${(__VLS_ctx.currentStep / __VLS_ctx.activeScenario.steps.length) * 100}%` })) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-2xl font-bold text-gray-900") },
        });
        (__VLS_ctx.activeScenario.steps[__VLS_ctx.currentStep - 1].situation);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("prose prose-primary max-w-none") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.activeScenario.steps[__VLS_ctx.currentStep - 1].description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-4") },
        });
        for (const [choice] of __VLS_getVForSourceType((__VLS_ctx.activeScenario.steps[__VLS_ctx.currentStep - 1].choices))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(!((!__VLS_ctx.activeScenario))))
                            return;
                        __VLS_ctx.makeChoice(choice);
                    } },
                key: ((choice.id)),
                ...{ class: ("w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary-500 hover:bg-primary-50") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ("font-medium text-gray-900") },
            });
            (choice.text);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ("text-sm text-gray-500 mt-1") },
            });
            (choice.subtext);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-between pt-4 border-t") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.exitScenario) },
            ...{ class: ("btn btn-secondary") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm text-gray-500") },
        });
        (__VLS_ctx.currentStep);
        (__VLS_ctx.activeScenario.steps.length);
    }
    ['space-y-8', 'animate-fade', 'text-center', 'space-y-4', 'text-4xl', 'font-bold', 'text-gray-900', 'text-xl', 'text-gray-600', 'max-w-2xl', 'mx-auto', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'card', 'hover:shadow-md', 'transition-shadow', 'cursor-pointer', 'space-y-4', 'h-12', 'w-12', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'h-6', 'w-6', 'text-lg', 'font-semibold', 'text-gray-900', 'text-sm', 'text-gray-500', 'flex', 'items-center', 'justify-between', 'text-sm', 'font-medium', 'text-sm', 'text-gray-500', 'max-w-2xl', 'mx-auto', 'card', 'space-y-6', 'w-full', 'bg-gray-200', 'rounded-full', 'h-2', 'bg-primary-600', 'h-2', 'rounded-full', 'transition-all', 'duration-500', 'space-y-6', 'text-2xl', 'font-bold', 'text-gray-900', 'prose', 'prose-primary', 'max-w-none', 'space-y-4', 'w-full', 'text-left', 'p-4', 'rounded-lg', 'border-2', 'transition-all', 'hover:border-primary-500', 'hover:bg-primary-50', 'font-medium', 'text-gray-900', 'text-sm', 'text-gray-500', 'mt-1', 'flex', 'justify-between', 'pt-4', 'border-t', 'btn', 'btn-secondary', 'text-sm', 'text-gray-500',];
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
            scenarios: scenarios,
            difficultyColors: difficultyColors,
            difficultyIconColors: difficultyIconColors,
            difficultyTextColors: difficultyTextColors,
            activeScenario: activeScenario,
            currentStep: currentStep,
            startScenario: startScenario,
            makeChoice: makeChoice,
            exitScenario: exitScenario,
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
