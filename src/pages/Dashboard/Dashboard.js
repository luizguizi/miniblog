import styles from "./Dashboard.module.css";
import {Link} from 'react-router-dom';

//hook
  import {useAuthValue} from '../../context/AuthContext';
  import {useFetchDocuments} from '../../hooks/useFetchDocuments'
  import { useDeleteDocument } from "../../hooks/useDeleteDocument";


const Dashboard = () => {
const {user} = useAuthValue();
const uid = user.uid;

const {documents:posts, loading} = useFetchDocuments('posts', null, uid);


const {deleteDocument} = useDeleteDocument("posts");

if(loading) {
   return <p>Carregando...</p>;
}

  return (
    <div className={styles.dash}>
        <h1>Dashboard</h1>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
            <div className={styles.nopost}>
          <p>Poxa :( Você não possui posts! <br></br> Crie um agora mesmo.</p>
          <Link to='/posts/create' className="btn">Criar primeiro Post</Link>
            </div>
        ) : (
          <>
              <div className={styles.post_header}>
                <span>Título</span>
                <span>Ações</span>
              </div>

              {posts && posts.map((post) => <div key={post.id} className={styles.post_row}> 
                    <p>{post.title}</p>
                    <div>
                        <Link to={`/posts/${post.id}` } className='btn btn-outline'>Ver</Link>
                        <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                        Editar
                        </Link>
                        <button className="btn btn-outline btn-danger" onClick={() => deleteDocument(post.id)}>
                          Exluir
                        </button>
                    </div>
              </div>)}

          </>
        )}

        
    </div>
  )
}

export default Dashboard