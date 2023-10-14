import { Running } from "../../models/running.schema";

export default eventHandler(async (event) => {
    const announcement = await Running.findOne({
        active: true
    }) as any;
    if (!announcement) {
        return {
            status: 404,
            body: {
                message: 'No video found',
            },
        }
    }
    return {
        status: 200,
        body: {
            announcement,
        },
    }
})

