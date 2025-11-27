import { findSession } from "../lib/session";

export default async function ProfilePage() {
  // Fetch the session and user info
  const session = await findSession();
  console.log("session",session)
let user = await prisma.user.findUnique({
  where: {
    userId: session.userId,
  }})



  return (
    <main className="p-8  min-h-screen bg-black">
      <section className="max-w-2xl mx-auto text-blue-700 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 ">Welcome, {user.firstName}!</h1>

        <div className="mb-6">
          <p>
            <span className="font-semibold">User ID:</span> {user.userId}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Your Stats</h2>
          <ul className="space-y-2">
            {/* Example: you can replace this with real CoD stats */}
            <li className="p-3 bg-blue-700 text-white rounded">K/D Ratio: 1.8</li>
            <li className="p-3 bg-blue-700 text-white rounded">Win Rate: 65%</li>
            <li className="p-3 bg-blue-700 text-white rounded">Score Per Minute: 350</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
