import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

const Activity = props => {
  if (props.loading) {
    return <LoadingActivity />;
  } else if (props.notificationList) {
    console.log(props.notificationList);
    return <RenderActivity {...props} />;
  }
};

const LoadingActivity = props => (
  <div className={styles.notificationList}>
    <Loading />
  </div>
);

const RenderActivity = props => (
  <div className={styles.notifications}>
    {props.notificationList.map(user => (
      <div>
        {user.notification_type === "like" && (
          <LikeNotification {...user} id={user.id} />
        )}
        {user.notification_type === "follow" && (
          <FollowNotification {...user} id={user.id} />
        )}
        {user.notification_type === "comment" && (
          <CommentNotification {...user} id={user.id} />
        )}
      </div>
    ))}
  </div>
);

const LikeNotification = props => (
  <div>
    <img
      src={props.creator.profile_image || require("images/noPhoto.jpg")}
      alt={props.creator.username}
      className={styles.avatar}
    />
    <span>님이 회원님의 사진을 좋아합니다</span>
    <span>{props.image.file}</span>
  </div>
);
const FollowNotification = props => (
  <div className={styles.text}>
    <img
      src={props.creator.profile_image || require("images/noPhoto.jpg")}
      alt={props.creator.username}
      className={styles.avatar}
    />
    <span>이 회원님을 팔로우하기 시작했습니다.</span>
  </div>
);
const CommentNotification = props => (
  <div className={styles.text}>
    <img
      src={props.creator.profile_image || require("images/noPhoto.jpg")}
      alt={props.creator.username}
      className={styles.avatar}
    />
    <span>님이 댓글을 달았습니다.</span>
  </div>
);

Activity.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Activity;
