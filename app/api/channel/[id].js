import { getNodeText } from "@testing-library/dom"
import { decodeAuthHeader } from "../../middlewares/index"
import { updateChannel } from "../../channels/mutations/updateChannel"
const handler = async (req, res, next) => {
  res.statusCode = 200
  // res.setHeader("Content-Type", "application/json")
  if (req.method === "PATCH") {
    const user = await decodeAuthHeader(req)
    // TODO: Check manager collection too, not just id
    if (req.params.id !== user.twitchId) {
      const error = new Error("Not Allowed")
      return next(error)
    }
    // do it
    res.json(user)
  } else {
  }
}
export default handler
