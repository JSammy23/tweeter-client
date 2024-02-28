import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';

const RecipientChips = ({ recipients, onRemoveRecipient }) => {
  return (
    <Stack direction="row" spacing={1}>
      {recipients.map((recipient) => (
        <Chip
          key={recipient._id}
          label={recipient.username}
          avatar={<Avatar alt="Profile picture" src={recipient.profile_picture}/>}
          variant="outlined"
          onDelete={() => onRemoveRecipient(recipient._id)}
          deleteIcon={<CancelIcon style={{ color: '#ff1744' }} />}
          sx={{
            height: 'auto',
            fontSize: '1em',
            padding: '.2em',
            color: '#fff',
            '& .MuiAvatar-root': {
                width: '3em', 
                height: 'auto', 
            }
          }}
        />
      ))}
    </Stack>
  );
};

export default RecipientChips;