function isAuthenticated(to, from, next) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        next()
    } else {
        next('/login')
    }
}

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
    },
    {
        path: '/login',
        name: 'authorization',
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'registration',
        component: () => import('@/pages/RegisterPage.vue'),
    },
    {
        path: '/login/confirm',
        name: 'confirmation',
        component: () => import('@/pages/ConfirmEmail.vue'),
    },
    {
        path: '/authenticated',
        name: 'authenticated',
        beforeEnter: isAuthenticated,
        component: () => import('@/pages/AuthenticatedPage.vue'),
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue'),
    },
]