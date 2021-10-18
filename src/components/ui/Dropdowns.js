import React from "react";
import styled from "styled-components";
import { getSVGURI } from "../../utils/Utils";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const MyDropdowns = ({
  langs,
  language,
  switchLanguageClickHandler,
  className,
  listItemHeight,
  listItemWidth,
}) => {
  return (
    <div className={`${className} menu__language`}>
      {Object.keys(langs)
        .filter((key) => language === langs[key].multiLang)
        .map((key) => (
          <div key={key} className="menu__language__current">
            {langs[key].label}

            <ul className="menu__language__list">
              {Object.keys(langs).map((key) => (
                <li
                  key={langs[key].label}
                  className={`menu__language__list__item ${
                    language === langs[key].multiLang
                      ? "menu__language--selected"
                      : "menu__language--unselected"
                  }`}
                  id={langs[key].multiLang}
                  onClick={switchLanguageClickHandler}
                >
                  {langs[key].label}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

//className: menu__language
const Dropdowns = styled(MyDropdowns)`
  position: relative;
  width: 80px;
  height: 100%;
  text-align: center;
  color: var(--dark);

  .menu__language__list {
    position: absolute;
    top: calc(
      -1 * (${(props) => Object.keys(props.langs).length} *
            ${(props) => props.listItemHeight} + 1rem)
    );
    /* 1rem is for visual error correction */

    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: 0.5rem 0;
    background-color: var(--main-normal);
    visibility: hidden;
  }

  .menu__language__current {
    color: var(--main-bg);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu__language__current:hover {
    background-color: var(--main-dark);
    cursor: pointer;
    .menu__language__list {
      visibility: visible;
    }
  }

  .menu__language__current::after {
    display: inline-block;
    content: url(${getSVGURI(faAngleDown, "#f6f2ec")});
    position: relative;
    top: -2px;
    left: 5px;
    width: calc(var(--menu-item-height) / 4);
    height: calc(var(--menu-item-height) / 4);
  }

  .menu__language__list__item {
    color: var(--dark);
    display: flex;
    width: ${(props) => props.listItemWidth};
    height: ${(props) => props.listItemHeight};
    justify-content: center;
    align-items: center;
  }

  .menu__language__list__item:hover {
    background-color: var(--main-bg);
    cursor: pointer;
  }

  .menu__language--selected::before {
    content: url(${getSVGURI(faCheck, "#77613b")});
    position: relative;
    top: -2.5px;
    left: -5px;
    width: calc(${(props) => props.listItemHeight} / 4);
    height: calc(${(props) => props.listItemHeight} / 4);
  }

  .menu__language--unselected::before {
    content: "";
    position: relative;
    top: -2.5px;
    left: -5px;
    width: calc(${(props) => props.listItemHeight} / 4);
    height: calc(${(props) => props.listItemHeight} / 4);
  }
`;

export default Dropdowns;
