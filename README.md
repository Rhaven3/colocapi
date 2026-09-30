# Coloc API

Build the production image:

```bash
docker build -t coloc-api .
```

For local testing, publish the API on port `3000`:

```bash
docker run --rm -p 3000:3000 coloc-api
```

The JSON files are stored in `/app/data`. Use a named volume to preserve application data across container upgrades:

```bash
docker volume create coloc-api-data
docker run -d --name coloc-api \
  -p 3000:3000 \
  -v coloc-api-data:/app/data \
  coloc-api
```

For the full application deployment, use the Compose file in the frontend repository (`../coloc/compose.yaml`). From that repository, run:

```powershell
docker compose up --build -d
```

Compose builds both images, connects them on a private network, persists the JSON data, and publishes only the frontend port. The frontend proxies `/api` requests to this API over the internal network. The API container exposes `/healthz` for Docker health checks.

You can override the API port with `PORT` and the JSON directory with `DATA_DIR`.
