import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import FileUpload from './FileUpload'

export default function OrgProfileForm({ onSubmit }) {
    const { user, userType, updateUser } = useContext(UserContext)
    const [link, setLink] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [err, setErr] = useState()
    const [success, setSuccess] = useState()

    useEffect(() => {
        if (!user) return
        setLink(user.link)
        setDescription(user.description)
    }, [user])

    async function uploadFile() {
        const photoData = new FormData()
        photoData.append('image', image)
        await fetch(
            `https://ants-senior-design.herokuapp.com/orgs/img/${user._id}`,
            {
                method: 'POST',
                body: photoData,
                header: {
                    'content-type': 'multipart/form-data',
                },
            }
        )
            .then((resp) => resp.json())
            .then(({ org, err }) => {
                if (err) {
                    console.log('Error on image upload', err)
                    setErr(
                        'Sorry, an error occurred uploading image. Please try again.'
                    )
                    return
                }
                updateUser(org)
            })
    }

    async function submit(e) {
        e.preventDefault()
        if (image) await uploadFile()
        fetch(
            `https://ants-senior-design.herokuapp.com/orgs/update/${user._id}`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    link,
                    description,
                }),
            }
        )
            .then((resp) => resp.json())
            .then(({ org, err }) => {
                if (err) {
                    setErr('Sorry, an error occurred. Please try again.')
                    console.log('Error updating profile', err)
                    return
                }
                updateUser(org)
                setSuccess('Updated')
                if (onSubmit) onSubmit()
            })
    }

    return (
        <>
            <form className="profile-form">
                <div className="field">
                    <label className="label">Link</label>
                    <input
                        className="input"
                        type="text"
                        value={link || ''}
                        onChange={(e) => {
                            setErr('')
                            setLink(e.target.value)
                        }}
                    ></input>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <textarea
                        className="textarea"
                        type="text"
                        value={description || ''}
                        onChange={(e) => {
                            setErr('')
                            setDescription(e.target.value)
                        }}
                    ></textarea>
                </div>
                {image ? (
                    <img src={URL.createObjectURL(image)} />
                ) : (
                    <p className="error">No file uploaded</p>
                )}
                <FileUpload handleFile={setImage} />
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
