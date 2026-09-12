import { GoogleGenAI } from "@google/genai";
import z from "zod";
import zod, { zodToJsonSchema } from "zod-to-json-schema";
import config from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey: config.aiApi,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0-100 indicating how well the candidates's profile mathces the job description.",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical questions that can be asked on user's data.",
          ),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them.",
    ),
  behaviorialQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe(
            "The behaviorial questions that can be asked on user's personality.",
          ),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      })
      .describe(
        "Behavorial questions that can be asked in the interview along with their intention and how to answer them.",
      ),
  ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking."),
        severity: z
          .enum(["Low", "Mid", "High"])
          .describe(
            "To assess the severity of this skill gap, consider the importance of the job, the time required to fix it, and how quickly they must act.",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z.array(
    z
      .object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe("The main focus of the day in the preparation plan."),
        task: z
          .string()
          .describe(
            "List of tasks to be done on this day to follow the preparation plan",
          ),
      })
      .describe(
        "A day-wise preparation plan for the candidates to follow in order to prepare for the interviews effectively",
      ),
  ),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `Generate an interview report for a candidate with the following details:
                  Resume: ${resume},
                  Self Description: ${selfDescription},
                  jobDescription: ${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
};

export default generateInterviewReport;
