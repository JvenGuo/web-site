/*
 * @Author: jiawei.guo
 * @Date: 2023-01-30 11:20:00
 * @Description: title
 */
import React from "react";
import lrImg from "../../assets/lr.jpg";
import "./index.css";

const Hello = () => {
  return (
    <div className="title-wrapper">
      <div className="wrapper">
        <div className="left">
          <h1>刘锐</h1>
          <p>是个弟弟</p>
          <p>就是这个吊毛👉</p>
        </div>
        <div className="right">
          <img src={lrImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hello;
