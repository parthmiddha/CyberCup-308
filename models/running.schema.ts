import { defineMongooseModel } from '#nuxt/mongoose'

export const Running = defineMongooseModel({
  name: 'running_videos',
  schema: {
    active: {
        type: Boolean,
        default: false,
    },
    keyword: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    audio: {
        type: Array
    },
    translate: {
        type: Array
    },
    trainDetails: {
        type: Object
    },
  },
})