// import { Image } from `next/image`
export default function NotFound() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <div className="">
        {/* <Image src="./404_image.png" alt="alt" /> */}
        <img src="./404_image.png" className="img" alt="404error" />
      </div>
    </>
  )
}