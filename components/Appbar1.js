


export default function Appbar1() {
    return (
      <div className="w-full z-40 py-4 px-4 bg-zinc-800 text-white flex justify-between fixed top-0">
        <div className="ml-20 font-bold text-2xl">Online Judge</div>
        <div className="space-x-4">
          <button className="hover:text-blue-600">Signin</button>
          <button className="hover:text-blue-600">Signup</button>
        </div>
      </div>
    );
  }
  