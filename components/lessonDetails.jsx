
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { app } from '../src/config';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import '../style/lessonDetails.css'
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
  const getImageUrl = async (imageName) => {
    try {
      const storage = getStorage(app);
      const imageRef = ref(storage, `images/${imageName}`);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error('Error retrieving image URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const displayLessonImage = async () => {
      if (lesson && lesson.image) {
        const imageUrl = await getImageUrl(lesson.image);
        setLesson((prevLesson) => ({ ...prevLesson, imageUrl }));
      }
    };

    displayLessonImage();
  }, [lesson]);


  return (
    <div className="lesson-details">
      {isLoading ? (
        <div>Loading lesson...</div>
      ) : (
        lesson && (
          <>
            <p className='title'>{lesson.title}</p>
            <div className="image"> {lesson.imageUrl && (
                <img src={lesson.imageUrl} alt="img" width={'100%'} height={'auto'}  />
              )}</div>
            <p className='teacher'>Teacher: <i>{lesson.author}</i></p>
            <div className="context">
              <p>{lesson.body}</p>
            </div>
            {lesson.quizLink && (
              <div className="quiz-section">
                <p>Quiz:</p>
                <iframe
                  src={lesson.quizLink}
                  title="Quiz"
                  width="100%"
                  height="400px"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              )}
          </>
        )
      )}
    </div>
  );
}