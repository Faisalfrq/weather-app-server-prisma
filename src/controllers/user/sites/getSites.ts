
const userServices=require("../../../services/index.ts")

module.exports = async (req:any, res:any) => {
  return await userServices.getSites(req, res);
};
