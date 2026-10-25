# AEM + Angular Portfolio Project

## Overview

A portfolio project demonstrating an Angular frontend that consumes an AEM-style JSON page model, alongside AEM component and content package source files.

## Technologies

- Angular 16 and TypeScript
- HTML, SCSS, and RxJS
- REST-style HTTP content loading
- Adobe Experience Manager (AEM) component concepts
- HTL (HTML Template Language)
- Maven and FileVault content packages

## Angular Features

- JSON-driven page title and card content
- Reusable Angular content-card component
- Loading, empty, and error states
- Retry action for content-loading failures
- Responsive layout and accessible status messages
- Configurable mock or AEM content source

## AEM Source

- Custom Card component
- Authoring dialog for card title and description
- HTL component template
- AEM content page structure
- Maven modules: `ui.apps`, `ui.content`, and `all`

## Run Locally

From the project root, start the Angular application:

```powershell
npx ng serve
```

Open `http://localhost:4200`.

The default configuration uses the local JSON file at `src/assets/homepage-model.json`.

To build the AEM packages, run:

```powershell
mvn clean package
```

Generated ZIP packages are available under each module's `target` directory.

## Important Limitations

This project has been built locally. The Angular mock content has been tested in the local application, and Maven package generation succeeds. Installation and end-to-end integration with a running AEM instance have not yet been verified.

The production AEM endpoint and page component implementation must be configured and tested against an actual AEM environment before claiming a live integration.

## Interview Topics

Be prepared to explain Angular services, HTTP requests, reusable components, `@Input`, JSON content models, AEM components and dialogs, HTL, FileVault packages, and the difference between mock content and live AEM delivery.