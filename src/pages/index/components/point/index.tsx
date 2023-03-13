/*
 * @Author: jiawei.guo
 * @Date: 2023-01-30 10:33:24
 * @Description: point
 */
import React from "react";
import TweenOne from "rc-tween-one";
import { getDistance } from "../../handler";

const Point = (props: any) => {
  const { tx, ty, x, y, opacity, radius } = props;

  let transform;
  let zIndex = 0;
  let animation = {
    y: (Math.random() * 2 - 1) * 20 || 15,
    duration: 3000,
    delay: Math.random() * 1000,
    yoyo: true,
    repeat: -1,
  };

  if (tx && ty) {
    if (tx !== x && ty !== y) {
      const distance = getDistance({ x, y }, { x: tx, y: ty });
      const g = Math.sqrt(2000000 / (0.1 * distance * distance));
      transform = `translate(${(g * (x - tx)) / distance}px, ${
        (g * (y - ty)) / distance
      }px)`;
    } else if (tx === x && ty === y) {
      transform = `scale(${80 / radius})`;
      animation = { ...animation, y: 0, yoyo: false, repeat: 0, duration: 300 };
      zIndex = 1;
    }
  }

  return (
    <div
      style={{
        left: x - radius,
        top: y - radius,
        width: radius * 1.8,
        height: radius * 1.8,
        opacity,
        zIndex,
        transform,
      }}
      {...props}
    >
      <TweenOne
        animation={animation}
        style={{
          backgroundColor: props["background-color"],
        }}
        className={`${props.className}-child`}
      />
    </div>
  );
};

export default Point;
