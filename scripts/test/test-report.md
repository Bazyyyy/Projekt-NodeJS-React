1. dev.sh
    - Startet den Entwicklungsmodus von Frontend u/o Backend.
    - Überprüfung ob Skript im --test Modus den erwarteten Hinweis "Test: Entwicklungsmodus wird simuliert"
    - Erfolgreich
2. docker-build.sh
    - Docker Image bauen und Container starten.
    - Simulation via --test, prüft ob Befehl korrekt erkannt und ausgegebn wird.
    - Erfolgreich simuliert ohne realen Container start.
3. logs.sh
    - Prüft Existenz der Logdatei server.log und zeigt sie live an.
    - Fehler der Datei gibt warnung aus.
    - Existenz und Inhalt wird gestartet.
    - Erfolgreich
4. run-backend.sh
    - Navigiert ins Backend-Verzeichnis, ausführen von npm install und npm run start.
    - Test via --test
    - Erfolgreich
5. run-frontend.sh
    - Navigiert ins Frontend-Verzeichnis, ausführen von npm install und npm run dev.
    - Getestet mit Testmodus --test, überprüft stdout.
    - Erfolgreich
6. setup-db.sh
    - Löscht alte todo.db, läd neues schema.
    - Existenzprüfung und Löschung der alten Datei vor dem Test.
    - Nach dem Test muss neue DB vorhanden sein.
    - Erfolgreich
7. stop.sh
    - Beendet alle Prozesse die zum Projekt gehören.
    - Simuliert Aufruf mit --test, prüft PIDs ausgabe und Abschaltmeldung.
    - Erfolgreich, simulieren von Prozess beendung