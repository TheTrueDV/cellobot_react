import db from "db"
async function addBot(refresh_token) {
  let bot = await db.bots.findFirst({ where: { name: "cellobot" } })
  if (!bot) {
    bot = await db.bots.create({
      data: {
        name: "cellobot",
        refresh_token,
      },
    })
  }

  return { bot }
}

export default addBot
