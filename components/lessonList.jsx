import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LessonList = ({lessons, title}) => {
    
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {lessons && lessons.map((lesson) => (
                <div className="blog-preview" key={lesson.id}>
                    <Link to={`/lessons/${lesson.id}`}>
                        <h2>{lesson.title}</h2>
                        <p>Written by {lesson.author}</p>
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
        author: PropTypes.string.isRequired
      })
    ).isRequired,
    title: PropTypes.string.isRequired
  };
 