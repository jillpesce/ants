import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Header from '../../components/Header'
import Post from '../../components/Post'
import CreatePost from '../../components/CreatePost'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function Home() {
    const { user, userType } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [create, setCreate] = useState()
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (!user) window.location.assign('/login')
        else if (userType === 'user') window.location.assign('/user')
        fetchPosts()
    }, [user, userType])

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
                    setEvents(tempEvents)
                }
            })
            .catch((err) => {
                console.log('Error getting posts', err)
            })
    }

    if (!user || userType !== 'org')
        return (
            <div className="loading">
                <p>LOADING...</p>
            </div>
        )

    return (
        <div>
            <Header />
            <div className="page-body">
                <div className="section-header">
                    <h1>Posts</h1>
                    <h2>See all your posts</h2>
                </div>
                {create ? (
                    <CreatePost
                        orgid={user._id}
                        close={() => {
                            setCreate(false)
                            fetchPosts()
                        }}
                    />
                ) : (
                    <>
                        {posts && posts.length ? (
                            posts.map((post) => <Post {...post} />)
                        ) : (
                            <p className="error">
                                Create a post to attract ants!
                            </p>
                        )}
                        <div className="is-flex is-justify-content-flex-end">
                            <button
                                className="button yellow"
                                onClick={() => setCreate(true)}
                            >
                                Create a Post
                            </button>
                        </div>
                    </>
                )}
                <div className="section-header">
                    <h1>Calendar</h1>
                    <h2>See what's coming up</h2>
                </div>
                <div className="card calendar">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{
                            height: 1000,
                            margin: '40px 20px',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
