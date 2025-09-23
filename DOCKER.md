# Docker Guide

End-tYou can pass Vite build-time envs (e.g., Stripe keys) as `--build-arg`. If you don't need them, you can skip.-end instructions to containerize and run the JobPsych frontend (Vite + React) using the provided Dockerfile and Nginx runtime.

This guide assumes Windows with PowerShell (pwsh.exe) and Docker Desktop.

## 1) Prerequisites

- Docker Desktop 4.x or newer
- Network access to the backend APIs (configured in `src/utils/api.js`)
- Optional: Stripe publishable key to enable Stripe features at build time

## 2) Project layout

Important docker-related files in this repo:

- `Dockerfile` – multi-stage build (Node 20 -> Nginx static serve)
- `nginx.conf` – SPA routing fallback to `index.html` and basic headers
- `.dockerignore` – excludes `node_modules`, `dist`, VCS, env files
- `docker-compose.yml` – convenience wrapper for build/run

## 3) Build the image (Docker CLI)

You can pass Vite build-time envs (e.g., Stripe or Clerk keys) as `--build-arg`. If you don’t need them, you can skip.

PowerShell examples:

- Optional: set Stripe keys

```powershell
$env:VITE_STRIPE_PUBLISHABLE_KEY = "pk_test_..."
```

- Build the image from the frontend folder (where the Dockerfile is)

```powershell
docker build -t jobpsych-frontend `
  --build-arg VITE_STRIPE_PUBLISHABLE_KEY="$env:VITE_STRIPE_PUBLISHABLE_KEY" `
  .
```

Notes:

- Vite uses envs at build time only. Changing `VITE_*` values requires rebuilding the image.
- The build runs `npm ci` (if `package-lock.json` is present) or `npm i`, then `npm run build`.

## 4) Run the container (Docker CLI)

- Start the container and map port 8080 on your machine to port 80 in the container:

```powershell
docker run --name jobpsych-frontend -p 8080:80 jobpsych-frontend
```

- Open the app: <http://localhost:8080>

- Stop & remove when done:

```powershell
docker stop jobpsych-frontend
docker rm jobpsych-frontend
```

Common issues:

- "container name already in use": remove the previous container (see stop/remove above) or run with a different `--name`.
- Port conflict on 8080: choose another host port, e.g. `-p 3000:80` and visit <http://localhost:3000>.

## 5) Using Docker Compose

- Optional: set Stripe/Clerk keys for build

```powershell
$env:VITE_STRIPE_PUBLISHABLE_KEY = "pk_test_..."
$env:VITE_CLERK_PUBLISHABLE_KEY = "pk_test_..."
```

- Build and start in the background:

```powershell
docker compose build
docker compose up -d
```

- View logs:

```powershell
docker compose logs -f
```

- Stop & remove:

```powershell
docker compose down
```

## 6) How it works

- Multi-stage Dockerfile
  - Stage 1 (builder): Node 20-alpine installs deps and runs `vite build` to produce static assets in `dist/`.
  - Stage 2 (runtime): Nginx serves `dist/` from `/usr/share/nginx/html`.
- `nginx.conf` mirrors `vercel.json` by falling back to `index.html` for unknown routes so client-side routing works.
- A basic HTTP healthcheck is configured for Nginx.

## 7) Environment variables

- Build-time only (Vite): Any `VITE_*` variables (e.g., `VITE_STRIPE_PUBLISHABLE_KEY`) are baked into the static build; use `--build-arg` or set the variable before building.
- Runtime: This is a static site; changing runtime envs won’t affect the already-built assets. Rebuild if you need to change `VITE_*` values.
- Backend URLs: The app’s API endpoints are set in `src/utils/api.js` (currently pointing to hosted services). Update before building if you need different endpoints.

## 8) Verifying

- After running the container, visit <http://localhost:8080>
- Navigate to nested routes; they should work due to the SPA fallback to `index.html`.

## 9) Troubleshooting

- Blank page or console errors referencing Stripe: ensure `VITE_STRIPE_PUBLISHABLE_KEY` was provided at build time if your flows require Stripe.
- 404s on direct URL access: confirm the container is using the provided `nginx.conf` and that `try_files` fallback is active.
- Stale assets after a redeploy: current Vite config disables hashed filenames; browsers may cache assets. You can hard-refresh or tweak caching policy in `nginx.conf`. Alternatively, enable hashed asset names in `vite.config.js` and adjust Nginx cache TTLs.
- Build failures: clean up previous builds/containers and try again. On low-resource systems, ensure Docker has enough memory/CPU.

## 10) Production tips

- Use a registry:

```powershell
docker tag jobpsych-frontend your-registry.example.com/jobpsych-frontend:latest
docker push your-registry.example.com/jobpsych-frontend:latest
```

- Run behind a reverse proxy or load balancer; terminate TLS there.
- Consider enabling hashed filenames in Vite for better cache-busting and adjusting Nginx caches accordingly.
- Run behind a reverse proxy or load balancer; terminate TLS there.
- Consider enabling hashed filenames in Vite for better cache-busting and adjusting Nginx caches accordingly.

## Running the Docker image

docker run -p 8080:80 --env-file .env jobpsych-frontend
