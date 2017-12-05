import {
  getChanges,
  getAdditions,
  getMatches,
  IAddition
} from '../utils'

export const CONFIG_FILE = 'loveyourcode.yml'

export function receiver(robot) {
  robot.on('push', async context => {
    const payload = context.payload;
    const github = await robot.app.asInstallation(payload.installation.id)
    const config = await context.config(CONFIG_FILE)

    if (config) {
      const changes = (await getChanges(github, payload))
        .map((change, index) => ({ ...change, id: payload.commits[index].id }))

      const additions = changes.reduce<Array<IAddition>>(
        (acc, change) => acc.concat(getAdditions(change)), []
      )

      // TODO: create isses for matched issues
      console.log(getMatches(additions, config))
    }
  })
}
