import { Sidebar } from "flowbite-react";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Dashbordsidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get("tab");
    setTab(tabParam);
  }, [location.search]);

  return (
    <Sidebar aria-label="Default sidebar " className="w-full md:min-w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex gap-2 flex-col">
          <Link to={"/dashbord?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={FaUser}
              label="User"
              labelColor="dark"
              as="div">
              Profile
            </Sidebar.Item>
          </Link>
          <Link to={"/dashbord?tab=post"}>
            <Sidebar.Item active={tab === "post"} icon={FaUser} as="div">
              Post
            </Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={FaArrowRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default Dashbordsidebar;
