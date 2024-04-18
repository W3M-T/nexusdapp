// hooks/useAuthentication.ts
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export const useAuthentication = (isLoggedIn, account) => {
    const [userData, setUserData] = useState([]);
    const [userAdded, setUserAdded] = useState(false);
    useEffect(() => {
        if (isLoggedIn && account?.address) {
            addUserDb();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, account]);

    const generateRandomString = (length) => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const addUserDb = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any;
            const findUser = users?.find((item: any) => item.walletAddress == account?.address);
            setUserData(users)
            if (findUser) {
                return null;
            }
            const now = Timestamp.now();
            const randomUsername = generateRandomString(6)
            const randomFullName = generateRandomString(8);
            const docRef = await addDoc(collection(db, "users"), {
                walletAddress: account?.address,
                username: randomUsername,
                fullName: randomFullName,
                dob: "11/11/2006",
                createdAt: now,
            });
            console.log("docRef", docRef)
            setUserAdded(true);
        } catch (err) {
            console.log("🚀 ~ addUserDb ~ err:", err)
        }
    }

    return { userData, userAdded };
};
