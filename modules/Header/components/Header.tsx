import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from '@/modules/Header/components/SearchInput';
import { UserArea } from '@/modules/Header/components/UserArea';

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <span className="block w-[100px] md:w-[130px]">
          <Image src="/logo.png" width={130} alt="Tak Tak logo" height={38} />
        </span>
      </Link>
      <SearchInput />
      <UserArea />
    </div>
  );
};
