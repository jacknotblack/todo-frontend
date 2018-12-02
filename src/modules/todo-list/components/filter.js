import React from "react";
import "./filter.scss";

const filters = [
  {
    name: "My Tasks",
    filter: "all"
  },
  {
    name: "In Progress",
    filter: "wip"
  },
  {
    name: "Completed",
    filter: "completed"
  }
];
const Filter = ({ switchFilter, selectedFilter }) => (
  <div className="filter-bar">
    {filters.map(filter => (
      <div
        className={`filter-item ${
          selectedFilter === filter.filter ? "active" : ""
        }`}
        key={filter.name}
        onClick={() => {
          switchFilter(filter.filter);
        }}
      >
        {filter.name}
      </div>
    ))}
  </div>
);

export default Filter;
