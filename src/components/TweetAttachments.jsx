import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const TweetAttachments = ({ attachments }) => {
  return (
    <ImageList sx={{ mt: 1 }} >
        {attachments?.map((item) => (
            <ImageListItem key={item.url} >
                <img 
                 src={item.url}
                 alt={item.type}
                 loading='lazy'
                 />
            </ImageListItem>
        ))}
    </ImageList>
  )
}

export default TweetAttachments;