import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";

import { iconPath } from "@/icons";
import { Menus } from "..";

const Selector = ({
  width = "100%",
  type,
  state = "enabled",
  placeholder,
  label,
  supportingText,
  handleSelectMenuItem,
  handleRemoveMenuItem,
  selected = "",
  value = [],
  menuHeight,
  list = [],
  variant = "multi",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!showDropdown) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [value]);

  useEffect(() => {
    const handleClick = (event) => {
      const isDropdownMenuClicked = event.target.closest("#dropdown");
      if (!isDropdownMenuClicked && showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showDropdown]);

  const handleDropDown = (event) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const labelClass =
    isFocused || value.length != 0
      ? state == "error"
        ? `${textStyles["body-small"]} ${styles["label-focused"]} ${styles["error"]}`
        : `${textStyles["body-small"]} ${styles["label-focused"]} ${styles["focus"]}`
      : `${textStyles["body-large"]} ${styles["label"]} ${styles[state]}`;

  const supportingTextClass = `${textStyles["body-small"]} ${styles["supporting-text"]} ${styles[state]}`;

  const containerClass = isFocused
    ? state == "error"
      ? `${styles["container"]} ${styles["container-error"]}`
      : `${styles["container"]} ${styles["container-focus"]}`
    : `${styles["container"]} ${styles["container-" + state]}`;

  return (
    <div>
      <div className={styles["text-field"]} style={{ width: width }}>
        <div className={styles["input-field"]}>
          <div className={containerClass} onClick={handleDropDown}>
            <div
              className={
                state == "disabled"
                  ? `${styles["input"]} ${styles[state]}`
                  : `${styles["input"]} `
              }
              type={type}
              disabled={state == "disabled" ? true : false}
            >
              {value.length == 0 && variant == "multi" && (
                <p className={styles["placeholder"]}>{placeholder}</p>
              )}
              {selected == "" && variant == "single" && (
                <p className={styles["placeholder"]}>{placeholder}</p>
              )}
              {variant == "single" && selected.icon ? (
                <div
                  style={{ display: "flex", gap: "12px", alignSelf: "center" }}
                >
                  <img
                    src={iconPath(selected.icon)}
                    className={styles["icon"]}
                  />
                  <p>{selected.label}</p>
                </div>
              ) : (
                <p>{selected}</p>
              )}
            </div>
            <img
              className={styles["icon"]}
              src={iconPath("arrow-down")}
              style={{ marginRight: "12px" }}
              onClick={handleDropDown}
            />
          </div>
          <p
            className={
              state == "disabled" ? styles["label-disabled"] : labelClass
            }
            style={{ marginLeft: "16px" }}
          >
            {label}
          </p>
        </div>
        <p className={supportingTextClass}>{supportingText}</p>
      </div>
      <div className={styles["drop-down"]}>
        {showDropdown && list.length > 0 && (
          <Menus
            id="dropdown"
            list={list}
            width={width}
            height={menuHeight}
            handleSelectMenuItem={handleSelectMenuItem}
          />
        )}
      </div>
    </div>
  );
};

export default Selector;
