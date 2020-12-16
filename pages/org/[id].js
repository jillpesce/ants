import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useRouter } from 'next/router'

export default function Profile() {
    const { user, userType, logout } = useContext(UserContext)
    const [org, setOrg] = useState([])
    const [posts, setPosts] = useState([])
    const [buttonText, setButtonText] = useState(['Follow'])
    const router = useRouter()
    console.log(router)
    console.log('org id: ' + router.query.id)

    //get list of orgs
    useEffect(() => {
        //get id from url
        if (router.query.id == undefined) return
        fetch(`http://localhost:5000/orgs/${router.query.id}`)
            .then((resp) => resp.json())
            .then(({ account, err }) => {
                if (err) {
                    console.log('Error getting orgs', err)
                } else {
                    console.log(account)
                    setOrg(account)
                    console.log('ORG: ' + org)
                }
            })
            .catch((err) => {
                console.log('Error getting orgs', err)
            })
    }, [router])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

    useEffect(() => {
        if (isEmpty(user) || isEmpty(org)) return
        setButtonText(user.following.includes(org._id) ? 'Following' : 'Follow')
    }, [user, org])

    useEffect(() => {
        if (isEmpty(router)) return
        fetch(`http://localhost:5000/posts/${router.query.id}`)
            .then((resp) => resp.json())
            .then(({ posts, err }) => {
                if (err) {
                    console.log('Error getting posts', err)
                } else {
                    console.log('POSTS: ' + posts)
                    setPosts(posts)
                }
            })
            .catch((err) => {
                console.log('Error getting posts', err)
            })
    }, [router])

    //follow org
    const followOrg = () => {
        let username = user.username
        let orgID = org._id
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
        let username = user.username
        let orgID = org._id
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

    if (!user) return <div />

    return (
        <div>
            <Header />
            {org && (
                <div>
                    <h2>{org.name}'s page</h2>
                    <button
                        onClick={
                            buttonText == 'Follow' ? followOrg : unfollowOrg
                        }
                    >
                        {buttonText}
                    </button>
                    <p>
                        Location:{' '}
                        {org.locations &&
                            org.locations.map((l) => {
                                return <li>{l}</li>
                            })}
                    </p>
                    <p>
                        Interests:{' '}
                        {org.interests &&
                            org.interests.map((i) => {
                                return <li>{i}</li>
                            })}
                    </p>
                    <h2> Posts </h2>
                    {posts &&
                        posts.map((post) => (
                            <Post {...post} org={org} userid={user._id} />
                        ))}
                </div>
            )}
            {!posts.length && <p>No posts yet</p>}
        </div>
    )
}
