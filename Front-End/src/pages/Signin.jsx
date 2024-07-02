import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../store/userSlice";

function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [fromdata, setFromdata] = useState({
    email: "",
    password: "",
  });
  const { email, password } = fromdata;
  console.log(currentUser);

  function onchange(e) {
    setFromdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  async function onsubmit(e) {
    e.preventDefault();
    if (!fromdata.email || !fromdata.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());
      const data = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(fromdata),
      });
      const response = await data.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (data.ok) {
        dispatch(signInSuccess(response.data));
        navigate("/");
      }
      console.log(response.data);
      console.log(response);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="left h-[80vh] w-[100%] flex justify-center items-center  flex-col gap-5 md:w-[50%]  ">
        <Link to={"/"} className="text-4xl">
          <span
            className="px-3 py-1 bg-gradient-to-r from-indigo-500
             via-purple-500 to-pink-500 rounded-lg text-white font-bold">
            Shoel{`'`}s
          </span>
          Blog
        </Link>
        <p className="w-[400px] ">
          This is a demo Project.You can signup with email and password or with
          google
        </p>
      </div>
      <div className="right flex justify-center flex-col items-center  ">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block w-[600px] ">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required
              onChange={onchange}
              value={email}
            />
          </div>
          <div className="relative">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type={show ? "password" : "text"}
              onChange={onchange}
              value={password}
              required
            />
            <div
              className="absolute top-11 right-2 cursor-pointer"
              onClick={() => setShow(!show)}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <Button
            onClick={onsubmit}
            gradientDuoTone="purpleToPink"
            type="submit">
            Submit
          </Button>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}

          <div className="flex gap-3">
            <p>Dont Have an account </p>{" "}
            <Link to={"/Signup"} className="text-blue-500">
              {" "}
              SignUp
            </Link>
          </div>
        </form>
        <OAuth />
      </div>
    </div>
  );
}

export default SignIn;
