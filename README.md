# SBR2026

An Astro project with Tailwind CSS for the SBR2026 initiative.

## 📢 Important Notice

**Default Branch Migration**: This repository is transitioning from `V0-Pitching-Page` to `main` as the default branch. 

For detailed instructions on how to complete this migration, please see [SWITCH_DEFAULT_BRANCH.md](./SWITCH_DEFAULT_BRANCH.md).

## 🚀 Getting Started

```sh
bun create astro@latest -- --template with-tailwindcss
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/with-tailwindcss/devcontainer.json)

Astro comes with [Tailwind](https://tailwindcss.com) support out of the box. This example showcases how to style your Astro project with Tailwind.

For complete setup instructions, please see our [Tailwind Integration Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind).

## 📦 How to use it
Normal build (no PNG export):
```sh
bun run build
```
Export PNGs during build (this is the on/off “variable”):
```sh
PUBLIC_EXPORT_COMPONENT_PNGS=true bun run build
```
One-time setup for Playwright (needed the first time you export):
install deps (if you haven’t):
```sh
bun install
```
install the browser: