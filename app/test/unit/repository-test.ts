import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Repository } from '../../src/models/repository'

describe('Repository', () => {
  describe('name', () => {
    it('uses the last path component as the name', async () => {
      const repoPath = '/some/cool/path'
      const repository = new Repository(repoPath, -1, null, false)
      assert.equal(repository.name, 'path')
    })

    it('handles repository at root of the drive', async () => {
      const repoPath = 'T:\\'
      const repository = new Repository(repoPath, -1, null, false)
      assert.equal(repository.name, 'T:\\')
    })

    it('uses the main worktree path when switched onto a linked worktree', async () => {
      const mainPath = '/some/cool/path'
      const worktreePath = '/some/cool/path-wt-a'
      const repository = new Repository(
        worktreePath,
        -1,
        null,
        false,
        null,
        {},
        false,
        undefined,
        mainPath
      )
      assert.equal(repository.name, 'path')
    })
  })
})
