import { db } from "../../lib/db";


const getSites = async (req: any, res: any) => {
  try {
    const sites = await db.site.findMany();
    return res.status(200).json({message:"Retrieved Success.", sites})
  } catch (error:any) {
    return res.status(500).json({message:error.message})
  }
};

module.exports={
  getSites
}
