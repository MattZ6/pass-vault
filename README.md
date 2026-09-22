# Pass Vault

🔐 Private, encrypted and offline-first password manager.

[![CI](https://github.com/MattZ6/pass-vault/actions/workflows/ci.yml/badge.svg)](https://github.com/MattZ6/pass-vault/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Pass Vault keeps your credentials encrypted on your device — nothing is ever sent to a server. Unlock with a master password and/or biometrics, and everything else (adding, editing, viewing credentials) stays local.

## Features

- Local, encrypted storage — no account, no cloud sync, no telemetry sent anywhere by default
- Master password (scrypt key derivation) + biometric unlock, working side by side
- Add, view and edit credentials — username, password, website and notes can each be edited individually
- Storage and biometrics diagnostics, and a built-in privacy policy
- In-app changelog with release notes per version
- Light/dark theme, and English, Portuguese (BR) and Spanish translations

## Tech stack

- [Expo](https://expo.dev) / React Native, TypeScript
- [expo-router](https://docs.expo.dev/router/introduction/) for navigation
- [Zustand](https://github.com/pmndrs/zustand) for state, [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) for forms/validation
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) for animations
- [Biome](https://biomejs.dev) for linting/formatting, [Bun](https://bun.sh) as package manager and test runner

## Getting started

Requires [Bun](https://bun.sh) and the [Expo Go](https://expo.dev/go) app (or a simulator) to run the project.

```sh
bun install
bun start
```

## Scripts

| Command             | Description                          |
| -------------------- | ------------------------------------ |
| `bun typecheck`      | Type-checks the project              |
| `bun lint:ci`        | Lints the project with Biome         |
| `bun test`           | Runs the test suite                  |

## Security

Pass Vault's threat model, and how it derives and stores keys, is documented in [SECURITY.md](SECURITY.md) — that's also where to report a vulnerability.

## Contributing

Issues and pull requests are welcome. Please open an issue before starting on a larger change, and make sure `bun typecheck`, `bun lint:ci` and `bun test` all pass before opening a PR.

## License

[MIT](LICENSE)
