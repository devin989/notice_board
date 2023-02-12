import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import NoticeList from "../components/NoticeList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Notices = () => {
  const [loadedNotices, setLoadedNotices] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  // const userId = useParams().userId;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_URL}/api/notices`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        // console.log(responseData.notices);
        setLoadedNotices(responseData.notices);
      } catch (err) {}
    };
    fetchNotices();
  }, [sendRequest]);

  const noticeDeletedHandler = (deletedNoticeId) => {
    console.log("deleteId", deletedNoticeId);
    setLoadedNotices((prevNotices) =>
      prevNotices.filter((notice) => notice._id !== deletedNoticeId)
    );
  };

  return (
    <React.Fragment>
      
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedNotices && (
        <NoticeList
          items={loadedNotices}
          onDeleteNotice={noticeDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Notices;
