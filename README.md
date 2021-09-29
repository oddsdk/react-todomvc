# Webnative React TodoMVC

[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Built by FISSION](https://img.shields.io/badge/webnative-v0.26.2-purple.svg )](https://github.com/fission-suite/webnative)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)
[![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)

The repository implements TodoMVC with React and [webnative](https://github.com/fission-suite/webnative). The repository includes branches that demonstrate the same app configured with Create React App, Vite, and Parcel:

- [Create React App build](https://github.com/fission-suite/react-todomvc)
- [Vite build](https://github.com/fission-suite/react-todomvc/tree/vite)
- [Parcel build](https://github.com/fission-suite/react-todomvc/tree/parcel)

## Migration to Vite or Parcel

The app was initialized with Create React App and migrated to Vite and Parcel. See the [Migrate from CRA to Vite](https://github.com/fission-suite/react-todomvc/pull/2) and [Migrate from CRA to parcel](https://github.com/fission-suite/react-todomvc/pull/1) pull requests for guides and diffs to help you migrate from Create React App.

## Try it

The app is live at: https://young-turquoise-metalic-fairy.fission.app/

## Setup

Install dependencies.

```shell
npm install
```

## Develop

To work on the application locally:

```shell
npm start
```

Navigate to `localhost:3000` in your web browser or `localhost:1234` for Parcel.

## Build

Build the application.

```shell
npm run build
```

The build will be in `build` from Create React app and `dist` for Vite and Parel.

## Publish

You can publish your own version of this app with Fission! [Install the Fission CLI](https://guide.fission.codes/developers/installation) if you haven't already. 

Build the application before the following steps.

Delete `fission.yaml` and then register your own subdomain.

```shell
fission app register
```

The CLI should prompt you with the appropriate build directory depending on which build tool or bundler you used.

Publish the app.

```shell
fission app publish
```

Your version of the app is now live!