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
    optimizedCode: string;
    summary: string;
}

export interface ReviewResponse {
    success: boolean;
    review: {
        _id: string;
        aiOutput: AIReview;
        model: string;
        createdAt: string;
    }
}

export interface ReviewHistory {
  _id: string;
  userInput: { code: string };
  aiOutput: {
    bugs: any[];
    improvements: string[];
    securityIssues: string[];
    optimizedCode: string;
    summary: string;
  };
  createdAt: string;
}
export interface ReviewHistoryResponse {
  success: boolean;
  history: ReviewHistory[];
}
