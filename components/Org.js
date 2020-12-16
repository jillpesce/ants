import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'

const Org = (props) => {
    const [buttonText, setButtonText] = useState()
    const { user, updateUser } = useContext(UserContext)

    useEffect(() => {
        if (isEmpty(user)) return
        setButtonText(
            user.following.includes(props.id) ? 'Following' : 'Follow'
        )
    }, [user])

    //follow org
    const followOrg = () => {
        let username = props.user
        let orgID = props.id
        fetch('http://localhost:5000/users/followOrg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username,
                orgID,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data)
            })

        setButtonText('Following')
    }

    //unfollow org
    const unfollowOrg = () => {
        let username = props.user
        let orgID = props.id
        fetch('http://localhost:5000/users/unfollowOrg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username,
                orgID,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data)
            })

        setButtonText('Follow')
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5>
                    <a href={`/org/${encodeURIComponent(props.id)}`}>
                        {props.name}
                    </a>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {props.interests.map((i) => {
                        return <li>{i}</li>
                    })}
                </h6>
                <p className="card-text">Description: {props.description}</p>
                <button
                    onClick={buttonText == 'Follow' ? followOrg : unfollowOrg}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default Org
