import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login
        </h1>


        <h4>For users:</h4>
        <form>
            <label>Username:</label>
            <input type="text"></input><br></br>
            <label>Password:</label>
            <input type="text"></input>
            <input type="submit" value="Submit"></input>
        </form>

        <h4>For orgs:</h4>
        <form>
            <label>Username:</label>
            <input type="text"></input><br></br>
            <label>Password:</label>
            <input type="text"></input>
            <input type="submit" value="Submit"></input>
        </form>

        <h4>New User? <Link href="/signup">Sign Up</Link></h4>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}