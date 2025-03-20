import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  messages: defineTable({
    body: v.string(),
    user: v.string(),
  }),
  flags: defineTable({
    key: v.string(),
    value: v.boolean(),
  }),
});
