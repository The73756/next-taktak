import { useState } from 'react';
import { AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Link from 'next/link';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink =
    'flex items-center justify-center gap-3 p-3 font-semibold text-[#f51997] rounded transition-colors duration-300 hover:bg-primary xl:justify-start';

  return (
    <div>
      <button
        className="m-2 ml-4 mt-3 block text-xl xl:hidden"
        onClick={() => setShowSidebar((prevState) => !prevState)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </button>
      {showSidebar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 xl:w-[250px] xl:border-0">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/" className={normalLink}>
              <span>
                <AiFillHome />
              </span>
              <span className="block hidden text-xl xl:block">For You</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
