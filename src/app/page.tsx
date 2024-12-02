"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ItemsPage = () => {
  const [items, setItems] = useState<any[]>([]); // State to store items
  const [newItemName, setNewItemName] = useState<string>(""); // State to store the name of the new item
  const [error, setError] = useState<string | null>(null); // State to store error messages

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/items");
        setItems(response.data); 
      } catch (error: any) {
        setError("Failed to load items");
      }
    };

    fetchItems();
  }, []);

  // Handle adding a new item
  const handleAddItem = async () => {
    if (!newItemName) {
      setError("Item name is required.");
      return;
    }

    try {
      const response = await axios.post("/api/items", { name: newItemName });
      setItems([...items, response.data.item]); 
      setNewItemName(""); 
      setError(null);
    } catch (error: any) {
      setError(error.message || "Failed to add item");
    }
  };

  return (
    <div className="container mx-auto p-4 dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold">Items</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.id} className="mt-2">{item.name}</li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded-md dark:bg-gray-700 dark:text-white"
          placeholder="Add new item"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default ItemsPage;
