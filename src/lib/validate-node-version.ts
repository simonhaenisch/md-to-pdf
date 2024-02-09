import semver from 'semver';
import { PackageJson } from '..';

const pkg: PackageJson = require('../../package.json');

export const validateNodeVersion = () => semver.satisfies(require('process').versions.node as string, pkg.engines.node);
