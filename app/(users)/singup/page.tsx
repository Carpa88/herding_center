import Input from '@app/_ui/form/Input';

const Singup = () => (
  <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-[100vh]">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="" className="space-y-6">
          <Input name="email" label="Электронный адрес" type="email" />
          <Input name="password" label="Пароль" type="password" />
          <Input
            name="password-again"
            label="Повторите пароль"
            type="password"
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);

export default Singup;
