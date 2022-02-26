import db from "db"

/**
 *
 * @param {id, ...data} - Pass in the ID and any data.
 */
export default async function updateChannel(id, ...data) {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const channel = await db.channels.update({
    where: {
      id,
    },
    data,
  })
  console.log(channel)
}
