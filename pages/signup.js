import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

export default function Signup() {
    const { user, login } = useContext(UserContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [userType, setUserType] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
        if (!isEmpty(user)) window.location.assign('/')
    }, [])

    async function submit(e) {
        e.preventDefault()
        if (!username) {
            setErr('Please enter a username')
        } else if (!password) {
            setErr('Please enter a password')
        } else if (!userType) {
            setErr('Please choose account type')
        } else if (password !== confirmPassword) {
            setErr('Passwords do not match')
        } else {
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
        <div className="signup">
            <div className="signup-left">
                <h1 className="ants-yellow">Join the march.</h1>
            </div>
            <div className="signup-right">
                <form>
                    <div className="field">
                        <label className="label">Username:</label>
                        <input
                            className="input"
                            type="text"
                            onChange={(e) => {
                                setErr('')
                                setUsername(e.target.value)
                            }}
                        ></input>
                    </div>

                    <div className="field">
                        <label className="label">Password:</label>
                        <input
                            className="input"
                            type="password"
                            onChange={(e) => {
                                setErr('')
                                setPassword(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password:</label>
                        <input
                            className="input"
                            type="password"
                            onChange={(e) => {
                                setErr('')
                                setConfirmPassword(e.target.value)
                            }}
                        ></input>
                    </div>

                    <label className="label">Account Type</label>
                    <div class="buttons has-addons">
                        <button
                            class={
                                userType === 'user'
                                    ? 'button yellow is-small'
                                    : 'button is-small'
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                setErr('')
                                setUserType('user')
                            }}
                        >
                            Volunteer
                        </button>
                        <button
                            class={
                                userType === 'org'
                                    ? 'button yellow is-small'
                                    : 'button is-small'
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                setErr('')
                                setUserType('org')
                            }}
                        >
                            Organization
                        </button>
                    </div>

                    {err && <p className="error">{err}</p>}

                    <button
                        className="button yellow is-rounded"
                        onClick={submit}
                    >
                        Sign up
                    </button>
                    <a href="/login">Already have an account? Log in here.</a>
                </form>
            </div>
        </div>
    )
}
