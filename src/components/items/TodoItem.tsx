import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { ITodo } from "../../models/types";

interface ITodoItemProps {
  todo: ITodo;
  remove: (todo: ITodo) => void;
  update: (todo: ITodo) => void;
}

const TodoItem: FC<ITodoItemProps> = ({ todo, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(todo);
  };

  const handleCheckbox = (event: React.ChangeEvent) => {
    let completed = !todo.completed;
    update({ ...todo, completed } as ITodo);
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> дело № </i> <b> {todo.id} </b>
          </Card.Title>

          <i className="displayBlock">
            <i> название дела: </i> <b> {todo.title} </b>
          </i>

          <input type="checkbox" checked={todo.completed} onChange={handleCheckbox} />

          <i className="displayBlock">
            <span className={todo.completed ? "colorBlue textLine" : "colorRed"}>
              {todo.completed ? "Выполнено" : "Не выполнено"}
            </span>
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 " onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;
