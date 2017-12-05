import { keys } from 'ramda'
import * as multimatch from 'multimatch'
import { IAddition } from '../utils'

const matchContent = config => {
  const labels = keys(config)

  return content => labels.some(label => (
    multimatch(content, config[label]).length > 0
  ))
}

export const getMatches = (additions, config) => {
  const match = matchContent(config)

  return additions.filter(addition => (
    match(addition.content)
  ))
}
