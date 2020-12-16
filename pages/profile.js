import Header from '../components/Header'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'
import Org from '../components/Org'
import Post from '../components/Post'

export default function Profile() {
    const { user, userType, logout } = useContext(UserContext)
    const [followedOrgs, setFollowedOrgsList] = useState([])
    const [likedPosts, setLikedPosts] = useState([])

    //get list of orgs
    useEffect(() => {
        if (isEmpty(user)) {
            return
        }

        fetch(
            `https://ants-senior-design.herokuapp.com/orgs/followed/${user.username}`
        )
            .then((resp) => resp.json())
            .then(({ data, err }) => {
                if (err) {
                    console.log('Error getting orgs', err)
                } else {
                    setFollowedOrgsList(data)
                }
            })
            .catch((err) => {
                console.log('Error getting orgs', err)
            })

        fetch(
            `https://ants-senior-design.herokuapp.com/posts/liked/${user._id}`
        )
            .then((resp) => resp.json())
            .then(({ posts, err }) => {
                if (err) {
                    console.log('Error getting liked posts', err)
                } else {
                    setLikedPosts(posts)
                }
            })
            .catch((err) => {
                console.log('Error getting orgs', err)
            })
    }, [user])

    return (
        <div>
            <Header />
            <h1>{user.username} Profile Page</h1>
            <p>Username: {user.username}</p>
            <p>
                Location:{' '}
                {user.locations &&
                    user.locations.map((l) => {
                        return <li>{l}</li>
                    })}
            </p>
            <p>
                Interests:{' '}
                {user.interests &&
                    user.interests.map((i) => {
                        return <li>{i}</li>
                    })}
            </p>
            {userType == 'user' && (
                <div>
                    <h2>Organizations you follow:</h2>
                    {followedOrgs ? (
                        followedOrgs.map((org) => (
                            <Org
                                name={org.name}
                                description={org.description}
                                interests={org.interests}
                                id={org._id}
                                user={user.username}
                            />
                        ))
                    ) : (
                        <p>No followed orgs at this time</p>
                    )}
                    <h2>Posts you like:</h2>
                    {likedPosts ? (
                        likedPosts.map((post) => (
                            <Post {...post} org={user} userid={user._id} />
                        ))
                    ) : (
                        <p>
                            No posts yet! Go to the feed page to see posts from
                            your orgs.
                        </p>
                    )}{' '}
                </div>
            )}
        </div>
    )
}
