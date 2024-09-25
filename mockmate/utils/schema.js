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
