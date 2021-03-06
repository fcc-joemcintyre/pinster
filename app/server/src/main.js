const { processCommand } = require ('./cmd');
const server = require ('./server');

if (require.main === module) {
  main ();
}

// Process command line to start server.
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  const port = process.env.PORT || command.port;
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pinster';
  server.start (port, dbUri);
}
