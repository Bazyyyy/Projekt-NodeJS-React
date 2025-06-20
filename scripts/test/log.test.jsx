import {describe, it, expect} from 'vitest';
import {execFile } from 'child_process';
import { mkdirSync, writeFileSync, rmSync } from 'fs';
import path from 'path';

const logDir = path.resolve('logs');
const logFile = path.resolve(logDir, 'server.log');
const script= './scripts/logs.sh';

describe('Logdatei-Skript', () => {
    it('sollte Fehler ausgeben, wenn die Logdatei nicht existiert', (done) => {
        rmSync(logFile, {force: true});

        execFile('bash', [script],(error, stdout, stderr) => {
            expect(error).not.toBeNull();
            expect(stdout).toContain('Log-Datei nicht gefunden');
            done();
        })
    })

    it('sollte eine Logdatei erstellen, wenn sie nicht existiert', (done) => {
        mkdirSync(logDir, {recursive: true});
        writeFileSync(logFile, 'Initial log\n');

        const proc = execFile('bash', [script])

        let buffer = '';
        proc.stdout.on('data', (data) => {
            buffer += data.toString();
            if (buffer.includes('Initial log')) {
                proc.kill();
                expect(buffer).toContain('Initial log');
                done();
            }
        })

        proc.stderr?.on('data', (err) => {
            console.error('STDERR:', err.toString());
        })

        setTimeout(() => {
            proc.kill();
            done(new Error('Logdatei wurde nicht aktualisiert'));
        }, 3000);
    })
})