const year = new Date().getFullYear();

export const FooterPage = () => {
  return (
    <footer className="w-full flex items-center justify-center bg-white/10 dark:bg-dark-3/10 backdrop-blur-lg py-4 z-20 relative">
      <div className="container mx-auto px-4">
        <div className="p-4 text-center">
          <p className="text-dark-1 dark:text-gray-200">
            ©2016 - {year},{" "}
            <span className="font-magistral-bold tracking-widest text-dark-2 dark:text-gray-100">
              ASB Studio
            </span>
            . Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
