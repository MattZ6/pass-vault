# Contributing

Thanks for considering contributing to Pass Vault. This document covers how issues, pull requests and commits are named, and what to run before opening a PR.

## Before you start

For anything bigger than a small fix, please open an issue first so we can align on the approach before you put time into it. Small fixes and typos can go straight to a PR.

## Issues

Pick the template that matches what you're reporting (bug or feature request), there's no required title format, just a clear, specific title. For example, "credential list doesn't scroll on Android" is more useful than "bug in list".

If what you found is a security vulnerability, please don't open an issue for it. See [SECURITY.md](/.github/SECURITY.md) instead.

## Commit messages and PR titles

This project follows [Conventional Commits](https://www.conventionalcommits.org):

```
type(scope): short, lowercase, imperative description
```

- `type` is one of `feat`, `fix`, `perf`, `refactor`, `chore`, `build`, `test` or `docs`
- `scope` is the area touched, usually a folder or feature name, like `app-lock`, `edit-website` or `changelog`
- the description is written as an instruction ("add X", not "added X" or "adds X"), and doesn't end with a period

A few real examples from this repo's history:

```
feat(app-lock): add vault-wheel onboarding screen for first launch
fix(edit-username): use correct i18n namespace
perf(vault-store): index credentials by id to avoid linear lookups
chore(deps): bump expo related packages versions
```

PRs are squash-merged, and the PR title becomes the commit message on `main`, so **PR titles follow the same format**. Keep individual commits within a PR however makes sense to you; only the PR title needs to follow the convention.

## Before opening a PR

Make sure these all pass locally:

```sh
bun typecheck
bun lint:ci
bun test
```

See [README.md](../README.md) for how to set up a dev client to run the app itself.
