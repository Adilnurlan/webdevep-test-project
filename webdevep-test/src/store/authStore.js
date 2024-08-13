import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = 'application/json';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const useAuthStore = defineStore('authStore', () => {
    const isLoading = ref(false);
    const data = ref(null);
    const error = ref(null);
    const email = ref(null);
    const isAuthenticated = ref(false);
    const accessToken = ref(localStorage.getItem('accessToken'))

    const router = useRouter();
    const toast = useToast();

    const updateAccessToken = (newValue) => {
        localStorage.setItem('accessToken', newValue);
        accessToken.value = newValue;
    };

    const removeAccessTokenStorage = () => {
        localStorage.removeItem('accessToken');
        accessToken.value = null;
    };

    async function register(credentials) {
        try {
            isLoading.value = true;
            const res = await axios.post('/register', credentials);
            data.value = res.data;
            if (!res.data.ok) {
                toast.add({ severity: 'info', summary: 'Info', detail: res.data.msg, life: 3000 });
                return;
            }
            token.set(res.data.accessToken)
            console.log(res.data)
            updateAccessToken(res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            email.value = credentials.get('email')
            sendConfirmCode({email: email.value, use_call: false});
            router.push({name: 'confirmation'});
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    async function login(credentials) {
        try {
            isLoading.value = true;
            const res = await axios.post('/login', credentials);
            data.value = res.data;
            if (!res.data.ok) {
                toast.add({ severity: 'info', summary: 'Info', detail: res.data.msg, life: 3000 });
                if (res.data.code === 1027) {
                    console.log(res.data.code)
                    email.value = credentials.get('credential')
                    sendConfirmCode({ email: email.value, use_call: false });
                    router.push({name: 'confirmation'});
                }
                return;
            }
            isAuthenticated.value = true;
            token.set(res.data.accessToken);
            console.log(res.data);
            updateAccessToken(res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            router.push({name: 'authenticated'});
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    async function logout(payload) {
        try {
            isLoading.value = true;
            const { data } = await axios.post('/logout', payload);
            token.unset()
            data.value = null;
            email.value = null;
            isAuthenticated.value = false;
            removeAccessTokenStorage();
            localStorage.removeItem('refreshToken');
            router.push({name: 'authorization'});
            console.log(data)
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    async function sendConfirmCode(payload) {
        try {
            isLoading.value = true;
            const { data } = await axios.post('/sendConfirmCode', payload);
            console.log(data)
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    async function confirmEmail(payload) {
        try {
            isLoading.value = true;
            const res = await axios.post('/confirmEmail', payload);
            if (!res.data.ok) {
                toast.add({ severity: 'info', summary: 'Info', detail: res.data.msg, life: 3000 });
                return;
            }
            router.push({ name: 'authenticated' });
            isAuthenticated.value = true;
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        register,
        login,
        logout,
        sendConfirmCode,
        confirmEmail,
        data,
        error,
        isLoading,
        email,
        isAuthenticated,
        accessToken
    }
})