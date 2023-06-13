import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { IPost } from "../../models/types";

interface PostItemProps {
  post: IPost;
  update: (post: IPost) => void;
  remove: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, update, remove }) => {
  const handleUpdate = () => {
    const title = prompt() || "";
    update({ ...post, title } as IPost);
  };
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    remove(post);
  };

  return (
    <Card className="post" onClick={handleUpdate}>
      <div className="cardBlock">
        <div className="cardDescription">
          <i className="displayBlock">
            Пост № <b> {post.id} </b>
          </i>

          <i className="displayBlock">
            <b> Заглавие: </b> {post.title}.
          </i>

          <i className="displayBlock">
            <b> Содержимое: </b> {post.body}
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2" onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;
