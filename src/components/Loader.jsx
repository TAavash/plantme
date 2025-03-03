

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen
        bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] "
    >
      <div className="relative w-24 h-24">
        <img
          src="/assets/Logo.svg"
          alt="Bird"
          className="absolute top-0 left-0 w-full h-full"
        />
        <img
          src="/assets/Logo.svg"
          alt="Rotating Text"
          className="absolute top-0 left-0 w-full h-full animate-spin-slow"
        />
      </div>
    </div>
  );
};

export default Loader;
