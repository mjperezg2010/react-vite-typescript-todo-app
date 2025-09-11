import React, { useState, useEffect } from "react";
import { Modal,LoadingButton } from "@components";
import { formatDate,nextHourDateTimeInput } from "@utils/date";
import { useToast } from "@hooks/useToast";
import type { Todo } from "../types";

interface Props {
  isOpen: boolean;
  isLoading:boolean;
  isEdit:boolean;
  todoToEdit:Todo;  
  createTodo:(title:string,targetDate:string,targetTime:string,observation:string)=>Promise<boolean>;
  editTodo:(todo:Todo)=>Promise<boolean>; 
  onClose: () => void;
}

function NewEditTodoModal({ isOpen,isLoading,isEdit,todoToEdit,createTodo,editTodo,onClose }: Props) {
  // Hooks
  const { showToast } = useToast()

  // States
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(() => nextHourDateTimeInput());

  // Functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    const targetDate = formatDate(dueDate, "yyyy-MM-dd");
    const targetTime = formatDate(dueDate, "HH:mm");

    let response = false;

    if (isEdit) {
      const updated: Todo = {
        ...todoToEdit,
        title: title.trim(),
        targetDate,
        targetTime,
        observation:description.trim()
      };
      response = await editTodo(updated);
      if (response) showToast("Changes saved!", "success");
    } else {
      response = await createTodo(title.trim(), targetDate, targetTime, description.trim());
      if (response) showToast("The new task was successfully created!", "success");
    }

    if (response) {
      setTitle("");
      setDescription("");
      setDueDate(nextHourDateTimeInput());
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate(nextHourDateTimeInput());
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    if (isEdit && todoToEdit) {
      // Edit todo: set values from selected todo
      setTitle(todoToEdit.title ?? "");
      if (todoToEdit.targetDate && todoToEdit.targetTime) {
        setDueDate(`${todoToEdit.targetDate}T${todoToEdit.targetTime}`);
      }
      setDescription(todoToEdit.observation ?? "");
    } else {
      // New todo: reset defaults on open
      setTitle("");
      setDescription("");
      setDueDate(nextHourDateTimeInput());
    }
  }, [isOpen, isEdit, todoToEdit]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={isEdit ? "Edit Todo" : "New Todo"}
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
            hideChildrenWhenLoading
          >
            {isEdit ? "Save" : "Create"}
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

export { NewEditTodoModal };