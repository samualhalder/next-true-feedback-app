import mongosse,{Schema,Document} from 'mongoose'
export interface messageType extends Document{
    content:string
}

export const messageSchma:Schema<messageType>=new Schema({
    content:{
        type:String
    }
},{
    timestamps:true
})

const Message= (mongosse.models.Message as mongosse.Model<messageType>) || (mongosse.model<messageType>('Message',messageSchma))

export default Message