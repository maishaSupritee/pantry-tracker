import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase.js";

//add items to the database
export const addItem = async (e, newItem, setNewItem) => {
  e.preventDefault();
  if (newItem.name !== "" && newItem.quantity !== "0") {
    await addDoc(collection(db, "items"), {
      name: newItem.name.trim(),
      quantity: newItem.quantity,
    });
    setNewItem({ name: "", quantity: 1 });
  }
};

//read items from the database
export const getItems = async (setItems) => {
  const q = query(collection(db, "items"));
  //whenever we are reading/pushing things to the database we store it in a temp array
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let itemsArr = [];

    //taking a picture of our database and pushing it to our itemsArr
    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), id: doc.id });
    });

    setItems(itemsArr);
  });

  return () => unsubscribe();
};

//delete items from the database
export const deleteItem = async (id) => {
  await deleteDoc(doc(db, "items", id));
};
