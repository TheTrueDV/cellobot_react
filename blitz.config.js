import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
// import { CustomRolesIsAuthorizedArgs } from "customAdapter"
import { decodeAuthHeader } from "./app/middlewares"
const config = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "cellobot_react",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],

  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
