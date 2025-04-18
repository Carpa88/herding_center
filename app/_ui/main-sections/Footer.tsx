import Link from 'next/link';
import Logo from '../Logo';
import { footer, socials } from '@app/_lib/main_const';

const FooterBlock = ({ data }: { data: Record<string, string> }) => (
  <div>
    <p className="py-3 font-semibold tracking-tight text-lg">{data.name}</p>
    <ul>
      {Object.entries(data)
        .slice(1)
        .map(([key, value]) => (
          <li className="py-1" key={key}>
            <Link
              href={key}
              className="hover:underline underline-offset-2 decoration-current"
            >
              {value}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-bgPrimary" id="footer">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-20 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 md:pt-8 md:px-8 p-6 text-textDefault overflow-hidden">
        <div className="md:col-span-4 lg:col-span-2">
          <Logo />
          <p className="py-2 md:py-6">Ваша собака отдыхает, пока вы заняты.</p>
          <div>
            <ul className="flex flex-row">
              {socials.map(item => (
                <li className="mr-4 text-3xl" key={item.id}>
                  {<item.icon />}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FooterBlock data={footer.company} />
        <FooterBlock data={footer.hostel} />
        <FooterBlock data={footer.competitions} />
        <FooterBlock data={footer.practicing} />
        <div className="md:col-span-4 lg:col-span-6 border-t-[1px] pt-4 border-borderLight">
          <p>Copyright, 2025</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
