import { ExclamationCircleIcon } from '@node_modules/@heroicons/react/24/outline';
import Link from '@node_modules/next/link';

const Form = ({
  children,
  formAction,
  buttonState = true,
  href,
  buttonName,
  buttonClass,
  errorMessage,
}: {
  children: React.ReactNode;
  href?: string;
  formAction?: (data: FormData) => void;
  buttonState?: boolean;
  buttonName?: string;
  buttonClass?: string;
  errorMessage?: string;
}) => (
  <form action={formAction}>
    <div className="space-y-12">{children}</div>
    <div className="mt-6 flex items-center justify-end gap-x-6">
      {!!href && (
        <Link
          href={href}
          type="button"
          className={`text-sm/6 font-semibold text-slate-900 ${buttonState ?? 'text-slate-300'}`}
        >
          Очистить и вернуться
        </Link>
      )}

      <button
        type="submit"
        className={`${buttonClass} rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600`}
        disabled={buttonState}
        aria-disabled={buttonState}
      >
        {buttonName || 'Сохранить и отправить'}
      </button>
    </div>
    <div className="flex h-8 items-end space-x-1">
      {!!errorMessage && (
        <>
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </div>
  </form>
);

export default Form;
