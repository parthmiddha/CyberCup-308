<template>
    <div>
    <Heading title="Dashboard"></Heading>
    <div class="d-flex flex-md-row flex-column p-2 rounded justify-content-center">
        <h3 class="w-50">Enter the announcement: </h3>
        <el-input class="w-50" v-model="prompt" placeholder="Enter the announcement" />
        <button class="w-30 btn btn-primary" type="primary" @click="submit">Submit</button>
    </div>
  </div>
</template>
<script setup>
    definePageMeta({
        auth: false,
    })
    const prompt = ref('')

    const submit = async () => {
        await useFetch(() => `/api/video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                prompt: prompt.value,
            }
        })
    }
</script>