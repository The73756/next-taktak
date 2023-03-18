import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '@/store/authStore';
import NoResults from '@/components/NoResults';
import CommentsForm from '@/components/CommentsForm';
import { IVideo } from '@/types/video';
import { BASE_URL } from '@/utils';

interface IComments {
  video: IVideo;
}

const Comments = ({ video }: IComments) => {
  const [isPostingComment, setIsPostingComment] = useState(false);
  const { userProfile } = useAuthStore();
  const comments = [];

  const addComment = async (comment: string) => {
    try {
      setIsPostingComment(true);

      if (userProfile && comment) {
        const { data } = await axios.put(`${BASE_URL}/api/post/${video._id}`, {
          userId: userProfile._id,
          comment,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostingComment(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="max-h-[450px] flex-1 border-y-2 border-gray-200 bg-gray-100 px-10 pt-4 pb-[100px] lg:pb-0">
        <div className="h-full overflow-scroll">
          {comments.length ? <div>Res</div> : <NoResults text="No comments" type="comment" />}
        </div>
      </div>
      {userProfile && <CommentsForm addComment={addComment} isPostingComment={isPostingComment} />}
    </div>
  );
};

export default Comments;
