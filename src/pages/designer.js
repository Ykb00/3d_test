import Header from "../components/Header";
import Footer from "../components/Footer";
import LottiePlayer from "../components/LottiePlayer";
import animationData from "../assets/designer.json"; // Import the Lottie JSON

export default function Designer() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="flex flex-row items-center justify-center space-x-10">
          {/* Lottie Animation */}
          <LottiePlayer animationPath={animationData} />
          {/* Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
            <h1 className="text-2xl font-bold mb-2">Need a Designer?</h1>
            <p className="text-gray-600 mb-4">
              Upload your requirements, and we'll connect you with the best designers.
            </p>
            <input
              type="file"
              accept=".stl"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
