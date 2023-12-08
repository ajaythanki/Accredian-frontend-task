const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full gap-2">
      <div className="w-[50px] h-[50px] border border-gray-700 rounded-full animate-spin transition-all"></div>
      loading...
    </div>
  );
};

export default Loader;
