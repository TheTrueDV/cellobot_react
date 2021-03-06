import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteChannel = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteChannel), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const channel = await db.channels.deleteMany({
    where: {
      id,
    },
  })
  return channel
})
