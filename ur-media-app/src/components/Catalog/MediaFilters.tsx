"use client";

import styles from "./MediaFilters.module.css";
import {useState} from "react";
import {MediaDropdown} from "./MediaDropdown";

export default function MediaFilters () {
  const mediaTypes = ["movies", "games", "shows", "books"];
  const [mediaType, setMediaType] = useState(mediaTypes[0]);

  const handleMediaDropdownChange = (selected: string) => {
    setMediaType(selected);
  }

  return (
    <div className={styles.main}>
      <MediaDropdown dropdownOptions={mediaTypes} selectedMedia={mediaType} onMediaChange={handleMediaDropdownChange}/>
    </div>
  );
};
