import { useState } from 'react'
import locationsList from '../constants/locations'
import typeList from '../constants/types'

export default function CreatePost(props) {
  const { orgid, close, create } = props
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [err, setErr] = useState()
  const [success, setSuccess] = useState()
  const [location, setLocation] = useState()
  const [type, setType] = useState()

  function post(e) {
    e.preventDefault()
    if (!title) {
        setErr('Please enter a title')
    } else if (!description) {
        setErr('Please enter a description')
    } else if (!location) {
        setErr('Please select a location')
    } else if (!type) {
        setErr('Please select an event type')
    } else {
      fetch('http://localhost:5000/orgs/post', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          location,
          type,
          orgid
        })
      })
      .then(resp => resp.json())
      .then(({ err, post}) => {
        if (err) {
          console.log('Error creating post', err)
          setErr(err)
        } else {
          setErr('')
          setSuccess('Successfully created post!')
          close()
        }
      })
    }
  }

  return (
    <div>
      { create ? (
        <>
          <h2> Create a post </h2>
          <form>
            <label>Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)}></input><br/><br/>

            <label>Type:</label>
            {typeList.map(t => (
              <div>
                <input type="radio" id={t} name="type" value={t} onChange={() => setType(t)}/>
                <label>{t}</label><br/>
              </div>
            ))}

            <label>Location:</label>
            {locationsList.map(l => (
              <div>
                <input type="radio" id={l} name="location" value={l} onChange={() => setLocation(l)}/>
                <label>{l}</label><br/>
              </div>
            ))}
            <div>
              <input type="radio" id="REMOTE" name="location" value="REMOTE" onChange={() => setLocation("REMOTE")}/>
              <label>REMOTE</label><br/>
            </div>

            <label>Description:</label>
            <textarea onChange={(e) => setDescription(e.target.value)}></textarea><br/><br/>
            {err && <p>{err}</p>}
            <button onClick={(e) => post(e)}>Post</button>
            <button onClick={(e) => {
              e.preventDefault()
              close()
            }}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          {err && <p>{err}</p>}
          {success && <p>{success}</p>}
        </>
      )}
    </div>
  )

}
