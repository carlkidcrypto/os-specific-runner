Last Updated: 2026-11-03 23:01:14 UTC

# Changelog


<a name="v2.5.0"></a>
## [v2.5.0](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.4.0...v2.5.0) (2026-11-03)


### Changes

#### Bug Fixes

- fix: update Sphinx release version to v2.4.0 and add release maintenance script ([#302](https://github.com/carlkidcrypto/os-specific-runner/issues/302))

- fix: propagate LASTEXITCODE for pwsh and powershell shells on Windows ([#299](https://github.com/carlkidcrypto/os-specific-runner/issues/299))

- fix: sphinx_build workflow to create PR instead of pushing directly to main ([#296](https://github.com/carlkidcrypto/os-specific-runner/issues/296))


#### Documentation Updates

- docs: clarify custom shell inputs require a {0} template ([#312](https://github.com/carlkidcrypto/os-specific-runner/issues/312))

- docs: clarify working_directory is relative to OS temp dir ([#304](https://github.com/carlkidcrypto/os-specific-runner/issues/304))

- docs: fix example branch name and wording in README ([#303](https://github.com/carlkidcrypto/os-specific-runner/issues/303))

- docs: add software requirements specification ([#300](https://github.com/carlkidcrypto/os-specific-runner/issues/300))


#### Features

- feat: migrate release scripts to standardized release_tools ([#308](https://github.com/carlkidcrypto/os-specific-runner/issues/308))

- feat: enhance documentation SEO with metadata, OpenGraph, JSON-LD, and overview ([#301](https://github.com/carlkidcrypto/os-specific-runner/issues/301))










---

<a name="v2.4.0"></a>
## [v2.4.0](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.3.1...v2.4.0) (2026-10-07)


### Changes

#### Bug Fixes

- fix: add node ecosystem for npm registry access in coverage workflow ([#287](https://github.com/carlkidcrypto/os-specific-runner/issues/287))


#### Bug Fixes

- Fix: add copilot-requests permission to all agentic workflows and re-compile ([#194](https://github.com/carlkidcrypto/os-specific-runner/issues/194))


#### Dependency Updates

- Bump js-yaml in the npm_and_yarn group across 1 directory ([#272](https://github.com/carlkidcrypto/os-specific-runner/issues/272))

- Bump jest from 30.5.0 to 30.5.1 ([#262](https://github.com/carlkidcrypto/os-specific-runner/issues/262))

- Bump browserslist from 4.28.2 to 4.28.8 in the npm_and_yarn group across 1 directory ([#258](https://github.com/carlkidcrypto/os-specific-runner/issues/258))

- Bump jest from 30.4.2 to 30.5.0 ([#255](https://github.com/carlkidcrypto/os-specific-runner/issues/255))

- Bump babel-jest from 30.4.1 to 30.5.0 ([#253](https://github.com/carlkidcrypto/os-specific-runner/issues/253))

- Bump [@vercel](https://github.com/vercel)/ncc from 0.44.1 to 0.45.0 ([#235](https://github.com/carlkidcrypto/os-specific-runner/issues/235))

- Bump the npm_and_yarn group across 1 directory with 2 updates ([#222](https://github.com/carlkidcrypto/os-specific-runner/issues/222))

- Bump actions/setup-python from 6 to 7 ([#205](https://github.com/carlkidcrypto/os-specific-runner/issues/205))

- Bump actions/setup-node from 6 to 7 ([#200](https://github.com/carlkidcrypto/os-specific-runner/issues/200))

- Bump [@vercel](https://github.com/vercel)/ncc from 0.44.0 to 0.44.1 ([#183](https://github.com/carlkidcrypto/os-specific-runner/issues/183))

- Bump actions/cache/restore from 5.0.5 to 6.1.0 ([#180](https://github.com/carlkidcrypto/os-specific-runner/issues/180))

- Bump actions/cache from 5 to 6 ([#172](https://github.com/carlkidcrypto/os-specific-runner/issues/172))

- Bump github/gh-aw-actions/setup from 0.77.5 to 0.81.4 ([#175](https://github.com/carlkidcrypto/os-specific-runner/issues/175))


#### Documentation Updates

- docs: clarify custom shell input behavior ([#267](https://github.com/carlkidcrypto/os-specific-runner/issues/267))

- docs: clarify build command and lock-file cleanup section ([#266](https://github.com/carlkidcrypto/os-specific-runner/issues/266))

- docs: fix table formatting and clarify working_directory behavior ([#265](https://github.com/carlkidcrypto/os-specific-runner/issues/265))


#### Feature/Gh

- Feature/gh compile ([#264](https://github.com/carlkidcrypto/os-specific-runner/issues/264))


#### Features

- feat: use model alias sonnet across all gh-aw workflows ([#292](https://github.com/carlkidcrypto/os-specific-runner/issues/292))

- feat: Migrate gh-aw workflows from claude-sonnet-5 to gpt-6.1-sol ([#286](https://github.com/carlkidcrypto/os-specific-runner/issues/286))


#### Features

- Add unit tests for index.js to achieve full coverage ([#221](https://github.com/carlkidcrypto/os-specific-runner/issues/221))


#### GH

- GH AW Update ([#215](https://github.com/carlkidcrypto/os-specific-runner/issues/215))


#### Maintenance

- chore: recompile gh-aw lock files (fix stale lock issue [#288](https://github.com/carlkidcrypto/os-specific-runner/issues/288)) ([#289](https://github.com/carlkidcrypto/os-specific-runner/issues/289))


#### Release

- Release v2.4.0 and resolve Dependabot security alerts ([#295](https://github.com/carlkidcrypto/os-specific-runner/issues/295))


#### Set

- Set open-pull-requests-limit for npm and GitHub Actions ([#195](https://github.com/carlkidcrypto/os-specific-runner/issues/195))










---

<a name="v2.3.1"></a>
## [v2.3.1](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.3.0...v2.3.1) (2026-06-21)


### Changes

#### Bug Fixes

- Fix Update Changelog: add base-branch to safe-outputs create-pull-request config ([#104](https://github.com/carlkidcrypto/os-specific-runner/issues/104))


#### Dependency Updates

- Bump actions/checkout from 6 to 7 ([#167](https://github.com/carlkidcrypto/os-specific-runner/issues/167))

- Bump [@babel](https://github.com/babel)/core from 7.29.7 to 8.0.1 ([#163](https://github.com/carlkidcrypto/os-specific-runner/issues/163))

- Bump codecov/codecov-action from 6 to 7 ([#147](https://github.com/carlkidcrypto/os-specific-runner/issues/147))

- Bump github/gh-aw-actions from 0.78.1 to 0.79.3 ([#152](https://github.com/carlkidcrypto/os-specific-runner/issues/152))

- Bump [@vercel](https://github.com/vercel)/ncc from 0.38.4 to 0.44.0 ([#153](https://github.com/carlkidcrypto/os-specific-runner/issues/153))

- Bump actions/github-script ([#115](https://github.com/carlkidcrypto/os-specific-runner/issues/115))

- Bump [@babel](https://github.com/babel)/preset-env from 7.29.5 to 7.29.7 ([#139](https://github.com/carlkidcrypto/os-specific-runner/issues/139))

- Bump [@babel](https://github.com/babel)/core from 7.29.0 to 7.29.7 ([#140](https://github.com/carlkidcrypto/os-specific-runner/issues/140))

- Bump github/gh-aw-actions from 0.74.2 to 0.78.1 ([#144](https://github.com/carlkidcrypto/os-specific-runner/issues/144))

- Bump [@babel](https://github.com/babel)/preset-env from 7.29.2 to 7.29.5 ([#120](https://github.com/carlkidcrypto/os-specific-runner/issues/120))

- Bump jest from 30.3.0 to 30.4.2 ([#127](https://github.com/carlkidcrypto/os-specific-runner/issues/127))

- Bump github/gh-aw-actions from 0.71.2 to 0.74.2 ([#130](https://github.com/carlkidcrypto/os-specific-runner/issues/130))

- Bump babel-jest from 30.3.0 to 30.4.1 ([#124](https://github.com/carlkidcrypto/os-specific-runner/issues/124))

- Bump [@babel](https://github.com/babel)/plugin-transform-modules-systemjs ([#125](https://github.com/carlkidcrypto/os-specific-runner/issues/125))

- Bump github/gh-aw-actions from 0.71.1 to 0.71.2 ([#109](https://github.com/carlkidcrypto/os-specific-runner/issues/109))

- Bump github/gh-aw-actions from 0.68.3 to 0.71.1 ([#106](https://github.com/carlkidcrypto/os-specific-runner/issues/106))

- Bump github/gh-aw-actions from 0.69.3 to 0.71.0 ([#103](https://github.com/carlkidcrypto/os-specific-runner/issues/103))


#### Documentation Updates

- docs: fix typos, grammar, and JSDoc style ([#110](https://github.com/carlkidcrypto/os-specific-runner/issues/110))


#### Feature/Release

- Feature/release bump ([#165](https://github.com/carlkidcrypto/os-specific-runner/issues/165))


#### Updates & Improvements

- Update dependabot.yml ([#159](https://github.com/carlkidcrypto/os-specific-runner/issues/159))










---

<a name="v2.3.0"></a>
## [v2.3.0](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.2.0...v2.3.0) (2026-04-23)


### Changes

#### Bug Fixes

- Fix Coverage Autofix workflow: configure base branch for PR creation ([#100](https://github.com/carlkidcrypto/os-specific-runner/issues/100))

- Fix docs continuous improvement workflow: upgrade gh-aw from v0.67.4 to v0.68.1 ([#83](https://github.com/carlkidcrypto/os-specific-runner/issues/83))


#### Compile

- Compile agentic workflow markdown files using `gh aw compile` ([#76](https://github.com/carlkidcrypto/os-specific-runner/issues/76))


#### Dependency Updates

- Bump github/gh-aw-actions from 0.68.3 to 0.69.3 ([#101](https://github.com/carlkidcrypto/os-specific-runner/issues/101))

- Bump [@actions](https://github.com/actions)/core from 3.0.0 to 3.0.1 ([#99](https://github.com/carlkidcrypto/os-specific-runner/issues/99))

- Bump peter-evans/create-pull-request from 7 to 8 ([#98](https://github.com/carlkidcrypto/os-specific-runner/issues/98))

- Bump github/gh-aw-actions from 0.68.7 to 0.69.0 ([#94](https://github.com/carlkidcrypto/os-specific-runner/issues/94))

- Bump github/gh-aw-actions from 0.68.4 to 0.68.7 ([#90](https://github.com/carlkidcrypto/os-specific-runner/issues/90))

- Bump github/gh-aw-actions from 0.68.3 to 0.68.4 ([#88](https://github.com/carlkidcrypto/os-specific-runner/issues/88))

- Bump github/gh-aw-actions from 0.67.4 to 0.68.3 ([#86](https://github.com/carlkidcrypto/os-specific-runner/issues/86))

- Bump actions/upload-artifact from 7.0.0 to 7.0.1 ([#79](https://github.com/carlkidcrypto/os-specific-runner/issues/79))

- Bump actions/upload-pages-artifact from 4 to 5 ([#84](https://github.com/carlkidcrypto/os-specific-runner/issues/84))

- Bump [@babel](https://github.com/babel)/preset-env from 7.29.0 to 7.29.2 ([#71](https://github.com/carlkidcrypto/os-specific-runner/issues/71))

- Bump actions/deploy-pages from 4 to 5 ([#72](https://github.com/carlkidcrypto/os-specific-runner/issues/72))

- Bump codecov/codecov-action from 5 to 6 ([#73](https://github.com/carlkidcrypto/os-specific-runner/issues/73))

- Bump picomatch from 2.3.1 to 2.3.2 in the npm_and_yarn group across 1 directory ([#74](https://github.com/carlkidcrypto/os-specific-runner/issues/74))

- Bump undici from 6.23.0 to 6.24.0 in the npm_and_yarn group across 1 directory ([#70](https://github.com/carlkidcrypto/os-specific-runner/issues/70))

- Bump jest from 30.2.0 to 30.3.0 ([#68](https://github.com/carlkidcrypto/os-specific-runner/issues/68))

- Bump actions/cache from 4 to 5 ([#61](https://github.com/carlkidcrypto/os-specific-runner/issues/61))

- Bump actions/setup-python from 5 to 6 ([#62](https://github.com/carlkidcrypto/os-specific-runner/issues/62))

- Bump actions/upload-pages-artifact from 3 to 4 ([#63](https://github.com/carlkidcrypto/os-specific-runner/issues/63))

- Bump actions/checkout from 4 to 6 ([#64](https://github.com/carlkidcrypto/os-specific-runner/issues/64))

- Bump actions/setup-node from 4 to 6 ([#60](https://github.com/carlkidcrypto/os-specific-runner/issues/60))


#### Documentation Updates

- docs: improve action.yml descriptions, README attribution, and lib.js JSDoc ([#95](https://github.com/carlkidcrypto/os-specific-runner/issues/95))

- docs: update Node.js version references from 20 to 24 in HOWTOAI.rst ([#93](https://github.com/carlkidcrypto/os-specific-runner/issues/93))


#### Features

- feat: add manual trigger with PR creation to regenerate dist workflow ([#96](https://github.com/carlkidcrypto/os-specific-runner/issues/96))

- feat: add sphinx-js documentation with GitHub Pages deployment ([#59](https://github.com/carlkidcrypto/os-specific-runner/issues/59))


#### Features

- Add workflow_dispatch and paths filter to regenerate.yml ([#91](https://github.com/carlkidcrypto/os-specific-runner/issues/91))


#### Maintenance

- chore: add agentic workflow instruction files adapted from ezsnmp ([#75](https://github.com/carlkidcrypto/os-specific-runner/issues/75))


#### Multi-Version

- Multi-version docs: ezsnmp-style versioned Sphinx builds with automated release deployment ([#65](https://github.com/carlkidcrypto/os-specific-runner/issues/65))


#### Prep

- prep: update version references from 2.2.0 to 2.3.0 ([#89](https://github.com/carlkidcrypto/os-specific-runner/issues/89))


#### Replace

- Replace static landing page with Sphinx-generated version using Furo theme ([#66](https://github.com/carlkidcrypto/os-specific-runner/issues/66))


#### Updates & Improvements

- Update Buy Me a Coffee username in FUNDING.yml ([#69](https://github.com/carlkidcrypto/os-specific-runner/issues/69))


#### Upgrade

- Upgrade gh-aw from v0.67.4 to v0.68.1 to fix Copilot CLI silent startup crash ([#82](https://github.com/carlkidcrypto/os-specific-runner/issues/82))










---

<a name="v2.2.0"></a>
## [v2.2.0](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.1.3...v2.2.0) (2026-03-04)


### Changes

#### Agents

- Agents ([#56](https://github.com/carlkidcrypto/os-specific-runner/issues/56))


#### Break

- Break status badge table into rows of 3 and add HOWTOAI.rst ([#57](https://github.com/carlkidcrypto/os-specific-runner/issues/57))


#### Bug Fixes

- Fix Windows CI failure, add Codecov integration, bump version to 2.2.0 ([#54](https://github.com/carlkidcrypto/os-specific-runner/issues/54))


#### Dependency Updates

- Bump actions/checkout from 5.0.0 to 6.0.2 ([#50](https://github.com/carlkidcrypto/os-specific-runner/issues/50))

- Bump [@actions](https://github.com/actions)/core from 2.0.3 to 3.0.0 ([#53](https://github.com/carlkidcrypto/os-specific-runner/issues/53))

- Bump [@actions](https://github.com/actions)/exec from 1.1.1 to 3.0.0 ([#52](https://github.com/carlkidcrypto/os-specific-runner/issues/52))

- Bump [@actions](https://github.com/actions)/core from 2.0.2 to 2.0.3 ([#51](https://github.com/carlkidcrypto/os-specific-runner/issues/51))

- Bump [@actions](https://github.com/actions)/core from 1.11.1 to 2.0.2 ([#49](https://github.com/carlkidcrypto/os-specific-runner/issues/49))


#### Features

- Add codecov.yml with PR comment configuration ([#55](https://github.com/carlkidcrypto/os-specific-runner/issues/55))


#### Scope

- Scope unit and integration test workflows to relevant file paths ([#58](https://github.com/carlkidcrypto/os-specific-runner/issues/58))


#### Updates & Improvements

- Update README.md ([#42](https://github.com/carlkidcrypto/os-specific-runner/issues/42))










---

<a name="v2.1.3"></a>
## [v2.1.3](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.1.2...v2.1.3) (2025-10-13)


### Changes

#### Dependency Updates

- Bump stefanzweifel/git-auto-commit-action from 5 to 7 ([#38](https://github.com/carlkidcrypto/os-specific-runner/issues/38))

- Bump [@vercel](https://github.com/vercel)/ncc from 0.38.3 to 0.38.4 ([#37](https://github.com/carlkidcrypto/os-specific-runner/issues/37))

- Bump actions/checkout from 4.3.0 to 5.0.0 ([#36](https://github.com/carlkidcrypto/os-specific-runner/issues/36))

- Bump actions/checkout from 4.2.2 to 4.3.0 ([#35](https://github.com/carlkidcrypto/os-specific-runner/issues/35))


#### Feature/New

- Feature/new release ([#41](https://github.com/carlkidcrypto/os-specific-runner/issues/41))


#### Feature/Zsh

- Feature/zsh ([#33](https://github.com/carlkidcrypto/os-specific-runner/issues/33))


#### Potential

- Potential fix for code scanning alert no. 6: Workflow does not contain permissions ([#40](https://github.com/carlkidcrypto/os-specific-runner/issues/40))

- Potential fix for code scanning alert no. 4: Workflow does not contain permissions ([#39](https://github.com/carlkidcrypto/os-specific-runner/issues/39))










---

<a name="v2.1.2"></a>
## [v2.1.2](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.1.1...v2.1.2) (2025-04-20)


### Changes

#### Dependency Updates

- Bump undici from 5.28.4 to 5.28.5 in the npm_and_yarn group ([#31](https://github.com/carlkidcrypto/os-specific-runner/issues/31))

- Bump [@vercel](https://github.com/vercel)/ncc from 0.38.2 to 0.38.3 ([#30](https://github.com/carlkidcrypto/os-specific-runner/issues/30))

- Bump actions/checkout from 4.2.0 to 4.2.2 ([#29](https://github.com/carlkidcrypto/os-specific-runner/issues/29))

- Bump [@actions](https://github.com/actions)/core from 1.10.1 to 1.11.1 ([#27](https://github.com/carlkidcrypto/os-specific-runner/issues/27))


#### Feature/Updates

- Feature/updates to packages ([#32](https://github.com/carlkidcrypto/os-specific-runner/issues/32))










---

<a name="v2.1.1"></a>
## [v2.1.1](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.1.0...v2.1.1) (2024-09-26)


### Changes

#### Dependency Updates

- Bump actions/checkout from 4.1.7 to 4.2.0 ([#23](https://github.com/carlkidcrypto/os-specific-runner/issues/23))

- Bump [@vercel](https://github.com/vercel)/ncc from 0.38.1 to 0.38.2 ([#22](https://github.com/carlkidcrypto/os-specific-runner/issues/22))

- Bump actions/checkout from 4.1.6 to 4.1.7 ([#20](https://github.com/carlkidcrypto/os-specific-runner/issues/20))

- Bump actions/checkout from 4.1.5 to 4.1.6 ([#19](https://github.com/carlkidcrypto/os-specific-runner/issues/19))

- Bump actions/checkout from 4.1.4 to 4.1.5 ([#18](https://github.com/carlkidcrypto/os-specific-runner/issues/18))


#### Updates & Improvements

- Update package-lock.json ([#25](https://github.com/carlkidcrypto/os-specific-runner/issues/25))

- Update README.md bumping buttons to new version ([#21](https://github.com/carlkidcrypto/os-specific-runner/issues/21))










---

<a name="v2.1.0"></a>
## [v2.1.0](https://github.com/carlkidcrypto/os-specific-runner/compare/v2.0.0...v2.1.0) (2024-05-05)


### Changes

#### -

- - change to regen in prs.


#### Dependency Updates

- Bump actions/checkout from 4.1.3 to 4.1.4 ([#16](https://github.com/carlkidcrypto/os-specific-runner/issues/16))

- Bump actions/checkout from 4.1.2 to 4.1.3 ([#15](https://github.com/carlkidcrypto/os-specific-runner/issues/15))

- Bump undici from 5.28.3 to 5.28.4 ([#14](https://github.com/carlkidcrypto/os-specific-runner/issues/14))

- Bump actions/checkout from 4.1.1 to 4.1.2 ([#13](https://github.com/carlkidcrypto/os-specific-runner/issues/13))


#### Feature/Readme

- Feature/readme updates ([#9](https://github.com/carlkidcrypto/os-specific-runner/issues/9))


#### Feature/Working

- Feature/working directory ([#10](https://github.com/carlkidcrypto/os-specific-runner/issues/10))


#### Npm

- npm update ([#12](https://github.com/carlkidcrypto/os-specific-runner/issues/12))


#### Reg

- Reg YML ([#11](https://github.com/carlkidcrypto/os-specific-runner/issues/11))


#### Tweaks

- Tweaks and Updates ([#17](https://github.com/carlkidcrypto/os-specific-runner/issues/17))


#### Updates & Improvements

- Update README.md










---

<a name="v2.0.0"></a>
## [v2.0.0](https://github.com/carlkidcrypto/os-specific-runner/compare/V2.0.0...v2.0.0) (2023-12-15)









---

<a name="V2.0.0"></a>
## V2.0.0 (2023-12-15)


### Changes

#### -

- - giving credit to original authoer - updating license


#### Copying

- copying latest main


#### Dependency Updates

- Bump [@actions](https://github.com/actions)/core from 1.4.0 to 1.10.1 ([#2](https://github.com/carlkidcrypto/os-specific-runner/issues/2))

- Bump github/codeql-action from 1 to 3 ([#1](https://github.com/carlkidcrypto/os-specific-runner/issues/1))

- Bump actions/checkout from 3.1.0 to 4.1.1 ([#3](https://github.com/carlkidcrypto/os-specific-runner/issues/3))

- Bump [@actions](https://github.com/actions)/exec from 1.0.4 to 1.1.1 ([#4](https://github.com/carlkidcrypto/os-specific-runner/issues/4))

- Bump stefanzweifel/git-auto-commit-action from 4.9.2 to 5.0.0 ([#5](https://github.com/carlkidcrypto/os-specific-runner/issues/5))


#### Feature/Bumping

- Feature/bumping npm and pkgs ([#6](https://github.com/carlkidcrypto/os-specific-runner/issues/6))


#### Feature/Prep

- Feature/prep for first release ([#7](https://github.com/carlkidcrypto/os-specific-runner/issues/7))


#### Updates & Improvements

- Update tests.yml ([#8](https://github.com/carlkidcrypto/os-specific-runner/issues/8))










---

