import app from "./index.ts";
import "./cron/scheduler.ts";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

app.get("/healthz", (_request, response) => {
  response.status(200).type("text/plain").send("ok");
});

app.listen(port, host, () => {
  console.log(`API listening on ${host}:${port}`);
});
