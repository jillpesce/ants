import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const orgs = await db
    .collection("orgs")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  res.json(orgs);
};