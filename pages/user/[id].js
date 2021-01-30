import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Org from '../../components/Org'

export default function UserProfile() {
    const { user, userType, logout } = useContext(UserContext)
    const [followedOrgs, setFollowedOrgsList] = useState([])

    //get list of orgs
    useEffect(() => {
        fetch(`https://ants-senior-design.herokuapp.com/orgs`)
            .then((resp) => resp.json())
            .then(({ data, err }) => {
                if (err) {
                    console.log('Error getting orgs', err)
                } else {
                    setOrgsList(data)
                }
            })
            .catch((err) => {
                console.log('Error getting orgs', err)
            })
    }, [])

    // useEffect(() => {
    //     if (!user) window.location.assign('/login')
    // })

    // if (!user) return (<div/>)

    return (
        <div>
            <h1>Profile Page</h1>
            <p>
                {' '}
                Welcome {userType}, {user.username}{' '}
            </p>
            <button onClick={logout}>Log out</button>
            <h2>User info:</h2>
            <p>Interests</p>

            <div>
                <hr></hr>
                <h2>Your Followed Orgs:</h2>
                {orgs !== undefined ? (
                    orgs.map((org) => {
                        return (
                            <Org
                                name={org.name}
                                description={org.description}
                                interests={org.interests}
                                id={org._id}
                                user={user.username}
                            />
                        )
                    })
                ) : (
                    <p>No recommended orgs at this time</p>
                )}
            </div>
            <hr></hr>
            <h2>Liked posts:</h2>
        </div>
    )
}
