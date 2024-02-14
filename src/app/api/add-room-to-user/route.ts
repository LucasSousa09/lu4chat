import { db } from '@/libs/firebase';
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

export async function POST(req: Request) {
    const body = await req.json()
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("email", "==", body.email))
    
    let userId
    let userRoomsArray
    let notAllowed

    const isPrivate = body.room.split('-')[1] === undefined ? false : true

    try{
        const querySnapshot = await getDocs(q)
    
        if(querySnapshot.empty){
            throw new Error('User not found')
        }

        querySnapshot.forEach(async (user) => {
            const usersDocRef = doc(db, "users", user.id)
            
            const userRooms = user.data().rooms

            //If user never entered a chat, create the rooms array
            if(userRooms === undefined){
                await updateDoc(usersDocRef, {
                    rooms: []
                })
            }
            
            //Verify if user already participates at the chat
            const roomFound = userRooms.filter((room: string) => {
                return room === body.room
            })

            userId = user.id            
            userRoomsArray = [...user.data().rooms]

            //If user does not participates in the room
            if(roomFound.length === 0){
                //And room is public
                if(isPrivate === false){
                    userRoomsArray = [...user.data().rooms, body.room]
    
                    await updateDoc(usersDocRef, {
                        rooms: arrayUnion(body.room)
                    })
                }
                else(
                    notAllowed = true
                )
            }
            else{
                userRoomsArray = [...user.data().rooms]
            }
        })


        if(notAllowed === true){
            return new Response('This room is private')    
        }

        return new Response(JSON.stringify({userRoomsArray, userId}), {
            status: 200
        })
        
    }

    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }
}