import MazBtn from 'maz-ui/components/MazBtn'
import MazBadge from 'maz-ui/components/MazBadge'
import MazSelect from 'maz-ui/components/MazSelect'
import MazInputTags from 'maz-ui/components/MazInputTags'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("MazBtn", MazBtn)
    nuxtApp.vueApp.component("MazBadge", MazBadge)
    nuxtApp.vueApp.component("MazSelect", MazSelect)
    nuxtApp.vueApp.component("MazInputTags", MazInputTags)
})