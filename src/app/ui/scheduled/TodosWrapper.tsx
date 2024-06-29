'use client';
import { useState, useEffect } from 'react';
import { Todo } from '@/app/lib/definitions';
import TodoCard from '@/app/ui/scheduled/card/todo-card';
import { Button, IconButton } from '@mui/material';
import CalendarIcon from '@/app/ui/svg/calendar-icon';
import TasksDoneIcon from '@/app/ui/svg/tasks-done-icon';
import TasksTodoIcon from '@/app/ui/svg/tasks-todo-icon';
import CalendarModal from '@/app/ui/scheduled/calendar/CalendarModal';
import * as utils from '@/utils/index';

type ScheduledContainerProps = {
  todos: Todo[];
};

export default function TodosWrapper({ todos }: ScheduledContainerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [tasks, setTasks] = useState({
    todo: [],
    done: [],
  });
  const [activeFilter, setActiveFilter] = useState<'todo' | 'done' | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when date changes

    const todosForSelectedDate = todos.filter((todo: Todo) => {
      const todoDate = new Date(todo.deadline);
      return utils.isSameDay(todoDate, selectedDate);
    });

    const updatedTasks = {
      todo: todosForSelectedDate.filter((todo: Todo) => todo.completedAt === null),
      done: todosForSelectedDate.filter((todo: Todo) => todo.completedAt !== null),
    };

    setTasks(updatedTasks);

    if (updatedTasks.todo.length > 0) {
      setActiveFilter('todo');
    } else if (updatedTasks.done.length > 0) {
      setActiveFilter('done');
    } else {
      setActiveFilter(null);
    }

    setLoading(false); // Set loading to false once tasks are updated
  }, [todos, selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowCalendarModal(false);
  };

  const formattedDate = utils.formatDateWithSuffix(selectedDate);
  const relativeDateLabel = utils.getRelativeDateLabel(selectedDate);
  let containerColor;

  if (relativeDateLabel.includes('Today'))
    containerColor = 'bg-yellow-50 border-yellow-200';
  else if (
    (relativeDateLabel.includes('days ago') ||
    relativeDateLabel.includes('Yesterday') )
  ) {
    if (tasks.todo.length > 0 ) {
      containerColor = 'bg-red-100 border border-red-200';
    } else {
      containerColor = 'bg-green-200 border border-green-300'
    }
  }
   
  else containerColor = 'bg-blue-50 border border-blue-100';

  const filteredTodos = activeFilter === 'todo' ? tasks.todo : tasks.done;

  const disabledTextColor = 'text-gray-400 normal case';


  return (
    <>
      <section
        className={`grid grid-cols-3 items-center border mb-5 ${containerColor} rounded-t pb-2`}
      >
        <h2 className="mt-3 col-start-1 justify-self-center font-bold text-lg">
          {relativeDateLabel}
        </h2>
        <div className="mt-3 col-start-2 justify-self-center">
          <p className="text-center">{formattedDate[0]}</p>
          <p className="text-center">
            {formattedDate[1] + ' ' + formattedDate[2]}
          </p>
        </div>

        <IconButton
          className="text-black-800 col-start-3 justify-self-center"
          onClick={() => {
            setShowCalendarModal(true);
          }}
        >
          <CalendarIcon />
        </IconButton>
      </section>

      <section className="flex justify-center gap-2 mb-3">
        {tasks.todo.length > 0 && (
                <Button
                size='small'
                className={activeFilter ===  'todo' ? 'bg-sky-200 hover:bg-sky-300' : 'bg-gray-100 hover:bg-sky-300'}
                endIcon={<TasksTodoIcon className={tasks.todo.length === 0 ? `text-gray-300 w-4 h-4` : 'text-gray-800 w-4 h-4'} />}
                onClick={() => setActiveFilter('todo')}
                disabled={tasks.done.length === 0}
              >
                <p className={tasks.todo.length === 0 ? 'text-gray-300 normal-case' : 'text-gray-800 normal-case'}>Todo</p>
              </Button>
        )}

        {tasks.done.length > 0 && (
        <Button
        size='small'
        className={activeFilter ===  'done' ? 'bg-lime-200 hover:bg-lime-300' : 'bg-gray-100 hover:bg-lime-300'}
        endIcon={<TasksDoneIcon className={tasks.done.length === 0 ? `text-gray-300 w-4 h-4` : 'text-gray-800 w-4 h-4'} />}
        onClick={() => setActiveFilter('done')}
        disabled={tasks.todo.length === 0}
      >
        <p className={tasks.done.length === 0 ? 'text-gray-300 normal-case' :"text-gray-800 normal-case"}>Done</p>
      </Button>
        )}

      </section>

      <section className="flex flex-col gap-8 items-center p-4 mb-10 mt-6 mx-2 bg-stone-50 border border-stone-200">
        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : (
          activeFilter ? (
            filteredTodos.map((todo: Todo) => {
              return <TodoCard key={todo.id} todo={todo} />;
            })
          ) : (
            <p className="text-gray-500">No tasks for today</p>
          )
        )}
      </section>

      {showCalendarModal && (
        <CalendarModal
          handleModalClose={handleModalClose}
          handleDateChange={handleDateChange}
          todos={todos}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
}
