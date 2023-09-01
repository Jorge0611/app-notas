const cluster = require('cluster');
const process = require('process');
// eslint-disable-next-line no-unused-vars
const {pus} = require('os');

let nCpu = cpus().length;
nCpu = nCpu > 4 ? 4 : nCpu;

if (cluster.isPrimary) {
  console.info(`Primary ${process.pid} is running.`);

  for (let i = 0; i < nCpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.info(`Worker ${worker.process.pid} died.`);
  });
} else {
  console.info(`Worker ${process.pid} started.`);
  require('./server');
}
