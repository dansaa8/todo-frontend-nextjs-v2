import { Button, IconButton } from '@mui/material';
import { Todo } from '@/app/lib/definitions';
import TimeBadge from '@/app/ui/scheduled/card/time-badge';
import HamburgerMenu from '@/app/ui/scheduled/card/hamburger-menu';
import InfoIcon from '@/app/ui/svg/info-icon';
import CheckMarkIcon from '@/app/ui/svg/checkmark-icon';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <div className="w-full border border-stone-300 rounded-lg p-3 bg-white shadow-lg">
      <section className="grid grid-cols-4 pb-4 mb-4 px-2 border-b border-gray-200">
        <h3 className="font-bold text-stone-700 col-start-2 col-end-4 text-center">
          {todo!.name}
        </h3>
        <TimeBadge
          color="amber"
          dateTimeValue={new Date(todo!.deadline)}
          includeDate={false}
        ></TimeBadge>
      </section>

      <section className="grid grid-cols-4 mb-4 mt-2">
        <IconButton className="col-start-1 justify-self-center">
          <InfoIcon />
        </IconButton>
        <Button
          startIcon={<CheckMarkIcon />}
          variant="contained"
          color="inherit"
          className="col-start-2 col-end-4 justify-self-center max-w-32"
        >
          Done
        </Button>
        <HamburgerMenu todo={todo} />
      </section>
    </div>
  );
}