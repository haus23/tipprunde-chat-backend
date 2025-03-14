import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recent = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(10);
  },
});

export const create = mutation({
  args: {
    user: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", args);
  },
});
