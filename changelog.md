# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.1](https://github.com/simonhaenisch/md-to-pdf/compare/v3.1.0...v3.1.1) 
(2020-06-05)

Warning: Updates marked to 1.1.0 which has some breaking changes (see https://github.com/markedjs/marked/releases/tag/v1.0.0), and those might also apply to the usage of this package if a custom renderer was used. I don't expect anyone to run into issues though which is why I decided not to do a major version bump.

## [3.1.0](https://github.com/simonhaenisch/md-to-pdf/compare/v3.0.1...v3.1.0) (2020-04-18)


### Features

* **cli:** add node version check ([be72a7d](https://github.com/simonhaenisch/md-to-pdf/commit/be72a7d4bbf6aa8a66aefccb42c5d3b0bb2688eb)), closes [#70](https://github.com/simonhaenisch/md-to-pdf/issues/70) [#71](https://github.com/simonhaenisch/md-to-pdf/issues/71)

### [3.0.1](https://github.com/simonhaenisch/md-to-pdf/compare/v3.0.0...v3.0.1) (2020-03-28)


### Bug Fixes

* engines field (required node version) ([9e88564](https://github.com/simonhaenisch/md-to-pdf/commit/9e8856406b684a099261e4b2800df65b8a52c2a4))

## [3.0.0](https://github.com/simonhaenisch/md-to-pdf/compare/v3.0.0-pre.1...v3.0.0) (2020-02-29)


### Features

* output to stdout if input comes from stdin ([73f8e0d](https://github.com/simonhaenisch/md-to-pdf/commit/73f8e0d38bc205031f35099485bcfdca0b035fe0))

## [3.0.0-pre.1](https://github.com/simonhaenisch/md-to-pdf/compare/v3.0.0-pre.0...v3.0.0-pre.1) (2020-02-01)


### ⚠ BREAKING CHANGES

* The `--debug` flag has been removed. All errors are printed instead, in the hopes that giving the user every hint possible will help them get down to the root of their problem. Hopefully the error stacks don't confuse anyone. 🤓

### Features

* get rid of the --debug flag ([94fb214](https://github.com/simonhaenisch/md-to-pdf/commit/94fb214980f27f867659c37d1137f8864158ca9b)), closes [#54](https://github.com/simonhaenisch/md-to-pdf/issues/54)

## [3.0.0-pre.0](https://github.com/simonhaenisch/md-to-pdf/compare/v2.8.2...v3.0.0-pre.0) (2020-01-26)


### ⚠ BREAKING CHANGES

* the CLI can't be invoked without specifying any input files anymore. To convert all files in a directory, use a shell glob instead (e. g. `md-to-pdf *.md`). It's now possible to read markdown from stdin.

The whole source code has been converted to Typescript. The minimum required node version has been increased to v10.0.0 (current LTS). It should still work with v8.3.0+ but the tests won't be able to run.

The license has been changed to MIT.

### Features

* allow input from std in or shell globbing for multiple files ([8051c42](https://github.com/simonhaenisch/md-to-pdf/commit/8051c4286f629154eb932f60926392ba5fd8b97d))
* auto-enable displayHeaderFooter if template is set ([b3ac8d9](https://github.com/simonhaenisch/md-to-pdf/commit/b3ac8d99de643921d563914ffa97417a3abe10b2)), closes [#59](https://github.com/simonhaenisch/md-to-pdf/issues/59)
* expose `--port` cli flag ([1f22656](https://github.com/simonhaenisch/md-to-pdf/commit/1f2265696840c032905a85cc2ff9435e8a73ba21))
* merge v3 ([#39](https://github.com/simonhaenisch/md-to-pdf/issues/39)) ([20ca196](https://github.com/simonhaenisch/md-to-pdf/commit/20ca1964a93d9aae3e7f9551f3a1e92cefaca12b))
* set process and  xterm title ([04b985e](https://github.com/simonhaenisch/md-to-pdf/commit/04b985e6aee64e1de2ce22aa8322b5033615eb8e))


### Bug Fixes

* **cli:** merge pdf_options of config file properly ([d85558d](https://github.com/simonhaenisch/md-to-pdf/commit/d85558d9304ff61a15335cc764066616129c3fd3))
* **cli:** package.json path for version info ([a7a5817](https://github.com/simonhaenisch/md-to-pdf/commit/a7a5817fa7b03161ab31b056036223c0b90c5674))
* relative paths ([bb46626](https://github.com/simonhaenisch/md-to-pdf/commit/bb466261ba28f283e01e01260a4de04c2c398c6d))
* ul/ol margin ([80d36d5](https://github.com/simonhaenisch/md-to-pdf/commit/80d36d507594962b94e3530738b521d952f4b68b)), closes [#36](https://github.com/simonhaenisch/md-to-pdf/issues/36)

### [2.8.2](https://github.com/simonhaenisch/md-to-pdf/compare/v2.8.1...v2.8.2) (2019-11-26)

### [2.8.1](https://github.com/simonhaenisch/md-to-pdf/compare/v2.8.0...v2.8.1) (2019-09-18)

## [2.8.0](https://github.com/simonhaenisch/md-to-pdf/compare/v2.7.1...v2.8.0) (2019-08-30)


### Features

* allow to extend renderer ([4611688](https://github.com/simonhaenisch/md-to-pdf/commit/4611688)), closes [#46](https://github.com/simonhaenisch/md-to-pdf/issues/46)

### [2.7.1](https://github.com/simonhaenisch/md-to-pdf/compare/v2.7.0...v2.7.1) (2019-05-31)


### Tests

* **circleci:** use `node:8-browser` docker image ([fff5f0f](https://github.com/simonhaenisch/md-to-pdf/commit/fff5f0f))
* don't reuse filenames ([b0ce9b6](https://github.com/simonhaenisch/md-to-pdf/commit/b0ce9b6))
* split execution of lib, api and cli specs ([e6b0ca1](https://github.com/simonhaenisch/md-to-pdf/commit/e6b0ca1))



# [2.7.0](https://github.com/simonhaenisch/md-to-pdf/compare/v2.6.4...v2.7.0) (2019-04-28)


### Features

* add option to generate html output instead of pdf ([c784a8a](https://github.com/simonhaenisch/md-to-pdf/commit/c784a8a))



## [2.6.4](https://github.com/simonhaenisch/md-to-pdf/compare/v2.6.3...v2.6.4) (2019-02-27)


### Bug Fixes

* is-url check should only check for http urls ([2ed9d7b](https://github.com/simonhaenisch/md-to-pdf/commit/2ed9d7b))



<a name="2.6.2"></a>
## [2.6.2](https://github.com/simonhaenisch/md-to-pdf/compare/v2.6.1...v2.6.2) (2019-02-10)



<a name="2.6.1"></a>
## [2.6.1](https://github.com/simonhaenisch/md-to-pdf/compare/v2.5.0...v2.6.1) (2019-01-21)


### Bug Fixes

* merge pdf options into defaults properly ([d13f5e2](https://github.com/simonhaenisch/md-to-pdf/commit/d13f5e2))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/simonhaenisch/md-to-pdf/compare/v2.4.2...v2.5.0) (2019-01-20)


### Bug Fixes

* **api:** type check for md file argument ([4944e8e](https://github.com/simonhaenisch/md-to-pdf/commit/4944e8e))


### Features

* expose programmatic api ([8c86807](https://github.com/simonhaenisch/md-to-pdf/commit/8c86807)), closes [#25](https://github.com/simonhaenisch/md-to-pdf/issues/25)



<a name="2.4.2"></a>
## [2.4.2](https://github.com/simonhaenisch/md-to-pdf/compare/v2.4.1...v2.4.2) (2018-11-27)


### Bug Fixes

* properly resolve path to highlight.js stylesheets ([64b0390](https://github.com/simonhaenisch/md-to-pdf/commit/64b0390)), closes [#21](https://github.com/simonhaenisch/md-to-pdf/issues/21)



<a name="2.4.0"></a>
## [2.4.0](https://github.com/simonhaenisch/md-to-pdf/compare/v2.3.2...v2.4.0) (2018-11-14)


### Bug Fixes

* pdf-options weren't working from CLI args ([f7b16af](https://github.com/simonhaenisch/md-to-pdf/commit/f7b16af))


### Features

* expose puppeteer launch options ([aa36a5e](https://github.com/simonhaenisch/md-to-pdf/commit/aa36a5e))


<a name="2.3.2"></a>
## [2.3.2](https://github.com/simonhaenisch/md-to-pdf/compare/v2.3.1...v2.3.2) (2018-11-10)


### Bug Fixes

* **css:** inline code inside list items ([dd7fca6](https://github.com/simonhaenisch/md-to-pdf/commit/dd7fca6))
