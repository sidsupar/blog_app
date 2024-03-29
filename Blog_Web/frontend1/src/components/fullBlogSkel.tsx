// import Avatar from "./avatar"
import AppBar from "./appBar"
import { useEffect, useState } from "react"
// import clsx from 'clsx';

// interface BlogCardType{
//     authorName:string,
//     title:string,
//     content:string,
//     publishedDate:string,
//     id:number
// }


interface SizeRec {
    px?:number,
    py?:number,
    w?:number,
    h?:number
}

function Circle(){
    return(
        <>
            <div className="h-1 w-1 rounded-full bg-slate-400">

            </div>
        </>
    )
}
export function TextSimultate({size="sm"}: {size:"sm"|"md"|"lg"}){

    const [sizeRec, setSizeRec] = useState<SizeRec>({});
    
    useEffect(
        ()=>{
            switch(size){
                case "sm": setSizeRec({
                    px:10,
                    py:2,
                    w:24,
                    h:6
                }); break;
                case "md": setSizeRec(
                    {
                        px:10,
                        py:5,
                        w:44,
                        h:20
                    }
                ); break;
                case "lg": setSizeRec(
                    {
                        px:10,
                        py:40,
                        w:80,
                        h:44
                    }
                ); break;
                default : console.log("Invalid size");
            }
        }
    ,[size]);
    // console.log(`sizeRec[h]: ${sizeRec?.h} & sizeRec[w]: ${sizeRec?.w}`)

    return(
        <>
            <div className={`bg-slate-200  rounded-lg w-${sizeRec.w} h-${sizeRec.h}`}>
                 <div className="bg-black w-full h-full">

                 </div>
            </div>
        </>
    )

}

export function AvatarSkel({size="small"}: {size:"small"|"big"}){
    const [sizeInNum, setSizeInNum] = useState(6);
    useEffect(
          () => {
            if(size == "big"){
                setSizeInNum(10);            
            }else{
                setSizeInNum(6)
            }            
        }
    ,[sizeInNum, size]);  
    console.log("Avatar size = "+sizeInNum)
    return(
        <>
            <div className="cursor-pointer">
                <div className={` p-${size == "small" ? 5 : 6} inline-flex items-center justify-center bg-gray-200 rounded-full dark:bg-gray-600`}>
                    <span className={`bg-slate-200 ${size == "small" ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-300`}>
                        
                    </span>
                </div>
            </div>
        </>
    )
}

export default function FullBlogSkel(){


    return(
        <>          
            <AppBar />
                <div className="flex justify-center">
                    <div className=' flex justify-center border-b border-slate-200 w-4/5'>
                        
                    <div className="grid grid-cols-12 mt-5">                        
                        <div className="flex flex-col justify-center col-span-8 p-10">
                            <div className="pl-2 font-serif mt-2 cursor-pointer text-3xl font-extrabold">                    
                                {/* title */}
                                <TextSimultate size="sm" />
                            </div>
                            <div className="pl-2 font-light text-gray-500 text-sm">
                                {/* Posted on */}
                                <TextSimultate size="sm" />
                            </div>
                            <div style={{whiteSpace: 'pre-line'}} className="p-2 font-serif max-w-screen-2xl relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                                {/* content */}
                                <TextSimultate size="lg" />
                            </div>
                            <div className="pl-2 font-extrabold">
                                {/* mins */}
                                <TextSimultate size="sm" />
                            </div>
                        </div>
                        <div className="col-span-1">

                        </div>
                        <div className="p-10 font-serif max-w-screen-2xl flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full col-span-3">
                            <div className="flex justify-center pl-2 font-bold text-slate-300 text-sm">
                                Author
                            </div>
                            <div className="flex justify-center pl-2 mt-2">
                                    <AvatarSkel size={"small"}/>
                                <div className="flex flex-col justify-center pl-2">
                                    <Circle />
                                </div>
                                <div className="flex flex-col justify-center pl-2 font-bold text-slate-300 text-sm">
                                    <TextSimultate size="sm" />
                                </div>
                            </div>
                            <div className="flex justify-center flex-col mt-10">
                                <div className="flex justify-center pl-2 font-extrabold text-slate-300 text-xl">
                                    Published Date
                                </div>
                                <div className="pl-2 text-gray-500 text-xs flex justify-center">
                                    <TextSimultate size="sm" />
                                </div>
                            </div>                                                       
                            
                        </div>
                    </div>                
                            {/* adasd */}
                    </div>
                </div>
            
        </>
    )
}