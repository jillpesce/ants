import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'

const Org = ({ org }) => {
    const [buttonText, setButtonText] = useState()
    const { user, userType, updateUser } = useContext(UserContext)

    useEffect(() => {
        if (isEmpty(user)) return
        else setButtonText(user.following.includes(org._id) ? 'Following' : 'Follow')
    }, [user])

    //follow org
    const followOrg = () => {
        fetch('https://ants-senior-design.herokuapp.com/users/followOrg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                orgID: org._id,
            }),
        }).catch((err) => console.log('error following org', err))
        setButtonText('Following')
    }

    //unfollow org
    const unfollowOrg = () => {
        fetch('https://ants-senior-design.herokuapp.com/users/unfollowOrg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                orgID: org._id,
            }),
        }).catch((err) => console.log('error unfollowing org', err))

        setButtonText('Follow')
    }

    return (
        <div className="org card">
            <div className="card-left">
                <img src={org.image} />
            </div>
            <div className="card-right">
                <a
                    className="card-title"
                    href={`/org/${encodeURIComponent(org._id)}`}
                >
                    {org.name}
                </a>
                <label className="label">Locations</label>
                <div className="tags-container">
                    {org.locations.map((l) => (
                        <span className="tag">
                            {l === 'DC' || l === 'NYC' ? l : l.toLowerCase()}
                        </span>
                    ))}
                </div>
                <label className="label">Interests</label>
                <div className="tags-container">
                    {org.interests.map((i) => (
                        <span className="tag">
                            {i === 'LGBTQ' ? i : i.toLowerCase()}
                        </span>
                    ))}
                </div>
                <div className="card-body">
                    {org.description && (
                        <div>
                            <label className="label">Description</label>
                            <p className="card-text">{org.description}</p>
                        </div>
                    )}
                    {org.link && (
                        <div>
                            <label className="label">Link</label>
                            <a href={org.link} className="card-text">
                                {org.link}
                            </a>
                        </div>
                    )}
                    <div className="is-flex is-justify-content-flex-end">
                        <button
                            className="button purple is-small is-rounded"
                            onClick={
                                buttonText == 'Follow' ? followOrg : unfollowOrg
                            }
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Org
