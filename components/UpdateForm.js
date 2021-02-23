import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import interestsList from '../constants/interests'
import locationsList from '../constants/locations'

export default function Update({ onUpdate }) {
    const { user, userType, updateUser } = useContext(UserContext)
    const [interests, setInterests] = useState([])
    const [locations, setLocations] = useState([])
    const [err, setErr] = useState()
    const [success, setSuccess] = useState()

    useEffect(() => {
        if (!user) return
        if (user.locations) setLocations(user.locations)
        if (user.interests) setInterests(user.interests)
    }, [user])

    function updateInterests(interest) {
        if (!interests.includes(interest)) {
            setInterests([...interests, interest])
        } else {
            setInterests(interests.filter((i) => i !== interest))
        }
    }

    function updateLocations(location) {
        if (!locations.includes(location)) {
            setLocations([...locations, location])
        } else {
            setLocations(locations.filter((l) => l !== location))
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
                        setSuccess('Updated')
                        onUpdate && onUpdate()
                    }
                })
        }
    }

    return (
        <>
            <form className="update-form">
                <div className="checkboxes">
                    <label className="label">Interests</label>
                    {interestsList.map((i) => (
                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={(e) => updateInterests(i)}
                                    checked={interests.includes(i)}
                                />
                                {i === 'LGBTQ' ? i : i.toLowerCase()}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="checkboxes">
                    <label className="label">Locations</label>
                    {locationsList.map((i) => (
                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={(e) => updateLocations(i)}
                                    checked={locations.includes(i)}
                                />
                                {i === 'DC' || i === 'NYC'
                                    ? i
                                    : i.toLowerCase()}
                            </label>
                        </div>
                    ))}
                </div>
            </form>
            <div className="submit">
                {err && <p className="error">{err}</p>}
                {success && <p className="success">{success}</p>}
                <button className="button yellow is-rounded" onClick={submit}>
                    Done
                </button>
            </div>
        </>
    )
}
