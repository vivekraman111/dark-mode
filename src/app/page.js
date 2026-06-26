import DataProviderGeneric from "../framework/DataProviderGeneric";
import { renderNode } from "../framework/PostRenderer";
import post from "../content/shopping-list.json";
import data from "../content/shopping-list-data.json";

export default function Home() {
  return (
    <div className="App">
      <DataProviderGeneric schema={data}>
          {renderNode(post)}
      </DataProviderGeneric>
    </div>
  );
}
