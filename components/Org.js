import { Card, Button, Input } from "react";
import { useState } from 'react';

const Org = (props) => {

    const [buttonText, setButtonText] = useState("Follow");
    const changeText = (text) => setButtonText(text);


    //follow org 
    const followOrg = () => {
        console.log("following");
        let username = props.user;
        let orgID = props.id;
        fetch('http://localhost:5000/users/followOrg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                orgID,
            })
        }).then((response) => response.text())
            .then((data) => {
                console.log(data);
            });

        changeText("Unfollow");
    }

    //unfollow org 
    const unfollowOrg = () => {
        console.log("unfollowing");
        let username = props.user;
        let orgID = props.id;
        fetch('http://localhost:5000/users/unfollowOrg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                orgID,
            })
        }).then((response) => response.text())
            .then((data) => {
                console.log(data);
            });

        changeText("Follow");
    }


    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{props.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{props.interests}</h6>
                <p class="card-text">Description: {props.description}</p>
                <button onClick={buttonText == "Follow" ? followOrg : unfollowOrg}>{buttonText}</button>
            </div>
        </div>
    );
}

export default Org;