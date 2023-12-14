import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRetweet, faUserPlus, faBell } from "@fortawesome/fontawesome-free-solid";
import { faComment } from "@fortawesome/fontawesome-free-regular";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

import { TweetDate } from "../styles/tweetStyles";

export const NotificationIcon = styled(FontAwesomeIcon)`
 color: ${props => props.theme.colors.primary};
 font-size: 2em;
 margin: 0 .5em;
`;

export const NotificationMessage = styled.p`
  color: lime;
  font-size: 1.3em;
`;

export const NotificationCard = styled.div`
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: space-between;
 color: ;
 padding: .5em;
 border-bottom: 1px solid ${props => props.theme.colors.secondary};
 cursor: pointer;

 &:hover {
  background-color: ${props => props.theme.colors.accent};
 }
`

const Notification = ({ notification }) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    if (notification.type === "FOLLOW") {
      navigate(`/profile/${notification.sender._id}`)
    } else {
      navigate(`/thread/${notification.tweet}`);
    }
  };

  let icon;

  switch (notification.type) {
    case 'LIKE':
        icon = faHeart;
        break;
      case 'RETWEET':
        icon = faRetweet;
        break;
      case 'MENTION':
        icon = faComment;
        break;
      case 'FOLLOW':
        icon = faUserPlus;
        break;
      default:
        icon = faBell;
  }

  let formattedDate;
  let date;
  if (notification.date) {
    if (typeof notification.date === 'string') {
      date = new Date(notification.date)
    } else {
      date = notification.date.toDate();
    }
    formattedDate = format(date, "h:mm bbb MM/dd/yyy");
  }

  return (
    <NotificationCard onClick={handleClick} >
        <div className="flex align">
          <NotificationIcon icon={icon} />
          <NotificationMessage>{notification.message}</NotificationMessage>
        </div>
        <TweetDate>{formattedDate}</TweetDate>
    </NotificationCard>
  )
};

export default Notification;