import './index.scss'

const Loading = ({ visible }) => {
  return (
    <>
      {visible && <div class="loading"></div>}
    </>
  )
}
export default Loading