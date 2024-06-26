import { Button, IconButton } from '@mui/material';
import { Todo } from '@/app/lib/definitions';
import TimeBadge from '@/app/ui/scheduled/card/time-badge';
import HamburgerMenu from '@/app/ui/scheduled/card/hamburger-menu';
import InfoIcon from '@/app/ui/svg/info-icon';
import CheckMarkIcon from '@/app/ui/svg/checkmark-icon';
import * as actions from '@/app/actions/index';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <div className="w-full border border-stone-300 rounded-lg bg-stone-50 shadow-lg">
      <section className="grid grid-cols-3 p-1 mb-4 px-2 border-b border-gray-200 bg-stone-200">
        <h3 className="font-bold italic text-stone-700 text-sm col-start-2 flex justify-center items-center">
          {todo!.name}
        </h3>
        <TimeBadge
          color="amber"
          dateTimeValue={new Date(todo!.deadline)}
          includeDate={false}
        ></TimeBadge>
      </section>

      <section className="flex justify-around">
        <IconButton className="">
          <InfoIcon />
        </IconButton>
        <Button
          startIcon={<CheckMarkIcon />}
          variant="contained"
          color="inherit"
          className="max-w-32 my-2"
          onClick={() => {
            actions.completeTodo(todo.id);
          }}
        >
          Done
        </Button>
        <HamburgerMenu todo={todo} />
      </section>
    </div>
  );
}
