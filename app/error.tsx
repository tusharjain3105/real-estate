"use client";

const Error = ({ error }) => {
  return (
    <div className="p-2">
      <div className="p-2 bg-red-50 text-red-600">{error.message}</div>
    </div>
  );
};

export default Error;
