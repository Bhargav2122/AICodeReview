import mongoose,{ Schema } from "mongoose";
import { userInput } from '../types/userInput.js'
import { AiReview } from "../types/aiReview.js";
import { BugType } from "../types/bugtype.js";

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
