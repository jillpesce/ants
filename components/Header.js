import styles from './styles/Header.module.css'
import { useContext } from 'react'
import { UserContext } from '../contexts/user-context'

export default function Header(props) {
  const { logout } = useContext(UserContext)
  return (
    <div className={styles.header}>
      <h1 className={styles.ants}>Ants</h1>
      <div className={styles.headerRight}>
          <a className={styles.a} href="/">Home</a>
          <a className={styles.a} href="/profile">Profile</a>
          <a className={styles.a} href="/update">Update</a>
          <a className={styles.a} href="/feed">Feed</a>
          <a className={styles.a} href="/resources">Resources</a>
          <a className={styles.a} href="/about">About</a>
          <button className={styles.button} onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
