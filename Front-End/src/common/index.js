const backendDomin = "http://localhost:8080";
const SummaryApi = {
  signUp: {
    url: `${backendDomin}/api/signUp`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  userDetail: {
    url: `${backendDomin}/api/user-detail`,
    method: "get",
  },
  usersignout: {
    url: `${backendDomin}/api//signout`,
    method: "get",
  },
  alluser: {
    url: `${backendDomin}/api/users`,
    method: "get",
  },
  updateusers: {
    url: `${backendDomin}/api/updateuser`,
    method: "post",
  },
};

export default SummaryApi;
