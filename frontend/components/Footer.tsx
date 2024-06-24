


export default function Footer() {
    return (
        <div className="bg-zinc-900">
            <div className=" w-full  p-4">
                <div id="contact" className="w-full text-center text-2xl text-white pt-4 font-bold mb-10">Contact</div>
                <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 space-x-10 max-sm:space-x-0 max-sm:space-y-6 text-white">
                    <div className="h-full">
                        <label>Email: </label>
                        <a className="hover:text-blue-800" href="mailto: devraj227804@gmail.com">devraj@gmail.com</a>
                        <br /> <br />
                        <label>Hello: </label>
                        <a className="hover:text-blue-800" href="tel:8210129260">+91 7791239897</a>
                    </div>
                    <div className="hidden max-sm:flex space-x-4 h-full">
                        <a className="hover:text-blue-800" href="https://www.linkedin.com/in/devraj-kumar-5191ba250/">Linkdin</a>
                        <a className="hover:text-blue-800" href="https://x.com/devR_04">Twitter</a>
                        <a className="hover:text-blue-800" href="https://github.com/devRojha">Github</a>
                        <a className="hover:text-blue-800" href="https://www.facebook.com/rajdev04">Facebook</a>
                    </div>
                    <div className="flex flex-col max-sm:hidden space-y-5 h-full">
                        <a className="hover:text-blue-800" href="https://www.linkedin.com/in/devraj-kumar-5191ba250/">Linkdin</a>
                        <a className="hover:text-blue-800" href="https://x.com/devR_04">Twitter</a>
                        <a className="hover:text-blue-800" href="https://github.com/devRojha">Github</a>
                        <a className="hover:text-blue-800" href="https://www.facebook.com/rajdev04">Facebook</a>
                    </div>
                    <div className="h-full"></div>
                    <div className="h-full"></div>
                    <div className="h-full"></div>
                </div>
            </div>
            <div className="bg-green-600 w-full text-center text-white text-sm mt-20 max-sm:mt-4">All rights reserved</div>
        </div>
    );
  }
  