// layout.js
import "./reset.css";
import "../content/styles.css";
import { cookies } from "next/headers";
import ServerDataApi from
  "../framework/ServerDataApi.js";
import ServerRenderer from
  "../framework/ServerRenderer.js";
import { createCssVars } from "../helpers";
import data from "../content/data.json"
import layout from "../content/layout.json";
import "../platform/server";

export const metadata = {
  title: "Website Theme demo",
  description: "Prototype for the react-content design pattern",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();

  const initialTheme =
    cookieStore.get("theme")?.value ?? "light";

  const api = new ServerDataApi({
    data: {
      ...data,
      children,
      initialTheme,
    },
    derivedFields: {
      htmlAttrs: (data) => ({
        lang: "en",
        "data-theme": data.initialTheme,
      }),
      initialThemeCssVars: (data) =>
        createCssVars(
          data.themes[data.initialTheme]
        ),
    },
  });

  return (
    <html
      {...api.useData("htmlAttrs")}
      className="site-html App"
      style={api.useData("initialThemeCssVars")}
    >
      <body>
        <ServerRenderer
          tree={layout}
          api={api}
        />
      </body>
    </html>
  );
}