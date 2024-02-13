import { database } from "@/libs/firebase"
import { get, ref } from "firebase/database"

export async function POST(req: Request) {
    const body = await req.json()

    const snapshot = await get(ref(database, "/rooms/" + body.chatID))

    const room = snapshot.val()
   
    return Response.json(JSON.stringify(room))
}