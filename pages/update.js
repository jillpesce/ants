import Header from '../components/Header'
import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import interestsList from '../constants/interests'
import locationsList from '../constants/locations'

export default function Signup() {
    const { user, userType, updateUser } = useContext(UserContext)
    const [interests, setInterests] = useState([])
    const [locations, setLocations] = useState([])
    const [err, setErr] = useState()
    const [success, setSuccess] = useState()

    useEffect(() => {
      if (!user) window.location.assign('/login')
      if (user.locations) setLocations(user.locations)
      if (user.interests) setInterests(user.interests)
    }, [user])

    function updateInterests(interest, checked) {
      if (checked) {
        interests.push(interest)
        setInterests(interests)
      } else {
        const newInterests = interests.filter(i => i !== interest)
        setInterests(newInterests)
      }
    }

    function updateLocations(location, checked) {
      if (checked) {
        locations.push(location)
        setLocations(locations)
      } else {
        const newLocations = locations.filter(l => l !== location)
        setLocations(newLocations)
      }
    }

    async function submit(e) {
      e.preventDefault()
      if (!locations.length && !interests.length) {
          setErr('Please select interests or locations')
      } else {
        console.log()
        fetch(`http://localhost:5000/${userType}s/update/${user._id}`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              interests,
              locations,
          })
        })
        .then(resp => resp.json())
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
            <h1>Update profile</h1>
            <h3>Current interests:</h3>
            {user.interests && user.interests.length ? (
              user.interests.map(i => <div key={i}>{i}</div>)
            ) : <div>No interests yet! Select some below.</div>}
            <br />
            <h3>Current locations:</h3>
            {user.locations && user.locations.length ? (
              user.locations.map(l => <div key={l}>{l}</div>)
            ) : <div>No locations yet! Select some below.</div>}
            <br/>
            <br/>
            <form>
                <label>Interests:</label>
                {interestsList.map(i => (
                  <div key={i}>
                    {interests.includes(i) ? (
                      <input checked type="checkbox" onChange={(e) => updateInterests(i, e.target.checked)} />
                    ) : (
                      <input type="checkbox" onChange={(e) => updateInterests(i, e.target.checked)} />
                    )}
                    {i}
                  </div>
                ))}
                <br/>
                <label>Locations:</label>
                {locationsList.map(l => (
                  <div key={l}>
                    {locations.includes(l) ? (
                      <input checked type="checkbox" onChange={(e) => updateLocations(l, e.target.checked)} />
                    ) : (
                      <input type="checkbox" onChange={(e) => updateLocations(l, e.target.checked)} />
                    )}
                    {l}
                  </div>
                ))}
                <button onClick={(e) => submit(e)}>Submit</button>
            </form>

            { err && <p>{err}</p> }
            { success && <p>{success}</p> }
        </div>
    )
}
