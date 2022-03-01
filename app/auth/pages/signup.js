/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useMutation, useRouterQuery } from "blitz"
import createUser from "app/users/mutations/createUser"
import createBot from "app/bots/mutations/createBot"
import createChannel from "app/channels/mutations/createChannel"

function Signup() {
  const queryParams = useRouterQuery()
  const [createUserMutation] = useMutation(createUser)
  const [createBotMutation] = useMutation(createBot)
  const [createChannelMutation] = useMutation(createChannel)
  useEffect(() => {
    createUserMutation(queryParams)
      .then(({ user, additionalData }) => {
        window.localStorage.setItem("twitch_id", user.twitchId)
        window.localStorage.setItem("refresh_token", user.refreshToken)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    let refreshToken = window.localStorage.getItem("refresh_token")

    createBotMutation(refreshToken)
      .then((bot) => console.log(bot))
      .catch(console.error)
  }, [])

  useEffect(() => {
    let twitchId = window.localStorage.getItem("twitch_id")

    createChannelMutation(twitchId)
      .then((channel) => console.log(channel))
      .catch(console.error)
  }, [])

  useEffect(() => {
    // window.location.replace("/")
  })

  return <span>Loading...</span>
}

export default Signup
