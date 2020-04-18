import semver from 'semver';
import { PackageJson } from '..';

const pkg: PackageJson = require('../../package');

export const validateNodeVersion = () => semver.satisfies(process.versions.node, pkg.engines.node);
