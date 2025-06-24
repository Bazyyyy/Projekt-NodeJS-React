import { describe, it, expect } from 'vitest'
import { spawn } from 'child_process'
import path from 'path'

describe('Backend-Startskript', () => {
  it('sollte das Backend starten', (done) => {
    const script = path.resolve('./scripts/run-backend.sh')

    const proc = spawn('bash', [script], { cwd: process.cwd() })

    let output = ''
    proc.stdout.on('data', (data) => {
      output += data.toString()
      if (output.toLowerCase().includes('listening') || output.includes('Server läuft')) {
        proc.kill()
        expect(output.toLowerCase()).toContain('listening') 
        done()
      }
    })

    proc.stderr.on('data', (err) => {
      console.error('stderr:', err.toString())
    })

    setTimeout(() => {
      proc.kill()
      done(new Error('Timeout – kein Startsignal erkannt'))
    }, 7000)
  })
})
