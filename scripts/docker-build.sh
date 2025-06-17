#!/bin/bash
docker build -t todo-app .
docker run -it -p 5173:5173 -p 5000:5000 todo-app