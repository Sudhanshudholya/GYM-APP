import React, { useContext } from "react";
import {
  ScrollMenu,
  VisibilityContext,
} from "react-horizontal-scrolling-menu";

import BodyPart from "./BodyPart";
import ExerciseCard from "./ExerciseCard";

import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

// LEFT ARROW
const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      onClick={() => scrollPrev()}
      className="left-arrow"
      aria-label="Scroll left"
    >
      <img
        src={LeftArrowIcon}
        alt="Scroll left"
      />
    </button>
  );
};

// RIGHT ARROW
const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      onClick={() => scrollNext()}
      className="right-arrow"
      aria-label="Scroll right"
    >
      <img
        src={RightArrowIcon}
        alt="Scroll right"
      />
    </button>
  );
};

// Scroll item
const ScrollItem = ({ itemId, children }) => {
  return (
    <div
      style={{
        margin: "0 20px",
        flexShrink: 0,
      }}
      data-item-id={itemId}
    >
      {children}
    </div>
  );
};

const HorizontalScrollbar = ({
  data = [],
  bodyParts = false,
  setBodyPart,
  bodyPart,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
    >
      {data.map((item) => {
        const itemId = String(item?.id || item);

        return (
          <ScrollItem
            key={itemId}
            itemId={itemId}
          >
            {bodyParts ? (
              <BodyPart
                item={item}
                setBodyPart={setBodyPart}
                bodyPart={bodyPart}
              />
            ) : (
              <ExerciseCard exercise={item} />
            )}
          </ScrollItem>
        );
      })}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;