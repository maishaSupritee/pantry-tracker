import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase.js";

//add items to the database
export const addItem = async (e, newItem, setNewItem) => {
  e.preventDefault();
  if (newItem.name !== "" && newItem.quantity !== "0") {
    await addDoc(collection(db, "items"), {
      name: newItem.name.trim(),
      price: newItem.quantity,
    });
    setNewItem({ name: "", quantity: 1 });
  }
};

//read items from the database

//delete items from the database
