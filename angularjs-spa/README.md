# AngularJS SPA

This folder contains a standalone AngularJS single page application.

## Structure

```text
angularjs-spa/
  index.html
  app/
    app.js
    routes.js
    controllers.js
  templates/
    home.html
    about.html
    contact.html
  assets/
    css/
      styles.css
```

## Run

Open `angularjs-spa/index.html` through a local static server so AngularJS can load routed templates.

```bash
npx serve angularjs-spa
```

The app uses AngularJS, angular-route, and Bootstrap from CDNs.
