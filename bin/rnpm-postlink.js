#!/usr/bin/env node

const pbxproj = require('xcode');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const prompts = require('prompts');

const CWD = process.cwd();
const IOS_DIR_PATH = path.join(CWD, 'ios');
const SWIFT_PLACEHOLDER_FILE_PATH = path.join(
  IOS_DIR_PATH,
  'RNSingInWithApplePlaceholder.swift'
);
const SWIFT_REQUIRED_PROPS = {
  SWIFT_VERSION: '5.0',
};

function log(message) {
  console.log(`info [Sign in with Apple] ${message}`);
}

function warn(message) {
  console.log('\x1b[0m\x1b[33minfo [Sign in with Apple]\x1b[0m', message);
}

function success(message) {
  console.log('\x1b[32minfo [Sign in with Apple]\x1b[0m', message);
}

function info(message) {
  console.log('\x1b[36minfo [Sign in with Apple]\x1b[0m', message);
}

function error(message) {
  console.log('\x1b[31minfo [Sign in with Apple]\x1b[0m', message);
}

async function askForXprojDir() {
  const xprojGlobs = glob.sync(path.join(IOS_DIR_PATH, '*.xcodeproj'));
  if (xprojGlobs.length === 0) {
    return undefined;
  }

  if (xprojGlobs.length === 1) {
    return xprojGlobs[0];
  }

  const response = await prompts([
    {
      type: 'select',
      name: 'xprojfile',
      message: '[Sign in with Apple] Please, select iOS project file',
      choices: xprojGlobs.map(val => ({ title: val, value: val })),
    },
  ]);

  return response.xprojfile;
}

function createSwifthPlaceholderFile(proj, filePath) {
  fs.writeFileSync(filePath, '// RNSignWithApple placeholder Swift file');
  proj.addFile(filePath);
}

function addSwiftBuildProperties(proj) {
  Object.entries(SWIFT_REQUIRED_PROPS).forEach(([key, value]) => {
    proj.updateBuildProperty(key, value);
  });
}

function swiftRequiredBuildPropertiesAreSet(proj, properties) {
  return Object.keys(properties).every(
    prop => proj.getBuildProperty(prop) == properties[prop]
  );
}

/**
 * Main executable function
 */
async function postlink() {
  if (!fs.existsSync(IOS_DIR_PATH)) {
    error('Could not find iOS directory');
    process.exit();
  }

  const xProjdirPath = await askForXprojDir();
  if (!xProjdirPath) {
    error('Could not find iOS project directory');
  }

  const xProjectPath = `${xProjdirPath}/project.pbxproj`;
  const project = pbxproj.project(xProjectPath);
  project.parseSync();

  const _swiftPlaceholderFileExists = !!project.hasFile(
    SWIFT_PLACEHOLDER_FILE_PATH
  );

  const _swiftRequiredBuildPropertiesAreSet = swiftRequiredBuildPropertiesAreSet(
    project,
    SWIFT_REQUIRED_PROPS
  );

  if (!_swiftPlaceholderFileExists || !_swiftRequiredBuildPropertiesAreSet) {
    info('Ensuring project compatibility with Swift...');
  } else {
    success('Project is already compatible with Swift');
  }

  // Create and add Swift placeholder file to sources
  if (!_swiftPlaceholderFileExists) {
    createSwifthPlaceholderFile(project, SWIFT_PLACEHOLDER_FILE_PATH);
    info(' - Swift placeholder file created');
  }

  // Add Swift required build properties
  if (!_swiftRequiredBuildPropertiesAreSet) {
    addSwiftBuildProperties(project);
    info(' - Swift build properties added to Xcode project file');
  }

  if (!_swiftPlaceholderFileExists || !_swiftRequiredBuildPropertiesAreSet) {
    success('Project is now compatible with Swift');
  }

  fs.writeFileSync(xProjectPath, project.writeSync());
}

return postlink();
