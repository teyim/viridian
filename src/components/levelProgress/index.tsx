import React from "react";
import LevelProgressItem from "./LevelProgressItem";
import { trees } from "@/constants/trees";
import { getMarginStyles } from "@/lib/helpers";
import { Tree } from "@prisma/client";

type LevelProgressProps = {
  unlockedTrees: Tree[];
};
function LevelProgress({ unlockedTrees }: LevelProgressProps) {
  return (
    <div className="flex">
      {trees.map((tree, index) => (
        <LevelProgressItem
          key={index}
          img={tree.imageUrl}
          xp={tree.xpThreshold}
          isActive={tree?.name === unlockedTrees[index]?.name}
          showIndicator={index < trees.length - 1}
        />
      ))}
    </div>
  );
}

export default LevelProgress;
