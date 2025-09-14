#!/bin/bash
npx concurrently \
  "cd backend/todo-backend && npm run dev" \
  "cd frontend && npm run dev"
