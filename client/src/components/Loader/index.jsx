// const Loader = () => {
//   return (
//     <div className="relative w-12 h-12 mx-auto">
//       <div className="absolute top-[60px] left-0 w-12 h-[5px] bg-red-300/50 rounded-full animate-shadow"></div>
//       <div className="absolute top-0 left-0 w-12 h-12 bg-red-400 rounded-md animate-jump"></div>
//     </div>
//   );
// };

// export default Loader;

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;

