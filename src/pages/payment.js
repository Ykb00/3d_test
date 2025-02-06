import { useRouter } from "next/router";

export default function Payment() {
  const router = useRouter();
  const { cost, advance } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Confirm Your Payment</h1>
        <p className="text-lg">Total Cost: ₹{cost}</p>
        <p className="text-lg">Advance Required: ₹{advance}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg">
          Pay Now
        </button>
      </div>
    </div>
  );
}
