import { Card, Button, Input } from "react";

const Org = (props) => {
    return (
    <div>
        <h2> Name: {props.name}</h2>
        <p>Description: {props.description}</p>
        <p>Interests: {props.interests}</p>
        <button >Follow</button>

    </div>
   );
}

export default Org;