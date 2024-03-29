import { Dispatch, SetStateAction, useEffect, useState } from "react"
// import AppBar from "./appBar"
import { useNavigate } from "react-router"
import { SubmitPost } from "../hooks"

function SubmitButton({status, setSubmit}: {status: boolean, setSubmit:Dispatch<SetStateAction<boolean>>}){

    if(status){
        return(
            <>
                <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    </svg>
                        Submitting...
                </button>
            </>
        )
    }

    return(
        <>
            <button onClick={()=>setSubmit(true)} type="button" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1 text-center me-2 mb-2">
                        <div className="flex flex-col justify-center">
                                Post
                        </div>
            </button> 
        </>
    )

}

function InputField({label, setTitle}: {label:string, setTitle:Dispatch<SetStateAction<string>>}){

    function onChange(e: React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement
        setTitle(tgt?.value)
    }

    return(
        <>
            <label htmlFor="message" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">{label}</label>
            <input onInput={onChange} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></input>
        </>
    )
}


function TextArea({label, setTextData}: {label:string, setTextData:Dispatch<SetStateAction<string>>}){

    function onChange(e: React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement
        setTextData(tgt?.value)
    }

    return(
        <>
            <label htmlFor="message" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea onInput={onChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </>
    )
}

export default function BlogPost(){
    const [title, setTitle] = useState("");
    const [textData, setTextData] = useState("");
    const [submit, setSubmit] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(submit){
            setSubmit(false)
            setLoader(true);
            console.log("Submit post called")
            const submitPost = async ()=>{
            const {submitPostStatus, data}= await SubmitPost(title, textData);
            
            if(submitPostStatus){
                await setTimeout(
                    ()=>{
                        navigate("/blogs")
                    }
                    ,500
                );
                setLoader(false);
            }else{
                if(data && typeof data == "object" && "data" in data && typeof data.data == "object"){
                    console.log(`${data?.data}`)
                }                
            }
            
        }
            submitPost()
        }else{
            console.log("Submit is false");
        }
    },[submit])

    return(
        <>
            <div className=" w-4/5">
                <div className="mt-5 w-full text-center">
                    <InputField label={"Title"} setTitle={setTitle}/>
                </div>
                <div className="mt-5 w-full text-center">
                    <TextArea label ={"Blog"} setTextData={setTextData}/>
                </div>
                <div className="mt-5 w-full text-center">
                    <SubmitButton status = {loader} setSubmit={setSubmit}/>                    
                </div>
            </div>
        </>
    )
}