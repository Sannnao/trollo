import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './add-tasks-column.scss';

type AddTasksColumnProps = {
  addTasksColumn: any,
  scrollMainPageToRight: () => void,
}

export const AddTasksColumn: React.FC<AddTasksColumnProps> = ({ addTasksColumn, scrollMainPageToRight }) => {
  const { authUserId } = useContext(AuthContext);
  const [columnName, setColumnName] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    scrollMainPageToRight();
  }, [isActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
  }

  const toggleActive = () => setIsActive(isActive => !isActive);

  const addNewColumn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (columnName) {
      try {
        const upperCaseName = `${columnName[0].toUpperCase()}${columnName.slice(1)}`;

        const tasksColumn = await fetch('/tasks-column', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            userId: authUserId,
            title: upperCaseName,
            tasks: [],
          })
        });
        const tasksColumnData = await tasksColumn.json();

        addTasksColumn(tasksColumnData);
        setColumnName('');
        setIsActive(isActive => !isActive);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    isActive
      ? <form className='add-tasks-column' onSubmit={addNewColumn}>
        <input
          className="input-field"
          type="text"
          placeholder='Enter column name'
          value={columnName}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{ marginRight: 10 }}
          className="waves-effect waves-light btn"
        >
          Add column
        </button>
        <button
          className="waves-effect waves-light btn"
          onClick={toggleActive}
        >
          Cancel
        </button>
      </form>
      : <button
        className="waves-effect waves-light btn add-tasks-column__add-new-column-btn"
        onClick={toggleActive}
      >
        Add new column
      </button>
  );
}
