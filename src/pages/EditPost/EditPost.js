import styles from "./EditPost.module.css"

import {useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useInsertDocument } from "../../hooks/useInsertDocument";



const EditPost = () => {

const {id} = useParams();
const {document: post} = useFetchDocument('posts', id);
  
const [title, setTitle] = useState('');
const [image, setImage] = useState('');
const [body, setBody] = useState('');
const [tags, setTags ] = useState([]);
const [ formError, setFormError] = useState('');

useEffect(() => {
  if(post) {
    setTitle(post.title);
    setBody(post.body);
    setImage(post.image);
   
    const textTags = post.tagsArray.join(", ")

    setTags(textTags);
  }
}, [post])

const {response, updateDocument} = useUpdateDocument("posts");

const {user} = useAuthValue();

const Navigate = useNavigate();


const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");



    // validate image URL

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    //criar array de tags
    
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


    //check all values
    
    if (!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!");
    }
    
    if (formError)return;


   const data = {
    title,
    image,
    body,
    tagsArray,
    uid: user.uid,
    createdBy: user.displayName,
   }
   
    updateDocument(id, data);


    //redirect to home page
    Navigate("/dashboard");
  
};

  return (
    <div className={styles.edit_post}>
        {post && (
          <>
          <h2>Editar Post</h2>
        <p>Altere o conteúdo do post como desejar!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input 

            type="text"
             name="title" 
             required 
             placeholder="Pense num bom título..."
             onChange={(e) => setTitle(e.target.value)} 
             value={title}

             />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input 

            type="text"
             name="image" 
             required 
             placeholder="Insira uma imagem que representa o seu post"
             onChange={(e) => setImage(e.target.value)} 
             value={image}

             />
          </label>
          <p className={styles.preview}>Preview image</p>
             <img className={styles.prev_image} src={post.image}/>
          <label>
            <span>Conteúdo:</span>
            <textarea

            type="text"
             name="body" 
             required 
             placeholder="O que está pensando?"
             onChange={(e) => setBody(e.target.value)} 
             value={body}

             />
          </label>
          <label>
            <span>Tags:</span>
            <input 

            type="text"
             name="tags" 
             required 
             placeholder="Insira as tags separadas por vírgulas"
             onChange={(e) => setTags(e.target.value)} 
             value={tags}

             />
             </label>
           
             {!response.loading && <button className="btn">Concluir</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
        </form>
        
          </>
        )}
    </div>
  );
};

export default EditPost