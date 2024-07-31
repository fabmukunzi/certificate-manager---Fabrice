import Button from '@/components/shared/button';
import { useUserContext } from '@/contexts/UserContext';
import { IComment } from '@/utils/types/certificate';
import { FC, useState, ChangeEvent, useEffect } from 'react';

type CommentProps = {
  comments: IComment[] | undefined;
  isCommentOpen: boolean;
  setIsCommentOpen: (value: boolean) => void;
};
const AddComment: FC<CommentProps> = ({
  comments,
  isCommentOpen,
  setIsCommentOpen,
}) => {
  const { currentUser } = useUserContext();
  const [savedComments, setSavedComments] = useState<IComment[]>(
    comments || [],
  );
  const [content, setContent] = useState<string>('');
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  useEffect(() => {
    setSavedComments(comments || []);
  }, [comments]);
  const handleSaveComment = () => {
    if (content.length < 1) return alert('Please enter comment');
    if (currentUser) {
      const newComment: IComment = {
        user: currentUser.name,
        content: content,
      };
      setSavedComments((prev) => [...prev, newComment]);
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
        {savedComments.map((comment, index) => (
          <div
            className="comments"
            key={index}
            style={{ marginBottom: '10px' }}
          >
            <p>
              <strong>User:</strong> {comment.user}
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
            <p>{currentUser?.firstname}*</p>
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
