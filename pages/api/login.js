import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    var user = req.body.username; 
    var pw = req.body.password; 

    const { db } = await connectToDatabase();
    var userRes = db.collection("users")
      .findOne({username: user, password: pw});
    if (userRes.length == 0) {
        res.status(200).json({success: false});
    } else {
        console.log("logged in");
        res.status(200).json({success: true});
    }

  };