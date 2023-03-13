import React from "react";

/**
 * The theme components only imports it's theme CSS-file. These components are lazy
 * loaded, to enable "code splitting" (in order to avoid the themes being bundled together)
 */
const Theme1 = React.lazy(() => import("./AuthTheme"));

const ThemeSelector: React.FC = ({ children }) => (
  <>
    {/* Conditionally render theme, based on the current client context */}
    <React.Suspense fallback={() => null}>
      <Theme1 />
    </React.Suspense>
    {/* Render children immediately! */}
    {children}
  </>
);

export default ThemeSelector;
