

export default function Appbar2() {
    return (
      <div className="w-full z-40 py-4 px-4 bg-black text-white flex justify-end fixed top-14">
        <div className="mr-40 space-x-20 font-semibold">
            <button className="hover:text-blue-600">Home</button>
            <button className="hover:text-blue-600">About</button>
            <button className="hover:text-blue-600">Contact</button>
            <button className="hover:text-blue-600">Features</button>
        </div>
      </div>
    );
  }
  