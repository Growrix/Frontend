import * as React from "react";

import { THEME_STORAGE_KEY } from "./theme";

export function ThemeInitScript() {
  const code = `(function(){try{var k=${JSON.stringify(
    THEME_STORAGE_KEY
  )};var m=localStorage.getItem(k);if(m==='light'||m==='dark'){document.documentElement.setAttribute('data-theme',m);}else{document.documentElement.removeAttribute('data-theme');}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
