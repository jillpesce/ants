import Header from '../components/Header'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import interestsList from '../constants/interests'
import locationsList from '../constants/locations'
import { isEmpty } from 'lodash'
import Org from '../components/Org'
import Post from '../components/Post'

export default function Profile() {
    const { user, userType, logout, updateUser } = useContext(UserContext)
    const [followedOrgs, setFollowedOrgsList] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const [interests, setInterests] = useState([])
    const [locations, setLocations] = useState([])
    const [err, setErr] = useState()
    const [success, setSuccess] = useState()

    //get list of orgs
    useEffect(() => {
        if (isEmpty(user)) {
            return
        }
        if (user.locations) setLocations(user.locations)
        if (user.interests) setInterests(user.interests)

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
                console.log('Error getting posts', err)
            })
    }, [user])

    function updateInterests(interest, checked) {
        if (checked) {
            interests.push(interest)
            setInterests(interests)
        } else {
            const newInterests = interests.filter((i) => i !== interest)
            setInterests(newInterests)
        }
    }

    function updateLocations(location, checked) {
        if (checked) {
            locations.push(location)
            setLocations(locations)
        } else {
            const newLocations = locations.filter((l) => l !== location)
            setLocations(newLocations)
        }
    }

    async function submit(e) {
        e.preventDefault()
        if (!locations.length && !interests.length) {
            setErr('Please select interests or locations')
        } else {
            fetch(
                `https://ants-senior-design.herokuapp.com/${userType}s/update/${user._id}`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        interests,
                        locations,
                    }),
                }
            )
                .then((resp) => resp.json())
                .then(({ user, org, err }) => {
                    if (err) {
                        setErr('Sorry, an error occurred. Please try again.')
                        console.log('Error updating profile', err)
                    } else {
                        updateUser(user || org)
                        setSuccess('Interests saved!')
                    }
                })
        }
    }


    return (
        <div>
            <Header />
            <h1>{user.username}'s Profile Page</h1>
            <p>
                <img src={user.image}></img>
            </p>
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
            <p>
                <a target='_blank' href={user.link}>Org Website</a>
            </p>
            {userType == 'user' && (
                <div>
                    <h2>Organizations you follow:</h2>
                    {followedOrgs ? (
                        followedOrgs.map((org) => <Org org={org} />)
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
        <form>
            <h3> Set Interests:</h3>
            {interestsList.map((i) => (
                <div key={i}>
                    {interests.includes(i) ? (
                        <input
                            checked
                            type="checkbox"
                            onChange={(e) =>
                                updateInterests(i, e.target.checked)
                            }
                        />
                    ) : (
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                updateInterests(i, e.target.checked)
                            }
                        />
                    )}
                    {i}
                </div>
            ))}
            <br />
            <h3>Set Locations:</h3>
            {locationsList.map((l) => (
                <div key={l}>
                    {locations.includes(l) ? (
                        <input
                            checked
                            type="checkbox"
                            onChange={(e) =>
                                updateLocations(l, e.target.checked)
                            }
                        />
                    ) : (
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                updateLocations(l, e.target.checked)
                            }
                        />
                    )}
                    {l}
                </div>
            ))}
            <button onClick={(e) => submit(e)}>Submit</button>
        </form>

        {err && <p>{err}</p>}
        {success && <p>{success}</p>}
    </div>
    )
}
