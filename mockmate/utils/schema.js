import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core"; 

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(), 
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: timestamp('createdAt').defaultNow(), // Set default value for createdAt
    mockId: varchar('mockId').notNull(),
});
export const UserAnswer=pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    Question:varchar('Question').notNull(),
    correctAns:varchar('correctAns'),
    UserAns:text('UserAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),

})