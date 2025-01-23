import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@node_modules/@heroicons/react/24/outline';
import { Button } from './buttons';
import { authenticate } from '@app/login/action';
import { useActionState } from 'react';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-slate-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-slate-900"
              htmlFor="email"
            >
              Адрес электронной почты
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-slate-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-slate-500"
                id="email"
                type="email"
                name="email"
                placeholder="Введите адрес электронной почты"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 peer-focus:text-slate-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-slate-900"
              htmlFor="password"
            >
              Пароль
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-slate-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-slate-500"
                id="password"
                type="password"
                name="password"
                placeholder="Введите пароль"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 peer-focus:text-slate-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Войти <ArrowRightIcon className="ml-auto h-5 w-5 text-slate-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {!!state && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
