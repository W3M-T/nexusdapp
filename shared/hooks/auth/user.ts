import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

interface User {
    username: string,
    dob: string,
    fullName: string,
    walletAddress: string,
}

export const useAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const fetchedUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setUsers(fetchedUsers as []); // Update state with fetched users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return users;
};