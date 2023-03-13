/*
 * @Author: jiawei.guo
 * @Date: 2023-01-30 10:27:23
 * @Description: 首页
 */
import React, { FC, useRef, useState } from "react";
import { getDistance, getPointPos } from "./handler";
import Point from "./components/point";
import "./index.css";
import Hello from "../../components/title";

const Num = 100;

interface Props {
  className?: string;
}

const Index: FC<Props> = ({ className = "linked-animate-demo" }) => {
  const [data, setData] = useState(
    getPointPos(2000, 1000, Num).map((item) => ({
      ...item,
      opacity: Math.random() * 0.2 + 0.05,
      "background-color": `rgb(${Math.round(
        Math.random() * 95 + 160
      )},255,255)`,
    }))
  );

  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const box = useRef<HTMLElement>(null);

  const onMouseMove = (e: any) => {
    const cX = e.clientX;
    const cY = e.clientY;
    const boxRect = box?.current?.getBoundingClientRect();
    const pos = data
      .map((item) => {
        const { x, y, radius } = item;
        return {
          x,
          y,
          distance:
            getDistance({ x: cX - boxRect!.x, y: cY - boxRect!.y }, { x, y }) -
            radius!,
        };
      })
      .reduce((a, b) => {
        if (!a.distance || a.distance > b.distance) {
          return b;
        }
        return a;
      });
    if (pos.distance < 60) {
      setTx(pos.x!);
      setTy(pos.y!);
    } else {
      onMouseLeave();
    }
  };

  const onMouseLeave = () => {
    setTx(0);
    setTy(0);
  };

  return (
    <div className={`${className}-wrapper`}>
      <Hello />

      <div
        className={`${className}-box`}
        // @ts-ignore
        ref={box}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {data.map((item, i) => (
          <Point
            {...item}
            tx={tx}
            ty={ty}
            key={i.toString()}
            className={`${className}-block`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
