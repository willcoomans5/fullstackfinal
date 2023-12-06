import { firebaseApp } from "./firebase";
import { getAuth } from "firebase/auth";
import { get, child, ref, getDatabase } from "@firebase/database";
import { useState } from "react";

const auth = getAuth(firebaseApp); 
const database = getDatabase(firebaseApp); 


function RetrieveInfo() {
    const uid = auth.currentUser.uid; 
    const dbRef = ref(database); 
    const [username, setUsername] = useState(); 
    const [birthday, setBirthday] = useState(); 
    const [description, setDescription] = useState(); 
    const [year, setYear] = useState(); 

    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userInfo = snapshot.val(); 
          console.log(userInfo); 
          setUsername(userInfo.name); 
          setBirthday(userInfo.birthday); 
          setDescription(userInfo.description); 
          setYear(userInfo.year); 
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      return (
        <div>
            <p>Name: {username}</p>
            <p>Birthday: {birthday}</p>
            <p>Bio: {description}</p>
            <p>Year: {year}</p>
        </div>
      ); 
    
}

export default RetrieveInfo; 