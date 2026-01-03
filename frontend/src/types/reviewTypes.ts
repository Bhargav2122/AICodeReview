export interface ReviewRequest {
  code: string;
}

export interface Bug {
  severity: string;
  issue: string;
  why: string;
  fix: string;
}

export interface AIReview {
    bugs:Bug[];
    improvements: string[];
    securityIssues: string[];
    optmizedCode: string;
    summary: string;
}

export interface ReviewResponse {
    succes: boolean;
    review: {
        _id: string;
        aiOutput: AIReview;
        model: string;
        createdAT: string;
    }
}