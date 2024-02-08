import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

const RecipientChips = ({ recipients, onRemoveRecipient }) => {
  return (
    <Stack direction="row" spacing={1}>
      {recipients.map((recipient) => (
        <Chip
          key={recipient.id}
          label={recipient.username}
          avatar={<Avatar alt="Profile picture" src={recipient.profile_picture}/>}
          variant="outlined"
          onDelete={() => onRemoveRecipient(recipient.id)}
          sx={{
            height: 'auto',
            fontSize: '1em',
            padding: '.2em',
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