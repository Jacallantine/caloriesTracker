import Link from "next/link"

export default function Redirect({href, title, buttonText = "Click Here", css = ""}){

    return (<div className={`flex flex-col items-center justify-center text-center space-y-4 mt-10 ${css}`}>
    <p className="text-gray-400 text-lg">{title}</p>
    <Link
      href={`${href}`}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
    >
      {buttonText}
    </Link>
  </div>)
}