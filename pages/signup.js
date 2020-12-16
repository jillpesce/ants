import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

export default function Signup() {
    const { user, login } = useContext(UserContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
        if (!isEmpty(user)) window.location.assign('/')
    }, [])

    async function signupUser(e) {
        e.preventDefault()
        const resp = await fetch(
            'https://ants-senior-design.herokuapp.com/auth/signup',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    userType: 'user',
                }),
            }
        )
        const { account, err } = await resp.json()
        if (err) {
            setErr(err.message)
            console.log('Error signing up', err)
        } else {
            login('user', account._id, true)
        }
    }

    async function signupOrg(e) {
        e.preventDefault()
        if (!name) {
            setErr('Please enter a name')
        } else if (!username) {
            setErr('Please enter a username')
        } else if (!password) {
            setErr('Please enter a password')
        } else {
            const resp = await fetch(
                'https://ants-senior-design.herokuapp.com/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        username,
                        password,
                        userType: 'org',
                    }),
                }
            )
            const { account, err } = await resp.json()
            if (err) {
                setErr(err.message)
                console.log('Error signing up', err)
            } else {
                login('org', account._id, true)
            }
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <a href="/login">Already have an account? Log in here.</a>

            <h4>For users:</h4>
            <form>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <br></br>
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br></br>
                <button onClick={(e) => signupUser(e)}>Sign up</button>
            </form>

            <h4>For orgs:</h4>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <br></br>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <br></br>
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br></br>
                <button onClick={(e) => signupOrg(e)}>Sign up</button>
            </form>

            {err && <p>{err}</p>}
        </div>
    )
}
