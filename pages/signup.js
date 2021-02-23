import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import UpdateForm from '../components/UpdateForm'
import OrgProfileForm from '../components/OrgProfileForm'
import { useRouter } from 'next/router'

export default function Signup() {
    const { user, login, updateUser } = useContext(UserContext)
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [userType, setUserType] = useState()
    const [form, setForm] = useState()
    const [link, setLink] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [err, setErr] = useState()
    const router = useRouter()

    useEffect(() => {
        if (!router.query || !user) return
        if (!isEmpty(user) && router.query.p) setForm(router.query.p)
        else setForm(1)
    }, [router.query, user])

    async function submit(e) {
        e.preventDefault()
        if (!username) {
            setErr('Please enter a username')
        } else if (!password) {
            setErr('Please enter a password')
        } else if (!link) {
            setErr('Please enter a website')
        } else if (!image) {
            setErr('Please enter an image')
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
                        image,
                        link,
                    }),
                }
            )
            const { account, err } = await resp.json()
            if (err) {
                setErr(err.message)
                console.log('Error signing up', err)
            } else {
                login(userType, account._id, false)
                router.push({
                    pathname: '/signup',
                    query: { p: 2 },
                })
            }
        }
    }

    return (
        <div className="signup">
            <div className="signup-left">
                <h1 className="ants-yellow">Join the march.</h1>
            </div>
            <div className="signup-right">
                {form == 1 ? (
                    <form>
                        <label className="label">Account Type</label>
                        <div className="buttons has-addons">
                            <button
                                className={
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
                                className={
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

                        {userType === 'org' && (
                            <div className="field">
                                <label className="label">Name</label>
                                <input
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                        setErr('')
                                        setName(e.target.value)
                                    }}
                                ></input>
                            </div>
                        )}
                        <div className="field">
                            <label className="label">Username</label>
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
                            <label className="label">Password</label>
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
                            <label className="label">Confirm Password</label>
                            <input
                                className="input"
                                type="password"
                                onChange={(e) => {
                                    setErr('')
                                    setConfirmPassword(e.target.value)
                                }}
                            ></input>
                        </div>

                        {err && <p className="error">{err}</p>}
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
                            <label>Website:</label>
                            <input
                                type="text"
                                onChange={(e) => setLink(e.target.value)}
                            ></input>
                            <br></br>
                            <label>Image:</label>
                            <input
                                type="file"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => {
                                    var reader = new FileReader()
                                    reader.readAsBinaryString(e.target.files[0])

                                    reader.onload = (f) => {
                                        console.log(btoa(reader.result))
                                        setImage(btoa(reader.result))
                                    }
                                    reader.onerror = (f) => {
                                        console.log('there are some problems')
                                    }
                                }}
                            ></input>
                            <br></br>
                            <button onClick={(e) => signupOrg(e)}>
                                Sign up
                            </button>
                        </form>

                        <button
                            className="button yellow is-rounded"
                            onClick={submit}
                        >
                            Sign up
                        </button>
                        <a href="/login">
                            Already have an account? Log in here.
                        </a>
                    </form>
                ) : form == 2 ? (
                    <div>
                        <p className="form-header">Hi, {user.username}.</p>
                        <p className="form-subtitle">
                            Please select your city and interests below so we
                            can best match you with{' '}
                            {userType === 'user'
                                ? 'organizations'
                                : 'volunteers'}
                            .
                        </p>
                        <UpdateForm
                            onUpdate={() =>
                                userType === 'user'
                                    ? window.location.assign('/')
                                    : router.push({
                                          pathname: '/signup',
                                          query: { p: 3 },
                                      })
                            }
                        />
                        <a
                            href="/"
                            onClick={() =>
                                userType === 'user'
                                    ? window.location.assign('/')
                                    : router.push({
                                          pathname: '/signup',
                                          query: { p: 3 },
                                      })
                            }
                        >
                            Skip this step
                        </a>
                    </div>
                ) : (
                    <div>
                        <p className="form-header">Almost there...</p>
                        <p className="form-subtitle">
                            Please provide some more information about your
                            organization.
                        </p>
                        <OrgProfileForm
                            onSubmit={() => window.location.assign('/')}
                        />
                        <a href="/" onClick={() => window.location.assign('/')}>
                            Skip this step
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
