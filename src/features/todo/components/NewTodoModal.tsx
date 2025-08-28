import React, { useState } from "react";
import Modal from "@components/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (todo: { title: string; description?: string; dueDate?: string }) => void;
}

function NewTodoModal({ isOpen, onClose, onCreate }:Props){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    onCreate({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="New Todo" actions={
      <>
        <button type="button" className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
        <button type="submit" form="new-todo-form" className="btn btn-primary" disabled={!title.trim()}>Create</button>
      </>
    }>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <div className="form-control mb-2">
          <label className="label" htmlFor="todo-title">
            <span className="label-text">Title<span className="text-error">*</span></span>
          </label>
          <input
            id="todo-title"
            type="text"
            className="input input-bordered"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-control mb-2">
          <label className="label" htmlFor="todo-description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="todo-description"
            className="textarea textarea-bordered"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label" htmlFor="todo-due-date">
            <span className="label-text">Due Date</span>
          </label>
          <input
            id="todo-due-date"
            type="date"
            className="input input-bordered"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export { Modal, NewTodoModal };