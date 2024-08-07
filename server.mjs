// import csurf from "tiny-csrf";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./src/routes/index.mjs";
import db from "./src/config/dbConnection.mjs";

import contentRoutes from "./src/routes/contentRoutes.mjs";
// import csrfRoutes from "./src/routes/csrfRoutes.mjs";
import profileRoutes from "./src/routes/profileRoutes.mjs";
import sessionRoutes from "./src/routes/sessionRoutes.mjs";
import tvtrailerRoutes from "./src/routes/tvtrailerRoutes.mjs";
import userRoutes from "./src/routes/usersRoutes.mjs";
import watchlistsRoutes from "./src/routes/watchlistsRoutes.mjs";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("common"));
// app.use(cookieParser("901234567iamasecret987654321look"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(csurf("901234567iamasecret987654321look"));
app.use(express.json());

app.use("/api/content", contentRoutes);
// app.use("/api/csrf", csrfRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/tvtrailer", tvtrailerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/watchlists", watchlistsRoutes);

app.use(routes);

/**
 * Normalize uma porta em um número, string ou false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Ouvinte de eventos para o evento "Erro" do servidor HTTP.
 */
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + PORT;

  // lidar com erros de escuta específicos com mensagens amigáveis
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requer privilégios elevados");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " já está em uso");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Ouvinte de eventos para o evento "listening" do servidor HTTP.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Ouvindo " + bind);
};

const PORT = normalizePort(process.env.PORT || 8000);

const server = app.listen(PORT, () =>
  console.log(
    `Servidor em execução em modo '${process.env.NODE_ENV}' na porta ${PORT}`
  )
);

server.on("error", onError);
server.on("listening", onListening);

try {
  await db.authenticate();
  console.log("A conexão foi estabelecida com sucesso.");
  db.sync(() =>
    console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)
  );
} catch (error) {
  console.error("Não foi possível conectar ao banco de dados:", error);
}
