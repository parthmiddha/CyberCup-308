<template>
  <div>
    <Heading title="Admin Login"></Heading>
    <div class="d-flex flex-row p-2 rounded justify-content-center">
        {{ status }}
        <form @submit.prevent="signIn({ username, password }, {callbackUrl: '/dashboard'})">
            <div class="form-group mb-2">
                <label class="mb-2" for="exampleInputEmail1">Username</label>
                <input v-model="username" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username">
            </div>
            <div class="form-group mb-3">
                <label class="mb-2" for="exampleInputPassword1">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
    const { signIn, token, data, status, lastRefreshedAt } = useAuth() // uses the default signIn function provided by nuxt-auth
    const username = ref('')
    const password = ref('')

    definePageMeta({
        title: 'SignIn',
        public: true,
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/dashboard',
        },
    })
</script>