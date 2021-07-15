import * as React from "react";
import Wallpaper from "../Wallpaper/Wallpaper";
import Quote from "../Quote/Quote";
import Clock from "../Clock/Clock";
import Settings from "../Settings/Settings";
import Todo from "../Todo/Todo";

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
    return (
        <div className="dashboard">
          <Wallpaper />
          <Quote />
          <Clock />
          <Settings />
          <Todo />
        </div>
      );
}