import { resolve } from "node:path";

import { getDefaultConfig } from "expo/metro-config.js";

const appDir = import.meta.dirname;
const rootDir = resolve(appDir, "..");

const config = getDefaultConfig(appDir);

config.watchFolders = [rootDir];
config.resolver.nodeModulesPaths = [
  resolve(appDir, "node_modules"),
  resolve(rootDir, "node_modules"),
];

export default config;
