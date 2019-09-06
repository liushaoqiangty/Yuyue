import axios from "axios";
const api = "http://47.100.48.11:4000";
export default async function getRankList(id) {
  try {
    const url = api + `/top/list?idx=${id}`;
  let res=await this.$http("http://47.100.48.11:4000/top/list?idx=5");
  } catch (error) {
    console.log(error);
  }
  return res.data
}
