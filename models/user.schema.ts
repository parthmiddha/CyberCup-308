import { defineMongooseModel } from '#nuxt/mongoose'

export const User = defineMongooseModel({
  name: 'user',
  schema: {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
})