import { Button, IconButton } from '@mui/material';
import InfoIcon from '@/app/ui/svg/info-icon';
import CheckMarkIcon from '../svg/checkmark-icon';
import HamburgerIcon from '../svg/hamburger-icon';

export default function ButtonSection() {
  return (
    <div className="border rounded-lg flex justify-around">
      <IconButton>
        <InfoIcon />
      </IconButton>
      <Button startIcon={<CheckMarkIcon />} variant="contained" color="inherit">
        Done
      </Button>
      <IconButton>
        <HamburgerIcon />
      </IconButton>
    </div>
  );
}
