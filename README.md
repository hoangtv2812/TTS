## Docker setup

```bash
  apt install make

  mkdir backend/node_modules
  cp backend/docker/docker-compose.env.example backend/docker/docker-compose.env
  make build_backend
  make dev_backend

#   cp frontend/.env.example frontend/.env
  mkdir frontend/node_modules
  make build_frontend
  make dev_frontend
```
