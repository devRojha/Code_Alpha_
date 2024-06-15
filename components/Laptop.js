import Image from "next/image";



export default function Laptop(){
    return <div className="">
        <Image className="z-20 max-lg:hidden absolute top-[44px] h-[740px]" src={"/laptop.png"} height={2000} width={2000} />
        <div className="z-30 max-lg:hidden  grid grid-cols-2 absolute w-full h-screen top-0 pt-40">
            <div className="col-span-1 h-[498px] border-r border-b rounded-r-lg mr-3 z-30 bg-black text-white flex flex-col justify-center">
                <div className="flex justify-center">
                    <Image className="flex justify-center" src={"/code.png"} width={400} height={400} />
                </div>
            </div>
        </div>
    </div>
}