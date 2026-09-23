# Pass Vault

🔐 Private, encrypted and offline-first password manager.

[![CI](https://github.com/MattZ6/pass-vault/actions/workflows/ci.yml/badge.svg)](https://github.com/MattZ6/pass-vault/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Pass Vault keeps your credentials encrypted on your device, and nothing is ever sent to a server. Unlock with a master password and/or biometrics, and everything else, like adding, editing and viewing credentials, stays local.

## Features

- Local, encrypted storage, with no account, no cloud sync and no telemetry sent anywhere by default
- Master password (scrypt key derivation) and biometric unlock, working side by side
- Add, view and edit credentials, where username, password, website and notes can each be edited individually
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

Requires [Bun](https://bun.sh) to install dependencies and run scripts.

This project uses some native modules (secure storage, biometrics, cryptography) that aren't part of the plain Expo Go app, so it needs a custom dev client to run instead. Build one locally with `bunx expo run:ios` or `bunx expo run:android` (requires Xcode or Android Studio), or with [EAS Build](https://docs.expo.dev/build/introduction/) using the `development` profile in `eas.json`.

```sh
bun install
bun start
```

Then open the project in your dev client.

## Scripts

| Command          | Description                   |
| ----------------- | ------------------------------ |
| `bun typecheck`   | Type-checks the project        |
| `bun lint:ci`     | Lints the project with Biome   |
| `bun test`        | Runs the test suite            |

## Security

Pass Vault's threat model, and how it derives and stores keys, is documented in [SECURITY.md](SECURITY.md). That's also where to report a vulnerability.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how issues, PRs and commits are named, and what to run before opening one.

## License

[MIT](LICENSE)
