# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.2.4](https://github.com/simonhaenisch/md-to-pdf/compare/v5.2.3...v5.2.4) (2023-04-04)


### Bug Fixes

* do not emit process title to stdout ([#179](https://github.com/simonhaenisch/md-to-pdf/issues/179)) ([de05e99](https://github.com/simonhaenisch/md-to-pdf/commit/de05e996a7dd4a5636c2736471f0fc60cd52cca6))

### [5.2.3](https://github.com/simonhaenisch/md-to-pdf/compare/v5.2.2...v5.2.3) (2023-03-11)


### Bug Fixes

* regression from using `.replaceAll` which isn't available in Node 14 ([018b52e](https://github.com/simonhaenisch/md-to-pdf/commit/018b52e13e2f27418fb6812dee778079cd5e5383))

### [5.2.2](https://github.com/simonhaenisch/md-to-pdf/compare/v5.2.1...v5.2.2) (2023-03-11)


### Bug Fixes

* generation of relative pathname in the browser ([90a1aaa](https://github.com/simonhaenisch/md-to-pdf/commit/90a1aaaa94b7598feb4eb66e8502fe6be106e17f)), closes [#150](https://github.com/simonhaenisch/md-to-pdf/issues/150)

### [5.2.1](https://github.com/simonhaenisch/md-to-pdf/compare/v5.2.0...v5.2.1) (2022-12-18)


### Bug Fixes

* create one browser instance per programmatic API call ([eb86ef0](https://github.com/simonhaenisch/md-to-pdf/commit/eb86ef06bd87895e295cc1335589a30358377931)), closes [#146](https://github.com/simonhaenisch/md-to-pdf/issues/146)

## [5.2.0](https://github.com/simonhaenisch/md-to-pdf/compare/v5.1.0...v5.2.0) (2022-11-06)


### Features

* allow passing custom extensions to marked ([#127](https://github.com/simonhaenisch/md-to-pdf/issues/127)) ([d790b2b](https://github.com/simonhaenisch/md-to-pdf/commit/d790b2ba9ddaf37f4d915f3877c8cbec2d20540d))


### Bug Fixes

* closeServer rejects when server.close has an error ([7a4a142](https://github.com/simonhaenisch/md-to-pdf/commit/7a4a142813ea543ecae585412383b09b1faaa064))

## [5.1.0](https://github.com/simonhaenisch/md-to-pdf/compare/v5.0.2...v5.1.0) (2022-01-28)


### Features

* switch to `highlight` option instead of overwriting `renderer.code` ([#115](https://github.com/simonhaenisch/md-to-pdf/issues/115)) ([acee2f8](https://github.com/simonhaenisch/md-to-pdf/commit/acee2f8d612d25ed09a7c7c6cfc388fca8b93a42)), closes [#114](https://github.com/simonhaenisch/md-to-pdf/issues/114)

### [5.0.2](https://github.com/simonhaenisch/md-to-pdf/compare/v5.0.1...v5.0.2) (2022-01-21)


### Bug Fixes

* upgrade marked to prevent GHSA-rrrm-qjm4-v8hf ([80083a8](https://github.com/simonhaenisch/md-to-pdf/commit/80083a8f8f1e6a860526d48a5e90f5371c408cb9)), closes [#112](https://github.com/simonhaenisch/md-to-pdf/issues/112)

### [5.0.1](https://github.com/simonhaenisch/md-to-pdf/compare/v5.0.0...v5.0.1) (2021-11-17)


### Bug Fixes

* remove !important from code-block bg color ([01ab732](https://github.com/simonhaenisch/md-to-pdf/commit/01ab732befafa3189c0b22e77d2a4f487c757398)), closes [#103](https://github.com/simonhaenisch/md-to-pdf/issues/103)

## [5.0.0](https://github.com/simonhaenisch/md-to-pdf/compare/v4.1.0...v5.0.0) (2021-09-24)


### ⚠ BREAKING CHANGES

* If you previously used JS in front-matter, you'll now have to set `--gray-matter-options 'null'` (or `gray_matter_options: undefined`) to overwrite the new default options that disable the JS engine.

### Bug Fixes

* disable JS engine for front-matter by default to prevent RCE ([a716259](https://github.com/simonhaenisch/md-to-pdf/commit/a716259c548c82fa1d3b14a3422e9100619d2d8a)), closes [#99](https://github.com/simonhaenisch/md-to-pdf/issues/99)

## [4.1.0](https://github.com/simonhaenisch/md-to-pdf/compare/v4.0.1...v4.1.0) (2021-09-23)


### Features

* add the option to set the document title ([#100](https://github.com/simonhaenisch/md-to-pdf/issues/100)) ([519fbc9](https://github.com/simonhaenisch/md-to-pdf/commit/519fbc98d6b472c368a4a379357aa3547f2b2dae))

### [4.0.1](https://github.com/simonhaenisch/md-to-pdf/compare/v4.0.0...v4.0.1) (2021-08-30)


### Bug Fixes

* expose correct puppeteer launch options interface ([#98](https://github.com/simonhaenisch/md-to-pdf/issues/98)) ([32af9b3](https://github.com/simonhaenisch/md-to-pdf/commit/32af9b39bb10a5ed89f0fb11ef024b6c733fbcb8))

## [4.0.0](https://github.com/simonhaenisch/md-to-pdf/compare/v3.3.2...v4.0.0) (2021-07-01)


### ⚠ BREAKING CHANGES

* upgrade dependencies ([738029c](https://github.com/simonhaenisch/md-to-pdf/commit/738029c0850fdd4a0149e5aa924c50f4899584e3)), closes [#87](https://github.com/simonhaenisch/md-to-pdf/issues/87)
  * `puppeteer@10` drops node 10 support which is why the required engine is now node >= 12.0.
  * The minimum required `puppeteer` version is now 8.0.0 because it ships its own interfaces with some breaking changes.
  * `highlight.js@11` has some breaking changes that might affect PDF output slightly.

### [3.3.2](https://github.com/simonhaenisch/md-to-pdf/compare/v3.3.1...v3.3.2) (2021-04-09)


### Bug Fixes

* inject styles and scripts in given order ([e1b6003](https://github.com/simonhaenisch/md-to-pdf/commit/e1b6003a1f1e2ad512706215ab5d0ddb992c9f00))

### [3.3.1](https://github.com/simonhaenisch/md-to-pdf/compare/v3.3.0...v3.3.1) (2021-02-25)

## [3.3.0](https://github.com/simonhaenisch/md-to-pdf/compare/v3.2.1...v3.3.0) (2021-02-22)


### Features

* **cli:** expose watchOptions ([9a68f5f](https://github.com/simonhaenisch/md-to-pdf/commit/9a68f5f266ab86a393cab631365c345cbf7f7a14)), closes [#84](https://github.com/simonhaenisch/md-to-pdf/issues/84)
* new script config option to inject scripts, mathjax test ([c8628a4](https://github.com/simonhaenisch/md-to-pdf/commit/c8628a4b24fad3a1cafc47ad1c4a2b37a9b764c7))

### [3.2.1](https://github.com/simonhaenisch/md-to-pdf/compare/v3.2.0...v3.2.1) (2020-12-16)


### Bug Fixes

* pageMediaType -> page_media_type ([29d8a75](https://github.com/simonhaenisch/md-to-pdf/commit/29d8a75eb21904da0b95556a0101039604aa1374))

## [3.2.0](https://github.com/simonhaenisch/md-to-pdf/compare/v3.1.2...v3.2.0) (2020-12-16)


### Features

* add page-media-type option ([8e68e6f](https://github.com/simonhaenisch/md-to-pdf/commit/8e68e6f4926d2eec6ffdaf47f6fa95987ff501ce)), closes [#80](https://github.com/simonhaenisch/md-to-pdf/issues/80)


### Bug Fixes

* readFile encoding ([2c7296d](https://github.com/simonhaenisch/md-to-pdf/commit/2c7296d802eda973f5a67fe66875354291ef8b69))

### [3.1.2](https://github.com/simonhaenisch/md-to-pdf/compare/v3.1.1...v3.1.2) (2020-11-06)


### Bug Fixes

* update marked because of bugs with asterisk emphasis ([566b901](https://github.com/simonhaenisch/md-to-pdf/commit/566b901985b8f9d66a3b565a1ba78faadb2aab74)), closes [#78](https://github.com/simonhaenisch/md-to-pdf/issues/78)

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
