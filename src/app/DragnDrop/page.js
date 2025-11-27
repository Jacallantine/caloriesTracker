"use client";
import React, { useState } from "react";

export default function DragDropExample() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("itemIndex");
    const copied = [...items];
    const [draggedItem] = copied.splice(dragIndex, 1);
    copied.splice(dropIndex, 0, draggedItem);
    setItems(copied);
    setHoveredIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded">
      {items.map((item, index) => (
        <div
          key={item}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          className={`p-3 rounded cursor-move transition-all duration-150 
            ${hoveredIndex === index ? "bg-blue-500 opacity-70" : "bg-blue-700 text-white"}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
