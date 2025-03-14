import { query } from "./_generated/server";

export const recent = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").take(10);
  },
});
