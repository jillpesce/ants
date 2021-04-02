import { useState } from 'react'
import locationsList from '../constants/locations'
import typeList from '../constants/types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreatePost({ orgid, close }) {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [type, setType] = useState()
    const [information, setInformation] = useState()
    const [volunteerInformation, setVolunteerInformation] = useState()
    const [link, setLink] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [allDay, setAllDay] = useState()
    const [err, setErr] = useState()
    const [success, setSuccess] = useState()

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
            fetch('https://ants-senior-design.herokuapp.com/orgs/post', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    location,
                    type,
                    orgid,
                    information,
                    volunteerInformation,
                    link,
                    startDate,
                    endDate,
                    allDay,
                }),
            })
                .then((resp) => resp.json())
                .then(({ err, post }) => {
                    if (err) {
                        console.log('Error creating post', err)
                    } else {
                        setErr('')
                        setSuccess('Successfully created post!')
                        close()
                    }
                })
        }
    }

    return (
        <form className="create-post">
            <div className="field">
                <label className="label">Event Title</label>
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="is-flex is-justify-content-space-between">
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        {typeList.map((t) => (
                            <div>
                                <label id={t} className="radio">
                                    <input
                                        type="radio"
                                        name="type"
                                        onChange={() => setType(t)}
                                    />
                                    {t.toLowerCase()}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Location</label>
                    {locationsList.map((l) => (
                        <div>
                            <label id={l} className="radio">
                                <input
                                    type="radio"
                                    name="location"
                                    onChange={() => setLocation(l)}
                                />
                                {l === 'DC' || l === 'NYC'
                                    ? l
                                    : l.toLowerCase()}
                            </label>
                        </div>
                    ))}
                    <label className="radio">
                        <input
                            type="radio"
                            name="location"
                            onChange={() => setLocation('REMOTE')}
                        />
                        Remote
                    </label>
                </div>
            </div>
            <div className="is-flex is-justify-content-space-between">
                <div className="field">
                    <label className="label">Start Date</label>
                    <DatePicker
                        showTimeSelect
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
                <div className="field">
                    <label className="label">End Date</label>
                    <DatePicker
                        showTimeSelect
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>
                <div className="field">
                    <label className="label">All Day Event?</label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="allday"
                            onChange={() => setAllDay(true)}
                        />
                        Yes
                    </label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="allday"
                            onChange={() => setAllDay(true)}
                        />
                        No
                    </label>
                </div>
            </div>

            <div className="field">
                <label className="label">Event tagline</label>
                <textarea
                    className="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A short sentence about the event&#8212;this will be visible when volunteers are browsing through events."
                />
            </div>
            <div className="field">
                <label className="label">Event description</label>
                <textarea
                    className="textarea"
                    onChange={(e) => setInformation(e.target.value)}
                    placeholder="All the information volunteers need to know about the event: its goal, how to participate, how their contribution will make a difference, etc! This will be visible on the event page."
                />
            </div>
            <div className="field">
                <label className="label">Volunteer Information</label>
                <textarea
                    className="textarea"
                    onChange={(e) => setVolunteerInformation(e.target.value)}
                    placeholder="Use this section to specify the number of volunteers you need or any special skills needed for the event. This will be visible on the event page."
                />
            </div>
            <div className="field">
                <label className="label">Link to more info</label>
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            {err && <p className="error">{err}</p>}
            {success && <p className="success">{success}</p>}
            <div className="is-flex is-justify-content-flex-end">
                <button className="button" onClick={close}>
                    Cancel
                </button>
                <button className="button purple" onClick={(e) => post(e)}>
                    Post
                </button>
            </div>
        </form>
    )
}
