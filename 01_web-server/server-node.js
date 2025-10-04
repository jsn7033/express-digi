const http = require("http");
const localHost = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, resp) => {
  if (req.url === "/") {
    resp.statusCode = 200;
    resp.setHeader("Content-type", "text/plain");
    resp.end("Hello ice tea");
  } else if (req.url === "/ice-tea") {
    resp.statusCode = 200;
    resp.setHeader("Content-type", "text/plain");
    resp.end("thank you for ordering ice tea");
  } else {
    resp.statusCode = 404;
    resp.setHeader("Content-type", "text/plain");
    resp.end("404 Not found");
  }
});

server.listen(port, localHost, () => {
  console.log("Server is listening at", `http://${localHost}:${port}`);
});
