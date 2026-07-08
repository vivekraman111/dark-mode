import DataProviderGeneric from "../framework/DataProviderGeneric";
import { renderNode } from "../framework/PostRenderer";
import post from "../content/post.json";
import data from "../content/data.json";

export default function Home() {
  return (
    <div className="App">
      <DataProviderGeneric schema={data}>
          {renderNode(post)}
      </DataProviderGeneric>
    </div>
  );
}
