import { Button, IconButton } from '@mui/material';
import InfoIcon from '@/app/ui/svg/info-icon';
import CheckMarkIcon from '../svg/checkmark-icon';
import HamburgerIcon from '../svg/hamburger-icon';

export default function ButtonSection() {
  return (
    <section className="flex justify-around mb-4 mt-2">
      <IconButton>
        <InfoIcon />
      </IconButton>
      <Button startIcon={<CheckMarkIcon />} variant="contained" color="inherit">
        Done
      </Button>
      <IconButton>
        <HamburgerIcon />
      </IconButton>
    </section>
  );
}
