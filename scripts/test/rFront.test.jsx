import { describe, it, expect } from 'vitest'
import { execFile } from 'child_process'

describe('Frontend-Startskript', () => {
  it('sollte im Testmodus laufen', (done) => {
    execFile('bash', ['./scripts/run-frontend.sh', '--test'], (error, stdout) => {
      expect(error).toBeNull()
      expect(stdout).toContain('Frontend würde gestartet')
      done()
    })
  })
})
