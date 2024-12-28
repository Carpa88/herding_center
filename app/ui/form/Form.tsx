const Form = ({
  children,
  formAction,
  buttonState = true,
}: {
  children: React.ReactNode;
  formAction?: (data: FormData) => void;
  buttonState?: boolean;
}) => {
  return (
    <form action={formAction}>
      <div className="space-y-12">{children}</div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          disabled={buttonState}
          className="text-sm/6 font-semibold text-slate-900"
        >
          Очистить и вернуться
        </button>
        <button
          type="submit"
          className="rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          disabled={buttonState}
        >
          Сохранить и отправить
        </button>
      </div>
    </form>
  );
};

export default Form;
