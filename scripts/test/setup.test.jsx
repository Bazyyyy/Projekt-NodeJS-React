import { describe, it, expect, afterEach } from 'vitest'
import { execFile } from 'child_process'
import { existsSync, rmSync } from 'fs'
import path from 'path'

const dbFile = path.resolve('backend/todo-backend/todo.db')
const script = './scripts/setup-db.sh'

describe('setup-db.sh', () => {
  afterEach(() => {
    try {
      if (existsSync(dbFile)) rmSync(dbFile)
    } catch (err) {
      console.warn('Cleanup fehlgeschlagen:', err.message)
    }
  })

  it('sollte die Datenbank neu erzeugen', (done) => {
    
    try {
      if (existsSync(dbFile)) rmSync(dbFile)
    } catch (err) {
      console.warn('Vorheriges Löschen fehlgeschlagen:', err.message)
    }

    execFile('bash', [script], (error, stdout) => {
      expect(error).toBeNull()
      expect(stdout).toContain('Datenbank wurde neu erstellt.')
      expect(existsSync(dbFile)).toBe(true)
      done()
    })
  })
})
