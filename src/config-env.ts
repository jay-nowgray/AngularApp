import { DirectiveNormalizer } from "@angular/compiler";

const { writeFile } = require('fs');
const fs = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line argument passed
// with yargs
const environment = process.env.isProduction;// argv.environment;
//console.log(environment);
const isProduction = environment === 'prod';
//console.log(process);
if (!process.env.API_URL) {
    console.error('All the required environment variables were not provided!');
    process.exit(-1);
  }
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  BaseApi: "${process.env.API_URL}"
};
`;
var path = require('path')
//var path = './src/environments/';
ensureDirectoryExistence('./src/environments');
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    //console.log(err);
  }

  //console.log(`Wrote variables to ${targetPath}`);
});
 
function ensureDirectoryExistence(targetPath) {
 // var dirname = path.dirname(targetPath);
  if (fs.existsSync(targetPath)) {
    return true;
  }
  
  fs.mkdir(targetPath, { recursive: true }, (err) => {
    if (err) throw err;
});
}
// import { writeFile } from 'fs';
// require('dotenv').config();
// const environment = process.env.ENVIRONMENT;
// let apiURL;
// let apiURLTest;
// if (environment === 'production') {
//     apiURL = process.env.PRODUCTION_API_ENDPOINT;
// } else if (environment === 'test') {
//     apiURL = process.env.TEST_API_ENDPOINT;
// }
// apiURLTest = process.env.TEST_API_ENDPOINT;
// const targetPath = `./src/environments/environment.prod.ts`;
// const targetPath2 = `./src/environments/environment.ts`;
// const envConfigFile = `
// export const environment = { 
//     production: true, 
//     apiUrl: '${apiURL}'};`

// const envConfigFile2 = `
// export const environment = { 
//     production: true, 
//     apiUrl: '${apiURLTest}'};`

// writeFile(targetPath, envConfigFile, function (err) {
//     if (err) {
//         //console.log(err);
//     }
// })


// writeFile(targetPath2, envConfigFile2, function (err) {
//     if (err) {
//         //console.log(err);
//     }
// })