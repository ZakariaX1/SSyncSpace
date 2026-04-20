function UnderConstruction({message}: {message: string}) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center -z-10">
            {/* Top-left corner caution ribbon */}
            <div className="absolute top-0 left-0 w-200 h-12 bg-linear-to-r from-yellow-400 to-yellow-400 
                            bg-[repeating-linear-gradient(45deg,#facc15,#facc15_20px,#000_20px,#000_40px)] 
                            transform -rotate-20 origin-top-left -translate-x-16 translate-y-50"></div>
            
            {/* Top-right corner caution ribbon */}
            <div className="absolute top-0 right-0 w-200 h-12 
                            bg-[repeating-linear-gradient(45deg,#facc15,#facc15_20px,#000_20px,#000_40px)] 
                            transform rotate-45 origin-top-right translate-x-20 translate-y-50"></div>
            
            {/* Bottom-left corner caution ribbon */}
            <div className="absolute bottom-0 left-0 w-200 h-12 
                            bg-[repeating-linear-gradient(45deg,#facc15,#facc15_20px,#000_20px,#000_40px)] 
                            transform rotate-45 origin-bottom-left -translate-x-30 -translate-y-80"></div>
            
            {/* Bottom-right corner caution ribbon */}
            <div className="absolute bottom-0 right-0 w-300 h-12 
                            bg-[repeating-linear-gradient(45deg,#facc15,#facc15_20px,#000_20px,#000_40px)] 
                            transform -rotate-20 origin-bottom-right translate-x-16 -translate-y-70"></div>
            
            {/* Content */}
            <div className="z-10 text-center space-y-4">
                <div className="text-lg">This page is still under construction, here's what to expect:</div>
                <div className="text-gray-300">{message}</div>
            </div>
        </div>
    );
}

export default UnderConstruction;