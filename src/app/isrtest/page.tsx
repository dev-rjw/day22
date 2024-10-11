export default async function ISRPage() {
  const res = await fetch("https://korean-advice-open-api.vercel.app/api/advice", {
    next: {
      revalidate: 10,
    },
  });

  const data = await res.json();

  return (
    <div>
      <p>{data.author}</p>
      <p>{data.authorProfile}</p>
      <p>{data.message}</p>
    </div>
  );
}
