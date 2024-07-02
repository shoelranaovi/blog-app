import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/theme";

function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <Navbar className=" flex border-b-2 dark:text-white">
      <Link to={"/"}>
        <span
          className="px-3 py-1 bg-gradient-to-r from-indigo-500
         via-purple-500 to-pink-500 rounded-lg text-white font-bold">
          Shoel{`'`}s
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          rightIcon={FaSearch}
          placeholder="Search Here"
          className="hidden lg:inline"
        />
      </form>
      <Button color="gray" className="lg:hidden w-12 h-10" pill>
        <FaSearch />
      </Button>
      <div className="flex gap-4 justify-center items-center md:order-1 ">
        <Button
          color="gray"
          className="w-12 h-10"
          pill
          onClick={() => dispatch(setTheme())}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            className="h-[180px]"
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }>
            <Dropdown.Header className="flex flex-col gap-3">
              <span>{currentUser.username} </span>
              <span>{currentUser.email} </span>
            </Dropdown.Header>
            <Link to={"/dashbord?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider>
              <Dropdown.Item>Signout</Dropdown.Item>
            </Dropdown.Divider>
          </Dropdown>
        ) : (
          <Link to={"Signin"}>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/About"} as={"div"}>
          <Link to={"/About"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to={"/project"}>Project</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
