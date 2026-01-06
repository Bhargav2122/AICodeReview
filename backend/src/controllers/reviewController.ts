import { Review } from "../models/ReviewSchema.js";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import { GoogleGenAI } from "@google/genai";
import { success } from "zod";
import { log } from "node:console";

export const review = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
    if (!code) {
        throw new ApiError(400,'Code is required')
    return;
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ApiError(400, "Gemini api key is missing");
  }
  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt: string = `You are Senior Software Engineer.
                      Strict Code Checking.Your task is to perform 
                      thorough code reviews on provided code , focusing on best practices, performance, security, readability.
                      
                      Core Responsibilites:
                      Bug Detection identify logical error, edge cases, and runtime expections.
                      security analysis Flag vulnerabilities such as insecure data handling,XSS, and missing input validation.
                      Performance Optimization Detect inefficent algorithms, unnecessary API calls.

                      Output Requirements 
                       Be concise, Objective and actionable.
                       for each issue found,provide:
                         Severity: Critical, Major, Minor, Info
                         Issue: Brief Description.
                         Why: Explanation of the impact.
                         Fix: A correct code snippet.

                       
                       Constraints You need to automatically identify the code and find the errors,provide code
                       If you donot know the answer, state that your are unsure rather than providing the incorrect information.
                      `;
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          bugs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                severity: { type: "string" },
                issue: { type: "string" },
                why: { type: "string" },
                fix: { type: "string" },
              },
              required: ["severity", "issue", "why", "fix"],
            },
          },
          improvements: {
            type: "array",
            items: {
              type: "string",
            },
          },
          securityIssues: {
            type: "array",
            items: {
              type: "string",
            },
          },
          optimizedCode: {
            type: "string",
          },
          summary: {
            type: "string",
          },
        },
        required: [
          "bugs",
          "improvements",
          "securityIssues",
          "optimizedCode",
          "summary",
        ],
      },
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `\nSource CODE:\n<<<\n${code}>>>`,
          },
        ],
      },
    ],
  });
   if (!result.text) {
    throw new ApiError(502, "Empty AI response");
  }
   console.log(result.text)
  const aiResult = JSON.parse(result.text);
   console.log("req user", req.user)
  const savedReview = await Review.create({
    user: req.user._id,
    userInput: { code },
    aiOutput: aiResult,
    model: "gemini-2.5-flash-lite",
  });
  
  res.status(201).json({
    success: true,
    review:savedReview,
  })
});

export const reviewHistory = asyncHandler( async(req, res, next) => {
    
    const history = await Review.find({ user: req.user._id}).sort({ createdAt: -1}).select("userInput aiOutput createdAt");
    res.status(200).json({
      success: true,
      count: history.length,
      history
    })
})

export const singleHistory = asyncHandler( async(req, res, next) => {
  const review = await Review.findOne({
    _id: req.params.id,
    user: req.user._id,
  })

  if(!review) {
    throw new ApiError(404, "Review not found");
  }
  res.status(200).json({
    success: true,
    review
  })
})
