import { FormEvent, useState } from 'react';

interface ICommentsForm {
  addComment: (comment: string) => void;
  isPostingComment: boolean;
}

const CommentsForm = ({ addComment, isPostingComment }: ICommentsForm) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentText) {
      alert('Please add a comment');
      return;
    }

    addComment(commentText.trim());
    setCommentText('');
  };

  return (
    <div className="mt-auto w-full px-2 pb-6 md:px-10">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add the comment"
          className="w-full flex-1 rounded-lg border-2 border-gray-100 bg-primary px-6 py-4 font-medium transition-colors duration-300 focus:border-gray-300 focus:outline-none"
        />
        <button className="rounded-lg border-2 border-2 border-gray-100 px-8 text-gray-400 transition-colors duration-300 hover:border-gray-300">
          {isPostingComment ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CommentsForm;
