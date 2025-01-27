import { ref } from 'vue';
export function useAuthForm() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const resetForm = () => {
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
    };
    return {
        email, password, confirmPassword,
        resetForm
    };
}
