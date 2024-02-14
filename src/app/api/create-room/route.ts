import { database, db } from '@/libs/firebase'
import { createId } from '@paralleldrive/cuid2'
import { ref, set } from 'firebase/database'
import { arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'

type reqBody = {
    name: string,
    email: string,
    description: string,
    "room-password": string,
    permission: 'private' | 'public'
}

export async function POST(req: Request) {
    const body: reqBody = await req.json()

    const roomCuid = createId()

    //Verify if the room is public or not, and then create the room
    if(body.permission === "public"){
        set(ref(database, 'rooms/' + roomCuid), {
            id: roomCuid,
            name: body.name,
            description: body.description,
            permission: body.permission,
        })    
    }
    else{
        set(ref(database, 'rooms/' + roomCuid + '-private'), {
            id: roomCuid + '-private',
            name: body.name,
            description: body.description,
            permission: body.permission,
            "room-password": body['room-password']
        })
    }

    //User operations:

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", body.email))
    
    let roomIdForRedirect

    try{
        //Search for the user in the database
        const querySnapshot = await getDocs(q)

        //if user is not found, throw error
        if(querySnapshot.empty){
            throw new Error('User not found!')
        }

        //If user is found keep the process
        querySnapshot.forEach(async (user) => {  
            //See if the user has already entered a room            
            const userRooms = user.data().rooms
          
            // If user never entered a room, create the array field at the database, otherwise add roomID to the datase
            if(body.permission === "public"){
                roomIdForRedirect = roomCuid

                if(userRooms === undefined){  
                    await updateDoc(user.ref, {
                        rooms: [ roomCuid ]
                    })
                }
                else{
                    await updateDoc(user.ref, {
                        rooms: arrayUnion(roomCuid)
                    })
                }
            }
            else {
                roomIdForRedirect = `${roomCuid}-private`

                if(userRooms === undefined){  
                    await updateDoc(user.ref, {
                        rooms: [ `${roomCuid}-private` ]
                    })
                }
                else{
                    await updateDoc(user.ref, {
                        rooms: arrayUnion(`${roomCuid}-private`)
                    })
                }
            }  
        })

        return new Response(JSON.stringify({
            message: 'Room successfully created',
            roomIdForRedirect: roomIdForRedirect
        }), {
            status: 200
        })
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }


}
