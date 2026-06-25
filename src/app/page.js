import "../content/sticker-pad.css";
import DataProviderGeneric from "../framework/DataProviderGeneric";
import { renderNode } from "../framework/PostRenderer";
import post from "../content/sticker-pad.json";
import data from "../content/sticker-pad-data.json";

export default function Home() {
  return (
    <div className="App">
      <DataProviderGeneric schema={data}>
          {renderNode(post)}
      </DataProviderGeneric>
    </div>
  );
}
