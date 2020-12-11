import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    var user = req.body.username; 
    var pw = req.body.password; 
    var email = req.body.email;
    var interests = req.body.interests;
    var locations = req.body.locations;

    const { db } = await connectToDatabase();
    db.collection("users")
      .insert({username: user, password: pw, email: email, interests: interests, 
        followedOrgs: [], followedPosts: [], locations: locations});
      console.log("test route");
      res.status(200).json({success: true});

  };