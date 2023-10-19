import React from "react";

function FilterButton(props) {
      const btnText = props.name.charAt(0).toUpperCase() +
            props.name.slice(1).split("_").join(" ");
      return (
            <button
                  type="button"
                  className={props.name + ' toggle-btn'}
                  aria-pressed={props.isPressed}
                  onClick={() => props.setFilter(props.name)}>
                  {/* <span className="visually-hidden">Show </span> */}
                  <span>{btnText}</span>
                  <span className="visually-hidden"> tasks</span>
            </button>
      );
}


export default FilterButton;
