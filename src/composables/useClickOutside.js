import { onMounted, onUnmounted } from 'vue';
export function useClickOutside(elementRef, callback, excludeSelector) {
    const handleClick = (event) => {
        const target = event.target;
        if (!elementRef.value)
            return;
        // Check if click was outside the element
        const isOutside = !elementRef.value.contains(target);
        // If excludeSelector is provided, also check if the click wasn't on an excluded element
        const isNotExcluded = excludeSelector
            ? !target.closest(excludeSelector)
            : true;
        if (isOutside && isNotExcluded) {
            callback();
        }
    };
    onMounted(() => {
        document.addEventListener('click', handleClick);
    });
    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });
    return {
        handleClick // Exposed for testing purposes
    };
}
