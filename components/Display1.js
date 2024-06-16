import Laptop from "./Laptop";


export default function Display1(){
    return <>
        <Laptop />
      <div className="h-screen w-full z-20">
        <div className="h-[60%] bg-zinc-900 text-white">
          <div className=" h-full flex flex-col justify-end pb-20">
            <div className="grid grid-cols-2">
              <div></div>
              <div className="w-full flex justify-center">
                <div className="flex flex-col space">
                  <div className="text-slate-600 text-3xl font-bold">Need a cool compiler..?</div>
                  <div className="mt-20 stick z-30 flex justify-center">
                    <button className="border px-4 py-2 font-semibold rounded-lg shadow-lg shadow-slate-600 active:border-black">Click me</button>
                  </div>
                  {/* <div className="mt-20 text-green-700 text-3xl font-bold"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </>
}