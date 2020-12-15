import { useState } from 'react'

export default function CreatePost(props) {
  const { orgid } = props
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [location, setLocation] = useState()
  const [type, setType] = useState()
  const [err, setErr] = useState()
  const [success, setSuccess] = useState()

  function post(e) {
    e.preventDefault()
    if (!title) {
        setErr('Please enter a title')
    } else if (!description) {
        setErr('Please enter a description')
    } else if (!location) {
        setErr('Please enter a location')
    } else if (!type) {
        setErr('Please enter an event type')
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
          console.log(post)
          setErr('')
          setSuccess('Successfully created post!')
        }
      })
    }
  }

  return (
    <div>
      <h2> Create a post </h2>
      <form>
        <label>Title:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)}></input><br/><br/>
        <label>Type (event, phone bank, protest, petition, donation):</label>
        <input type="text" onChange={(e) => setType(e.target.value)}></input><br/><br/>
        <label>Location:</label>
        <input type="text" onChange={(e) => setLocation(e.target.value)}></input><br/><br/>
        <label>Description:</label>
        <textarea onChange={(e) => setDescription(e.target.value)}></textarea><br/><br/>
        {err && <><p>{err}</p><br/></>}
        {success && <><p>{success}</p><br/></>}
        <button onClick={(e) => post(e)}>Post</button>
      </form>
    </div>
  )

}
