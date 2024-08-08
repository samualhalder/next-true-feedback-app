import mongoose,{Schema,Document} from 'mongoose'
import { messageSchma, messageType } from './message.model'
export interface userType extends Document{
    email:string,
    username:string,
    password:string,
    verificatonCode:string,
    verificationCodeExpire:Date,
    isReciving:boolean,
    message:messageType[]
};

const userSchema:Schema<userType>=new Schema({
    email:{
        type:String,
        unique:true,
        required:[true,"pls enter email"],
    },
    username:{
        type:String,
        unique:true,
        required:[true,"pls enter username"]
    },
    password:{
        type:String,
        required:true
    },
    verificatonCode:{
        type:String,
    },
    verificationCodeExpire:{
        type:Date
    },
    isReciving:{
        type:Boolean,
        required:true,
        default:true
    },
    message:[messageSchma]
},{
    timestamps:true
})
const User= (mongoose.models.User as mongoose.Model<userType> )||( mongoose.model<userType>("User",userSchema))
export default User