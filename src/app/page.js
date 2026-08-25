// page.js
import DataProviderGeneric from "../framework/DataProviderGeneric";
import { renderNode } from "../framework/PostRenderer";
import page from "../content/page.json";
import data from "../content/data.json";
import { cookies } from "next/headers";
import ServerDataApi from
  "../framework/ServerDataApi.js";
import ServerRenderer from
  "../framework/ServerRenderer.js";
import post from "../content/post.json";

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
      tree={post}
      api={api}
    />
  );
}
