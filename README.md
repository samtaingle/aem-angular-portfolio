# AEM + Angular Portfolio

An Angular 16 frontend that renders content from an AEM-style JSON page model, with the AEM component source and Maven content packages alongside it.

![Angular card view rendering the mock page model](docsscreenshot.png)

## What it demonstrates
- Angular consuming a JSON page model through a service, with a configurable mock or AEM content source
- A reusable content-card component with loading, empty and error states and a retry action
- A custom AEM Card component with an authoring dialog (title, description) and an HTL template
- AEM content packaging with Maven and FileVault (`ui.apps`, `ui.content`, `all`)

## Tech stack
Angular 16, TypeScript, RxJS, SCSS, AEM, HTL, Maven, FileVault

## Run locally
Angular app (uses the mock model at `src/assets/homepage-model.json`):

```bash
npx ng serve
```

Open http://localhost:4200.

AEM packages:

```bash
mvn clean package
```

ZIP packages are generated in each module's `target` directory.

## Project structure
- `src/` Angular application
- `ui.apps/` AEM Card component, dialog and HTL
- `ui.content/` AEM content structure
- `all/` combined content package

## Status
The Angular app is tested locally against mock content, and the Maven packages build successfully. Deployment to a running AEM instance has not been verified yet.

Next step: install the `all` package on a local AEM SDK author instance, then point the Angular service at the page's `.model.json` endpoint instead of the mock file.
