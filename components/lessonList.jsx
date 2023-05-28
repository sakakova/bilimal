import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStorage, ref, getDownloadURL, getMetadata } from 'firebase/storage';
import { app } from '../src/config';
import { useEffect, useState } from 'react';

export const LessonList = ({lessons, title}) => {
    const [lessonsData, setLessonsData] = useState([]);

    useEffect(() => {
        const fetchImageUrls = async () => {
            const storageRef = getStorage(app);
          
            const updatedLessons = await Promise.all(
              lessons.map(async (lesson) => {
                if (lesson.image) {
                  const objectRef = ref(storageRef, `images/${lesson.image}`);
                  try {
                    await getMetadata(objectRef); // Check if object exists
                    const imageUrl = await getDownloadURL(objectRef);
                    return { ...lesson, imageUrl };
                  } catch (error) {
                    console.error('Error retrieving storage object:', error);
                    return lesson;
                  }
                }
                return lesson;
              })
            );
          
            setLessonsData(updatedLessons);
          };
    
        fetchImageUrls();
      }, [lessons]);
    
    return ( 
        <div className="lesson-list">
            <h2>{title}</h2>
            {lessonsData && lessonsData.map((lesson) => (
                <div className="lesson-preview" key={lesson.id}>
                    <div className='img-box'>{lesson.imageUrl && <img src={lesson.imageUrl} alt="img" width={'60px'} height={'60px'}/>}</div>
                    
                    <Link to={`/lessons/${lesson.id}`}>
                        <h2>{lesson.title}</h2>
                        {/* <p>Written by {lesson.author}</p> */}
                    </Link>
                </div>
            ))}
        </div>
     );
}
LessonList.propTypes = {
    lessons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        image: PropTypes.string,
      })
    ).isRequired,
    title: PropTypes.string.isRequired
  };
 