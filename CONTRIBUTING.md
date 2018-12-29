# Contributing

First off, thanks for contributing! I built out this project myself, so help is welcome. Please read this document to understand contributing processes and standards, which should speed contributions up. These are guidelines and not hard rules, so do not be intimidated by the details.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at mikepkreiser@gmail.com. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant](http://contributor-covenant.org/), version 1.4, available at [http://contributor-covenant.org/version/1/4](http://contributor-covenant.org/version/1/4/)

## How to Report a Bug

**Do not open issues for security vulnerabilities.** Email the owner directly instead at mikepkreiser@gmail.com.

* Include what operating system and OS version you encountered the bug on.
* Include what `node` and `npm` versions you encountered the bug on.
  * If the bug occurred in a browser, include what browser and browser version as well.
* If you encountered the bug when building another project, include a details on or a link to the project if possible.
* What steps did you take? (more detail = better chances of finding a solution)
* What behavior did you expect?
* What behavior occurred?

## Code Change Guidelines

When making changes to this project:

1. Ask questions. The current implementation can be improved through many different perspectives.
2. Develop on your own branch.
3. Ensure commit messages are clear and scoped to specific changes. Do not write monolithic commits.
4. For folder names and file names, always use lowercase and dash separation.
5. Ensure overridding methods implement the same method signatures.
6. Ensure sub-classes can support the classes of their parent class. Otherwise, override those methods with error handling or use a different parent class.
7. Write thorough documentation, but do not restate the obvious. Serve the documentation and ensure the changes show up as intended and are readable.
8. Write tests. Lots of tests.
   1. Do not depend on code coverage checks. Rather, ensure each method, logic branch, and piece of functionality is tested explicitly.
9. Ensure the package works both in web and node environments.
10. When changes are made to `package.json`, ensure `package-lock.json` is appropriately updated and commited.
11. Do not bump the package version. The owner will handle this.
12. Respect `eslint`. This tool ensure good and consistent code style/patterns. If you dis-agree with a rule or find a rule to be inhibiting, open an issue or add it with a justification to your change.
13. Keep your branch up to date with `master`.

## Code Review Process

1. Open a PR and add mkreiser as a reviewer and the assignee.
2. Describe changes as appropriate in the PR description.
3. Please be patient. I may not be able to get to reviews immediately.
4. Ensure the CI (Travis) passes. This must pass to merge.
5. Ensure code coverage is 100%. CodeClimate will check the test coverage on a successful CI build.
6. Ensure CodeClimate passes. It may flag on invalid code issues, which can be marked as `invalid` to get CodeClimate to pass. Feel free to comment on the PR with an CodeClimate issues.
7. Ensure documentation, both the markdown docs (README, etc ) and generated documentation (in the code), is up to spec.
8. Respond to review comments. Feel free to have a discussion on any feedback.
9. Merge quickly after receiving approval.
