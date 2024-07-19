
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h2>
        <p className="text-gray-700 mb-6">Sorry, we couldn't find the requested resource.</p>
          <a className="text-white bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out px-4 py-2 rounded-full">
            Return Home
          </a>
      </div>
    </div>
  )
}
