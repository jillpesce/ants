import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Org from '../components/Org'
import Header from '../components/Header'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function Home() {
    const { user, userType } = useContext(UserContext)
    const [orgs, setOrgsList] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [create, setCreate] = useState()
    const [events, setEvents] = useState([])

    //get orgs
    useEffect(() => {
        if (userType && userType == 'user') {
            fetch(`https://ants-senior-design.herokuapp.com/orgs`)
                .then((resp) => resp.json())
                .then(({ data, err }) => {
                    if (err) {
                        console.log('Error getting orgs', err)
                    } else {
                        setOrgsList(data)
                        console.log('orgs')
                        console.log(orgs)
                    }
                })
                .catch((err) => {
                    console.log('Error getting orgs', err)
                })
        } else if (userType && userType == 'org') {
            fetchPosts()
        }
    }, [userType])

    useEffect(() => {
        if (userType && userType == 'user') {
            fetch(
                `https://ants-senior-design.herokuapp.com/posts/liked/${user._id}`
            )
                .then((resp) => resp.json())
                .then(({ posts, err }) => {
                    if (err) {
                        console.log('Error getting liked posts', err)
                    } else {
                        console.log(posts)
                        setLikedPosts(posts, console.log(likedPosts))
                        const tempEvents = []

                        likedPosts.forEach(function (p) {
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
        }
    }, [userType])

    useEffect(() => {
        if (userType && userType == 'user') {
            const tempEvents = []

            likedPosts.forEach(function (p) {
                tempEvents.push({
                    start: new Date(p.startDate),
                    end: new Date(p.endDate),
                    title: p.title,
                })
            })

            setEvents(tempEvents)
        }
    }, [likedPosts])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

    function fetchPosts() {
        fetch(`https://ants-senior-design.herokuapp.com/posts/${user._id}`)
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

                    console.log(tempEvents)

                    setEvents(tempEvents)
                }
            })
            .catch((err) => {
                console.log('Error getting posts', err)
            })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/orgs/getOrgs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.text())
            .then((data) => {
                var orgRes = JSON.parse(data)
                setOrgsList(orgRes.content)
            })
    }, [])

    if (!user) return <div />

    return (
        <div>
            <Header />
            <h1>
                {' '}
                Welcome {userType}, {user.username}{' '}
            </h1>

            {userType == 'user' ? (
                <div>
                    <hr></hr>
                    {events !== undefined && (
                        <div style={{ minHeight: '500px' }}>
                            <h2>Your Upcoming Events:</h2>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '1000px' }}
                            />
                        </div>
                    )}
                    <h2>Recommended Orgs For You:</h2>
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
            ) : (
                <div>
                    <p>This is an org page</p>
                    <div>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 800 }}
                        />
                    </div>
                    <button onClick={() => setCreate(true)}>
                        Create a Post
                    </button>
                    <CreatePost
                        create={create}
                        orgid={user._id}
                        close={() => {
                            setCreate(false)
                            fetchPosts()
                        }}
                    />
                    <h2> Your Posts </h2>
                    {posts && posts.map((post) => <Post {...post} />)}
                    {!posts.length && <p>Create a post to attract ants!</p>}
                </div>
            )}
        </div>
    )
}
