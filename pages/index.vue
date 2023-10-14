<template>
    <div>
        <div class="d-flex flex-column justify-content-center">
            <video 
                v-if="videoData" 
                :src="videoData.link.link" 
                autoplay
                class="object-fit-fill border rounded"
                style="width: 80%; height: 80%; align-self: center;"
                loop
                muted
            >
            </video>
            <div v-else class="d-flex flex-column justify-content-center">
                <p class="fs-1 text-center mt-3">
                    No Announcement
                </p>
            </div>
            <p v-if="!current_translation" class="fs-2 text-center mt-3">
                {{ videoData.message }}
            </p>
            <p v-else class="fs-2 text-center mt-3">
                {{ current_translation }}
            </p>
            <!-- {{ trainData }}
            <p v-if="trainData" class="fs-2 text-center mt-3">
                Train Number: {{ trainData.name }}
                Train Name: {{ trainData.name }}
            </p> -->
            <audio v-if="videoData" :src="videoData.audio" autoplay loop></audio>
        </div>
    </div>
</template>
<script setup>
    definePageMeta({
        auth: false,
    })
    let videoData = ref(null);
    // let trainData = ref(null);
    let current_translation = ref("");
    const fetchVideoLink = async () => {
        try {
            const {data} = await useFetch(() => `/api/current_video`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // trainData.value = data.value.body.trainDetails;
            videoData.value = data.value.body.video;  
        } catch (error) {
            console.error(error);
        }
    };
    
    await fetchVideoLink();
    setInterval(fetchVideoLink, 10000);
</script>

