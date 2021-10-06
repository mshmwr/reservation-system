import React from "react";
import styled from "styled-components";
import { getSVGURI } from "../../utils/Utils"
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


const MyDropdowns = ({ langs, language, switchLanguageClickHandler, className }) => {
    return (
        <div className={`${className} home__menu__language`}>
            {Object.keys(langs).filter((key => language === langs[key].multiLang)).map((key => <div key={key} className="home__menu__language__current">{langs[key].label}


                <ul className="home__menu__language__list">
                    {Object.keys(langs).map((key) => (
                        <li
                            key={langs[key].label}
                            className={`home__menu__language__list__item ${language === langs[key].multiLang
                                ? "home__menu__language--selected"
                                : "home__menu__language--unselected"}`

                            }
                            id={langs[key].multiLang}
                            onClick={switchLanguageClickHandler}
                        >
                            {langs[key].label}
                        </li>
                    ))}

                </ul>

            </div>))}


        </div >
    )
}


const Dropdowns = styled(MyDropdowns)`
    position: relative;
    width:60px;
    height:30px;
    text-align: center;
    color: var(--dark);

    .home__menu__language__list{
        position: absolute;
        top: calc(-1 * (${props => Object.keys(props.langs).length} * ${props => props.listItemHeight} + 1rem));
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        padding: 0.5rem 0;
        background-color: var(--main-normal);
        visibility:hidden;
    }
    .home__menu__language__current{
        color: var(--main-bg);
        width:100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .home__menu__language__current:hover{
        background-color: var(--main-dark);
        cursor: pointer;
        .home__menu__language__list{
            visibility:visible;
        }
    }

    .home__menu__language__current::after{
        display: inline-block;
        content: url(${getSVGURI(faAngleDown, "#f6f2ec")});
        position: relative;
        top: -2px;
        left: 5px;
        width: calc(${props => props.listItemHeight} / 4);
        height: calc(${props => props.listItemHeight} / 4);

    }

    .home__menu__language__list__item{
        color: var(--dark);
        display: flex;
        width: ${props => props.listItemWidth};
        height: ${props => props.listItemHeight};
        justify-content: center;
        align-items: center;
    }
    .home__menu__language__list__item:hover{
        background-color: var(--main-light);
        cursor: pointer;

    }

    .home__menu__language--selected::before{
        content: url(${getSVGURI(faCheck, "#77613b")});
        position: relative;
        top: -2.5px;
        left:-5px;
        width: calc(${props => props.listItemHeight} / 4);
        height: calc(${props => props.listItemHeight} / 4);
    }

    .home__menu__language--unselected::before{
        content: "";
        position: relative;
        top: -2.5px;
        left:-5px;
        width: calc(${props => props.listItemHeight} / 4);
        height: calc(${props => props.listItemHeight} / 4);
    }

`



export default Dropdowns;

