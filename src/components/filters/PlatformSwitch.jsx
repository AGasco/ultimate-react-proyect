import React from "react";
import Switch from "@material-ui/core/Switch";

function PlatformSwitch({ platform, setCurPlatforms }) {
  return (
    <div>
      <li key={platform.name}>
        <img
          className="sidebar__platformIcon"
          src={platform.icon}
          alt={platform.name + "'s logo"}
        />
        {platform.name}
        <Switch value={platform.id} onChange={setCurPlatforms} defaultChecked />
      </li>
    </div>
  );
}

export default PlatformSwitch;
