import { program } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import server from './server.js';
import { initialize, ExecPHPConfigJson } from './templates/templates.js'; 

program
    .version('1.0.0')
    .description("An HTTP server for your PHP apps");

program.command('init <path>')
    .description('Creates configuration files and folders')
    .action((dirPath: string) => {
        initialize(dirPath);
    });

program.command('up')
    .description("Start the HTTP server and serve your app")
    .action(() => {
        console.log("Looking for config file...");
        const configFile = path.join(process.cwd(), 'execphp.config.json');
        if (!fs.existsSync(configFile)) {
            program.error("ERR! Couldn't find a config file.");
        }

        console.log("Found.");
        const configs = JSON.parse(fs.readFileSync(configFile, { encoding: 'utf-8' })) as ExecPHPConfigJson;
        
        server(configs.port, path.join(process.cwd(), configs.outDir));
    });

program.parse();