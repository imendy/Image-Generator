import { useState, useEffect } from 'react'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import FileSaver from 'file-saver'
import Spinner from './Spinner'
import noData from '../public/no-data.svg'
import Image from 'next/image'


const IMAGE_SIZES = [
	{value: "256x256", label: "256 X 256"},
	{value: "512x512", label: "512 X 512"},
	{value: "1024x1024", label: "1024 X 1024"},
]

const ImageCard = ({url}) => {
 const [loading, setLoading] = useState(false)

  const downloadImage = async (url) => {
		setLoading(true)
		let response = await fetch('/api/download', {
			method: 'POST',
			body: JSON.stringify({url}),
			headers: {
				'Content-type': 'application/json'
			}
		})

		if (response.ok) {
			const blob = await response.blob()
			FileSaver.saveAs(blob, 'image.png')
		} else {
			console.error('some error')
		}
		setLoading(false)
	}


  return (
        <div className={"p-1 group bg-transparent relative mb-5 w-full shadow-md"}>
    
           <div className={"h-auto hover:opacity-75"}>
				     <img src={url} height={"auto"} width={"100%"} className={"rounded-md object-contain"}/>
			    </div>
          <div className={"absolute right-4 top-4 text-white"}>
            {
              loading
              ? <div>
                   <Spinner />
                </div>
              : <button 
                  className="hidden group-hover:block text-md rounded-full bg-gray-500 hover:bg-purple-400"
                  onClick={() => downloadImage(url)}
                  >
                  <CloudDownloadRoundedIcon 
                    
                    />
                </button>
            }
          </div>
        </div>
  )

}

function Form() {

  const [prompt, setPrompt] = useState("")
	const [size, setSize] = useState(IMAGE_SIZES[0].value)
	const [images, setImages] = useState([])

  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		let response = await fetch("/api/generate", {
			method: "POST",
			body: JSON.stringify({prompt, size}),
			headers: {
				'Content-type': 'application/json'
			}
		})

		if (response.ok) {
			response = await response.json()
			setImages(response.data)
		}

		setLoading(false)
	}

  
  return (
    <>
    <div className="flex flex-col  p-6 min-[560px]:px-16 md:px-40 md:p-8  ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col min-[600px]:grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor={'prompt'} className="text-sm cursor-pointer block font-medium leading-6 m-2 md:text-[13px]">Describe the image you want to generate</label>
          <textarea 
            id={'prompt'}
            rows={2}
            placeholder={"e.g: Generate a paper boat on a table"}
            className="block w-full px-2 py-1 rounded-md resize-none shadow-sm placeholder:text-purple-500 border border-gray-400 text-sm outline-none text-gray-400 placeholder:italic"
            onChange={(e) => setPrompt(e.target.value)}
            />
            <span className="text-xs pt-2 text-gray-400">Please provide a very detailed prompt</span>
          </div>
          <div className="">
            <div className="w-full">
             <label 
               htmlFor={'size'} 
               className="text-sm cursor-pointer block font-medium leading-6 m-2 md:text-[13px]"
               >
               Select prefered Image Size
              </label>
              <select 
                id={'size'}
                className="w-full px-2 py-3 rounded-md shadow-sm outline-none border border-gray-400 text-sm text-purple-500"
                onChange={(e) => setSize(e.target.value)}
                >
               {
										IMAGE_SIZES.map(({value, label}, index) => (
											<option 
                        key={index} 
                        value={value}
                        >{label}</option>
										))
									}
              </select>
              <div className="mt-4 text-right">
                <button 
                  type={'submit'}
                  disabled={loading}
                  className="text-sm bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:scale-125 transition ease-out duration-300 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4">
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    <div className={"mt-8 pt-4 border-t border-gray-400 h-fit"}>
      {
						loading
							? <div className={"h-100 flex flex-col justify-center items-center"}>
									<p className={"text-md text-gray-400 font-bold my-10"}>Generating Images...</p>
									<Image src={noData} alt={"no data image"} className={"w-1/3 sm:w-1/5 h-auto"}/>
								</div>
							: images.length > 0
        ? <div className={"grid grid-cols-2 max-[360px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center mt-8"}>
            {images.map(({url}, index) => <ImageCard key={index} url={url}/>)}
        
        
          </div>
        : <div className={"h-100 flex flex-col justify-center items-center"}>
									<p className={"text-md text-gray-400 font-bold my-10"}>No Data Displayed Yet</p>
									<Image src={noData} alt={"no data image"} className={"w-1/3 sm:w-1/5 h-auto"}/>
								</div>
      }        
                    
    
    </div>
    </div>
    <hr 
      className="mx-6 min-[560px]:mx-16 md:mx-40 md:p-2 "
      />
  </>
  )
}

export default Form