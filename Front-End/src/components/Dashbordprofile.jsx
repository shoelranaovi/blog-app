import { Alert, Button, Modal, ModalHeader, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../store/userSlice";

function Dashbordprofile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imagefile, setImagefile] = useState(null);
  const [imagefileurl, setImagefileUrl] = useState(null);
  const filepickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [showmodel, setShowmodel] = useState(false);
  const [fromdata, setFromdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });
  console.log(currentUser);
  function onchange(e) {
    setFromdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleclick(e) {
    const file = e.target.files[0];
    if (file) {
      setImagefile(file);
      setImagefileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (imagefile) {
      uploadImage();
    }
  }, [imagefile]);
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    console.log("file upload");
    const stroage = getStorage(app);
    const fileName = new Date().getTime() + imagefile.name;
    const storageRef = ref(stroage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imagefile);
    console.log(fileName, storageRef, uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImagefileUrl(downloadURL);
          setFromdata({ ...fromdata, profilePicture: downloadURL });
          //   setImageFileUploading(false);
        });
      }
    );
  };
  async function onsubmit(e) {
    e.preventDefault();

    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:8080/api/update/${currentUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromdata),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        console.log(data.message);
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.log(error);
    }
  }
  async function handleDeleteUser() {
    setShowmodel(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:8080/api/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/Signin");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error);
    }
  }
  async function handlesignout() {
    try {
      const res = await fetch("http://localhost:8080/api/signout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className=" h-full w-full flex justify-center items-center gap-2 flex-col mt-20 md:mt-0">
      <h1 className="text-2xl">Profile</h1>
      <form
        onSubmit={onsubmit}
        className="flex justify-center m-w-[400px] items-center flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleclick}
          ref={filepickerRef}
          className="hidden"
        />
        <div className="relative" onClick={() => filepickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                },
              }}
            />
          )}
          <img
            src={imagefileurl || currentUser.profilePicture}
            className="rounded-full border-8 w-28 h-28 cursor-pointer"
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          onChange={onchange}
          defaultValue={currentUser.username}
          className="w-full "></TextInput>
        <TextInput
          type="text"
          id="email"
          onChange={onchange}
          placeholder="email"
          defaultValue={currentUser.email}
          className="w-[400px] "></TextInput>
        <TextInput
          type="password"
          onChange={onchange}
          id="password"
          placeholder="***************"
          className="w-[400px] "></TextInput>
        <Button
          className="w-full"
          type="submit"
          gradientDuoTone="purpleToPink"
          onClick={onsubmit}
          outline>
          Update
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"} className="w-[400px] ">
            <Button
              type="button"
              className="w-full"
              gradientDuoTone="purpleToPink"
              // onClick={handlepost}
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between text-red-700 w-[400px] ">
        <span onClick={() => setShowmodel(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handlesignout} className="cursor-pointer">
          Sign Out
        </span>
        <Modal
          show={showmodel}
          onClose={() => setShowmodel(false)}
          popup
          size="md">
          <ModalHeader />
          <Modal.Body>
            <div className="text-center w-full  ">
              <HiOutlineExclamationCircle
                size={50}
                className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"
              />
              <h3 className="md-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure want to delete your Account
              </h3>
              <div className="flex justify-center gap-4 mt-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes,I am Sure
                </Button>
                <Button color="gray" onClick={() => setShowmodel(false)}>
                  No,cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Dashbordprofile;
