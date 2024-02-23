import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { Link } from 'react-router-dom';


const Post = () => {

    const {id} = useParams();
    const {document: post, loading} = useFetchDocument("posts", id);


  return (

    <div className={styles.post}>
        {loading && (
          <>
          <p>Carregando Post..</p>
          </>
        )}
        {post && (
          <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
            <p key={tag}><span>#</span>{tag}</p>
          ))}
          </div>
          <img src={post.image} alt={post.title} />
          
          </>
        )}
        <Link to='/' className='btn btn-outline'>Voltar</Link>
    </div>
  )
}

export default Post