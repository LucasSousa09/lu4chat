import { db } from '@/libs/firebase';
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

export async function POST(req: Request) {
    const body = await req.json()
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("email", "==", body.email))
    
    let userRoomsArray
    let userId

    let isPrivate

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
                userRoomsArray = [ body.room ]

                await updateDoc(usersDocRef, {
                    rooms: [ body.room ]
                })
            }
            
            //Verify if user already participates at the chat
            const roomFound = userRooms.filter((room: string) => room === body.room)

            userId = user.id            
            userRoomsArray = [...user.data().rooms]

            //If user does participates return
            if(roomFound.length > 0){
                return
            }

            //If room is private
            if(body.room.split('-')[1] === 'private'){
                isPrivate = true
                return
            }

        
            userRoomsArray = [...user.data().rooms, body.room]

            //Add Room to user
            await updateDoc(usersDocRef, {
                rooms: arrayUnion(body.room)
            })

        })

        if(isPrivate === true){
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