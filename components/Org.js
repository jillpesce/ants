import { Card, Button, Input } from "react";

const Org = (org) => {
    return (<Card>
        <Card.Title>{org.name}</Card.Title>
        <Button>Follow</Button>
    </Card>);
}

export default Org;