import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateBot = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateBot),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bot = await db.bot.update({
      where: {
        id,
      },
      data,
    })
    return bot
  }
)
