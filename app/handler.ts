import * as createProbot from './probot'
import * as loveyourcodeCert from '../cert/loveyourcode.pem'
import { receiver } from './receiver'

const probot = createProbot({
  id: process.env.APP_ID,
  cert: loveyourcodeCert,
  secret: process.env.WEBHOOK_SECRET,
  port: 0
})

probot.load(receiver)

export async function github(event, context, callback) {
  const githubEvent = (
    event.headers['x-github-event'] ||
    event.headers['X-GitHub-Event']
  )
  
  // Convert the payload to an Object if API Gateway stringifies it
  event.body = (typeof event.body === 'string') ?
    JSON.parse(event.body) : event.body
  
  try {
    probot.receive({
      event: githubEvent,
      payload: event.body
    })
    .then(() => {
      const res = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Executed'
        })
      }
      callback(null, res)
    })

  } catch (err) {
    console.log(err)
    callback(err)
  }
}
