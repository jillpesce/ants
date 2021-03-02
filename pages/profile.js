import Header from '../components/Header'
import UpdateForm from '../components/UpdateForm'
import OrgProfileForm from '../components/OrgProfileForm'
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
    const [update, setUpdate] = useState()
    const [updateOrg, setUpdateOrg] = useState()

    useEffect(() => {
        if (!user) window.location.assign('/login')
        if (isEmpty(user) || userType === 'org') return
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

    if (!user || isEmpty(user))
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
                    <h1>Hi, {user.username}.</h1>
                    <h2>Thanks for marching with us</h2>
                </div>
                <div className="profile-section">
                    {update ? (
                        <div className="form-container">
                            <UpdateForm onUpdate={setUpdate} />
                        </div>
                    ) : (
                        <div className="profile-subsection">
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
                                                {i === 'LGBTQ'
                                                    ? i
                                                    : i.toLowerCase()}
                                            </span>
                                        ))}
                                </div>
                            </div>
                            <button
                                className="button yellow"
                                onClick={setUpdate}
                            >
                                Update Interests & Location
                            </button>
                        </div>
                    )}
                    {userType === 'org' && (
                        <div>
                            {updateOrg ? (
                                <div className="form-container">
                                    <OrgProfileForm onSubmit={setUpdateOrg} />
                                </div>
                            ) : (
                                <div className="profile-subsection">
                                    <div>
                                        <label className="label">Image</label>
                                        {user.image && (
                                            <img
                                                className="profile-image"
                                                src={user.image}
                                            />
                                        )}
                                        <label className="label">
                                            Description
                                        </label>
                                        <div className="profile-text">
                                            {user.description}
                                        </div>
                                        <label className="label">Link</label>
                                        <div className="profile-text">
                                            {user.link}
                                        </div>
                                    </div>
                                    <button
                                        className="button yellow"
                                        onClick={setUpdateOrg}
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {userType == 'user' && (
                    <>
                        <div className="section-header">
                            <h1>Organizations you follow</h1>
                            <a href="/search">
                                Find more orgs on the search page
                            </a>
                        </div>
                        {followedOrgs ? (
                            followedOrgs.map((org) => <Org org={org} />)
                        ) : (
                            <p className="error">No orgs yet!</p>
                        )}
                        <div className="section-header">
                            <h1>Posts you like</h1>
                            <a href="/home">
                                Browse new posts on the home page
                            </a>
                        </div>
                        {likedPosts && likedPosts.length ? (
                            likedPosts.map((post) => <Post {...post} />)
                        ) : (
                            <p className="error">No posts yet!</p>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
