import { flatten } from 'ramda'
import * as diffParse from 'parse-diff'

export const CHUNK_TYPE_ADD = 'add'

export interface IAddition {
  id: string
  path: string
  content: string
  lineNumber: number
}

export const filterChunks = (id, path, changes): IAddition => (
  changes
    .filter(change => change.type === CHUNK_TYPE_ADD)
    .map(change => ({
      id, path,
      content: change.content.substr(1),
      lineNumber: change.ln
    })
  )
)

export const getAdditions = (change): Array<IAddition> => {
  const diffs = diffParse(change.data)

  return flatten<IAddition>(
    diffs.map(diff => diff.chunks
      .map(chunk => filterChunks(
        change.id, diff.to, chunk.changes
      ))
    )
  )
}
