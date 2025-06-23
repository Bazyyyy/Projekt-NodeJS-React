#!/bin/bash

echo "Überfällige Aufgaben:"
sqlite3 backend/todo-backend/todo.db"
SELECT id, title, deadline FROM todos
WHERE deadline < DATE('now') AND done = 0;
"