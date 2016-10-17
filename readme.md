# musefind-react-scripts

#### Version: 0.6.3

Provides a fork of create-react-app react-scripts that ads the following features:

- decorators
- sass
- imports loader
- resolve url loader

#### Usage

```bash
create-react-app --scripts-version musefind-react-scripts APP_NAME
```

There seems to be a bug the first time you start the app it will not build properly,
just try changing something and it should be ok.

#### Migrating an Existing Application

Change `react-scripts` in `package.json` to `musefind-react-scripts`.
