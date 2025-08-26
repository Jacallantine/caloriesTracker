export default function Day({ params }) {
    const { id } = params
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Day ID: {id}</h1>
      </div>
    )
  }
  