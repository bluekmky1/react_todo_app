import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Container, MainBox, StyledLogo, ItemsBox } from "./Sidebar.styles";
import { toggleMenu } from "../../store/menu/menuSlice";
import { FaArchive, FaLightbulb, FaTag, FaTrash } from "react-icons/fa";
import getStandardName from "../../utils/getStandardName";
import { toggleTagsModal } from "../../store/modal/modalSlice";
import { MdEdit } from "react-icons/md";
import { v4 } from "uuid";

const items = [
  { icon: <FaArchive />, title: "Archive", id: v4() },
  { icon: <FaTrash />, title: "Trash", id: v4() },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const backgroundRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useAppSelector((state) => state.menu);
  const { tagsList } = useAppSelector((state) => state.tags);

  const { pathname } = useLocation();

  if (pathname === "/404") {
    return null;
  }

  const backgroundClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === backgroundRef.current) {
      dispatch(toggleMenu(false));
    }
  };

  return (
    <Container
      ref={backgroundRef}
      onClick={(e) => backgroundClickHandler(e)}
      openMenu={isOpen ? "open" : ""}
    >
      <MainBox openMenu={isOpen ? "open" : ""}>
        <StyledLogo>
          <h1>Keep</h1>
        </StyledLogo>

        <ItemsBox>
          {/* edit tag item */}
          <li
            className="sidebar__edit-item"
            onClick={() =>
              dispatch(toggleTagsModal({ type: "edit", view: true }))
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit Tags</span>
          </li>

          <hr />

          {/* note item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={"/"}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
            >
              <span>
                <FaLightbulb />
              </span>
              <span>All Notes</span>
            </NavLink>
          </li>

          {/* tag items */}
          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}

          <hr />

          {/* other items */}
          {items.map(({ icon, title, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLocaleLowerCase()}`}
                state={`${title}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>{icon}</span>
                <span>{title}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
