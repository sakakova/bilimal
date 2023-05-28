// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '../style/home.css'
// import { useFetch } from '../components/useHooks';
import { useState, useEffect } from 'react';
import { LessonList } from '../components/lessonList';
// import {get, ref, getDatabase} from 'firebase/database' 
import { app } from '../src/config';
import {collection, getDocs, getFirestore} from 'firebase/firestore'
// import { NavBar } from '../components/navbar';
export const Home = () => {
  
    // const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');
    const db = getFirestore(app);
    const [lessons, setLessons] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch data from Firebase Firestore
        const fetchLessons = async () => {
          try {
            // Fetch the lessons collection
            const querySnapshot = await getDocs(collection(db,'lesson'));
    
            // Convert the query snapshot to an array of lesson objects
            const data = querySnapshot.docs.map((doc) => doc.data());
    
            // Set the fetched data to the state
            setLessons(data);
            setIsPending(false);
          } catch (error) {
            console.error('Error fetching lessons:', error);
            setError('Failed to fetch lessons');
            setIsPending(false);
          }
        };
    
        fetchLessons();
      }, []);
    return( 
        <div className="Home">
            {/* <h3>Home Page</h3> */}
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <LessonList lessons={lessons} title='My Lessons'/>
            {/* <NavBar/> */}
        </div>

    
    
    )
}


