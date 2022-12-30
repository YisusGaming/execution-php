import { program } from 'commander';
import server from './server.js';
import { initialize } from './templates/templates.js'; 

program
    .version('1.0.0')
    .description("An HTTP server for your PHP apps");

program.command('init <path>')
    .description('Creates configuration files and folders')
    .action((path: string) => {
        initialize(path);
    });

program.command('up')
    .description("Start the HTTP server and serve your app")
    .action(() => {
        server();
    });

program.parse();