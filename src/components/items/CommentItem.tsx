import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { IComment } from "../../models/types";

interface CommentItemProps {
  comment: IComment;
  update: (comment: IComment) => void;
  remove: (comment: IComment) => void;
}

const CommentItem: FC<CommentItemProps> = ({ comment, update, remove }) => {
  const handleUpdate = () => {
    const postId = Number(prompt("Введите номер комментируемого вами поста") || "");
    const email = prompt("Введите свой email") || "";
    const name = prompt("Введите название комментария" || "");
    const body = prompt("Введите текст комментария") || "";
    update({ ...comment, postId, email, name, body } as IComment);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(comment);
  };

  return (
    <Card onClick={handleUpdate}>
      <div className="cardBlock">
        <div className="cardDescription">
          <i>
            <i> Пост №: </i> <b> {comment.postId}. </b>
          </i>

          <i className="displayBlock">
            <i>
              Пользователь: <b> {comment.email} </b>
            </i>
          </i>

          <i className="displayBlock">
            <b>Комментарий </b> № {comment.id}: <b> {comment.name}. </b>
          </i>

          <i className="displayBlock">{comment.body}. </i>
        </div>

        <div className="cardButton">
          <Button onClick={handleRemove} variant="outline-primary">
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CommentItem;
