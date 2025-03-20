import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const getAll = query({
  args: {
    apiKey: v.string(),
  },
  handler: async (ctx, { apiKey }) => {
    if (apiKey !== process.env.API_KEY) {
      throw new ConvexError("Unauthorized");
    }
    await ctx.db.query("flags").collect();
  },
});
