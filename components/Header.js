import { useContext } from 'react'
import { UserContext } from '../contexts/user-context'

export default function Header(props) {
    const { userType, logout } = useContext(UserContext)
    return (
        <div className="header">
            <a className="ants" href="/">
                Ants
            </a>
            <div className="headerRight">
                <a href="/">Home</a>
                {userType == 'user' && <a href="/search">Search</a>}
                <a href="/profile">Profile</a>
                <a href="/resources">Resources</a>
                <a href="/about">About</a>
                <button className="button yellow is-rounded" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}
