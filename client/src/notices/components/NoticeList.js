import React from "react";

import Card from "../../shared/components/UIElements/Card";
import NoticeItem from "./NoticeItem";
import Button from "../../shared/components/FormElements/Button";
import "./NoticeList.css";

const NoticeList = (props) => {
  if (props.items.length === 0) {
    console.log(props.items);
    return (
      <div className="notice-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="notice-list">
      {props.items.map((notice) => (
        <NoticeItem
          key={notice._id}
          id={notice._id}
          header={notice.header}
          body={notice.body}
          date={notice.date}
          onDelete={props.onDeleteNotice}
        />
      ))}
    </ul>
  );
};

export default NoticeList;
