import Head from 'next/head'

export default function Signup() {
  return (
    <div>
        <h1>Sign Up</h1>
        <a href="/login">Have an account? Log in here.</a>

        <h4>For users:</h4>
        <form>
            <label>Username:</label>
            <input type="text"></input><br></br>
            <label>Password:</label>
            <input type="text"></input><br></br>
            <label>Email:</label>
            <input type="text"></input><br></br>
            <label>Location:</label>
            <input type="text"></input>
            <input type="submit" value="Submit"></input>
        </form>

        <h4>For orgs:</h4>
        <form>
            <label>Username:</label>
            <input type="text"></input><br></br>
            <label>Password:</label>
            <input type="text"></input><br></br>
            <label>Email:</label>
            <input type="text"></input><br></br>
            <label>Location:</label>
            <input type="text"></input>
            <input type="submit" value="Submit"></input>
        </form>
    </div>
  )
}
