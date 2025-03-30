import { ExclamationCircleIcon } from '@node_modules/@heroicons/react/24/outline';
import { FormEventHandler } from '@node_modules/@types/react';
import Link from '@node_modules/next/link';

const Form = ({
  children,
  formAction,
  buttonState = false,
  href,
  buttonName,
  buttonClass,
  errorMessage,
  onSubmit,
}: {
  children: React.ReactNode;
  href?: string;
  formAction?: (data: FormData) => void;
  buttonState?: boolean;
  buttonName?: string;
  buttonClass?: string;
  errorMessage?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}) => (
  <form action={formAction} onSubmit={onSubmit}>
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
        className={`${buttonClass} rounded-md bg-buttonDefault px-3 py-2 text-sm font-semibold text-textDefault shadow-sm hover:bg-buttonHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-buttonActive`}
        disabled={buttonState}
        aria-disabled={buttonState}
      >
        {buttonName || 'Сохранить и отправить'}
      </button>
    </div>
    <div className="flex h-10 items-end space-x-1">
      {!!errorMessage && (
        <>
          <ExclamationCircleIcon className="h-5 w-5 text-textError" />
          <p className="text-sm text-textError">{errorMessage}</p>
        </>
      )}
    </div>
  </form>
);

export default Form;
