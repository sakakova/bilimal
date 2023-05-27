import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, increment} from 'firebase/firestore';
import { app } from '../src/config';

export const CreateLesson = () => {
    // var [id, setId] = useState(0);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Shubham');
    const [isPending, setIsPending] = useState(false);
    const [lessonId, setLessonId] = useState(0);

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
        const lesson = {id: lessonId,title, body, author };
    
        setIsPending(true);
    
        try {
          const firestore = getFirestore(app);
          const lessonCollection = collection(firestore, 'lesson');
        //   const newLessonRef = doc(lessonCollection);

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
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Shubham">Shubham</option>
                    <option value="Satyam">Satyam</option>
                    <option value="Anmol">Anmol</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
     );
}