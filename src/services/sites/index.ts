import { db } from "../../lib/db";


export const getSites = async (req: any, res: any) => {
  try {
    const sites = await db.site.findMany();
    return res.status(200).json({message:"Retrieved Success.", sites})
  } catch (error:any) {
    return res.status(500).json({message:error.message})
  }
};
