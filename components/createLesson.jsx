import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, increment} from 'firebase/firestore';
import { app } from '../src/config';
import {  ref, uploadBytes } from 'firebase/storage';
import { storage } from '../src/config';
import '../style/createLesson.css'
export const CreateLesson = () => {
    // var [id, setId] = useState(0);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Shubham');
    const [isPending, setIsPending] = useState(false);
    const [lessonId, setLessonId] = useState(0);
    const [image, setImage] = useState(null);
    const [quizLink, setQuizLink] = useState('');



    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the current lesson ID from the counter document
        const fetchLessonId = async () => {
          const firestore = getFirestore(app);
          const counterDocRef = doc(firestore, 'counter', 'lessonId');
          const counterDocSnap = await getDoc(counterDocRef);
          if (counterDocSnap.exists()) {
            const currentLessonId = counterDocSnap.data().value;
            setLessonId(currentLessonId);
          }
        };
    
        fetchLessonId();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const lesson = {id: lessonId,title, body, author, image: image ? image.name : null,quizLink: quizLink ? quizLink : null,

            
        };
    
        setIsPending(true);
    
        try {
          const firestore = getFirestore(app);
          const lessonCollection = collection(firestore, 'lesson');
        //   const newLessonRef = doc(lessonCollection);
        if (image) {
            // Upload image to storage
            const imageName = `lesson_${lessonId}_${image.name}`;

            const storageRef = ref(storage, `images/${imageName}`);
            await uploadBytes(storageRef, image);

            lesson.image = imageName;

          }


          await addDoc(lessonCollection, lesson);
          const counterDocRef = doc(firestore, 'counter', 'lessonId');
          await updateDoc(counterDocRef, { value: increment(1) });
          setIsPending(false);
          navigate('/');
        } catch (error) {
          setIsPending(false);
          console.error('Error adding lesson:', error);
        }
      };
    
    return ( 
        <div className="create">
            <h2>Create new lesson</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input  className='inp'
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Image:</label>
                <input className='inp'
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label>Body:</label>
                <textarea className='inp'
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Blog author:</label>
                <select className='inp'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Shubham">Shubham</option>
                    <option value="Satyam">Satyam</option>
                    <option value="Anmol">Anmol</option>
                </select>
                <label>Quiz link:</label>
                <input
                    className="inp"
                    type="text"
                    required
                    value={quizLink}
                    onChange={(e) => setQuizLink(e.target.value)}
                />
                {!isPending && <button>Create lesson</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
     );
}