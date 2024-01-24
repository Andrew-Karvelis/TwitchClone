import { db } from "./db";
import { getSelf } from "./auth-service";

export const getSearch = async(term?: string) => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id
    } catch {
        userId = null
    }

    let streams = []

    if (userId) {

    } else {
        streams = await db.stream.findMany({
            where: {
                
            }
        })
    }
}