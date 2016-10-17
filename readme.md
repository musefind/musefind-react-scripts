# musefind-react-scripts

#### Version: 0.6.5

Provides a fork of create-react-app react-scripts that ads the following features:

- decorators
- sass
- imports loader
- resolve url loader

#### Usage

```bash
create-react-app --scripts-version musefind-react-scripts APP_NAME
```

#### Migrating an Existing Application

Change `react-scripts` in `package.json` to `musefind-react-scripts`.

I also then recommend running:

```
rm -rf node_modules
npm install
```
