import db from "db"
import jwt from "../../lib/jwt"
async function addChannel(twitchId) {
  let channel = await db.channels.findFirst({ where: { twitchId: twitchId } })
  const loginToken = await jwt.sign({ twitchId })
  if (!channel) {
    channel = await db.channels.create({
      data: {
        twitchId,
        enabled: false,
        loginToken,
      },
    })
  }
  return { channel }
}

export default addChannel
