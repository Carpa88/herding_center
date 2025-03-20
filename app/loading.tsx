const Loading = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-bgSoft text-textPrimary">
    <div className="text-4xl font-bold animate-bounce">
      🐶 Подождите, ваш хвост уже в пути...
    </div>
    <p className="mt-4 text-lg italic">
      Проверяем, не зарыли ли мы ваш заказ в саду... 🌳
    </p>
  </div>
);

export default Loading;
