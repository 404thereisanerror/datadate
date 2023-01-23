import "./styles.css";
import * as ngraphPixel from "ngraph.pixel";
import createGraph from "ngraph.graph";
import fromJSON from "ngraph.fromjson";

fetch("./tagesschau.json")
  .then((response) => response.json())
  .then((data) => {
    const graph = createGraph();
    fromJSON(data, nodeLoadTransform, edgeLoadTransform);
    const renderer = ngraphPixel(graph, { container: "#TagesschauContainer" });
    renderer.run();
  });

function nodeLoadTransform(node) {
  return {
    id: node.id,
    group: node.attributes["Modularity Class"],
    size: node.size,
    label: node.label,
    x: node.x,
    y: node.y
  };
}

function edgeLoadTransform(edges) {
  return { fromId: edges.source, toId: edges.target, data: edges.data };
}
