import {describe, it, expect} from 'vitest';
import {execFile} from 'child_process';

describe('stop.sh', () => {
    it('sollte im Testmodus laufen', (done) => {
        execFile('bash', ['./scripts/stop.sh', '--test'], (error, stdout) => {
          expect(error).toBeNull();
          expect(stdout).toContain('Testmodus aktiviert');
          expect(stdout).toContain('Prozess würde enden');
          done();  
        })
    })
})