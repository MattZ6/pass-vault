# Security

Pass Vault stores every credential locally, encrypted, and never sends it anywhere. This document explains the threat model and how to report a vulnerability.

## Threat model

- All credential data is encrypted with AES-256 and stored on-device. The vault key itself is wrapped with a key derived from your master password via scrypt, and unwrapped locally on unlock. Pass Vault has no server, so there is nothing to breach remotely.
- Biometric unlock (Face ID / Touch ID / fingerprint) is a convenience fast path gated by the OS; the master password is always what actually protects the vault key.
- Security here does **not** rely on the app's source being secret, and keeping the code closed would not make the encryption stronger. Being able to read and audit how keys are derived and stored is the point of this document being public.

## Reporting a vulnerability

Please **do not** open a public issue for a security vulnerability.

Instead, use GitHub's [private vulnerability reporting](https://github.com/MattZ6/pass-vault/security/advisories/new) for this repository. You should get an initial response within a few days.

When reporting, please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce it (a minimal example helps)
- The app version and platform (iOS/Android) you tested on

## Supported versions

Pass Vault is pre-1.0 and under active development. Only the latest released version is supported, so please make sure you can reproduce an issue on the current version before reporting it.
