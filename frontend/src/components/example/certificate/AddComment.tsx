import Button from '@/components/shared/button';
import { useUserContext } from '@/contexts/UserContext';
import { CommentDto } from '@/utils/types';
import { FC, useState, ChangeEvent } from 'react';

type CommentProps = {
  comments: CommentDto[] | undefined;
  isCommentOpen: boolean;
  setIsCommentOpen: (value: boolean) => void;
};
const AddComment: FC<CommentProps> = ({
  comments,
  isCommentOpen,
  setIsCommentOpen,
}) => {
  const { currentUser } = useUserContext();
  const [content, setContent] = useState<string>('');
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSaveComment = () => {
    if (content.length < 1) return alert('Please enter comment');
    if (currentUser) {
      const newComment: CommentDto = {
        id: currentUser.id,
        user: currentUser,
        content: content,
      };
      setContent('');
      setIsCommentOpen(false);
      comments?.push(newComment);
    }
  };
  return (
    <div style={{ paddingBottom: '30px', marginTop: '20px' }}>
      <div className="add-comment-button">
        <Button
          type="button"
          onClick={() => setIsCommentOpen(true)}
          label="Add Comment"
        />
      </div>

      <div>
        {comments?.map((comment, index) => (
          <div
            className="comments"
            key={index}
            style={{ marginBottom: '10px' }}
          >
            <p>
              <strong>User:</strong> {comment.user.lastName}
            </p>
            <p>
              <strong>Comment:</strong> {comment.content}
            </p>
          </div>
        ))}
      </div>
      {isCommentOpen && (
        <div className="comment-inputs">
          <div>
            <p>{currentUser?.firstName}*</p>
          </div>
          <form>
            <textarea
              onChange={handleContentChange}
              placeholder="Comment"
              cols={50}
              rows={5}
              value={content}
            />
            <div style={{ marginTop: '10px' }}>
              <Button onClick={handleSaveComment} type="button" label="Save" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddComment;
