import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashbordsidebar from "./Dashbordsidebar";
import Dashbordprofile from "./Dashbordprofile";
import Dashbordpost from "./Dashbordpost";

function Dashbord() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get("tab");
    setTab(tabParam);
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="sideBar md:h-[80vh]  ">
        <Dashbordsidebar />
      </div>
      <div className="w-full ">
        {tab === "profile" && <Dashbordprofile />}{" "}
        {tab === "post" && <Dashbordpost />}
      </div>
    </div>
  );
}

export default Dashbord;
