import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  // dsn: "https://5d3345e2ded84196a88249262b3243a175802aeab0b74d179840cef01f076a18@sentry.io/javascript",
  dsn: "https://8b9470e69a13417cb49cb950c063fbc8@o4504753351491584.ingest.sentry.io/4504753353129984",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// pour tester le renvoie d'erreur
// myUndefinedFunction();


window.onerror = function(message, source, lineno, colno, error) {
  Sentry.captureException(error);
}

