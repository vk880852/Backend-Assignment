import mongoose,{Schema} from "mongoose";

const taskSchema =new Schema(
{
    title:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
    },
    status: 
    {
        type: String,
        enum: ['pending', 'in-progress',', completed'],
        default: 'pending',
    }
},
{
    timestamps:true
}
)
export const Task=mongoose.model("Task",taskSchema);
