function Logo({ className = "" }: { className?: string }) {
  return (
    <div className="w-fit h-fit border border-black p-0.5 rounded-full">
      <img
        className={`rounded-full ${className}`}
        src="/assets/logo1.jpeg"
        alt="CWS LOGO"
      />
    </div>
  );
}

export default Logo;
