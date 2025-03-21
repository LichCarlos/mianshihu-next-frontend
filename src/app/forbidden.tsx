import { Result } from "antd"

const Forvidden = () => {
  return <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<a href="/">Back Home</a>} />
}

export default Forvidden