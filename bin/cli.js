#!/usr/bin/env node

const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/LogiqOn/aws-cdk-monorepo-template.git ${repoName}`;

const installDepsCommand = `cd ${repoName} && yarn install`;

console.log(`Clonning the repository with name ${repoName}`);
const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit(-1);

const deleteBinFolder = runCommand(`rm -rf ${repoName}/bin/`);
if (!deleteBinFolder) process.exit(-1);

const package = require('../package.json');

package.private = true;
package.name = repoName;
package.version = '1.0.0';

delete package.files;
delete package.bin;

writeFileSync(`${repoName}/package.json`, JSON.stringify(package, null, 2));

console.log(`Installing dependencies for ${repoName}`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);

console.log(
  'Congratulations! You are redy. Follow the following commands to start'
);
