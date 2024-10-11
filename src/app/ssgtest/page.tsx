export default async function SSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/10", {
    cache: "force-cache",
  });

  const data = await res.json();

  return (
    <div>
      <p>제목 {data.title}</p>
      <p>내용 {data.body}</p>
    </div>
  );
}
