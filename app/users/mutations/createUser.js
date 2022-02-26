import axios from "axios"
import config from "app/config"
import db from "db"
async function addUser({ code, scope }) {
  const authBaseUrl = "https://id.twitch.tv/oauth2"
  const authAPI = axios.create({
    baseURL: authBaseUrl,
  })
  const helixBaseUrl = "https://api.twitch.tv/helix"
  const helix = axios.create({
    baseURL: helixBaseUrl,
  })

  const qs = new URLSearchParams({
    client_id: config.TWITCH_CLIENT_ID,
    client_secret: config.TWITCH_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/signup",
  })

  const {
    data: { access_token: accessToken, refresh_token: refreshToken },
  } = await authAPI.post(`/token?${qs}`)

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  const {
    data: { data },
  } = await helix.get(`/users`, {
    headers: {
      "Client-Id": config.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const { id: twitchId, display_name, profile_image_url, email } = data[0]

  let user = await db.users.findFirst({ where: { twitchId } })
  if (!user) {
    user = await db.users.create({
      data: {
        twitchId,
        refreshToken,
      },
    })
  }
  const additionalData = { display_name, profile_image_url, email }
  return { user, additionalData }
}

export default addUser
