import { OAuth2Client, TokenPayload } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleAuth = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const email = ticket.getPayload()?.email
  const name = ticket.getPayload()?.name
  const picture = ticket.getPayload()?.picture
  
  return { email, name, picture }
}
