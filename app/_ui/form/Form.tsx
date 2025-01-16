import Link from '@node_modules/next/link';

const Form = ({
  children,
  formAction,
  buttonState = true,
  href,
}: {
  children: React.ReactNode;
  href: string;
  formAction?: (data: FormData) => void;
  buttonState?: boolean;
}) => (
  <form action={formAction}>
    <div className="space-y-12">{children}</div>
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <Link
        href={href}
        type="button"
        className={`text-sm/6 font-semibold text-slate-900 ${buttonState ?? 'text-slate-300'}`}
      >
        Очистить и вернуться
      </Link>
      <button
        type="submit"
        className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        disabled={buttonState}
      >
        Сохранить и отправить
      </button>
    </div>
  </form>
);

export default Form;
