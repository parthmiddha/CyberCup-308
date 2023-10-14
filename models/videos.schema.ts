import { defineMongooseModel } from '#nuxt/mongoose'

export const Videos = defineMongooseModel({
  name: 'videos',
  schema: {
    keyword: {
        type: String,
    },
    link: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    }
  },
})