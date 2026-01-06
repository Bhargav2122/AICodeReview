import { BugType } from "./bugType.js";


export interface AiReview {
    bugs: BugType[]
    improvements: string[];
    securityIssues: string[];
    optimizedCode: string;
    summary: string;
}