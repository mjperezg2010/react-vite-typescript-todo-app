import React, { useState } from "react";
import { Modal,LoadingButton } from "@components";
import { formatDate,nextHourDateTimeInput } from "@utils/date";
import { useToast } from "@hooks/useToast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  createTodo:(title:string,targetDate:string,targetTime:string,observation:string)=>Promise<boolean>;
  isLoading:boolean;
  // onCreate: (todo: { title: string; description?: string; dueDate?: string }) => void;
}

function NewTodoModal({ isOpen, onClose,createTodo,isLoading }: Props) {
  // Hooks
  const { showToast } = useToast()

  // States
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(() => nextHourDateTimeInput());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    const targetDate = formatDate(dueDate, "yyyy-MM-dd");
    const targetTime = formatDate(dueDate, "HH:mm");
    
    const response = await createTodo(title.trim(), targetDate, targetTime, description.trim())

    if(response) showToast("The new task successfully created!",'success') 

    setTitle("");
    setDescription("");
    setDueDate(nextHourDateTimeInput());
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate(nextHourDateTimeInput());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="New Todo"
      actions={
        <>
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
          <LoadingButton
            type="submit"
            form="new-todo-form"
            className="btn btn-primary"
            loading={isLoading}
            disabled={!title.trim()}
          >
            Create
          </LoadingButton>
        </>
      }
    >
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <div className="form-control mb-2">
          <label htmlFor="todo-title" className="label">
            <span className="label-text">Title</span>
          </label><br/>
          <input
            id="todo-title"
            type="text"
            className="input input-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="todo-description" className="label">
            <span className="label-text">Description</span>
          </label><br/>
          <textarea
            id="todo-description"
            className="textarea textarea-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="todo-date" className="label">
            <span className="label-text">Due date & time</span>
          </label><br/>
          <input
            id="todo-date" 
            type="datetime-local"
            className="input input-primary" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
      </form>
    </Modal>
  );
}

export { NewTodoModal };