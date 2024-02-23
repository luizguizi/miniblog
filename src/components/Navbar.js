import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

import { useAuthentication } from "../hooks/useAuthentication";

import {useAuthValue} from "../context/AuthContext";

const Navbar = () => {

    const {user} = useAuthValue();

    const {logout} = useAuthentication();

  return (

    
    <nav className={styles.navbar}>
        <NavLink className={styles.brand} to="/">
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}> 
            
            <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/">Home</NavLink>
            </li>
            

          {user && (
              <>
              <li>
              <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/posts/create">Create</NavLink>
          </li>
          <li>
              <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/dashboard">Dashboard</NavLink>
          </li>
            </>
          )}



            {!user && (
                <>
                <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/register">Cadastrar</NavLink>
            </li>
            </>
            )}
            <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/about">Sobre</NavLink>
            </li>
            {user && (
                <>
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
                </>
            ) }
        </ul>

    </nav>
  )
}

export default Navbar