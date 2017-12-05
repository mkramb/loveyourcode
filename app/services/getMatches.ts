import { keys } from 'ramda'
import * as minimatch from 'minimatch'
import { IAddition } from '../services'

const matchContent = config => {
  const labels = keys(config)

  return content => labels.some(label => (
    minimatch(content, config[label], { nocase: true })
  ))
}

export const getMatches = (additions, config) => {
  const match = matchContent(config)

  return additions.filter(addition => (
    match(addition.content)
  ))
}
