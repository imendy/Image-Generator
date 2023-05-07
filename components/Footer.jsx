import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

const today = new Date();


function Footer() {
  return (
    <div className="flex items-center justify-between p-6 min-[560px]:px-16 md:px-40 md:p-8">
      <div className="flex flex-col justify-center">
       <h3 className="text-xs min-[560px]:text-sm ">All rights reserved</h3>
        <span className="text-[11px]">{today.getFullYear()} &copy;</span>
      </div>
      
      <span className="text-xs min-[560px]:text-sm text-purple-500">
        Powered by <RocketLaunchRoundedIcon /> Endy
      </span>
    </div>
  )
}

export default Footer


