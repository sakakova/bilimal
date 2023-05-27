// import { useFetch } from './useHooks';

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { app } from '../src/config';
// import { getFirestore, doc, getDoc, getDocs } from 'firebase/firestore';

// export const LessonDetails = () => {
//   const { id } = useParams();
//   const lessonId = parseInt(id);
//   const [lesson, setLesson] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchLesson = async () => {
//       try {
//         const firestore = getFirestore(app);
//         const lessonRef = doc(firestore, 'lesson',lessonId);
//         const lessonSnapshot = await getDoc(lessonRef);

//         if (lessonSnapshot.exists()) {
//           setLesson([{ lessonId: lessonSnapshot.id, ...lessonSnapshot.data() }]);
//         } else {
//           console.log('Lesson not found.');
//         }

//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching lesson:', error);
//       }
//     };

//     fetchLesson();
//   }, [lessonId]);

//   return (
//     <div className="lesson-details">
//       {isLoading ? (
//         <div>Loading lesson...</div>
//       ) : (
//         lesson && (
//           <>
//             <h2>{lesson.title}</h2>
//             <p>Author: {lesson.author}</p>
//             <p>{lesson.body}</p>
//           </>
//         )
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { app } from '../src/config';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

export const LessonDetails = () => {
  const { id } = useParams();
  const lessonId = parseInt(id);
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const firestore = getFirestore(app);
        const lessonCollection = collection(firestore, 'lesson');
        const lessonQuery = query(lessonCollection, where('id', '==', lessonId));
        const lessonSnapshot = await getDocs(lessonQuery);

        if (!lessonSnapshot.empty) {
          const lessonData = lessonSnapshot.docs[0].data();
          setLesson({ id: lessonSnapshot.docs[0].id, ...lessonData });
        } else {
          console.log('Lesson not found.');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  return (
    <div className="lesson-details">
      {isLoading ? (
        <div>Loading lesson...</div>
      ) : (
        lesson && (
          <>
            <h2>{lesson.title}</h2>
            <p>Author: {lesson.author}</p>
            <p>{lesson.body}</p>
          </>
        )
      )}
    </div>
  );
}