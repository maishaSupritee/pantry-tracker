import {
  collection,
  addDoc,
  getDocs,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  startAt,
  endAt,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase.js";

//add items to the database
export const addItem = async (newItem, callback) => {
  try {
    await addDoc(collection(db, "items"), {
      name: newItem.name.trim(),
      quantity: newItem.quantity,
      expiry: newItem.expiry,
    });
    if (callback) callback();
  } catch (error) {
    console.error("Error adding item: ", error);
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
  try {
    await deleteDoc(doc(db, "items", id));
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};

//update items in the database
export const updateItem = async (item, callback) => {
  try {
    const itemRef = doc(db, "items", item.id);
    await updateDoc(itemRef, {
      name: item.name,
      quantity: item.quantity,
      expiry: item.expiry,
    });
    if (callback) callback();
  } catch (error) {
    console.error("Error updating item: ", error);
  }
};

//search items in the database by name
export const searchItems = async (searchTerm, setItems) => {
  const searchTermLower = searchTerm.toLowerCase();
  console.log("Search term:", searchTermLower);
  const q = query(
    collection(db, "items"),
    orderBy("name"),
    startAt(searchTermLower),
    endAt(searchTermLower + "\uf8ff")
  );

  try {
    const querySnapshot = await getDocs(q);
    let itemsArr = [];
    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), id: doc.id });
    });
    console.log("Items found:", itemsArr);
    setItems(itemsArr);
  } catch (error) {
    console.error("Error searching items: ", error);
    setItems([]);
  }
};
