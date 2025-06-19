import {describe, it, expect} from 'vitest';
import {exec} from 'child_process';

describe('Docker Setup', () => {
    it('sollte das Image erfolgreich bauen', (done) => {
        exec('docker build -t todo-app .', (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stdout).toContain('Successfully');
            done();
        })
    })
    
    it.skip('sollte Container starten', (done) => {
        exec('docker run --rm -d -p 5173:5173 todo-app', (error, stdout) => {
           expect(error).toBeNull();
           console.log('Container startet mit ID:', stdout.trim());
           done();
        })
    })
})