import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from 'bcryptjs'


export interface Iuser {
    email: string,
    password: string,
    role: "user" | "admin",
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new Schema<Iuser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

}, {timestamps: true})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})


const User = models?.User || model<Iuser>('User', userSchema);


export default User;
