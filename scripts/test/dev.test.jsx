import { describe, it, expect } from 'vitest'
import { execFile } from 'child_process'

describe('dev.sh', () => {
  it('sollte den Testmodus ohne Fehler starten', (done) => {
    execFile('bash', ['./scripts/dev.sh', '--test'], (error, stdout, stderr) => {
      expect(error).toBeNull()
      expect(stdout).toContain('Test: Entwicklungsmodus wird simuliert')
      done()
    })
  })
})
