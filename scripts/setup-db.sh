#!/bin/bash
echo "Starte SQL-Datenbank..."
rm -f backend/todo-backend/todo.db
sqlite3 backend/todo-backend/todo.db < backend/todo-backend/schema.sql
echo "Datenbank wurde neu erstellt."

