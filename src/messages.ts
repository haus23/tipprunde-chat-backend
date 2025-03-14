import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const list = query({
  args: { paginationOpts: paginationOptsValidator, apiKey: v.string() },
  handler: async (ctx, { paginationOpts, apiKey }) => {
    if (apiKey !== process.env.API_KEY) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db
      .query("messages")
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const create = mutation({
  args: {
    user: v.string(),
    body: v.string(),
    apiKey: v.string(),
  },
  handler: async (ctx, { apiKey, ...data }) => {
    if (apiKey !== process.env.API_KEY) {
      throw new ConvexError("Unauthorized");
    }
    await ctx.db.insert("messages", data);
  },
});
