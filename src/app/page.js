// page.js
import page from "../content/page.json";
import data from "../content/data.json";
import { cookies } from "next/headers";
import ServerDataApi from
  "../framework/ServerDataApi.js";
import ServerRenderer from
  "../framework/ServerRenderer.js";
import post from "../content/post.json";
import "../platform/server";

export default async function Home() {
  const cookieStore = await cookies();

  const initialTheme =
    cookieStore.get("theme")?.value ?? "light";

  const api = new ServerDataApi({
    data: {
      ...data,
      initialTheme,
    },
    derivedFields: {
      colorPalette: (data) => {
        const themeColors =
          data.themes[data.initialTheme].color;

        return Object.entries(themeColors)
          .map(([label, color]) => ({
            label,
            color: {
              "--color": `var(--color-${label})`
            }
          }));
      }
    }
  });

  return (
    <ServerRenderer
      tree={page}
      api={api}
    />
  );
}
