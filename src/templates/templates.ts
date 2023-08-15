import fs from 'fs-extra';
import path from 'path';

import './execphp.config.json';

export interface ExecPHPConfigJson {
    port: number,
    outDir: string,
    sourceDir: string
}

/**
 * Creates a configuration files and folders
 * @param path The path to the folder to be initialized
 */
export function initialize(dirPath: string) {
    const fullPath = path.resolve(dirPath);
    console.log(`Initializing ${fullPath}...`);
    console.time('done in');

    fs.mkdir(path.join(fullPath, 'dist'))
        .then(() => {
            console.log("Created directory 'dist/'")
        })
        .catch((err) => {
            console.error(`Create directory 'dist/' failed due to: ${err}`);
        });
    fs.mkdir(path.join(fullPath, 'src'))
        .then(() => {
            console.log("Created directory 'src/'");
        })
        .catch((err) => {
            console.error(`Create directory 'src/' failed due to: ${err}`);
        });
    fs.copy(path.join(__dirname, 'execphp.config.json'), path.join(fullPath, 'execphp.config.json'))
        .then(() => {
            console.log("Created configuration file 'execphp.config.json'");
        })
        .catch((err) => {
            console.log(`Create configuration file 'execphp.config.json' failed due to ${err}`);
        });
    
    console.timeEnd("done in");
}