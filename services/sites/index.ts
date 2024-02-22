import { db } from "../../lib/db";


export const getSites = async (req: any, res: any) => {
  const sites = await db.site.findMany();
  console.log(sites);
};
