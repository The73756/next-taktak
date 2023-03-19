import { GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import axios from 'axios';
import { IUserDetail } from '@/types/user';
import { BASE_URL } from '@/utils';
import { GoVerified } from 'react-icons/go';

interface IProfileProps {
  detail: IUserDetail;
}

const Profile: NextPage<IProfileProps> = ({ detail }) => {
  const { user, userLikes, userVideos } = detail;

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full gap-6 bg-white ">
        <div className="h-16 w-16 md:h-32 md:w-32">
          <Image
            width={120}
            height={120}
            className="rounded-full"
            src={user.image}
            alt={`${user.userName} profile photo`}
          />
        </div>

        <div>
          <div className="text-md flex items-center justify-center gap-2 font-bold tracking-wider md:text-2xl">
            <h2>{user.userName.trim()}</h2>
            <GoVerified className="text-md text-blue-400 md:text-xl" />
          </div>
          <h3 className="text-sm font-medium">
            {`${user.givenName || ''} ${user.familyName || ''}`}
          </h3>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get<IUserDetail>(`${BASE_URL}/api/profile/${context.query.id}`);

  return {
    props: {
      detail: data,
    },
  };
}

export default Profile;
