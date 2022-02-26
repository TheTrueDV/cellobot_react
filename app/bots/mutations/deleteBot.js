import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteBot = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteBot), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bot = await db.bot.deleteMany({
    where: {
      id,
    },
  })
  return bot
})
