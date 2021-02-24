import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useRouter } from 'next/router'

export default function Org() {
    const { user, userType, logout } = useContext(UserContext)
    const [org, setOrg] = useState([])
    const [posts, setPosts] = useState([])
    const [buttonText, setButtonText] = useState(['Follow'])
    const router = useRouter()
    const [events, setEvents] = useState([])

    //get org
    useEffect(() => {
        //get id from url
        if (router.query.id == undefined) return
        fetch(
            `https://ants-senior-design.herokuapp.com/orgs/${router.query.id}`
        )
            .then((resp) => resp.json())
            .then(({ account, err }) => {
                if (err) {
                    console.log('Error getting orgs', err)
                } else {
                    setOrg(account)
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
        if (userType == 'user') {
            setButtonText(
                user.following.includes(org._id) ? 'Following' : 'Follow'
            )
        }
    }, [user, org])

    useEffect(() => {
        if (isEmpty(router)) return
        fetch(
            `https://ants-senior-design.herokuapp.com/posts/${router.query.id}`
        )
            .then((resp) => resp.json())
            .then(({ posts, err }) => {
                if (err) {
                    console.log('Error getting posts', err)
                } else {
                    setPosts(posts)
                    const tempEvents = []

                    posts.forEach(function (p) {
                        tempEvents.push({
                            start: new Date(p.startDate),
                            end: new Date(p.endDate),
                            title: p.title,
                        })
                    })

                    setEvents(tempEvents)
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
        fetch('https://ants-senior-design.herokuapp.com/users/followOrg', {
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
        fetch('https://ants-senior-design.herokuapp.com/users/unfollowOrg', {
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
            <div className="page-body org-page">
                <div className="section-header">
                    <h1>{org.name}</h1>
                </div>
                <div className="profile-section is-flex is-justify-content-space-between">
                    <div>
                        <label className="label">Location</label>
                        <div className="tags-container">
                            {user.locations &&
                                user.locations.map((l) => (
                                    <span className="tag">
                                        {l === 'DC' || l === 'NYC'
                                            ? l
                                            : l.toLowerCase()}
                                    </span>
                                ))}
                        </div>
                        <label className="label">Interests</label>
                        <div className="tags-container">
                            {user.interests &&
                                user.interests.map((i) => (
                                    <span className="tag">
                                        {i === 'LGBTQ' ? i : i.toLowerCase()}
                                    </span>
                                ))}
                        </div>
                    </div>
                    {userType == 'user' && (
                        <button
                            onClick={
                                buttonText == 'Follow' ? followOrg : unfollowOrg
                            }
                            className="button purple"
                        >
                            {buttonText}
                        </button>
                    )}
                </div>
                <div className="section-header">
                    <h1>Posts</h1>
                    <h2>Find your next mission</h2>
                </div>
                {posts && posts.length ? (
                    posts.map((post) => <Post {...post} />)
                ) : (
                    <p className="error">No posts yet</p>
                )}
            </div>
        </div>
    )
}
