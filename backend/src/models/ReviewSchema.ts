import mongoose,{ model, Schema, Types } from "mongoose";
import { userInput } from '../types/userInput.js'
import { AiReview } from "../types/aiReview.js";
import { BugType } from "../types/bugType.js";

export interface ReviewDocument {
    user: Types.ObjectId;
    userInput: userInput;
    aiOutput: AiReview;
    model: string;
    createdAt: Date;
}


const UserInputSchema = new Schema<userInput> (
    {
        code: {
            type: String,
        }
    },
    { _id: false }
);


const BugSchema = new Schema<BugType>({
    severity: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    why: {
        type: String,
        required: true,
    },
    fix: {
        type: String,
        required: true,
    },
   
}, { _id: false });

const aiReviewSchema = new Schema<AiReview> ({
    bugs: {
        type:[BugSchema],
        required: true,
    },
    improvements: {
        type: [String],
        default:[]
    },
    securityIssues: {
        type: [String],
        default:[]
    },
    optimizedCode: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    }
}, { _id: false });


const ReviewSchema = new Schema<ReviewDocument>({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userInput: {
            type:UserInputSchema,
            required: true,
        },
        aiOutput: {
            type: aiReviewSchema,
            required: true,
        },
        model:{
            type: String,
            required: true
        }
}, { timestamps: true });


export const Review = model<ReviewDocument>("Review", ReviewSchema);