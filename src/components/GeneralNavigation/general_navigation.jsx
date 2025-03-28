import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GeneralNavigation({ breadcrumbs, icon2, icon2OnClick, icon1, icon1OnClick }) {
  const navigate = useNavigate();

  const handleCrumBlick = (crumb) => {
    navigate("/pazienti?&status=none");
    if (crumb.onClick === "reloadPAZ") {
      window.location.reload();
    }
  };

  return (
    <div className="General_Navigation_MainDiv">
      <div className="General_Navigation_List_Content">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <Link to={crumb.path}>
              <div
                onClick={() => handleCrumBlick(crumb)}
                className={`General_Navigation_Content ${crumb.active ? "active" : ""}`}
              >
                {crumb.label}
              </div>
            </Link>
            {index < breadcrumbs.length - 1 && (
              <div className="General_Navigation_Divider">{">"}</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="General_Navigation_List_Icon">
        {icon1 && <div onClick={icon1OnClick} className="General_Navigation_Icon">
          {icon1}
        </div>}
        {icon2 && <div onClick={icon2OnClick} className="General_Navigation_Icon">
          {icon2}
        </div>}
      </div>
    </div>
  );
}
