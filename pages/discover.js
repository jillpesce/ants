import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Header from '../components/Header'
import Post from '../components/Post'
import Org from '../components/Org'

export default function Discover() {
    const { user, userType } = useContext(UserContext)
    const [recommended, setRecommended] = useState()
    const [trending, setTrending] = useState()
    const [recent, setRecent] = useState()

    useEffect(() => {
        if (!user) window.location.assign('/login')
        else if (userType === 'org') window.location.assign('/org')
    }, [user])

    // get orgs
    useEffect(() => {
        if (isEmpty(user) || !user.following) return
        // fetch recent
        fetch('https://ants-senior-design.herokuapp.com/orgs/recent')
            .then((resp) => resp.json())
            .then(({ err, orgs }) => {
                if (err) console.log('Error getting recent orgs', err)
                else {
                    setRecent(orgs)
                }
            })

        fetch('https://ants-senior-design.herokuapp.com/orgs/trending')
            .then((resp) => resp.json())
            .then(({ err, orgs }) => {
                if (err) console.log('Error getting trending orgs', err)
                else {
                    setTrending(orgs)
                }
            })

        fetch(
            'https://ants-senior-design.herokuapp.com/orgs/recommended/' +
                user._id
        )
            .then((resp) => resp.json())
            .then(({ err, orgs }) => {
                if (err) console.log('Error getting recent orgs', err)
                else {
                    setRecommended(orgs)
                }
            })
    }, [user])

    if (!user || userType !== 'user')
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
                    <h1>Recommended Orgs</h1>
                    <h2>We think you might like these orgs</h2>
                </div>
                <div className="section-body">
                    {recommended ? (
                        recommended.length ? (
                            <div className="card-scroll-container">
                                {recommended.map((o) => (
                                    <Org org={o} />
                                ))}
                            </div>
                        ) : (
                            <p className="error">
                                Follow orgs to get recommendations!
                            </p>
                        )
                    ) : (
                        <p className="loading-text">LOADING...</p>
                    )}
                </div>
                <div className="section-header">
                    <h1>Trending Orgs</h1>
                    <h2>These orgs have had a lot of activity this week</h2>
                </div>
                <div className="section-body">
                    {trending ? (
                        <div className="card-scroll-container">
                            {trending.map((o) => (
                                <Org org={o} />
                            ))}
                        </div>
                    ) : (
                        <p className="loading-text">LOADING...</p>
                    )}
                </div>
                <div className="section-header">
                    <h1>New Orgs</h1>
                    <h2>These orgs just joined Ants! Check them out</h2>
                </div>
                <div className="section-body">
                    {recent ? (
                        <div className="card-scroll-container">
                            {recent.map((o) => (
                                <Org org={o} />
                            ))}
                        </div>
                    ) : (
                        <p className="loading-text">LOADING...</p>
                    )}
                </div>
            </div>
        </div>
    )
}
