import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import app from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function Createpost() {
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const [fromdata, setFromdata] = useState({});

  console.log(fromdata);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `http://localhost:8080/api/getposts?postId=${postId}`
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);

          return;
        }
        if (res.ok) {
          setFromdata(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  async function handleclick() {
    if (!file) {
      setImageFileUploadError("please select an Image");
      return;
    }
    try {
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const filename = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setFromdata({ ...fromdata, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
      setImageFileUploadError(error);
    }
  }
  const updatepost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/api/updatepost/${fromdata._id}/${currentUser._id}`,
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
      if (!res.ok) {
        console.log("error");
        return;
      }

      if (res.ok) {
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-3xl min-h-screen  mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Edit your Post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 justify-between sm:flex-row">
          <TextInput
            onChange={(e) =>
              setFromdata({ ...fromdata, title: e.target.value })
            }
            type="text"
            placeholder="Title"
            className="flex-1"
            value={fromdata.title}
          />
          <Select
            onChange={(e) =>
              setFromdata({ ...fromdata, category: e.target.value })
            }>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.Js</option>
            <option value="nextjs">Next.Js</option>
          </Select>
        </div>
        <div className="flex justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {imageFileUploadProgress && (
            <div className="w-12 h-12">
              {" "}
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
              />{" "}
            </div>
          )}
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            onClick={handleclick}>
            Upload image
          </Button>
        </div>
        {fromdata.image && (
          <img
            src={fromdata.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something"
          className="h-72 pb-7  "
          value={fromdata.content}
          onChange={(value) => setFromdata({ ...fromdata, content: value })}
        />
        <Button
          onClick={updatepost}
          gradientDuoTone="purpleToPink"
          className="mt-4">
          Update
        </Button>
      </form>
    </div>
  );
}

export default Createpost;
