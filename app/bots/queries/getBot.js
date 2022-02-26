import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetBot = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetBot), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bot = await db.bot.findFirst({
    where: {
      id,
    },
  })
  if (!bot) throw new NotFoundError()
  return bot
})
