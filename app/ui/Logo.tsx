import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="shrink-0 leading-none">
      <Link href="/">
        <Image
          src="/ava.png"
          width={180}
          height={180}
          className="h-14 w-auto"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </Link>
    </div>
  );
};

export default Logo;
