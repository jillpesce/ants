import { useContext } from 'react'
import { UserContext } from '../contexts/user-context'

export default function Header(props) {
    const { userType, logout } = useContext(UserContext)
    return (
        <div className="header">
            <h1 className="ants">Ants</h1>
            <div className="headerRight">
                <a href="/">Home</a>
                {userType == 'user' && <a href="/search">Search</a>}
                {userType == 'user' && <a href="/profile">Profile</a>}
                <a href="/update">Update</a>
                <a href="/resources">Resources</a>
                <a href="/about">About</a>
                <button className="button yellow is-rounded" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}
