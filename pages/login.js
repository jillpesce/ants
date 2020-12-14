import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  return (
      <div>
          <h1>Log in</h1>
          <a href="/signup">Don't have an account? Sign up here.</a>

          <form>
              <label>Username:</label>
              <input type="text"></input><br></br>
              <label>Password:</label>
              <input type="text"></input><br></br>
          </form>
      </div>
  )
}
