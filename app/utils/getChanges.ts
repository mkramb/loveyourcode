export const HEADER_AS_DIFF = {
  accept: 'application/vnd.github.v3.diff'
}

export const getChanges = (github, payload) => {
  const { before, commits, repository } = payload;

  return Promise.all(commits.map(commit => 
    github.repos.compareCommits({
      headers: HEADER_AS_DIFF,
      owner: repository.owner.login,
      repo: repository.name,
      head: commit.id,
      base: before
    })
  ))
}
