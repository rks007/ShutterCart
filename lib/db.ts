import mongoose from "mongoose";


const MONG0DB_URI = process.env.MONGODB_URI!

if(!MONG0DB_URI){
    throw new Error("Check your database connection string");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}; //check the types.d.ts file

}

export async function connectToDatabase() {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        };

        cached.promise =  mongoose.connect(MONG0DB_URI, opts).then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null
    }

    return cached.conn;
}
