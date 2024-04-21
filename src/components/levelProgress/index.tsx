import React from "react";
import LevelProgressItem from "./LevelProgressItem";
import { trees } from "@/constants/trees";
import { getMarginStyles } from "@/lib/helpers";

function LevelProgress() {
  return (
    <div className="flex">
      {trees.map((tree, index) => (
        <LevelProgressItem
          key={index}
          img={tree.imageUrl}
          xp={tree.xpThreshold}
          isActive={index <= 0}
          showIndicator={index < trees.length - 1}
        />
      ))}
    </div>
  );
}

export default LevelProgress;
