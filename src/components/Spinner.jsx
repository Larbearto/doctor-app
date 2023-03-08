import { Spin } from 'antd'

function Spinner() {
  return (
    <div className='spinner-parent justify-center fixed inset-0 flex items-center bg-[#000000b5] z-50'>
      <Spin size='large' />
    </div>
  )
}

export default Spinner
