import StumblLogo from '@/constants/icons/StumblLogo'
import React from 'react'

const Header = () => {
  return (
    <div className='px-[36px] flex justify-between items-center'>
        <StumblLogo width={120} height={54} color="#F94C57"/>

        <div className='text-[#120D26] font-medium text-[16px]'>14:29 GMT+5:30 <span>Share</span></div>
    </div>
  )
}

export default Header