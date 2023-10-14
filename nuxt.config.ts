// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-viewport',
    [
        '@pinia/nuxt',
        {
            autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
        }
    ],
    '@pinia-plugin-persistedstate/nuxt',
    'floating-vue/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-mongoose'
  ],
  ssr: false,
  css: [
    'maz-ui/css/main.css',
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/dark/css-vars.css',
    '~/assets/scss/styles.scss',
  ],
  build: {
    transpile: [
        'maz-ui',
        'element-plus/es',
    ]   
  },
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/variables.scss";',
            },
        },
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
    devtools: true
  },
  auth: {
    globalAppMiddleware: true,
    baseURL: process.env.NUXT_PUBLIC_API_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'get' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/me', method: 'get' }
      },
      pages: {
        login: '/signin'
      },
      token: {
        signInResponseTokenPointer: '/accessToken'
      },
      sessionDataType: { username: 'string', password: 'string' },  
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 5000
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },

  app: {
    head: {
        htmlAttrs: {
            lang: 'en',
            class: "dark",
            "data-bs-theme": "dark",
        },
        title: 'Trainzy',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: "width=device-width, initial-scale=1" },
        ],
    }
  },
  viewport: {
    breakpoints: {
        xs: 320,
        sm: 640,
        md: 768,
        'md-lg': 991.98,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    },
    
    defaultBreakpoints: {
        desktop: 'lg',
        mobile: 'xs',
        tablet: 'md',
    },

    fallbackBreakpoint: 'lg',
  },
  devtools: { enabled: true }
})
