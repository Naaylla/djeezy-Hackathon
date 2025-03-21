import { useState } from "react";

type Node = {
  id: number;
  x: number;
  y: number;
  color: string;
  title: string;
  description: string;
};

export default function FundNodes() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    {
      id: 1,
      x: 150,
      y: 200,
      color: "bg-red-500",
      title: "Node 1",
      description: "Description for Node 1",
    },
    {
      id: 2,
      x: 300,
      y: 300,
      color: "bg-red-500",
      title: "Node 2",
      description: "Description for Node 2",
    },
    {
      id: 3,
      x: 450,
      y: 250,
      color: "bg-red-500",
      title: "Node 3",
      description: "Description for Node 3",
    },
    {
      id: 4,
      x: 600,
      y: 350,
      color: "bg-yellow-500",
      title: "Baraka",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ];

  return (
    <div className="relative w-full h-screen bg-gray-200 flex justify-end items-center">
      {/* SVG for lines */}
      <svg className="absolute w-full h-full">
        {nodes.map((node, index) =>
          index < nodes.length - 1 ? (
            <line
              key={node.id} // Use node.id as key instead of index
              x1={nodes[index].x + 20}
              y1={nodes[index].y + 20}
              x2={nodes[index + 1].x + 20}
              y2={nodes[index + 1].y + 20}
              stroke="black"
              strokeWidth="1.5"
            />
          ) : null
        )}
      </svg>

      {/* Nodes (Clickable) */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute w-10 h-10 ${node.color} rounded-full shadow-lg cursor-pointer`}
          style={{ left: node.x, top: node.y }}
          onClick={() => setSelectedNode(node)}
        ></div>
      ))}

      {/* Card Popup */}
      {selectedNode && (
        <div className="absolute left-10 top-20 w-[300px] bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <img
            src="https://via.placeholder.com/300" // Replace with actual image
            alt={selectedNode.title}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h2 className="text-xl font-bold mt-2">{selectedNode.title}</h2>
          <p className="text-sm mt-2">{selectedNode.description}</p>
          <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md">
            Donate
          </button>
        </div>
      )}

      {/* "Start Fund" Button */}
      <button className="absolute top-6 right-6 px-6 py-3 bg-orange-400 text-white rounded-lg shadow-lg">
        Start Fund
      </button>
    </div>
  );
}
