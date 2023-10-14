<template>
    <div class="pb-4 page-title text-center my-3">
        <p class="display-1 fw-bold">{{ title }}</p>
    </div>
</template>
<script lang="ts">
    export default{
        name: "Heading",
        props: {
            title: {
                type: String,
                default: ""
            }
        }
    }
</script>