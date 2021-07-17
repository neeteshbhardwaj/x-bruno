import * as React from "react";
import Wallpaper from "../Wallpaper/Wallpaper";
import Quote from "../Quote/Quote";
import Clock from "../Clock/Clock";
import WallpaperTypeSelector from "../Settings/WallpaperTypeSelector/WallpaperTypeSelector";
import TodoSidebar from "../TodoSidebar/TodoSidebar";
import SettingsSidebar from "../SettingsSidebar/SettingsSidebar";

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
  return (
    <div className="dashboard">
      <Wallpaper />
      <Quote />
      <Clock />
    </div>
  );
}