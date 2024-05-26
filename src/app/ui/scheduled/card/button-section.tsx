import { Button, IconButton } from '@mui/material';
import InfoIcon from '@/app/ui/svg/info-icon';
import CheckMarkIcon from '../../svg/checkmark-icon';
import HamburgerIcon from '../../svg/hamburger-icon';

export default function ButtonSection() {
  return (
    <section className="grid grid-cols-4 mb-4 mt-2">
      <IconButton className='col-start-1'>
        <InfoIcon />
      </IconButton>
      <Button startIcon={<CheckMarkIcon />} variant="contained" color="inherit" className='col-start-2 col-end-4 justify-self-center max-w-32'>
        Done
      </Button>
      <IconButton className='col-start-4 justify-self-center'>
        <HamburgerIcon />
      </IconButton>
    </section>
  );
}
