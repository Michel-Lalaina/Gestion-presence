// src/components/ArchitectureTree.tsx
import { useState } from "react";
import {
  Folder,
  InsertDriveFile,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";

type Node = {
  name: string;
  folder?: boolean;
  children?: Node[];
};

const architecture: Node = {
  name: "src",
  folder: true,
  children: [
    { name: "assets", folder: true },
    { name: "components", folder: true },
    {
      name: "features",
      folder: true,
      children: [
        { name: "Dashboard", folder: true },
        { name: "Auth", folder: true },
      ],
    },
    // { name: "hooks", folder: true },
    { name: "layouts", folder: true },
    { name: "pages", folder: true },
    // { name: "routes", folder: true }, facultatif sad aleo ts apina
    // { name: "store", folder: true },
    // { name: "types", folder: true },
    { name: "services", folder: true },
    { name: "utils", folder: true },
    { name: "App.tsx" },
    { name: "main.tsx" },
    { name: "index.css" },
  ],
};

export default function ArchitectureTree() {
  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-lg rounded-2xl bg-white">
      <CardContent>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          🧱 Architecture du frontend React
        </h2>
        <div className="p-4">
          <TreeNode node={architecture} />
        </div>
      </CardContent>
    </Card>
  );
}

function TreeNode({ node }: { node: Node }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div
        className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? (
            <KeyboardArrowDown fontSize="small" className="text-gray-500" />
          ) : (
            <KeyboardArrowRight fontSize="small" className="text-gray-500" />
          )
        ) : (
          <span className="w-4" />
        )}

        {node.folder ? (
          <Folder
            fontSize="small"
            className="text-blue-500 flex-shrink-0 transition-transform"
          />
        ) : (
          <InsertDriveFile
            fontSize="small"
            className="text-gray-400 flex-shrink-0"
          />
        )}

        <span className="text-sm font-medium text-gray-700">{node.name}</span>
      </div>

      {open && hasChildren && (
        <div className="pl-6 border-l border-gray-200 mt-1 space-y-1">
          {node.children!.map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
