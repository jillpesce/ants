import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    var user = req.body.username; 
    var name = req.body.name;
    var pw = req.body.pw; 
    var link = req.body.link;
    var description = req.body.description;
    var image = req.body.image;
    var interests = req.body.interests;
    var locations = req.body.locations;

    const { db } = await connectToDatabase();
    db.collection("orgs")
      .insert({username: user, name: name, password: pw, link: link, description: description, 
       image: image, interests: interests, locations: locations});
      res.status(200).json({success: true});

  };