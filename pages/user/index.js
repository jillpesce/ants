import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Header from '../../components/Header'
import Post from '../../components/Post'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function Home() {
    const { user, userType } = useContext(UserContext)
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (!user) window.location.assign('/login')
        else if (userType === 'org') window.location.assign('/org')
    }, [user])

    // get posts for feed
    useEffect(() => {
        if (isEmpty(user) || !user.following) return
        let allPosts = []
        for (const orgid of user.following) {
            fetch(`https://ants-senior-design.herokuapp.com/posts/${orgid}`)
                .then((resp) => resp.json())
                .then(({ posts, err }) => {
                    if (err) {
                        console.log('Error getting liked posts', err)
                    } else {
                        allPosts = allPosts.concat(posts)
                        setPosts(allPosts)
                    }
                })
                .catch((err) => {
                    console.log('Error getting orgs', err)
                })
        }
    }, [user])

    // get liked posts for calendar
    useEffect(() => {
        fetch(
            `https://ants-senior-design.herokuapp.com/posts/liked/${user._id}`
        )
            .then((resp) => resp.json())
            .then(({ posts, err }) => {
                if (err) {
                    console.log('Error getting liked posts', err)
                } else {
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
    }, [userType])

    useEffect(() => {
        const tempEvents = []
        likedPosts.forEach(function (p) {
            tempEvents.push({
                start: new Date(p.startDate),
                end: new Date(p.endDate),
                title: p.title,
            })
        })
        setEvents(tempEvents)
    }, [likedPosts])

    if (!user || userType !== 'user') return <div> loading ... </div>

    return (
        <div>
            <Header />
            <div className="page-body">
                <div className="section-header">
                    <h1>Feed</h1>
                    <h2>New posts from organizations you follow</h2>
                </div>
                <div className="posts">
                    {posts && posts.length ? (
                        posts.map((post) => (
                            <Post {...post} userid={user._id} />
                        ))
                    ) : (
                        <p className="error">
                            {' '}
                            No posts yet! Go to the home page to follow more
                            orgs.{' '}
                        </p>
                    )}
                </div>
                <div className="section-header">
                    <h1>Calendar</h1>
                    <h2>See all your events in one place</h2>
                </div>
                {events && (
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 1000, margin: '40px 20px' }}
                    />
                )}
            </div>
        </div>
    )
}
